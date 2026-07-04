"use client";

import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  RadioTower,
  Share2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/chat-types";
import { cn } from "@/lib/utils";

type RecommendationCardProps = {
  recommendation: Recommendation;
  index?: number;
};

const KNOWN_SKILLS = [
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Angular",
  "Spring",
  "Docker",
  "Linux",
  "Networking",
  "REST",
  "SQL",
  "Excel",
  "Word",
  "Customer Service",
  "Contact Center",
  "Call Center",
  "Spoken English",
  "Finance",
  "Accounting",
  "Statistics",
  "Numerical",
  "Safety",
  "Dependability",
  "Healthcare",
  "HIPAA",
  "Reasoning",
  "Judgement",
] as const;

export function RecommendationCard({ recommendation, index = 0 }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const description =
    recommendation.description ??
    recommendation.rationale ??
    "Official SHL catalog assessment recommended by the deployed assessment intelligence engine.";
  const skills = useMemo(() => extractSkills(recommendation, description), [recommendation, description]);
  const matchScore = recommendation.confidence
    ? Math.round(recommendation.confidence * 100)
    : null;
  const collapsedDescription =
    description.length > 138 ? `${description.slice(0, 138).trim()}…` : description;

  async function handleCopy() {
    await copyText(recommendation.url);
    setToast("URL copied");
    globalThis.setTimeout(() => setToast(null), 1600);
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: recommendation.name,
          text: `SHL assessment: ${recommendation.name}`,
          url: recommendation.url,
        });
        return;
      } catch {
        // Fall back to copying below when native share is unavailable or cancelled.
      }
    }

    await handleCopy();
  }

  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: "easeOut", delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative isolate overflow-hidden rounded-[1.75rem] p-px"
    >
      <div
        className="absolute inset-0 rounded-[1.75rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(129,140,248,0.08),rgba(56,189,248,0.32),rgba(16,185,129,0.18),rgba(129,140,248,0.08))] opacity-60 blur-[0.5px] transition duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative rounded-[calc(1.75rem-1px)] border border-white/10 bg-zinc-950/78 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 group-hover:border-indigo-200/20 group-hover:bg-zinc-950/88 sm:p-5">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="accent" className="px-2.5 py-0.5 font-semibold text-indigo-50">
                {recommendation.testType}
              </Badge>
              {matchScore ? <MatchBadge score={matchScore} /> : <VerifiedBadge />}
              {recommendation.duration ? <MetaPill icon={Clock3} label={recommendation.duration} /> : null}
            </div>
            <h3 className="text-balance text-base font-semibold tracking-[-0.035em] text-foreground sm:text-lg">
              {recommendation.name}
            </h3>
          </div>

          <button
            type="button"
            className={cn(
              "focus-ring rounded-full border p-2.5 transition",
              bookmarked
                ? "border-amber-300/30 bg-amber-300/12 text-amber-100"
                : "border-white/10 bg-white/[0.045] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground",
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark recommendation"}
            aria-pressed={bookmarked}
            onClick={() => setBookmarked((value) => !value)}
          >
            <m.span
              animate={bookmarked ? { scale: [1, 1.24, 1], rotate: [0, -8, 0] } : { scale: 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="block"
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} aria-hidden="true" />
            </m.span>
          </button>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {expanded ? description : collapsedDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <m.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
                {recommendation.remoteTesting !== undefined ? (
                  <CapabilityPill
                    icon={RadioTower}
                    label={recommendation.remoteTesting ? "Remote testing" : "Onsite preferred"}
                    active={recommendation.remoteTesting}
                  />
                ) : null}
                {recommendation.adaptive !== undefined ? (
                  <CapabilityPill
                    icon={Zap}
                    label={recommendation.adaptive ? "Adaptive / IRT" : "Non-adaptive"}
                    active={recommendation.adaptive}
                  />
                ) : null}
                <CapabilityPill icon={ShieldCheck} label="Official SHL URL" active />
                <CapabilityPill icon={Sparkles} label="Catalog-grounded" active />
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <a
              href={recommendation.url}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 shadow-soft-xl transition hover:bg-zinc-200"
            >
              Official SHL
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
              aria-label={`Copy URL for ${recommendation.name}`}
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
              aria-label={`Share ${recommendation.name}`}
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full px-3 text-xs font-medium text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Collapse" : "Details"}
            <m.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </m.span>
          </button>
        </div>

        <AnimatePresence>
          {toast ? (
            <m.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100 shadow-soft-xl backdrop-blur-xl"
              role="status"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              {toast}
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </m.article>
  );
}

function MatchBadge({ score }: { score: number }) {
  return (
    <span className="relative inline-flex overflow-hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
      <m.span
        className="absolute inset-y-0 left-0 bg-emerald-200/10"
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-hidden="true"
      />
      <span className="relative">{score}% Match</span>
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Verified
    </span>
  );
}

function MetaPill({ icon: Icon, label }: { icon: typeof Clock3; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

function CapabilityPill({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof ShieldCheck;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs",
        active
          ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-100"
          : "border-white/10 bg-white/[0.04] text-muted-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </div>
  );
}

function extractSkills(recommendation: Recommendation, description: string) {
  if (recommendation.skills?.length) {
    return recommendation.skills.slice(0, 5);
  }

  const source = `${recommendation.name} ${recommendation.testType} ${description}`.toLowerCase();
  const matches = KNOWN_SKILLS.filter((skill) => source.includes(skill.toLowerCase()));

  if (matches.length) {
    return matches.slice(0, 5);
  }

  return [recommendation.testType, "SHL Catalog"];
}

async function copyText(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(value);
  }
}

