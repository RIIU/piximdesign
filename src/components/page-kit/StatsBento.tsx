import React from "react";
import { Star } from "lucide-react";
import { AGENCY_STATS } from "@/data/agencyData";
import { SampleMark } from "./shared";
import type { StatHighlight } from "./types";

const [BRANDS, YEARS, , RATING] = AGENCY_STATS;

/** Agency stats bento (brands, rating, years) plus one page-specific highlight tile. */
export const StatsBento: React.FC<{ highlight: StatHighlight; className?: string }> = ({ highlight, className = "" }) => (
  <div className={`grid grid-cols-2 gap-4 auto-rows-[minmax(150px,auto)] ${className}`}>
    <div className="reveal-up relative row-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-6 flex flex-col justify-between shadow-[0_25px_60px_-20px_rgba(255,133,0,0.55)]">
      <SampleMark className="absolute -right-12 -top-12 w-44 h-44 opacity-15" color="#FFFFFF" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Track record</span>
      <div className="relative">
        <span className="block font-agency text-5xl sm:text-7xl font-extrabold text-white leading-none">{BRANDS.value}</span>
        <span className="mt-2 block text-base font-bold text-white">{BRANDS.label}</span>
        <span className="block text-sm text-white/80">{BRANDS.detail}</span>
      </div>
    </div>

    <div className="reveal-up rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 flex flex-col justify-between">
      <div className="flex text-[#FFA133]" aria-hidden>
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <div>
        <span className="block font-agency text-4xl sm:text-5xl font-extrabold text-white leading-none">
          {RATING.value.replace("★", "")}
        </span>
        <span className="mt-1 block text-sm font-semibold text-slate-300">{RATING.label}</span>
      </div>
    </div>

    <div className="reveal-up rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 flex flex-col justify-end">
      <span className="block font-agency text-4xl sm:text-5xl font-extrabold text-white leading-none">
        {YEARS.value.replace("+", "")}
        <span className="text-[#FF8500]">+</span>
      </span>
      <span className="mt-1 block text-sm font-semibold text-slate-300">{YEARS.label}</span>
    </div>

    <div className="reveal-up col-span-2 rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 sm:p-6 flex flex-col gap-4">
      <div>
        <span className="block font-agency text-4xl font-extrabold text-white leading-none">{highlight.value}</span>
        <span className="mt-1 block text-sm font-semibold text-slate-300">{highlight.label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {highlight.chips.map((chip) => (
          <span key={chip} className="rounded-lg border border-[#FF8500]/30 bg-[#FF8500]/10 px-2.5 py-1.5 font-mono text-xs font-bold text-[#FFA133]">
            {chip}
          </span>
        ))}
      </div>
    </div>
  </div>
);
