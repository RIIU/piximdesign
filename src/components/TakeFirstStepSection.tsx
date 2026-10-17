"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Zap, Shield, Users } from "lucide-react";

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

      gsap.from(".take-first-step-ticket", {
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
      className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none"
    >
      {/* ==============================================================
          MINIMAL CREATIVE LAUNCH PASS / PROJECT TICKET
         ============================================================== */}
      <div className="take-first-step-ticket relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#081538] via-[#0C1E4E] to-[#07112E] border border-[#2651B9]/35 hover:border-[#FF8500]/50 shadow-[0_25px_60px_rgba(4,10,28,0.7),0_0_40px_rgba(38,81,185,0.2)] transition-all duration-300">
        {/* Subtle background blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient Specular Glow Orbs */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-35 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(38, 81, 185, 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 133, 0, 0.35) 0%, transparent 70%)",
          }}
        />

        {/* Main Boarding Pass Flex Container */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
          {/* ------------------------------------------------------------
              LEFT BODY (Clean Minimal Headline & Core Value - 68%)
             ------------------------------------------------------------ */}
          <div className="flex-1 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
            {/* Headline */}
            <div>
              <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4">
                Take the{" "}
                <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
                  First Step
                </span>
              </h2>

              <p className="font-sherika text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-lg mb-6">
                From concept to scale – senior design sprints engineered for explosive market results.
              </p>
            </div>

            {/* Minimal Inline Highlights (No bulky boxes) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-[#FFA133]" />
                &lt; 24h Kickoff
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                100% NDA &amp; IP
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-[#FF8500]" />
                Direct Senior Leads
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------
              PERFORATED DIVIDER WITH NOTCHES (Desktop Vertical)
             ------------------------------------------------------------ */}
          <div className="hidden lg:flex flex-col items-center justify-between relative w-[1px] bg-transparent">
            {/* Top Cutout Notch */}
            <div className="w-7 h-7 rounded-full bg-[#081330] -top-3.5 absolute -translate-x-1/2 border-b border-[#2651B9]/40 z-20 shadow-inner" />

            {/* Dashed Tear-off Line */}
            <div className="h-full w-[1.5px] border-r-2 border-dashed border-white/20" />

            {/* Bottom Cutout Notch */}
            <div className="w-7 h-7 rounded-full bg-[#081330] -bottom-3.5 absolute -translate-x-1/2 border-t border-[#2651B9]/40 z-20 shadow-inner" />
          </div>

          {/* ------------------------------------------------------------
              PERFORATED DIVIDER WITH NOTCHES (Mobile Horizontal)
             ------------------------------------------------------------ */}
          <div className="lg:hidden flex items-center justify-between relative w-full h-[1px]">
            {/* Left Cutout Notch */}
            <div className="w-8 h-8 rounded-full bg-[#081330] -left-4 absolute -translate-y-1/2 border-r border-[#2651B9]/40 z-20 shadow-inner" />

            {/* Dashed Tear-off Line */}
            <div className="w-full h-[1.5px] border-b-2 border-dashed border-white/20" />

            {/* Right Cutout Notch */}
            <div className="w-8 h-8 rounded-full bg-[#081330] -right-4 absolute -translate-y-1/2 border-l border-[#2651B9]/40 z-20 shadow-inner" />
          </div>

          {/* ------------------------------------------------------------
              RIGHT STUB (Minimal Barcode & Action Button - 32%)
             ------------------------------------------------------------ */}
          <div className="lg:w-80 xl:w-88 p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center bg-[#050D24]/80 lg:bg-[#06102A]/60 relative z-10">
            {/* Barcode Graphic */}
            <div className="flex items-center justify-center gap-[2.5px] h-9 w-full max-w-[200px] opacity-80 px-3 py-1.5 bg-white/[0.04] rounded-lg border border-white/10 mb-2">
              <div className="w-[2px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[3px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[4px] h-6 bg-white" />
              <div className="w-[1.5px] h-6 bg-white" />
              <div className="w-[2px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[3.5px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[2px] h-6 bg-white" />
              <div className="w-[4px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[2.5px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[3px] h-6 bg-white" />
              <div className="w-[1.5px] h-6 bg-white" />
              <div className="w-[2px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[4px] h-6 bg-white" />
              <div className="w-[2px] h-6 bg-white" />
              <div className="w-[1px] h-6 bg-white" />
              <div className="w-[3px] h-6 bg-white" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 mb-6 block">
              PX-2026-VIP
            </span>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a strategy call for our project."
                )
              }
              className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-4 shadow-[0_8px_25px_rgba(255,133,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,133,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeFirstStepSection;
