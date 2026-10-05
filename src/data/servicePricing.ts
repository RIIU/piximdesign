// Package prices per service (USD for international clients, BDT for Bangladesh).
// Single source of truth for service pages, the services overview and the pricing page.

export interface TierPrice {
  usd: string;
  bdt: string;
  desc: string;
}

export type TierKey = "basic" | "standard" | "premium";

export const SERVICE_PRICING: Record<string, Record<TierKey, TierPrice>> = {
  "logo-design": {
    basic: { usd: "$75 - $120", bdt: "৳9,000 - ৳15,000", desc: "Essential logo mark + basic color palette" },
    standard: { usd: "$150 - $250", bdt: "৳18,000 - ৳30,000", desc: "Full brand identity kit + source files + guidelines" },
    premium: { usd: "$350+", bdt: "৳45,000+", desc: "Complete 360° corporate rebrand + stationery + 3D mockups" },
  },
  "social-media": {
    basic: { usd: "$60 - $100", bdt: "৳7,500 - ৳12,000", desc: "Pack of 5 promotional social media banners" },
    standard: { usd: "$140 - $220", bdt: "৳17,000 - ৳28,000", desc: "Monthly campaign kit (15 posts + story templates)" },
    premium: { usd: "$300+", bdt: "৳38,000+", desc: "Complete 30-day content calendar & multi-channel ads" },
  },
  "package-design": {
    basic: { usd: "$80 - $150", bdt: "৳10,000 - ৳18,000", desc: "Single product label or sticker design" },
    standard: { usd: "$180 - $320", bdt: "৳22,000 - ৳40,000", desc: "Full retail box/pouch layout + 3D mockup" },
    premium: { usd: "$400+", bdt: "৳50,000+", desc: "Complete product line packaging series (3+ SKUs)" },
  },
  "motion-video": {
    basic: { usd: "$90 - $160", bdt: "৳11,000 - ৳20,000", desc: "Short 5-10s animated logo sting / stinger" },
    standard: { usd: "$200 - $380", bdt: "৳25,000 - ৳48,000", desc: "30s promotional commercial video / reel" },
    premium: { usd: "$450+", bdt: "৳55,000+", desc: "Full 60s explainer video with custom 3D motion" },
  },
  "digital-marketing": {
    basic: { usd: "$150 - $250/mo", bdt: "৳18,000 - ৳30,000/mo", desc: "Single channel campaign management (Meta or Google)" },
    standard: { usd: "$350 - $600/mo", bdt: "৳42,000 - ৳75,000/mo", desc: "Multi-channel ad funnels + audience retargeting" },
    premium: { usd: "$800+/mo", bdt: "৳100,000+/mo", desc: "Full-scale growth marketing & scale management" },
  },
  "web-design": {
    basic: { usd: "$180 - $350", bdt: "৳22,000 - ৳42,000", desc: "High-converting modern landing page" },
    standard: { usd: "$450 - $800", bdt: "৳55,000 - ৳98,000", desc: "Full multi-page corporate website + CMS" },
    premium: { usd: "$1,200+", bdt: "৳145,000+", desc: "Custom web app / SaaS portal with dynamic database" },
  },
  "seo-growth": {
    basic: { usd: "$120 - $200", bdt: "৳15,000 - ৳25,000", desc: "One-time technical & on-page SEO setup" },
    standard: { usd: "$250 - $450", bdt: "৳30,000 - ৳55,000", desc: "Full on-page + local SEO + ranking roadmap" },
    premium: { usd: "$500+/mo", bdt: "৳65,000+/mo", desc: "Complete ongoing SEO retainer & organic lead gen" },
  },
};

/** Lowest price in a range, keeping a monthly suffix: "$150 - $250/mo" → "$150/mo". */
export function startingPrice(range: string): string {
  const first = range.split(" - ")[0].replace(/\+(\/mo)?$/, "$1");
  const monthly = range.endsWith("/mo") && !first.endsWith("/mo") ? "/mo" : "";
  return first + monthly;
}

/** "Starting from" price of a service (its Basic package) in both currencies. */
export function startingFrom(slug: string): { usd: string; bdt: string } | null {
  const basic = SERVICE_PRICING[slug]?.basic;
  return basic ? { usd: startingPrice(basic.usd), bdt: startingPrice(basic.bdt) } : null;
}
