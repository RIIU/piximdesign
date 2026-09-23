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
    { id: "all", label: "All Capabilities" },
    { id: "branding", label: "Branding & Identity" },
    { id: "web", label: "Web & Engineering" },
    { id: "marketing", label: "Marketing & SEO" },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeTab === "all") return true;
    if (activeTab === "branding") return s.id === "logo-design" || s.id === "package-design";
    if (activeTab === "web") return s.id === "web-design" || s.id === "motion-video";
    if (activeTab === "marketing") return s.id === "social-media" || s.id === "seo-growth";
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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
      <div className="text-center max-w-3xl mx-auto mb-14">
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

      {/* Pixxen-Inspired Bento Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredServices.map((service) => {
          const isCardHovered = hoveredId === service.id;

          return (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="pixxen-service-card group flex flex-col justify-between p-7 sm:p-8 cursor-pointer"
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
                <h3 className="font-agency text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors tracking-tight">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="mt-2.5 text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.tagline}
                </p>
              </div>

              {/* Bottom Row: Pixxen-Style Slide-Arrow Action Button */}
              <div className="relative z-10 mt-8 pt-5 border-t border-[#2651B9]/25 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                  Read More
                </span>

                <div className="w-10 h-10 rounded-full bg-[#081330] border border-[#2651B9]/30 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-300 shadow-sm overflow-hidden shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
