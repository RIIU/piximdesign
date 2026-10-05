"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SAMPLE_MARK_PATH, SampleMark, Wordmark, GradientText, Eyebrow } from "./shared";

interface BrandServicesBentoProps {
  onSelect: (serviceName: string) => void;
}

/* ---------- Tile visuals (decorative) ---------- */

const LogoConstructionVisual = () => {
  // Diamond vertices of the sample mark, scaled x2 and centred at (160, 110)
  const anchors = [
    [160, 68],
    [202, 110],
    [160, 152],
    [118, 110],
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={220} stroke="rgba(59,130,246,0.14)" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 44} x2={320} y2={i * 44} stroke="rgba(59,130,246,0.14)" />
      ))}
      <circle cx={160} cy={110} r={92} fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
      <circle cx={160} cy={110} r={62} fill="none" stroke="rgba(255,255,255,0.12)" />
      <line x1={60} y1={10} x2={260} y2={210} stroke="rgba(255,161,51,0.25)" />
      <line x1={260} y1={10} x2={60} y2={210} stroke="rgba(255,161,51,0.25)" />
      <g transform="translate(112 62) scale(2)">
        <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill="#FF8500" />
      </g>
      {anchors.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width={7} height={7} fill="#081330" stroke="#FFFFFF" strokeWidth={1.2} />
      ))}
      <text x={14} y={208} fill="rgba(148,163,184,0.7)" fontSize={9} fontFamily="monospace">
        grid 40 · golden ratio
      </text>
    </svg>
  );
};

const PaletteVisual = () => (
  <div className="flex h-full gap-2">
    {[
      { hex: "#FF8500", name: "Sunrise", text: "text-white" },
      { hex: "#FFA133", name: "Amber", text: "text-white" },
      { hex: "#2651B9", name: "Electric", text: "text-white" },
      { hex: "#081330", name: "Midnight", text: "text-slate-300" },
      { hex: "#F8FAFC", name: "Cloud", text: "text-slate-700" },
    ].map((c, i) => (
      <div
        key={c.hex}
        className="flex-1 rounded-2xl border border-white/10 p-2.5 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1"
        style={{ background: c.hex, transitionDelay: `${i * 40}ms` }}
      >
        <span className={`text-[10px] font-semibold ${c.text}`}>{c.name}</span>
        <span className={`text-[9px] font-mono opacity-80 ${c.text}`}>{c.hex}</span>
      </div>
    ))}
  </div>
);

const TypeVisual = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="font-agency text-6xl font-extrabold text-white leading-none">Aa</span>
    <div className="space-y-1">
      <div className="flex items-baseline gap-2 text-slate-300">
        <span className="text-xs font-normal">Regular</span>
        <span className="text-xs font-semibold">Medium</span>
        <span className="text-xs font-extrabold">Bold</span>
      </div>
      <span className="block text-[10px] font-mono text-slate-500 truncate">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
    </div>
  </div>
);

const GuidelinesVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex w-full max-w-[200px] aspect-[3/2] rounded-xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105">
      <div className="flex-1 bg-[#F8FAFC] p-2.5 flex flex-col justify-between">
        <SampleMark className="w-5 h-5" color="#FF8500" />
        <div>
          <span className="block font-agency text-[11px] font-extrabold text-[#081330] leading-none">Brand Book</span>
          <span className="block text-[7px] text-slate-500 mt-0.5">v1.0 · guidelines</span>
        </div>
      </div>
      <div className="flex-1 bg-white border-l border-slate-200 p-2.5 space-y-1.5">
        <div className="h-1 w-3/4 rounded bg-slate-300" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-5/6 rounded bg-slate-200" />
        <div className="flex gap-1 pt-1">
          <span className="h-3 flex-1 rounded-sm bg-[#FF8500]" />
          <span className="h-3 flex-1 rounded-sm bg-[#2651B9]" />
          <span className="h-3 flex-1 rounded-sm bg-[#081330]" />
        </div>
      </div>
    </div>
  </div>
);

const StationeryVisual = () => (
  <div className="relative h-full">
    {/* Letterhead */}
    <div className="absolute left-[6%] top-[8%] w-[46%] h-[92%] rounded-lg bg-white shadow-xl p-3 rotate-[-4deg] transition-transform duration-500 group-hover:rotate-[-6deg]">
      <div className="flex items-center gap-1.5">
        <SampleMark className="w-4 h-4" color="#FF8500" />
        <Wordmark className="text-[10px] text-[#081330]" />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1 w-1/2 rounded bg-slate-300" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-11/12 rounded bg-slate-200" />
        <div className="h-1 w-4/5 rounded bg-slate-200" />
      </div>
      <div className="absolute bottom-2 left-3 right-3 h-0.5 rounded bg-[#FF8500]" />
    </div>
    {/* Card back */}
    <div className="absolute right-[8%] top-[10%] w-[40%] aspect-[1.75/1] rounded-lg bg-gradient-to-br from-[#FF8500] to-[#FFA133] shadow-xl flex items-center justify-center rotate-[6deg] transition-transform duration-500 group-hover:rotate-[9deg]">
      <Wordmark className="text-sm sm:text-base text-white" />
    </div>
    {/* Card front */}
    <div className="absolute right-[16%] bottom-[4%] w-[40%] aspect-[1.75/1] rounded-lg bg-[#081330] border border-[#2651B9]/50 shadow-2xl p-2.5 flex flex-col justify-between rotate-[-2deg] transition-transform duration-500 group-hover:-translate-y-1">
      <SampleMark className="w-4 h-4" color="#FF8500" />
      <div className="space-y-1">
        <div className="h-1 w-3/5 rounded bg-white/80" />
        <div className="h-1 w-2/5 rounded bg-white/30" />
      </div>
    </div>
  </div>
);

const RebrandVisual = () => (
  <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
    <div className="flex flex-col items-center gap-2">
      <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-700/60 border border-slate-600 flex items-center justify-center">
        <span className="font-serif italic text-xl sm:text-2xl text-slate-400">Yb</span>
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Before</span>
    </div>
    <ArrowRight className="w-5 h-5 text-[#FFA133] transition-transform duration-500 group-hover:translate-x-1" />
    <div className="flex flex-col items-center gap-2">
      <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-lg shadow-orange-500/30">
        <SampleMark className="w-9 h-9 sm:w-10 sm:h-10" color="#FFFFFF" />
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">After</span>
    </div>
  </div>
);

/* ---------- Bento ---------- */

const TILES: {
  title: string;
  desc: string;
  visual: React.ReactNode;
  className: string;
  visualClass: string;
}[] = [
  {
    title: "Logo Design",
    desc: "A distinctive, scalable mark built on strategy and geometry, so it works from a favicon to a billboard.",
    visual: <LogoConstructionVisual />,
    className: "md:col-span-2 lg:col-span-2 lg:row-span-2",
    visualClass: "min-h-[220px] lg:min-h-0",
  },
  {
    title: "Visual Identity & Colour",
    desc: "A purposeful palette and visual language people instantly recognise.",
    visual: <PaletteVisual />,
    className: "md:col-span-2 lg:col-span-2",
    visualClass: "min-h-[120px]",
  },
  {
    title: "Typography",
    desc: "Typefaces that give your brand a voice.",
    visual: <TypeVisual />,
    className: "",
    visualClass: "min-h-[120px]",
  },
  {
    title: "Brand Guidelines",
    desc: "One rulebook for consistent use.",
    visual: <GuidelinesVisual />,
    className: "",
    visualClass: "min-h-[120px]",
  },
  {
    title: "Stationery & Business Cards",
    desc: "Letterheads and print-ready cards that make every handover look professional.",
    visual: <StationeryVisual />,
    className: "md:col-span-2 lg:col-span-2",
    visualClass: "min-h-[150px]",
  },
  {
    title: "Rebranding & Refresh",
    desc: "Modernise an outdated identity while keeping the equity customers recognise.",
    visual: <RebrandVisual />,
    className: "md:col-span-2 lg:col-span-2",
    visualClass: "min-h-[150px]",
  },
];

export const BrandServicesBento: React.FC<BrandServicesBentoProps> = ({ onSelect }) => (
  <section id="branding-services" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="brand-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
      <div className="max-w-2xl">
        <Eyebrow>Our Branding Services</Eyebrow>
        <h2 className="mt-4 font-agency text-[28px] sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.1]">
          Everything Your Brand Needs, <GradientText>Under One Roof</GradientText>
        </h2>
      </div>
      <div className="max-w-sm">
        <p className="text-slate-400 leading-relaxed">
          From the first sketch of your logo to the last page of your brand book, one team crafts your entire identity.
        </p>
        <button
          type="button"
          onClick={() => onSelect("a complete brand identity")}
          className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#FFA133] hover:text-white transition-colors cursor-pointer"
        >
          Discuss your project
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[268px] gap-5">
      {TILES.map((tile) => (
        <button
          key={tile.title}
          type="button"
          onClick={() => onSelect(tile.title)}
          className={`brand-reveal group relative flex flex-col overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 text-left transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF8500]/55 hover:shadow-[0_20px_45px_-18px_rgba(255,133,0,0.35)] cursor-pointer ${tile.className}`}
        >
          {/* hover glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,133,0,0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className={`relative flex-1 p-5 sm:p-6 pb-0 ${tile.visualClass}`} aria-hidden>
            {tile.visual}
          </div>

          <div className="relative flex items-end justify-between gap-4 p-5 sm:p-6">
            <div>
              <h3 className="font-agency text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors">
                {tile.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400 leading-snug">{tile.desc}</p>
            </div>
            <span className="shrink-0 w-9 h-9 rounded-full border border-[#2651B9]/35 bg-[#081330] flex items-center justify-center text-slate-300 transition-all duration-300 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] group-hover:text-white">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </button>
      ))}
    </div>
  </section>
);
