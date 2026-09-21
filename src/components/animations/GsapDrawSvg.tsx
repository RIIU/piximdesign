"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface GsapDrawSvgProps {
  type?: "swoosh" | "circuit" | "sparkle" | "underline" | "frame";
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  repeat?: boolean;
}

export const GsapDrawSvg: React.FC<GsapDrawSvgProps> = ({
  type = "swoosh",
  className = "",
  strokeColor = "#FF5E1E",
  strokeWidth = 3,
  duration = 1.4,
  delay = 0.2,
  repeat = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path, line, polyline, rect");
    if (!paths.length) return;

    const ctx = gsap.context(() => {
      paths.forEach((element) => {
        const pathEl = element as SVGGeometryElement;
        const totalLength = pathEl.getTotalLength ? pathEl.getTotalLength() : 400;

        // Mimic GSAP DrawSVGPlugin via native strokeDashoffset interpolation
        gsap.set(pathEl, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.inOut",
          repeat: repeat ? -1 : 0,
          yoyo: repeat,
          repeatDelay: 1.5,
        });
      });
    }, svg);

    return () => ctx.revert();
  }, [duration, delay, repeat]);

  if (type === "swoosh") {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 340 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full overflow-visible ${className}`}
      >
        <path
          d="M4 22C68 8 180 2 336 18C260 28 120 34 20 28"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "underline") {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 260 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full overflow-visible ${className}`}
      >
        <path
          d="M2 12C70 4 175 4 258 14"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M40 16C110 9 195 10 240 17"
          stroke="#FF8C38"
          strokeWidth={Math.max(1, strokeWidth - 1)}
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (type === "sparkle") {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-8 h-8 overflow-visible ${className}`}
      >
        <path
          d="M24 2C24 14 34 24 46 24C34 24 24 34 24 46C24 34 14 24 2 24C14 24 24 14 24 2Z"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "circuit") {
    return (
      <svg
        ref={svgRef}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full overflow-visible ${className}`}
      >
        <path
          d="M0 30H50L75 10H140L160 50H200"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Frame preset
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <rect
        x="4"
        y="4"
        width="292"
        height="192"
        rx="16"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
