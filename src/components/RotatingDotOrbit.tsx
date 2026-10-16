"use client";

import React from "react";

export const RotatingDotOrbit: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`pointer-events-none select-none absolute left-1/2 top-[38%] md:top-[40%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] md:w-[820px] md:h-[820px] lg:w-[1000px] lg:h-[1000px] flex items-center justify-center z-[1] ${className}`}
      style={{
        maskImage: "radial-gradient(circle at 50% 50%, black 28%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.3) 72%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 28%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.3) 72%, transparent 85%)",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="dot-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="dot-glow-orange" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="orbit-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#2563EB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#081330" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft central radiant aura behind dots */}
        <circle cx="500" cy="500" r="320" fill="url(#orbit-core-glow)" />

        {/* Ring 1 - Innermost Cyan Dots (Clockwise, 42s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin 42s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="95"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0 20"
            opacity="0.75"
            filter="url(#dot-glow-cyan)"
          />
        </g>

        {/* Ring 2 - Electric Blue Dots (Counter-Clockwise, 54s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin-reverse 54s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="155"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0 24"
            opacity="0.6"
          />
        </g>

        {/* Ring 3 - Pixim Brand Orange Glowing Dots (Clockwise, 48s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin 48s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="225"
            fill="none"
            stroke="#FF8500"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="0 30"
            opacity="0.8"
            filter="url(#dot-glow-orange)"
          />
        </g>

        {/* Subtle Arc Track Accent between rings */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin-reverse 75s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="260"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="30 160"
            opacity="0.3"
          />
        </g>

        {/* Ring 4 - Deep Royal Blue Dots (Counter-Clockwise, 68s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin-reverse 68s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="305"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="0 36"
            opacity="0.55"
          />
        </g>

        {/* Ring 5 - Ice Cyan Dots with Glow (Clockwise, 78s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin 78s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="385"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0 42"
            opacity="0.65"
            filter="url(#dot-glow-cyan)"
          />
        </g>

        {/* Ring 6 - Pixim Warm Amber / Orange (Counter-Clockwise, 62s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin-reverse 62s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="465"
            fill="none"
            stroke="#FFA229"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0 48"
            opacity="0.6"
            filter="url(#dot-glow-orange)"
          />
        </g>

        {/* Ring 7 - Outer Perimeter Dots (Clockwise, 96s) */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin 96s linear infinite" }}>
          <circle
            cx="500"
            cy="500"
            r="545"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="0 54"
            opacity="0.45"
          />
        </g>

        {/* Orbital Satellites / Glowing Accent Beacons */}
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin 34s linear infinite" }}>
          <circle cx="500" cy="275" r="4.5" fill="#FF8500" filter="url(#dot-glow-orange)" />
          <circle cx="500" cy="725" r="3.5" fill="#38BDF8" filter="url(#dot-glow-cyan)" />
        </g>
        <g style={{ transformOrigin: "500px 500px", animation: "orbit-spin-reverse 44s linear infinite" }}>
          <circle cx="115" cy="500" r="4" fill="#38BDF8" filter="url(#dot-glow-cyan)" />
          <circle cx="885" cy="500" r="4.5" fill="#FFA229" filter="url(#dot-glow-orange)" />
        </g>
      </svg>
    </div>
  );
};
