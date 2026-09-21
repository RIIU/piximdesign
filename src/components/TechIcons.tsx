"use client";

import React from "react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<IconProps> = ({ name, className = "w-6 h-6", size = 24 }) => {
  switch (name.toLowerCase()) {
    case "photoshop":
    case "ps":
      return (
        <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#001E36] rounded-xl border border-[#31A8FF]/60 font-black text-[#31A8FF]">
          Ps
        </div>
      );

    case "illustrator":
    case "ai":
      return (
        <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#330000] rounded-xl border border-[#FF9A00]/60 font-black text-[#FF9A00]">
          Ai
        </div>
      );

    case "aftereffects":
    case "ae":
      return (
        <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#00005B] rounded-xl border border-[#9999FF]/60 font-black text-[#9999FF]">
          Ae
        </div>
      );

    case "blender":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2a4 4 0 0 0-4 4c0 1.6.9 3 2.3 3.6L5.5 13.2a6 6 0 1 0 7.8 8.7l5.3-3.6A6 6 0 0 0 12 2z" fill="#EA7600" />
          <circle cx="12" cy="15" r="3" fill="#225796" />
          <circle cx="12" cy="6" r="1.5" fill="white" />
        </svg>
      );

    case "wordpress":
    case "wp":
      return (
        <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#001D2E] rounded-xl border border-[#21759B]/60 text-white font-black text-xs">
          WP
        </div>
      );

    case "elementor":
      return (
        <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#240312] rounded-xl border border-[#D30C5C]/60 text-white font-black text-xs">
          EL
        </div>
      );

    case "figma":
      return (
        <svg width={size} height={size} viewBox="0 0 38 57" fill="none" className={className}>
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      );

    case "nextjs":
      return (
        <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className}>
          <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#nextjs-mask)">
            <circle cx="90" cy="90" r="90" fill="#0a0a0a" stroke="#ffffff" strokeWidth="6" />
            <path d="M149.508 157.438L69.1447 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#next_paint0)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1)" />
          </g>
          <defs>
            <linearGradient id="next_paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="next_paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "react":
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "typescript":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M1.5 64C1.5 29.5 29.5 1.5 64 1.5s62.5 28 62.5 62.5-28 62.5-62.5 62.5S1.5 98.5 1.5 64" fill="#3178C6" />
          <path d="M70.5 86.8c1.7 1 3.8 1.6 6.3 1.6 4.3 0 7-2.2 7-6.2 0-3.9-2.6-5.8-7.5-8-6.2-2.7-10.4-6.4-10.4-13.7 0-7.8 6.1-13.6 15.6-13.6 4.1 0 7.3.9 9.6 2.1l-2.4 6.7c-1.8-.9-4.1-1.6-6.8-1.6-4.9 0-7.4 2.5-7.4 5.7 0 3.7 2.7 5.4 8.2 7.8 6.9 3 9.8 6.7 9.8 14 0 8.6-6.4 14.3-16.7 14.3-4.9 0-9.2-1.3-11.8-2.8l2.7-6.3zM46.8 54.3H33.5v-7.1h35.3v7.1H55.4V102H46.8V54.3z" fill="#ffffff" />
        </svg>
      );

    case "gsap":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <rect width="100" height="100" rx="22" fill="#111827" stroke="#88CE02" strokeWidth="4" />
          <path d="M30 65C23 60 21 45 28 35C35 25 50 25 55 35L48 40C44 33 34 33 30 40C26 47 30 55 38 55C42 55 46 52 48 48H39V42H56V54C50 62 40 67 30 65Z" fill="#88CE02" />
          <path d="M60 65L72 35H80L68 65H60Z" fill="#88CE02" />
        </svg>
      );

    case "tailwind":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
        </svg>
      );

    case "stripe":
      return (
        <svg width={size} height={size} viewBox="0 0 60 25" fill="none" className={className}>
          <path d="M59.64 14.28c0-4.42-2.17-7.92-6.36-7.92-4.22 0-6.81 3.5-6.81 7.89 0 5.22 3.12 7.78 7.37 7.78 2.07 0 3.63-.47 4.81-1.12v-3.39c-1.18.61-2.48.96-4.1.96-1.68 0-3.05-.6-3.24-2.43h8.33v-1.77zm-8.33-1.4c0-1.7.99-2.43 2.15-2.43 1.12 0 2.06.73 2.06 2.43h-4.21zM42.27 6.78c-1.75 0-2.88.82-3.46 1.39l-.23-1.1H34.4v18.7h4.82v-4.52c.62.48 1.62 1.05 3.1 1.05 3.39 0 6.36-2.58 6.36-7.79 0-4.82-2.92-7.73-6.41-7.73zm-1.07 11.75c-1.13 0-1.85-.38-2.39-.93v-6.38c.57-.59 1.32-.95 2.39-.95 1.84 0 3.03 1.69 3.03 4.13 0 2.47-1.17 4.13-3.03 4.13zM25.77 4.75c0-1.32 1.07-2.02 2.6-2.02 1.36 0 2.85.45 3.97 1.09V.24C31.11.08 29.74 0 28.37 0c-4.42 0-7.42 2.31-7.42 6.18 0 6.03 8.27 5.06 8.27 7.66 0 .99-.86 1.48-2.07 1.48-1.78 0-3.67-.73-5.26-1.62v3.66c1.69.73 3.57 1.05 5.26 1.05 4.54 0 7.74-2.25 7.74-6.22-.01-6.49-9.12-5.32-9.12-7.39z" fill="#635BFF" />
        </svg>
      );

    case "supabase":
      return (
        <svg width={size} height={size} viewBox="0 0 109 113" fill="none" className={className}>
          <path d="M63.7076 110.284C60.5481 114.263 54.0544 112.015 54.0544 106.918V64.0844H8.48785C3.39088 64.0844 0.283592 58.4687 3.04838 54.1956L44.8266 2.716C47.9861 -1.26315 54.4798 0.984639 54.4798 6.08221V48.9156H100.046C105.143 48.9156 108.251 54.5313 105.486 58.8044L63.7076 110.284Z" fill="url(#supabase-grad)" />
          <defs>
            <linearGradient id="supabase-grad" x1="54.2671" y1="2.716" x2="54.2671" y2="110.284" gradientUnits="userSpaceOnUse">
              <stop stopColor="#249361" />
              <stop offset="1" stopColor="#3ECF8E" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "openai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z" />
          <circle cx="12" cy="12" r="2" fill="#10A37F" />
        </svg>
      );

    case "apple":
      return (
        <svg width={size} height={size} viewBox="0 0 170 170" fill="#E5E5EA" className={className}>
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.05-7.65-7.79-11.89-14.22-5.78-8.81-10.4-19.06-13.88-30.73-3.47-11.68-5.21-22.95-5.21-33.82 0-14.68 3.59-27.1 10.77-37.26 7.18-10.15 16.51-15.34 27.99-15.58 4.99 0 10.55 1.34 16.69 4.02 6.13 2.68 10.23 4.09 12.28 4.24 1.74-.27 5.92-1.74 12.54-4.42 6.62-2.68 12.18-3.88 16.69-3.6 13.04.85 23.36 5.59 30.96 14.23-11.4 6.89-17.01 16.43-16.82 28.61.2 9.68 3.91 17.78 11.13 24.32 7.22 6.53 15.82 10.29 25.8 11.26-2.28 6.94-5.06 14.19-8.36 21.75zM119.22 33.39c0-7.39 2.67-14.39 8.01-21 5.34-6.61 11.95-10.85 19.83-12.73.54 1.63.81 3.26.81 4.89 0 7.39-2.73 14.47-8.19 21.24-5.46 6.77-12.18 10.97-20.16 12.61-.2-.82-.3-2.49-.3-5.01z" />
        </svg>
      );

    case "reddit":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FF4500" />
          <circle cx="9" cy="13" r="1.5" fill="white" />
          <circle cx="15" cy="13" r="1.5" fill="white" />
          <path d="M10 16.5C11 17.5 13 17.5 14 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14.5 9L16 6.5H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="6.5" r="1" fill="white" />
        </svg>
      );

    case "safari":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="#006CFF" stroke="white" strokeWidth="1" />
          <polygon points="15.5,8.5 13.5,13.5 8.5,15.5 10.5,10.5" fill="#FF3B30" stroke="white" strokeWidth="0.75" />
          <polygon points="8.5,15.5 10.5,10.5 12,12" fill="white" />
        </svg>
      );

    case "pocket":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#EF4056" />
          <path d="M6 7.5H18V13.5C18 16.8 15.3 19.5 12 19.5C8.7 19.5 6 16.8 6 13.5V7.5Z" fill="white" />
          <path d="M9 11.5L12 14.5L15 11.5" stroke="#EF4056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "threejs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );

    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );

    case "spotify":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="#1ED760" />
          <path d="M7 9.5C10.5 8.2 14.5 8.6 17.5 10.2M8 12.5C11 11.4 14.2 11.7 16.5 13M8.5 15.5C10.8 14.6 13.2 14.8 15.2 15.8" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "linear":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1B1C22" stroke="#5E6AD2" strokeWidth="1.5" />
          <path d="M5.5 18.5L18.5 5.5M8.5 18.5L18.5 8.5M5.5 15.5L15.5 5.5" stroke="#5E6AD2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "framer":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 2H20V10H12L20 18H12V22L4 14V10H12L4 2Z" fill="#0055FF" />
        </svg>
      );

    case "raycast":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FF6363" />
          <path d="M6 12L12 6L18 12L12 18L6 12Z" fill="white" />
        </svg>
      );

    case "vercel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2L24 22H0L12 2Z" fill="currentColor" />
        </svg>
      );

    case "flutter":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M14.5 2L4 12.5L7.5 16L18 5.5L14.5 2Z" fill="#42A5F5" />
          <path d="M14.5 13L9 18.5L12.5 22L18 16.5L14.5 13Z" fill="#0D47A1" />
          <path d="M11 15L13.5 17.5L16.5 14.5L14 12L11 15Z" fill="#01579B" />
        </svg>
      );

    case "nodejs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#5FA04E" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 6V18M12 12L20 7.5M12 12L4 7.5" stroke="#5FA04E" strokeWidth="1.5" />
        </svg>
      );

    case "graphql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="3" r="2" fill="#E10098" />
          <circle cx="20" cy="8" r="2" fill="#E10098" />
          <circle cx="20" cy="16" r="2" fill="#E10098" />
          <circle cx="12" cy="21" r="2" fill="#E10098" />
          <circle cx="4" cy="16" r="2" fill="#E10098" />
          <circle cx="4" cy="8" r="2" fill="#E10098" />
          <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" stroke="#E10098" strokeWidth="1.5" fill="none" />
          <polygon points="12,3 20,16 4,16" stroke="#E10098" strokeWidth="1" fill="none" />
        </svg>
      );

    case "postgres":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="10" fill="#336791" />
          <path d="M7 11C7 8.5 9 7 12 7C15 7 17 8.5 17 11C17 13.5 15.5 15.5 13.5 16.5L12 18L10.5 16.5C8.5 15.5 7 13.5 7 11Z" fill="white" />
        </svg>
      );

    case "docker":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="10" width="3" height="3" fill="#2496ED" />
          <rect x="9" y="10" width="3" height="3" fill="#2496ED" />
          <rect x="13" y="10" width="3" height="3" fill="#2496ED" />
          <rect x="9" y="6" width="3" height="3" fill="#2496ED" />
          <path d="M3 14C3.5 18 8 19 12 19C18 19 21 16 22 13C20.5 13 19 14 17 14C15 14 14 13 12 13C10 13 9 14 7 14C5 14 4 13 3 14Z" fill="#2496ED" />
        </svg>
      );

    case "notion":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="5" fill="#FFFFFF" />
          <path d="M6 7L9 7.5V17L14 7.5H17.5V16.5L15 17V8L10 17.5H6.5V7Z" fill="#000000" />
        </svg>
      );

    case "slack":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="9.5" width="5" height="2.5" rx="1.25" fill="#E01E5A" />
          <rect x="6.5" y="4" width="2.5" height="5" rx="1.25" fill="#E01E5A" />
          <rect x="9.5" y="4" width="5" height="2.5" rx="1.25" fill="#36C5F0" />
          <rect x="15" y="6.5" width="2.5" height="5" rx="1.25" fill="#36C5F0" />
          <rect x="15" y="12" width="5" height="2.5" rx="1.25" fill="#2EB67D" />
          <rect x="15" y="15" width="2.5" height="5" rx="1.25" fill="#2EB67D" />
          <rect x="9.5" y="17.5" width="5" height="2.5" rx="1.25" fill="#ECB22E" />
          <rect x="6.5" y="15" width="2.5" height="5" rx="1.25" fill="#ECB22E" />
        </svg>
      );

    case "aws":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M6.5 9.5L8.5 14.5L10.5 9.5M11.5 9.5L13.5 14.5L15.5 9.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 17.5C9 20 15 20 19 16.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "clerk":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#6C47FF" />
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
      );

    default:
      return (
        <div className={`rounded-lg bg-white border border-[#2651B9]/20 shadow-sm flex items-center justify-center font-bold text-xs text-slate-800 ${className}`}>
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
