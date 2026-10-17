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
      // PILLAR 1: STRATEGY (Tactical Strategic Radar)
      // Smooth 60fps hardware-accelerated loop
      // ==========================================
      gsap.to(".strat-scanner", {
        rotation: 360,
        duration: 4.5,
        repeat: -1,
        ease: "none",
        transformOrigin: "80px 60px",
        force3D: true,
      });

      gsap.to(".strat-ping-1", {
        scale: 2.2,
        opacity: 0,
        duration: 2.0,
        repeat: -1,
        ease: "power1.out",
        force3D: true,
      });

      gsap.to(".strat-ping-2", {
        scale: 2.2,
        opacity: 0,
        duration: 2.0,
        delay: 0.65,
        repeat: -1,
        ease: "power1.out",
        force3D: true,
      });

      gsap.to(".strat-ping-3", {
        scale: 2.2,
        opacity: 0,
        duration: 2.0,
        delay: 1.3,
        repeat: -1,
        ease: "power1.out",
        force3D: true,
      });

      gsap.to([".strat-node-1", ".strat-node-2", ".strat-node-3"], {
        scale: 1.25,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: "sine.inOut",
        transformOrigin: "center",
        force3D: true,
      });

      // ==========================================
      // PILLAR 2: CRAFT (Precision Vector Pen & Curvature)
      // Smooth fluid geometric interpolation
      // ==========================================
      gsap.to(".craft-handle-1", {
        y: 6,
        x: -2,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".craft-guide-1", {
        y: 4,
        x: -1,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".craft-handle-2", {
        y: -6,
        x: 2,
        duration: 2.2,
        delay: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".craft-guide-2", {
        y: -4,
        x: 1,
        duration: 2.2,
        delay: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      gsap.to(".craft-pen-cursor", {
        x: 10,
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        force3D: true,
      });

      // ==========================================
      // PILLAR 3: IMPACT (Exponential Growth & Conversion)
      // Smooth harmonic metric growth
      // ==========================================
      gsap.to(".impact-bar-1", {
        scaleY: 1.25,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom",
        force3D: true,
      });

      gsap.to(".impact-bar-2", {
        scaleY: 1.2,
        duration: 1.5,
        delay: 0.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom",
        force3D: true,
      });

      gsap.to(".impact-bar-3", {
        scaleY: 1.15,
        duration: 1.7,
        delay: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom",
        force3D: true,
      });

      gsap.to(".impact-ping", {
        scale: 2.4,
        opacity: 0,
        duration: 1.7,
        repeat: -1,
        ease: "power1.out",
        force3D: true,
      });

      gsap.to(".impact-star", {
        scale: 1.35,
        rotation: 45,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        force3D: true,
      });

      gsap.to([".impact-arrow-1", ".impact-arrow-2"], {
        y: -7,
        opacity: 0.2,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: "sine.inOut",
        force3D: true,
      });

      // ==========================================
      // SEQUENTIAL STORYLINE: Shuru theke Shesh
      // Smooth wave of focus: 01 Strategy ➔ 02 Craft ➔ 03 Impact
      // ==========================================
      const waveTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      waveTl
        // Phase 1: Strategy Focus
        .to(".card-glow-1", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .to(".wgiep-num-1", { color: "#FFA133", scale: 1.15, duration: 0.4 }, 0)
        .to(".card-glow-1", { opacity: 0, duration: 0.8, ease: "power2.in" }, 1.5)
        .to(".wgiep-num-1", { color: "#FF8500", scale: 1, duration: 0.4 }, 1.5)

        // Phase 2: Craft Focus
        .to(".card-glow-2", { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.0)
        .to(".wgiep-num-2", { color: "#FFA133", scale: 1.15, duration: 0.4 }, 2.0)
        .to(".card-glow-2", { opacity: 0, duration: 0.8, ease: "power2.in" }, 3.5)
        .to(".wgiep-num-2", { color: "#FF8500", scale: 1, duration: 0.4 }, 3.5)

        // Phase 3: Impact Focus
        .to(".card-glow-3", { opacity: 1, duration: 0.6, ease: "power2.out" }, 4.0)
        .to(".wgiep-num-3", { color: "#FFA133", scale: 1.15, duration: 0.4 }, 4.0)
        .to(".card-glow-3", { opacity: 0, duration: 0.8, ease: "power2.in" }, 5.5)
        .to(".wgiep-num-3", { color: "#FF8500", scale: 1, duration: 0.4 }, 5.5);

      // ==========================================
      // Entrance Timeline on Scroll / Load
      // ==========================================
      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      entranceTl
        .from(".wgiep-header > *", {
          y: 25,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          clearProps: "all",
        })
        .from(
          ".wgiep-card",
          {
            y: 35,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            clearProps: "all",
          },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-16 bg-[#081330] overflow-hidden"
    >
      {/* Soft ambient background spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[1000px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.25) 0%, rgba(255, 133, 0, 0.08) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="wgiep-header text-center max-w-3xl mx-auto mb-7 sm:mb-9 md:mb-10">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            What Goes Into <br />
            Every Project.
          </h2>

          <p className="font-sherika mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            Three core pillars we engineer into every brand we build.
          </p>
        </div>

        {/* 3 Pillars Grid - Strictly 1 Line across all devices (Mobile to Desktop) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 items-stretch">
          {/* =========================================
              CARD 1: STRATEGY
             ========================================= */}
          <div className="wgiep-card col-span-1 flex flex-col group">
            <div
              ref={card1Ref}
              className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-md sm:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden p-1.5 sm:p-4"
            >
              {/* Smooth GPU-accelerated active glow layer */}
              <div className="card-glow-1 pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#FF8500]/60 opacity-0 shadow-[0_0_30px_rgba(255,133,0,0.25)] transition-opacity duration-300" />

              {/* Tactical Strategic Radar SVG Animation */}
              <svg
                viewBox="0 0 160 120"
                className="w-full h-full max-h-[105px] sm:max-h-[140px] md:max-h-[160px] select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="stratRadarGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF8500" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF8500" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="stratSweepLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF8500" stopOpacity="0" />
                    <stop offset="100%" stopColor="#FF8500" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Coordinate Grid & Radar Circles */}
                <circle cx="80" cy="60" r="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="80" cy="60" r="30" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <circle cx="80" cy="60" r="14" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="80" y1="10" x2="80" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="30" y1="60" x2="130" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                {/* Corner Targeting Brackets */}
                <path d="M 28 20 L 22 20 L 22 26" stroke="#FF8500" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M 132 20 L 138 20 L 138 26" stroke="#FF8500" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M 28 100 L 22 100 L 22 94" stroke="#FF8500" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M 132 100 L 138 100 L 138 94" stroke="#FF8500" strokeWidth="1.2" strokeOpacity="0.4" />

                {/* Strategic Interconnect Dashed Vectors */}
                <path d="M 58 44 L 106 38 L 74 84 Z" stroke="rgba(255,133,0,0.35)" strokeWidth="1" strokeDasharray="2 2" />

                {/* Rotating Scanner Sweep */}
                <g className="strat-scanner" style={{ transformOrigin: "80px 60px" }}>
                  <path d="M 80 60 L 126 60 A 46 46 0 0 0 112 28 Z" fill="url(#stratRadarGrad)" />
                  <line x1="80" y1="60" x2="126" y2="60" stroke="url(#stratSweepLine)" strokeWidth="1.5" />
                </g>

                {/* Target Strategic Nodes & Expanding Echoes */}
                <g style={{ transformOrigin: "58px 44px" }}>
                  <circle cx="58" cy="44" r="8" className="strat-ping strat-ping-1" fill="none" stroke="#FF8500" strokeWidth="1" opacity="0.6" style={{ transformOrigin: "center" }} />
                  <circle cx="58" cy="44" r="3.5" className="strat-node-1" fill="#FF8500" />
                  <circle cx="58" cy="44" r="1.5" fill="#FFFFFF" />
                </g>

                <g style={{ transformOrigin: "106px 38px" }}>
                  <circle cx="106" cy="38" r="8" className="strat-ping strat-ping-2" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.6" style={{ transformOrigin: "center" }} />
                  <circle cx="106" cy="38" r="3.5" className="strat-node-2" fill="#38BDF8" />
                  <circle cx="106" cy="38" r="1.5" fill="#FFFFFF" />
                </g>

                <g style={{ transformOrigin: "74px 84px" }}>
                  <circle cx="74" cy="84" r="8" className="strat-ping strat-ping-3" fill="none" stroke="#FFA229" strokeWidth="1" opacity="0.6" style={{ transformOrigin: "center" }} />
                  <circle cx="74" cy="84" r="3.5" className="strat-node-3" fill="#FFA229" />
                  <circle cx="74" cy="84" r="1.5" fill="#FFFFFF" />
                </g>

                {/* Radar Centerpoint */}
                <circle cx="80" cy="60" r="3" fill="#FFFFFF" />
                <circle cx="80" cy="60" r="6" stroke="#FF8500" strokeWidth="1" strokeOpacity="0.8" />
              </svg>
            </div>

            <div className="mt-2.5 sm:mt-5 px-0.5 sm:px-1">
              <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1.5">
                <span className="wgiep-num-1 text-[9px] sm:text-xs font-mono font-bold text-[#FF8500] tracking-wider transition-all duration-300">
                  01
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#FF8500]/60" />
                <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  INSIGHT
                </span>
              </div>

              <h3 className="font-agency text-xs sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                Strategy
              </h3>
              <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs md:text-sm text-slate-300 leading-snug sm:leading-relaxed font-normal">
                <span className="sm:hidden">Audience insights & market positioning.</span>
                <span className="hidden sm:inline">Before opening any tool, we decode your product, audience, and market positioning. Design without strategy is just decoration.</span>
              </p>
            </div>
          </div>

          {/* =========================================
              CARD 2: CRAFT
             ========================================= */}
          <div className="wgiep-card col-span-1 flex flex-col group">
            <div
              ref={card2Ref}
              className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-md sm:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden p-1.5 sm:p-4"
            >
              {/* Smooth GPU-accelerated active glow layer */}
              <div className="card-glow-2 pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#FF8500]/60 opacity-0 shadow-[0_0_30px_rgba(255,133,0,0.25)] transition-opacity duration-300" />

              {/* Precision Vector Pen & Curvature Geometry SVG */}
              <svg
                viewBox="0 0 160 120"
                className="w-full h-full max-h-[105px] sm:max-h-[140px] md:max-h-[160px] select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="craftCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#FF8500" />
                    <stop offset="100%" stopColor="#FFA229" />
                  </linearGradient>
                  <linearGradient id="craftAreaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8500" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#FF8500" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Drafting Grid Points */}
                <g opacity="0.15">
                  <circle cx="30" cy="30" r="1" fill="#FFFFFF" />
                  <circle cx="55" cy="30" r="1" fill="#FFFFFF" />
                  <circle cx="80" cy="30" r="1" fill="#FFFFFF" />
                  <circle cx="105" cy="30" r="1" fill="#FFFFFF" />
                  <circle cx="130" cy="30" r="1" fill="#FFFFFF" />
                  <circle cx="30" cy="60" r="1" fill="#FFFFFF" />
                  <circle cx="55" cy="60" r="1" fill="#FFFFFF" />
                  <circle cx="80" cy="60" r="1" fill="#FFFFFF" />
                  <circle cx="105" cy="60" r="1" fill="#FFFFFF" />
                  <circle cx="130" cy="60" r="1" fill="#FFFFFF" />
                  <circle cx="30" cy="90" r="1" fill="#FFFFFF" />
                  <circle cx="55" cy="90" r="1" fill="#FFFFFF" />
                  <circle cx="80" cy="90" r="1" fill="#FFFFFF" />
                  <circle cx="105" cy="90" r="1" fill="#FFFFFF" />
                  <circle cx="130" cy="90" r="1" fill="#FFFFFF" />
                </g>

                {/* Ambient Subtle Fill */}
                <path d="M 24 72 C 54 22, 106 102, 136 48 L 136 96 L 24 96 Z" fill="url(#craftAreaGlow)" />

                {/* Dynamic Tangent Guide Lines */}
                <line x1="24" y1="72" x2="54" y2="22" stroke="rgba(56,189,248,0.4)" strokeWidth="1" strokeDasharray="2 2" className="craft-guide-1" />
                <line x1="106" y1="102" x2="136" y2="48" stroke="rgba(255,133,0,0.4)" strokeWidth="1" strokeDasharray="2 2" className="craft-guide-2" />

                {/* Master Bezier Curve */}
                <path
                  d="M 24 72 C 54 22, 106 102, 136 48"
                  stroke="url(#craftCurveGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="craft-main-path"
                />

                {/* Tangent Handle Controls */}
                <g className="craft-handle-1" style={{ transformOrigin: "54px 22px" }}>
                  <circle cx="54" cy="22" r="4" fill="#0C1E4E" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="54" cy="22" r="1.5" fill="#38BDF8" />
                </g>
                <g className="craft-handle-2" style={{ transformOrigin: "106px 102px" }}>
                  <circle cx="106" cy="102" r="4" fill="#0C1E4E" stroke="#FF8500" strokeWidth="1.5" />
                  <circle cx="106" cy="102" r="1.5" fill="#FF8500" />
                </g>

                {/* Anchor Points */}
                <rect x="21" y="69" width="6" height="6" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" rx="1" />
                <rect x="133" y="45" width="6" height="6" fill="#FFFFFF" stroke="#FFA229" strokeWidth="1.5" rx="1" />

                {/* Floating Vector Cursor & Needle */}
                <g className="craft-pen-cursor" style={{ transformOrigin: "80px 58px" }}>
                  <circle cx="80" cy="58" r="9" stroke="#FF8500" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
                  <circle cx="80" cy="58" r="3" fill="#FF8500" />
                  <circle cx="80" cy="58" r="1" fill="#FFFFFF" />
                  <path d="M 80 58 L 93 45 L 90 42 L 80 55" fill="#FFA229" opacity="0.85" />
                </g>
              </svg>
            </div>

            <div className="mt-2.5 sm:mt-5 px-0.5 sm:px-1">
              <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1.5">
                <span className="wgiep-num-2 text-[9px] sm:text-xs font-mono font-bold text-[#FF8500] tracking-wider transition-all duration-300">
                  02
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#FF8500]/60" />
                <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  EXECUTION
                </span>
              </div>

              <h3 className="font-agency text-xs sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                Craft
              </h3>
              <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs md:text-sm text-slate-300 leading-snug sm:leading-relaxed font-normal">
                <span className="sm:hidden">Pixel-perfect visual & motion excellence.</span>
                <span className="hidden sm:inline">Every frame, letterform, and micro-interaction is executed with surgical precision. We build work that defines industry standards.</span>
              </p>
            </div>
          </div>

          {/* =========================================
              CARD 3: IMPACT
             ========================================= */}
          <div className="wgiep-card col-span-1 flex flex-col group">
            <div
              ref={card3Ref}
              className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#0C1E4E]/70 border border-white/10 group-hover:border-[#FF8500]/40 backdrop-blur-xl shadow-md sm:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden p-1.5 sm:p-4"
            >
              {/* Smooth GPU-accelerated active glow layer */}
              <div className="card-glow-3 pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#FF8500]/60 opacity-0 shadow-[0_0_30px_rgba(255,133,0,0.25)] transition-opacity duration-300" />

              {/* Exponential Growth & Conversion Metrics SVG */}
              <svg
                viewBox="0 0 160 120"
                className="w-full h-full max-h-[105px] sm:max-h-[140px] md:max-h-[160px] select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="impactAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8500" stopOpacity="0.32" />
                    <stop offset="60%" stopColor="#FF8500" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FF8500" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8500" />
                    <stop offset="100%" stopColor="#FF8500" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFA229" />
                    <stop offset="100%" stopColor="#FFA229" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Metric Graph Axes */}
                <line x1="20" y1="98" x2="142" y2="98" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="98" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="20" y1="60" x2="142" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Animated Harmonic Metric Bars */}
                <rect
                  x="34"
                  y="70"
                  width="10"
                  height="28"
                  rx="3"
                  fill="url(#barGrad1)"
                  className="impact-bar-1"
                  style={{ transformOrigin: "bottom" }}
                />
                <rect
                  x="62"
                  y="52"
                  width="10"
                  height="46"
                  rx="3"
                  fill="url(#barGrad2)"
                  className="impact-bar-2"
                  style={{ transformOrigin: "bottom" }}
                />
                <rect
                  x="90"
                  y="34"
                  width="10"
                  height="64"
                  rx="3"
                  fill="url(#barGrad3)"
                  className="impact-bar-3"
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Exponential Area & Curve */}
                <path
                  d="M 22 94 Q 75 90, 132 30 L 132 98 L 22 98 Z"
                  fill="url(#impactAreaGrad)"
                />
                <path
                  d="M 22 94 Q 75 90, 132 30"
                  stroke="#FF8500"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="impact-curve"
                />

                {/* Floating Acceleration Arrows */}
                <path d="M 50 48 L 54 44 L 58 48" stroke="#FF8500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="impact-arrow-1" />
                <path d="M 106 28 L 110 24 L 114 28" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="impact-arrow-2" />

                {/* Peak Conversion Beacon & Star Burst */}
                <circle
                  cx="132"
                  cy="30"
                  r="7"
                  className="impact-ping"
                  fill="none"
                  stroke="#FF8500"
                  strokeWidth="1"
                  style={{ transformOrigin: "center" }}
                />
                <circle cx="132" cy="30" r="3.5" fill="#FFA229" />
                <polygon
                  points="132,22 134.5,28 140,30 134.5,32 132,38 129.5,32 124,30 129.5,28"
                  fill="#FFFFFF"
                  className="impact-star"
                  style={{ transformOrigin: "center" }}
                />
              </svg>
            </div>

            <div className="mt-2.5 sm:mt-5 px-0.5 sm:px-1">
              <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1.5">
                <span className="wgiep-num-3 text-[9px] sm:text-xs font-mono font-bold text-[#FF8500] tracking-wider transition-all duration-300">
                  03
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#FF8500]/60" />
                <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  RESULTS
                </span>
              </div>

              <h3 className="font-agency text-xs sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                Impact
              </h3>
              <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs md:text-sm text-slate-300 leading-snug sm:leading-relaxed font-normal">
                <span className="sm:hidden">High conversion & measurable brand growth.</span>
                <span className="hidden sm:inline">Design engineered to drive action. We turn passive viewers into loyal advocates, maximizing measurable business growth and conversion.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <GsapMagneticButton
            onClick={() => onOpenContact?.("Project Strategy & Craft", "Interested in partnering with Pixim")}
            variant="primary"
            strength={0.25}
            className="px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !text-white shadow-xl shadow-orange-500/20"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2" />
          </GsapMagneticButton>
        </div>
      </div>
    </section>
  );
};

export default WhyPiximSection;
