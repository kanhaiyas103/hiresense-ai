"use client";

import { AlertTriangle, RotateCcw, X } from "lucide-react";
import { m } from "framer-motion";

import { Button } from "@/components/ui/button";

type ApiToastProps = {
  title: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
  onDismiss: () => void;
};

export function ApiToast({
  title,
  description,
  retryLabel = "Retry",
  onRetry,
  onDismiss,
}: ApiToastProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="fixed bottom-28 right-4 z-50 w-[calc(100vw-2rem)] max-w-md rounded-3xl border border-amber-300/20 bg-background/95 p-4 shadow-soft-xl backdrop-blur-2xl sm:right-6"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-[-0.02em]">{title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
          {onRetry ? (
            <Button
              className="mt-3 gap-2"
              type="button"
              size="sm"
              variant="secondary"
              onClick={onRetry}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {retryLabel}
            </Button>
          ) : null}
        </div>
        <button
          type="button"
          className="focus-ring rounded-full p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
          aria-label="Dismiss notification"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </m.div>
  );
}
