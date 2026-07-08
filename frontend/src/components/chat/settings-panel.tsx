"use client";

import { AnimatePresence, m } from "framer-motion";
import { Activity, CheckCircle2, Keyboard, Moon, RotateCcw, Settings, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHealth } from "@/lib/api/health";

type SettingsPanelProps = {
  open: boolean;
  apiStatus: "checking" | "online" | "offline";
  conversationCount: number;
  onClose: () => void;
  onClearConversations: () => void;
  onOpenShortcuts: () => void;
  onApiStatusChange: (status: "checking" | "online" | "offline") => void;
};

export function SettingsPanel({
  open,
  apiStatus,
  conversationCount,
  onClose,
  onClearConversations,
  onOpenShortcuts,
  onApiStatusChange,
}: SettingsPanelProps) {
  const [checking, setChecking] = useState(false);
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

  async function handleHealthCheck() {
    setChecking(true);
    onApiStatusChange("checking");
    try {
      const response = await getHealth();
      onApiStatusChange(response.status === "ok" ? "online" : "offline");
    } catch {
      onApiStatusChange("offline");
    } finally {
      setChecking(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Settings"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <m.div
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-background/95 p-5 shadow-soft-xl backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="accent" className="mb-3 gap-2">
                  <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                  Product settings
                </Badge>
                <h2 className="text-2xl font-semibold tracking-[-0.05em]">Workspace controls</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Tune the local product experience without changing backend behavior.
                </p>
              </div>
              <button
                type="button"
                className="focus-ring rounded-full p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
                aria-label="Close settings"
                onClick={onClose}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <SettingCard icon={Moon} title="Theme" description="Switch between light and dark presentation.">
                <ThemeToggle />
              </SettingCard>
              <SettingCard icon={Activity} title="Reduced motion" description="Honors your system accessibility preference.">
                <Badge>System controlled</Badge>
              </SettingCard>
              <SettingCard icon={Keyboard} title="Keyboard shortcuts" description="View every supported shortcut.">
                <Button type="button" size="sm" variant="secondary" onClick={onOpenShortcuts}>
                  View shortcuts
                </Button>
              </SettingCard>
              <SettingCard icon={CheckCircle2} title="API status" description={`Backend is currently ${apiStatus}.`}>
                <Button type="button" size="sm" variant="secondary" onClick={handleHealthCheck} disabled={checking}>
                  {checking ? "Checking…" : "Health check"}
                </Button>
              </SettingCard>
              <SettingCard icon={Trash2} title="Clear conversation" description={`${conversationCount} visible conversations in this workspace.`}>
                <Button type="button" size="sm" variant="secondary" onClick={onClearConversations}>
                  <RotateCcw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                  Reset
                </Button>
              </SettingCard>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Version</span> HireSense AI frontend v1.0 · Backend contract: SHL /chat v1
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

function SettingCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Settings;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <Icon className="h-4 w-4 text-indigo-200" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">{description}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
