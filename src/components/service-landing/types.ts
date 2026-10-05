import type { ReactNode } from "react";
import type {
  FaqItem,
  PackagesContent,
  ProcessStep,
  ShowcasePanel,
  StatementContent,
  WhyContent,
} from "@/components/page-kit/types";

export interface BentoTile {
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
  statement: StatementContent;
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
    steps: ProcessStep[];
  };
  why: WhyContent;
  packages: PackagesContent;
  reviewsTitle: string;
  faqs: FaqItem[];
  cta: {
    titleLead: string;
    titleHighlight: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
  };
}
