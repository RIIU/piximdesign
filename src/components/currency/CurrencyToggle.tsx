"use client";

import React from "react";
import { useCurrency, type Currency } from "@/lib/currency";

const OPTIONS: { value: Currency; label: string; short: string }[] = [
  { value: "USD", label: "USD $", short: "$ USD" },
  { value: "BDT", label: "BDT ৳", short: "৳ BDT" },
];

/** Site-wide currency switch; every price on the site follows the same choice. */
export const CurrencyToggle: React.FC<{ size?: "md" | "sm"; className?: string }> = ({ size = "md", className = "" }) => {
  const { currency, setCurrency } = useCurrency();
  return (
    <div
      role="group"
      aria-label="Currency"
      className={`inline-flex rounded-full border border-[#2651B9]/35 bg-[#0C1E4E]/80 p-1 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = currency === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setCurrency(option.value)}
            className={`rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              size === "sm" ? "px-3 py-1 text-[10px]" : "px-5 py-1.5 text-xs"
            } ${active ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            {size === "sm" ? option.short : option.label}
          </button>
        );
      })}
    </div>
  );
};
