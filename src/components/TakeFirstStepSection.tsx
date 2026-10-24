"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

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
        y: 16,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none"
    >
      {/* ==============================================================
          SLEEK MINIMAL HORIZONTAL CTA STRIP (Matching Image 2 Pattern)
         ============================================================== */}
      <div className="take-first-step-ticket relative rounded-2xl sm:rounded-[26px] overflow-hidden bg-gradient-to-r from-[#081538] via-[#0C1E4E] to-[#07112E] border border-[#2651B9]/35 hover:border-[#FF8500]/50 shadow-[0_20px_50px_rgba(4,10,28,0.65),0_0_35px_rgba(38,81,185,0.18)] transition-all duration-300">
        {/* Subtle background blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient Specular Glow Orbs in Pixim Brand Colors */}
        <div
          className="absolute -top-16 -left-16 w-60 h-60 rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(38, 81, 185, 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-16 right-20 w-60 h-60 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255, 133, 0, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Main Content: Horizontal Flex Strip (Left Text, Right Action Pills) */}
        <div className="relative z-10 px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-8">
          {/* Left Column: Kicker + Headline */}
          <div className="min-w-0">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FFA133] font-mono block mb-1">
              READY TO SCALE?
            </span>
            <h2 className="font-agency text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s build something remarkable.
            </h2>
          </div>

          {/* Right Column: Dual Pill Buttons (Pixim Orange Primary + Clean White Secondary) */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            {/* Primary Action: Book a Call */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a call for our project."
                )
              }
              className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8500] hover:bg-[#FFA229] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_0_22px_rgba(255,133,0,0.45)] hover:shadow-[0_0_32px_rgba(255,133,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary Action: Free Audit */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Free Audit",
                  "I would like a free brand and website audit."
                )
              }
              className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-[#081330] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Free Audit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeFirstStepSection;
