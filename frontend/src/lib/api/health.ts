import { apiClient } from "@/lib/api/api-client";
import type { HealthApiResponse } from "@/lib/api/types";

export async function getHealth(signal?: AbortSignal) {
  return apiClient<HealthApiResponse>("/health", { signal });
}
