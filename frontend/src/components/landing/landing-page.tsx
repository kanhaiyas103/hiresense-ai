"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Command,
  LockKeyhole,
  MessageSquare,
  Network,
  Shield,
  Sparkles,
} from "lucide-react";
import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  architectureSteps,
  features,
  productPrinciples,
  siteConfig,
  technologies,
} from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export function LandingPage() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen overflow-hidden bg-background text-foreground">
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <HeroSection />
            <FeaturesSection />
            <TechnologySection />
            <ArchitectureSection />
            <CtaSection />
          </main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

function HeroSection() {
  return (
    <section className="relative">
      <div className="subtle-grid absolute inset-x-0 top-0 h-[560px]" />
      <div className="container relative grid min-h-[calc(100vh-4rem)] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <m.div {...fadeUp} className="max-w-3xl">
          <Badge variant="accent" className="mb-6 gap-2">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Phase 1 interface foundation
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.075em] sm:text-6xl lg:text-7xl">
            {siteConfig.name}
            <span className="block bg-gradient-to-r from-indigo-200 via-sky-100 to-white bg-clip-text text-transparent">
              {siteConfig.subtitle}
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-muted-foreground sm:text-xl">
            A refined SaaS interface for transforming hiring intent into trusted
            assessment decisions. Built with the restraint of Linear, the polish of
            Vercel, and the clarity of modern AI products.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#features">
                Explore foundation
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#architecture">
                View architecture
                <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl gap-3 text-xs text-muted-foreground sm:grid-cols-3 sm:text-sm">
            {["Dark-first UI", "Reusable system", "Backend isolated"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] bg-indigo-500/20 blur-3xl"
          />
          <div className="glass-panel relative rounded-[2rem] p-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                </div>
                <Badge>Assessment console</Badge>
              </div>
              <div className="space-y-4">
                <InsightCard
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Intent"
                  value="Hiring a senior Java engineer"
                />
                <InsightCard
                  icon={<Network className="h-4 w-4" />}
                  label="Evidence"
                  value="Semantic + lexical + metadata signals"
                />
                <InsightCard
                  icon={<Shield className="h-4 w-4" />}
                  label="Safety"
                  value="Catalog-backed names and URLs only"
                />
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Recommendation readiness</p>
                  <span className="text-xs text-emerald-200">Grounded</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-indigo-300 to-sky-300" />
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function InsightCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] text-indigo-100"
        >
          {icon}
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          <p className="mt-1 text-sm font-medium leading-6">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="container py-24">
      <SectionIntro
        eyebrow="Features"
        title="A product surface designed for trust."
        description="Phase 1 establishes the visual language, reusable primitives, and page structure needed before chat or backend integration begins."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <m.div key={feature.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
            <Card className="group h-full overflow-hidden">
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

function TechnologySection() {
  return (
    <section id="technology" className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="container">
        <SectionIntro
          eyebrow="Technology"
          title="Modern frontend stack. Calm by default."
          description="Built on a typed, componentized foundation with motion used to support comprehension instead of distracting from it."
        />
        <m.div
          {...fadeUp}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {technologies.map((technology) => (
            <div
              key={technology}
              className="rounded-3xl border border-white/10 bg-background/60 px-5 py-4 text-sm font-medium text-muted-foreground"
            >
              {technology}
            </div>
          ))}
        </m.div>
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

function ArchitectureSection() {
  return (
    <section id="architecture" className="container py-24">
      <SectionIntro
        eyebrow="Architecture preview"
        title="Prepared for conversational intelligence."
        description="The frontend foundation mirrors the product architecture without connecting to the backend during Phase 1."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Interface layers</CardTitle>
            <CardDescription>
              A clean separation between presentation, interaction patterns, and future
              service integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Navigation shell", "Landing sections", "Design tokens", "Reusable primitives"].map(
              (item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <span className="text-sm">{item}</span>
                  <span className="text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
              ),
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {architectureSteps.map((step, index) => (
            <m.div
              key={step.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
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

function CtaSection() {
  return (
    <section id="cta" className="container pb-24">
      <Card className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_32rem)]"
        />
        <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <Badge variant="success" className="mb-5 gap-2">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              Backend untouched
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Ready for the next phase when chat becomes the product.
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground">
              This foundation gives HireSense AI the navigation, brand system,
              responsive landing page, and reusable UI layer needed before API
              wiring or chat workflows are introduced.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 sm:flex-row md:flex-col">
            <Button asChild size="lg">
              <Link href="#features">
                Review foundation
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#technology">
                See stack
                <Command className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
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
    <m.div {...fadeUp} className="mx-auto max-w-3xl text-center">
      <Badge className="mb-5">{eyebrow}</Badge>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </m.div>
  );
}
