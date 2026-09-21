"use client";

import React from "react";
import Image from "next/image";

interface PiximLogoProps {
  variant?: "full" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

export const PiximLogo: React.FC<PiximLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  glow = false,
}) => {
  const sizeMap = {
    sm: { height: 28, width: 110, iconSize: 32 },
    md: { height: 36, width: 140, iconSize: 44 },
    lg: { height: 48, width: 190, iconSize: 64 },
    xl: { height: 68, width: 260, iconSize: 88 },
  };

  const currentSize = sizeMap[size];

  if (variant === "badge") {
    return (
      <div
        className={`relative group inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-[#2651B9]/20 shadow-lg backdrop-blur-xl ${
          glow ? "glow-orange" : ""
        } ${className}`}
      >
        {/* Ambient neon backdrop halo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#2651B9]/20 to-[#FF8500]/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 border border-[#2651B9]/15 shadow-sm">
          <Image
            src="/images/logo.webp"
            alt="Pixim Design Icon"
            width={currentSize.iconSize}
            height={currentSize.iconSize}
            className="object-contain drop-shadow-[0_4px_12px_rgba(38,81,185,0.12)] transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src="/images/logo.webp"
          alt="Pixim Design Emblem"
          width={currentSize.iconSize}
          height={currentSize.iconSize}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/logo.webp"
        alt="Pixim Design"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain h-auto w-auto max-h-[44px]"
        priority
      />
    </div>
  );
};
