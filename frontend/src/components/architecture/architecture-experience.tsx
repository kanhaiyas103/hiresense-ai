"use client";

import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  architectureNodes,
  characteristics,
  deploymentPath,
  metrics,
  stackGroups,
  type ArchitectureNode,
} from "@/lib/architecture-data";
import { cn } from "@/lib/utils";

const toneClasses: Record<ArchitectureNode["tone"], string> = {
  indigo: "from-indigo-400/30 via-indigo-300/10 to-transparent text-indigo-100",
  sky: "from-sky-400/30 via-sky-300/10 to-transparent text-sky-100",
  emerald: "from-emerald-400/30 via-emerald-300/10 to-transparent text-emerald-100",
  amber: "from-amber-400/30 via-amber-300/10 to-transparent text-amber-100",
  rose: "from-rose-400/30 via-rose-300/10 to-transparent text-rose-100",
};

export function ArchitectureExperience() {
  const [selectedId, setSelectedId] = useState(architectureNodes[0].id);
  const selectedNode = useMemo(
    () => architectureNodes.find((node) => node.id === selectedId) ?? architectureNodes[0],
    [selectedId],
  );

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <main id="main-content" className="min-h-screen overflow-hidden bg-background text-foreground">
          <HeroSection />
          <InteractiveFlow selectedId={selectedId} onSelect={setSelectedId} selectedNode={selectedNode} />
          <TechnologyStack />
          <SystemCharacteristics />
          <PerformanceMetrics />
          <DeploymentOverview />
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}

function HeroSection() {
  return (
    <section className="relative border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl text-center"
      >
        <Badge variant="accent" className="mb-6 gap-2">
          Interactive system map
        </Badge>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.075em] sm:text-6xl lg:text-7xl">
          Architecture
          <span className="block bg-gradient-to-r from-indigo-200 via-sky-100 to-white bg-clip-text text-transparent">
            built for grounded recommendations.
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
          How HireSense AI transforms recruiter conversations into grounded SHL assessment recommendations through a stateless API, hybrid retrieval, and validated recommendation objects.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="#interactive-flow">
              Explore the flow
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#technology-stack">
              View stack
              <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </m.div>
    </section>
  );
}

function InteractiveFlow({
  selectedId,
  selectedNode,
  onSelect,
}: {
  selectedId: string;
  selectedNode: ArchitectureNode;
  onSelect: (id: string) => void;
}) {
  return (
    <section id="interactive-flow" className="container py-24">
      <SectionIntro
        eyebrow="Interactive flow"
        title="From conversation to catalog-grounded decision."
        description="Click any block to inspect purpose, inputs, outputs, technologies, and why that layer improves recommendation quality."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 shadow-soft-xl sm:p-6">
          <AnimatedConnectors />
          <div className="relative grid gap-4 lg:grid-cols-2">
            {architectureNodes.map((node, index) => (
              <ArchitectureBlock
                key={node.id}
                node={node}
                index={index}
                active={node.id === selectedId}
                onSelect={() => onSelect(node.id)}
              />
            ))}
          </div>
        </div>

        <InfoPanel node={selectedNode} onClose={() => onSelect(architectureNodes[0].id)} />
      </div>
    </section>
  );
}

function AnimatedConnectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-70 lg:block"
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="flow-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.1" />
          <stop offset="48%" stopColor="rgb(56 189 248)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <m.path
        d="M50 4 C50 16 50 26 50 36 S50 58 50 70 S50 86 50 96"
        fill="none"
        stroke="url(#flow-gradient)"
        strokeWidth="0.35"
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <m.path
        d="M50 44 C38 44 35 50 25 50 M50 44 C62 44 65 50 75 50"
        fill="none"
        stroke="url(#flow-gradient)"
        strokeWidth="0.3"
        strokeDasharray="1.5 1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
      />
    </svg>
  );
}

function ArchitectureBlock({
  node,
  index,
  active,
  onSelect,
}: {
  node: ArchitectureNode;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = node.icon;

  return (
    <m.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.32, ease: "easeOut", delay: Math.min(index * 0.035, 0.28) }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Inspect ${node.title}`}
      className={cn(
        "focus-ring group relative overflow-hidden rounded-[1.5rem] border p-px text-left shadow-soft-xl transition",
        active ? "border-indigo-200/30" : "border-white/10 hover:border-white/20",
        index === 6 ? "lg:col-span-2" : "",
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70 transition group-hover:opacity-100", toneClasses[node.tone])} />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-zinc-950/82 p-4 backdrop-blur-xl sm:p-5">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.065] text-current shadow-glow">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {node.eyebrow}
            </span>
            <span className="mt-1 block text-base font-semibold tracking-[-0.035em] text-foreground">
              {node.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">
              {node.description}
            </span>
          </span>
        </div>
      </div>
    </m.button>
  );
}

function InfoPanel({ node, onClose }: { node: ArchitectureNode; onClose: () => void }) {
  const Icon = node.icon;

  return (
    <aside className="xl:sticky xl:top-24 xl:self-start" aria-label="Architecture detail panel">
      <AnimatePresence mode="wait">
        <m.div
          key={node.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-soft-xl backdrop-blur-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br", toneClasses[node.tone])}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <Badge className="mb-2">{node.eyebrow}</Badge>
                <h3 className="text-xl font-semibold tracking-[-0.04em]">{node.title}</h3>
              </div>
            </div>
            <button
              type="button"
              className="focus-ring rounded-full p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Reset detail panel"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <PanelSection title="Purpose" body={node.purpose} />
            <PanelList title="Inputs" items={node.inputs} />
            <PanelList title="Outputs" items={node.outputs} />
            <PanelList title="Key technologies" items={node.technologies} />
            <PanelSection title="Why it exists" body={node.why} />
            <PanelSection title="Quality impact" body={node.quality} />
          </div>
        </m.div>
      </AnimatePresence>
    </aside>
  );
}

function PanelSection({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{body}</p>
    </div>
  );
}

function PanelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-zinc-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechnologyStack() {
  return (
    <section id="technology-stack" className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="container">
        <SectionIntro
          eyebrow="Technology stack"
          title="A production stack with clear separation of concerns."
          description="Each layer owns one job: interface, API orchestration, retrieval evidence, embeddings, or deployment."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stackGroups.map((group, index) => (
            <m.article
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="rounded-3xl border border-white/10 bg-background/65 p-5 shadow-soft-xl"
            >
              <group.icon className="h-5 w-5 text-indigo-200" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold tracking-[-0.03em]">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.technologies.map((technology) => (
                  <span key={technology} className="rounded-full bg-white/[0.055] px-2.5 py-1 text-[11px] text-zinc-300">
                    {technology}
                  </span>
                ))}
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemCharacteristics() {
  return (
    <section className="container py-24">
      <SectionIntro
        eyebrow="System characteristics"
        title="Built for trust, speed, and explainability."
        description="The architecture keeps AI behavior grounded while giving recruiters a polished decision experience."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {characteristics.map((item) => (
          <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-indigo-300/20 hover:bg-white/[0.06]">
            <item.icon className="h-5 w-5 text-sky-200" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-semibold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PerformanceMetrics() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="container">
        <SectionIntro
          eyebrow="Performance metrics"
          title="The pipeline is optimized around bounded, explainable work."
          description="The frontend shows the architecture in product language while the backend keeps retrieval deterministic and testable."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl border border-white/10 bg-background/70 p-5 text-center shadow-soft-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-foreground">{metric.value}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeploymentOverview() {
  return (
    <section className="container py-24">
      <SectionIntro
        eyebrow="Deployment overview"
        title="Frontend, backend, and catalog artifacts deploy as clean boundaries."
        description="The user experience can evolve independently from the FastAPI backend and SHL catalog pipeline."
      />
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        {deploymentPath.map((item, index) => (
          <article key={item.title} className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-soft-xl">
            <item.icon className="h-6 w-6 text-emerald-200" aria-hidden="true" />
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.04em]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            {index < deploymentPath.length - 1 ? (
              <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" aria-hidden="true" />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge className="mb-5">{eyebrow}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}

