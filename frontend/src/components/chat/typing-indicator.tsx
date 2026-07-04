import { m } from "framer-motion";

export function TypingIndicator() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="max-w-2xl rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 shadow-soft-xl backdrop-blur-xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
      <div className="mt-4 space-y-2" aria-hidden="true">
        {["w-11/12", "w-9/12", "w-7/12"].map((width, index) => (
          <m.div
            key={width}
            className={`${width} h-2 rounded-full bg-white/10`}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.12 }}
          />
        ))}
      </div>
    </m.div>
  );
}
