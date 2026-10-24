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

      gsap.from([".take-first-step-desktop", ".take-first-step-mobile"], {
        y: 18,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      {/* ==============================================================
          1. DESKTOP VIEW: Full-Width Open Horizontal Strip (No Box / Card)
         ============================================================== */}
      <div className="hidden md:flex take-first-step-desktop relative z-10 items-center justify-between gap-8 w-full">
        {/* Left Column: Kicker + Headline (Aligns perfectly with container left margin) */}
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#FFA133] font-mono block mb-1.5">
            READY TO SCALE?
          </span>
          <h2 className="font-agency text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s build something remarkable.
          </h2>
        </div>

        {/* Right Column: Dual Pill Buttons (Aligns perfectly with container right margin) */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Primary Action: Book a Call */}
          <button
            type="button"
            onClick={() =>
              onOpenContact?.(
                "Strategy Call",
                "I want to book a call for our project."
              )
            }
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8500] hover:bg-[#FFA229] text-white font-bold text-sm lg:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-[0_0_24px_rgba(255,133,0,0.45)] hover:shadow-[0_0_34px_rgba(255,133,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
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
            className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-[#081330] font-bold text-sm lg:text-base px-6 sm:px-7 py-3 sm:py-3.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Free Audit</span>
          </button>
        </div>
      </div>

      {/* ==============================================================
          2. MOBILE VIEW: Open Clean Layout without Box (Matching User Mobile Reference)
         ============================================================== */}
      <div className="block md:hidden take-first-step-mobile relative flex flex-col items-center justify-center text-center w-full">
        {/* Subtle ambient radial glow behind text on mobile */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[260px] rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.45) 0%, rgba(255, 133, 0, 0.25) 50%, transparent 75%)",
          }}
        />

        <div className="relative z-10 w-full">
          {/* Headline */}
          <h2 className="font-agency text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-2.5 text-center">
            Take the{" "}
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              First Step
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-sherika text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md mx-auto mb-6 text-center">
            From concept to MVP, from poor marketing strategy to powerful brand exposure – with Pixim, you&apos;re in good hands.
          </p>

          {/* Buttons: Content-hugged, balanced & centered (No stretching) */}
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-full">
            {/* Primary Action: Book a Strategy Call with Circular Arrow Badge */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a strategy call for our project."
                )
              }
              className="group inline-flex items-center justify-center gap-1.5 min-[380px]:gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-black text-[10.5px] min-[380px]:text-xs uppercase tracking-wider px-3 sm:px-5 py-2.5 sm:py-3 shadow-[0_6px_20px_rgba(255,133,0,0.35)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 rounded-full bg-black/25 flex items-center justify-center shrink-0">
                <ArrowRight className="w-2.5 h-2.5 min-[380px]:w-3 min-[380px]:h-3 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
              <span>BOOK A STRATEGY CALL</span>
            </button>

            {/* Secondary Action: Contact Us (Outlined Rectangle) */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "General Inquiry",
                  "I want to get in touch with Pixim Design."
                )
              }
              className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white font-black text-[10.5px] min-[380px]:text-xs uppercase tracking-wider px-3.5 sm:px-5 py-2.5 sm:py-3 shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>CONTACT US</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeFirstStepSection;
