import { Bot, UserRound } from "lucide-react";
import { m } from "framer-motion";
import type { ReactNode } from "react";

import { MarkdownContent } from "@/components/chat/markdown-content";
import { RecommendationCard } from "@/components/chat/recommendation-card";
import type { ChatMessage } from "@/lib/chat-types";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.34, ease: "easeOut" }}
      className={cn("flex gap-3", isUser && "justify-end")}
    >
      {!isUser ? (
        <Avatar tone="assistant">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </Avatar>
      ) : null}
      <div className={cn("max-w-[min(880px,94%)]", isUser && "order-first")}> 
        <div
          className={cn(
            "rounded-[1.35rem] border px-4 py-3 shadow-soft-xl sm:px-5 sm:py-4",
            isUser
              ? "border-indigo-300/20 bg-indigo-400/15 text-foreground"
              : "border-white/10 bg-white/[0.045]",
          )}
        >
          <MarkdownContent content={message.content} />
        </div>
        {message.recommendations?.length ? (
          <m.div
            layout
            className="mt-4 grid gap-4 lg:grid-cols-2"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
          >
            {message.recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                index={index}
              />
            ))}
          </m.div>
        ) : null}
      </div>
      {isUser ? (
        <Avatar tone="user">
          <UserRound className="h-4 w-4" aria-hidden="true" />
        </Avatar>
      ) : null}
    </m.article>
  );
}

function Avatar({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "assistant" | "user";
}) {
  return (
    <div
      className={cn(
        "mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-2xl border sm:flex",
        tone === "assistant"
          ? "border-white/10 bg-white/[0.06] text-indigo-100"
          : "border-indigo-300/20 bg-indigo-400/15 text-indigo-100",
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
