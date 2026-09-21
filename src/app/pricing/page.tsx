"use client";

import React, { useState } from "react";
import { ProjectEstimator } from "@/components/ProjectEstimator";
import { FaqSection } from "@/components/FaqSection";
import { Sparkles, Check, DollarSign, Coins, ShieldCheck, HelpCircle } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { GsapDrawSvg, GsapMagneticButton, GsapReviewsInfiniteSlider } from "@/components/animations";

export default function PricingPage() {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const { openContact } = useContactModal();

  const handleEstimateSubmit = (summary: string) => {
    openContact("Estimate from Pricing Page", `Scope: ${summary}`);
  };

  const planTiers = [
    {
      name: "Basic",
      badge: "Starter Tier",
      priceUSD: "$75 – $180",
      priceBDT: "৳9,000 – ৳22,000",
      tagline: "Essential branding & assets for early-stage initiatives.",
      features: [
        "1 Initial custom design concept",
        "Essential vector & raster exports (PNG, JPG, SVG)",
        "Standard typography & color codes",
        "2 Rounds of client feedback & tuning",
        "Standard email & chat communication",
        "3 to 5 business day delivery",
      ],
      ctaText: "Choose Basic Plan",
      popular: false,
    },
    {
      name: "Standard",
      badge: "Most Popular",
      priceUSD: "$180 – $500",
      priceBDT: "৳22,000 – ৳60,000",
      tagline: "Complete commercial identity, website & marketing kit.",
      features: [
        "Multiple bespoke creative concepts",
        "Full master vector source files (AI, EPS, SVG, PNG, Figma)",
        "Comprehensive brand guidelines book",
        "Photorealistic 3D mockups / responsive web layouts",
        "Unlimited precision revisions until 100% satisfied",
        "Dedicated lead designer & developer direct channel",
        "30-day post-delivery warranty & assistance",
      ],
      ctaText: "Choose Standard Plan",
      popular: true,
    },
    {
      name: "Premium",
      badge: "Enterprise Grade",
      priceUSD: "$500+",
      priceBDT: "৳60,000+",
      tagline: "Full-scale corporate branding, custom web app & 3D motion.",
      features: [
        "Full 360° corporate branding system & design tokens",
        "Custom Next.js 15 / WordPress multi-page engineering",
        "3D packaging renders & animated motion intro video",
        "Complete on-page SEO & speed optimization (100/100)",
        "Expedited sprint delivery & VIP priority support",
        "Full legal trademark clearance & commercial IP assignment",
        "Quarterly retainer options & ongoing growth consulting",
      ],
      ctaText: "Choose Premium Plan",
      popular: false,
    },
  ];

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
          Flexible Plans & <br />
          <span className="relative inline-block bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133] bg-clip-text text-transparent">
            Transparent Investment Tiers
            <span className="absolute -bottom-2.5 left-0 w-full pointer-events-none">
              <GsapDrawSvg
                type="underline"
                strokeColor="#FF8500"
                strokeWidth={3}
                duration={1.2}
                delay={0.3}
              />
            </span>
          </span>
        </h1>

        <p className="relative z-10 mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Predictable scopes, zero surprises. Choose between fixed service packages or use our real-time estimator below.
        </p>

        {/* Currency Switcher */}
        <div className="relative z-10 mt-8 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/30 shadow-sm">
            <button
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>USD ($ - Global)</span>
            </button>
            <button
              onClick={() => setCurrency("BDT")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === "BDT"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>BDT (৳ - Bangladesh)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Package Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
        {planTiers.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] ${
              plan.popular
                ? "bg-white/95 dark:bg-[#111827]/95 border-2 border-[#FF8500] shadow-[0_20px_50px_-10px_rgba(255,133,0,0.22)] scale-[1.02] z-10"
                : "bg-white/80 dark:bg-[#111827]/80 border border-[#FF8500]/25 dark:border-[#FF8500]/35 hover:border-[#FF8500]/60 shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-[#FF8500]/25">
                Most Popular Choice
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{plan.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                  {plan.badge}
                </span>
              </div>

              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-[#F8FAFC]">
                  {currency === "USD" ? plan.priceUSD : plan.priceBDT}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <div className="p-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <GsapMagneticButton
                onClick={() => openContact(`Package: ${plan.name} (${currency === "USD" ? plan.priceUSD : plan.priceBDT})`)}
                variant={plan.popular ? "primary" : "secondary"}
                strength={0.25}
                className={`w-full py-3.5 font-bold text-xs sm:text-sm ${
                  plan.popular ? "!text-white shadow-xl" : "text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                }`}
              >
                <span>{plan.ctaText}</span>
              </GsapMagneticButton>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Scope Estimator Tool */}
      <div className="mb-24">
        <ProjectEstimator onEstimateSubmit={handleEstimateSubmit} />
      </div>

      {/* Infinite Review Card Slider */}
      <div className="mb-24">
        <GsapReviewsInfiniteSlider
          title="What Founders Say About Our Value"
          subtitle="TRANSPARENT CLIENT REVIEWS"
          speed={38}
        />
      </div>

      {/* Guarantees Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.07)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)] text-center">
          <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-emerald-400 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">All Master Files Included</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Never pay extra for AI, EPS, SVG or Figma source files. You receive all raw vectors.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.07)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)] text-center">
          <Sparkles className="w-6 h-6 text-[#FF8500] dark:text-[#FFA133] mx-auto mb-3" />
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">Full Intellectual Property</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Complete commercial ownership and trademark assignment transferred to your company.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.07)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)] text-center">
          <HelpCircle className="w-6 h-6 text-[#2651B9] dark:text-[#60A5FA] mx-auto mb-3" />
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">30-Day Post Warranty</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Complimentary adjustments and ongoing technical support for 30 days post delivery.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mb-12">
        <FaqSection />
      </div>
    </main>
  );
}
