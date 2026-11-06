import { isSanityConfigured } from "./env";
import { sanityFetch } from "./live";
import { HOME_QUERY, SETTINGS_QUERY } from "./queries";
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
