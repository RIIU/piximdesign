import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [siteSettings, homePage];

/** Documents that exist exactly once (fixed IDs) */
export const SINGLETONS = [
  { type: "siteSettings", id: "siteSettings", title: "Site Settings" },
  { type: "homePage", id: "homePage", title: "Home Page" },
] as const;
