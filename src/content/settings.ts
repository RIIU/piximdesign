// Global website content (shown on every page).
// These are the built-in defaults; anything filled in Sanity → "Site Settings" overrides them.

import { COMPANY, type SocialLink } from "@/data/company";
import { DEFAULT_LOGOS_ROW_1, DEFAULT_LOGOS_ROW_2, type ClientLogo } from "./homeData";

export interface SiteSettings {
  company: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    hours: string;
    responseTime: string;
  };
  socials: SocialLink[];
  clientLogos: ClientLogo[];
  navCtaLabel: string;
  footer: {
    about: string;
    consultationLabel: string;
  };
  ctaBanner: {
    kicker: string;
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
    mobileTitle: string;
    mobileText: string;
    mobilePrimaryLabel: string;
    mobileSecondaryLabel: string;
  };
}

export const SETTINGS_DEFAULTS: SiteSettings = {
  company: {
    name: COMPANY.name,
    email: COMPANY.email,
    phone: COMPANY.phone,
    whatsapp: COMPANY.whatsapp,
    address: COMPANY.address,
    hours: COMPANY.hours,
    responseTime: COMPANY.responseTime,
  },
  socials: [
    { network: "facebook", label: "Facebook", url: "https://facebook.com/piximdesign" },
    { network: "instagram", label: "Instagram", url: "https://instagram.com/piximdesign" },
    { network: "youtube", label: "YouTube", url: "https://youtube.com/@piximdesign" },
    { network: "behance", label: "Behance", url: "https://behance.net/sabbirbd" },
    { network: "linkedin", label: "LinkedIn", url: "https://linkedin.com/company/piximdesign" },
    { network: "x", label: "X (Twitter)", url: "https://twitter.com/piximdesign" },
  ],
  clientLogos: [...DEFAULT_LOGOS_ROW_1, ...DEFAULT_LOGOS_ROW_2],
  navCtaLabel: "Let's Talk",
  footer: {
    about:
      "Pixim Design helps Bangladeshi and global brands grow with sharper identities, better creative, modern websites, and high-impact digital design.",
    consultationLabel: "Get Free Consultation",
  },
  ctaBanner: {
    kicker: "READY TO SCALE?",
    title: "Let's build something remarkable.",
    primaryLabel: "Book a Call",
    secondaryLabel: "Free Audit",
    mobileTitle: "Take the *First Step*",
    mobileText:
      "From concept to MVP, from poor marketing strategy to powerful brand exposure – with Pixim, you're in good hands.",
    mobilePrimaryLabel: "BOOK A STRATEGY CALL",
    mobileSecondaryLabel: "CONTACT US",
  },
};
