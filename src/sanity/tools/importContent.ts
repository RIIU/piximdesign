// Converts the website's built-in default content into Sanity documents, so the client
// starts with everything that is on the site today instead of empty forms.

import { SETTINGS_DEFAULTS } from "@/content/settings";
import { HOME_DEFAULTS } from "@/content/home";

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
