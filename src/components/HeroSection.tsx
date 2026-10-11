"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, ShieldCheck, Star, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenContact?: () => void;
}

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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: "all",
      })
        .from(
          ".hero-pills span",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            clearProps: "all",
          },
          "-=0.3"
        )
        .from(
          ".hero-heading",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            clearProps: "all",
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".hero-ctas > *",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            clearProps: "all",
          },
          "-=0.3"
        )
        .from(
          ".hero-trust",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
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
      className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-[#081330]"
    >
      {/* ── Background ambient glows ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[110vw] md:w-[1200px] h-[500px] md:h-[750px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.18) 0%, rgba(59, 130, 246, 0.08) 35%, rgba(255, 133, 0, 0.05) 55%, transparent 72%)",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#081330] via-[#081330]/80 to-transparent pointer-events-none z-[2]" />

      {/* ── 3D decorative orb at bottom center (like pixxen's 3D shape) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-[320px] h-[320px] md:w-[420px] md:h-[420px] pointer-events-none z-[2]">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(255, 133, 0, 0.35) 0%, rgba(38, 81, 185, 0.2) 40%, rgba(56, 189, 248, 0.08) 65%, transparent 85%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Foreground Hero Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Studio Badge (like pixxen's green dot + studio name) */}
        <div className="hero-badge flex items-center justify-center gap-2 pb-4 md:pb-5">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF8500]" />
          <p className="text-[#FF8500] text-xs sm:text-sm font-medium uppercase tracking-wider">
            Pixim Design Studio
          </p>
        </div>

        {/* Service Pill Tags (like pixxen's SaaS / Brands / Growing Businesses) */}
        <div className="hero-pills flex flex-wrap justify-center gap-2 pb-5 md:pb-7">
          {["Branding", "Web Design", "Digital Marketing", "Motion Graphics"].map(
            (tag) => (
              <span
                key={tag}
                className="text-white/90 text-xs sm:text-sm md:text-base font-light py-1.5 px-3.5 sm:px-4 rounded-full border border-[#3B82F6]/20 bg-gradient-to-b from-white/[0.06] to-transparent leading-snug"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Main Heading */}
        <h1 className="hero-heading font-agency font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] tracking-tight text-white leading-[1.08] max-w-5xl px-2">
          One Stop Solution for{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#38bdf8] via-[#FF8500] to-[#FF8500] bg-clip-text text-transparent">
            Branding
          </span>
        </h1>

        {/* Description */}
        <p className="hero-desc font-sherika mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl lg:max-w-3xl font-normal leading-[1.55] px-2">
          Pixim Design is a highly specialized branding & creative agency that
          brings your bold, disruptive idea to life. We craft iconic brand
          identities, high-performing websites, and stunning visuals for
          ambitious founders and market leaders.
        </p>

        {/* Dual CTA Buttons (Pixxen-style: primary green + outlined) */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full px-4 sm:px-0 z-20">
          {/* Primary CTA — like pixxen's "Book a Strategy Call" */}
          <button
            onClick={handleCtaClick}
            className="group relative overflow-hidden cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 md:px-8 py-3.5 md:py-4 rounded-xl bg-[#FF8500] text-[#081330] font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:bg-[#FFa030] active:scale-[0.97] shadow-[0_8px_30px_-6px_rgba(255,133,0,0.45)]"
          >
            {/* Arrow circle icon (pixxen-style) */}
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#081330]/90 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-[#FF8500] transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span>Get Your Free Quote</span>
          </button>

          {/* Secondary CTA — outlined (like pixxen's "See Packages") */}
          <a
            href="/services"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3.5 md:py-4 rounded-xl border border-white/25 text-white font-semibold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#081330] active:scale-[0.97]"
          >
            <span>Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100" />
          </a>
        </div>

        {/* Trust Strip — frosted glass with social proof (pixxen-style) */}
        <div className="hero-trust mt-8 sm:mt-10 md:mt-12 w-full max-w-4xl px-2 z-20">
          <div className="rounded-2xl border border-[#3B82F6]/15 bg-[#0C1E4E]/50 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(4,10,28,0.4)] px-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Rating */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
                <div className="flex text-amber-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white text-sm">
                  4.9 / 5.0
                </span>
                <span className="text-white/60 text-xs sm:text-sm">
                  (500+ Reviews)
                </span>
              </div>

              {/* Brands count */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
                <span className="text-white font-medium text-sm">
                  500+ Brands Worldwide
                </span>
              </div>

              {/* IP Ownership */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
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
