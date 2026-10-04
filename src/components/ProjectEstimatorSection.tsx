"use client";

import React, { useState } from "react";
import { ArrowRight, Check, DollarSign, Coins, ShieldCheck } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface ProjectEstimatorSectionProps {
  onEstimateSubmit: (serviceTitle: string, summary: string) => void;
}

export const ProjectEstimatorSection: React.FC<ProjectEstimatorSectionProps> = ({ onEstimateSubmit }) => {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [selectedService, setSelectedService] = useState("logo-design");
  const [selectedTier, setSelectedTier] = useState<"basic" | "standard" | "enterprise">("standard");

  const services = [
    { id: "logo-design", title: "Logo & Brand Identity", icon: "🎨" },
    { id: "web-design", title: "Website Design & Dev", icon: "💻" },
    { id: "package-design", title: "Package & Label Design", icon: "📦" },
    { id: "social-media", title: "Social Media & Posters", icon: "📱" },
    { id: "motion-video", title: "Motion Video & 3D Intros", icon: "🎬" },
    { id: "seo-growth", title: "SEO & Organic Growth", icon: "📈" },
  ];

  const pricingMatrix: Record<
    string,
    Record<"basic" | "standard" | "enterprise", { usd: string; bdt: string; timeline: string; deliverables: string[] }>
  > = {
    "logo-design": {
      basic: {
        usd: "$50 – $100",
        bdt: "৳6,000 – ৳12,000",
        timeline: "3–5 Days",
        deliverables: ["2 Custom Logo Concepts", "Vector Master Files (AI, SVG, PNG)", "Basic Color Palette Guide"],
      },
      standard: {
        usd: "$100 – $250",
        bdt: "৳12,000 – ৳30,000",
        timeline: "7–10 Days",
        deliverables: ["4 Unique Concepts + Unlimited Revisions", "Full Brand Book & Typography Hierarchy", "Social Media Kit & All Vector Source Files"],
      },
      enterprise: {
        usd: "$250 – $500+",
        bdt: "৳30,000 – ৳60,000+",
        timeline: "10–14 Days",
        deliverables: ["Complete Brand Identity Ecosystem", "3D Brand Animation & Submarks", "Commercial Trademark Guidelines & Priority Support"],
      },
    },
    "web-design": {
      basic: {
        usd: "$100 – $200",
        bdt: "৳12,000 – ৳24,000",
        timeline: "5–7 Days",
        deliverables: ["Modern High-Converting Landing Page", "Mobile & Tablet Responsive", "Figma Design & Asset Export"],
      },
      standard: {
        usd: "$250 – $500",
        bdt: "৳30,000 – ৳60,000",
        timeline: "10–14 Days",
        deliverables: ["Multi-Page Next.js 16 Web Platform", "100/100 Core Web Vitals Optimization", "CMS Integration & Contact Flow"],
      },
      enterprise: {
        usd: "$500 – $1,200+",
        bdt: "৳60,000 – ৳1,50,000+",
        timeline: "14–21 Days",
        deliverables: ["Custom Full-Stack Web Application", "Interactive WebGL/3D Animations", "Complete Source Code Ownership & Deployment"],
      },
    },
    "package-design": {
      basic: {
        usd: "$80 – $150",
        bdt: "৳10,000 – ৳18,000",
        timeline: "4–6 Days",
        deliverables: ["Single Product Label / Box Concept", "Print-Ready CMYK PDF Dieline", "Realistic 3D Digital Mockup"],
      },
      standard: {
        usd: "$150 – $300",
        bdt: "৳18,000 – ৳36,000",
        timeline: "7–10 Days",
        deliverables: ["Full Product Series Packaging", "Multiple Flavor/Variant Labels", "Print Production Specs & Master Vectors"],
      },
      enterprise: {
        usd: "$300 – $600+",
        bdt: "৳36,000 – ৳75,000+",
        timeline: "10–14 Days",
        deliverables: ["Complete Retail Shelf Identity", "Custom Structural Box Die-Cuts", "E-commerce 3D Renders & Ad Assets"],
      },
    },
    "social-media": {
      basic: {
        usd: "$50 – $100",
        bdt: "৳6,000 – ৳12,000",
        timeline: "3–5 Days",
        deliverables: ["6 High-Impact Social Creatives", "Feed & Story Aspect Ratios", "Editable Figma Templates"],
      },
      standard: {
        usd: "$100 – $200",
        bdt: "৳12,000 – ৳24,000",
        timeline: "7–10 Days",
        deliverables: ["15 Campaign Graphics & Ad Banners", "Complete Brand Aesthetic Grid Kit", "Highlight Covers & Promotional Assets"],
      },
      enterprise: {
        usd: "$200 – $400+",
        bdt: "৳24,000 – ৳50,000+",
        timeline: "Monthly Sprint",
        deliverables: ["Full Monthly Creative Production (30 Assets)", "Animated Video Reels & Carousels", "Brand Guidelines for In-House Marketing"],
      },
    },
    "motion-video": {
      basic: {
        usd: "$80 – $150",
        bdt: "৳10,000 – ৳18,000",
        timeline: "3–5 Days",
        deliverables: ["2D Logo Reveal Animation", "Full HD 1080p Export", "Sound Effects & Audio Sync"],
      },
      standard: {
        usd: "$150 – $300",
        bdt: "৳18,000 – ৳36,000",
        timeline: "5–8 Days",
        deliverables: ["Cinematic 3D Animated Logo Intro", "4K 60fps Alpha Transparent File", "Custom Licensed Sound Design"],
      },
      enterprise: {
        usd: "$300 – $600+",
        bdt: "৳36,000 – ৳75,000+",
        timeline: "10–14 Days",
        deliverables: ["Complete 3D Commercial Product Video", "Kinetic Typography & Social Cuts", "Full Source Project Files"],
      },
    },
    "seo-growth": {
      basic: {
        usd: "$100 – $200",
        bdt: "৳12,000 – ৳24,000",
        timeline: "5–7 Days",
        deliverables: ["Full Technical SEO & Speed Audit", "On-Page Metadata & Keyword Map", "Google Search Console Optimization"],
      },
      standard: {
        usd: "$200 – $400",
        bdt: "৳24,000 – ৳50,000",
        timeline: "Monthly",
        deliverables: ["Comprehensive Keyword Ranking Strategy", "Content Architecture & Internal Linking", "Structured Schema Markup & Backlink Plan"],
      },
      enterprise: {
        usd: "$400 – $800+",
        bdt: "৳50,000 – ৳1,00,000+",
        timeline: "Quarterly",
        deliverables: ["Full Organic Revenue & Growth Sprint", "Competitor Keyword Hijack Plan", "Monthly Performance & Ranking Telemetry"],
      },
    },
  };

  const activeServiceObj = services.find((s) => s.id === selectedService) || services[0];
  const activePlan = pricingMatrix[selectedService]?.[selectedTier] || pricingMatrix["logo-design"].standard;
  const priceDisplay = currency === "USD" ? activePlan.usd : activePlan.bdt;

  const handleClaim = () => {
    const summary = `Estimated Scope: ${activeServiceObj.title} (${selectedTier.toUpperCase()} Tier) | Investment Range: ${priceDisplay} (${currency}) | Timeline: ${activePlan.timeline}`;
    onEstimateSubmit(activeServiceObj.title, summary);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#081330] via-[#06102B] to-[#081330] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1000px] h-[450px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.25) 0%, rgba(255, 133, 0, 0.12) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
            Calculate Your Scope <br />
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              In Just 2 Clicks.
            </span>
          </h2>

          <p className="font-sherika mt-3 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            Select a capability and tier to see an honest investment range with zero hidden fees.
          </p>
        </div>

        {/* Clean Bento Estimator Container */}
        <div className="rounded-3xl bg-[#0C1E4E]/70 border border-[#2651B9]/30 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Top Bar: Currency Switcher */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 flex-wrap gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              1. Choose Capability & Currency:
            </span>

            {/* Currency Pill Switch */}
            <div className="flex items-center p-1 rounded-xl bg-[#081330] border border-[#2651B9]/35">
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-[#FF8500] text-white shadow-md shadow-orange-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>USD ($)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency("BDT")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === "BDT"
                    ? "bg-[#2651B9] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>BDT (৳)</span>
              </button>
            </div>
          </div>

          {/* Service Buttons: 6 clean pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-8">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id)}
                className={`flex flex-col sm:flex-row items-center gap-2 p-3 rounded-2xl border text-center sm:text-left transition-all duration-200 cursor-pointer ${
                  selectedService === s.id
                    ? "bg-[#FF8500]/15 border-[#FF8500] text-white shadow-md ring-1 ring-[#FF8500]/40"
                    : "bg-[#081330]/60 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <span className="text-xl">{s.icon}</span>
                <span className="text-xs font-bold leading-tight line-clamp-2">{s.title}</span>
              </button>
            ))}
          </div>

          {/* 2-Column Split: Tier Selector (Left) & Result Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: 3 Tier Cards */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                2. Select Scope Tier:
              </span>

              {[
                { id: "basic" as const, title: "Starter Launch", tag: "Essential Assets" },
                { id: "standard" as const, title: "Standard Growth", tag: "Most Popular — Full Identity" },
                { id: "enterprise" as const, title: "Enterprise Custom", tag: "Bespoke & 3D Motion" },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    selectedTier === tier.id
                      ? "bg-[#2651B9]/25 border-[#3B82F6] text-white shadow-lg ring-1 ring-[#3B82F6]/50"
                      : "bg-[#081330]/60 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="text-sm font-extrabold text-white">{tier.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{tier.tag}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                    selectedTier === tier.id ? "bg-[#FF8500] border-[#FF8500]" : "border-slate-500"
                  }`}>
                    {selectedTier === tier.id && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Clean Live Price & Deliverables Card */}
            <div className="lg:col-span-6 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#081330] to-[#0A1A46] border border-[#2651B9]/40 flex flex-col justify-between shadow-xl">
              <div>
                {/* Header with Timeline */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-[#FFA133] font-bold">
                    {activeServiceObj.title}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono font-medium">
                    ⚡ {activePlan.timeline}
                  </span>
                </div>

                {/* Price Display */}
                <div className="my-5">
                  <span className="text-xs text-slate-400 block mb-1">Target Investment Range:</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-agency tracking-tight">
                    {priceDisplay}
                  </div>
                </div>

                {/* Deliverables: 3 crisp bullet points */}
                <div className="py-4 border-t border-white/10 space-y-2">
                  {activePlan.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Line */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                  <span>100% Vector IP Ownership • Unlimited Revisions</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <GsapMagneticButton
                  onClick={handleClaim}
                  variant="primary"
                  strength={0.25}
                  className="w-full py-3.5 px-6 !bg-gradient-to-r !from-[#FF8500] !via-[#FFA229] !to-[#FF8500] !text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
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
