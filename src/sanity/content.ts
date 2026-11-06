import { isSanityConfigured } from "./env";
import { sanityFetch } from "./live";
import {
  BRAND_ICONS_QUERY,
  CATALOG_QUERY,
  HOME_QUERY,
  ICON_QUERY,
  LEGAL_QUERY,
  MEDIA_QUERY,
  PAGE_QUERY,
  SERVICE_PAGE_QUERY,
  SETTINGS_QUERY,
  TEXT_ALL_QUERY,
  TEXT_CHANGED_QUERY,
} from "./queries";
import { draftMode } from "next/headers";
import type { CustomIconData } from "@/content/icons";
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

/** Replaced images/videos: original path → uploaded file URL. */
export async function getMediaMap(): Promise<Record<string, string>> {
  if (!isSanityConfigured) return {};
  try {
    const { data } = await sanityFetch({ query: MEDIA_QUERY });
    const map: Record<string, string> = {};
    for (const item of (data as { src?: string; url?: string }[] | null) ?? []) {
      if (item?.src && item?.url) map[item.src] = item.url;
    }
    return map;
  } catch (err) {
    console.error("[sanity] media fetch failed, using original files:", err instanceof Error ? err.message : err);
    return {};
  }
}

/** Edited small texts: key → text (empty → built-in text is used). */
export async function getTextMap(): Promise<Record<string, string>> {
  if (!isSanityConfigured) return {};
  try {
    const { isEnabled: preview } = await draftMode();
    const { data } = await sanityFetch({ query: preview ? TEXT_ALL_QUERY : TEXT_CHANGED_QUERY });
    const map: Record<string, string> = {};
    for (const group of (data as { items?: { key?: string; text?: string }[] }[] | null) ?? []) {
      for (const item of group?.items ?? []) {
        if (item?.key && typeof item.text === "string" && item.text.trim() !== "") map[item.key] = item.text;
      }
    }
    return map;
  } catch (err) {
    console.error("[sanity] text fetch failed, using built-in texts:", err instanceof Error ? err.message : err);
    return {};
  }
}

/** Replaced icons: key → uploaded icon. */
export async function getIconMap(): Promise<Record<string, CustomIconData>> {
  if (!isSanityConfigured) return {};
  try {
    const { data } = await sanityFetch({ query: ICON_QUERY, stega: false });
    const map: Record<string, CustomIconData> = {};
    for (const item of (data as { key?: string; url?: string; tint?: boolean }[] | null) ?? []) {
      if (item?.key && item?.url) map[item.key] = { url: item.url, tint: item.tint !== false };
    }
    return map;
  } catch (err) {
    console.error("[sanity] icon fetch failed, using built-in icons:", err instanceof Error ? err.message : err);
    return {};
  }
}

export interface BrandIcons {
  faviconUrl?: string;
  appleIconUrl?: string;
  shareImageUrl?: string;
}

/** Website icon (browser tab), phone home-screen icon and social share image. */
export async function getBrandIcons(): Promise<BrandIcons> {
  if (!isSanityConfigured) return {};
  try {
    const { data } = await sanityFetch({ query: BRAND_ICONS_QUERY, stega: false });
    return (data as BrandIcons | null) ?? {};
  } catch (err) {
    console.error("[sanity] brand icon fetch failed, using built-in icons:", err instanceof Error ? err.message : err);
    return {};
  }
}
