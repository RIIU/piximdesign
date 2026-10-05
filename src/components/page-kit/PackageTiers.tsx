"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "./shared";
import { Price } from "@/components/currency/Price";
import { CurrencyToggle } from "@/components/currency/CurrencyToggle";
import { useCurrency } from "@/lib/currency";
import type { PackagesContent } from "./types";

interface PackageTiersProps {
  packages: PackagesContent;
  onChoose: (packageName: string, price: string) => void;
  onCustom: () => void;
  id?: string;
  eyebrow?: string;
  /** Hide when the page already shows the currency switch nearby */
  showCurrencyToggle?: boolean;
}

const TIER_ORDER = [
  { key: "basic", name: "Basic" },
  { key: "standard", name: "Standard" },
  { key: "premium", name: "Premium" },
] as const;

/** Basic / Standard / Premium cards; prices follow the site-wide currency. */
export const PackageTiers: React.FC<PackageTiersProps> = ({
  packages,
  onChoose,
  onCustom,
  id = "service-packages",
  eyebrow = "Pricing",
  showCurrencyToggle = true,
}) => {
  const { currency } = useCurrency();

  return (
    <section id={id} className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.10),transparent_70%)] pointer-events-none" />

      <SectionHeading eyebrow={eyebrow} title={packages.title} desc={packages.description} />

      {/* Currency toggle (site-wide) */}
      {showCurrencyToggle ? (
        <div className="reveal-up mt-8 mb-12 flex justify-center">
          <CurrencyToggle />
        </div>
      ) : (
        <div className="mb-12" />
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {TIER_ORDER.map(({ key, name }) => {
          const tier = packages.tiers[key];
          const popular = key === "standard";
          const price = currency === "BDT" ? tier.bdt : tier.usd;
          return (
            <div
              key={key}
              className={`reveal-up relative flex flex-col rounded-[28px] p-7 sm:p-8 ${
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

              <div className="flex items-center justify-between gap-3">
                <span className={`font-agency text-xl font-extrabold ${popular ? "text-[#FFA133]" : "text-white"}`}>{name}</span>
                <span className="text-xs text-slate-400 text-right">{tier.tagline}</span>
              </div>

              <div className="mt-6">
                <span className="block font-agency text-4xl sm:text-[42px] font-extrabold text-white leading-none">
                  <Price usd={tier.usd} bdt={tier.bdt} />
                </span>
                <span className="mt-2 block text-sm text-slate-400">{tier.desc}</span>
              </div>

              <div className="my-6 h-px bg-white/[0.08]" />

              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
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

      <p className="reveal-up mt-10 text-center text-sm text-slate-400">
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
