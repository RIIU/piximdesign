"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { GsapMagneticButton } from "@/components/animations";
import type { Crumb } from "./types";

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; href: string };
  /** Decorative composition shown on the right on desktop */
  visual: React.ReactNode;
  showTrust?: boolean;
  /** Optional extra content under the CTAs */
  children?: React.ReactNode;
}

/** Split hero shared by every page: copy + CTAs on the left, code-built composition on the right. */
export const PageHero: React.FC<PageHeroProps> = ({
  crumbs,
  eyebrow,
  title,
  description,
  primary,
  secondary,
  visual,
  showTrust = true,
  children,
}) => (
  <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* Ambient glows */}
    <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.25),transparent_70%)] pointer-events-none" />
    <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.15),transparent_70%)] pointer-events-none" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
      {/* Copy */}
      <div className="lg:col-span-7">
        <nav aria-label="Breadcrumb" className="hero-reveal mb-5">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#FFA133] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-300" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <span className="hero-reveal inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/35 font-mono font-bold">
          {eyebrow}
        </span>

        <h1 className="hero-reveal mt-5 font-agency text-[34px] sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.05]">
          {title}
        </h1>

        <p className="hero-reveal mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">{description}</p>

        <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3.5">
          <GsapMagneticButton
            onClick={primary.onClick}
            variant="primary"
            strength={0.25}
            className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] !text-white shadow-lg shadow-orange-500/25"
          >
            <span>{primary.label}</span>
            <ArrowRight className="w-4 h-4" />
          </GsapMagneticButton>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.06] text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/[0.1] transition-colors"
            >
              {secondary.label}
            </Link>
          )}
        </div>

        {children}

        {showTrust && (
          <div className="hero-reveal mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
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
        )}
      </div>

      {/* Composition */}
      <div className="hero-reveal lg:col-span-5" aria-hidden>
        {visual}
      </div>
    </div>
  </section>
);
