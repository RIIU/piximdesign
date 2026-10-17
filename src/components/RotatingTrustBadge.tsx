"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Globe, ChevronRight } from "lucide-react";

interface RotatingTrustBadgeProps {
  onClick?: () => void;
  className?: string;
}

export const RotatingTrustBadge: React.FC<RotatingTrustBadgeProps> = ({
  onClick,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fast 1.8s rotation interval (within the requested 1.5s - 2s window)
  const ROTATION_INTERVAL = 1800;

  const items = [
    // 1. Trusted by + Overlapping Brand Logos (Single line strictly guaranteed)
    {
      id: "trusted-by",
      content: (
        <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap shrink-0">
          <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
            Trusted by
          </span>
          <div className="flex items-center -space-x-1.5 sm:-space-x-2 shrink-0">
            {/* Logo 1 - Electric Blue (P) */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-[#081330] bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-bold text-white leading-none">P</span>
            </div>
            {/* Logo 2 - Brand Orange (I) */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-[#081330] bg-gradient-to-tr from-[#EA580C] to-[#FF8500] flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-bold text-white leading-none">I</span>
            </div>
            {/* Logo 3 - Electric Cyan (X) */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-[#081330] bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-bold text-[#081330] leading-none">X</span>
            </div>
            {/* Logo 4 - Indigo (I) */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-[#081330] bg-gradient-to-tr from-[#4338CA] to-[#6366F1] flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-bold text-white leading-none">I</span>
            </div>
            {/* Logo 5 - Violet (M) */}
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-[#081330] bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-bold text-white leading-none">M</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
        </div>
      ),
    },
    // 2. Global Reach: 500+ Brands Worldwide
    {
      id: "brands-count",
      content: (
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <Globe className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
          <span className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">
            500+ Brands Worldwide
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
        </div>
      ),
    },
    // 3. Client Rating: 4.9 / 5.0
    {
      id: "rating",
      content: (
        <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0">
          <div className="flex text-amber-400 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400" />
            ))}
          </div>
          <span className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">
            4.9 / 5.0
          </span>
          <span className="text-white/60 text-[11px] sm:text-xs whitespace-nowrap">(500+ Reviews)</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
        </div>
      ),
    },
    // 4. IP Ownership Guarantee
    {
      id: "ip-ownership",
      content: (
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
          <span className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">
            100% Vector IP Ownership
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200 shrink-0" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      const el = document.getElementById("testimonials") || document.getElementById("portfolio");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center whitespace-nowrap ${className}`}>
      {/* Rotating pill container with locked stable width to eliminate layout jitter */}
      <a
        href="#testimonials"
        onClick={handleClick}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="group relative h-9 sm:h-10 w-[272px] sm:w-[290px] px-3.5 sm:px-5 rounded-full border border-white/20 bg-[#0C1E4E]/70 hover:bg-[#0C1E4E]/95 hover:border-[#FF8500]/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(4,10,28,0.5),inset_0_1px_1px_rgba(255,255,255,0.14)] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center overflow-hidden cursor-pointer select-none whitespace-nowrap"
        aria-label="View Client Trust and Reviews"
      >
        {items.map((item, idx) => {
          let positionStyle = "translate-y-full opacity-0 pointer-events-none";
          if (idx === currentIndex) {
            positionStyle = "translate-y-0 opacity-100 pointer-events-auto";
          } else if (idx === (currentIndex - 1 + items.length) % items.length) {
            positionStyle = "-translate-y-full opacity-0 pointer-events-none";
          }

          return (
            <div
              key={item.id}
              className={`absolute inset-0 flex items-center justify-center px-3.5 sm:px-4 whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${positionStyle}`}
            >
              {item.content}
            </div>
          );
        })}
      </a>
    </div>
  );
};

export default RotatingTrustBadge;
