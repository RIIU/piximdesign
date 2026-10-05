import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  title: string;
  desc: string;
  output: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ShowcasePanel {
  id: string;
  title: string;
  desc: string;
  visual: ReactNode;
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface StatHighlight {
  value: string;
  label: string;
  chips: string[];
}

export interface StatementContent {
  eyebrow: string;
  text: string;
  /** Exact words (including punctuation) rendered in orange */
  highlights: string[];
  pillars: { title: string; desc: string }[];
}

export interface WhyContent {
  title: ReactNode;
  items: { icon: LucideIcon; title: string; desc: string }[];
  tools: string[];
  /** Page-specific stat tile shown under the agency stats */
  highlight: StatHighlight;
}

export interface PackageTier {
  usd: string;
  bdt: string;
  desc: string;
  tagline: string;
  features: string[];
}

export interface PackagesContent {
  title: ReactNode;
  description: string;
  tiers: { basic: PackageTier; standard: PackageTier; premium: PackageTier };
}
