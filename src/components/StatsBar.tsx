"use client";

import React from "react";
import { AGENCY_STATS } from "@/data/agencyData";

interface StatsBarProps {
  className?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ className = "" }) => {
  const renderFormattedValue = (val: string) => {
    const match = val.match(/^(.*?)(\+|%|★)$/);
    if (match) {
      return (
        <>
          <span>{match[1]}</span>
          <span className="text-[#FF8500] ml-0.5">{match[2]}</span>
        </>
      );
    }
    return val;
  };

  return (
    <section className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || "my-10"}`}>
      {/* Sleek, box-free minimalist stats strip */}
      <div className="py-8 sm:py-10 border-y border-white/[0.08]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {AGENCY_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col ${
                index === 0
                  ? "lg:pr-8"
                  : index === AGENCY_STATS.length - 1
                  ? "lg:pl-8 lg:border-l lg:border-white/[0.08]"
                  : "lg:px-8 lg:border-l lg:border-white/[0.08]"
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {renderFormattedValue(stat.value)}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-200 mt-2">
                {stat.label}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
