"use client";

import React from "react";

interface DesignAppIconProps {
  name: string;
  size?: number; // size of the icon container in px
  className?: string;
}

export const DesignAppIcon: React.FC<DesignAppIconProps> = ({
  name,
  size = 52,
  className = "",
}) => {
  const roundedClass = size >= 50 ? "rounded-[14px]" : "rounded-[10px]";

  switch (name.toLowerCase()) {
    case "photoshop":
    case "ps":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#001E36] border border-[#31A8FF]/60 shadow-[0_6px_20px_rgba(0,30,54,0.7)] ${roundedClass} ${className} select-none`}
        >
          {/* Top specular glossy reflection */}
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#31A8FF]/50 to-transparent" />
          <span className="font-extrabold text-[#31A8FF] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Ps
          </span>
        </div>
      );

    case "illustrator":
    case "ai":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#330000] border border-[#FF9A00]/60 shadow-[0_6px_20px_rgba(51,0,0,0.7)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF9A00]/50 to-transparent" />
          <span className="font-extrabold text-[#FF9A00] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Ai
          </span>
        </div>
      );

    case "aftereffects":
    case "ae":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#00005B] border border-[#9999FF]/60 shadow-[0_6px_20px_rgba(0,0,91,0.7)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#9999FF]/50 to-transparent" />
          <span className="font-extrabold text-[#9999FF] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Ae
          </span>
        </div>
      );

    case "premiere":
    case "pr":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#00005B] border border-[#EA77FF]/60 shadow-[0_6px_20px_rgba(0,0,91,0.7)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EA77FF]/50 to-transparent" />
          <span className="font-extrabold text-[#EA77FF] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Pr
          </span>
        </div>
      );

    case "indesign":
    case "id":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#49021F] border border-[#FF3366]/60 shadow-[0_6px_20px_rgba(73,2,31,0.7)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/50 to-transparent" />
          <span className="font-extrabold text-[#FF3366] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Id
          </span>
        </div>
      );

    case "lightroom":
    case "lr":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#001D26] border border-[#31A8FF]/60 shadow-[0_6px_20px_rgba(0,29,38,0.7)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#31A8FF]/50 to-transparent" />
          <span className="font-extrabold text-[#31A8FF] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            Lr
          </span>
        </div>
      );

    case "figma":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#1E1E1E] border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.7)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <svg width={size * 0.52} height={size * 0.78} viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
          </svg>
        </div>
      );

    case "blender":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#15171C] border border-[#EA7600]/40 shadow-[0_6px_20px_rgba(234,118,0,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EA7600]/40 to-transparent" />
          <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
            <path d="M12 2a4 4 0 0 0-4 4c0 1.6.9 3 2.3 3.6L5.5 13.2a6 6 0 1 0 7.8 8.7l5.3-3.6A6 6 0 0 0 12 2z" fill="#EA7600" />
            <circle cx="12" cy="15" r="3" fill="#225796" />
            <circle cx="12" cy="6" r="1.5" fill="white" />
          </svg>
        </div>
      );

    case "spline":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-gradient-to-br from-[#1E112A] to-[#0D0914] border border-[#FF3366]/40 shadow-[0_6px_20px_rgba(255,51,102,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/40 to-transparent" />
          <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
            <path d="M18 4C14 4 10 8 10 12C10 16 6 20 2 20M22 4C18 4 14 8 14 12C14 16 10 20 6 20" stroke="url(#spline-grad)" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="spline-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#A259FF" />
                <stop offset="100%" stopColor="#FF3366" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case "cinema4d":
    case "c4d":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#071329] border border-[#0055FF]/50 shadow-[0_6px_20px_rgba(0,85,255,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0055FF]/40 to-transparent" />
          <span className="font-extrabold text-[#0088FF] tracking-tighter" style={{ fontSize: size * 0.38 }}>
            C4D
          </span>
        </div>
      );

    case "sketch":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#1C1608] border border-[#FDB300]/50 shadow-[0_6px_20px_rgba(253,179,0,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FDB300]/40 to-transparent" />
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,9 18,21 6,21 2,9" fill="#FDB300" stroke="#FFE082" strokeWidth="1" />
            <polygon points="12,2 18,9 12,21 6,9" fill="#FFA000" />
            <polygon points="12,2 22,9 18,9" fill="#FFCA28" />
            <polygon points="12,2 2,9 6,9" fill="#FFCA28" />
          </svg>
        </div>
      );

    case "framer":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#0A1026] border border-[#0055FF]/50 shadow-[0_6px_20px_rgba(0,85,255,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0055FF]/40 to-transparent" />
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#0055FF">
            <path d="M4 2H20V10H12L20 18H12V22L4 14V10H12L4 2Z" />
          </svg>
        </div>
      );

    case "canva":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-gradient-to-br from-[#00C4CC] to-[#7D2AE8] shadow-[0_6px_20px_rgba(0,196,204,0.4)] ${roundedClass} ${className}`}
        >
          <span className="font-serif italic font-black text-white" style={{ fontSize: size * 0.5 }}>
            C
          </span>
        </div>
      );

    case "procreate":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#111115] border border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.6)] ${roundedClass} ${className}`}
        >
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
            <path d="M4 14C8 10 14 6 20 4C18 10 14 16 10 20C7 20 4 17 4 14Z" fill="url(#procreate-grad)" />
            <defs>
              <linearGradient id="procreate-grad" x1="4" y1="4" x2="20" y2="20">
                <stop offset="0%" stopColor="#FF3366" />
                <stop offset="35%" stopColor="#FFA000" />
                <stop offset="70%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#A259FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case "vscode":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#001D38] border border-[#007ACC]/50 shadow-[0_6px_20px_rgba(0,122,204,0.4)] ${roundedClass} ${className}`}
        >
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#007ACC">
            <path d="M17.5 2.5L7.2 10.3 3.5 7.5 1.5 8.7 5.1 12 1.5 15.3 3.5 16.5 7.2 13.7 17.5 21.5 22.5 19V5L17.5 2.5zM17.5 16.8L10.3 12 17.5 7.2V16.8z" />
          </svg>
        </div>
      );

    case "nextjs":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-white border border-[#2651B9]/20 shadow-sm ${roundedClass} ${className}`}
        >
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="#0F172A" />
            <path d="M149.5 157.4L69.1 54H54V126H66.1V69.4L140 164.8C143.3 162.6 146.5 160.1 149.5 157.4Z" fill="white" />
            <rect x="115" y="54" width="12" height="72" fill="white" />
          </svg>
        </div>
      );

    case "react":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#071726] border border-[#61DAFB]/50 shadow-[0_6px_20px_rgba(97,218,251,0.35)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#61DAFB]/40 to-transparent" />
          <svg width={size * 0.65} height={size * 0.65} viewBox="-11.5 -10.23 23 20.46" fill="none">
            <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
            <g stroke="#61DAFB" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>
      );

    case "wordpress":
    case "wp":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#001D2E] border border-[#21759B]/60 shadow-[0_6px_20px_rgba(33,117,155,0.4)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#21759B]/50 to-transparent" />
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 122.5 122.5" fill="none">
            <path
              d="M8.7 61.3c0 20.7 12 38.6 29.5 47.1L12.5 36.6C10 44.2 8.7 52.4 8.7 61.3zm89.5-3.6c0-6-2.2-10.2-4.1-13.5-2.5-4.1-4.9-7.6-4.9-11.7 0-4.6 3.5-8.9 8.5-8.9.2 0 .5 0 .7.1C86.7 13.9 74.6 8.7 61.3 8.7c-17.7 0-33.3 9.3-42.1 23.3 1.2 0 2.4.1 3.4.1 5.5 0 14.1-.7 14.1-.7 2.9-.1 3.2 4.1.3 4.4 0 0-2.9.3-6.1.5l19.5 58 11.7-35.1-8.3-22.9c-2.9-.2-5.7-.5-5.7-.5-2.9-.1-2.5-4.5.3-4.4 0 0 8.8.7 13.9.7 5.5 0 14.1-.7 14.1-.7 2.9-.1 3.2 4.1.3 4.4 0 0-2.9.3-6.1.5l19.3 57.3 5.4-18c2.9-9.5 5.1-16.3 5.1-22.2zm-43.1 9.8l-16.1 46.8c6.9 2 14.3 3.1 22 3.1 5.9 0 11.7-.7 17.1-2.1l-23-47.8zm55-32.9c.7 2.2 1 4.7 1 7.4 0 7.3-1.4 15.5-5.5 25.8L84.9 104c17.1-8.7 28.9-26.3 28.9-46.8 0-8.5-1.9-16.5-5.2-23.7zM61.3 0C27.4 0 0 27.4 0 61.3s27.4 61.3 61.3 61.3 61.3-27.4 61.3-61.3S95.1 0 61.3 0z"
              fill="#21759B"
            />
          </svg>
        </div>
      );

    case "elementor":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#240312] border border-[#D30C5C]/60 shadow-[0_6px_20px_rgba(211,12,92,0.4)] ${roundedClass} ${className} select-none`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D30C5C]/50 to-transparent" />
          <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#D30C5C" />
            <rect x="5" y="5" width="3.5" height="14" fill="white" />
            <rect x="11.5" y="5" width="7.5" height="3" fill="white" />
            <rect x="11.5" y="10.5" width="7.5" height="3" fill="white" />
            <rect x="11.5" y="16" width="7.5" height="3" fill="white" />
          </svg>
        </div>
      );

    case "tailwind":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#071F2D] border border-[#38BDF8]/50 shadow-[0_6px_20px_rgba(56,189,248,0.3)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
            <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6 12z" fill="#38BDF8" />
          </svg>
        </div>
      );

    case "typescript":
    case "ts":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#0B213D] border border-[#3178C6]/60 shadow-[0_6px_20px_rgba(49,120,198,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3178C6]/50 to-transparent" />
          <span className="font-black text-[#3178C6] tracking-tighter" style={{ fontSize: size * 0.42 }}>
            TS
          </span>
        </div>
      );

    case "gsap":
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-[#131F0A] border border-[#88CE02]/60 shadow-[0_6px_20px_rgba(136,206,2,0.4)] ${roundedClass} ${className}`}
        >
          <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#88CE02]/50 to-transparent" />
          <span className="font-black text-[#88CE02] tracking-tighter" style={{ fontSize: size * 0.38 }}>
            GSAP
          </span>
        </div>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative flex items-center justify-center bg-white border border-[#2651B9]/30 shadow-sm ${roundedClass} font-bold text-xs text-slate-800 ${className}`}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
