import type { LucideIcon } from "lucide-react";

export type ConversationStatus = "active" | "draft" | "completed" | "archived";

export type ChatRole = "assistant" | "user";

export type Recommendation = {
  id: string;
  name: string;
  url: string;
  testType: string;
  description?: string;
  duration?: string;
  confidence?: number;
  rationale?: string;
  skills?: string[];
  adaptive?: boolean;
  remoteTesting?: boolean;
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
  pinned?: boolean;
};

export type Suggestion = {
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
};
