// Converts the website's built-in default content into Sanity documents, so the client
// starts with everything that is on the site today instead of empty forms.

import { SETTINGS_DEFAULTS } from "@/content/settings";
import { HOME_DEFAULTS } from "@/content/home";
import { SERVICES } from "@/data/agencyData";
import { SERVICE_PRICING } from "@/data/servicePricing";
import { nodeToRich } from "@/components/service-landing/applyOverride";
import type { ServiceConfig } from "@/components/service-landing/types";
import { config as brandingConfig } from "@/components/service-landing/services/branding";
import { config as socialConfig } from "@/components/service-landing/services/social-media";
import { config as packagingConfig } from "@/components/service-landing/services/packaging";
import { config as motionConfig } from "@/components/service-landing/services/motion-video";
import { config as marketingConfig } from "@/components/service-landing/services/digital-marketing";
import { config as webConfig } from "@/components/service-landing/services/web-design";
import { config as seoConfig } from "@/components/service-landing/services/seo-growth";
import type { PageContent } from "@/content/pageMerge";
import { SERVICES_PAGE_DEFAULTS } from "@/components/pages/ServicesView";
import { PRICING_PAGE_DEFAULTS } from "@/components/pages/PricingView";
import { PROJECTS_PAGE_DEFAULTS } from "@/components/pages/ProjectsView";
import { ABOUT_PAGE_DEFAULTS } from "@/components/pages/AboutView";
import { CONTACT_PAGE_DEFAULTS } from "@/content/contactDefaults";
import React from "react";
import { MEDIA_MANIFEST } from "@/content/mediaManifest";
import { TEXT_AREAS, TEXT_MANIFEST } from "@/content/textManifest";
import { ICON_MANIFEST } from "@/content/iconManifest";
import * as termsLegal from "@/content/legal/terms";
import * as privacyLegal from "@/content/legal/privacy";
import * as refundLegal from "@/content/legal/refund";

const LEGAL = { terms: termsLegal, privacy: privacyLegal, refund: refundLegal };

export const PAGE_DEFAULTS: Record<string, { title: string; defaults: PageContent }> = {
  services: { title: "Services page", defaults: SERVICES_PAGE_DEFAULTS },
  pricing: { title: "Pricing page", defaults: PRICING_PAGE_DEFAULTS },
  projects: { title: "Projects page", defaults: PROJECTS_PAGE_DEFAULTS },
  about: { title: "About page", defaults: ABOUT_PAGE_DEFAULTS },
  contact: { title: "Contact page", defaults: CONTACT_PAGE_DEFAULTS },
};

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  "logo-design": brandingConfig,
  "social-media": socialConfig,
  "package-design": packagingConfig,
  "motion-video": motionConfig,
  "digital-marketing": marketingConfig,
  "web-design": webConfig,
  "seo-growth": seoConfig,
};

let keyCounter = 0;
const key = () => `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;

export function buildSiteSettingsDoc() {
  const s = SETTINGS_DEFAULTS;
  return {
    _id: "siteSettings",
    _type: "siteSettings",
    company: { ...s.company },
    socials: s.socials.map((x) => ({ _key: key(), _type: "social", ...x })),
    clientLogos: s.clientLogos.map((l) => ({ _key: key(), _type: "clientLogo", name: l.name, imageUrl: l.src })),
    navCtaLabel: s.navCtaLabel,
    footer: { ...s.footer },
    ctaBanner: { ...s.ctaBanner },
  };
}

export function buildHomePageDoc() {
  const h = HOME_DEFAULTS;
  return {
    _id: "homePage",
    _type: "homePage",
    hero: { ...h.hero },
    showcase: {
      badge: h.showcase.badge,
      title: h.showcase.title,
      trustedText: h.showcase.trustedText,
      videoUrl: h.showcase.videoSrc,
      posterUrl: h.showcase.posterSrc,
    },
    services: { ...h.services },
    industries: {
      title: h.industries.title,
      description: h.industries.description,
      items: h.industries.items.map((i) => ({
        _key: key(),
        _type: "industry",
        name: i.name,
        shortName: i.shortName,
        id: { _type: "slug", current: i.id },
        icon: i.icon || i.id,
        headline: i.headline,
        challenge: i.challenge,
        outcomes: i.outcomes,
        serviceSlugs: i.services,
      })),
    },
    why: { ...h.why },
    brandStories: { ...h.brandStories },
    logoCta: {
      titleLead: h.logoCta.titleLead,
      titleHighlight: h.logoCta.titleHighlight,
      description: h.logoCta.description,
      videoUrl: h.logoCta.videoSrc,
      posterUrl: h.logoCta.posterSrc,
    },
    stats: { ...h.stats },
    recentWork: {
      title: h.recentWork.title,
      description: h.recentWork.description,
      projects: h.recentWork.projects.map((p) => ({
        _key: key(),
        _type: "project",
        title: p.title,
        type: p.type,
        imageUrl: p.thumbnailSrc,
        ...(p.type === "video" ? { videoUrl: p.mediaSrc } : {}),
        category: p.category,
        clientLabel: p.clientLabel,
        subtext: p.subtext,
        badgeLabel: p.badgeLabel,
        description: p.description,
      })),
    },
    testimonials: {
      title: h.testimonials.title,
      description: h.testimonials.description,
      items: h.testimonials.items.map((t) => ({
        _key: key(),
        _type: "review",
        author: t.author,
        role: t.role,
        review: t.review,
        rating: t.rating,
        tag: t.tag,
        initials: t.initials,
        flag: t.flag,
        avatarBg: t.avatarBg,
      })),
    },
    consultation: { ...h.consultation },
    faq: {
      title: h.faq.title,
      description: h.faq.description,
      cardTitle: h.faq.cardTitle,
      cardText: h.faq.cardText,
      cardCta: h.faq.cardCta,
      items: h.faq.items.map((f) => ({ _key: key(), _type: "faqItem", question: f.question, answer: f.answer })),
    },
  };
}

export function buildCatalogDoc() {
  return {
    _id: "servicesCatalog",
    _type: "servicesCatalog",
    services: SERVICES.map((s) => ({
      _key: key(),
      _type: "catalogService",
      serviceId: s.id,
      title: s.title,
      tagline: s.tagline,
      badge: s.badge,
      features: [...s.features],
      basic: { ...SERVICE_PRICING[s.id].basic },
      standard: { ...SERVICE_PRICING[s.id].standard },
      premium: { ...SERVICE_PRICING[s.id].premium },
    })),
  };
}

const items = (list: { title: string; desc: string; output?: string }[]) =>
  list.map((i) => ({ _key: key(), _type: "item", title: i.title, desc: i.desc, ...(i.output ? { output: i.output } : {}) }));

export function buildServicePageDoc(slug: string) {
  const c = SERVICE_CONFIGS[slug];
  const short = c.shortName;
  return {
    _id: `servicePage-${slug}`,
    _type: "servicePage",
    serviceId: slug,
    hero: { eyebrow: c.hero.eyebrow, title: nodeToRich(c.hero.title), description: c.hero.description, primaryCta: c.hero.primaryCta },
    statement: {
      eyebrow: c.statement.eyebrow,
      text: c.statement.text,
      highlights: [...c.statement.highlights],
      pillars: items(c.statement.pillars),
    },
    bento: { eyebrow: c.bento.eyebrow, title: nodeToRich(c.bento.title), description: c.bento.description, tiles: items(c.bento.tiles) },
    showcase: {
      eyebrow: c.showcase.eyebrow,
      title: nodeToRich(c.showcase.title),
      description: c.showcase.description,
      ctaLabel: c.showcase.ctaLabel,
      panels: items(c.showcase.panels),
    },
    process: { title: nodeToRich(c.process.title), description: c.process.description, steps: items(c.process.steps) },
    why: {
      title: nodeToRich(c.why.title),
      items: items(c.why.items),
      tools: [...c.why.tools],
      highlight: { value: c.why.highlight.value, label: c.why.highlight.label, chips: [...c.why.highlight.chips] },
    },
    packages: {
      title: nodeToRich(c.packages.title),
      description: c.packages.description,
      basic: { tagline: c.packages.tiers.basic.tagline, features: [...c.packages.tiers.basic.features] },
      standard: { tagline: c.packages.tiers.standard.tagline, features: [...c.packages.tiers.standard.features] },
      premium: { tagline: c.packages.tiers.premium.tagline, features: [...c.packages.tiers.premium.features] },
    },
    reviewsTitle: c.reviewsTitle,
    faqTitle: `${short} Questions, *Answered*`,
    faqs: c.faqs.map((f) => ({ _key: key(), _type: "faq", q: f.q, a: f.a })),
    cta: {
      titleLead: c.cta.titleLead,
      titleHighlight: c.cta.titleHighlight,
      description: c.cta.description,
      videoUrl: c.cta.videoSrc,
      posterUrl: c.cta.posterSrc,
    },
  };
}

export function buildPageDoc(page: string) {
  const { title, defaults: d } = PAGE_DEFAULTS[page];
  const blocks: string[] = [];
  if (d.hero.eyebrow) blocks.push("hero.eyebrow");
  if (d.hero.primaryLabel) blocks.push("hero.buttons");
  if (d.points) blocks.push("points");
  if (d.stats) blocks.push("stats");
  if (d.cards) blocks.push("cards");
  if (d.packages) blocks.push("packages");
  if (d.process) blocks.push("process");
  if (d.why) blocks.push("why");
  if (d.reviewsTitle !== undefined) blocks.push("reviews");
  if (d.cta) blocks.push("cta");
  if (d.faq) blocks.push("faq");
  const tier = (t: NonNullable<PageContent["packages"]>["tiers"]["basic"]) => ({ ...t, features: [...t.features] });
  return {
    _id: `page-${page}`,
    _type: "sitePage",
    pageName: title,
    blocks,
    hero: { ...d.hero },
    sections: Object.entries(d.sections).map(([key, sec]) => {
      const fields = (["eyebrow", "title", "description", "buttonLabel", "secondaryLabel"] as const).filter((f) => sec[f] !== undefined);
      return {
        _key: key,
        _type: "pageSection",
        key,
        label: sec.label,
        fields: [...fields],
        ...Object.fromEntries(fields.map((f) => [f, sec[f]])),
      };
    }),
    ...(d.points ? { points: [...d.points] } : {}),
    ...(d.stats ? { stats: d.stats.map((x) => ({ _key: key(), _type: "stat", value: x.value, label: x.label })) } : {}),
    ...(d.cards ? { cards: items(d.cards) } : {}),
    ...(d.packages
      ? {
          packages: {
            title: d.packages.title,
            description: d.packages.description,
            basic: tier(d.packages.tiers.basic),
            standard: tier(d.packages.tiers.standard),
            premium: tier(d.packages.tiers.premium),
          },
        }
      : {}),
    ...(d.process ? { process: { title: d.process.title, description: d.process.description, steps: items(d.process.steps) } } : {}),
    ...(d.why
      ? {
          why: {
            title: d.why.title,
            items: items(d.why.items),
            tools: [...d.why.tools],
            highlight: { value: d.why.highlight.value, label: d.why.highlight.label, chips: [...d.why.highlight.chips] },
          },
        }
      : {}),
    ...(d.reviewsTitle !== undefined ? { reviewsTitle: d.reviewsTitle } : {}),
    ...(d.cta ? { cta: { ...d.cta } } : {}),
    ...(d.faq ? { faq: { title: d.faq.title, items: d.faq.items.map((f) => ({ _key: key(), _type: "faq", q: f.q, a: f.a })) } } : {}),
  };
}

/* ---------- JSX → Portable Text (for the legal pages) ---------- */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = { _type: "block"; _key: string; style: "normal"; children: Span[]; markDefs: { _key: string; _type: "link"; href: string }[]; listItem?: "bullet"; level?: number };

function inlineToSpans(node: React.ReactNode, marks: string[], markDefs: Block["markDefs"]): Span[] {
  if (node === null || node === undefined || typeof node === "boolean") return [];
  if (typeof node === "string" || typeof node === "number") return [{ _type: "span", _key: key(), text: String(node), marks }];
  if (Array.isArray(node)) return node.flatMap((n) => inlineToSpans(n, marks, markDefs));
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode; href?: string }>;
    if (el.type === "strong" || el.type === "b") return inlineToSpans(el.props.children, [...marks, "strong"], markDefs);
    if (el.props.href) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: String(el.props.href) });
      return inlineToSpans(el.props.children, [...marks, k], markDefs);
    }
    return inlineToSpans(el.props.children, marks, markDefs);
  }
  return [];
}

function makeBlock(children: React.ReactNode, listItem?: "bullet"): Block {
  const markDefs: Block["markDefs"] = [];
  const spans = inlineToSpans(children, [], markDefs);
  // Collapse the whitespace JSX leaves between lines
  spans.forEach((sp) => (sp.text = sp.text.replace(/\s+/g, " ")));
  if (spans.length) {
    spans[0].text = spans[0].text.replace(/^\s+/, "");
    spans[spans.length - 1].text = spans[spans.length - 1].text.replace(/\s+$/, "");
  }
  return { _type: "block", _key: key(), style: "normal", children: spans, markDefs, ...(listItem ? { listItem, level: 1 } : {}) };
}

export function jsxToPortableText(node: React.ReactNode): Block[] {
  if (node === null || node === undefined || typeof node === "boolean") return [];
  if (Array.isArray(node)) return node.flatMap(jsxToPortableText);
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    if (el.type === React.Fragment) return jsxToPortableText(el.props.children);
    if (el.type === "p") return [makeBlock(el.props.children)];
    if (el.type === "ul" || el.type === "ol") {
      return React.Children.toArray(el.props.children).flatMap((li) =>
        React.isValidElement(li) ? [makeBlock((li as React.ReactElement<{ children?: React.ReactNode }>).props.children, "bullet")] : []
      );
    }
  }
  return [makeBlock(node)];
}

export function buildLegalDoc(k: keyof typeof LEGAL) {
  const mod = LEGAL[k];
  return {
    _id: `legal-${k}`,
    _type: "legalPage",
    title: mod.TITLE,
    intro: mod.INTRO,
    sections: mod.SECTIONS.map((sec) => ({
      _key: key(),
      _type: "legalSection",
      title: sec.title,
      anchor: sec.id,
      body: jsxToPortableText(sec.content),
    })),
  };
}

export function buildMediaDoc() {
  return {
    _id: "mediaLibrary",
    _type: "mediaLibrary",
    items: MEDIA_MANIFEST.map(mediaItem),
  };
}

/** Stable array key from a text/icon key, so later imports can tell which items already exist. */
function stableKey(prefix: string, value: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return `${prefix}${(h >>> 0).toString(36)}${value.length.toString(36)}`;
}

export const textItem = (t: (typeof TEXT_MANIFEST)[number]) => ({
  _key: stableKey("t", t.key),
  _type: "textItem",
  key: t.key,
  section: t.section,
  original: t.text,
  text: t.text,
});

export function buildTextDocs() {
  return TEXT_AREAS.map((a) => ({
    _id: `text-${a.id}`,
    _type: "textGroup",
    title: a.title,
    items: TEXT_MANIFEST.filter((t) => t.area === a.id).map(textItem),
  }));
}

export const iconItem = (i: (typeof ICON_MANIFEST)[number]) => ({
  _key: stableKey("i", i.key),
  _type: "iconItem",
  key: i.key,
  name: i.name,
  area: i.area,
  // colourful service icons keep their own colours, line icons follow the site colour
  tint: i.kind !== "service",
});

export function buildIconDoc() {
  return { _id: "iconLibrary", _type: "iconLibrary", items: ICON_MANIFEST.map(iconItem) };
}

const mediaItem = (m: (typeof MEDIA_MANIFEST)[number]) => ({ _key: key(), _type: "mediaItem", name: m.name, area: m.area, src: m.src, type: m.type });

/**
 * Lists that grow when new texts/icons/images are added to the code.
 * For each: the document, the field that identifies an item, and every item the code has.
 */
export function buildLibraryItems(): { _id: string; idField: "key" | "src"; items: { [k: string]: unknown }[] }[] {
  return [
    ...buildTextDocs().map((d) => ({ _id: d._id, idField: "key" as const, items: d.items })),
    { _id: "iconLibrary", idField: "key", items: ICON_MANIFEST.map(iconItem) },
    { _id: "mediaLibrary", idField: "src", items: MEDIA_MANIFEST.map(mediaItem) },
  ];
}

/** Every document the import can create, in order. */
export function buildAllDocs(): { _id: string; _type: string; [key: string]: unknown }[] {
  return [
    buildSiteSettingsDoc(),
    buildHomePageDoc(),
    buildCatalogDoc(),
    ...Object.keys(SERVICE_CONFIGS).map(buildServicePageDoc),
    ...Object.keys(PAGE_DEFAULTS).map(buildPageDoc),
    ...(Object.keys(LEGAL) as (keyof typeof LEGAL)[]).map(buildLegalDoc),
    buildMediaDoc(),
    buildIconDoc(),
    ...buildTextDocs(),
  ];
}
