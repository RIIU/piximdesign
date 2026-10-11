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
const ProcessSection = dynamic(() => import("@/components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ProjectEstimatorSection = dynamic(() => import("@/components/ProjectEstimatorSection").then(m => ({ default: m.ProjectEstimatorSection })));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FreeConsultationSection = dynamic(() => import("@/components/FreeConsultationSection").then(m => ({ default: m.FreeConsultationSection })));
const FaqSection = dynamic(() => import("@/components/FaqSection").then(m => ({ default: m.FaqSection })));
const ContactSection = dynamic(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));

export function HomeView() {
  const { openContact } = useContactModal();

  const handleSelectService = (serviceTitle: string) => {
    openContact(serviceTitle, `Interested in getting a scope for ${serviceTitle}`);
  };

  const handleEstimateSubmit = (serviceTitle: string, summary: string) => {
    openContact(serviceTitle, summary);
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

      {/* 8. 4-Step Agile Delivery Process ("Quick Delivery, Faster Results") */}
      <ProcessSection onOpenContact={() => openContact()} />

      {/* 9. Key Metrics & Social Proof (5+ Years, 8+ Team Members, 200+ Happy Clients) */}
      <StatsBar onOpenContact={() => openContact()} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14 md:my-16" />

      {/* 10. More Recent Work Showcase Animated Infinite Carousel */}
      <RecentWorkSection onOpenContact={() => openContact()} />

      {/* 11. Interactive Scope Builder & Transparent Pricing Estimator (USD/BDT) */}
      <ProjectEstimatorSection onEstimateSubmit={handleEstimateSubmit} />

      {/* 12. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 13. 30-Minute Free Consultation & Calendly Schedule */}
      <FreeConsultationSection onOpenContact={() => openContact()} />

      {/* 13. Frequently Asked Questions */}
      <FaqSection />

      {/* 14. Direct Project Brief & Consultation Form */}
      <ContactSection />
    </div>
  );
}

