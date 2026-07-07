"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const mobileNavId = useId();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-2xl">
      <a
        href="#main-content"
        className="focus-ring sr-only left-4 top-4 z-[60] rounded-full bg-background px-4 py-2 text-sm focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="HireSense AI home">
          <span
            aria-hidden="true"
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-glow"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 via-sky-300/20 to-emerald-300/20" />
            <Sparkles className="relative h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold tracking-[-0.03em]">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {siteConfig.subtitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden sm:inline-flex" asChild size="sm" variant="secondary">
            <Link href="/chat">Open app</Link>
          </Button>
          <Button
            className="md:hidden"
            size="icon"
            variant="ghost"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls={mobileNavId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      <div
        id={mobileNavId}
        className={cn(
          "container grid transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]",
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          {open ? (
            <nav
              aria-label="Mobile navigation"
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-2"
            >
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
