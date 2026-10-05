"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { GsapMagneticButton } from "@/components/animations";
import type { ServiceConfig } from "../types";

interface ServiceHeroProps {
  shortName: string;
  hero: ServiceConfig["hero"];
  onStart: () => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ shortName, hero, onStart }) => (
  <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* Ambient glows */}
    <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.25),transparent_70%)] pointer-events-none" />
    <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.15),transparent_70%)] pointer-events-none" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
      {/* Copy */}
      <div className="lg:col-span-7">
        <nav aria-label="Breadcrumb" className="svc-hero-item flex items-center gap-2 text-xs text-slate-500 mb-5">
          <Link href="/" className="hover:text-[#FFA133] transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/services" className="hover:text-[#FFA133] transition-colors">Services</Link>
          <span aria-hidden>/</span>
          <span className="text-slate-300">{shortName}</span>
        </nav>

        <span className="svc-hero-item inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/35 font-mono font-bold">
          {hero.eyebrow}
        </span>

        <h1 className="svc-hero-item mt-5 font-agency text-[34px] sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.05]">
          {hero.title}
        </h1>

        <p className="svc-hero-item mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">{hero.description}</p>

        <div className="svc-hero-item mt-8 flex flex-wrap items-center gap-3.5">
          <GsapMagneticButton
            onClick={onStart}
            variant="primary"
            strength={0.25}
            className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] !text-white shadow-lg shadow-orange-500/25"
          >
            <span>{hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </GsapMagneticButton>
          <Link
            href="#service-packages"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.06] text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/[0.1] transition-colors"
          >
            View Packages
          </Link>
        </div>

        {/* Trust row */}
        <div className="svc-hero-item mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
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

      {/* Service-specific composition */}
      <div className="svc-hero-item lg:col-span-5" aria-hidden>
        {hero.visual}
      </div>
    </div>
  </section>
);
