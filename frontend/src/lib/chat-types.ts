import type { LucideIcon } from "lucide-react";

export type ConversationStatus = "active" | "draft" | "completed";

export type ChatRole = "assistant" | "user";

export type Recommendation = {
  id: string;
  name: string;
  url: string;
  testType: string;
  duration?: string;
  confidence?: number;
  rationale?: string;
  skills?: string[];
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  recommendations?: Recommendation[];
};

export type Conversation = {
  id: string;
  title: string;
  summary: string;
  status: ConversationStatus;
  updatedAt: string;
  messages: ChatMessage[];
};

export type Suggestion = {
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
};
