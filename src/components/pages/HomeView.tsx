"use client";

import React from "react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { HeroSection } from "@/components/HeroSection";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { StatsBar } from "@/components/StatsBar";
import { RecentWorkSection } from "@/components/RecentWorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { WhyPiximSection } from "@/components/WhyPiximSection";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { BrandStoriesSection } from "@/components/BrandStoriesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FreeConsultationSection } from "@/components/FreeConsultationSection";
import { FaqSection } from "@/components/FaqSection";

export function HomeView() {
  const { openContact } = useContactModal();

  const handleSelectService = (serviceTitle: string) => {
    openContact(serviceTitle, `Interested in getting a scope for ${serviceTitle}`);
  };

  return (
    <div className="w-full overflow-x-clip">
      {/* 1. Flagship Hero Section */}
      <HeroSection onOpenContact={() => openContact()} />

      {/* 2. Video Showcase Reel & Brand Logo Carousel (GSAP Scroll-expanding video) */}
      <VideoShowcaseSection onOpenContact={() => openContact()} />

      {/* 3. Core Capabilities & Services Bento Grid */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 4. Industry Playbooks: tailored service stacks per market */}
      <IndustriesSection onOpenContact={(service, note) => openContact(service, note)} />

      {/* 5. The Pixim Difference: 3-Way Comparison Matrix vs Traditional Agencies & Freelancers */}
      <WhyPiximSection onOpenContact={(service, notes) => openContact(service, notes)} />

      {/* 6. Experience Brand Stories in Design (Pixxen-style Sticky Split Showcase) */}
      <BrandStoriesSection onOpenContact={() => openContact()} />

      {/* 7. Ready for a Professional Logo? Video Showcase CTA */}
      <ReadyForLogoSection onOpenContact={(service, note) => openContact(service, note)} />

      {/* 8. Key Metrics & Social Proof (5+ Years, 8+ Team Members, 200+ Happy Clients) */}
      <StatsBar onOpenContact={() => openContact()} />

      {/* 10. More Recent Work Showcase Animated Infinite Carousel */}
      <RecentWorkSection onOpenContact={() => openContact()} />

      {/* 11. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 13. 30-Minute Free Consultation & Calendly Schedule */}
      <FreeConsultationSection onOpenContact={() => openContact()} />

      {/* 14. Frequently Asked Questions (FaqSplit 2-Column Style) */}
      <FaqSection onOpenContact={(svc, notes) => openContact(svc, notes)} />
    </div>
  );
}

