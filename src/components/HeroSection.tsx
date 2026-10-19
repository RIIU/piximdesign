"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Globe, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { RotatingDotOrbit } from "./RotatingDotOrbit";
import { RotatingTrustBadge } from "./RotatingTrustBadge";

interface HeroSectionProps {
  onOpenContact?: () => void;
}

const CELESTIAL_STARS = [
  { top: "10%", left: "12%", size: 1.5, delay: "0s", duration: "3.2s" },
  { top: "16%", left: "84%", size: 2, delay: "1.1s", duration: "4.5s" },
  { top: "24%", left: "36%", size: 1, delay: "0.5s", duration: "2.8s" },
  { top: "8%", left: "64%", size: 1.5, delay: "2.3s", duration: "3.9s" },
  { top: "32%", left: "90%", size: 2.5, delay: "1.7s", duration: "5.1s" },
  { top: "40%", left: "6%", size: 1, delay: "0.8s", duration: "3.4s" },
  { top: "48%", left: "20%", size: 1.5, delay: "2.8s", duration: "4.2s" },
  { top: "14%", left: "46%", size: 2, delay: "1.4s", duration: "3.6s" },
  { top: "60%", left: "94%", size: 1.5, delay: "0.2s", duration: "4.8s" },
  { top: "26%", left: "70%", size: 1, delay: "3.1s", duration: "3.1s" },
  { top: "6%", left: "26%", size: 2, delay: "2.0s", duration: "4.0s" },
  { top: "44%", left: "80%", size: 1.5, delay: "1.9s", duration: "3.7s" },
  { top: "66%", left: "12%", size: 1, delay: "0.9s", duration: "4.4s" },
  { top: "54%", left: "62%", size: 2, delay: "2.5s", duration: "5.2s" },
  { top: "20%", left: "96%", size: 1.5, delay: "1.2s", duration: "3.3s" },
  { top: "36%", left: "28%", size: 1, delay: "3.5s", duration: "4.1s" },
  { top: "70%", left: "40%", size: 1.5, delay: "2.1s", duration: "3.8s" },
  { top: "78%", left: "86%", size: 2, delay: "0.7s", duration: "4.6s" },
  { top: "12%", left: "5%", size: 1.5, delay: "1.6s", duration: "3.5s" },
  { top: "58%", left: "4%", size: 1, delay: "2.9s", duration: "4.9s" },
  { top: "82%", left: "24%", size: 1.5, delay: "1.8s", duration: "3.9s" },
  { top: "75%", left: "68%", size: 1, delay: "0.4s", duration: "4.3s" },
  { top: "30%", left: "52%", size: 2, delay: "2.7s", duration: "4.7s" },
  { top: "64%", left: "50%", size: 1.5, delay: "1.3s", duration: "3.6s" },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = async () => {
    try {
      const confettiModule = await import("canvas-confetti");
      const confetti = confettiModule.default || confettiModule;
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#2563eb", "#38bdf8", "#ff7a00", "#ffffff"],
      });
    } catch {}
    onOpenContact?.();
  };

  // Simple staggered entrance with clearProps to avoid animation getting stuck hidden
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", {
        y: 12,
        opacity: 0,
        duration: 0.35,
        clearProps: "all",
      })
        .from(
          ".hero-pills span",
          {
            y: 8,
            opacity: 0,
            duration: 0.25,
            stagger: 0.03,
            clearProps: "all",
          },
          "-=0.2"
        )
        .from(
          ".hero-heading",
          {
            y: 16,
            opacity: 0,
            duration: 0.4,
            clearProps: "all",
          },
          "-=0.15"
        )
        .from(
          ".hero-desc",
          {
            y: 10,
            opacity: 0,
            duration: 0.35,
            clearProps: "all",
          },
          "-=0.25"
        )
        .from(
          ".hero-ctas > *",
          {
            y: 12,
            opacity: 0,
            duration: 0.35,
            stagger: 0.05,
            clearProps: "all",
          },
          "-=0.2"
        )
        .from(
          ".hero-trust",
          {
            y: 12,
            opacity: 0,
            duration: 0.35,
            clearProps: "all",
          },
          "-=0.2"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full flex flex-col items-center justify-start sm:justify-center pt-[74px] sm:pt-24 md:pt-32 pb-4 sm:pb-8 md:pb-14 overflow-hidden bg-[#081330] min-h-0 sm:min-h-[85vh] lg:min-h-[92vh]"
    >
      {/* ── Peekly-Style Atmospheric Aurora Sky Hero Background (Using Pixim Brand Colors) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Layer 1: Electric Cyan & Deep Royal Blue Aurora Ribbon */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[130vw] md:w-[1300px] h-[450px] md:h-[850px] rounded-full blur-2xl md:blur-[110px] animate-aurora-1 opacity-75 md:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(38, 81, 185, 0.45) 0%, rgba(59, 130, 246, 0.3) 35%, rgba(56, 189, 248, 0.16) 55%, transparent 75%)",
          }}
        />

        {/* Layer 2: Radiant Pixim Orange / Amber Ambient Flare */}
        <div
          className="absolute top-1/4 -right-1/4 w-[120vw] md:w-[1200px] h-[400px] md:h-[800px] rounded-full blur-2xl md:blur-[100px] animate-aurora-2 opacity-75 md:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 60% 45%, rgba(255, 133, 0, 0.34) 0%, rgba(255, 162, 41, 0.2) 38%, rgba(251, 191, 36, 0.08) 58%, transparent 75%)",
          }}
        />

        {/* Layer 3: Deep Midnight Indigo Core Aurora */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[110vw] md:w-[1100px] h-[360px] md:h-[700px] rounded-full blur-2xl md:blur-[120px] animate-aurora-3 opacity-65 md:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, rgba(30, 58, 138, 0.4) 0%, rgba(38, 81, 185, 0.24) 40%, rgba(8, 19, 48, 0.12) 65%, transparent 80%)",
          }}
        />

        {/* Layer 4: Diagonal Atmospheric Sweeping Light Beam */}
        <div
          className="absolute -top-1/3 left-1/4 w-[200%] h-[180%] blur-3xl md:blur-[80px] animate-aurora-beam pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(59, 130, 246, 0.16) 48%, rgba(255, 133, 0, 0.12) 54%, transparent 72%)",
          }}
        />

        {/* Layer 5: Celestial Twinkling Starfield */}
        <div className="absolute inset-0 pointer-events-none">
          {CELESTIAL_STARS.map((star, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `celestial-twinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade into #081330 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 md:h-44 bg-gradient-to-t from-[#081330] via-[#081330]/85 to-transparent pointer-events-none z-[2]" />

      {/* ── Foreground Hero Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Peekly-Style Authentic Expanding Dot Matrix Ripple Animation */}
        <RotatingDotOrbit />

        {/* MZ Media-Style Rotating Trust Badge (with Pixim Brand Content) */}
        <div className="hero-badge pb-2 sm:pb-3 md:pb-5">
          <RotatingTrustBadge onClick={onOpenContact} />
        </div>

        {/* Service Pill Tags */}
        <div className="hero-pills flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pb-2 sm:pb-3.5 md:pb-6">
          {["Branding", "Web Design", "Digital Marketing"].map(
            (tag) => (
              <span
                key={tag}
                className="text-white/85 text-[11px] sm:text-xs md:text-sm font-medium py-0.5 sm:py-1.5 px-2.5 sm:px-4 rounded-full border border-sky-400/20 bg-[#0C1E4E]/40 backdrop-blur-md shadow-xs leading-snug whitespace-nowrap"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Main Heading */}
        <h1 className="hero-heading font-agency font-black text-[34px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] tracking-tight text-white leading-[1.04] max-w-5xl px-3 sm:px-2">
          One Stop Solution for{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#38bdf8] via-[#FF8500] to-[#FF8500] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(255,133,0,0.35)]">
            Branding
          </span>
        </h1>

        {/* Description */}
        <p className="hero-desc font-sherika mt-2.5 sm:mt-4 text-[13px] sm:text-base md:text-lg lg:text-xl text-slate-200/85 max-w-md sm:max-w-2xl lg:max-w-3xl font-normal leading-[1.55] px-4 sm:px-2">
          Pixim Design is a highly specialized branding &amp; creative agency that
          brings your bold, disruptive idea to life. We craft iconic brand
          identities, high-performing websites, and stunning visuals for
          ambitious founders and market leaders.
        </p>

        {/* Dual CTA Buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-4 sm:mt-7 w-full max-w-[320px] sm:max-w-none px-3 sm:px-0 z-20">
          {/* Primary CTA */}
          <button
            onClick={handleCtaClick}
            className="group relative overflow-hidden cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-7 md:px-8 py-3.5 md:py-4 rounded-xl bg-[#FF8500] text-[#081330] font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:bg-[#FFa030] active:scale-[0.97] shadow-[0_8px_25px_-4px_rgba(255,133,0,0.45)]"
          >
            {/* Arrow circle icon */}
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#081330]/90 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-[#FF8500] transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span>Get Your Free Quote</span>
          </button>

          {/* Secondary CTA */}
          <Link
            href="/services"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3.5 md:py-4 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-sm text-white font-semibold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#081330] active:scale-[0.97]"
          >
            <span>Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Trust Strip (Mobile: Sleek compact row) */}
        <div className="hero-trust flex md:hidden items-center justify-between mt-4 w-full max-w-[340px] px-3 py-2 rounded-xl border border-[#3B82F6]/20 bg-[#0C1E4E]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(4,10,28,0.4)] text-[11px] text-white/85 z-20">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">4.9/5.0</span>
            <span className="text-white/60">(500+)</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#FF8500] shrink-0" />
            <span className="font-medium text-white/95">500+ Brands</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#38BDF8] shrink-0" />
            <span className="font-medium text-white/95">100% Vector IP</span>
          </div>
        </div>


        {/* Trust Strip (Desktop: Full 3-column card) */}
        <div className="hero-trust hidden md:block mt-10 md:mt-12 w-full max-w-4xl px-2 z-20">
          <div className="w-full rounded-2xl border border-[#3B82F6]/15 bg-[#0C1E4E]/50 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(4,10,28,0.4)] px-5 py-4">
            <div className="grid grid-cols-3 gap-6 divide-x divide-white/10">
              {/* Rating */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <div className="flex text-amber-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white text-sm">
                  4.9 / 5.0
                </span>
                <span className="text-white/60 text-sm">
                  (500+ Reviews)
                </span>
              </div>

              {/* Brands count */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <Globe className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
                <span className="text-white font-medium text-sm">
                  500+ Brands Worldwide
                </span>
              </div>

              {/* IP Ownership */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <span className="text-white font-medium text-sm">
                  100% Vector IP Ownership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
