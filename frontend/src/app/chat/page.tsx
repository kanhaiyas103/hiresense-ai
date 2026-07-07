import type { Metadata } from "next";

import { ChatShell } from "@/components/chat/chat-shell";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with HireSense AI to get grounded SHL assessment recommendations.",
};

export default function ChatPage() {
  return <ChatShell />;
}
