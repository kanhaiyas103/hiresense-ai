import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Headphones,
  LineChart,
  ShieldAlert,
} from "lucide-react";

import type { Conversation, Recommendation, Suggestion } from "@/lib/chat-types";

const now = new Date("2026-07-04T09:30:00.000Z").toISOString();

const sampleRecommendations: Recommendation[] = [
  {
    id: "java-new",
    name: "Java New",
    url: "https://www.shl.com/products/product-catalog/view/java-new/",
    testType: "K",
    description:
      "Measures practical Java knowledge for backend engineering roles where language fluency and applied software judgment matter.",
    duration: "30 min",
    confidence: 0.96,
    rationale:
      "Strong fit for backend Java hiring where language fluency and practical software knowledge matter.",
    skills: ["Java", "Backend", "Programming"],
    adaptive: false,
    remoteTesting: true,
  },
  {
    id: "verify-interactive-java",
    name: "Verify Interactive - Java",
    url: "https://www.shl.com/products/product-catalog/view/verify-interactive-java/",
    testType: "K",
    description:
      "Adds a more hands-on coding signal when the team wants evidence closer to day-to-day engineering work.",
    duration: "36 min",
    confidence: 0.92,
    rationale:
      "Useful when the hiring team wants a more work-sample oriented signal for real coding ability.",
    skills: ["Java", "Problem solving", "Live coding"],
    adaptive: false,
    remoteTesting: true,
  },
  {
    id: "computer-science",
    name: "Computer Science",
    url: "https://www.shl.com/products/product-catalog/view/computer-science/",
    testType: "K",
    description:
      "Broad technical fundamentals coverage for algorithms, computing concepts, and general engineering reasoning.",
    duration: "25 min",
    confidence: 0.88,
    rationale:
      "Adds breadth across algorithms, fundamentals, and general engineering reasoning.",
    skills: ["Algorithms", "CS fundamentals", "Reasoning"],
    adaptive: false,
    remoteTesting: true,
  },
];

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

export const initialConversations: Conversation[] = [
  {
    id: "conv-java",
    title: "Senior Java backend role",
    summary: "Shortlist for Java backend assessment coverage.",
    status: "active",
    updatedAt: "Today, 10:12",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "We are hiring a senior Java backend engineer. I care about practical coding ability and keeping tests under 40 minutes.",
        createdAt: now,
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "I’d prioritize a balanced technical slate: **Java language depth**, practical coding signal, and a lightweight fundamentals check.\n\nThe strongest catalog-backed options are below. I would start with Java New, then add Verify Interactive if you want a more hands-on coding signal.",
        createdAt: now,
        recommendations: sampleRecommendations,
      },
    ],
  },
  {
    id: "conv-support",
    title: "Contact center screening",
    summary: "Inbound calls, spoken English, customer service.",
    status: "draft",
    updatedAt: "Yesterday",
    messages: [
      {
        id: "m3",
        role: "user",
        content:
          "Need a customer service assessment for contact-center candidates handling inbound calls.",
        createdAt: now,
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "For contact-center hiring, I’d clarify caller language and accent expectations before finalizing the shortlist. Spoken English and customer-service simulations tend to be the most useful signals here.",
        createdAt: now,
      },
    ],
  },
  {
    id: "conv-finance",
    title: "Graduate finance program",
    summary: "Numerical reasoning and situational judgement.",
    status: "completed",
    updatedAt: "Jun 30",
    messages: [
      {
        id: "m5",
        role: "user",
        content:
          "Create a shortlist for graduate finance analysts. We need reasoning and judgement.",
        createdAt: now,
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "A good graduate finance assessment mix should combine numerical reasoning with early-career judgement scenarios. This keeps the signal broader than spreadsheet knowledge alone.",
        createdAt: now,
      },
    ],
  },
];

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
