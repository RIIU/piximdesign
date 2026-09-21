"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Sparkles, Play, RotateCcw, CheckCircle2, Sliders } from "lucide-react";
import { GsapMagneticButton } from "./GsapMagneticButton";

export interface PathMilestone {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  timeframe: string;
  description: string;
  coordinates: { x: number; y: number };
  targetProgress: number; // 0.0 to 1.0 along the path
  color: string;
  deliverables: string[];
}

const MILESTONES: PathMilestone[] = [
  {
    step: "01",
    number: "Phase 01",
    title: "Deep Discovery & Brand Audit",
    subtitle: "Research & Alignment",
    timeframe: "Days 1 – 3",
    description: "Uncovering your brand DNA, target demographics, competitor positioning, and technical roadmap.",
    coordinates: { x: 160, y: 75 },
    targetProgress: 0.12,
    color: "#FF5E1E", // Pixim Orange
    deliverables: [
      "Brand Strategy Blueprint & Market Matrix",
      "Design Direction Moodboards (3 Angles)",
      "Technical Requirements & Deliverables Spec",
    ],
  },
  {
    step: "02",
    number: "Phase 02",
    title: "Concept Blueprint & Architecture",
    subtitle: "Exploration & Vector Craft",
    timeframe: "Days 4 – 8",
    description: "Crafting original vector concepts, typography hierarchy, responsive layouts, and interactive wireframes.",
    coordinates: { x: 420, y: 185 },
    targetProgress: 0.40,
    color: "#F59E0B", // Amber Gold
    deliverables: [
      "3 Distinct Identity / Web Concepts",
      "Typography & Color System Tokens",
      "Interactive Figma Prototype Walkthrough",
    ],
  },
  {
    step: "03",
    number: "Phase 03",
    title: "Refinement & Physical Testing",
    subtitle: "Pixel Polish & Packaging Specs",
    timeframe: "Days 9 – 12",
    description: "Iterating based on collaborative feedback, stress-testing mockups across 4K displays and physical print dies.",
    coordinates: { x: 680, y: 75 },
    targetProgress: 0.69,
    color: "#3B82F6", // Electric Blue
    deliverables: [
      "Pixel-Perfect 4K Responsive Views",
      "Packaging Die-Lines & 3D Photoreal Renders",
      "Sub-Second Performance & SEO Optimization",
    ],
  },
  {
    step: "04",
    number: "Phase 04",
    title: "Production Handover & Market Launch",
    subtitle: "Full Copyright & Master Assets",
    timeframe: "Days 13 – 14",
    description: "Handing over all raw source assets (AI, SVG, EPS, Next.js repository) with full copyright and 30-day warranty.",
    coordinates: { x: 920, y: 185 },
    targetProgress: 0.98,
    color: "#10B981", // Emerald Green
    deliverables: [
      "100% Raw Vector Files (AI, SVG, EPS, PDF)",
      "Live Production Deployment & DNS Setup",
      "30-Day Complimentary Post-Launch Warranty",
    ],
  },
];

// Continuous smooth Bezier curve traversing the 4 milestones
const PATH_DATA =
  "M 40,75 C 90,75 110,75 160,75 C 270,75 310,185 420,185 C 530,185 570,75 680,75 C 790,75 830,185 920,185 C 950,185 970,185 985,185";

interface GsapDrawPathProps {
  className?: string;
  autoPlayOnMount?: boolean;
}

export const GsapDrawPath: React.FC<GsapDrawPathProps> = ({
  className = "",
  autoPlayOnMount = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const tracerRef = useRef<SVGGElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isAutoLooping, setIsAutoLooping] = useState(false);

  // Helper to update visual stroke & tracer position based on progress (0 to 1)
  const applyProgress = useCallback((progress: number) => {
    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const tracer = tracerRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength ? path.getTotalLength() : 1100;
    const offset = totalLength * (1 - progress);

    // Update main path and glow path dash offsets
    gsap.set(path, { strokeDashoffset: offset });
    if (glowPath) {
      gsap.set(glowPath, { strokeDashoffset: offset });
    }

    // Position tracer head along the curve with tangential angle
    if (tracer) {
      const distance = Math.max(0.1, Math.min(totalLength, progress * totalLength));
      const pt = path.getPointAtLength(distance);
      const nextDistance = Math.min(totalLength, distance + 1.5);
      const ptNext = path.getPointAtLength(nextDistance);
      const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

      gsap.set(tracer, {
        x: pt.x,
        y: pt.y,
        rotation: angle,
        transformOrigin: "center center",
      });
    }

    setCurrentProgress(progress);

    // Determine active milestone based on progress thresholds
    let activeIdx = 0;
    if (progress >= 0.85) activeIdx = 3;
    else if (progress >= 0.55) activeIdx = 2;
    else if (progress >= 0.25) activeIdx = 1;
    else activeIdx = 0;
    setActiveMilestoneIndex(activeIdx);
  }, []);

  // Main GSAP animation to draw path to a target progress
  const animateToProgress = useCallback(
    (target: number, duration: number = 2.4, onComplete?: () => void) => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      setIsDrawing(true);
      const state = { p: currentProgress };

      tweenRef.current = gsap.to(state, {
        p: target,
        duration,
        ease: "power2.inOut",
        overwrite: "auto",
        onUpdate: () => {
          applyProgress(state.p);
        },
        onComplete: () => {
          setIsDrawing(false);
          if (onComplete) onComplete();
        },
      });
    },
    [currentProgress, applyProgress]
  );

  // Draw the entire path from 0 to 100%
  const handleDrawFull = useCallback(
    (customDuration?: number) => {
      // If already at end, reset first
      if (currentProgress >= 0.98) {
        applyProgress(0);
      }
      animateToProgress(1, customDuration || 3.0);
    },
    [currentProgress, applyProgress, animateToProgress]
  );

  // Initialize SVG dash arrays on mount
  useEffect(() => {
    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    gsap.set([path, glowPath], {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    applyProgress(0);

    // Auto-draw path after small delay if requested
    if (autoPlayOnMount) {
      const timer = setTimeout(() => {
        handleDrawFull(3.2);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [applyProgress, autoPlayOnMount, handleDrawFull]);

  // Reset path to 0
  const handleReset = () => {
    if (tweenRef.current) tweenRef.current.kill();
    setIsDrawing(false);
    setIsAutoLooping(false);
    animateToProgress(0, 0.8);
  };

  // Jump/draw to a specific milestone
  const handleMilestoneClick = (index: number) => {
    setIsAutoLooping(false);
    const target = MILESTONES[index].targetProgress;
    const dist = Math.abs(target - currentProgress);
    const duration = Math.max(0.8, dist * 2.8);
    animateToProgress(target, duration);
  };

  // Handle manual scrub slider
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tweenRef.current) tweenRef.current.kill();
    setIsDrawing(false);
    setIsAutoLooping(false);
    const val = parseFloat(e.target.value) / 100;
    applyProgress(val);
  };

  // Toggle auto looping draw
  const toggleAutoLoop = () => {
    if (isAutoLooping) {
      if (tweenRef.current) tweenRef.current.kill();
      setIsAutoLooping(false);
      setIsDrawing(false);
    } else {
      setIsAutoLooping(true);
      const loopStep = (forward: boolean) => {
        animateToProgress(forward ? 1 : 0, 3.2, () => {
          gsap.delayedCall(1.0, () => loopStep(!forward));
        });
      };
      loopStep(true);
    }
  };

  const activeMilestone = MILESTONES[activeMilestoneIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-white border border-[#2651B9]/15 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.09)] overflow-hidden ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF8500]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2651B9]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF8500]/12 border border-[#FF8500]/30 text-[#C25E00] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>GSAP DrawSVG & MotionPath Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Interactive Project Roadmap: <span className="bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#2651B9] bg-clip-text text-transparent">&quot;Draw A Path&quot;</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            Watch our agency delivery workflow draw itself in real-time. Trace the exact bezier path connecting your project brief to final market launch.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <GsapMagneticButton
            onClick={() => handleDrawFull()}
            variant="primary"
            strength={0.25}
            className="px-5 py-2.5 !text-white !bg-[#FF8500] hover:!bg-[#e67700] font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isDrawing ? "animate-spin" : ""}`} />
            <span>{currentProgress >= 0.98 ? "Re-draw Path" : "Draw Path"}</span>
          </GsapMagneticButton>

          <button
            onClick={toggleAutoLoop}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
              isAutoLooping
                ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 shadow-sm"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoLooping ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
            <span>{isAutoLooping ? "Looping: ON" : "Auto Loop"}</span>
          </button>

          <button
            onClick={handleReset}
            aria-label="Reset Path"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas for "Draw A Path" */}
      <div className="relative z-10 my-8 w-full overflow-x-auto select-none">
        <div className="min-w-[760px] lg:min-w-full">
          <svg
            viewBox="0 0 1020 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
          >
            <defs>
              {/* Linear gradient along the drawn path */}
              <linearGradient id="drawPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF5E1E" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="68%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Glowing filter for active stroke */}
              <filter id="neonPathGlow" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="7" result="blur1" />
                <feGaussianBlur stdDeviation="15" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Radial gradient for tracer glowing halo */}
              <radialGradient id="tracerHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF5E1E" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF5E1E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base guide track (dashed background) */}
            <path
              d={PATH_DATA}
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeDasharray="6 8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Glowing neon aura of drawn path */}
            <path
              ref={glowPathRef}
              d={PATH_DATA}
              stroke="url(#drawPathGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
              filter="url(#neonPathGlow)"
            />

            {/* Main drawn path */}
            <path
              ref={pathRef}
              d={PATH_DATA}
              stroke="url(#drawPathGradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Milestone Waypoint Nodes */}
            {MILESTONES.map((m, idx) => {
              const isReached = currentProgress >= m.targetProgress - 0.03;
              const isSelected = activeMilestoneIndex === idx;

              return (
                <g
                  key={m.step}
                  transform={`translate(${m.coordinates.x}, ${m.coordinates.y})`}
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => handleMilestoneClick(idx)}
                >
                  {/* Outer pulse wave if reached */}
                  {isReached && (
                    <circle
                      r="26"
                      fill="none"
                      stroke={m.color}
                      strokeWidth="1.5"
                      opacity="0.4"
                      className="animate-ping origin-center"
                    />
                  )}

                  {/* Outer boundary ring */}
                  <circle
                    r={isSelected ? "22" : "18"}
                    fill="#FFFFFF"
                    stroke={isReached ? m.color : "#CBD5E1"}
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all duration-300"
                  />

                  {/* Inner fill disc */}
                  <circle
                    r="12"
                    fill={isReached ? m.color : "#F1F5F9"}
                    className="transition-colors duration-300"
                  />

                  {/* Step Number Text */}
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill={isReached ? "#FFFFFF" : "#64748B"}
                    fontSize="10"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    {m.step}
                  </text>

                  {/* Milestone Card Tag */}
                  <g
                    transform={
                      m.coordinates.y < 120
                        ? "translate(0, -32)"
                        : "translate(0, 36)"
                    }
                  >
                    <rect
                      x="-65"
                      y="-12"
                      width="130"
                      height="24"
                      rx="6"
                      fill="#FFFFFF"
                      stroke={isSelected ? m.color : "rgba(38,81,185,0.15)"}
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill={isSelected ? "#0F172A" : "#64748B"}
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                    >
                      {m.number} • {m.timeframe}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Dynamic Animated Tracer Head (Rocket / Pen) that travels along path */}
            <g ref={tracerRef} className="pointer-events-none">
              {/* Outer pulsing halo */}
              <circle r="22" fill="url(#tracerHalo)" />

              {/* Core radiant tracer head */}
              <circle r="7.5" fill="#FFFFFF" stroke="#FF5E1E" strokeWidth="2.5" />

              {/* Directional arrow / pen nib pointing along curve tangent */}
              <path
                d="M 6,-4 L 14,0 L 6,4 Z"
                fill="#FF5E1E"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Manual Interactive Scrub Slider */}
      <div className="relative z-10 pt-4 pb-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 w-full sm:w-auto">
          <Sliders className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Manual Scrub & Draw:</span>
          <span className="font-bold text-slate-800 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
            {Math.round(currentProgress * 100)}%
          </span>
        </div>

        <div className="w-full sm:max-w-md flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400">0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(currentProgress * 100)}
            onChange={handleSliderChange}
            aria-label="Draw path manually"
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
          />
          <span className="text-[11px] font-mono text-slate-400">100%</span>
        </div>

        {/* Milestone Quick Switchers */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          {MILESTONES.map((m, idx) => (
            <button
              key={m.step}
              onClick={() => handleMilestoneClick(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeMilestoneIndex === idx
                  ? "bg-orange-500 text-white font-bold shadow-sm scale-105"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              P{m.step}
            </button>
          ))}
        </div>
      </div>

      {/* Active Milestone Highlight Card */}
      <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeMilestone.color }}
            />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              {activeMilestone.number} • {activeMilestone.timeframe}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
              {currentProgress >= activeMilestone.targetProgress - 0.05
                ? "Checkpoint Reached"
                : "Upcoming Stage"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            {activeMilestone.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {activeMilestone.description}
          </p>
        </div>

        {/* Deliverables for this exact point on the drawn path */}
        <div className="lg:col-span-6 flex flex-col gap-2 pt-4 lg:pt-0 lg:border-l border-slate-200 lg:pl-6">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Guaranteed Milestones at this coordinate</span>
          </div>
          {activeMilestone.deliverables.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-sm"
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: activeMilestone.color }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
