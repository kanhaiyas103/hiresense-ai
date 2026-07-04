import { ArrowUpRight, Clock3, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/lib/chat-types";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const skills = recommendation.skills ?? [recommendation.testType];

  return (
    <article className="group rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:border-indigo-300/30 hover:bg-white/[0.055]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold tracking-[-0.02em]">
            {recommendation.name}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">{recommendation.testType}</p>
        </div>
        <a
          href={recommendation.url}
          className="focus-ring rounded-full p-2 text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
          aria-label={`Open ${recommendation.name}`}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        {recommendation.rationale ??
          "Catalog-backed recommendation returned by the SHL assessment engine."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {recommendation.duration ?? "Catalog result"}
        </span>
        <span className="flex items-center gap-1.5 text-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {recommendation.confidence
            ? `${Math.round(recommendation.confidence * 100)}% match`
            : "Verified"}
        </span>
      </div>
    </article>
  );
}
