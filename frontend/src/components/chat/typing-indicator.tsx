import { m } from "framer-motion";

export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <span>HireSense is reasoning</span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <m.span
            key={item}
            className="h-1.5 w-1.5 rounded-full bg-indigo-200"
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: item * 0.12 }}
          />
        ))}
      </span>
    </div>
  );
}
