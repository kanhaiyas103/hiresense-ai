import { apiClient } from "@/lib/api/api-client";
import type { ChatApiRequest, ChatApiResponse } from "@/lib/api/types";

export async function sendChatMessage(
  request: ChatApiRequest,
  signal?: AbortSignal,
) {
  return apiClient<ChatApiResponse>("/chat", {
    method: "POST",
    body: request,
    signal,
  });
}
