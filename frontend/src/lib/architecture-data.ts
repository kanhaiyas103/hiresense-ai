import {
  BadgeCheck,
  BrainCircuit,
  Braces,
  Cable,
  Container,
  Database,
  FileJson,
  GitBranch,
  Globe2,
  MessageSquareText,
  Network,
  Radar,
  Route,
  Scale3D,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  SplitSquareVertical,
  Trophy,
  UserRound,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ArchitectureNode = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  technologies: string[];
  why: string;
  quality: string;
  icon: LucideIcon;
  tone: "indigo" | "sky" | "emerald" | "amber" | "rose";
};

export type StackGroup = {
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
};

export type Characteristic = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "user",
    title: "User",
    eyebrow: "Recruiter intent",
    description: "A hiring team starts with role context, constraints, skills, or comparison requests.",
    purpose: "Capture natural recruiter language without forcing users into rigid forms.",
    inputs: ["Hiring need", "Role seniority", "Skills", "Constraints"],
    outputs: ["Conversation message", "Intent signal"],
    technologies: ["React", "TypeScript", "Accessible UI"],
    why: "The best recommendation quality starts with preserving the way recruiters naturally describe roles.",
    quality: "Keeps the system flexible enough to clarify vague requests and refine requirements later.",
    icon: UserRound,
    tone: "indigo",
  },
  {
    id: "chat-interface",
    title: "Chat Interface",
    eyebrow: "Premium frontend",
    description: "The Next.js interface sends the complete stateless conversation history to the backend.",
    purpose: "Create a calm, guided product surface for collecting requirements and presenting recommendations.",
    inputs: ["User message", "Conversation history"],
    outputs: ["POST /chat payload", "Rendered response"],
    technologies: ["Next.js 15", "React 19", "Framer Motion", "TailwindCSS"],
    why: "The frontend never owns recommendation logic; it frames the interaction and protects the API contract.",
    quality: "Maintains full replayability because every request contains the entire conversation history.",
    icon: MessageSquareText,
    tone: "sky",
  },
  {
    id: "fastapi-backend",
    title: "FastAPI Backend",
    eyebrow: "Stateless API",
    description: "The deployed FastAPI service validates schema, orchestrates conversation decisions, and returns grounded objects.",
    purpose: "Provide a production API boundary between UI, retrieval, and response composition.",
    inputs: ["messages[]", "Environment config", "Catalog artifacts"],
    outputs: ["reply", "recommendations[]", "end_of_conversation"],
    technologies: ["FastAPI", "Pydantic", "Python 3.12"],
    why: "A thin API layer makes the system testable, deployable, and easy to defend in interviews.",
    quality: "Centralized validation prevents malformed requests from leaking into retrieval or response logic.",
    icon: ServerCog,
    tone: "emerald",
  },
  {
    id: "requirement-resolution",
    title: "Requirement Resolution",
    eyebrow: "Signal normalization",
    description: "User terms are normalized into canonical skills, roles, seniority, test types, languages, and constraints.",
    purpose: "Turn messy conversation text into a structured requirement representation.",
    inputs: ["Conversation text", "Known vocabulary", "Prior constraints"],
    outputs: ["ConversationRequirements", "Missing facts", "Normalized terms"],
    technologies: ["Deterministic rules", "Typed domain models"],
    why: "Retrieval works better when Java, Spring, seniority, duration, and language constraints are explicit signals.",
    quality: "Improves recall by preserving unknown terms while still normalizing common hiring vocabulary.",
    icon: BrainCircuit,
    tone: "indigo",
  },
  {
    id: "conversation-context",
    title: "Conversation Context",
    eyebrow: "Stateless memory",
    description: "The engine reconstructs prior requirements, corrections, refinements, and answered questions on every call.",
    purpose: "Preserve conversation continuity without storing server-side session state.",
    inputs: ["Full message history", "Prior assistant questions", "User corrections"],
    outputs: ["Merged requirements", "Detected refinements", "Conversation state"],
    technologies: ["Pure functions", "Pydantic models", "Policy rules"],
    why: "The assignment requires a stateless API, so the history itself becomes the source of truth.",
    quality: "Enables refinement and comparison flows while keeping deployment simple and horizontally scalable.",
    icon: Workflow,
    tone: "sky",
  },
  {
    id: "query-expansion",
    title: "Deterministic Query Expansion",
    eyebrow: "Recall amplifier",
    description: "The system expands retrieval views with role terms, skills, categories, abbreviations, and synonyms.",
    purpose: "Increase retrieval coverage without inventing user requirements.",
    inputs: ["Canonical requirements", "Known synonyms", "Assessment categories"],
    outputs: ["Retrieval queries", "Skill views", "Category views"],
    technologies: ["Deterministic expansion", "Bounded query sets"],
    why: "Candidates may describe roles differently than SHL catalog metadata; expansion bridges that vocabulary gap.",
    quality: "Improves Recall@10 while keeping behavior explainable and reproducible.",
    icon: GitBranch,
    tone: "amber",
  },
  {
    id: "hybrid-retrieval",
    title: "Hybrid Retrieval",
    eyebrow: "Evidence collection",
    description: "Semantic FAISS retrieval and lexical search work together before ranking.",
    purpose: "Collect the broadest useful candidate set before deterministic scoring.",
    inputs: ["Expanded queries", "Catalog metadata", "FAISS index"],
    outputs: ["Semantic hits", "Lexical hits", "Candidate evidence"],
    technologies: ["FAISS", "Sentence Transformers", "Lexical matching"],
    why: "Semantic search finds meaning; lexical search protects exact skills and assessment names.",
    quality: "Combining both reduces misses from either embedding ambiguity or keyword sparsity.",
    icon: SplitSquareVertical,
    tone: "emerald",
  },
  {
    id: "semantic-retrieval",
    title: "Semantic Retrieval (FAISS)",
    eyebrow: "Vector search",
    description: "Assessment documents are embedded and searched semantically against the user’s requirements.",
    purpose: "Find assessments that are conceptually close even when wording differs.",
    inputs: ["Query embedding", "index.faiss", "metadata.json"],
    outputs: ["Nearest neighbors", "Similarity scores"],
    technologies: ["FAISS", "all-MiniLM-L6-v2", "SentenceTransformers"],
    why: "A recruiter may say backend engineer while the catalog describes Java or enterprise development assessments.",
    quality: "Captures latent relevance that exact keyword search can miss.",
    icon: Radar,
    tone: "sky",
  },
  {
    id: "lexical-retrieval",
    title: "Lexical Retrieval",
    eyebrow: "Exact signal guardrail",
    description: "Exact assessment names, skills, abbreviations, categories, and technologies receive deterministic support.",
    purpose: "Protect high-precision matches that should never be buried by vector similarity alone.",
    inputs: ["Requirement terms", "Catalog text", "Skill vocabulary"],
    outputs: ["Lexical scores", "Exact matches", "Matched terms"],
    technologies: ["Word-boundary matching", "Scored metadata"],
    why: "If the user asks for Java, Java assessments deserve strong explicit evidence.",
    quality: "Improves precision while preserving recall-oriented candidate generation.",
    icon: Search,
    tone: "emerald",
  },
  {
    id: "metadata-scoring",
    title: "Metadata Scoring",
    eyebrow: "Constraint evidence",
    description: "Duration, language, job level, remote testing, adaptive support, and test type constraints are scored.",
    purpose: "Represent deterministic requirement fit beyond text similarity.",
    inputs: ["Candidate metadata", "User constraints"],
    outputs: ["Metadata scores", "Constraint coverage"],
    technologies: ["Typed metadata", "Deterministic scoring"],
    why: "A strong semantic hit can still be wrong if it violates a duration, language, or delivery constraint.",
    quality: "Makes candidate ranking more faithful to recruiter constraints without hallucinating fields.",
    icon: FileJson,
    tone: "indigo",
  },
  {
    id: "rrf",
    title: "Reciprocal Rank Fusion (RRF)",
    eyebrow: "Rank fusion",
    description: "Semantic, lexical, and metadata evidence are fused by rank position instead of fragile score scales.",
    purpose: "Combine heterogeneous retrievers without overfitting score weights.",
    inputs: ["Semantic ranks", "Lexical ranks", "Metadata ranks"],
    outputs: ["Fused candidate order", "Evidence balance"],
    technologies: ["RRF", "Deterministic ranking"],
    why: "Embedding similarity and lexical scores live on different scales; RRF makes them comparable through rank.",
    quality: "Improves stability and Recall@10 by rewarding candidates that multiple retrievers support.",
    icon: Scale3D,
    tone: "amber",
  },
  {
    id: "candidate-ranking",
    title: "Candidate Ranking",
    eyebrow: "Final ordering",
    description: "Candidates are ranked by semantic relevance, requirement coverage, diversity, metadata match, and balance.",
    purpose: "Shape a high-quality candidate set before final recommendation presentation.",
    inputs: ["Fused candidates", "Coverage signals", "Metadata matches"],
    outputs: ["Top candidates", "Candidate explanations"],
    technologies: ["Typed scoring", "Deterministic boosts"],
    why: "A recall-oriented retriever needs a final ordering layer to make the top results useful.",
    quality: "Keeps exact skill/name matches and dual-supported candidates from being pushed below weaker options.",
    icon: Route,
    tone: "rose",
  },
  {
    id: "recommendation-engine",
    title: "Recommendation Engine",
    eyebrow: "Grounded response",
    description: "The conversation layer decides whether to clarify, recommend, compare, refine, refuse, or close.",
    purpose: "Turn retrieval evidence into a validated conversational response.",
    inputs: ["Conversation state", "Retrieval evidence", "Catalog records"],
    outputs: ["Validated ChatResponse", "Trusted recommendation objects"],
    technologies: ["Policy rules", "LLM text composer", "Output validator"],
    why: "The LLM can write conversational text, but recommendation objects are constructed from trusted catalog data.",
    quality: "Prevents invented assessments, invented URLs, and off-catalog recommendations.",
    icon: Trophy,
    tone: "emerald",
  },
  {
    id: "premium-cards",
    title: "Premium Recommendation Cards",
    eyebrow: "Decision surface",
    description: "The UI renders official SHL links, test type badges, match cues, and recruiter-friendly actions.",
    purpose: "Make assessment selection feel clear, trustworthy, and executive-ready.",
    inputs: ["reply", "recommendations[]", "end_of_conversation"],
    outputs: ["Interactive recommendation cards", "Copy/share/bookmark UI"],
    technologies: ["Next.js", "Framer Motion", "TailwindCSS"],
    why: "A strong backend still needs a polished decision surface that hiring teams can understand quickly.",
    quality: "Improves confidence by showing grounded, actionable outputs instead of raw model prose.",
    icon: Sparkles,
    tone: "indigo",
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    description: "Premium stateless chat experience and architecture visualization.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Framer Motion"],
    icon: Globe2,
  },
  {
    title: "Backend",
    description: "Validated API boundary and conversation orchestration layer.",
    technologies: ["FastAPI", "Pydantic", "Python 3.12", "Structured logging"],
    icon: ServerCog,
  },
  {
    title: "Retrieval",
    description: "Hybrid evidence engine tuned for recall and deterministic ranking.",
    technologies: ["FAISS", "Lexical search", "Metadata scoring", "RRF"],
    icon: Network,
  },
  {
    title: "Embeddings",
    description: "Offline semantic documents and vector index artifacts.",
    technologies: ["SentenceTransformers", "all-MiniLM-L6-v2", "Versioned artifacts"],
    icon: Braces,
  },
  {
    title: "Deployment",
    description: "Frontend and backend deploy independently while preserving API contracts.",
    technologies: ["Docker", "Hugging Face Spaces", "Environment config"],
    icon: Container,
  },
];

export const characteristics: Characteristic[] = [
  { title: "Stateless", description: "Every /chat call carries the full conversation history.", icon: Cable },
  { title: "Hybrid Retrieval", description: "Semantic and lexical signals are combined before ranking.", icon: SplitSquareVertical },
  { title: "Grounded Responses", description: "Recommendation objects come from trusted catalog metadata only.", icon: ShieldCheck },
  { title: "FastAPI", description: "A clean, typed API surface for production serving.", icon: ServerCog },
  { title: "FAISS", description: "Fast local vector search over validated SHL assessment documents.", icon: Radar },
  { title: "Docker", description: "Portable backend deployment with explicit runtime artifacts.", icon: Container },
  { title: "Type Safety", description: "TypeScript and Pydantic protect both sides of the contract.", icon: BadgeCheck },
  { title: "Accessibility", description: "Keyboard, focus, and reduced-motion behavior are first-class.", icon: Sparkles },
];

export const metrics = [
  { label: "Response Time", value: "< 10s", detail: "Client timeout protects the product experience." },
  { label: "Retrieval Strategy", value: "Hybrid", detail: "Semantic + lexical + metadata evidence." },
  { label: "Vector Search", value: "FAISS", detail: "Prebuilt index loaded by the backend." },
  { label: "Hybrid Ranking", value: "RRF", detail: "Rank-based fusion across different score scales." },
  { label: "Pipeline", value: "Grounded", detail: "Validated SHL recommendation objects only." },
];

export const deploymentPath = [
  { title: "Frontend", description: "Next.js product UI", icon: Globe2 },
  { title: "Backend", description: "FastAPI recommendation service", icon: ServerCog },
  { title: "SHL Catalog", description: "Validated catalog + FAISS artifacts", icon: Database },
];

