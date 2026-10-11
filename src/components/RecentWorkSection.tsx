"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, ArrowUpRight } from "lucide-react";

interface RecentWorkProps {
  onOpenContact?: () => void;
}

const RECENT_PROJECTS = [
  {
    id: "clickup",
    brand: "ClickUp 4.0",
    clientLabel: "ClickUp",
    subtext: "Experience Convergence today",
    bgGradient: "from-[#ffedd5] via-[#fbcfe8] to-[#bae6fd]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7b68ee] to-[#ff007f] flex items-center justify-center text-white text-xs font-black shadow-sm">
          ▲
        </span>
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">ClickUp <span className="text-xs font-mono font-bold text-slate-500">4.0</span></span>
      </div>
    ),
  },
  {
    id: "salesgraph",
    brand: "Salesgraph",
    clientLabel: "Salesgraph",
    subtext: "AI Pipeline Intelligence",
    bgGradient: "from-[#f4f4f0] via-[#e5e5dc] to-[#dcdccf]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-[#1c241e] flex items-center justify-center text-[#a8f387] shadow-sm">
          <span className="font-mono font-black text-xs">SG</span>
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-agency">Salesgraph</span>
      </div>
    ),
  },
  {
    id: "atria",
    brand: "Atria",
    clientLabel: "Atria",
    subtext: "Next-Gen SaaS Platform",
    bgGradient: "from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-agency">Atria</span>
        <span className="w-5 h-5 rounded-full bg-[#f43f5e] flex items-center justify-center text-white text-[10px]">✦</span>
      </div>
    ),
  },
  {
    id: "brainmax",
    brand: "BrainMax",
    clientLabel: "BrainMax",
    subtext: "Cognitive Wellness Engine",
    bgGradient: "from-[#eff6ff] via-[#e0e7ff] to-[#f3e8ff]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#a855f7] to-[#ec4899]" />
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-agency">Brain<span className="text-xs px-1.5 py-0.5 ml-1 rounded bg-black text-white font-mono">MAX</span></span>
      </div>
    ),
  },
  {
    id: "movexa",
    brand: "Movexa Mobility",
    clientLabel: "Movexa",
    subtext: "Autonomous Fleet Intelligence",
    bgGradient: "from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">MX</span>
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-agency">Movexa</span>
      </div>
    ),
  },
  {
    id: "tripshop",
    brand: "TripShop Global",
    clientLabel: "TripShop",
    subtext: "Smart Travel Booking Engine",
    bgGradient: "from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]",
    logoBadge: (
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-agency text-sky-900">Trip<span className="text-[#FF8500]">Shop</span></span>
      </div>
    ),
  },
];

export const RecentWorkSection: React.FC<RecentWorkProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple duplicated list for 100% seamless marquee infinite carousel loop
  const duplicatedProjects = [
    ...RECENT_PROJECTS,
    ...RECENT_PROJECTS,
    ...RECENT_PROJECTS,
  ];

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".recent-work-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-18 sm:py-22 md:py-28 bg-[#081330] overflow-hidden select-none"
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
        <div className="recent-work-header text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            More Recent Work.
          </h2>

          <p className="font-sherika mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            Built for 50+ YC Companies. Most ship in under 2 weeks.
          </p>

          {/* Trusted by avatars badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
            <span className="text-[11px] font-medium text-slate-400">Trusted by</span>
            <div className="flex -space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">C</span>
              <span className="w-5 h-5 rounded-full bg-[#FF8500] border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">P</span>
              <span className="w-5 h-5 rounded-full bg-emerald-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">✦</span>
              <span className="w-5 h-5 rounded-full bg-fuchsia-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">M</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          CONTINUOUS INFINITE CAROUSEL STREAM (Smooth Animated Flow)
         ============================================================== */}
      <div
        className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex w-max will-change-transform animate-marquee-left items-center py-2"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: "42s",
          }}
        >
          {duplicatedProjects.map((proj, idx) => (
            <div
              key={`${proj.id}-${idx}`}
              onClick={onOpenContact}
              className="recent-work-card group w-[260px] sm:w-[285px] md:w-[305px] mx-2.5 sm:mx-3 shrink-0 flex flex-col rounded-3xl overflow-hidden bg-[#0C1E4E]/80 border border-white/10 hover:border-[#FF8500]/60 shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Top Visual Canvas Box with Brand Artwork & Center Play Button */}
              <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${proj.bgGradient} flex flex-col items-center justify-center p-5 overflow-hidden`}>
                {/* Brand Logo inside Canvas */}
                <div className="relative z-10 flex flex-col items-center text-center transition-transform duration-300 group-hover:scale-105">
                  {proj.logoBadge}
                  <span className="text-[11px] text-slate-600 font-medium mt-1 line-clamp-1">
                    {proj.subtext}
                  </span>
                </div>

                {/* Center Video Play Badge Pod */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-115 group-hover:bg-[#FF8500] group-hover:text-[#081330] shadow-lg">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Metadata Label Bar (e.g. Made For ClickUp) */}
              <div className="p-4 sm:p-4.5 bg-[#07112B] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="text-slate-400">Made For</span>
                  <span className="font-bold text-white tracking-tight">{proj.clientLabel}</span>
                </div>

                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-[#FF8500] group-hover:text-[#081330] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWorkSection;
