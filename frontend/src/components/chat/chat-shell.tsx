"use client";

import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import { Command, PanelLeft, ShieldCheck, Sparkles, Wifi, WifiOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ApiToast } from "@/components/chat/api-toast";
import { ConversationSidebar } from "@/components/chat/conversation-sidebar";
import { MessageBubble } from "@/components/chat/message-bubble";
import { PromptComposer } from "@/components/chat/prompt-composer";
import { SuggestionCards } from "@/components/chat/suggestion-cards";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getApiErrorDescription,
  getApiErrorTitle,
} from "@/lib/api/api-client";
import { sendChatMessage } from "@/lib/api/chat";
import { getHealth } from "@/lib/api/health";
import type { ChatApiMessage, ChatApiRecommendation } from "@/lib/api/types";
import type { ChatMessage, Conversation, Recommendation } from "@/lib/chat-types";
import {
  createNewConversation,
  initialConversations,
  suggestions,
  workspaceStats,
} from "@/lib/chat-fixtures";

type HealthState = "checking" | "online" | "offline";

type ToastState = {
  title: string;
  description: string;
};

type FailedRequest = {
  conversationId: string;
};

export function ChatShell() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(
    initialConversations[0].id,
  );
  const [search, setSearch] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [healthState, setHealthState] = useState<HealthState>("checking");
  const [pendingConversationId, setPendingConversationId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [failedRequest, setFailedRequest] = useState<FailedRequest | null>(null);
  const searchInputIntentRef = useRef(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const requestAbortRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      [conversation.title, conversation.summary, conversation.status]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [conversations, search]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    conversations[0];
  const activeConversationIsPending = pendingConversationId === activeConversation.id;

  const handleNewConversation = useCallback(() => {
    const conversation = createNewConversation();
    setConversations((current) => [conversation, ...current]);
    setActiveConversationId(conversation.id);
    setPrompt("");
    setToast(null);
    setFailedRequest(null);
    setMobileSidebarOpen(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    getHealth(controller.signal)
      .then((response) => {
        if (isActive) {
          setHealthState(response.status === "ok" ? "online" : "offline");
        }
      })
      .catch(() => {
        if (isActive) {
          setHealthState("offline");
        }
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      requestAbortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeConversation?.messages.length, isTyping]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;

      if (modifier && event.key.toLowerCase() === "n") {
        event.preventDefault();
        handleNewConversation();
      }

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputIntentRef.current = true;
        setSidebarCollapsed(false);
        setMobileSidebarOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNewConversation]);

  useEffect(() => {
    if (!searchInputIntentRef.current) {
      return;
    }

    const input = document.querySelector<HTMLInputElement>(
      'input[placeholder="Search conversations"]',
    );
    input?.focus();
    searchInputIntentRef.current = false;
  }, [sidebarCollapsed, mobileSidebarOpen]);

  async function requestAssistantResponse(
    conversationId: string,
    messages: ChatMessage[],
  ) {
    const controller = new AbortController();
    requestAbortRef.current?.abort();
    requestAbortRef.current = controller;
    setIsTyping(true);
    setPendingConversationId(conversationId);
    setToast(null);
    setFailedRequest(null);

    try {
      const response = await sendChatMessage(
        { messages: toApiMessages(messages) },
        controller.signal,
      );

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        createdAt: new Date().toISOString(),
        recommendations: mapApiRecommendations(response.recommendations),
      };

      if (!isMountedRef.current) {
        return;
      }

      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                status: response.end_of_conversation ? "completed" : "active",
                updatedAt: "Now",
                messages: [...conversation.messages, assistantMessage],
              }
            : conversation,
        ),
      );
      setHealthState("online");
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }

      setToast({
        title: getApiErrorTitle(error),
        description: getApiErrorDescription(error),
      });
      setFailedRequest({ conversationId });
    } finally {
      if (requestAbortRef.current === controller) {
        requestAbortRef.current = null;
      }
      if (isMountedRef.current) {
        setIsTyping(false);
        setPendingConversationId(null);
      }
    }
  }

  async function handleSubmit() {
    const content = prompt.trim();
    if (!content || isTyping) {
      return;
    }

    const conversationId = activeConversation.id;
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    const nextMessages = [...activeConversation.messages, userMessage];

    setPrompt("");
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              title:
                conversation.messages.length === 0
                  ? titleFromPrompt(content)
                  : conversation.title,
              summary: content,
              updatedAt: "Now",
              status: "active",
              messages: nextMessages,
            }
          : conversation,
      ),
    );

    await requestAssistantResponse(conversationId, nextMessages);
  }

  function handleRetry() {
    if (!failedRequest || isTyping) {
      return;
    }

    const conversation = conversations.find(
      (item) => item.id === failedRequest.conversationId,
    );
    if (!conversation) {
      setToast({
        title: "Conversation no longer exists",
        description: "Start a new chat and send the request again.",
      });
      setFailedRequest(null);
      return;
    }

    void requestAssistantResponse(conversation.id, conversation.messages);
  }

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen bg-background text-foreground">
          <ConversationSidebar
            conversations={filteredConversations}
            activeConversationId={activeConversation.id}
            collapsed={sidebarCollapsed}
            mobileOpen={mobileSidebarOpen}
            search={search}
            onSearchChange={setSearch}
            onNewConversation={handleNewConversation}
            onSelectConversation={(id) => {
              setActiveConversationId(id);
              setMobileSidebarOpen(false);
            }}
            onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
            onToggleMobile={() => setMobileSidebarOpen((value) => !value)}
          />

          <main className="flex min-h-screen min-w-0 flex-1 flex-col">
            <ChatTopbar
              title={activeConversation.title}
              healthState={healthState}
              sidebarCollapsed={sidebarCollapsed}
              onOpenSidebar={() => setSidebarCollapsed(false)}
            />

            <section className="relative flex min-h-0 flex-1 flex-col">
              <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-80 opacity-60" />
              <div className="relative flex-1 overflow-y-auto px-4 pb-36 pt-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-8">
                  {activeConversation.messages.length === 0 ? (
                    <EmptyConversation onSelectPrompt={setPrompt} />
                  ) : (
                    <>
                      <ConversationContext conversation={activeConversation} />
                      <div className="space-y-6">
                        {activeConversation.messages.map((message) => (
                          <MessageBubble key={message.id} message={message} />
                        ))}
                        {activeConversationIsPending ? <TypingIndicator /> : null}
                        <div ref={scrollAnchorRef} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-20 sm:px-6 lg:px-8">
                <div className="pointer-events-auto mx-auto max-w-4xl">
                  <PromptComposer
                    value={prompt}
                    disabled={isTyping}
                    onChange={setPrompt}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </section>
          </main>

          <AnimatePresence>
            {toast ? (
              <ApiToast
                title={toast.title}
                description={toast.description}
                onDismiss={() => setToast(null)}
                onRetry={failedRequest ? handleRetry : undefined}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

function ChatTopbar({
  title,
  healthState,
  sidebarCollapsed,
  onOpenSidebar,
}: {
  title: string;
  healthState: HealthState;
  sidebarCollapsed: boolean;
  onOpenSidebar: () => void;
}) {
  const isOnline = healthState === "online";
  const healthLabel =
    healthState === "checking"
      ? "Checking API"
      : isOnline
        ? "Backend connected"
        : "Backend unavailable";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/78 backdrop-blur-2xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 pl-12 lg:pl-0">
          {sidebarCollapsed ? (
            <Button
              className="hidden lg:inline-flex"
              variant="ghost"
              size="icon"
              aria-label="Open sidebar"
              onClick={onOpenSidebar}
            >
              <PanelLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.03em]">{title}</p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Real SHL backend · stateless conversation API
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Badge className="hidden gap-1.5 sm:inline-flex">
            {isOnline ? (
              <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {healthLabel}
          </Badge>
          <Badge className="hidden gap-1.5 sm:inline-flex">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            SHL catalog
          </Badge>
          <Badge className="hidden gap-1.5 md:inline-flex">
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            ⌘K · ⌘N
          </Badge>
        </div>
      </div>
    </header>
  );
}

function EmptyConversation({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-4xl flex-col justify-center py-16">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="text-center"
      >
        <Badge variant="accent" className="mb-5 gap-2">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Conversational assessment intelligence
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.07em] sm:text-5xl lg:text-6xl">
          Start with the role.
          <span className="block bg-gradient-to-r from-indigo-200 via-sky-100 to-white bg-clip-text text-transparent">
            HireSense shapes the assessment plan.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
          Ask for SHL assessment recommendations, compare options, or refine a
          shortlist using the deployed catalog-grounded backend.
        </p>
      </m.div>

      <div className="mt-10">
        <SuggestionCards suggestions={suggestions} onSelect={onSelectPrompt} />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {workspaceStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] text-emerald-100">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-[-0.05em]">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConversationContext({ conversation }: { conversation: Conversation }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Conversation brief
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-[-0.04em]">
            {conversation.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{conversation.status}</Badge>
          <Badge>{conversation.updatedAt}</Badge>
        </div>
      </div>
    </m.div>
  );
}

function toApiMessages(messages: ChatMessage[]): ChatApiMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function mapApiRecommendations(
  recommendations: ChatApiRecommendation[],
): Recommendation[] {
  return recommendations.map((recommendation, index) => ({
    id: `${recommendation.name}-${index}`,
    name: recommendation.name,
    url: recommendation.url,
    testType: recommendation.test_type,
  }));
}

function titleFromPrompt(prompt: string) {
  const words = prompt.split(/\s+/).filter(Boolean).slice(0, 5).join(" ");
  return words.length > 36 ? `${words.slice(0, 36)}…` : words || "New conversation";
}
