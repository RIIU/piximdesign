"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, FileText, Star } from "lucide-react";
import { GsapMagneticButton } from "@/components/animations";
import { GradientText, SampleMark, Wordmark } from "./shared";

interface BrandingHeroProps {
  onStart: () => void;
}

const HERO_PALETTE = [
  { hex: "#FF8500", text: "text-white" },
  { hex: "#FFA133", text: "text-white" },
  { hex: "#2651B9", text: "text-white" },
  { hex: "#081330", text: "text-slate-300" },
  { hex: "#F8FAFC", text: "text-slate-700" },
];

export const BrandingHero: React.FC<BrandingHeroProps> = ({ onStart }) => (
  <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* Ambient glows */}
    <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.25),transparent_70%)] pointer-events-none" />
    <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.15),transparent_70%)] pointer-events-none" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
      {/* Copy */}
      <div className="lg:col-span-7">
        <nav aria-label="Breadcrumb" className="brand-hero-item flex items-center gap-2 text-xs text-slate-500 mb-5">
          <Link href="/" className="hover:text-[#FFA133] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="hover:text-[#FFA133] transition-colors">Services</Link>
          <span aria-hidden>/</span>
          <span className="text-slate-300">Branding</span>
        </nav>

        <span className="brand-hero-item inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/35 font-mono font-bold">
          Logo & Brand Identity Design
        </span>

        <h1 className="brand-hero-item mt-5 font-agency text-[34px] sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.05]">
          Branding That Makes Your Business <GradientText>Unforgettable</GradientText>
        </h1>

        <p className="brand-hero-item mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
          We craft strategic logos and complete brand identities that build trust at first glance, set you apart from
          competitors and stay consistent across every touchpoint.
        </p>

        <div className="brand-hero-item mt-8 flex flex-wrap items-center gap-3.5">
          <GsapMagneticButton
            onClick={onStart}
            variant="primary"
            strength={0.25}
            className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] !text-white shadow-lg shadow-orange-500/25"
          >
            <span>Start Your Brand</span>
            <ArrowRight className="w-4 h-4" />
          </GsapMagneticButton>
          <Link
            href="#branding-packages"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.06] text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/[0.1] transition-colors"
          >
            View Packages
          </Link>
        </div>

        {/* Trust row */}
        <div className="brand-hero-item mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex text-[#FFA133]" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-slate-300">
              <strong className="text-white">4.9</strong> client rating
            </span>
          </div>
          <div className="text-sm text-slate-300">
            <strong className="text-white">500+</strong> brands launched
          </div>
          <div className="text-sm text-slate-300">
            <strong className="text-white">8+</strong> years experience
          </div>
        </div>
      </div>

      {/* Brand kit composition */}
      <div className="brand-hero-item lg:col-span-5" aria-hidden>
        <div className="relative">
          <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
            {/* Primary mark */}
            <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-5 sm:p-6 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(255,133,0,0.5)]">
              <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-dashed border-white/30" />
              <div className="absolute -right-2 -top-2 w-28 h-28 rounded-full border border-white/20" />
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/75">Primary mark</span>
                <span className="text-[10px] font-mono text-white/60">01</span>
              </div>
              <div className="relative flex items-center gap-3">
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shadow-md">
                  <SampleMark className="w-7 h-7 sm:w-8 sm:h-8" color="#FF8500" />
                </span>
                <Wordmark className="text-2xl sm:text-3xl text-white" />
              </div>
            </div>

            {/* Typography */}
            <div className="col-span-2 rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90 p-4 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Type</span>
              <span className="font-agency text-5xl font-extrabold text-white leading-none">Aa</span>
              <span className="text-[10px] text-slate-400 leading-tight">Agency · Jakarta</span>
            </div>

            {/* Palette */}
            <div className="col-span-3 rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90 p-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Palette</span>
              <div className="mt-3 flex gap-1.5 sm:gap-2">
                {HERO_PALETTE.map((c) => (
                  <span
                    key={c.hex}
                    className="flex-1 h-11 rounded-xl border border-white/10 flex items-end justify-center pb-1"
                    style={{ background: c.hex }}
                  >
                    <span className={`hidden sm:block text-[7px] font-mono ${c.text}`}>{c.hex.slice(1)}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Business card */}
            <div className="col-span-3 rounded-3xl border border-[#2651B9]/35 bg-gradient-to-br from-[#0F2260] to-[#081330] p-4 flex flex-col justify-between rotate-[-3deg] shadow-xl">
              <SampleMark className="w-7 h-7" color="#FF8500" />
              <div>
                <div className="h-1.5 w-20 rounded bg-white/80" />
                <div className="mt-1.5 h-1.5 w-14 rounded bg-white/30" />
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <div className="animate-float-y absolute right-3 -top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#0C1E4E]/90 backdrop-blur-md px-3 py-1.5 shadow-lg">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
            </span>
            <span className="text-[11px] font-semibold text-white">Vector ready</span>
          </div>
          <div className="animate-float-y [animation-delay:1.2s] absolute right-2 sm:-right-4 -bottom-5 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#0C1E4E]/90 backdrop-blur-md px-3 py-2 shadow-lg">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FF8500]/15 border border-[#FF8500]/35">
              <FileText className="w-3.5 h-3.5 text-[#FFA133]" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold text-white">brand-guidelines.pdf</span>
              <span className="block text-[10px] text-slate-400">24 pages · ready</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
