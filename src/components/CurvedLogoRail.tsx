"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoItem } from "@/data/agencyData";
import { TechIcon } from "./TechIcons";

interface CurvedLogoRailProps {
  logos: LogoItem[];
  direction?: "left" | "right";
  speed?: number; // seconds per full loop
  curveOffset?: number; // curvature in pixels
  className?: string;
  railIndex?: number;
}

export const CurvedLogoRail: React.FC<CurvedLogoRailProps> = ({
  logos,
  direction = "right",
  speed = 35,
  curveOffset = 40,
  className = "",
  railIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<LogoItem | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Triple the array for seamless infinite looping without gaps
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      // Initial positioning depending on direction
      const startX = direction === "right" ? -totalWidth : 0;
      const endX = direction === "right" ? 0 : -totalWidth;

      gsap.set(track, { x: startX });

      const tween = gsap.to(track, {
        x: endX,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const current = parseFloat(x);
            if (direction === "right") {
              return current >= 0 ? `${-totalWidth + (current % totalWidth)}px` : `${current}px`;
            } else {
              return current <= -totalWidth ? `${current % totalWidth}px` : `${current}px`;
            }
          }),
        },
      });

      tweenRef.current = tween;

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [direction, speed] }
  );

  // Smooth deceleration when hovering
  useEffect(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: isHovered ? 0.2 : 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none py-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTooltip(null);
      }}
    >
      {/* Curved glowing line underneath ("niche line") */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none h-16 w-full flex items-center justify-center overflow-visible">
        <svg
          className="w-[120%] -ml-[10%] h-14 overflow-visible"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id={`railGrad-${railIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ff7a00" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
            </linearGradient>
            <filter id={`railGlow-${railIndex}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underneath guide rail path with smooth curve */}
          <path
            d={`M 0,${30 + curveOffset * 0.2} Q 600,${30 - curveOffset} 1200,${30 + curveOffset * 0.2}`}
            stroke={`url(#railGrad-${railIndex})`}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="opacity-75"
          />

          {/* Outer diffuse glow stroke */}
          <path
            d={`M 0,${30 + curveOffset * 0.2} Q 600,${30 - curveOffset} 1200,${30 + curveOffset * 0.2}`}
            stroke={railIndex % 2 === 0 ? "rgba(255, 122, 0, 0.25)" : "rgba(37, 99, 235, 0.25)"}
            strokeWidth="3"
            filter={`url(#railGlow-${railIndex})`}
            className="opacity-60"
          />
        </svg>
      </div>

      {/* Moving Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 md:gap-8 w-max will-change-transform pb-4"
      >
        {repeatedLogos.map((item, idx) => {
          const isActive = activeTooltip?.id === item.id;
          return (
            <div
              key={`${item.id}-${idx}`}
              className="relative group flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setActiveTooltip(item)}
            >
              {/* Logo Card */}
              <div
                className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-[#2651B9]/15 shadow-sm transition-all duration-300 group-hover:scale-115 group-hover:border-[#2651B9]/40 group-hover:shadow-[0_12px_24px_-8px_rgba(38,81,185,0.18)] ${
                  isActive ? "ring-2 ring-[#FF8500]/50" : ""
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 10px 25px -5px ${item.color}30, 0 0 15px 0 ${item.color}15`
                    : undefined,
                }}
              >
                {/* Tech Icon */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <TechIcon name={item.iconType} size={28} />
                </div>

                {/* Ambient glow behind icon on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Vertical connector anchor to the line underneath */}
              <div className="w-[1px] h-3 bg-gradient-to-b from-slate-300 to-transparent group-hover:from-[#FF8500] group-hover:h-4 transition-all duration-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#FF8500] group-hover:scale-150 transition-all duration-300" />

              {/* Hover Tooltip */}
              {isActive && (
                <div className="absolute bottom-full mb-3 px-3 py-1.5 rounded-xl bg-white/95 border border-[#2651B9]/20 shadow-xl backdrop-blur-xl text-center pointer-events-none z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 justify-center">
                    <span>{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 max-w-[180px] truncate">
                    {item.tagline}
                  </p>
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#2651B9]/20 rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
