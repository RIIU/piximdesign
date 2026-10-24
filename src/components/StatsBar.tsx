"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Play, Globe } from "lucide-react";

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
        y: 16,
        opacity: 0,
        stagger: 0.04,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        },
      });

      // Bento cards staggered entrance
      gsap.from(".stats-bento-card", {
        y: 18,
        opacity: 0,
        stagger: 0.05,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".stats-bento-grid",
          start: "top 95%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`relative z-20 w-full py-8 sm:py-12 md:py-14 overflow-hidden select-none ${className}`}
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
        <div className="stats-header text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
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
          <div className="stats-bento-card col-span-1 md:col-span-3 rounded-[20px] sm:rounded-[32px] p-3.5 sm:p-6 bg-gradient-to-b from-[#102766] to-[#0C1E4E] border border-[#2651B9]/45 hover:border-[#FF8500]/50 shadow-[0_15px_35px_rgba(4,10,28,0.5)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[220px] sm:min-h-[350px] hover:scale-[1.02]">
            {/* Top Content - Compact & Clean Font Sizing */}
            <div className="text-center flex flex-col items-center">
              {/* Tag Pill */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/30 text-[9px] sm:text-[10px] font-bold text-[#FFA133] mb-1.5 shadow-xs">
                <span>🔥</span>
                <span>Elite Core</span>
              </div>

              <h3 className="font-agency text-base sm:text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight">
                8<span className="text-[#FF8500]">+</span> Team Members
              </h3>
            </div>

            {/* Bottom Folder & 3 Team Members Emerging on Hover (No text overlap) */}
            <div className="relative w-full flex justify-center items-end mt-4 sm:mt-8 pt-4 sm:pt-6">
              {/* 3 Members tucked inside the folder pocket */}
              <div className="absolute bottom-2 sm:bottom-3 w-[92%] sm:w-[86%] flex justify-center items-end -space-x-2 sm:-space-x-2.5 z-10 pointer-events-none">
                {/* Member 1 (Left): Sarah K. (Lead UI/UX) */}
                <div className="relative w-14 sm:w-19 rounded-xl overflow-hidden bg-[#081330] border border-white/20 group-hover:border-[#FFA229]/70 shadow-2xl transition-all duration-500 ease-out -translate-y-4 sm:-translate-y-6 rotate-[-5deg] group-hover:-translate-y-9 sm:group-hover:-translate-y-13 group-hover:translate-x-2 sm:group-hover:-translate-x-3 group-hover:rotate-[-9deg]">
                  <div className="relative w-full h-12 sm:h-16 bg-[#0c1a40]">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop"
                      alt="Sarah - Lead UI"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#081330]" />
                  </div>
                  <div className="py-0.5 sm:py-1 px-1 bg-[#081330] text-center border-t border-white/10">
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold text-slate-200 block truncate">
                      Sarah K.
                    </span>
                    <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold text-[#FFA133] block truncate">
                      Lead UI
                    </span>
                  </div>
                </div>

                {/* Member 2 (Center): Sabbir Ahmed (Head of Business) - Front & Elevated */}
                <div className="relative w-16 sm:w-22 rounded-xl overflow-hidden bg-[#081330] border border-[#FF8500]/70 group-hover:border-[#FF8500] shadow-[0_0_15px_rgba(255,133,0,0.25)] transition-all duration-500 ease-out -translate-y-5 sm:-translate-y-8 rotate-0 z-10 group-hover:-translate-y-11 sm:group-hover:-translate-y-16 group-hover:scale-105">
                  <div className="relative w-full h-13 sm:h-18 bg-[#0c1a40]">
                    <img
                      src="/images/consultation/director-portrait.png"
                      alt="Sabbir Ahmed - Head of Business"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#081330]" />
                  </div>
                  <div className="py-0.5 sm:py-1 px-1 bg-[#081330] text-center border-t border-[#FF8500]/25">
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold text-white block truncate">
                      Sabbir Ahmed
                    </span>
                    <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold text-[#FF8500] block truncate">
                      Head of Business
                    </span>
                  </div>
                </div>

                {/* Member 3 (Right): Maya T. (Brand Lead) */}
                <div className="relative w-14 sm:w-19 rounded-xl overflow-hidden bg-[#081330] border border-white/20 group-hover:border-[#38BDF8]/70 shadow-2xl transition-all duration-500 ease-out -translate-y-4 sm:-translate-y-6 rotate-[5deg] group-hover:-translate-y-9 sm:group-hover:-translate-y-13 group-hover:translate-x-2 sm:group-hover:translate-x-3 group-hover:rotate-[9deg]">
                  <div className="relative w-full h-12 sm:h-16 bg-[#0c1a40]">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&auto=format&fit=crop"
                      alt="Maya - Brand UX"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#081330]" />
                  </div>
                  <div className="py-0.5 sm:py-1 px-1 bg-[#081330] text-center border-t border-white/10">
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold text-slate-200 block truncate">
                      Maya T.
                    </span>
                    <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold text-[#38BDF8] block truncate">
                      Brand UX
                    </span>
                  </div>
                </div>
              </div>

              {/* Front Frosted Folder Pocket (Cards emerge from behind this) */}
              <div className="relative z-20 w-[94%] sm:w-[90%] h-11 sm:h-15 rounded-xl sm:rounded-2xl bg-[#081330]/85 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between px-3 sm:px-4">
                <span className="text-[10px] sm:text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-pulse" />
                  Studio Core
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#FFA133] bg-[#FF8500]/15 px-2 py-0.5 rounded-full border border-[#FF8500]/25">
                  +5 More
                </span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              CARD 3: 200+ Happy Clients (Iconic Folder Card with Pixim Brand Orange & Centered World Globe)
             ------------------------------------------------------------ */}
          <div
            onClick={onOpenContact}
            className="stats-bento-card col-span-1 md:col-span-4 relative shadow-[0_15px_35px_rgba(4,10,28,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:scale-[1.02] min-h-[220px] sm:min-h-[350px]"
          >
            {/* Top decorative Worldwide Globe Tab - Centered in Middle */}
            <div className="absolute -top-3.5 sm:-top-5 left-1/2 -translate-x-1/2 z-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-2">
              <div className="relative rounded-xl sm:rounded-2xl bg-[#081330] p-1 sm:p-1.5 shadow-xl transition-all duration-500 border border-[#2651B9]/50 group-hover:border-[#FF8500] group-hover:shadow-[0_0_22px_rgba(255,133,0,0.45)]">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#0F245E] via-[#1E40AF] to-[#FF8500] flex items-center justify-center text-white relative overflow-hidden">
                  {/* Expanding radar sonar glow on hover */}
                  <span className="absolute inset-0 bg-white/25 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

                  {/* Animated Rotating World Globe */}
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-1000 ease-out group-hover:rotate-[360deg] relative z-10" />

                  {/* Glowing worldwide client online beacon */}
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </div>
              </div>
            </div>

            {/* Main Folder Shape Body - Iconic Polygon Folder Shape Restored */}
            <div
              className="w-full h-full p-3.5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-gradient-to-br from-[#FF8500] via-[#FFA133] to-[#FF7A00] text-[#081330] flex flex-col justify-between relative z-10 shadow-2xl overflow-hidden transition-all duration-300 group-hover:brightness-105"
              style={{
                clipPath: "polygon(0 0, 36% 0, 44% 14px, 100% 14px, 100% 100%, 0 100%)",
              }}
            >
              {/* Interactive World Wireframe Watermark - Centered */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-60 sm:h-60 opacity-[0.09] group-hover:opacity-[0.16] transition-all duration-700 group-hover:scale-110">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#081330] fill-none" strokeWidth="1.75">
                  <circle cx="50" cy="50" r="44" strokeDasharray="3 3" />
                  <ellipse cx="50" cy="50" rx="44" ry="18" />
                  <ellipse cx="50" cy="50" rx="20" ry="44" />
                  <line x1="6" y1="50" x2="94" y2="50" />
                  <line x1="50" y1="6" x2="50" y2="94" />
                </svg>
              </div>

              {/* Top Section: 200+ Metric + Title + Short Subheading */}
              <div className="relative z-10 pt-1 sm:pt-2">
                {/* 200+ Metric */}
                <div className="font-agency text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#081330] mb-0.5 sm:mb-1">
                  200<span className="text-[#081330]/75 ml-0.5">+</span>
                </div>

                {/* Main Title */}
                <div className="text-xs sm:text-base font-extrabold text-[#081330] leading-tight">
                  Happy Clients Worldwide
                </div>

                {/* Short Subheading requested by user */}
                <p className="mt-2 sm:mt-2.5 text-[11px] sm:text-xs text-[#081330]/80 font-medium leading-relaxed max-w-[260px]">
                  Delivering high-impact brand identities &amp; websites across 18+ countries.
                </p>
              </div>

              {/* Bottom Row: Check em out! + Dark Circle Arrow Button */}
              <div className="mt-4 sm:mt-8 flex items-center justify-between relative z-10 pt-1">
                <span className="text-xs sm:text-sm font-extrabold text-[#081330] tracking-tight group-hover:underline transition-colors">
                  Check em out!
                </span>

                {/* Dark Midnight Circle Arrow CTA Button */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#081330] text-[#FFA133] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-black shadow-xl shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
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
