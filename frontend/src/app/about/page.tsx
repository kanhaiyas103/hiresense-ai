import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, Code2, HeartHandshake, Layers3, Rocket, ShieldCheck, Sparkles } from "lucide-react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the mission, system design, and development journey behind HireSense AI.",
};

const sections = [
  {
    title: "Mission",
    description:
      "Help hiring teams move from vague role requirements to grounded, explainable SHL assessment recommendations.",
    icon: Sparkles,
  },
  {
    title: "Problem",
    description:
      "Assessment catalogs are deep, nuanced, and easy to misuse when recruiters have limited time or unclear requirements.",
    icon: HeartHandshake,
  },
  {
    title: "Solution",
    description:
      "HireSense AI combines a premium conversational interface with a stateless backend, hybrid retrieval, and validated catalog-only outputs.",
    icon: CheckCircle2,
  },
] satisfies Array<{ title: string; description: string; icon: LucideIcon }>;

const systemCards = [
  { icon: Layers3, title: "Stateless API", description: "Every request carries full conversation history." },
  { icon: ShieldCheck, title: "Grounded output", description: "Recommendation objects are catalog-derived." },
  { icon: Code2, title: "Typed frontend", description: "Next.js, React, TypeScript, TailwindCSS." },
  { icon: Rocket, title: "Deployment-ready", description: "Frontend and backend deploy independently." },
] satisfies Array<{ icon: LucideIcon; title: string; description: string }>;

const timeline = [
  "SHL assignment backend foundation",
  "Catalog pipeline and FAISS index",
  "Hybrid retrieval and decision engine",
  "Production FastAPI deployment",
  "HireSense AI product experience",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <main id="main-content">
        <section className="relative border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70" />
          <div className="relative mx-auto max-w-5xl text-center">
            <Badge variant="accent" className="mb-6 gap-2">
              About HireSense AI
            </Badge>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              Built from an interview project.
              <span className="block bg-gradient-to-r from-indigo-200 via-sky-100 to-white bg-clip-text text-transparent">
                Expanded into a product.
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
              HireSense AI began as a backend system for the SHL AI Research Intern assignment and evolved into a polished SaaS experience for conversational assessment intelligence.
            </p>
          </div>
        </section>

        <section className="container py-24">
          <div className="grid gap-4 md:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.title} className="h-full">
                <CardHeader>
                  <section.icon className="h-5 w-5 text-indigo-200" aria-hidden="true" />
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] py-24">
          <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge className="mb-5">System design</Badge>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
                A clean separation between product UI and recommendation intelligence.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                The frontend focuses on clarity, interaction quality, accessibility, and trust. The backend owns catalog scraping, embeddings, FAISS search, hybrid retrieval, decision policies, and validated response objects.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {systemCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-white/10 bg-background/70 p-5 shadow-soft-xl">
                  <card.icon className="h-5 w-5 text-sky-200" aria-hidden="true" />
                  <h3 className="mt-4 text-sm font-semibold tracking-[-0.02em]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5">Development journey</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
              From assignment constraints to product-grade polish.
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-3">
            {timeline.map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/[0.06] text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm text-muted-foreground">{item}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
