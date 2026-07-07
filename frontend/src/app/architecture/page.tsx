import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const ArchitectureExperience = dynamic(() =>
  import("@/components/architecture/architecture-experience").then(
    (module) => module.ArchitectureExperience,
  ),
);

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Explore how HireSense AI transforms recruiter conversations into grounded SHL assessment recommendations.",
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ArchitectureExperience />
      <SiteFooter />
    </div>
  );
}
