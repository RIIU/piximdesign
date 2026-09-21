"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DESIGN_ORBIT, DEV_ORBIT, DesignAppItem } from "@/data/agencyData";
import { DesignAppIcon } from "./DesignAppIcon";

interface ConcentricOrbitHeroProps {
  className?: string;
  children?: React.ReactNode;
}

export const ConcentricOrbitHero: React.FC<ConcentricOrbitHeroProps> = ({
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const designOrbitRef = useRef<HTMLDivElement>(null);
  const devOrbitRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<DesignAppItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  const designTweenRef = useRef<gsap.core.Tween | null>(null);
  const devTweenRef = useRef<gsap.core.Tween | null>(null);

  // Responsive scale and screen mode observer
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const mobile = screenWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        // Desktop / Tablet: outer orbit is 1060px + icon margins = 1160px
        const targetWidth = 1160;
        const availableWidth = Math.max(768, screenWidth - 32);
        const computedScale = Math.min(1.0, availableWidth / targetWidth);
        setScale(computedScale);
      } else {
        // On mobile, native mobile radii are used (440px diameter fits full edge-to-edge)
        setScale(1.0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Geometry calculations:
  // Mobile (<768px): R1 = 155px, R2 = 220px, CENTER_Y = 245px (container 490px)
  // Desktop (>=768px): R1 = 390px, R2 = 530px, CENTER_Y = 550px (container 800px)
  const R1 = isMobile ? 155 : 390;
  const R2 = isMobile ? 220 : 530;
  const CENTER_Y = isMobile ? 245 : 550;
  const iconSize = isMobile ? 36 : 52;
  const innerItems = isMobile ? DESIGN_ORBIT.slice(0, 10) : DESIGN_ORBIT.slice(0, 16);
  const outerItems = isMobile ? DEV_ORBIT.slice(0, 14) : DEV_ORBIT.slice(0, 20);

  // GSAP 2-Orbit Continuous Choreography
  useGSAP(
    () => {
      // 1. Inner Circle (Design) - Clockwise
      designTweenRef.current = gsap.to(designOrbitRef.current, {
        rotation: 360,
        duration: isMobile ? 40 : 50,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // Counter-rotate design icons to keep them upright
      const designIconsTween = gsap.to(".design-counter-icon", {
        rotation: -360,
        duration: isMobile ? 40 : 50,
        repeat: -1,
        ease: "none",
      });

      // 2. Outer Circle (Development) - Counter-Clockwise
      devTweenRef.current = gsap.to(devOrbitRef.current, {
        rotation: -360,
        duration: isMobile ? 56 : 70,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // Counter-rotate dev icons to keep them upright
      const devIconsTween = gsap.to(".dev-counter-icon", {
        rotation: 360,
        duration: isMobile ? 56 : 70,
        repeat: -1,
        ease: "none",
      });

      return () => {
        designTweenRef.current?.kill();
        devTweenRef.current?.kill();
        designIconsTween.kill();
        devIconsTween.kill();
      };
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  // IntersectionObserver to pause animations when Hero is scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          designTweenRef.current?.resume();
          devTweenRef.current?.resume();
        } else {
          designTweenRef.current?.pause();
          devTweenRef.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth deceleration on hover
  useEffect(() => {
    const timeScale = isHovered ? 0.15 : 1;
    [designTweenRef.current, devTweenRef.current].forEach((tw) => {
      if (tw) {
        gsap.to(tw, { timeScale, duration: 0.6, ease: "power2.out" });
      }
    });
  }, [isHovered]);

  // Helper to render items along a circular orbit as an ambient background layer
  const renderOrbitItems = (
    items: DesignAppItem[],
    radius: number,
    counterClass: string,
    orbitLayer: "inner" | "outer",
    size: number
  ) => {
    const total = items.length;
    const layerDepth = orbitLayer === "outer" 
      ? (isMobile ? "opacity-60" : "opacity-60 hover:opacity-100")
      : (isMobile ? "opacity-75" : "opacity-75 hover:opacity-100");

    return items.map((item, index) => {
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      const x = Math.round(radius * Math.cos(angle) * 10) / 10;
      const y = Math.round(radius * Math.sin(angle) * 10) / 10;

      return (
        <div
          key={`${item.id}-${index}`}
          className="absolute left-1/2 top-1/2 cursor-pointer group pointer-events-auto"
          style={{
            transform: `translate3d(${x}px, ${y}px, 0)`,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            setActiveItem(item);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveItem(null);
          }}
        >
          <div
            className={`${counterClass} ${layerDepth} transition-all duration-300 group-hover:scale-125 group-hover:z-50 group-hover:opacity-100 group-hover:drop-shadow-[0_12px_24px_rgba(38,81,185,0.2)]`}
          >
            <DesignAppIcon name={item.appKey} size={size} />
          </div>
        </div>
      );
    });
  };

  const svgSize = (R2 + 20) * 2;
  const svgCenter = R2 + 20;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[490px] md:h-[800px] flex justify-center pointer-events-none select-none transition-[height] duration-300 ${className}`}
    >
      {/* Atmospheric radial glow behind the center */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[850px] h-[350px] md:h-[550px] rounded-full bg-gradient-to-b from-blue-600/10 via-orange-500/8 to-transparent blur-3xl pointer-events-none" 
        style={{ top: CENTER_Y }}
      />

      {/*
        BACKGROUND ORBIT GRAPHICS LAYER:
        - On desktop: smoothly scaled via scale observer if screen is between 768px and 1160px
        - On mobile: renders with dedicated mobile radii (440px diameter) at 1:1 scale
      */}
      <div
        style={{ 
          transform: !isMobile && scale < 1.0 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
        }}
        className="absolute inset-0 flex justify-center pointer-events-none overflow-hidden"
      >
        <div
          className="absolute inset-x-0 top-0 h-[490px] md:h-[800px] flex justify-center pointer-events-none opacity-65 hover:opacity-85 transition-opacity duration-700"
          style={{
            maskImage: isMobile
              ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.4) 83%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: isMobile
              ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.4) 83%, rgba(0,0,0,0) 90%, rgba(0,0,0,0) 100%)",
          }}
        >
          {/* SVG Circular Guide Rails */}
          <svg
            className="absolute pointer-events-none z-0 opacity-40"
            style={{
              top: CENTER_Y - svgCenter,
              width: svgSize,
              height: svgSize,
            }}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
          >
            <defs>
              <linearGradient id="orbit1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ea77ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff9a00" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="orbit2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007aff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#d30c5c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Orbit 1 Inner Circular Rail */}
            <circle
              cx={svgCenter}
              cy={svgCenter}
              r={R1}
              fill="none"
              stroke="url(#orbit1Grad)"
              strokeWidth="1.5"
              strokeDasharray={isMobile ? "4 3" : "6 4"}
              className="opacity-70"
            />

            {/* Orbit 2 Outer Circular Rail */}
            <circle
              cx={svgCenter}
              cy={svgCenter}
              r={R2}
              fill="none"
              stroke="url(#orbit2Grad)"
              strokeWidth="1.5"
              strokeDasharray={isMobile ? "6 4" : "8 5"}
              className="opacity-70"
            />
          </svg>

          {/* ORBIT 2 (Outer Circle): DEVELOPMENT TOOLS */}
          <div
            ref={devOrbitRef}
            className="absolute rounded-full flex items-center justify-center pointer-events-none"
            style={{
              top: CENTER_Y - R2,
              width: R2 * 2,
              height: R2 * 2,
            }}
          >
            {renderOrbitItems(outerItems, R2, "dev-counter-icon", "outer", iconSize)}
          </div>

          {/* ORBIT 1 (Inner Circle): DESIGN TOOLS */}
          <div
            ref={designOrbitRef}
            className="absolute rounded-full flex items-center justify-center pointer-events-none"
            style={{
              top: CENTER_Y - R1,
              width: R1 * 2,
              height: R1 * 2,
            }}
          >
            {renderOrbitItems(innerItems, R1, "design-counter-icon", "inner", iconSize)}
          </div>
        </div>
      </div>

      {/*
        FOREGROUND HERO CONTENT (Children):
        - Positioned cleanly at CENTER_Y with translateY(-50%)
        - NEVER scaled down by CSS scale! Always 100% crisp and readable on mobile, tablet & desktop!
      */}
      <div 
        className="absolute z-20 pointer-events-auto flex flex-col items-center justify-center text-center px-4 max-w-2xl w-full"
        style={{ top: CENTER_Y, transform: "translateY(-50%)" }}
      >
        {children}
      </div>

      {/* Active Software Tooltip Floating gracefully at the top */}
      {activeItem && (
        <div className="absolute top-2 md:top-4 z-40 px-4 py-1.5 md:px-5 md:py-2 rounded-2xl bg-white/95 border border-[#2651B9]/25 shadow-xl backdrop-blur-2xl text-center pointer-events-none animate-in fade-in zoom-in-95 duration-200 max-w-[90vw]">
          <div className="text-xs md:text-sm font-bold text-slate-900 flex items-center gap-2 justify-center">
            <span style={{ color: activeItem.color }}>{activeItem.name}</span>
            <span className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono border border-slate-200">
              {activeItem.category}
            </span>
          </div>
          <p className="text-[11px] md:text-xs text-slate-500 mt-0.5 font-medium truncate max-w-xs">{activeItem.tagline}</p>
        </div>
      )}
    </div>
  );
};

