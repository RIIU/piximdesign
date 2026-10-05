import React from "react";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/agencyData";
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

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return { title: "Service Not Found | Pixim Design" };

  return {
    title: `${service.title} | Pixim Design`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const ServicePage = SERVICE_PAGES[slug];

  if (!ServicePage) {
    notFound();
  }

  return <ServicePage />;
}
