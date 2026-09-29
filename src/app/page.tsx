"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { HeroSection } from "@/components/HeroSection";

// Lazy load below-the-fold sections — only load when needed
const VideoShowcaseSection = dynamic(() => import("@/components/VideoShowcaseSection").then(m => ({ default: m.VideoShowcaseSection })), { ssr: false });
const StatsBar = dynamic(() => import("@/components/StatsBar").then(m => ({ default: m.StatsBar })), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })), { ssr: false });
const ReadyForLogoSection = dynamic(() => import("@/components/ReadyForLogoSection").then(m => ({ default: m.ReadyForLogoSection })), { ssr: false });
const BrandStoriesSection = dynamic(() => import("@/components/BrandStoriesSection").then(m => ({ default: m.BrandStoriesSection })), { ssr: false });
const ProcessSection = dynamic(() => import("@/components/ProcessSection").then(m => ({ default: m.ProcessSection })), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })), { ssr: false });
const FreeConsultationSection = dynamic(() => import("@/components/FreeConsultationSection").then(m => ({ default: m.FreeConsultationSection })), { ssr: false });
const FaqSection = dynamic(() => import("@/components/FaqSection").then(m => ({ default: m.FaqSection })), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })), { ssr: false });

export default function Home() {
  const { openContact } = useContactModal();

  const handleSelectService = (serviceTitle: string) => {
    openContact(serviceTitle, `Interested in getting a scope for ${serviceTitle}`);
  };

  return (
    <main className="w-full overflow-x-clip">
      {/* 1. Flagship Hero Section */}
      <HeroSection onOpenContact={() => openContact()} />

      {/* 2. Video Showcase Reel & Brand Logo Carousel (GSAP Scroll-expanding video) */}
      <VideoShowcaseSection onOpenContact={() => openContact()} />

      {/* 3. Key Metrics & Social Proof */}
      <StatsBar className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 md:my-10" />

      {/* 4. Core Capabilities & Services Bento Grid */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 5. Experience Brand Stories in Design (Pixxen-style Sticky Split Showcase) */}
      <BrandStoriesSection onOpenContact={() => openContact()} />

      {/* 6. Ready for a Professional Logo? Video Showcase CTA */}
      <ReadyForLogoSection onOpenContact={(service, note) => openContact(service, note)} />

      {/* 7. 4-Step Agile Delivery Process ("Quick Delivery, Faster Results") */}
      <ProcessSection onOpenContact={() => openContact()} />

      {/* 7. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 8. 30-Minute Free Consultation & Calendly Schedule */}
      <FreeConsultationSection />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Direct Project Brief & Consultation Form */}
      <ContactSection />
    </main>
  );
}

