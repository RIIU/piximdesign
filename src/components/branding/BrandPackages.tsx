"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading, GradientText } from "./shared";
import { TIER_FEATURES } from "./brandingData";

type Tier = { usd: string; bdt: string; desc: string };

interface BrandPackagesProps {
  pricing: { basic: Tier; standard: Tier; premium: Tier };
  onChoose: (packageName: string, price: string) => void;
  onCustom: () => void;
}

const TIER_META = [
  { key: "basic", name: "Basic", tagline: "Launch with a professional mark" },
  { key: "standard", name: "Standard", tagline: "A complete identity system" },
  { key: "premium", name: "Premium", tagline: "A full 360° brand rollout" },
] as const;

export const BrandPackages: React.FC<BrandPackagesProps> = ({ pricing, onChoose, onCustom }) => {
  const [currency, setCurrency] = useState<"usd" | "bdt">("usd");

  return (
    <section id="branding-packages" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.10),transparent_70%)] pointer-events-none" />

      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Branding Packages, <GradientText>Clearly Priced</GradientText>
          </>
        }
        desc="Pick the scope that fits where your business is today. No hidden fees, ever."
      />

      {/* Currency toggle */}
      <div className="brand-reveal mt-8 mb-12 flex justify-center">
        <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-[#2651B9]/35 bg-[#0C1E4E]/80 p-1">
          {(["usd", "bdt"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={currency === c}
              onClick={() => setCurrency(c)}
              className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                currency === c ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              {c === "usd" ? "USD $" : "BDT ৳"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {TIER_META.map(({ key, name, tagline }) => {
          const tier = pricing[key];
          const popular = key === "standard";
          const price = tier[currency];
          return (
            <div
              key={key}
              className={`brand-reveal relative flex flex-col rounded-[28px] p-7 sm:p-8 ${
                popular
                  ? "border-2 border-[#FF8500] bg-gradient-to-b from-[#FF8500]/[0.14] via-[#0C1E4E] to-[#0C1E4E] shadow-[0_30px_70px_-25px_rgba(255,133,0,0.5)] md:-my-3"
                  : "border border-[#2651B9]/30 bg-[#0C1E4E]/80"
              }`}
            >
              {popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div className="flex items-center justify-between">
                <span className={`font-agency text-xl font-extrabold ${popular ? "text-[#FFA133]" : "text-white"}`}>{name}</span>
                <span className="text-xs text-slate-400">{tagline}</span>
              </div>

              <div className="mt-6">
                <span className="block font-agency text-4xl sm:text-[42px] font-extrabold text-white leading-none">{price}</span>
                <span className="mt-2 block text-sm text-slate-400">{tier.desc}</span>
              </div>

              <div className="my-6 h-px bg-white/[0.08]" />

              <ul className="flex-1 space-y-3">
                {TIER_FEATURES[key].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <span
                      className={`mt-0.5 flex w-5 h-5 shrink-0 items-center justify-center rounded-full ${
                        popular ? "bg-[#FF8500]" : "bg-[#FF8500]/15 border border-[#FF8500]/40"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${popular ? "text-white" : "text-[#FFA133]"}`} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onChoose(name, price)}
                className={`mt-8 w-full rounded-xl py-3.5 text-sm font-bold transition-all cursor-pointer ${
                  popular
                    ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40"
                    : "bg-[#081330] border border-[#2651B9]/35 text-slate-200 hover:border-[#FF8500]/50 hover:text-white"
                }`}
              >
                Choose {name}
              </button>
            </div>
          );
        })}
      </div>

      <p className="brand-reveal mt-10 text-center text-sm text-slate-400">
        Need something different?{" "}
        <button
          type="button"
          onClick={onCustom}
          className="group inline-flex items-center gap-1 font-bold text-[#FFA133] hover:text-white transition-colors cursor-pointer"
        >
          Get a tailored quote
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </p>
    </section>
  );
};
