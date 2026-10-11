"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface WhyPiximSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

export const WhyPiximSection: React.FC<WhyPiximSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      // ==========================================
      // BOX 1 (Strategy): Clean Sequential Breathing Wave
      // Exactly the 3 dots in the reference image
      // ==========================================
      const dots = gsap.utils.toArray<HTMLElement>(".ref-dot");
      gsap.to(dots, {
        scale: 1.15,
        opacity: (i) => [1, 0.7, 0.4][i],
        duration: 1.2,
        stagger: {
          each: 0.25,
          repeat: -1,
          yoyo: true,
        },
        ease: "power1.inOut",
      });

      // ==========================================
      // BOX 2 (Craft): Elegant Minimal Ripple
      // Exactly the concentric circle + dot in the reference image
      // ==========================================
      gsap.to(".ref-circle", {
        scale: 1.2,
        opacity: 0.25,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ref-center-dot", {
        scale: 1.12,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ==========================================
      // BOX 3 (Conversion): Subtle Vertical Floating
      // Exactly the rounded bar + triangle in the reference image
      // ==========================================
      gsap.to(".ref-bar", {
        y: -6,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ref-triangle", {
        y: -4,
        duration: 1.6,
        delay: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Run entrance animations immediately on page load (smooth entrance)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".wgiep-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        clearProps: "all",
      }).from(
        ".wgiep-card",
        {
          y: 35,
          opacity: 0,
          stagger: 0.14,
          duration: 0.7,
          clearProps: "all",
        },
        "-=0.3"
      ).from(
        [".ref-dot", ".ref-circle", ".ref-center-dot", ".ref-bar", ".ref-triangle"],
        {
          scale: 0.4,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(1.7)",
          clearProps: "all",
        },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-28 bg-[#081330] overflow-hidden"
    >
      {/* Soft ambient background spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1000px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.25) 0%, rgba(255, 133, 0, 0.08) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="wgiep-header text-center max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            What Goes Into <br />
            Every Project.
          </h2>

          <p className="font-sherika mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            Three things we bring to every brand we build.
          </p>
        </div>

        {/* 3 Pillars Grid - Pure, Clean & Minimal matching uploaded image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* =========================================
              CARD 1: STRATEGY
             ========================================= */}
          <div className="wgiep-card flex flex-col group">
            <div
              ref={card1Ref}
              className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              {/* Exactly 3 Minimal Dots like the image */}
              <div className="flex items-center gap-5 sm:gap-6">
                <span className="ref-dot w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF8500] opacity-90" />
                <span className="ref-dot w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF8500] opacity-55" />
                <span className="ref-dot w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF8500] opacity-25" />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 px-1">
              <h3 className="font-agency text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Strategy
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Before we open any tool, we understand your product, audience, and positioning. Design without strategy is just decoration.
              </p>
            </div>
          </div>

          {/* =========================================
              CARD 2: CRAFT
             ========================================= */}
          <div className="wgiep-card flex flex-col group">
            <div
              ref={card2Ref}
              className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              {/* Concentric Circle Outline */}
              <div className="ref-circle absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#FF8500]/45" />

              {/* Solid Center Dot */}
              <div className="ref-center-dot relative z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF8500]" />
            </div>

            <div className="mt-5 sm:mt-6 px-1">
              <h3 className="font-agency text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Craft
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Every frame, every letterform, every transition is intentional. We don&apos;t ship work we wouldn&apos;t put our own name on.
              </p>
            </div>
          </div>

          {/* =========================================
              CARD 3: CONVERSION
             ========================================= */}
          <div className="wgiep-card flex flex-col group">
            <div
              ref={card3Ref}
              className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              {/* Rounded Bar + Triangle */}
              <div className="flex items-end gap-3 sm:gap-4 h-20 sm:h-24 justify-center">
                <div className="ref-bar w-4 sm:w-5 h-14 sm:h-16 rounded-md bg-[#FF8500]" />
                <div className="ref-triangle w-0 h-0 mb-0.5 border-l-[11px] sm:border-l-[13px] border-l-transparent border-r-[11px] sm:border-r-[13px] border-r-transparent border-b-[20px] sm:border-b-[24px] border-b-[#FF8500]" />
              </div>
            </div>

            <div className="mt-5 sm:mt-6 px-1">
              <h3 className="font-agency text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Conversion
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                By the time a viewer finishes watching or reading, they&apos;re already leaning toward a call. That&apos;s the ultimate metric.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <GsapMagneticButton
            onClick={() => onOpenContact?.("Project Strategy & Craft", "Interested in partnering with Pixim")}
            variant="primary"
            strength={0.25}
            className="px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !text-white shadow-xl shadow-orange-500/20"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </GsapMagneticButton>
        </div>
      </div>
    </section>
  );
};

export default WhyPiximSection;
