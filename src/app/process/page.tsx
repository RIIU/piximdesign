"use client";

import React, { useState } from "react";
import { PROCESS_STEPS } from "@/data/agencyData";
import { CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { GsapDrawSvg, GsapMagneticButton, GsapDrawPath, GsapReviewsInfiniteSlider } from "@/components/animations";

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { openContact } = useContactModal();

  const stepIcons = [
    // Step 1: Target / Discovery
    <svg key="s1" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-400">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    // Step 2: Pen Tool / Crafting
    <svg key="s2" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400">
      <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 13L9 4L6 7L15 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 22L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    // Step 3: Polish / Inspection
    <svg key="s3" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-purple-400">
      <path d="M20 7L10 17L5 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    </svg>,
    // Step 4: Rocket / Launch
    <svg key="s4" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-400">
      <path d="M4.5 16.5C3 15 2 12 2 12C5 12 8 13 9.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2C12 2 20 4 22 12C18 12 15 11 13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>,
  ];

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF8500]/10 via-[#2651B9]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
          Our 4-Step Working Process <br />
          <span className="relative inline-block bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133] bg-clip-text text-transparent">
            From Idea to Market Handover
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
          From first strategy brief to final master vector files, our battle-tested workflow guarantees transparency, speed, and 100% quality delivery.
        </p>
      </div>

      {/* Interactive GSAP "Draw A Path" Visual Roadmap */}
      <div className="mb-16">
        <GsapDrawPath />
      </div>

      {/* Step Switcher Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-12">
        {PROCESS_STEPS.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(idx)}
            className={`group p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
              activeStep === idx
                ? "bg-white dark:bg-[#111827] border-[#FF8500] shadow-md ring-1 ring-[#FF8500]/30 -translate-y-1"
                : "bg-white/80 dark:bg-[#111827]/80 border-[#2651B9]/15 dark:border-[#2651B9]/25 hover:border-[#2651B9]/35 dark:hover:border-[#2651B9]/50 hover:bg-white dark:hover:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC]"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-3">
              <div className="flex items-center gap-2">
                <span className={activeStep === idx ? "text-[#FF8500]" : "text-slate-400"}>
                  {stepIcons[idx]}
                </span>
                <span className={activeStep === idx ? "text-[#C25E00] dark:text-[#FFA133] font-bold" : "text-slate-500 dark:text-slate-400"}>
                  PHASE {s.step}
                </span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-[#2651B9]/15 dark:border-[#2651B9]/25 font-mono">
                {s.timeframe}
              </span>
            </div>

            <div className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#FF8500] transition-colors">
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 shadow-[0_16px_48px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.5)] overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF8500]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Number & Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133] text-xs font-mono font-bold mb-4">
              <span>Phase {PROCESS_STEPS[activeStep].step}</span>
              <span>•</span>
              <span>{PROCESS_STEPS[activeStep].timeframe}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
              {PROCESS_STEPS[activeStep].title}
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {PROCESS_STEPS[activeStep].description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1))}
                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-[#FF8500]/50 text-xs text-[#0F172A] dark:text-[#F8FAFC] border border-slate-200 dark:border-slate-700 shadow-sm transition-colors cursor-pointer"
              >
                ← Previous Phase
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0))}
                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-[#FF8500]/50 text-xs text-[#0F172A] dark:text-[#F8FAFC] border border-slate-200 dark:border-slate-700 shadow-sm transition-colors cursor-pointer"
              >
                Next Phase →
              </button>
            </div>
          </div>

          {/* Right Column: Tangible Deliverables */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-[#2651B9]/15 dark:border-[#2651B9]/25">
            <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Tangible Deliverables & Guarantees
            </h3>

            <div className="flex flex-col gap-3">
              {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-[#0D1322] border border-[#2651B9]/15 dark:border-[#2651B9]/25 text-xs sm:text-sm text-slate-800 dark:text-slate-200 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF8500] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Our Process Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)]">
          <div className="p-2.5 rounded-xl bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133] w-fit mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">Guaranteed Timelines</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            We operate in structured weekly sprints with fixed milestone deadlines so your launch never slips.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)]">
          <div className="p-2.5 rounded-xl bg-[#2651B9]/10 dark:bg-[#2651B9]/20 border border-[#2651B9]/20 dark:border-[#2651B9]/40 text-[#2651B9] dark:text-[#60A5FA] w-fit mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">100% Quality Delivery</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            You receive all production master source files: vector SVGs, Figma components, Next.js components.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)]">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 w-fit mb-4">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">30-Day Post Warranty</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            We don&apos;t vanish after launch. Enjoy 30 days of complimentary minor adjustments and support.
          </p>
        </div>
      </div>

      {/* Infinite Review Card Slider */}
      <div className="mb-20">
        <GsapReviewsInfiniteSlider
          title="What Clients Say About Our Agile Process"
          subtitle="PROCESS INTEGRITY & FEEDBACK"
          speed={38}
        />
      </div>

      {/* CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-xl dark:shadow-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          Ready to kick off Phase 01 for your brand?
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Start with a 30-minute discovery session. We will listen to your ideas and map out a step-by-step roadmap.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GsapMagneticButton
            onClick={() => openContact()}
            variant="primary"
            strength={0.3}
            className="px-8 py-3.5 !text-white font-bold text-sm shadow-xl"
          >
            <span>Start Your Phase 01 Discovery</span>
          </GsapMagneticButton>
          <GsapMagneticButton
            href="/pricing"
            variant="secondary"
            className="px-6 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <span>View Pricing & Plans →</span>
          </GsapMagneticButton>
        </div>
      </div>
    </main>
  );
}
