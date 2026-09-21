"use client";

import React from "react";

export const GlobalBackgroundAnimation: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Subtle Engineering Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #2651b9 1px, transparent 1px), linear-gradient(to bottom, #2651b9 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. Ultra-lightweight GPU-native Ambient Radial Glows calibrated to Pixim Logo */}
      {/* Top-Left Pixim Royal Blue Atmosphere */}
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(38, 81, 185, 0.09) 0%, rgba(38, 81, 185, 0.02) 50%, transparent 70%)",
        }}
      />

      {/* Mid-Right Pixim Warm Orange Glow */}
      <div
        className="absolute top-1/3 -right-40 w-[650px] h-[650px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 133, 0, 0.07) 0%, rgba(255, 133, 0, 0.015) 50%, transparent 70%)",
        }}
      />

      {/* Bottom-Center Deep Royal Blue Subtle Ambient Wash */}
      <div
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(38, 81, 185, 0.06) 0%, rgba(59, 130, 246, 0.015) 50%, transparent 70%)",
        }}
      />
    </div>
  );
};

