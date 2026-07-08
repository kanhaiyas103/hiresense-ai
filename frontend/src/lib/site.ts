import {
  BrainCircuit,
  DatabaseZap,
  GitBranch,
  Layers3,
  MessageSquareText,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const DEFAULT_SITE_URL = "https://hiresense-ai.vercel.app";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || DEFAULT_SITE_URL;

export const siteConfig = {
  name: "HireSense AI",
  subtitle: "Conversational Assessment Intelligence",
  description:
    "A production-quality AI recruiting product for grounded SHL assessment recommendations.",
  url: siteUrl,
  links: {
    github: "https://github.com/kanhaiyas103/hiresense-ai",
    demo: siteUrl,
    linkedin: "https://www.linkedin.com/in/TODO-add-profile",
  },
  nav: [
    { label: "Product", href: "/" },
    { label: "Chat", href: "/chat" },
    { label: "Architecture", href: "/architecture" },
    { label: "About", href: "/about" },
  ],
};

export const features = [
  {
    title: "Conversational intake",
    description:
      "Turn vague hiring conversations into structured assessment requirements without forcing recruiters into forms.",
    icon: MessageSquareText,
  },
  {
    title: "Catalog-grounded outputs",
    description:
      "Recommendation names, URLs, and test metadata stay anchored to trusted SHL catalog records.",
    icon: ShieldCheck,
  },
  {
    title: "Hybrid evidence layer",
    description:
      "Semantic retrieval, lexical matching, metadata scoring, and RRF work together before recommendations appear.",
    icon: Radar,
  },
  {
    title: "Premium decision surface",
    description:
      "Interactive recommendation cards make assessment selection feel clear, confident, and recruiter-ready.",
    icon: Sparkles,
  },
];

export const technologies = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "TailwindCSS",
  "shadcn/ui",
  "Framer Motion",
  "FastAPI",
  "FAISS",
  "Sentence Transformers",
];

export const architectureSteps = [
  {
    title: "Conversation signal",
    description:
      "The interface frames role intent, constraints, refinements, and comparison requests as structured product signals.",
    icon: BrainCircuit,
  },
  {
    title: "Evidence retrieval",
    description:
      "Semantic, lexical, metadata, and rank-fusion layers collect and order candidate assessments.",
    icon: GitBranch,
  },
  {
    title: "Catalog safety",
    description: "Assessment names and URLs are treated as trusted data, not generated prose.",
    icon: DatabaseZap,
  },
  {
    title: "Decision surface",
    description:
      "The UI translates dense retrieval evidence into beautiful, actionable recommendation cards.",
    icon: Workflow,
  },
];

export const productPrinciples = [
  {
    title: "Grounded",
    description: "Every recommendation is designed to stay tied to the SHL catalog and deployment contract.",
    icon: ShieldCheck,
  },
  {
    title: "Fast",
    description: "The frontend is statically optimized and the backend uses prebuilt retrieval artifacts.",
    icon: Sparkles,
  },
  {
    title: "Defensible",
    description: "Architecture, evaluation, and product design choices are easy to explain in technical interviews.",
    icon: Layers3,
  },
];
