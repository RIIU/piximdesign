"use client";

import React from "react";
import { Award, CheckCircle2 } from "lucide-react";
import { AGENCY_STATS } from "@/data/agencyData";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { GsapDrawSvg, GsapMagneticButton, GsapReviewsInfiniteSlider } from "@/components/animations";

export default function AboutPage() {
  const { openContact } = useContactModal();

  const corePillars = [
    {
      title: "Strategic Brand Identity",
      desc: "We don't just design pretty logos. We develop memorable visual identities, typography guidelines, and brand language that command market authority.",
      icon: "🎨",
      highlight: "8+ Years of Vector Craft",
    },
    {
      title: "Next-Gen Web Engineering",
      desc: "Fast, mobile-first websites built with modern frameworks (Next.js 15, React 19, WordPress) optimized for sub-second page loads and Lighthouse 100/100.",
      icon: "⚡",
      highlight: "Sub-Second Performance",
    },
    {
      title: "Retail Packaging & 3D Renders",
      desc: "Print-ready box, label, and pouch packaging with photorealistic 3D mockups that stand out on physical and digital retail shelves.",
      icon: "📦",
      highlight: "100% Print-Ready Die-Cuts",
    },
    {
      title: "Conversion-Focused Growth",
      desc: "Social media campaign graphics, promotional posters, dynamic video teasers, and organic SEO architecture designed to drive conversions.",
      icon: "📈",
      highlight: "Data-Driven ROI",
    },
  ];

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF8500]/15 via-[#2651B9]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.12]">
          Turning Bold Ideas Into <br />
          <span className="relative inline-block bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133] bg-clip-text text-transparent">
            Market-Leading Brands.
            <span className="absolute -bottom-2.5 left-0 w-full pointer-events-none">
              <GsapDrawSvg
                type="swoosh"
                strokeColor="#FF8500"
                strokeWidth={3}
                duration={1.3}
                delay={0.4}
              />
            </span>
          </span>
        </h1>

        <p className="relative z-10 mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We are a premier branding and digital design studio. For over 8 years, we have helped 500+ ambitious founders and businesses build unforgettable brands and high-converting online experiences.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
        {AGENCY_STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] text-center"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">{stat.value}</div>
            <div className="text-sm font-bold text-[#C25E00] dark:text-[#FFA133] mt-1">{stat.label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* Story & Duality Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2651B9]/10 dark:bg-[#2651B9]/25 border border-[#2651B9]/25 dark:border-[#2651B9]/40 text-[#2651B9] dark:text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Our Journey & Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight">
            Where Precision Design Meets <br />
            <span className="text-[#C25E00] dark:text-[#FFA133]">Engineering Excellence.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Founded with a clear mission: to eliminate the frustrating gap between graphic designers who don&apos;t understand code, and web developers who lack design sensibility.
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            At Pixim Design, our team bridges both worlds seamlessly. When we create your logo or product packaging, we ensure it looks stunning in print and digitally. When we engineer your website, we combine pixel-perfect typography with ultra-fast modern infrastructure.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "100% vector master source files delivered (AI, EPS, SVG, Figma, PNG)",
              "Full intellectual property and commercial copyright ownership",
              "Direct collaboration with lead specialists — no bureaucratic middlemen",
              "30-day post-handover warranty and ongoing partner support",
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {corePillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#2651B9]/15 dark:border-[#2651B9]/25 hover:border-[#FF8500]/50 dark:hover:border-[#FF8500]/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] hover:shadow-xl"
            >
              <div className="text-2xl mb-3">{p.icon}</div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C25E00] dark:text-[#FFA133] px-2.5 py-0.5 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/25">
                {p.highlight}
              </span>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-3">{p.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Reviews Infinite Slider */}
      <GsapReviewsInfiniteSlider
        className="mb-24"
        title="Trusted by 500+ High-Growth Brands"
        subtitle="VERIFIED CLIENT VOICES"
        speed={40}
      />

      {/* CTA Banner */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 text-center overflow-hidden shadow-xl">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#2651B9]/10 via-[#FF8500]/10 to-transparent pointer-events-none" />
        <h2 className="relative z-10 text-2xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          Ready to Elevate Your Brand&apos;s Identity?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Schedule a free 30-minute consultation call. We will review your goals and suggest the ideal strategy for your business.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GsapMagneticButton
            onClick={() => openContact()}
            variant="primary"
            strength={0.3}
            className="px-8 py-3.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-sm shadow-md"
          >
            <span>Book Free 30-Min Consultation</span>
          </GsapMagneticButton>
          <GsapMagneticButton
            href="/services"
            variant="secondary"
            className="px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#2651B9]/50 shadow-sm font-medium text-sm transition-colors"
          >
            <span>Explore All Services →</span>
          </GsapMagneticButton>
        </div>
      </div>
    </main>
  );
}
