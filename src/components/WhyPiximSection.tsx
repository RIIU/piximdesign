"use client";

import React from "react";
import { Check, X, Sparkles, Zap, ShieldCheck, Clock, ArrowRight, Lock, Award, HeartHandshake } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface WhyPiximSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

export const WhyPiximSection: React.FC<WhyPiximSectionProps> = ({ onOpenContact }) => {
  const comparisonItems = [
    {
      feature: "Turnaround Time",
      traditional: "3 to 6 months of endless delays",
      freelancer: "Unpredictable & high ghosting risk",
      pixim: "7 to 14 days agile sprint delivery",
      piximHighlight: true,
    },
    {
      feature: "Creative Talent",
      traditional: "Bait & switch: junior interns do the work",
      freelancer: "Variable skills, no quality guarantee",
      pixim: "Senior Design Directors & founders only",
      piximHighlight: true,
    },
    {
      feature: "Master Vector IP & Rights",
      traditional: "Held hostage behind high buyout fees",
      freelancer: "Uncertain licensing & stolen asset risks",
      pixim: "100% full commercial IP & source files",
      piximHighlight: true,
    },
    {
      feature: "Strategic Focus",
      traditional: "Cookie-cutter templates & awards vanity",
      freelancer: "Only visual styling, zero business strategy",
      pixim: "Engineered for conversion, sales & scaling",
      piximHighlight: true,
    },
    {
      feature: "Revision Policy",
      traditional: "Extra charges for every minor change",
      freelancer: "Ghosting after 1-2 minor rounds",
      pixim: "Unlimited iterations until 100% in love",
      piximHighlight: true,
    },
    {
      feature: "Communication",
      traditional: "Layered account managers & slow emails",
      freelancer: "Sporadic messages across random apps",
      pixim: "Direct dedicated Slack / WhatsApp channel",
      piximHighlight: true,
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-28 overflow-hidden bg-gradient-to-b from-[#081330] via-[#050D21] to-[#081330]">
      {/* Ambient background glows in Pixim Royal Blue & Brand Orange */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1000px] h-[500px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.3) 0%, rgba(255, 133, 0, 0.12) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2651B9]/15 border border-[#2651B9]/35 text-[#60A5FA] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-pulse" />
            <span>The Pixim Standard</span>
          </div>

          <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
            Built Different From <br />
            <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
              Traditional Agencies & Freelancers.
            </span>
          </h2>

          <p className="font-sherika mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Traditional agencies are bloated, expensive, and pass your project to interns. Freelancer platforms are a gamble. Pixim gives you world-class senior direction at startup speed.
          </p>
        </div>

        {/* 3-Column Comparison Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Traditional Agencies */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#07132D]/75 border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-white/20">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                    The Old Model
                  </span>
                  <h3 className="font-agency text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Traditional Agencies
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
                Heavy overhead, bloated account managers, and endless meetings that drain budget and momentum.
              </p>

              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>3 to 6 month sluggish launch cycles</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Junior hand-offs after signing the deal</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>High monthly retainers & hidden change fees</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Source files locked behind buyout contracts</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Average turnaround: 90 - 180 Days</span>
            </div>
          </div>

          {/* Card 2: Freelancer Platforms */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#07132D]/75 border border-white/10 backdrop-blur-xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-white/20">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">
                    The Risky Model
                  </span>
                  <h3 className="font-agency text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Freelance Platforms
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
                Gambling with unvetted talent on gig marketplaces with zero strategic brand positioning.
              </p>

              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Frequent ghosting & missed deadlines</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Inconsistent quality and copied clip-art</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>No commercial copyright or trademark protection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Zero post-launch support or design systems</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Reliability: Highly variable & uncertain</span>
            </div>
          </div>

          {/* Card 3: Pixim Design Elite Studio (FEATURED HERO CARD) */}
          <div className="lg:col-span-4 relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0C1E4E] to-[#081330] border-2 border-[#FF8500]/60 backdrop-blur-2xl flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(255,133,0,0.3),0_0_40px_rgba(38,81,185,0.25)] ring-1 ring-white/20 transform lg:-translate-y-2">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF8500] via-[#FFA133] to-[#FF8500] text-white text-[10px] font-mono font-black uppercase tracking-widest shadow-lg shadow-orange-500/40 flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3 h-3 fill-white" />
              <span>Recommended For Growth</span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#2651B9]/35 mt-1">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFA133] font-bold block mb-1">
                    The Elite Solution
                  </span>
                  <h3 className="font-agency text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Pixim Design Studio
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF8500] to-[#FFA229] flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                  <Zap className="w-5 h-5 fill-white" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 mt-4 leading-relaxed font-medium">
                Senior director craftsmanship, lightning sprint velocity, and full vector master ownership with zero bureaucracy.
              </p>

              <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">7 to 14 day agile sprint delivery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">Senior Creative Directors execute your work</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">100% full vector IP & source code ownership</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">Engineered for revenue, conversion & speed</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">Unlimited revisions until you are 100% thrilled</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-[#2651B9]/35">
              <GsapMagneticButton
                onClick={() => onOpenContact?.("All Capabilities", "Interested in learning more about the Pixim Advantage")}
                variant="primary"
                strength={0.25}
                className="w-full py-3.5 px-6 !bg-gradient-to-r !from-[#FF8500] !via-[#FFA229] !to-[#FF8500] !text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Start Your Sprint Today</span>
                <ArrowRight className="w-4 h-4" />
              </GsapMagneticButton>
            </div>
          </div>
        </div>

        {/* 4 Trust & Guarantee Badges Strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#2651B9]/20 border border-[#2651B9]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">100% Vector IP</div>
              <div className="text-[11px] text-slate-400">Full commercial ownership</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#FF8500]/20 border border-[#FF8500]/40 flex items-center justify-center text-[#FFA133] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">7-14 Day Delivery</div>
              <div className="text-[11px] text-slate-400">Agile sprints, zero lag</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#2651B9]/20 border border-[#2651B9]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">NDA Protected</div>
              <div className="text-[11px] text-slate-400">Strict client privacy</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#FF8500]/20 border border-[#FF8500]/40 flex items-center justify-center text-[#FFA133] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">500+ Happy Brands</div>
              <div className="text-[11px] text-slate-400">4.9/5.0 Client rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPiximSection;
