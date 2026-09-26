"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";
import { Sparkles, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { GsapDrawSvg, GsapMagneticButton, LiquidMetal } from "./animations";

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleQuoteClick = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#2563eb", "#38bdf8", "#ff7a00", "#ffffff"],
    });
    onOpenContact?.();
  };

  // GSAP Entrance animation
  useGSAP(
    () => {
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
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.4"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-[#040817]"
    >
      {/* 1. Deep cinematic background gradient & ambient glows (behind shader) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1100px] h-[450px] md:h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.15) 0%, rgba(255, 133, 0, 0.07) 38%, transparent 70%)",
        }}
      />

      {/* Grid texture overlay (behind liquid metal so blob stays silky smooth) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #2651b9 1px, transparent 1px), linear-gradient(to bottom, #2651b9 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      {/* 2. Liquid Metal 3D WebGL Shader Animation (Matches reference: fluid metaballs with iridescent refraction) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <LiquidMetal
          shape="metaballs"
          colorBack="#00000000"
          colorTint="#ffffff"
          speed={0.7}
          softness={0.3}
          repetition={3}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0.3}
          contour={0.88}
          scale={1.12}
          fit="contain"
          className="opacity-95"
        />
      </div>

      {/* Subtle bottom gradient to blend smoothly into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040817] via-[#040817]/70 to-transparent pointer-events-none z-[2]" />

      {/* 3. Foreground Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Hero Title */}
        <h1 className="hero-title-elem font-agency font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-white leading-[1.08] max-w-4xl px-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          One Stop Solution for{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#38bdf8] via-[#FF8500] to-[#FF8500] bg-clip-text text-transparent">
            Branding
            <span className="absolute -bottom-3 left-0 w-full pointer-events-none">
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

        {/* Hero Description with enhanced legibility over liquid metal */}
        <p className="hero-desc-elem font-sherika mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl font-normal leading-relaxed px-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          We craft iconic brand identities and high-performing web platforms for ambitious founders and market leaders.
        </p>

        {/* Single Primary CTA Button */}
        <div className="hero-cta-elem mt-7 sm:mt-9 flex items-center justify-center w-full px-4 sm:px-0">
          <GsapMagneticButton
            onClick={handleQuoteClick}
            variant="primary"
            strength={0.28}
            className="w-full sm:w-auto h-[54px] px-10 text-base sm:text-lg font-bold shadow-2xl shadow-orange-500/35 whitespace-nowrap"
          >
            <span>Get Your Free Quote</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
          </GsapMagneticButton>
        </div>

        {/* Social Proof & Frosted Glass Trust Strip */}
        <div className="hero-trust-elem mt-12 sm:mt-16 w-full max-w-4xl px-2">
          <div className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] px-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
                <div className="flex text-amber-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white text-sm whitespace-nowrap">4.9 / 5.0</span>
                <span className="text-white/70 text-xs sm:text-sm whitespace-nowrap">(500+ Reviews)</span>
              </div>

              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
                <span className="text-white font-medium text-sm whitespace-nowrap">500+ Brands Worldwide</span>
              </div>

              <div className="flex items-center justify-center gap-2 whitespace-nowrap pt-2 md:pt-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <span className="text-white font-medium text-sm whitespace-nowrap">100% Vector IP Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
