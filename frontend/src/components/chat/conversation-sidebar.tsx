"use client";

import {
  Archive,
  Check,
  Menu,
  MessageSquarePlus,
  PanelLeftClose,
  Pencil,
  Pin,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { m } from "framer-motion";
import { useState } from "react";

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
  onRenameConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onPinConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
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
  onRenameConversation,
  onDeleteConversation,
  onPinConversation,
  onArchiveConversation,
  onToggleCollapsed,
  onToggleMobile,
}: ConversationSidebarProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  function startRename(conversation: Conversation) {
    setRenamingId(conversation.id);
    setDraftTitle(conversation.title);
  }

  function commitRename() {
    if (!renamingId) {
      return;
    }
    const title = draftTitle.trim();
    if (title) {
      onRenameConversation(renamingId, title);
    }
    setRenamingId(null);
    setDraftTitle("");
  }

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
              {conversations.length === 0 ? (
                <EmptyConversationList collapsed={collapsed} searching={Boolean(search.trim())} />
              ) : null}
              {conversations.map((conversation) => (
                <m.div
                  key={conversation.id}
                  layout
                  className={cn(
                    "group rounded-2xl border transition",
                    conversation.id === activeConversationId
                      ? "border-indigo-300/25 bg-indigo-400/10"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.045]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelectConversation(conversation.id)}
                    className="focus-ring w-full rounded-2xl px-3 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xs font-semibold">
                        {conversation.pinned ? <Pin className="h-3.5 w-3.5" aria-hidden="true" /> : conversation.title.charAt(0)}
                      </span>
                      {!collapsed ? (
                        <span className="min-w-0 flex-1">
                          {renamingId === conversation.id ? (
                            <span className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
                              <input
                                value={draftTitle}
                                autoFocus
                                onChange={(event) => setDraftTitle(event.target.value)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") commitRename();
                                  if (event.key === "Escape") setRenamingId(null);
                                }}
                                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-2 py-1 text-sm outline-none"
                              />
                              <button type="button" aria-label="Save name" onClick={commitRename}>
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            </span>
                          ) : (
                            <span className="block truncate text-sm font-medium">
                              {conversation.title}
                            </span>
                          )}
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
                  </button>
                  {!collapsed ? (
                    <div className="flex items-center gap-1 px-2 pb-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                      <IconAction label="Rename chat" onClick={() => startRename(conversation)} icon={Pencil} />
                      <IconAction label={conversation.pinned ? "Unpin chat" : "Pin chat"} onClick={() => onPinConversation(conversation.id)} icon={Pin} />
                      <IconAction label="Archive chat" onClick={() => onArchiveConversation(conversation.id)} icon={Archive} />
                      <IconAction label="Delete chat" onClick={() => onDeleteConversation(conversation.id)} icon={Trash2} danger />
                    </div>
                  ) : null}
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function IconAction({
  label,
  onClick,
  icon: Icon,
  danger = false,
}: {
  label: string;
  onClick: () => void;
  icon: typeof X;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "focus-ring rounded-full p-1.5 text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground",
        danger && "hover:text-rose-200",
      )}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}

function EmptyConversationList({ collapsed, searching }: { collapsed: boolean; searching: boolean }) {
  if (collapsed) return null;
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-center">
      <p className="text-sm font-medium">{searching ? "No conversations found" : "No active chats"}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {searching ? "Try another search term or start a new chat." : "Start with a role, skill, or hiring scenario."}
      </p>
    </div>
  );
}
