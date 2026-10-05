import type { Metadata } from "next";
import { COMPANY } from "@/data/company";

// Set NEXT_PUBLIC_SITE_URL to the custom domain once it is live (e.g. https://piximdesign.com)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://piximdesign.vercel.app").replace(/\/+$/, "");
export const SITE_NAME = "Pixim Design";
export const SITE_TITLE = "Pixim Design | Branding & Digital Design Studio in Bangladesh";
export const SITE_DESCRIPTION =
  "Branding and digital design studio in Dhaka, Bangladesh: logos, packaging, social media, video, websites, ads and SEO for businesses worldwide.";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Pixim Design, branding and digital design studio",
};

export const BASE_OPEN_GRAPH = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
} as const;

/** Page metadata with a canonical URL and matching Open Graph / Twitter cards. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const shareTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...BASE_OPEN_GRAPH, url: path, title: shareTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [OG_IMAGE.url] },
  };
}

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

/** BreadcrumbList structured data; the first item is always Home. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Site-wide Organization + WebSite graph rendered in the root layout. */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description: SITE_DESCRIPTION,
      email: COMPANY.email,
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      areaServed: "Worldwide",
      currenciesAccepted: "BDT, USD",
      paymentAccepted: "bKash, Nagad, Rocket, Bank transfer, Credit card, Debit card",
      knowsLanguage: ["en", "bn"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};
