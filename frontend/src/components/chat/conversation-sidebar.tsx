"use client";

import { Menu, MessageSquarePlus, PanelLeftClose, Search, Sparkles } from "lucide-react";
import { m } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { Conversation } from "@/lib/chat-types";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ConversationSidebarProps = {
  conversations: Conversation[];
  activeConversationId: string;
  collapsed: boolean;
  mobileOpen: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onToggleCollapsed: () => void;
  onToggleMobile: () => void;
};

export function ConversationSidebar({
  conversations,
  activeConversationId,
  collapsed,
  mobileOpen,
  search,
  onSearchChange,
  onNewConversation,
  onSelectConversation,
  onToggleCollapsed,
  onToggleMobile,
}: ConversationSidebarProps) {
  return (
    <>
      <Button
        className="fixed left-4 top-4 z-50 lg:hidden"
        variant="secondary"
        size="icon"
        aria-label="Open conversations"
        aria-controls="conversation-sidebar"
        aria-expanded={mobileOpen}
        onClick={onToggleMobile}
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onToggleMobile}
        aria-hidden="true"
      />

      <aside
        id="conversation-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex border-r border-white/10 bg-background/90 backdrop-blur-2xl transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "w-[88px]" : "w-[320px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Conversation navigation"
        aria-modal={mobileOpen ? "true" : undefined}
        role={mobileOpen ? "dialog" : "navigation"}
      >
        <div className="flex min-w-0 flex-1 flex-col p-3">
          <div className="flex h-12 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-indigo-100 shadow-glow">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              {!collapsed ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[-0.03em]">
                    {siteConfig.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">Recruiting copilot</p>
                </div>
              ) : null}
            </div>
            <Button
              className="hidden lg:inline-flex"
              variant="ghost"
              size="icon"
              aria-label="Collapse sidebar"
              onClick={onToggleCollapsed}
            >
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <Button className="mt-4 w-full justify-start gap-2" onClick={onNewConversation}>
            <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
            {!collapsed ? "New chat" : null}
          </Button>

          {!collapsed ? (
            <label className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Search conversations</span>
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search conversations"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </label>
          ) : null}

          <div className="mt-5 flex-1 overflow-y-auto pr-1">
            {!collapsed ? (
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Conversations
              </p>
            ) : null}
            <div className="space-y-1.5">
              {conversations.map((conversation) => (
                <m.button
                  key={conversation.id}
                  layout
                  type="button"
                  onClick={() => onSelectConversation(conversation.id)}
                  className={cn(
                    "focus-ring w-full rounded-2xl border px-3 py-3 text-left transition",
                    conversation.id === activeConversationId
                      ? "border-indigo-300/25 bg-indigo-400/10"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.045]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xs font-semibold">
                      {conversation.title.charAt(0)}
                    </span>
                    {!collapsed ? (
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {conversation.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {conversation.summary}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  {!collapsed ? (
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="capitalize">{conversation.status}</span>
                      <span>{conversation.updatedAt}</span>
                    </div>
                  ) : null}
                </m.button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
