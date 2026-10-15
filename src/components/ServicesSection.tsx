"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/data/agencyData";
import { ArrowRight } from "lucide-react";
import { PixxenLottieIcon } from "./PixxenLottieIcon";

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All 7 Capabilities" },
    { id: "branding", label: "Branding & Packaging" },
    { id: "digital", label: "Social & Digital Marketing" },
    { id: "web-video", label: "Web, Video & SEO" },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeTab === "all") return true;
    if (activeTab === "branding") return s.id === "logo-design" || s.id === "package-design";
    if (activeTab === "digital") return s.id === "social-media" || s.id === "digital-marketing";
    if (activeTab === "web-video") return s.id === "web-design" || s.id === "motion-video" || s.id === "seo-growth";
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
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { dependencies: [activeTab] }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient lighting (GPU-native radial gradient) */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(38, 81, 185, 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
          One-Stop Solution For <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Your Brand&apos;s Digital Growth
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          We provide complete branding and digital solutions to turn your idea into a successful online brand. Built with 8+ years of expertise.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md shadow-[#FF8500]/25 font-semibold"
                  : "bg-[#0C1E4E]/80 text-slate-300 hover:text-white border border-[#2651B9]/30 hover:border-[#FF8500]/50 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pixxen-Inspired Bento Grid - 2 columns on mobile to keep vertical height compact */}
      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
        {filteredServices.map((service) => {
          const isCardHovered = hoveredId === service.id;

          return (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              prefetch={true}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="pixxen-service-card group flex flex-col justify-between p-3.5 sm:p-7 md:p-8 cursor-pointer rounded-2xl sm:rounded-[28px]"
            >
              {/* Top Row: Prominent Animated Icon & Badge/Number */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-6">
                  {/* Pixxen-Style Prominent Animated Lottie Icon */}
                  <div className="p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#081330]/70 border border-[#2651B9]/25 group-hover:border-[#FF8500]/40 group-hover:bg-[#FF8500]/10 transition-all duration-300">
                    <PixxenLottieIcon
                      type={service.id}
                      className="w-9 h-9 sm:w-16 sm:h-16"
                      isHovered={isCardHovered}
                    />
                  </div>

                  {/* Pill Badge & Number */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="hidden xs:inline-block text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#081330]/80 text-slate-300 border border-[#2651B9]/30 font-mono">
                      {service.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-slate-500 group-hover:text-[#FFA133] transition-colors">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-agency text-sm sm:text-lg md:text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors tracking-tight line-clamp-2">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 sm:mt-2.5 text-[11px] sm:text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors line-clamp-2 sm:line-clamp-none">
                  {service.tagline}
                </p>

                {/* Sub-services / Core Features from specification */}
                <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#2651B9]/15 hidden sm:flex flex-wrap gap-1.5">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 group-hover:border-[#FF8500]/25 transition-colors"
                    >
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Pixxen-Style Slide-Arrow Action Button */}
              <div className="relative z-10 mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-[#2651B9]/25 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                  Read More
                </span>

                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#081330] border border-[#2651B9]/30 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-300 shadow-sm overflow-hidden shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
