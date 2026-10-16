"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { HeroSection } from "@/components/HeroSection";

// Lazy load below-the-fold sections while retaining static HTML prerendering
const VideoShowcaseSection = dynamic(() => import("@/components/VideoShowcaseSection").then(m => ({ default: m.VideoShowcaseSection })));
const StatsBar = dynamic(() => import("@/components/StatsBar").then(m => ({ default: m.StatsBar })));
const RecentWorkSection = dynamic(() => import("@/components/RecentWorkSection").then(m => ({ default: m.RecentWorkSection })));
const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const IndustriesSection = dynamic(() => import("@/components/IndustriesSection").then(m => ({ default: m.IndustriesSection })));
const WhyPiximSection = dynamic(() => import("@/components/WhyPiximSection").then(m => ({ default: m.WhyPiximSection })));
const ReadyForLogoSection = dynamic(() => import("@/components/ReadyForLogoSection").then(m => ({ default: m.ReadyForLogoSection })));
const BrandStoriesSection = dynamic(() => import("@/components/BrandStoriesSection").then(m => ({ default: m.BrandStoriesSection })));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FreeConsultationSection = dynamic(() => import("@/components/FreeConsultationSection").then(m => ({ default: m.FreeConsultationSection })));
const FaqSection = dynamic(() => import("@/components/FaqSection").then(m => ({ default: m.FaqSection })));
const TakeFirstStepSection = dynamic(() => import("@/components/TakeFirstStepSection").then(m => ({ default: m.TakeFirstStepSection })));

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

      {/* 15. Take the First Step (Banner from Reference Image) */}
      <TakeFirstStepSection onOpenContact={(svc, notes) => openContact(svc, notes)} />
    </div>
  );
}

