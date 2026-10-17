"use client";

import React from "react";

/**
 * Authentic Peekly.app Expanding Ripple Ring Wave over Dot Matrix Grid.
 * Preserves the exact mathematical wave physics and elliptical masking of Peekly,
 * customized with Pixim Design brand colors (Electric Cyan, Royal Blue, Signature Orange).
 * Calibrated with responsive masking and dual staggered ripple waves for fluid, continuous motion.
 */
export const RotatingDotOrbit: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* 1. Subtle central ambient color glow */}
        <div className="absolute top-[36%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[95vw] sm:w-[680px] md:h-[650px] md:w-[950px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(38,81,185,0.24)_0%,rgba(255,133,0,0.08)_40%,transparent_70%)]" />

        {/* 2. Peekly's Exact Dot Matrix Field with Responsive Elliptical Doughnut Mask */}
        <div
          className="absolute inset-0 dot-matrix-mask"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(56, 189, 248, 0.32) 1.1px, transparent 1.1px)",
            backgroundSize: "8px 8px",
            backgroundPosition: "center center",
          }}
        />

        {/* 3. The Animated Expanding Ripple Wave masked through the Dot Matrix */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: "radial-gradient(circle, black 1.1px, transparent 1.1px)",
            WebkitMaskImage: "radial-gradient(circle, black 1.1px, transparent 1.1px)",
            maskSize: "8px 8px",
            WebkitMaskSize: "8px 8px",
            maskPosition: "center center",
            WebkitMaskPosition: "center center",
          }}
        >
          <div className="absolute inset-0 dot-matrix-mask">
            <div className="absolute left-1/2 top-[36%] md:top-[40%] h-[900px] w-[900px] md:h-[1200px] md:w-[1200px] -translate-x-1/2 -translate-y-1/2">
              {/* Primary Expanding Ripple Wave */}
              <div
                className="absolute inset-0 rounded-full animate-ripple-ring"
                style={{
                  background:
                    "radial-gradient(circle, transparent 42.5%, rgba(56, 189, 248, 0.9) 46%, rgba(255, 133, 0, 1) 50%, rgba(56, 189, 248, 0.9) 54%, transparent 57.5%)",
                  opacity: 0,
                }}
              />
              {/* Secondary Staggered Echo Ripple Wave (1.9s cadence offset for continuous flow) */}
              <div
                className="absolute inset-0 rounded-full animate-ripple-ring-delayed"
                style={{
                  background:
                    "radial-gradient(circle, transparent 42.5%, rgba(56, 189, 248, 0.85) 46%, rgba(255, 133, 0, 0.95) 50%, rgba(56, 189, 248, 0.85) 54%, transparent 57.5%)",
                  opacity: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingDotOrbit;

