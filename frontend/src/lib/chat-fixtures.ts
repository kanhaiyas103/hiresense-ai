import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Headphones,
  LineChart,
  ShieldAlert,
} from "lucide-react";

import type { Conversation, Suggestion } from "@/lib/chat-types";

export const suggestions: Suggestion[] = [
  {
    title: "Build a Java shortlist",
    description: "Senior backend engineer, 30 minute max, remote friendly.",
    prompt:
      "I need assessments for a senior Java backend engineer. Keep the shortlist under 30 minutes where possible.",
    icon: Code2,
  },
  {
    title: "Screen support agents",
    description: "Contact-center, spoken English, inbound customer calls.",
    prompt:
      "Recommend SHL assessments for contact-center agents handling inbound calls in spoken English.",
    icon: Headphones,
  },
  {
    title: "Graduate finance intake",
    description: "Numerical reasoning, judgement, and early-career potential.",
    prompt:
      "We are hiring graduate finance analysts and need numerical reasoning plus situational judgement coverage.",
    icon: LineChart,
  },
  {
    title: "Safety-critical operators",
    description: "Dependability, procedure compliance, reliability.",
    prompt:
      "Find assessments for plant operators where safety, dependability, and procedure compliance are important.",
    icon: ShieldAlert,
  },
];

export const initialConversations: Conversation[] = [];

export function createNewConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "Untitled assessment search",
    summary: "New conversation",
    status: "draft",
    updatedAt: "Now",
    messages: [],
  };
}

export const workspaceStats = [
  { label: "Catalog-only", value: "377", icon: BadgeCheck },
  { label: "Active searches", value: "12", icon: BriefcaseBusiness },
];
