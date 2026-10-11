"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

interface StatsBarProps {
  className?: string;
  onOpenContact?: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({ className = "", onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      // Section header entrance
      gsap.from(".stats-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Bento cards staggered entrance
      gsap.from(".stats-bento-card", {
        y: 35,
        opacity: 0,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".stats-bento-grid",
          start: "top 82%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`relative z-20 w-full py-16 sm:py-20 md:py-28 bg-[#081330] overflow-hidden select-none ${className}`}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.35) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="stats-header text-center max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            The Massive Brand Growth <br />
            Is Right Here.
          </h2>

          <p className="font-sherika mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            Our data-driven design framework engineered for top-notch market results and explosive business scale.
          </p>
        </div>

        {/* ==============================================================
            3 CARDS - 1:1 EXACT DESIGN STYLE TO UPLOADED IMAGE
           ============================================================== */}
        <div className="stats-bento-grid grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* ------------------------------------------------------------
              CARD 1: Dark Quote Card with 5+ Years & Video Play Pod
             ------------------------------------------------------------ */}
          <div className="stats-bento-card md:col-span-5 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-[#0e1422] border border-white/10 hover:border-white/20 shadow-2xl transition-all duration-300 flex flex-col justify-between group min-h-[340px]">
            {/* Top Quote */}
            <p className="text-white text-base sm:text-lg md:text-xl font-medium leading-snug tracking-tight">
              &ldquo;With senior design sprints, our brand launched faster and scaled revenue seamlessly.&rdquo;
            </p>

            {/* Bottom Floating Horizontal Pill Box (1:1 from Image) */}
            <div className="mt-8 relative rounded-2xl bg-[#141b2c] border border-white/10 p-4 sm:p-5 flex items-center justify-between overflow-hidden">
              {/* Subtle ambient blur glow inside pill */}
              <div className="absolute right-12 w-24 h-24 rounded-full bg-[#d8f944]/15 blur-2xl pointer-events-none" />

              <div>
                <div className="font-agency text-3xl sm:text-4xl font-extrabold text-white">
                  5<span className="text-[#FF8500] ml-0.5">+</span>
                </div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">
                  Years of Services
                </div>
              </div>

              {/* Play Button Box */}
              <div className="relative z-10 w-14 sm:w-16 h-10 sm:h-11 rounded-xl bg-[#080d1a] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform cursor-pointer">
                <Play className="w-4 h-4 fill-white" />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              CARD 2: 8+ Team Members (Vibrant Lime/Neon Pack Card)
             ------------------------------------------------------------ */}
          <div className="stats-bento-card md:col-span-3 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 bg-[#d8f944] text-[#0c1402] shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[340px] hover:scale-[1.02]">
            {/* Top Content */}
            <div className="text-center flex flex-col items-center">
              {/* Discount / Tag Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 shadow-xs text-[11px] font-bold text-[#0c1402] mb-3">
                <span>🔥</span>
                <span>Elite Studio Core</span>
              </div>

              <h3 className="font-agency text-2xl sm:text-3xl font-black text-[#0c1402] leading-tight">
                8+ Team <br />
                Members
              </h3>
            </div>

            {/* Bottom Folder & Stack Graphics Graphic (1:1 from reference image) */}
            <div className="relative w-full flex justify-center items-end mt-4 pt-2">
              {/* Stacked Cards behind the folder */}
              <div className="absolute -top-6 w-[85%] flex justify-center -space-x-3 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-20 rounded-lg bg-white shadow-md rotate-[-8deg] border border-black/10 flex flex-col p-1.5 opacity-90">
                  <div className="w-full h-10 bg-slate-100 rounded mb-1" />
                  <div className="w-3/4 h-1.5 bg-slate-300 rounded mb-1" />
                  <div className="w-1/2 h-1.5 bg-slate-200 rounded" />
                </div>
                <div className="w-18 h-22 rounded-lg bg-[#0e1422] shadow-lg z-10 border border-white/20 flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6 text-[#d8f944]" />
                </div>
                <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-md rotate-[8deg] opacity-90" />
              </div>

              {/* Front Frosted Folder Tab */}
              <div className="relative z-20 w-[95%] h-24 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center" />
            </div>
          </div>

          {/* ------------------------------------------------------------
              CARD 3: 200+ Happy Clients (Pale Lime Tabbed Folder Card)
             ------------------------------------------------------------ */}
          <div
            onClick={onOpenContact}
            className="stats-bento-card md:col-span-4 relative shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] min-h-[340px]"
          >
            {/* Top decorative stacked photo sticking out (1:1 from reference image) */}
            <div className="absolute -top-3.5 right-10 z-0 flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white p-0.5 shadow-md rotate-3 border border-black/10">
                <div className="w-full h-full rounded-lg bg-gradient-to-tr from-[#FF8500] to-[#FFA229] flex items-center justify-center text-white font-bold text-xs">
                  ★
                </div>
              </div>
            </div>

            {/* Main Folder Shape Body */}
            <div
              className="w-full h-full p-7 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#e8fa91] text-[#0c1402] flex flex-col justify-between relative z-10"
              style={{
                clipPath: "polygon(0 0, 36% 0, 44% 14px, 100% 14px, 100% 100%, 0 100%)",
              }}
            >
              <div>
                {/* 200+ Metric */}
                <div className="font-agency text-5xl sm:text-6xl font-black tracking-tight text-[#0c1402] mb-1 pt-2">
                  200<span className="text-black/60">+</span>
                </div>

                <div className="text-sm sm:text-base font-bold text-[#0c1402]/85">
                  Happy Clients Worldwide
                </div>
              </div>

              {/* Bottom Row: Check em out! + Black Round Arrow Button */}
              <div className="mt-12 flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#0c1402] tracking-tight group-hover:underline">
                  Check em out!
                </span>

                {/* Black Circle Arrow CTA Button */}
                <div className="w-12 h-12 rounded-full bg-[#0c1402] text-[#e8fa91] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
