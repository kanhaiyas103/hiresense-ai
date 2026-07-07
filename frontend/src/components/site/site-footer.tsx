import { Github, Linkedin, Sparkles } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.015]">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-glow">
              <Sparkles className="h-4 w-4 text-indigo-100" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[-0.03em]">{siteConfig.name}</p>
              <p className="text-xs text-muted-foreground">{siteConfig.subtitle}</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            A production-quality AI recruiting product for grounded SHL assessment recommendations, built with a premium frontend and a deployed FastAPI retrieval backend.
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:items-end">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <SocialLink href={siteConfig.links.github} label="GitHub placeholder" icon={Github} />
            <SocialLink href={siteConfig.links.linkedin} label="LinkedIn placeholder" icon={Linkedin} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon: Icon }: { href: string; label: string; icon: typeof Github }) {
  return (
    <a
      href={href}
      className="focus-ring rounded-full border border-white/10 bg-white/[0.04] p-2 text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
      aria-label={label}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
