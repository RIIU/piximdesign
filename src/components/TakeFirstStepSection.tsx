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
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none"
    >
      {/* ==============================================================
          1. DESKTOP VIEW: Sleek Minimal Horizontal CTA Strip (Matching Reference Image)
         ============================================================== */}
      <div className="hidden md:block take-first-step-desktop relative rounded-2xl lg:rounded-[26px] overflow-hidden bg-gradient-to-r from-[#081538] via-[#0C1E4E] to-[#07112E] border border-[#2651B9]/35 hover:border-[#FF8500]/50 shadow-[0_20px_50px_rgba(4,10,28,0.65),0_0_35px_rgba(38,81,185,0.18)] transition-all duration-300">
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

        {/* Desktop Content: Horizontal Flex Strip (Left Text, Right Action Pills) */}
        <div className="relative z-10 px-8 py-6 lg:px-10 lg:py-7 flex items-center justify-between gap-8">
          {/* Left Column: Kicker + Headline */}
          <div className="min-w-0">
            <span className="text-xs font-black uppercase tracking-widest text-[#FFA133] font-mono block mb-1">
              READY TO SCALE?
            </span>
            <h2 className="font-agency text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s build something remarkable.
            </h2>
          </div>

          {/* Right Column: Dual Pill Buttons (Pixim Orange Primary + Clean White Secondary) */}
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
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8500] hover:bg-[#FFA229] text-white font-bold text-sm px-6 py-3 shadow-[0_0_22px_rgba(255,133,0,0.45)] hover:shadow-[0_0_32px_rgba(255,133,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
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
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-slate-100 text-[#081330] font-bold text-sm px-6 py-3 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Free Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==============================================================
          2. MOBILE VIEW: Open Clean Layout without Box (Matching User Mobile Reference)
         ============================================================== */}
      <div className="block md:hidden take-first-step-mobile relative flex flex-col items-center justify-center text-center">
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

          {/* Buttons (Side by Side in Mobile) */}
          <div className="flex flex-row items-center justify-center gap-2.5 w-full">
            {/* Primary Action: Book a Strategy Call with Circular Arrow Badge */}
            <button
              type="button"
              onClick={() =>
                onOpenContact?.(
                  "Strategy Call",
                  "I want to book a strategy call for our project."
                )
              }
              className="group flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-black text-[10.5px] min-[380px]:text-xs uppercase tracking-wider px-2.5 py-2.5 shadow-[0_6px_20px_rgba(255,133,0,0.35)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 rounded-full bg-black/25 flex items-center justify-center shrink-0">
                <ArrowRight className="w-2.5 h-2.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
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
              className="flex-initial inline-flex items-center justify-center rounded-xl border border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white font-black text-[10.5px] min-[380px]:text-xs uppercase tracking-wider px-3.5 py-2.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
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
