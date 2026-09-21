"use client";

import React from "react";
import { ServicesSection } from "@/components/ServicesSection";
import { useContactModal } from "@/components/AppLayoutWrapper";
import {
  GsapInfiniteLoopedPanels,
  GsapReviewsInfiniteSlider,
  GsapMagneticButton,
} from "@/components/animations";

export default function ServicesPage() {
  const { openContact } = useContactModal();

  const handleSelectService = (serviceTitle: string) => {
    openContact(serviceTitle, `Interested in getting a scope for ${serviceTitle}`);
  };

  return (
    <main className="min-h-screen">
      {/* 1. Core Capabilities & Services Bento Grid (Exactly matching Homepage) */}
      <ServicesSection
        onSelectService={handleSelectService}
        className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        titleAs="h1"
      />

      {/* 2. Infinite Review Card Slider */}
      <div className="mt-4 mb-8 relative z-10">
        <GsapReviewsInfiniteSlider
          title="Verified Client Reviews Across Services"
          speed={38}
        />
      </div>

      {/* 3. GSAP Infinite Looped Showcase Panels */}
      <div className="mb-16 relative z-10">
        <GsapInfiniteLoopedPanels
          title="Cross-Service Impact & Deployments"
          speed={36}
        />
      </div>

      {/* 4. Bottom Consultation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#111827]/80 border border-white/10 backdrop-blur-xl shadow-2xl text-center overflow-hidden">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle at center, #FF8500 0%, transparent 70%)",
            }}
          />

          <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Not sure which service fits your current project stage?
          </h2>
          <p className="relative z-10 mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Talk directly with our lead specialist. We will assess your brand and recommend the exact deliverables that yield maximum return.
          </p>

          <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-4">
            <GsapMagneticButton
              onClick={() => openContact()}
              variant="primary"
              strength={0.3}
              className="px-7 py-3 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF8500]/25"
            >
              <span>Get a Free 30-Min Consultation</span>
            </GsapMagneticButton>
            <GsapMagneticButton
              href="/pricing"
              variant="secondary"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-medium text-xs sm:text-sm transition-colors"
            >
              <span>View Pricing & Packages →</span>
            </GsapMagneticButton>
          </div>
        </div>
      </div>
    </main>
  );
}
