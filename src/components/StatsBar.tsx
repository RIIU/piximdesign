"use client";

import React from "react";
import { AGENCY_STATS } from "@/data/agencyData";
export const StatsBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const statIcons = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-400 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300">
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 7H22V13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      glow: "from-orange-500/25 to-amber-500/10",
      border: "border-orange-500/35 dark:border-orange-500/45 hover:border-orange-500/70",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400 group-hover:rotate-45 transition-transform duration-500">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
      glow: "from-blue-500/25 to-cyan-500/10",
      border: "border-blue-500/35 dark:border-blue-500/45 hover:border-blue-500/70",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
          <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2.2" />
          <path d="M15.477 12.89L17 22L12 19L7 22L8.523 12.89" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      glow: "from-amber-500/25 to-yellow-500/10",
      border: "border-amber-500/35 dark:border-amber-500/45 hover:border-amber-500/70",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400 group-hover:scale-125 group-hover:rotate-180 transition-all duration-700">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ),
      glow: "from-yellow-500/25 to-orange-500/10",
      border: "border-yellow-500/35 dark:border-yellow-500/45 hover:border-yellow-500/70",
    },
  ];

  return (
    <section className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || "-mt-6 mb-20"}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {AGENCY_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`group relative p-6 rounded-2xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border ${statIcons[index]?.border || "border-[#2651B9]/30"} transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-2xl overflow-hidden`}
          >
            {/* Ambient normal glow */}
            <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${statIcons[index]?.glow || "from-[#2651B9]/5 to-transparent"} opacity-50 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none`} />

            {/* Top icon and subtle verified indicator */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                {statIcons[index]?.icon}
              </div>
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {stat.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
