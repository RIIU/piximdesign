import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface PackageTier {
  usd: string;
  bdt: string;
  desc: string;
  tagline: string;
  features: string[];
}

export interface BentoTile {
  title: string;
  desc: string;
  visual: ReactNode;
}

export interface ShowcasePanel {
  id: string;
  title: string;
  desc: string;
  visual: ReactNode;
}

/** Everything a service landing page needs; one config per service. */
export interface ServiceConfig {
  /** Service name sent to the contact form (matches the SERVICES title) */
  serviceName: string;
  /** Short name used in the breadcrumb and section titles, e.g. "Branding" */
  shortName: string;
  /** Used in contact-form notes, e.g. "a branding project" or "an SEO project" */
  projectLabel: string;
  hero: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    primaryCta: string;
    visual: ReactNode;
  };
  statement: {
    eyebrow: string;
    text: string;
    /** Exact words (including punctuation) rendered in orange */
    highlights: string[];
    pillars: { title: string; desc: string }[];
  };
  bento: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    /** Six tiles in layout order: large, wide, small, small, wide, wide */
    tiles: BentoTile[];
  };
  showcase: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    panels: ShowcasePanel[];
    ctaLabel: string;
  };
  process: {
    title: ReactNode;
    description: string;
    steps: { title: string; desc: string; output: string }[];
  };
  why: {
    title: ReactNode;
    items: { icon: LucideIcon; title: string; desc: string }[];
    tools: string[];
    /** Service-specific stat tile shown under the agency stats */
    highlight: { value: string; label: string; chips: string[] };
  };
  packages: {
    title: ReactNode;
    description: string;
    tiers: { basic: PackageTier; standard: PackageTier; premium: PackageTier };
  };
  reviewsTitle: string;
  faqs: { q: string; a: string }[];
  cta: {
    titleLead: string;
    titleHighlight: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
  };
}
