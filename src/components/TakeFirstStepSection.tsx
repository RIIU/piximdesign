"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface TakeFirstStepSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

export const TakeFirstStepSection: React.FC<TakeFirstStepSectionProps> = ({
  onOpenContact,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".take-first-step-card", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Outer Banner Card: 100% matched to Pixim Design core card style (#0C1E4E, Royal Blue & Brand Orange) */}
      <div className="take-first-step-card relative rounded-2xl sm:rounded-[36px] overflow-hidden bg-[#0C1E4E]/85 backdrop-blur-2xl border border-[#2651B9]/35 hover:border-[#FF8500]/50 py-10 sm:py-20 md:py-24 px-4 sm:px-12 md:px-16 text-center shadow-[0_20px_50px_rgba(4,10,28,0.65),0_0_45px_rgba(38,81,185,0.2)] transition-all duration-300">
        
        {/* Subtle background blueprint grid matching HeroSection */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Specular lighting matching Pixim's signature dual glow */}
        {/* 1. Royal blue ambient top-left glow */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(38, 81, 185, 0.45) 0%, transparent 70%)",
          }}
        />

        {/* 2. Electric amber bottom-right glow */}
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 133, 0, 0.35) 0%, transparent 70%)",
          }}
        />

        {/* -----------------------------------------------------------------
            TECHNICAL WIREFRAME & CROSSHAIR ACCENTS (Sleek Blue & Amber)
           ----------------------------------------------------------------- */}

        {/* Top-Left Crosshair Graphic */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-40 sm:opacity-60">
          <div className="absolute top-8 left-0 w-24 h-[1px] bg-[#3B82F6]/30" />
          <div className="absolute left-8 top-0 h-24 w-[1px] bg-[#3B82F6]/30" />
          <span className="absolute left-[26px] top-[24px] text-[#FFA133] font-mono text-xs select-none">
            +
          </span>
        </div>

        {/* Right Stepped Grid Wireframe Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-44 sm:w-60 pointer-events-none opacity-35 sm:opacity-55 hidden sm:block">
          <div className="absolute right-10 top-8 bottom-8 w-[1px] bg-[#3B82F6]/25" />
          <div className="absolute right-24 top-20 bottom-16 w-[1px] bg-[#3B82F6]/20" />
          <div className="absolute right-0 top-20 w-32 h-[1px] bg-[#3B82F6]/25" />
          <div className="absolute right-0 bottom-24 w-44 h-[1px] bg-[#3B82F6]/20" />

          <span className="absolute right-[35px] top-[74px] text-[#FFA133] font-mono text-xs select-none">
            +
          </span>
          <span className="absolute right-[91px] top-[74px] text-[#FFA133] font-mono text-xs select-none">
            +
          </span>
          <span className="absolute right-[35px] bottom-[91px] text-[#FFA133] font-mono text-xs select-none">
            +
          </span>
        </div>

        {/* -----------------------------------------------------------------
            BANNER CONTENT
           ----------------------------------------------------------------- */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-[#081330]/80 text-[#FFA133] border border-[#FF8500]/30 font-mono mb-4 sm:mb-5 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#FF8500]" />
            <span>START YOUR PROJECT</span>
          </div>

          {/* Main Headline with Pixim signature orange gradient */}
          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.1]">
            Take the{" "}
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              First Step
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-sherika mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            From concept to MVP, from poor marketing strategy to powerful brand exposure – with Pixim Design, you&apos;re in good hands.
          </p>

          {/* Action Buttons: Full width on mobile, inline on desktop */}
          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            {/* Primary Orange Gradient CTA Button */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a strategy call for our project."
                )
              }
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] hover:from-[#e67700] hover:to-[#FF8500] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-4 shadow-[0_8px_30px_rgba(255,133,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,133,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
              <span>Book a Strategy Call</span>
            </button>

            {/* Secondary Glass Pill Button */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Direct Inquiry",
                  "Interested in discussing our project."
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 transition-all hover:border-[#FF8500]/50 hover:text-[#FFA133] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeFirstStepSection;
