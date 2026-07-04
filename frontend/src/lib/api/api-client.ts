import type { ApiErrorKind } from "@/lib/api/types";

const DEFAULT_API_BASE_URL =
  "https://kanhaiyasharmaa-shl-assessment-recommender.hf.space";

const REQUEST_TIMEOUT_MS = 10_000;

type ApiClientOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
};

export class ApiClientError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor({
    message,
    kind,
    status,
  }: {
    message: string;
    kind: ApiErrorKind;
    status?: number;
  }) {
    super(message);
    this.name = "ApiClientError";
    this.kind = kind;
    this.status = status;
  }
}

export async function apiClient<TResponse>(
  path: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const timeoutController = new AbortController();
  const timeoutId = globalThis.setTimeout(
    () => timeoutController.abort(),
    REQUEST_TIMEOUT_MS,
  );

  const abortSignal = composeAbortSignals(options.signal, timeoutController.signal);

  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: abortSignal.signal,
    });

    if (!response.ok) {
      throw new ApiClientError({
        kind: mapStatusToKind(response.status),
        status: response.status,
        message: createHttpErrorMessage(response.status),
      });
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (timeoutController.signal.aborted) {
      throw new ApiClientError({
        kind: "timeout",
        message: "The backend took longer than 10 seconds to respond.",
      });
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiClientError({
        kind: "timeout",
        message: "The backend request was cancelled before it completed.",
      });
    }

    throw new ApiClientError({
      kind: "network",
      message: "The backend is unreachable. Check your connection and try again.",
    });
  } finally {
    abortSignal.cleanup();
    globalThis.clearTimeout(timeoutId);
  }
}

export function getApiErrorTitle(error: unknown): string {
  if (!(error instanceof ApiClientError)) {
    return "Something went wrong";
  }

  switch (error.kind) {
    case "not_found":
      return "Backend endpoint was not found";
    case "validation":
      return "The conversation format was rejected";
    case "server":
      return "The backend hit an internal error";
    case "timeout":
      return "The backend is taking too long";
    case "network":
      return "Could not reach the backend";
    case "unknown":
      return "Unexpected backend response";
  }
}

export function getApiErrorDescription(error: unknown): string {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  return "Please retry the request. If it keeps failing, the service may be temporarily unavailable.";
}

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    DEFAULT_API_BASE_URL
  );
}

function composeAbortSignals(
  externalSignal: AbortSignal | undefined,
  timeoutSignal: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } {
  if (!externalSignal) {
    return { signal: timeoutSignal, cleanup: () => undefined };
  }

  const controller = new AbortController();
  const abort = () => controller.abort();

  if (externalSignal.aborted || timeoutSignal.aborted) {
    abort();
    return { signal: controller.signal, cleanup: () => undefined };
  }

  externalSignal.addEventListener("abort", abort, { once: true });
  timeoutSignal.addEventListener("abort", abort, { once: true });

  return {
    signal: controller.signal,
    cleanup: () => {
      externalSignal.removeEventListener("abort", abort);
      timeoutSignal.removeEventListener("abort", abort);
    },
  };
}

function mapStatusToKind(status: number): ApiErrorKind {
  if (status === 404) {
    return "not_found";
  }

  if (status === 422) {
    return "validation";
  }

  if (status >= 500) {
    return "server";
  }

  return "unknown";
}

function createHttpErrorMessage(status: number) {
  if (status === 404) {
    return "The configured API URL does not expose this endpoint.";
  }

  if (status === 422) {
    return "The backend could not validate the current conversation history.";
  }

  if (status >= 500) {
    return "The recommendation service failed while processing the request.";
  }

  return `The backend returned HTTP ${status}.`;
}
