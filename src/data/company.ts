// Company details shown on the contact and about pages, the footer, legal pages and structured data.
// Keep this in sync with piximdesign.com; empty fields are hidden on the site.

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "behance" | "x" | "youtube";

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  url: string;
}

export const COMPANY = {
  name: "Pixim Design",
  email: "contact@piximdesign.com",
  /** Display format, e.g. "+880 1XXX-XXXXXX"; hidden when empty */
  phone: "+880 1752-971287",
  /** Digits only with country code, used for wa.me links */
  whatsapp: "8801752971287",
  address: "Level 3, House 2, Block G, South Banasree Main Road, Dhaka 1219",
  /** e.g. "Saturday – Thursday, 10:00 AM – 7:00 PM (GMT+6)"; hidden when empty */
  hours: "Sat–Thu, 10:00 AM – 7:00 PM",
  responseTime: "Usually within 2 hours",
  socials: [
    { network: "facebook", label: "Facebook", url: "https://facebook.com/piximdesign" },
    { network: "behance", label: "Behance", url: "https://behance.net/sabbirbd" },
    { network: "x", label: "X (Twitter)", url: "https://twitter.com/piximdesign" },
  ] as SocialLink[],
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${COMPANY.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const phoneUrl = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
