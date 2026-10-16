"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";

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

  const items = [
    // 1. Trusted by + Overlapping Brand Logos (Exactly like mzmedia)
    {
      id: "trusted-by",
      content: (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="text-white/80 text-[11px] sm:text-xs md:text-sm font-medium tracking-wide">
            Trusted by
          </span>
          <div className="flex items-center -space-x-1.5 sm:-space-x-2">
            {/* Logo 1 - Electric Blue Wave */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#081330] bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-bold text-white leading-none">P</span>
            </div>
            {/* Logo 2 - Brand Orange Geometric */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#081330] bg-gradient-to-tr from-[#EA580C] to-[#FF8500] flex items-center justify-center shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-bold text-white leading-none">X</span>
            </div>
            {/* Logo 3 - Electric Cyan Helix */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#081330] bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#081330] leading-none">✦</span>
            </div>
            {/* Logo 4 - Indigo Minimalist */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#081330] bg-gradient-to-tr from-[#4338CA] to-[#6366F1] flex items-center justify-center shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-bold text-white leading-none">M</span>
            </div>
            {/* Logo 5 - Magenta Accent */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#081330] bg-gradient-to-tr from-[#C026D3] to-[#E879F9] flex items-center justify-center shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-bold text-white leading-none">★</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      ),
    },
    // 2. Global Reach: 500+ Brands Worldwide
    {
      id: "brands-count",
      content: (
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8500] shrink-0" />
          <span className="text-white/90 text-[11px] sm:text-xs md:text-sm font-medium">
            500+ Brands Worldwide
          </span>
          <span className="text-white/40 text-[10px] sm:text-xs hidden sm:inline">•</span>
          <span className="text-white/60 text-[10px] sm:text-xs hidden sm:inline">30+ Countries</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      ),
    },
    // 3. Client Rating: 4.9 / 5.0
    {
      id: "rating",
      content: (
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <span className="text-white font-semibold text-[11px] sm:text-xs md:text-sm">
            4.9 / 5.0
          </span>
          <span className="text-white/60 text-[10px] sm:text-xs">(500+ Reviews)</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      ),
    },
    // 4. IP Ownership Guarantee
    {
      id: "ip-ownership",
      content: (
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
          <span className="text-white/90 text-[11px] sm:text-xs md:text-sm font-medium">
            100% Vector IP Ownership
          </span>
          <span className="text-white/60 text-[10px] sm:text-xs hidden sm:inline">Guaranteed</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8500] group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3600);
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
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Subtle top light bar (as seen in mzmedia) */}
      <div className="w-24 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent mb-2.5 opacity-80" />

      {/* Rotating pill container */}
      <a
        href="#testimonials"
        onClick={handleClick}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="group relative h-9 sm:h-10 min-w-[240px] sm:min-w-[270px] max-w-[340px] px-3.5 sm:px-4 rounded-full border border-white/15 bg-[#0C1E4E]/60 hover:bg-[#0C1E4E]/90 hover:border-[#FF8500]/50 backdrop-blur-xl shadow-[0_4px_20px_rgba(4,10,28,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer select-none"
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
              className={`absolute inset-0 flex items-center justify-center px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${positionStyle}`}
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
