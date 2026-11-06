import { SERVICES } from "@/data/agencyData";
import { homePage } from "./homePage";
import { servicePage, servicesCatalog } from "./servicePage";
import { siteSettings } from "./siteSettings";
import { sitePage } from "./sitePage";
import { legalPage } from "./legalPage";

export const schemaTypes = [siteSettings, homePage, servicesCatalog, servicePage, sitePage, legalPage];

/** Documents that exist exactly once (fixed IDs) */
export const SINGLETONS = [
  { type: "siteSettings", id: "siteSettings", title: "Site Settings" },
  { type: "homePage", id: "homePage", title: "Home Page" },
  { type: "servicesCatalog", id: "servicesCatalog", title: "Services & Prices" },
] as const;

/** One fixed page document per service */
export const SERVICE_PAGE_DOCS = SERVICES.map((s) => ({ id: `servicePage-${s.id}`, slug: s.id, title: s.title }));

/** Types that can't be created/deleted freely from the Studio */
export const FIXED_TYPES = new Set<string>([...SINGLETONS.map((s) => s.type), "servicePage", "sitePage", "legalPage"]);

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
