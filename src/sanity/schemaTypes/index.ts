import { SERVICES } from "@/data/agencyData";
import { homePage } from "./homePage";
import { servicePage, servicesCatalog } from "./servicePage";
import { siteSettings } from "./siteSettings";
import { sitePage } from "./sitePage";
import { legalPage } from "./legalPage";
import { mediaLibrary } from "./mediaLibrary";
import { iconLibrary } from "./iconLibrary";
import { textGroup } from "./textGroup";
import { TEXT_AREAS } from "@/content/textManifest";

export const schemaTypes = [siteSettings, homePage, servicesCatalog, servicePage, sitePage, legalPage, mediaLibrary, iconLibrary, textGroup];

/** Documents that exist exactly once (fixed IDs) */
export const SINGLETONS = [
  { type: "siteSettings", id: "siteSettings", title: "Site Settings" },
  { type: "homePage", id: "homePage", title: "Home Page" },
  { type: "servicesCatalog", id: "servicesCatalog", title: "Services & Prices" },
  { type: "mediaLibrary", id: "mediaLibrary", title: "Images & Videos" },
  { type: "iconLibrary", id: "iconLibrary", title: "Icons" },
] as const;

/** One "Website text" document per page: buttons, labels and other small texts */
export const TEXT_DOCS = TEXT_AREAS.map((a) => ({ id: `text-${a.id}`, area: a.id, title: a.title, href: a.href }));

/** One fixed page document per service */
export const SERVICE_PAGE_DOCS = SERVICES.map((s) => ({ id: `servicePage-${s.id}`, slug: s.id, title: s.title }));

/** Types that can't be created/deleted freely from the Studio */
export const FIXED_TYPES = new Set<string>([...SINGLETONS.map((s) => s.type), "servicePage", "sitePage", "legalPage", "textGroup"]);

/** One fixed document per inner page */
export const PAGE_DOCS = [
  { id: "page-services", page: "services", title: "Services page", href: "/services" },
  { id: "page-pricing", page: "pricing", title: "Pricing page", href: "/pricing" },
  { id: "page-projects", page: "projects", title: "Projects page", href: "/projects" },
  { id: "page-about", page: "about", title: "About page", href: "/about" },
  { id: "page-contact", page: "contact", title: "Contact page", href: "/contact" },
] as const;

/** Legal documents */
export const LEGAL_DOCS = [
  { id: "legal-terms", key: "terms", title: "Terms & Conditions", href: "/terms" },
  { id: "legal-privacy", key: "privacy", title: "Privacy Policy", href: "/privacy-policy" },
  { id: "legal-refund", key: "refund", title: "Refund Policy", href: "/refund-policy" },
] as const;
