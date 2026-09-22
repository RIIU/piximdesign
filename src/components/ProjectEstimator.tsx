"use client";

import React, { useState } from "react";
import { ArrowRight, Check, DollarSign, Coins } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface ProjectEstimatorProps {
  onEstimateSubmit: (summary: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onEstimateSubmit }) => {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [selectedService, setSelectedService] = useState("logo-design");
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("conversion");

  const services = [
    { id: "logo-design", title: "Logo & Brand Identity", icon: "🎨" },
    { id: "web-design", title: "Website Design & Dev", icon: "💻" },
    { id: "package-design", title: "Package & Label Design", icon: "📦" },
    { id: "social-media", title: "Social Media & Posters", icon: "📱" },
    { id: "motion-video", title: "Motion Video & Intros", icon: "🎬" },
    { id: "seo-growth", title: "SEO & Organic Traffic", icon: "📈" },
  ];

  const packages = [
    { id: "basic", label: "Basic", badge: "Starter Tier", desc: "Essential branding & quick launch assets" },
    { id: "standard", label: "Standard", badge: "Most Popular", desc: "Complete business branding + source files" },
    { id: "premium", label: "Premium", badge: "Enterprise Grade", desc: "Full custom execution, 3D/motion & VIP support" },
  ];

  const budgetsUSD = [
    { label: "$0 – $100", range: "$50 - $100", desc: "Small gigs & single graphics" },
    { label: "$100 – $200", range: "$100 - $200", desc: "Professional logo or poster pack" },
    { label: "$200 – $500", range: "$200 - $500", desc: "Complete brand identity & packaging" },
    { label: "More than $500", range: "$500+", desc: "Full-scale custom website & system" },
  ];

  const budgetsBDT = [
    { label: "0 – ৳12,000", range: "৳6,000 - ৳12,000", desc: "Starter single asset or flyer" },
    { label: "৳12,000 – ৳24,000", range: "৳12,000 - ৳24,000", desc: "Full logo identity or campaign kit" },
    { label: "৳24,000 – ৳60,000", range: "৳24,000 - ৳60,000", desc: "Packaging series & dynamic website" },
    { label: "More than ৳60,000", range: "৳60,000+", desc: "Full enterprise brand & multi-page site" },
  ];

  const goals = [
    { id: "customers", label: "I need more customers" },
    { id: "conversion", label: "I need help with my conversion" },
    { id: "traffic", label: "I need more organic traffic" },
    { id: "social", label: "I need help with Social Media" },
  ];

  const currentBudgets = currency === "USD" ? budgetsUSD : budgetsBDT;
  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activePackageObj = packages.find((p) => p.id === selectedPackage) || packages[1];
  const activeBudgetObj = currentBudgets[selectedBudgetIdx] || currentBudgets[1];

  const handleRequestScope = () => {
    const summary = `Service: ${activeServiceObj.title} | Package: ${activePackageObj.label} | Budget (${currency}): ${activeBudgetObj.label} | Goal: ${goals.find((g) => g.id === selectedGoal)?.label}`;
    onEstimateSubmit(summary);
  };

  return (
    <section id="estimator" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#0C1E4E]/85 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(8,19,48,0.5)] overflow-hidden">
        {/* Ambient background glow (GPU-native radial gradient) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.08) 0%, rgba(255, 133, 0, 0.04) 40%, transparent 70%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
              {/* Currency Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === "USD"
                      ? "bg-[#FF8500] text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <DollarSign className="w-3 h-3" />
                  <span>USD ($)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("BDT")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currency === "BDT"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Coins className="w-3 h-3" />
                  <span>BDT (৳)</span>
                </button>
              </div>
            </div>

            <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
              Calculate Your Scope <br />
              <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
                With Transparent Budget Tiers.
              </span>
            </h2>

            {/* 1. Service Selection */}
            <div className="mt-8">
              <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                1. Choose Your Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition-all duration-200 cursor-pointer ${
                      selectedService === s.id
                        ? "bg-[#FF8500]/10 dark:bg-[#FF8500]/25 border-[#FF8500] text-slate-900 dark:text-white font-semibold shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-[#2651B9]/40"
                    }`}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Package Tier */}
            <div className="mt-6">
              <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                2. Select Package Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      selectedPackage === pkg.id
                        ? "bg-[#2651B9]/10 dark:bg-[#2651B9]/30 border-[#2651B9] text-[#2651B9] dark:text-[#60A5FA] font-semibold shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-[#2651B9]/40"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{pkg.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{pkg.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget Bracket */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  3. Project Budget ({currency})
                </label>
                <span className="text-[11px] text-[#C25E00] dark:text-[#FFA133] font-mono font-semibold">
                  {currency === "USD" ? "Standard USD Rates" : "Local BDT Rates"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentBudgets.map((b, idx) => (
                  <button
                    key={b.label}
                    onClick={() => setSelectedBudgetIdx(idx)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      selectedBudgetIdx === idx
                        ? "bg-[#FF8500]/10 dark:bg-[#FF8500]/25 border-[#FF8500] text-slate-900 dark:text-white font-semibold shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-[#2651B9]/40"
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{b.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Primary Goal */}
            <div className="mt-6">
              <label className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                4. Primary Launch Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all duration-200 cursor-pointer ${
                      selectedGoal === g.id
                        ? "bg-[#2651B9]/10 dark:bg-[#2651B9]/30 border-[#2651B9] text-slate-900 dark:text-white font-medium"
                        : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="truncate">{g.label}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 ${
                        selectedGoal === g.id
                          ? "bg-[#FF8500] border-[#FF8500] text-white"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selectedGoal === g.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-[#2651B9] to-[#1E3A8A] text-white shadow-xl relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-blue-200">
                  Target Investment Bracket
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/25 font-medium">
                  {activePackageObj.label} Tier
                </span>
              </div>

              <div className="my-6">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeBudgetObj.range}
                </div>
                <p className="text-xs text-orange-300 font-semibold mt-2">
                  {activeServiceObj.title}
                </p>
                <p className="text-xs text-blue-100 mt-1">
                  {activeBudgetObj.desc}
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-blue-50 py-5 border-t border-white/15">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>All master vector source files (AI, EPS, SVG, PNG)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>100% intellectual property & commercial copyright</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direct consultation with lead design specialist</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>8+ Years experience & 500+ satisfied clients quality</span>
                </li>
              </ul>
            </div>

            <GsapMagneticButton
              onClick={handleRequestScope}
              variant="primary"
              strength={0.25}
              className="relative z-10 mt-6 w-full py-3.5 px-6 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-extrabold text-sm shadow-xl"
            >
              <span>Lock In Quote & Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </GsapMagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

