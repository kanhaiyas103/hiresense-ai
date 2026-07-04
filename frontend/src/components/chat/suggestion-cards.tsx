import { m } from "framer-motion";

import type { Suggestion } from "@/lib/chat-types";

type SuggestionCardsProps = {
  suggestions: Suggestion[];
  onSelect: (prompt: string) => void;
};

export function SuggestionCards({ suggestions, onSelect }: SuggestionCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {suggestions.map((suggestion, index) => (
        <m.button
          key={suggestion.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut", delay: index * 0.05 }}
          type="button"
          onClick={() => onSelect(suggestion.prompt)}
          className="focus-ring group rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-left transition hover:border-indigo-300/30 hover:bg-white/[0.075]"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-100">
              <suggestion.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[-0.02em]">
                {suggestion.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {suggestion.description}
              </span>
            </span>
          </div>
        </m.button>
      ))}
    </div>
  );
}

