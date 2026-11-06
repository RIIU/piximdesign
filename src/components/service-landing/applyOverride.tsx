import React from "react";
import { RichTitle } from "@/content/RichTitle";
import { GradientText } from "@/components/page-kit/shared";
import type { Pricing } from "@/content/catalog";
import type { ServiceConfig } from "./types";

/** Editable text for a service page, as stored in Sanity ("Service pages"). Everything is optional. */
export interface ServicePageOverride {
  hero?: { eyebrow?: string; title?: string; description?: string; primaryCta?: string };
  statement?: { eyebrow?: string; text?: string; highlights?: string[]; pillars?: { title?: string; desc?: string }[] };
  bento?: { eyebrow?: string; title?: string; description?: string; tiles?: { title?: string; desc?: string }[] };
  showcase?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    panels?: { title?: string; desc?: string }[];
  };
  process?: { title?: string; description?: string; steps?: { title?: string; desc?: string; output?: string }[] };
  why?: {
    title?: string;
    items?: { title?: string; desc?: string }[];
    tools?: string[];
    highlight?: { value?: string; label?: string; chips?: string[] };
  };
  packages?: {
    title?: string;
    description?: string;
    basic?: { tagline?: string; features?: string[] };
    standard?: { tagline?: string; features?: string[] };
    premium?: { tagline?: string; features?: string[] };
  };
  reviewsTitle?: string;
  faqTitle?: string;
  faqs?: { q?: string; a?: string }[];
  cta?: { titleLead?: string; titleHighlight?: string; description?: string; videoSrc?: string; posterSrc?: string };
}

const GRADIENT = "bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent";

const has = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const pick = (o: string | undefined, d: string) => (has(o) ? o : d);
const list = (o: string[] | undefined, d: string[]) => {
  const clean = (o ?? []).filter(has);
  return clean.length ? clean : d;
};
const title = (o: string | undefined, d: React.ReactNode) =>
  has(o) ? <RichTitle text={o} highlightClassName={GRADIENT} breakClassName="hidden sm:block" /> : d;

/** Same-length lists whose items carry code-only parts (icons, visuals): only the text changes. */
function byIndex<T extends { title: string; desc: string }>(items: T[], o?: { title?: string; desc?: string }[]): T[] {
  if (!o?.length) return items;
  return items.map((item, i) => ({ ...item, title: pick(o[i]?.title, item.title), desc: pick(o[i]?.desc, item.desc) }));
}

export function applyServiceOverride(
  config: ServiceConfig,
  slug: string,
  pricing: Pricing,
  o: ServicePageOverride | null | undefined
): ServiceConfig & { faqTitle?: React.ReactNode } {
  const prices = pricing[slug];
  const tiers = { ...config.packages.tiers };
  for (const key of ["basic", "standard", "premium"] as const) {
    const t = o?.packages?.[key];
    tiers[key] = {
      ...tiers[key],
      ...(prices ? prices[key] : {}),
      tagline: pick(t?.tagline, tiers[key].tagline),
      features: list(t?.features, tiers[key].features),
    };
  }
  const packages = { ...config.packages, tiers };
  if (!o) return { ...config, packages };

  const steps = (o.process?.steps ?? []).filter((s) => has(s?.title));
  const faqs = (o.faqs ?? []).filter((f) => has(f?.q) && has(f?.a)) as { q: string; a: string }[];

  return {
    ...config,
    hero: {
      ...config.hero,
      eyebrow: pick(o.hero?.eyebrow, config.hero.eyebrow),
      title: title(o.hero?.title, config.hero.title),
      description: pick(o.hero?.description, config.hero.description),
      primaryCta: pick(o.hero?.primaryCta, config.hero.primaryCta),
    },
    statement: {
      eyebrow: pick(o.statement?.eyebrow, config.statement.eyebrow),
      text: pick(o.statement?.text, config.statement.text),
      highlights: list(o.statement?.highlights, config.statement.highlights),
      pillars: o.statement?.pillars?.filter((p) => has(p?.title)).length
        ? o.statement.pillars.filter((p) => has(p?.title)).map((p) => ({ title: p.title as string, desc: p.desc ?? "" }))
        : config.statement.pillars,
    },
    bento: {
      ...config.bento,
      eyebrow: pick(o.bento?.eyebrow, config.bento.eyebrow),
      title: title(o.bento?.title, config.bento.title),
      description: pick(o.bento?.description, config.bento.description),
      tiles: byIndex(config.bento.tiles, o.bento?.tiles),
    },
    showcase: {
      ...config.showcase,
      eyebrow: pick(o.showcase?.eyebrow, config.showcase.eyebrow),
      title: title(o.showcase?.title, config.showcase.title),
      description: pick(o.showcase?.description, config.showcase.description),
      ctaLabel: pick(o.showcase?.ctaLabel, config.showcase.ctaLabel),
      panels: byIndex(config.showcase.panels, o.showcase?.panels),
    },
    process: {
      title: title(o.process?.title, config.process.title),
      description: pick(o.process?.description, config.process.description),
      steps: steps.length
        ? steps.map((s) => ({ title: s.title as string, desc: s.desc ?? "", output: s.output ?? "" }))
        : config.process.steps,
    },
    why: {
      ...config.why,
      title: title(o.why?.title, config.why.title),
      items: byIndex(config.why.items, o.why?.items),
      tools: list(o.why?.tools, config.why.tools),
      highlight: {
        value: pick(o.why?.highlight?.value, config.why.highlight.value),
        label: pick(o.why?.highlight?.label, config.why.highlight.label),
        chips: list(o.why?.highlight?.chips, config.why.highlight.chips),
      },
    },
    packages: {
      ...packages,
      title: title(o.packages?.title, config.packages.title),
      description: pick(o.packages?.description, config.packages.description),
    },
    reviewsTitle: pick(o.reviewsTitle, config.reviewsTitle),
    faqTitle: has(o.faqTitle) ? title(o.faqTitle, null) : undefined,
    faqs: faqs.length ? faqs : config.faqs,
    cta: {
      titleLead: pick(o.cta?.titleLead, config.cta.titleLead),
      titleHighlight: pick(o.cta?.titleHighlight, config.cta.titleHighlight),
      description: pick(o.cta?.description, config.cta.description),
      videoSrc: pick(o.cta?.videoSrc, config.cta.videoSrc),
      posterSrc: pick(o.cta?.posterSrc, config.cta.posterSrc),
    },
  };
}

/** Converts a JSX title from the code into editor text ("Text *highlight*", <br> → new line). */
export function nodeToRich(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToRich).join("");
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
    if (el.type === "br") return "\n";
    const inner = nodeToRich(el.props.children);
    const isHighlight = el.type === GradientText || /bg-clip-text|text-\[#FF/.test(el.props.className ?? "");
    return isHighlight ? `*${inner}*` : inner;
  }
  return "";
}
