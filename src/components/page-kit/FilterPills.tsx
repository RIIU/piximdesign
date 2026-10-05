"use client";

import React from "react";

interface FilterPillsProps {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

/** Pill-shaped filter buttons; the active one is marked with aria-pressed. */
export const FilterPills: React.FC<FilterPillsProps> = ({ label, options, value, onChange, className = "" }) => (
  <div role="group" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
    {options.map((option) => {
      const active = option.id === value;
      return (
        <button
          key={option.id}
          type="button"
          aria-pressed={active}
          onClick={() => onChange(option.id)}
          className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            active
              ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md shadow-orange-500/25"
              : "border border-[#2651B9]/35 bg-[#0C1E4E]/70 text-slate-300 hover:border-[#FF8500]/45 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
