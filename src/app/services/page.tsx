"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/data/agencyData";
import { PixxenLottieIcon } from "@/components/PixxenLottieIcon";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import {
  GsapInfiniteLoopedPanels,
  GsapReviewsInfiniteSlider,
  GsapMagneticButton,
} from "@/components/animations";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { openContact } = useContactModal();
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "branding", label: "Branding & Identity" },
    { id: "web", label: "Web & Engineering" },
    { id: "marketing", label: "Marketing & SEO" },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "branding") return s.id === "logo-design" || s.id === "package-design";
    if (activeCategory === "web") return s.id === "web-design" || s.id === "motion-video";
    if (activeCategory === "marketing") return s.id === "social-media" || s.id === "seo-growth";
    return true;
  });

  // GSAP ScrollTrigger staggered entrance for cards
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".pixxen-service-card");
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { dependencies: [activeCategory] }
  );

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background ambient lighting (GPU-native radial gradients) */}
      <div
        className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(38, 81, 185, 0.16) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-48 right-1/4 translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.14) 0%, transparent 70%)",
        }}
      />

      {/* Hero Header - Exactly matching Home Page Services styling */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <h1 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-tight">
          One-Stop Solution For <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Your Brand&apos;s Digital Growth
          </span>
        </h1>

        <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          We provide complete branding, web engineering, packaging, and digital solutions to turn your idea into a successful online brand. Built with 8+ years of expertise.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md shadow-[#FF8500]/25 font-semibold"
                  : "bg-[#0C1E4E]/80 text-slate-300 hover:text-white border border-[#2651B9]/30 hover:border-[#FF8500]/50 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pixxen-Inspired Bento Grid matching Home Page Services Section */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24 relative z-10">
        {filteredServices.map((service) => {
          const isCardHovered = hoveredId === service.id;

          return (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="pixxen-service-card group flex flex-col justify-between p-7 sm:p-8 cursor-pointer text-left"
            >
              {/* Top Row: Prominent Animated Icon & Badge/Number */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  {/* Pixxen-Style Prominent Animated Lottie Icon */}
                  <div className="p-1 rounded-2xl bg-[#081330]/70 border border-[#2651B9]/25 group-hover:border-[#FF8500]/40 group-hover:bg-[#FF8500]/10 transition-all duration-300">
                    <PixxenLottieIcon
                      type={service.id}
                      size={68}
                      isHovered={isCardHovered}
                    />
                  </div>

                  {/* Pill Badge & Number */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#081330]/80 text-slate-300 border border-[#2651B9]/30 font-mono">
                      {service.badge}
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-500 group-hover:text-[#FFA133] transition-colors">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h2 className="font-agency text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors tracking-tight">
                  {service.title}
                </h2>

                {/* Tagline */}
                <p className="mt-2.5 text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.tagline}
                </p>

                {/* Key Deliverables Highlights */}
                {service.features && service.features.length > 0 && (
                  <ul className="mt-5 pt-4 border-t border-[#2651B9]/20 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom Row: Slide-Arrow Action Button */}
              <div className="relative z-10 mt-6 pt-5 border-t border-[#2651B9]/25 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                  Explore Deliverables & Scope
                </span>

                <div className="w-10 h-10 rounded-full bg-[#081330] border border-[#2651B9]/30 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-300 shadow-sm overflow-hidden shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Infinite Review Card Slider */}
      <div className="mt-16 mb-8 relative z-10">
        <GsapReviewsInfiniteSlider
          title="Verified Client Reviews Across Services"
          subtitle="CLIENT VALIDATION"
          speed={38}
        />
      </div>

      {/* GSAP Infinite Looped Showcase Panels */}
      <div className="mb-16 relative z-10">
        <GsapInfiniteLoopedPanels
          title="Cross-Service Impact & Deployments"
          subtitle="REAL-WORLD EXECUTION"
          speed={36}
        />
      </div>

      {/* Bottom Consultation Strip - Rich Brand Blue Container (Black-Free) */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C1E4E] via-[#0D2258] to-[#081330] border border-[#2651B9]/35 backdrop-blur-xl shadow-[0_25px_70px_-15px_rgba(4,10,28,0.85)] text-center overflow-hidden z-10">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #FF8500 0%, transparent 70%)",
          }}
        />
        {/* Ambient Blue Bottom Glow */}
        <div
          className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle at center, #2651B9 0%, transparent 70%)",
          }}
        />

        <h2 className="font-agency relative z-10 text-xl sm:text-2xl font-bold text-white tracking-tight">
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
            className="px-6 py-3 bg-[#081330] hover:bg-[#0A183D] text-white border border-[#2651B9]/40 hover:border-[#FF8500]/50 font-medium text-xs sm:text-sm transition-all shadow-sm"
          >
            <span>View Pricing & Packages →</span>
          </GsapMagneticButton>
        </div>
      </div>
    </main>
  );
}
