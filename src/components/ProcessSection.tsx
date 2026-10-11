"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { PROCESS_STEPS } from "@/data/agencyData";

interface ProcessSectionProps {
  onOpenContact?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Modern minimal glyph icons for each process step
  const stepGlyphs = [
    // 01 Discovery
    <svg key="1" width="44" height="44" viewBox="0 0 44 44" fill="none" className="transition-transform duration-300 group-hover:scale-110">
      <circle cx="20" cy="20" r="11" stroke="#FF8500" strokeWidth="2.5" />
      <line x1="28" y1="28" x2="38" y2="38" stroke="#FF8500" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" fill="#38BDF8" />
    </svg>,

    // 02 Define
    <svg key="2" width="44" height="44" viewBox="0 0 44 44" fill="none" className="transition-transform duration-300 group-hover:scale-110">
      <rect x="8" y="8" width="28" height="28" rx="6" stroke="#FFA229" strokeWidth="2.5" />
      <path d="M16 22L20 26L28 16" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="8" r="3" fill="#FF8500" />
    </svg>,

    // 03 UI Design & Testing
    <svg key="3" width="44" height="44" viewBox="0 0 44 44" fill="none" className="transition-transform duration-300 group-hover:scale-110">
      <rect x="7" y="10" width="30" height="24" rx="4" stroke="#FF8500" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="13" cy="16" r="2" fill="#FFA229" />
      <path d="M22 18L30 32L25 30L22 34L22 18Z" fill="#38BDF8" />
    </svg>,

    // 04 Delivery & Support
    <svg key="4" width="44" height="44" viewBox="0 0 44 44" fill="none" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M22 6L28 16L38 18L30 26L32 36L22 30L12 36L14 26L6 18L16 16L22 6Z" fill="#0C1E4E" stroke="#FF8500" strokeWidth="2" />
      <circle cx="22" cy="22" r="4" fill="#34D399" />
    </svg>,
  ];

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      // Header entrance
      gsap.from(".pipeline-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      // Pipeline connector beam drawing
      gsap.fromTo(
        ".pipeline-active-beam",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".pipeline-nodes-row",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // Staggered node entrance
      gsap.from(".pipeline-node-col", {
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".pipeline-nodes-row",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 md:py-32 bg-[#081330] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.3) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pipeline-header text-center max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8500]/10 border border-[#FF8500]/25 text-[#FF8500] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Velocity Sprint Pipeline</span>
          </div>

          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            Quick Delivery, Faster Results
          </h2>

          <p className="font-sherika mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            Our agile design process always prioritizes timely delivery because there&apos;s a lot at stake until your product hits the market.
          </p>
        </div>

        {/* ==============================================================
            INNOVATIVE LINEAR SPRINT PIPELINE (No Wave, No Cards/Boxes)
            Laser Connector Beam + Circular Stepper Nodes + Open Typography
           ============================================================== */}
        <div className="relative w-full">
          {/* 1. Desktop Horizontal Connector Track */}
          <div className="hidden lg:block absolute top-[48px] left-[8%] right-[8%] h-[3px] pointer-events-none z-0">
            {/* Background dashed rail */}
            <div className="w-full h-full bg-white/10 rounded-full" />
            {/* Active glowing laser beam linked to scroll */}
            <div className="pipeline-active-beam absolute inset-0 bg-gradient-to-r from-[#FF8500] via-[#38BDF8] to-[#34D399] rounded-full shadow-[0_0_15px_rgba(255,133,0,0.7)]" />
          </div>

          {/* 2. 4 Process Step Columns */}
          <div className="pipeline-nodes-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="pipeline-node-col group flex flex-col items-center text-center cursor-pointer transition-transform duration-300"
                >
                  {/* Top Stepper Orb (Sits cleanly on the rail, no overlapping) */}
                  <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
                    {/* Glowing pulse ring on active/hover */}
                    <div
                      className={`absolute -inset-3 rounded-full border border-[#FF8500]/50 transition-all duration-300 pointer-events-none ${
                        isSelected ? "scale-125 opacity-100" : "scale-100 opacity-0 group-hover:opacity-60"
                      }`}
                    />

                    {/* Step Number Tag Floating on Top */}
                    <span className="absolute -top-3 px-2 py-0.5 rounded-full bg-[#FF8500] text-[#081330] font-mono text-[10px] font-extrabold shadow-md z-20">
                      STEP {step.step}
                    </span>

                    {/* Circular Stepper Orb */}
                    <div
                      className={`w-24 h-24 rounded-full bg-[#0C1E4E] border-2 transition-all duration-300 flex items-center justify-center shadow-xl ${
                        isSelected
                          ? "border-[#FF8500] shadow-[0_0_30px_rgba(255,133,0,0.5)] scale-105"
                          : "border-white/20 group-hover:border-[#FF8500]/60"
                      }`}
                    >
                      {stepGlyphs[idx]}
                    </div>
                  </div>

                  {/* Text Content - Completely Open, No Box Boundaries */}
                  <div className="max-w-[240px] flex flex-col items-center">
                    {/* Timeframe pill */}
                    <span className="text-[11px] font-mono font-bold text-[#FFA133] uppercase tracking-wider mb-1.5">
                      {step.timeframe}
                    </span>

                    {/* Title */}
                    <h3 className="font-agency text-white text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#FFA229] transition-colors">
                      {step.title}
                    </h3>

                    {/* Clean Descriptive Context */}
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Clean Pill CTA */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF8500] hover:bg-[#FFA229] text-[#081330] font-agency font-bold text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,133,0,0.35)] active:scale-95 cursor-pointer"
          >
            <span>Start Your 14-Day Sprint</span>
            <span className="w-6 h-6 rounded-full bg-[#081330]/90 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-[#FF8500]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
