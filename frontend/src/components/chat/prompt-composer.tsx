"use client";

import { CornerDownLeft, Mic, Paperclip, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PromptComposerProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function PromptComposer({
  value,
  disabled = false,
  onChange,
  onSubmit,
}: PromptComposerProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");

      if (event.key === "/" && !isEditableTarget) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    input.style.height = "0px";
    input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <form
      className={cn(
        "rounded-[1.75rem] border bg-background/80 p-2 shadow-soft-xl backdrop-blur-xl transition",
        focused ? "border-indigo-300/35" : "border-white/10",
      )}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-end gap-2">
        <div className="hidden gap-1 sm:flex">
          <Button type="button" variant="ghost" size="icon" aria-label="Attach file" disabled>
            <Paperclip className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Voice input" disabled>
            <Mic className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <textarea
          ref={inputRef}
          value={value}
          rows={1}
          disabled={disabled}
          placeholder="Describe the role, skills, seniority, time limit, or assessment names..."
          className="min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <Button
          type="submit"
          disabled={disabled || !value.trim()}
          size="icon"
          aria-label="Send message"
        >
          {disabled ? (
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
          ) : (
            <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      <div className="flex items-center justify-between px-3 pb-1 pt-2 text-[11px] text-muted-foreground">
        <span>Enter to send · Shift Enter for newline · / to focus</span>
        <span className="hidden sm:inline">Connected to SHL backend</span>
      </div>
    </form>
  );
}
