"use client";

import {
  ArrowRight,
  CheckCircle2,
  Command,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { architectureSteps, features, productPrinciples, siteConfig, technologies } from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export function LandingPage() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen overflow-hidden bg-background text-foreground">
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <HeroSection />
            <FeatureHighlights />
            <ScreenshotSection />
            <ArchitecturePreview />
            <TechnologyShowcase />
            <LaunchCta />
          </main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

function HeroSection() {
  return (
    <section className="relative border-b border-white/10">
      <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-[680px] opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="container relative grid min-h-[calc(100vh-4rem)] items-center gap-14 py-20 lg:grid-cols-[1fr_0.95fr] lg:py-28">
        <m.div {...fadeUp} className="max-w-3xl">
          <Badge variant="accent" className="mb-6 gap-2">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Production AI recruiting product
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.08em] sm:text-6xl lg:text-7xl">
            Grounded SHL recommendations.
            <span className="block bg-gradient-to-r from-indigo-200 via-sky-100 to-white bg-clip-text text-transparent">
              Delivered like a premium AI workspace.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
            {siteConfig.name} transforms recruiter conversations into catalog-backed assessment recommendations with a stateless FastAPI backend, hybrid retrieval, and a polished SaaS interface.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/chat">
                Launch app
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/architecture">
                Explore architecture
                <Network className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 text-xs text-muted-foreground sm:grid-cols-3 sm:text-sm">
            {["Catalog-only URLs", "Hybrid retrieval", "Production API"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <ProductPreview />
        </m.div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="relative rounded-[2.25rem] border border-white/10 bg-white/[0.055] p-3 shadow-soft-xl backdrop-blur-xl">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-emerald-500/10 blur-3xl" />
      <div className="rounded-[1.8rem] border border-white/10 bg-zinc-950/80 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
          </div>
          <Badge>Live backend</Badge>
        </div>
        <div className="space-y-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-sm text-muted-foreground">Recommend assessments for a senior Java backend engineer under 40 minutes.</p>
          </div>
          <div className="rounded-3xl border border-indigo-300/20 bg-indigo-400/10 p-4">
            <p className="text-sm font-medium">Top catalog-backed matches</p>
            <div className="mt-4 space-y-3">
              {[
                ["Java 8 (New)", "96% Match"],
                ["Core Java Advanced", "92% Match"],
                ["Java Design Patterns", "89% Match"],
              ].map(([name, score]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <span className="text-sm text-zinc-200">{name}</span>
                  <span className="rounded-full bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">{score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureHighlights() {
  return (
    <section id="features" className="container py-24">
      <SectionIntro eyebrow="Feature highlights" title="A serious interface for serious hiring decisions." description="HireSense AI combines beautiful interaction design with retrieval and validation choices that senior engineers can defend." />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <m.div key={feature.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
            <Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-indigo-300/20">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-indigo-100 transition group-hover:bg-indigo-400/15">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </m.div>
        ))}
      </div>
    </section>
  );
}

function ScreenshotSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionIntro eyebrow="Product preview" title="Designed to look credible before the first demo click." description="Docs-ready placeholder assets are included for screenshots, architecture diagrams, and demos." align="left" />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-soft-xl">
          <div className="aspect-[16/10] rounded-[1.5rem] border border-white/10 bg-[url('/screenshots/hiresense-chat-preview.svg')] bg-cover bg-center" aria-label="HireSense AI screenshot placeholder" />
        </div>
      </div>
    </section>
  );
}

function ArchitecturePreview() {
  return (
    <section id="architecture" className="container py-24">
      <SectionIntro eyebrow="Architecture preview" title="A transparent pipeline from prompt to recommendation." description="The product page gives interviewers and reviewers a fast way to understand the system without reading backend code." />
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Recommendation pipeline</CardTitle>
            <CardDescription>Conversation context, query expansion, hybrid retrieval, RRF, ranking, and validated cards.</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button asChild variant="secondary">
              <Link href="/architecture">
                Open interactive architecture
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {architectureSteps.map((step, index) => (
            <m.div key={step.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <step.icon className="h-5 w-5 text-sky-200" aria-hidden="true" />
                    <Badge>{`0${index + 1}`}</Badge>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyShowcase() {
  return (
    <section id="technology" className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="container">
        <SectionIntro eyebrow="Technology showcase" title="Modern frontend, production backend, retrieval-first intelligence." description="The release surface highlights both product craft and engineering depth." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((technology) => (
            <div key={technology} className="rounded-3xl border border-white/10 bg-background/60 px-5 py-4 text-sm font-medium text-muted-foreground transition hover:border-white/20 hover:bg-white/[0.045]">
              {technology}
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {productPrinciples.map((principle) => (
            <Card key={principle.title}>
              <CardHeader>
                <principle.icon className="h-5 w-5 text-indigo-200" aria-hidden="true" />
                <CardTitle>{principle.title}</CardTitle>
                <CardDescription>{principle.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchCta() {
  return (
    <section id="cta" className="container py-24">
      <Card className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.28),transparent_32rem)]" />
        <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <Badge variant="success" className="mb-5 gap-2">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Public release ready
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Launch the product or inspect the system design.
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground">
              The frontend is polished for portfolio review, while the backend remains deployed and untouched behind the production API contract.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 sm:flex-row md:flex-col">
            <Button asChild size="lg">
              <Link href="/chat">
                Open chat
                <Command className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/about">
                Read the story
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description, align = "center" }: { eyebrow: string; title: string; description: string; align?: "center" | "left" }) {
  return (
    <m.div {...fadeUp} className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Badge className="mb-5">{eyebrow}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">{title}</h2>
      <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </m.div>
  );
}

