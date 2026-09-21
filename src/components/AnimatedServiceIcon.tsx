"use client";

import React from "react";

interface AnimatedServiceIconProps {
  type: string;
  size?: number;
  className?: string;
}

export const AnimatedServiceIcon: React.FC<AnimatedServiceIconProps> = ({
  type,
  size = 48,
  className = "",
}) => {
  switch (type) {
    case "logo-design":
      // Animated Vector Pen Tool & Bezier Anchor Points
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,122,0,0.35)]">
            <defs>
              <linearGradient id="penGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9A00" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
              <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9A00" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#FF3366" />
              </linearGradient>
            </defs>
            {/* Bezier dynamic curve */}
            <path
              d="M 10 46 C 18 18, 46 18, 54 46"
              stroke="url(#curveGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 2"
              className="group-hover:stroke-dashoffset-12 transition-all duration-700"
            />
            {/* Handle guide lines */}
            <line x1="10" y1="46" x2="18" y2="18" stroke="#FFA133" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="2 2" />
            <line x1="54" y1="46" x2="46" y2="18" stroke="#FF5533" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="2 2" />
            {/* Anchor points */}
            <circle cx="10" cy="46" r="3" fill="#FFFFFF" stroke="#FF7A00" strokeWidth="1.5" />
            <circle cx="54" cy="46" r="3" fill="#FFFFFF" stroke="#FF3366" strokeWidth="1.5" />
            <rect x="15.5" y="15.5" width="5" height="5" fill="#FFA133" rx="1" />
            <rect x="43.5" y="15.5" width="5" height="5" fill="#FF5533" rx="1" />
            {/* Fountain Pen Tool Body */}
            <g className="origin-center group-hover:-translate-y-1 group-hover:rotate-6 transition-transform duration-300">
              <path
                d="M 32 12 L 40 28 L 34 32 L 34 44 L 30 44 L 30 32 L 24 28 Z"
                fill="url(#penGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="27" r="1.8" fill="#181a20" />
              <line x1="32" y1="27" x2="32" y2="13" stroke="#181a20" strokeWidth="1" />
            </g>
            {/* Sparkle star */}
            <path
              d="M 48 8 L 49.5 12 L 53.5 13.5 L 49.5 15 L 48 19 L 46.5 15 L 42.5 13.5 L 46.5 12 Z"
              fill="#FFD700"
              className="animate-pulse"
            />
          </svg>
        </div>
      );

    case "web-design":
      // Animated Interactive Browser & Code Editor
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,122,255,0.35)]">
            <defs>
              <linearGradient id="webBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007AFF" />
                <stop offset="100%" stopColor="#00C4CC" />
              </linearGradient>
            </defs>
            {/* Browser Window */}
            <rect x="8" y="12" width="48" height="40" rx="6" fill="#0D1117" stroke="url(#webBorder)" strokeWidth="2" />
            {/* Top Window Bar */}
            <path d="M 8 18 C 8 15, 11 12, 14 12 L 50 12 C 53 12, 56 15, 56 18 L 56 22 L 8 22 Z" fill="#161B22" />
            {/* Window dots */}
            <circle cx="15" cy="17" r="1.8" fill="#FF5F56" />
            <circle cx="21" cy="17" r="1.8" fill="#FFBD2E" />
            <circle cx="27" cy="17" r="1.8" fill="#27C93F" />
            {/* URL bar pill */}
            <rect x="33" y="15" width="18" height="4" rx="2" fill="#21262D" />
            {/* Code Brackets & Slash in Center */}
            <g className="group-hover:scale-105 transition-transform duration-300 origin-center">
              <path d="M 23 30 L 17 36 L 23 42" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 41 30 L 47 36 L 41 42" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 35 28 L 29 44" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            </g>
            {/* Bottom mini status bar */}
            <rect x="14" y="46" width="12" height="2" rx="1" fill="#38BDF8" opacity="0.7" />
            <rect x="29" y="46" width="8" height="2" rx="1" fill="#FFFFFF" opacity="0.3" />
          </svg>
        </div>
      );

    case "package-design":
      // Animated 3D Isometric Package Box with seal
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(168,85,247,0.35)]">
            <defs>
              <linearGradient id="boxTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="boxLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#6B21A8" />
              </linearGradient>
              <linearGradient id="boxRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7E22CE" />
                <stop offset="100%" stopColor="#581C87" />
              </linearGradient>
            </defs>
            {/* 3D Box Top Face */}
            <path d="M 32 12 L 52 23 L 32 34 L 12 23 Z" fill="url(#boxTop)" stroke="#E9D5FF" strokeWidth="1" />
            {/* 3D Box Left Face */}
            <path d="M 12 23 L 32 34 L 32 52 L 12 41 Z" fill="url(#boxLeft)" stroke="#E9D5FF" strokeWidth="1" />
            {/* 3D Box Right Face */}
            <path d="M 32 34 L 52 23 L 52 41 L 32 52 Z" fill="url(#boxRight)" stroke="#E9D5FF" strokeWidth="1" />
            {/* Branding Seal on Front */}
            <circle cx="22" cy="35" r="4.5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="1" className="group-hover:scale-125 origin-center transition-transform" />
            {/* Tape / Ribbon detail across top */}
            <path d="M 28 14 L 36 18.5 L 36 31.5 L 28 27 Z" fill="#F43F5E" opacity="0.8" />
            {/* Star badge */}
            <circle cx="42" cy="32" r="1.5" fill="#38BDF8" className="animate-ping" />
          </svg>
        </div>
      );

    case "social-media":
      // Animated Social Media Creative & Poster with Engagement Heart
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(244,63,94,0.35)]">
            <defs>
              <linearGradient id="posterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="artGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            {/* Main Poster Frame */}
            <rect x="12" y="10" width="40" height="44" rx="6" fill="#18181B" stroke="url(#posterGrad)" strokeWidth="2" />
            {/* Artwork Canvas inside */}
            <rect x="16" y="14" width="32" height="26" rx="4" fill="url(#artGrad)" opacity="0.85" />
            {/* Sun/Moon Circle */}
            <circle cx="24" cy="22" r="3.5" fill="#FDE047" />
            {/* Mountain Graphic */}
            <path d="M 16 36 L 26 26 L 33 33 L 40 24 L 48 36 Z" fill="#0F172A" opacity="0.6" />
            {/* Caption Lines */}
            <rect x="16" y="44" width="18" height="2.5" rx="1.2" fill="#FFFFFF" opacity="0.8" />
            <rect x="16" y="49" width="10" height="2" rx="1" fill="#FFFFFF" opacity="0.4" />
            {/* Floating Engagement Heart Badge */}
            <g className="group-hover:scale-125 transition-transform duration-300 origin-center">
              <circle cx="44" cy="46" r="6.5" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1.2" />
              <path
                d="M 44 49 C 44 49, 40.5 46.5, 40.5 44.5 C 40.5 43.5, 41.3 42.7, 42.3 42.7 C 43 42.7, 43.7 43.2, 44 43.7 C 44.3 43.2, 45 42.7, 45.7 42.7 C 46.7 42.7, 47.5 43.5, 47.5 44.5 C 47.5 46.5, 44 49, 44 49 Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>
      );

    case "motion-video":
      // Animated Video Clapperboard & Kinetic Motion Play
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)]">
            <defs>
              <linearGradient id="clapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* Clapper Top Bar (tilted) */}
            <g className="origin-bottom-left group-hover:-rotate-8 transition-transform duration-300">
              <rect x="10" y="14" width="44" height="10" rx="3" fill="#1F2937" stroke="url(#clapGrad)" strokeWidth="1.5" />
              {/* Clapper stripes */}
              <path d="M 18 14 L 23 24 M 28 14 L 33 24 M 38 14 L 43 24 M 48 14 L 53 24" stroke="#FFFFFF" strokeWidth="2.5" />
            </g>
            {/* Clapper Bottom Board */}
            <rect x="10" y="26" width="44" height="26" rx="4" fill="#111827" stroke="url(#clapGrad)" strokeWidth="1.8" />
            {/* Play Button Symbol */}
            <circle cx="32" cy="39" r="8" fill="url(#clapGrad)" className="group-hover:scale-110 transition-transform origin-center" />
            <polygon points="30,35 36,39 30,43" fill="#FFFFFF" />
            {/* Sound / Motion wave pulses */}
            <path d="M 44 35 C 46 37, 46 41, 44 43" stroke="#34D399" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            <path d="M 48 32 C 51 36, 51 42, 48 46" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      );

    case "seo-growth":
      // Animated SEO Target Radar & Rising Traffic Bars
      return (
        <div className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${className}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)]">
            <defs>
              <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            {/* Axis grid lines */}
            <line x1="12" y1="52" x2="52" y2="52" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="14" x2="12" y2="52" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
            {/* Bar 1 */}
            <rect x="16" y="38" width="6" height="14" rx="2" fill="#FBBF24" opacity="0.5" />
            {/* Bar 2 */}
            <rect x="25" y="30" width="6" height="22" rx="2" fill="#F59E0B" opacity="0.75" />
            {/* Bar 3 */}
            <rect x="34" y="22" width="6" height="30" rx="2" fill="url(#barGrad)" />
            {/* Bar 4 */}
            <rect x="43" y="14" width="6" height="38" rx="2" fill="url(#barGrad)" className="group-hover:brightness-125 transition-all" />
            {/* Rising Trend Arrow */}
            <path
              d="M 16 42 Q 30 32, 47 16"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="group-hover:stroke-cyan-300 transition-colors"
            />
            <polygon points="47,12 51,16 45,18" fill="#38BDF8" />
            {/* Target Crosshair */}
            <circle cx="48" cy="15" r="5" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: "8s" }} />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
