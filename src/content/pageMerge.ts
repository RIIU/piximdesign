// Generic editable content for the inner pages (Services, Pricing, Projects, About, Contact).
// Each page keeps its current text as DEFAULTS in code; Sanity → "Pages → <page>" overrides it.

import type { LucideIcon } from "lucide-react";

export interface PageSection {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  secondaryLabel?: string;
}

export interface PageContent {
  hero: { eyebrow: string; title: string; description: string; primaryLabel: string; secondaryLabel: string };
  /** Named headings/texts for the page's own sections */
  sections: Record<string, PageSection & { label: string }>;
  process?: { title: string; description: string; steps: { title: string; desc: string; output: string }[] };
  why?: {
    title: string;
    items: { icon: LucideIcon; title: string; desc: string }[];
    tools: string[];
    highlight: { value: string; label: string; chips: string[] };
  };
  /** Feature cards whose icons stay in code (text matched by position) */
  cards?: { icon: LucideIcon; title: string; desc: string }[];
  /** Simple check-list points */
  points?: string[];
  /** Number tiles */
  stats?: { value: string; label: string }[];
  packages?: {
    title: string;
    description: string;
    tiers: Record<TierName, { usd: string; bdt: string; desc: string; tagline: string; features: string[] }>;
  };
  reviewsTitle?: string;
  cta?: { titleLead: string; titleHighlight: string; description: string };
  faq?: { title: string; items: { q: string; a: string }[] };
}

export type TierName = "basic" | "standard" | "premium";

/** Shape coming from Sanity (everything optional, sections as a list) */
export interface PageOverride {
  hero?: Partial<PageContent["hero"]>;
  sections?: (PageSection & { key?: string })[];
  process?: { title?: string; description?: string; steps?: { title?: string; desc?: string; output?: string }[] };
  why?: {
    title?: string;
    items?: { title?: string; desc?: string }[];
    tools?: string[];
    highlight?: { value?: string; label?: string; chips?: string[] };
  };
  cards?: { title?: string; desc?: string }[];
  points?: string[];
  stats?: { value?: string; label?: string }[];
  packages?: {
    title?: string;
    description?: string;
    basic?: { usd?: string; bdt?: string; desc?: string; tagline?: string; features?: string[] };
    standard?: { usd?: string; bdt?: string; desc?: string; tagline?: string; features?: string[] };
    premium?: { usd?: string; bdt?: string; desc?: string; tagline?: string; features?: string[] };
  };
  reviewsTitle?: string;
  cta?: { titleLead?: string; titleHighlight?: string; description?: string };
  faq?: { title?: string; items?: { q?: string; a?: string }[] };
}

const has = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const pick = (o: string | undefined, d: string) => (has(o) ? o : d);
const list = (o: string[] | undefined, d: string[]) => {
  const clean = (o ?? []).filter(has);
  return clean.length ? clean : d;
};

export function mergePage(d: PageContent, o: PageOverride | null | undefined): PageContent {
  if (!o) return d;
  const sections: PageContent["sections"] = {};
  for (const [key, def] of Object.entries(d.sections)) {
    const s = o.sections?.find((x) => x?.key === key);
    sections[key] = s
      ? {
          label: def.label,
          eyebrow: def.eyebrow !== undefined ? pick(s.eyebrow, def.eyebrow) : undefined,
          title: def.title !== undefined ? pick(s.title, def.title) : undefined,
          description: def.description !== undefined ? pick(s.description, def.description) : undefined,
          buttonLabel: def.buttonLabel !== undefined ? pick(s.buttonLabel, def.buttonLabel) : undefined,
          secondaryLabel: def.secondaryLabel !== undefined ? pick(s.secondaryLabel, def.secondaryLabel) : undefined,
        }
      : def;
  }
  const steps = (o.process?.steps ?? []).filter((s) => has(s?.title));
  const faqs = (o.faq?.items ?? []).filter((f) => has(f?.q) && has(f?.a)) as { q: string; a: string }[];
  return {
    hero: {
      eyebrow: pick(o.hero?.eyebrow, d.hero.eyebrow),
      title: pick(o.hero?.title, d.hero.title),
      description: pick(o.hero?.description, d.hero.description),
      primaryLabel: pick(o.hero?.primaryLabel, d.hero.primaryLabel),
      secondaryLabel: pick(o.hero?.secondaryLabel, d.hero.secondaryLabel),
    },
    sections,
    process: d.process && {
      title: pick(o.process?.title, d.process.title),
      description: pick(o.process?.description, d.process.description),
      steps: steps.length ? steps.map((s) => ({ title: s.title as string, desc: s.desc ?? "", output: s.output ?? "" })) : d.process.steps,
    },
    why: d.why && {
      title: pick(o.why?.title, d.why.title),
      // icons stay in code, so reasons are matched by position
      items: d.why.items.map((item, i) => ({
        ...item,
        title: pick(o.why?.items?.[i]?.title, item.title),
        desc: pick(o.why?.items?.[i]?.desc, item.desc),
      })),
      tools: list(o.why?.tools, d.why.tools),
      highlight: {
        value: pick(o.why?.highlight?.value, d.why.highlight.value),
        label: pick(o.why?.highlight?.label, d.why.highlight.label),
        chips: list(o.why?.highlight?.chips, d.why.highlight.chips),
      },
    },
    cards: d.cards?.map((card, i) => ({
      ...card,
      title: pick(o.cards?.[i]?.title, card.title),
      desc: pick(o.cards?.[i]?.desc, card.desc),
    })),
    points: d.points && list(o.points, d.points),
    stats:
      d.stats && (o.stats ?? []).filter((x) => has(x?.value) && has(x?.label)).length
        ? (o.stats ?? []).filter((x) => has(x?.value) && has(x?.label)).map((x) => ({ value: x.value as string, label: x.label as string }))
        : d.stats,
    packages: d.packages && {
      title: pick(o.packages?.title, d.packages.title),
      description: pick(o.packages?.description, d.packages.description),
      tiers: Object.fromEntries(
        (["basic", "standard", "premium"] as TierName[]).map((k) => {
          const t = d.packages!.tiers[k];
          const ot = o.packages?.[k];
          return [
            k,
            {
              usd: pick(ot?.usd, t.usd),
              bdt: pick(ot?.bdt, t.bdt),
              desc: pick(ot?.desc, t.desc),
              tagline: pick(ot?.tagline, t.tagline),
              features: list(ot?.features, t.features),
            },
          ];
        })
      ) as Record<TierName, { usd: string; bdt: string; desc: string; tagline: string; features: string[] }>,
    },
    reviewsTitle: d.reviewsTitle !== undefined ? pick(o.reviewsTitle, d.reviewsTitle) : undefined,
    cta: d.cta && {
      titleLead: pick(o.cta?.titleLead, d.cta.titleLead),
      titleHighlight: pick(o.cta?.titleHighlight, d.cta.titleHighlight),
      description: pick(o.cta?.description, d.cta.description),
    },
    faq: d.faq && { title: pick(o.faq?.title, d.faq.title), items: faqs.length ? faqs : d.faq.items },
  };
}

