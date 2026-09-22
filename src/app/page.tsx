"use client";

import React from "react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { HeroSection } from "@/components/HeroSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { StatsBar } from "@/components/StatsBar";
import { ServicesSection } from "@/components/ServicesSection";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { BrandStoriesSection } from "@/components/BrandStoriesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";

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

      {/* 5. Ready for a Professional Logo? Video Showcase CTA */}
      <ReadyForLogoSection onOpenContact={(service, note) => openContact(service, note)} />

      {/* 6. Experience Brand Stories in Design (Pixxen-style Sticky Split Showcase) */}
      <BrandStoriesSection onOpenContact={() => openContact()} />

      {/* 6. 4-Step Agile Delivery Process ("Quick Delivery, Faster Results") */}
      <ProcessSection onOpenContact={() => openContact()} />

      {/* 7. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Direct Project Brief & Consultation Form */}
      <ContactSection />
    </main>
  );
}
