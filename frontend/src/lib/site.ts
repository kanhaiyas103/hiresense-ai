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

export const siteConfig = {
  name: "HireSense AI",
  subtitle: "Conversational Assessment Intelligence",
  description:
    "A polished interface foundation for catalog-grounded SHL assessment recommendations.",
  nav: [
    { label: "Features", href: "#features" },
    { label: "Technology", href: "#technology" },
    { label: "Architecture", href: "#architecture" },
  ],
};

export const features = [
  {
    title: "Conversational intake",
    description:
      "Guide hiring teams from vague requirements to structured assessment intent with a calm, focused experience.",
    icon: MessageSquareText,
  },
  {
    title: "Catalog-grounded outputs",
    description:
      "Recommendation identities, URLs, and test metadata remain anchored to trusted assessment records.",
    icon: ShieldCheck,
  },
  {
    title: "Hybrid evidence layer",
    description:
      "Semantic search, lexical signals, and deterministic scoring are presented as a coherent intelligence layer.",
    icon: Radar,
  },
  {
    title: "Executive-ready clarity",
    description:
      "Dense assessment logic is translated into readable, confidence-building product surfaces.",
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
  "Lucide React",
];

export const architectureSteps = [
  {
    title: "Conversation signal",
    description: "The interface frames user intent, constraints, and refinements as first-class product signals.",
    icon: BrainCircuit,
  },
  {
    title: "Evidence retrieval",
    description: "Semantic, lexical, and metadata layers combine before recommendation objects are presented.",
    icon: GitBranch,
  },
  {
    title: "Catalog safety",
    description: "Assessment names and URLs are treated as trusted data, not generated prose.",
    icon: DatabaseZap,
  },
  {
    title: "Decision surface",
    description: "The UI is structured for future chat, comparisons, traceability, and admin review.",
    icon: Workflow,
  },
];

export const productPrinciples = [
  {
    title: "Precise",
    description: "Every screen prioritizes grounded recommendations over ornamental noise.",
    icon: Layers3,
  },
  {
    title: "Fast",
    description: "Layouts are lean, responsive, and ready for production-grade interaction design.",
    icon: Sparkles,
  },
  {
    title: "Trustworthy",
    description: "The product language reinforces evidence, constraints, and catalog-backed confidence.",
    icon: ShieldCheck,
  },
];
