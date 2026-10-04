"use client";

import React from "react";
import { Zap, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface WhyPiximSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

export const WhyPiximSection: React.FC<WhyPiximSectionProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6 text-[#FF8500]" />,
      iconBg: "bg-[#FF8500]/15 border-[#FF8500]/30",
      tag: "Sprint Velocity",
      title: "7–14 Day Delivery",
      description: "No 3-month agency delays. Focused, high-speed sprints take your project from concept to live in days.",
      pill: "4x Faster Than Traditional Agencies",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#60A5FA]" />,
      iconBg: "bg-[#2651B9]/20 border-[#2651B9]/40",
      tag: "Elite Craftsmanship",
      title: "Senior Directors Only",
      description: "Direct partnership with experienced design directors. Your project is never passed to junior interns.",
      pill: "8+ Years Craft & Founder-Led",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
      tag: "Complete Freedom",
      title: "100% Vector IP Ownership",
      description: "All master vector source files (Figma, AI, SVG, Next.js code) and full commercial rights belong to you.",
      pill: "Zero Retainer Buyouts",
    },
  ];

  const quickContrasts = [
    "7–14 Day Delivery (vs 3–6 Months Typical)",
    "Senior Directors (vs Junior Hand-offs)",
    "100% Full IP Transfer (vs Retainer Lock-in)",
    "Unlimited Iterations (Until 100% In Love)",
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#081330] via-[#050D21] to-[#081330] overflow-hidden">
      {/* Background ambient radial lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[900px] h-[400px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.25) 0%, rgba(255, 133, 0, 0.1) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2651B9]/15 border border-[#2651B9]/35 text-[#60A5FA] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-pulse" />
            <span>The Pixim Standard</span>
          </div>

          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.08]">
            Built For Speed. <br />
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              Designed To Convert.
            </span>
          </h2>

          <p className="font-sherika mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            We stripped away agency bureaucracy, slow meetings, and junior hand-offs. Just senior creative velocity.
          </p>
        </div>

        {/* 3 Clean Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0C1E4E]/60 hover:bg-[#0C1E4E]/90 border border-white/10 hover:border-[#FF8500]/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(255,133,0,0.2)]"
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                    {pillar.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-agency text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFA133] shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {pillar.pill}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sleek Minimalist Comparison Bar */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-slate-300 font-medium">
          {quickContrasts.map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
              <span className="font-semibold text-white">{text}</span>
            </div>
          ))}
        </div>

        {/* Centered Clean CTA */}
        <div className="mt-8 flex justify-center">
          <GsapMagneticButton
            onClick={() => onOpenContact?.("All Capabilities", "Interested in starting a project with Pixim")}
            variant="primary"
            strength={0.25}
            className="px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !text-white shadow-xl shadow-orange-500/20"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </GsapMagneticButton>
        </div>
      </div>
    </section>
  );
};

export default WhyPiximSection;
