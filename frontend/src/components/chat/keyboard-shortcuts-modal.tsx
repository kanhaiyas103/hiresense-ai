"use client";

import { AnimatePresence, m } from "framer-motion";
import { Command, CornerDownLeft, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";

const shortcuts = [
  { keys: "Ctrl/Cmd + K", action: "Search conversations" },
  { keys: "Ctrl/Cmd + N", action: "Start a new chat" },
  { keys: "Enter", action: "Send message" },
  { keys: "Shift + Enter", action: "Add a new line" },
  { keys: "Esc", action: "Close panels" },
  { keys: "/", action: "Focus prompt" },
];

export function KeyboardShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = globalThis.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        ?.focus();
    }, 0);

    return () => {
      globalThis.clearTimeout(focusTimer);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <m.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-background/95 p-5 shadow-soft-xl backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="accent" className="mb-3 gap-2">
                  <Command className="h-3.5 w-3.5" aria-hidden="true" />
                  Shortcuts
                </Badge>
                <h2 className="text-2xl font-semibold tracking-[-0.05em]">Move quickly</h2>
              </div>
              <button type="button" className="focus-ring rounded-full p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground" aria-label="Close shortcuts" onClick={onClose}>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 space-y-2">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.keys} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                  <kbd className="rounded-xl border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-foreground">
                    {shortcut.keys}
                  </kbd>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs text-muted-foreground">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search, compose, and send without leaving the keyboard.
              <CornerDownLeft className="ml-auto h-4 w-4" aria-hidden="true" />
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
