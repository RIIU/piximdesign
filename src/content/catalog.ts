// The 7 services (names, taglines, features) and their package prices.
// Defaults come from the code; Sanity → "Services & Prices" overrides them per service.
// Service IDs are fixed because they are the page addresses (/services/logo-design …).

import { SERVICES } from "@/data/agencyData";
import { SERVICE_PRICING, startingPrice, type TierKey, type TierPrice } from "@/data/servicePricing";

export type CatalogService = (typeof SERVICES)[number];
export type Pricing = Record<string, Record<TierKey, TierPrice>>;

export interface Catalog {
  services: CatalogService[];
  pricing: Pricing;
}

export const CATALOG_DEFAULTS: Catalog = { services: SERVICES, pricing: SERVICE_PRICING };

interface SanityCatalogItem {
  id?: string;
  title?: string;
  tagline?: string;
  badge?: string;
  features?: string[];
  basic?: Partial<TierPrice>;
  standard?: Partial<TierPrice>;
  premium?: Partial<TierPrice>;
}

const filled = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";

export function mergeCatalog(data: { services?: SanityCatalogItem[] } | null | undefined): Catalog {
  const items = data?.services ?? [];
  if (!items.length) return CATALOG_DEFAULTS;
  const byId = new Map(items.filter((i) => i?.id).map((i) => [i.id as string, i]));

  const services = SERVICES.map((s) => {
    const o = byId.get(s.id);
    if (!o) return s;
    return {
      ...s,
      title: filled(o.title) ? o.title : s.title,
      tagline: filled(o.tagline) ? o.tagline : s.tagline,
      badge: filled(o.badge) ? o.badge : s.badge,
      features: o.features?.filter(filled).length ? o.features.filter(filled) : s.features,
    };
  }) as CatalogService[];

  const pricing: Pricing = {};
  for (const [id, tiers] of Object.entries(SERVICE_PRICING)) {
    const o = byId.get(id);
    pricing[id] = { ...tiers };
    if (!o) continue;
    for (const tier of ["basic", "standard", "premium"] as TierKey[]) {
      const t = o[tier];
      if (!t) continue;
      pricing[id][tier] = {
        usd: filled(t.usd) ? t.usd : tiers[tier].usd,
        bdt: filled(t.bdt) ? t.bdt : tiers[tier].bdt,
        desc: filled(t.desc) ? t.desc : tiers[tier].desc,
      };
    }
  }
  return { services, pricing };
}

/** "Starting from" price (Basic package) in both currencies. */
export function startingFromPricing(pricing: Pricing, slug: string) {
  const basic = pricing[slug]?.basic;
  return basic ? { usd: startingPrice(basic.usd), bdt: startingPrice(basic.bdt) } : null;
}
