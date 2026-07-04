export type ApiRole = "user" | "assistant";

export type ChatApiMessage = {
  role: ApiRole;
  content: string;
};

export type ChatApiRequest = {
  messages: ChatApiMessage[];
};

export type ChatApiRecommendation = {
  name: string;
  url: string;
  test_type: string;
};

export type ChatApiResponse = {
  reply: string;
  recommendations: ChatApiRecommendation[];
  end_of_conversation: boolean;
};

export type HealthApiResponse = {
  status: "ok";
};

export type ApiErrorKind =
  | "not_found"
  | "validation"
  | "server"
  | "timeout"
  | "network"
  | "unknown";
