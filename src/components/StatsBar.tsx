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
      className={`relative z-20 w-full py-12 sm:py-20 md:py-28 overflow-hidden select-none ${className}`}
    >
      {/* Background ambient lighting - blends seamlessly into global canvas */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1200px] h-[550px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.3) 0%, rgba(255, 133, 0, 0.1) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="stats-header text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8500]/10 border border-[#FF8500]/25 text-[#FF8500] text-xs font-bold uppercase tracking-wider mb-3.5 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>

          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            The Massive <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">Brand Growth</span> <br />
            Is Right Here.
          </h2>

          <p className="font-sherika mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto px-1">
            Our data-driven design framework engineered for top-notch market results and explosive business scale.
          </p>
        </div>

        {/* ==============================================================
            3 BENTO CARDS - 2 COLUMNS ON MOBILE (Card 2 & 3 side-by-side)
           ============================================================== */}
        <div className="stats-bento-grid grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-6 items-stretch">
          {/* ------------------------------------------------------------
              CARD 1: Dark Studio Quote Card with 5+ Years & Video Play Pod
             ------------------------------------------------------------ */}
          <div className="stats-bento-card col-span-2 md:col-span-5 rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 bg-[#0C1E4E]/85 backdrop-blur-xl border border-[#2651B9]/35 hover:border-[#FF8500]/50 shadow-[0_15px_35px_rgba(4,10,28,0.5)] transition-all duration-300 flex flex-col justify-between group min-h-[190px] sm:min-h-[350px]">
            {/* Top Quote */}
            <div>
              <span className="text-[#FF8500] text-2xl sm:text-4xl font-serif leading-none block mb-1 sm:mb-2 opacity-80">&ldquo;</span>
              <p className="text-white text-sm sm:text-lg md:text-xl font-medium leading-snug tracking-tight">
                With senior design sprints, our brand launched faster and scaled revenue seamlessly.
              </p>
            </div>

            {/* Bottom Floating Horizontal Pill Box */}
            <div className="mt-4 sm:mt-8 relative rounded-xl sm:rounded-2xl bg-[#081330]/90 border border-[#2651B9]/30 p-2.5 sm:p-5 flex items-center justify-between overflow-hidden shadow-inner">
              {/* Subtle ambient blur glow inside pill */}
              <div className="absolute right-12 w-28 h-28 rounded-full bg-[#FF8500]/15 blur-2xl pointer-events-none" />

              <div>
                <div className="font-agency text-2xl sm:text-4xl font-extrabold text-white">
                  5<span className="text-[#FF8500] ml-0.5">+</span>
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5">
                  Years of Services
                </div>
              </div>

              {/* Play Button Box */}
              <div className="relative z-10 w-10 sm:w-16 h-8 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] hover:from-[#FFA133] hover:to-[#FF8500] flex items-center justify-center text-white group-hover:scale-105 transition-transform cursor-pointer shadow-md shadow-[#FF8500]/25">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              CARD 2: 8+ Team Members (Royal Sapphire Studio Core Card - Col 1 on Mobile)
             ------------------------------------------------------------ */}
          <div className="stats-bento-card col-span-1 md:col-span-3 rounded-[20px] sm:rounded-[32px] p-3.5 sm:p-7 bg-gradient-to-b from-[#102766] to-[#0C1E4E] border border-[#2651B9]/45 hover:border-[#FF8500]/50 shadow-[0_15px_35px_rgba(4,10,28,0.5)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[220px] sm:min-h-[350px] hover:scale-[1.02]">
            {/* Top Content */}
            <div className="text-center flex flex-col items-center">
              {/* Discount / Tag Pill */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/30 text-[9px] sm:text-[11px] font-bold text-[#FFA133] mb-2 sm:mb-3 shadow-xs">
                <span>🔥</span>
                <span>Elite Core</span>
              </div>

              <h3 className="font-agency text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                8<span className="text-[#FF8500]">+</span> Team <br />
                Members
              </h3>
            </div>

            {/* Bottom Folder & Stack Graphics Graphic */}
            <div className="relative w-full flex justify-center items-end mt-4 sm:mt-6 pt-2">
              {/* Stacked Cards behind the folder */}
              <div className="absolute -top-5 sm:-top-7 w-[90%] sm:w-[85%] flex justify-center -space-x-2 sm:-space-x-3 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="w-11 h-14 sm:w-16 sm:h-20 rounded-md sm:rounded-lg bg-slate-100 shadow-md rotate-[-8deg] border border-white/20 flex flex-col p-1 opacity-90">
                  <div className="w-full h-6 sm:h-10 bg-slate-200 rounded mb-1" />
                  <div className="w-3/4 h-1 bg-slate-300 rounded mb-1" />
                  <div className="w-1/2 h-1 bg-slate-300 rounded" />
                </div>
                <div className="w-13 h-16 sm:w-18 sm:h-22 rounded-md sm:rounded-lg bg-[#081330] shadow-xl z-10 border border-[#FF8500]/40 flex items-center justify-center text-[#FF8500]">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#FF8500]" />
                </div>
                <div className="w-11 h-14 sm:w-16 sm:h-20 rounded-md sm:rounded-lg bg-gradient-to-br from-[#2651B9] to-[#3B82F6] shadow-md rotate-[8deg] opacity-90 border border-white/20" />
              </div>

              {/* Front Frosted Folder Pocket */}
              <div className="relative z-20 w-[95%] h-14 sm:h-24 rounded-xl sm:rounded-2xl bg-[#081330]/50 backdrop-blur-md border border-[#2651B9]/35 shadow-lg flex items-center justify-center" />
            </div>
          </div>

          {/* ------------------------------------------------------------
              CARD 3: 200+ Happy Clients (Vibrant Pixim Electric Orange Folder Card - Col 2 on Mobile)
             ------------------------------------------------------------ */}
          <div
            onClick={onOpenContact}
            className="stats-bento-card col-span-1 md:col-span-4 relative shadow-[0_15px_35px_rgba(4,10,28,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] min-h-[220px] sm:min-h-[350px]"
          >
            {/* Top decorative stacked photo sticking out */}
            <div className="absolute -top-2.5 sm:-top-3.5 right-3 sm:right-10 z-0 flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#081330] p-0.5 shadow-md rotate-3 border border-white/20">
                <div className="w-full h-full rounded-md sm:rounded-lg bg-gradient-to-tr from-[#2651B9] to-[#3B82F6] flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
                  ★
                </div>
              </div>
            </div>

            {/* Main Folder Shape Body */}
            <div
              className="w-full h-full p-3.5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-gradient-to-br from-[#FF8500] via-[#FF921A] to-[#FFA133] text-[#081330] flex flex-col justify-between relative z-10 shadow-2xl"
              style={{
                clipPath: "polygon(0 0, 36% 0, 44% 14px, 100% 14px, 100% 100%, 0 100%)",
              }}
            >
              <div>
                {/* 200+ Metric */}
                <div className="font-agency text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#081330] mb-0.5 sm:mb-1 pt-2 sm:pt-2">
                  200<span className="text-[#081330]/70">+</span>
                </div>

                <div className="text-xs sm:text-base font-extrabold text-[#081330]/90 leading-tight">
                  Happy Clients Worldwide
                </div>
              </div>

              {/* Bottom Row: Check em out! + Dark Circle Arrow Button */}
              <div className="mt-4 sm:mt-12 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-[#081330] tracking-tight group-hover:underline">
                  Check em out!
                </span>

                {/* Dark Midnight Circle Arrow CTA Button */}
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#081330] text-[#FFA133] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-black shadow-xl shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
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
