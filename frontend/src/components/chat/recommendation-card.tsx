"use client";

import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  FileText,
  RadioTower,
  Share2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { memo, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

import type { Recommendation } from "@/lib/chat-types";
import { cn } from "@/lib/utils";

type RecommendationCardProps = {
  recommendation: Recommendation;
  index?: number;
};

const TEST_TYPE_LABELS: Record<string, string> = {
  K: "Knowledge & Skills",
  A: "Ability & Aptitude",
  P: "Personality & Behavior",
  C: "Competencies",
  S: "Simulation",
  B: "Biodata & Situational Judgement",
  D: "Development & 360",
  E: "Assessment Exercises",
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
  "REST API",
  "REST",
  "SQL",
  "Excel",
  "Word",
  "Microsoft Office",
  "Customer Service",
  "Contact Center",
  "Call Center",
  "Spoken English",
  "Finance",
  "Accounting",
  "Statistics",
  "Numerical Reasoning",
  "Safety",
  "Dependability",
  "Healthcare",
  "HIPAA",
  "Reasoning",
  "Judgement",
] as const;

const DEFAULT_RATIONALE =
  "Selected because it aligns with the requested role and required skills.";

function RecommendationCardComponent({
  recommendation,
  index = 0,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const viewModel = useMemo(() => buildRecommendationViewModel(recommendation), [recommendation]);

  async function notifyCopy(value: string, label: string) {
    try {
      await copyText(value);
      setToast(label);
    } catch {
      setToast("Copy unavailable");
    }
    globalThis.setTimeout(() => setToast(null), 1600);
  }

  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.36, ease: "easeOut", delay: index * 0.065 }}
      whileHover={{ y: -5 }}
      className="group relative isolate overflow-hidden rounded-[1.85rem] p-px"
    >
      <div
        className="absolute inset-0 rounded-[1.85rem] bg-[linear-gradient(135deg,rgba(129,140,248,0.55),rgba(45,212,191,0.22),rgba(244,244,245,0.12),rgba(129,140,248,0.36))] opacity-45 blur-[0.5px] transition duration-500 group-hover:opacity-90"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-[calc(1.85rem-1px)] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0.94),rgba(9,9,11,0.92))] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-300 group-hover:border-indigo-200/25 group-hover:shadow-[0_30px_95px_rgba(79,70,229,0.18)] sm:p-6">
        <div
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          aria-hidden="true"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone="indigo">{viewModel.testTypeLabel}</StatusBadge>
              <StatusBadge tone={viewModel.confidenceLabel === "Catalog Match" ? "slate" : "emerald"}>
                {viewModel.confidenceLabel}
              </StatusBadge>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                SHL Assessment
              </p>
              <h3 className="text-balance text-lg font-semibold tracking-[-0.04em] text-foreground sm:text-xl">
                {recommendation.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            className={cn(
              "focus-ring rounded-full border p-2.5 transition duration-200",
              bookmarked
                ? "border-amber-300/30 bg-amber-300/12 text-amber-100 shadow-[0_0_25px_rgba(252,211,77,0.12)]"
                : "border-white/10 bg-white/[0.045] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground",
            )}
            aria-label={bookmarked ? `Remove bookmark for ${recommendation.name}` : `Bookmark ${recommendation.name}`}
            aria-pressed={bookmarked}
            onClick={() => setBookmarked((value) => !value)}
          >
            <m.span
              animate={bookmarked ? { scale: [1, 1.22, 1], rotate: [0, -7, 0] } : { scale: 1 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="block"
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} aria-hidden="true" />
            </m.span>
          </button>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <MetaTile icon={Clock3} label="Duration" value={viewModel.durationLabel} />
          <MetaTile icon={RadioTower} label="Remote Testing" value={viewModel.remoteTestingLabel} />
          {recommendation.adaptive ? (
            <MetaTile icon={Zap} label="Adaptive / IRT" value="Adaptive Assessment" accent />
          ) : null}
          <MetaTile icon={ShieldCheck} label="Source" value="Official SHL Catalog" accent />
        </div>

        <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-indigo-200" aria-hidden="true" />
            Why it fits
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{viewModel.rationale}</p>
        </section>

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
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Search signals
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {viewModel.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={recommendation.url}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 shadow-soft-xl transition hover:-translate-y-0.5 hover:bg-zinc-200"
              aria-label={`Open official SHL page for ${recommendation.name}`}
            >
              Open Official SHL
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <IconButton
              label={`Copy assessment name: ${recommendation.name}`}
              icon={FileText}
              onClick={() => void notifyCopy(recommendation.name, "Assessment name copied")}
            />
            <IconButton
              label={`Copy assessment URL for ${recommendation.name}`}
              icon={Copy}
              onClick={() => void notifyCopy(recommendation.url, "Assessment URL copied")}
            />
            <IconButton
              label={`Share ${recommendation.name}`}
              icon={Share2}
              onClick={() => void notifyCopy(recommendation.url, "Share link copied")}
            />
          </div>

          <button
            type="button"
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 text-xs font-medium text-muted-foreground transition hover:bg-white/[0.07] hover:text-foreground"
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} details for ${recommendation.name}`}
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
              className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100 shadow-soft-xl backdrop-blur-xl"
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

export const RecommendationCard = memo(RecommendationCardComponent);

function buildRecommendationViewModel(recommendation: Recommendation) {
  const testTypeLabel = friendlyTestType(recommendation.testType);
  const confidenceLabel =
    typeof recommendation.confidence === "number"
      ? `${Math.round(recommendation.confidence * 100)}% Match`
      : "Catalog Match";
  const durationLabel = recommendation.duration ?? "Duration not specified";
  const remoteTestingLabel = recommendation.remoteTesting
    ? "Remote Testing Available"
    : "Availability not specified";
  const rationale = recommendation.rationale?.trim() || DEFAULT_RATIONALE;
  const skills = extractSkills(recommendation, rationale, testTypeLabel);

  return {
    confidenceLabel,
    durationLabel,
    rationale,
    remoteTestingLabel,
    skills,
    testTypeLabel,
  };
}

function friendlyTestType(value: string) {
  return TEST_TYPE_LABELS[value] ?? (value || "Assessment");
}

function StatusBadge({ children, tone }: { children: string; tone: "emerald" | "indigo" | "slate" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        tone === "emerald" && "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
        tone === "indigo" && "border-indigo-300/20 bg-indigo-300/10 text-indigo-100",
        tone === "slate" && "border-white/10 bg-white/[0.055] text-zinc-200",
      )}
    >
      {children}
    </span>
  );
}

function MetaTile({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3 transition",
        accent
          ? "border-emerald-300/15 bg-emerald-300/[0.065]"
          : "border-white/10 bg-white/[0.035]",
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
            accent ? "bg-emerald-300/10 text-emerald-100" : "bg-white/[0.055] text-indigo-100",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium leading-5 text-zinc-100">{value}</p>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-muted-foreground transition hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-foreground"
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function extractSkills(
  recommendation: Recommendation,
  rationale: string,
  testTypeLabel: string,
) {
  if (recommendation.skills?.length) {
    return recommendation.skills.slice(0, 5);
  }

  const source = `${recommendation.name} ${recommendation.testType} ${testTypeLabel} ${rationale}`.toLowerCase();
  const matches = KNOWN_SKILLS.filter((skill) => source.includes(skill.toLowerCase()));

  if (matches.length) {
    return matches.slice(0, 5);
  }

  return [testTypeLabel, "SHL Catalog"];
}

async function copyText(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    throw new Error("Clipboard API is unavailable");
  }

  await navigator.clipboard.writeText(value);
}
