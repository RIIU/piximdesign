"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";
import { Sparkles, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { ConcentricOrbitHero } from "./ConcentricOrbitHero";
import { GsapDrawSvg, GsapMagneticButton } from "./animations";

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleQuoteClick = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#2563eb", "#38bdf8", "#ff7a00", "#ffffff"],
    });
    onOpenContact?.();
  };

  // GSAP Entrance and continuous floating animation
  useGSAP(
    () => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title-elem", {
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
      })
        .from(
          ".hero-desc-elem",
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          ".hero-cta-elem",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            scale: 0.95,
          },
          "-=0.6"
        )
        .from(
          ".hero-trust-elem",
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        );

    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-16 pb-10 md:pb-16 overflow-hidden bg-[#090D16]"
    >
      {/* Ambient background glows (GPU-native radial gradients, zero blur cost) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[900px] h-[350px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.08) 0%, rgba(255, 133, 0, 0.05) 35%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-1/3 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(38, 81, 185, 0.06) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #2651b9 1px, transparent 1px), linear-gradient(to bottom, #2651b9 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft radial vignette to preserve central typography legibility */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#090D16]/40 to-[#090D16] pointer-events-none z-10" />

      {/* Foreground Hero Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-3 sm:px-4 text-center flex flex-col items-center"
      >
        <div className="relative w-full flex items-center justify-center">
          <ConcentricOrbitHero>
            <h1 className="hero-title-elem text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.15] max-w-2xl px-2">
              One Stop Solution for{" "}
              <span className="relative inline-block bg-gradient-to-r from-[#2651B9] via-[#FF8500] to-[#FF8500] bg-clip-text text-transparent">
                Branding
                <span className="absolute -bottom-2 left-0 w-full pointer-events-none">
                  <GsapDrawSvg
                    type="underline"
                    strokeColor="#FF8500"
                    strokeWidth={3}
                    duration={1.2}
                    delay={0.5}
                  />
                </span>
              </span>
            </h1>

            <p className="hero-desc-elem mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-md sm:max-w-xl font-normal leading-relaxed px-2">
              We craft iconic brand identities and high-performing web platforms for ambitious founders and market leaders.
            </p>

            <div className="hero-cta-elem mt-5 sm:mt-8 flex flex-col items-center w-full px-4 sm:px-0">
              <GsapMagneticButton
                onClick={handleQuoteClick}
                variant="primary"
                strength={0.28}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold shadow-xl shadow-orange-500/25"
              >
                <span>Get Your Free Quote</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </GsapMagneticButton>
            </div>
          </ConcentricOrbitHero>
        </div>

      {/* Social Proof & Trust Strip */}
      <div className="hero-trust-elem mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 md:gap-10 text-xs text-slate-500 border-t border-slate-200/80 dark:border-slate-800 pt-5 sm:pt-6 w-full max-w-3xl z-20 px-4">
        <div className="flex items-center gap-1.5">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">4.9 / 5.0</span>
          <span className="text-slate-400">(500+ Reviews)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">500+ Brands Worldwide</span>
        </div>

        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2651B9] dark:text-[#60A5FA] shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">100% Vector IP Ownership</span>
        </div>
      </div>
      </div>
    </section>
  );
};
