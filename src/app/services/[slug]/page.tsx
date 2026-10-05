import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/agencyData";
import { startingFrom } from "@/data/servicePricing";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { BrandingServicePage } from "@/components/service-landing/services/branding";
import { SocialMediaServicePage } from "@/components/service-landing/services/social-media";
import { PackagingServicePage } from "@/components/service-landing/services/packaging";
import { MotionVideoServicePage } from "@/components/service-landing/services/motion-video";
import { DigitalMarketingServicePage } from "@/components/service-landing/services/digital-marketing";
import { WebDesignServicePage } from "@/components/service-landing/services/web-design";
import { SeoGrowthServicePage } from "@/components/service-landing/services/seo-growth";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// One landing page per service, all built on the shared service-landing template
const SERVICE_PAGES: Record<string, React.ComponentType> = {
  "logo-design": BrandingServicePage,
  "social-media": SocialMediaServicePage,
  "package-design": PackagingServicePage,
  "motion-video": MotionVideoServicePage,
  "digital-marketing": DigitalMarketingServicePage,
  "web-design": WebDesignServicePage,
  "seo-growth": SeoGrowthServicePage,
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found" };

  const from = startingFrom(slug);
  return pageMetadata({
    title: service.title,
    description: from ? `${service.tagline} Packages from ${from.bdt} / ${from.usd}.` : service.tagline,
    path: `/services/${slug}`,
  });
}

const priceNumber = (price: string) => price.replace(/[^0-9.]/g, "");

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const ServicePage = SERVICE_PAGES[slug];
  const service = SERVICES.find((s) => s.id === slug);

  if (!ServicePage || !service) {
    notFound();
  }

  const path = `/services/${slug}`;
  const from = startingFrom(slug);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.badge,
    description: service.tagline,
    url: absoluteUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [{ "@type": "Country", name: "Bangladesh" }, "Worldwide"],
    ...(from && {
      offers: [
        { "@type": "AggregateOffer", priceCurrency: "BDT", lowPrice: priceNumber(from.bdt), offerCount: 3 },
        { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: priceNumber(from.usd), offerCount: 3 },
      ],
    }),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ])}
      />
      <ServicePage />
    </>
  );
}
