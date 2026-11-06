import { isSanityConfigured } from "./env";
import { sanityFetch } from "./live";
import { CATALOG_QUERY, HOME_QUERY, LEGAL_QUERY, PAGE_QUERY, SERVICE_PAGE_QUERY, SETTINGS_QUERY } from "./queries";
import type { PageOverride } from "@/content/pageMerge";
import type { ServicePageOverride } from "@/components/service-landing/applyOverride";
import { CATALOG_DEFAULTS, mergeCatalog, type Catalog } from "@/content/catalog";
import { mergeContent } from "@/content/merge";
import { SETTINGS_DEFAULTS, type SiteSettings } from "@/content/settings";
import { HOME_DEFAULTS, type HomeContent } from "@/content/home";

async function load<T>(query: string, defaults: T): Promise<T> {
  if (!isSanityConfigured) return defaults;
  try {
    const { data } = await sanityFetch({ query });
    return mergeContent(defaults, data);
  } catch (err) {
    // Never break the website because the CMS is unreachable: fall back to defaults.
    console.error("[sanity] content fetch failed, using defaults:", err instanceof Error ? err.message : err);
    return defaults;
  }
}

export const getSiteSettings = (): Promise<SiteSettings> => load(SETTINGS_QUERY, SETTINGS_DEFAULTS);
export const getHomeContent = (): Promise<HomeContent> => load(HOME_QUERY, HOME_DEFAULTS);

export async function getCatalog(): Promise<Catalog> {
  if (!isSanityConfigured) return CATALOG_DEFAULTS;
  try {
    const { data } = await sanityFetch({ query: CATALOG_QUERY });
    return mergeCatalog(data as Parameters<typeof mergeCatalog>[0]);
  } catch (err) {
    console.error("[sanity] catalog fetch failed, using defaults:", err instanceof Error ? err.message : err);
    return CATALOG_DEFAULTS;
  }
}

/** Editable text for one service landing page (null → page uses its built-in content). */
export async function getServicePageOverride(slug: string): Promise<ServicePageOverride | null> {
  if (!isSanityConfigured) return null;
  try {
    const { data } = await sanityFetch({ query: SERVICE_PAGE_QUERY, params: { id: `servicePage-${slug}` } });
    return (data as ServicePageOverride | null) ?? null;
  } catch (err) {
    console.error("[sanity] service page fetch failed, using defaults:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** Editable content for an inner page (Services, Pricing, Projects, About, Contact). */
export async function getPageOverride(page: string): Promise<PageOverride | null> {
  if (!isSanityConfigured) return null;
  try {
    const { data } = await sanityFetch({ query: PAGE_QUERY, params: { id: `page-${page}` } });
    return (data as PageOverride | null) ?? null;
  } catch (err) {
    console.error("[sanity] page fetch failed, using defaults:", err instanceof Error ? err.message : err);
    return null;
  }
}

export interface LegalOverride {
  title?: string;
  intro?: string;
  sections?: { anchor?: string; title?: string; body?: unknown[] }[];
}

/** Editable Terms / Privacy / Refund page (null → built-in text). */
export async function getLegalOverride(key: string): Promise<LegalOverride | null> {
  if (!isSanityConfigured) return null;
  try {
    const { data } = await sanityFetch({ query: LEGAL_QUERY, params: { id: `legal-${key}` } });
    return (data as LegalOverride | null) ?? null;
  } catch (err) {
    console.error("[sanity] legal page fetch failed, using defaults:", err instanceof Error ? err.message : err);
    return null;
  }
}
