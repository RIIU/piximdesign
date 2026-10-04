"use client";

import React, { useState } from "react";
import { ArrowRight, Check, DollarSign, Coins, Sparkles, Layers, Sliders, ShieldCheck } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface ProjectEstimatorSectionProps {
  onEstimateSubmit: (serviceTitle: string, summary: string) => void;
}

export const ProjectEstimatorSection: React.FC<ProjectEstimatorSectionProps> = ({ onEstimateSubmit }) => {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [selectedService, setSelectedService] = useState("logo-design");
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("conversion");

  const services = [
    {
      id: "logo-design",
      title: "Logo & Brand Identity",
      icon: "🎨",
      deliverables: [
        "Primary, secondary & submark vector logos",
        "Brand style guide & typography system",
        "All master source files (AI, EPS, SVG, PNG, PDF)",
        "Social media avatar & banner kit",
      ],
    },
    {
      id: "web-design",
      title: "Website Design & Dev",
      icon: "💻",
      deliverables: [
        "Figma design system with interactive prototypes",
        "Next.js 16 high-performance responsive build",
        "100/100 Core Web Vitals & speed optimization",
        "SEO architecture & analytics integration",
      ],
    },
    {
      id: "package-design",
      title: "Package & Label Design",
      icon: "📦",
      deliverables: [
        "Print-ready CMYK dieline vectors",
        "3D photorealistic product mockups",
        "Material & finish print specifications",
        "Full commercial production license",
      ],
    },
    {
      id: "social-media",
      title: "Social Media & Posters",
      icon: "📱",
      deliverables: [
        "High-converting ad creatives & poster packs",
        "Editable Canva & Figma master templates",
        "Curated typography and aesthetic grid layouts",
        "Multi-platform aspect ratios (Feed, Story, Reel)",
      ],
    },
    {
      id: "motion-video",
      title: "Motion Video & Intros",
      icon: "🎬",
      deliverables: [
        "Cinematic 4K/60fps 3D logo animation",
        "Custom sound design & licensed audio track",
        "Transparent alpha channel video overlay files",
        "Social hook cuts for YouTube, IG & TikTok",
      ],
    },
    {
      id: "seo-growth",
      title: "SEO & Organic Traffic",
      icon: "📈",
      deliverables: [
        "Deep technical SEO audit & competitor analysis",
        "Target high-intent buyer keyword strategy",
        "Schema markup & structured metadata setup",
        "Monthly ranking telemetry & growth report",
      ],
    },
  ];

  const packages = [
    { id: "basic", label: "Basic Starter", badge: "Fast Launch", desc: "Essential branding assets for immediate market entry" },
    { id: "standard", label: "Standard Growth", badge: "Most Popular", desc: "Complete comprehensive identity + master source files" },
    { id: "premium", label: "Enterprise Scale", badge: "Full Custom", desc: "End-to-end bespoke design, 3D motion & VIP sprint support" },
  ];

  const budgetsUSD = [
    { label: "$50 – $100", range: "$50 – $100", desc: "Starter single asset or quick turnaround graphic" },
    { label: "$100 – $200", range: "$100 – $200", desc: "Professional logo identity or multi-poster launch pack" },
    { label: "$200 – $500", range: "$200 – $500", desc: "Complete brand identity, packaging, or custom landing page" },
    { label: "$500+", range: "$500+", desc: "Full-scale custom digital product, multi-page platform & 3D system" },
  ];

  const budgetsBDT = [
    { label: "৳6,000 – ৳12,000", range: "৳6,000 – ৳12,000", desc: "Starter single asset or promotional campaign kit" },
    { label: "৳12,000 – ৳24,000", range: "৳12,000 – ৳24,000", desc: "Full logo identity or specialized design pack" },
    { label: "৳24,000 – ৳60,000", range: "৳24,000 – ৳60,000", desc: "Packaging series & dynamic Next.js web platform" },
    { label: "৳60,000+", range: "৳60,000+", desc: "Full enterprise brand system, 3D motion & complete web app" },
  ];

  const goals = [
    { id: "conversion", label: "Increase sales & conversions" },
    { id: "brand", label: "Elevate brand authority & trust" },
    { id: "launch", label: "Launch a new product or startup" },
    { id: "rebrand", label: "Modernize & scale an existing brand" },
  ];

  const currentBudgets = currency === "USD" ? budgetsUSD : budgetsBDT;
  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activePackageObj = packages.find((p) => p.id === selectedPackage) || packages[1];
  const activeBudgetObj = currentBudgets[selectedBudgetIdx] || currentBudgets[1];
  const activeGoalObj = goals.find((g) => g.id === selectedGoal) || goals[0];

  const handleClaimEstimate = () => {
    const summary = `Estimated Scope: ${activeServiceObj.title} (${activePackageObj.label}) | Investment Target: ${activeBudgetObj.range} (${currency}) | Primary Goal: ${activeGoalObj.label}`;
    onEstimateSubmit(activeServiceObj.title, summary);
  };

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-28 overflow-hidden bg-gradient-to-b from-[#081330] via-[#06102B] to-[#081330]">
      {/* Background radial lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[1100px] h-[550px] rounded-full pointer-events-none opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.3) 0%, rgba(255, 133, 0, 0.15) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/35 text-[#FFA133] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Scope Builder</span>
          </div>

          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
            Calculate Your Project Scope <br />
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              With Transparent Pricing.
            </span>
          </h2>

          <p className="font-sherika mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Choose your service, adjust your package tier, and toggle your local currency to get an instant scope breakdown before scheduling a call.
          </p>
        </div>

        {/* Interactive Estimator Bento Grid */}
        <div className="relative rounded-3xl bg-[#07132D]/90 border border-[#2651B9]/30 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_70px_rgba(4,10,28,0.7)] overflow-hidden">
          {/* Top Bar: Currency Switcher */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                Preferred Currency:
              </span>
              <div className="flex items-center p-1 rounded-xl bg-[#081330] border border-[#2651B9]/30 shadow-inner">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === "USD"
                      ? "bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white shadow-md shadow-orange-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>USD ($)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("BDT")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === "BDT"
                      ? "bg-gradient-to-r from-[#2651B9] to-[#3B82F6] text-white shadow-md shadow-blue-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>BDT (৳)</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Immediate Sprint Kickoff</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Interactive Form Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
              {/* 1. Service Selection */}
              <div>
                <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#FFA133] block mb-3">
                  Step 1: Choose Your Project Capability
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        selectedService === s.id
                          ? "bg-gradient-to-r from-[#FF8500]/20 to-[#FFA229]/10 border-[#FF8500] text-white shadow-md shadow-orange-500/10 ring-1 ring-[#FF8500]/40"
                          : "bg-[#081330]/70 border-white/10 text-slate-300 hover:border-[#2651B9]/50 hover:bg-[#081330]"
                      }`}
                    >
                      <span className="text-lg shrink-0">{s.icon}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Package Tier */}
              <div>
                <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#60A5FA] block mb-3">
                  Step 2: Select Package Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        selectedPackage === pkg.id
                          ? "bg-[#2651B9]/25 border-[#3B82F6] text-white shadow-md ring-1 ring-[#3B82F6]/50"
                          : "bg-[#081330]/70 border-white/10 text-slate-300 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-white">{pkg.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-[#FFA133] font-bold">
                          {pkg.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{pkg.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Budget Bracket */}
              <div>
                <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300 block mb-3">
                  Step 3: Target Investment Bracket ({currency})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {currentBudgets.map((b, idx) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => setSelectedBudgetIdx(idx)}
                      className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                        selectedBudgetIdx === idx
                          ? "bg-[#FF8500]/20 border-[#FF8500] text-white font-bold shadow-md shadow-orange-500/10"
                          : "bg-[#081330]/70 border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-mono font-extrabold text-white">{b.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Primary Objective */}
              <div>
                <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300 block mb-3">
                  Step 4: Primary Business Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(g.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-xs text-left transition-all duration-200 cursor-pointer ${
                        selectedGoal === g.id
                          ? "bg-[#2651B9]/20 border-[#2651B9] text-white font-medium"
                          : "bg-[#081330]/70 border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <span className="truncate">{g.label}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                          selectedGoal === g.id
                            ? "bg-[#FF8500] border-[#FF8500] text-white"
                            : "border-slate-500"
                        }`}
                      >
                        {selectedGoal === g.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Live Estimate Summary Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#0C1E4E] to-[#071330] border-2 border-[#2651B9]/50 shadow-2xl relative overflow-hidden">
              {/* Radiant orange glow in the top corner */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF8500]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#60A5FA]">
                    Target Scope Summary
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold">
                    {activePackageObj.label}
                  </span>
                </div>

                {/* Investment Display */}
                <div className="my-6">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-agency tracking-tight">
                    {activeBudgetObj.range}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base">{activeServiceObj.icon}</span>
                    <span className="text-sm text-[#FFA133] font-bold">
                      {activeServiceObj.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeBudgetObj.desc}
                  </p>
                </div>

                {/* Deliverables Checklist for Active Service */}
                <div className="py-5 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                    Deliverables Included in this Scope:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {activeServiceObj.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantee Pill */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#60A5FA] shrink-0" />
                  <span>100% Vector IP Ownership • Unlimited Revisions</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <GsapMagneticButton
                  onClick={handleClaimEstimate}
                  variant="primary"
                  strength={0.25}
                  className="w-full py-4 px-6 !bg-gradient-to-r !from-[#FF8500] !via-[#FFA229] !to-[#FF8500] !text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Lock In Quote & Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </GsapMagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectEstimatorSection;
