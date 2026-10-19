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
      className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none"
    >
      {/* ==============================================================
          CLEAN MINIMAL CREATIVE LAUNCH PASS
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

        {/* Main Clean Minimal Banner Body - Center Aligned */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center">
          {/* Headline */}
          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4 text-center">
            Take the{" "}
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              First Step
            </span>
          </h2>

          <p className="font-sherika text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto mb-6 sm:mb-8 text-center">
            From concept to scale – senior design sprints engineered for explosive market results.
          </p>

          {/* CTA Button placed below the text - Centered */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a strategy call for our project."
                )
              }
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-7 sm:px-9 shadow-[0_8px_25px_rgba(255,133,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,133,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
