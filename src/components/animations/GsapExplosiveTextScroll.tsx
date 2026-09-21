"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, RotateCcw, Sliders, Flame } from "lucide-react";
import { GsapMagneticButton } from "./GsapMagneticButton";

interface GsapExplosiveTextScrollProps {
  lines?: string[];
  className?: string;
  title?: string;
  subtitle?: string;
}

const DEFAULT_LINES = [
  "Explosive effects",
  "Detonated ideas",
  "Visual blast",
  "Controlled chaos",
  "Break expectation",
  "Highly reactive",
];

export const GsapExplosiveTextScroll: React.FC<GsapExplosiveTextScrollProps> = ({
  lines = DEFAULT_LINES,
  className = "",
  title = "Controlled Creative Chaos",
  subtitle = "GSAP KINETIC SCROLL ENGINE",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const [manualScrub, setManualScrub] = useState(0);
  const [isAutoBlasting, setIsAutoBlasting] = useState(false);
  const blastTweenRef = useRef<gsap.core.Tween | null>(null);

  // Pre-calculate deterministic explosion vectors for every letter in every line
  const linesData = useRef(
    lines.map((line, lineIdx) => {
      const chars = line.split("");
      const total = chars.length;
      return chars.map((char, charIdx) => {
        if (char === " ") {
          return { isSpace: true, char: "\u00A0", dx: 0, dy: 0, rot: 0, scale: 1, opacity: 1 };
        }
        // Center-relative offset (-1 to +1)
        const centerOffset = (charIdx - (total - 1) / 2) / Math.max(1, (total - 1) / 2);

        // Pseudo-random deterministic jitter
        const pseudoRand = ((lineIdx * 41 + charIdx * 17 + char.charCodeAt(0)) % 100) / 100;
        const pseudoRand2 = ((lineIdx * 29 + charIdx * 23) % 100) / 100;

        // Upward/downward parabolic blast curve
        const arc = (1 - Math.abs(centerOffset)) * 42;
        const verticalSpread = (pseudoRand - 0.5) * 55;
        const horizontalSpread = (pseudoRand2 - 0.5) * 35;

        // Alternating directional explosion per line
        const directionFactor = lineIdx % 2 === 0 ? 1 : -1;

        return {
          isSpace: false,
          char,
          dx: centerOffset * 105 + horizontalSpread,
          dy: -arc * 1.5 * directionFactor + verticalSpread,
          rot: centerOffset * 42 + (pseudoRand - 0.5) * 40,
          scale: 0.95 + pseudoRand * 0.35,
          opacity: Math.max(0.25, 1 - Math.abs(centerOffset) * 0.35),
        };
      });
    })
  ).current;

  // Apply explosion progress to a specific line (0 = intact, 1 = fully detonated)
  const applyLineProgress = useCallback((lineIdx: number, progress: number) => {
    const letters = letterRefs.current[lineIdx];
    if (!letters) return;

    const lineData = linesData[lineIdx];
    letters.forEach((el, charIdx) => {
      if (!el) return;
      const data = lineData[charIdx];
      if (data.isSpace) return;

      const p = Math.max(0, Math.min(1, progress));
      gsap.set(el, {
        x: data.dx * p,
        y: data.dy * p,
        rotation: data.rot * p,
        scale: 1 + (data.scale - 1) * p,
        opacity: 1 - (1 - data.opacity) * p,
        color: p > 0.4 ? (charIdx % 3 === 0 ? "#FF8500" : "#2651B9") : "#0F172A",
      });
    });
  }, [linesData]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const lineElements = linesContainerRef.current?.querySelectorAll<HTMLDivElement>(".explosive-line");
      if (!lineElements) return;

      lineElements.forEach((lineEl, idx) => {
        // As line scrolls through the viewport from bottom to top, detonate letters
        const st = ScrollTrigger.create({
          trigger: lineEl,
          start: "top 75%",
          end: "top 20%",
          scrub: 1.2,
          onUpdate: (self) => {
            // When user is not manually dragging slider or running auto blast
            if (!isAutoBlasting) {
              applyLineProgress(idx, self.progress);
            }
          },
        });
        scrollTriggersRef.current.push(st);
      });
    }, container);

    return () => {
      ctx.revert();
      scrollTriggersRef.current = [];
    };
  }, [applyLineProgress, isAutoBlasting]);

  // Manual scrub slider handler
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) / 100;
    setManualScrub(val);
    if (blastTweenRef.current) blastTweenRef.current.kill();
    setIsAutoBlasting(false);

    // Apply staggered blast progression across lines
    linesData.forEach((_, lineIdx) => {
      // Top lines explode first, lower lines explode sequentially
      const lineProgress = Math.max(0, Math.min(1, val * 1.5 - lineIdx * 0.15));
      applyLineProgress(lineIdx, lineProgress);
    });
  };

  // Toggle Auto Detonate / Re-assemble animation
  const handleToggleBlast = () => {
    if (blastTweenRef.current) blastTweenRef.current.kill();

    const target = manualScrub > 0.5 ? 0 : 1;
    setIsAutoBlasting(true);

    const proxy = { val: manualScrub };
    blastTweenRef.current = gsap.to(proxy, {
      val: target,
      duration: 2.2,
      ease: target === 1 ? "power3.out" : "elastic.out(1.1, 0.4)",
      onUpdate: () => {
        setManualScrub(proxy.val);
        linesData.forEach((_, lineIdx) => {
          const lineP = Math.max(0, Math.min(1, proxy.val * 1.5 - lineIdx * 0.15));
          applyLineProgress(lineIdx, lineP);
        });
      },
      onComplete: () => {
        setIsAutoBlasting(false);
      },
    });
  };

  // Reset to intact state
  const handleReset = () => {
    if (blastTweenRef.current) blastTweenRef.current.kill();
    setIsAutoBlasting(false);
    setManualScrub(0);
    linesData.forEach((_, lineIdx) => applyLineProgress(lineIdx, 0));
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl bg-white border border-[#2651B9]/15 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.09)] ${className}`}
    >
      {/* Ambient background brand glows (GPU-native radial gradients, zero blur cost) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.06) 0%, rgba(255, 133, 0, 0.01) 40%, transparent 70%)",
        }}
      />
      <div 
        className="absolute bottom-10 left-10 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(38, 81, 185, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header Badge & Title */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF8500]/12 border border-[#FF8500]/30 text-[#C25E00] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{subtitle}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Scroll down the page or drag the scrub slider to watch each headline detonate into dynamic letter scatter, and scroll back to reassemble.
        </p>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-center flex-wrap gap-3">
          <GsapMagneticButton
            onClick={handleToggleBlast}
            variant="primary"
            strength={0.25}
            className="px-5 py-2.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{manualScrub > 0.5 ? "Reassemble Text" : "Detonate All"}</span>
          </GsapMagneticButton>

          <button
            onClick={handleReset}
            aria-label="Reset text layout"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Explosive Headlines Display Canvas */}
      <div
        ref={linesContainerRef}
        className="relative z-10 max-w-5xl mx-auto py-12 flex flex-col items-center justify-center gap-8 sm:gap-11 select-none"
      >
        {lines.map((line, lineIdx) => (
          <div
            key={lineIdx}
            className="explosive-line relative text-center leading-none will-change-transform cursor-pointer"
            onClick={() => {
              // Click to trigger individual line blast animation
              const p = { val: 0 };
              gsap.to(p, {
                val: 1,
                duration: 0.6,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                onUpdate: () => applyLineProgress(lineIdx, p.val),
              });
            }}
          >
            <div className="inline-block whitespace-nowrap text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] transition-colors">
              {line.split("").map((char, charIdx) => {
                const isLetterSpace = char === " ";
                return (
                  <span
                    key={charIdx}
                    ref={(el) => {
                      if (!letterRefs.current[lineIdx]) {
                        letterRefs.current[lineIdx] = [];
                      }
                      letterRefs.current[lineIdx][charIdx] = el;
                    }}
                    className="inline-block will-change-transform transition-colors duration-200"
                    style={{
                      transformOrigin: "center center",
                      marginRight: isLetterSpace ? "0.3em" : "0.015em",
                    }}
                  >
                    {isLetterSpace ? "\u00A0" : char}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Manual Interactive Scrub Control Bar */}
      <div className="relative z-10 max-w-xl mx-auto mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500">
          <Sliders className="w-4 h-4 text-[#C25E00]" />
          <span>Interactive Blast Scrub:</span>
          <span className="font-bold text-slate-800 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
            {Math.round(manualScrub * 100)}%
          </span>
        </div>

        <div className="w-full sm:w-64 flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400">Intact</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(manualScrub * 100)}
            onChange={handleScrubChange}
            aria-label="Manually scrub explosive scroll text"
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF8500] focus:outline-none"
          />
          <span className="text-[11px] font-mono text-slate-400">Blast</span>
        </div>
      </div>
    </section>
  );
};
