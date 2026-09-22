"use client";

import React from "react";

export const GlobalBackgroundAnimation: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Subtle Engineering Grid Overlay in Brand Royal Blue */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      {/* 2. Top-Left Luminous Brand Royal Blue Atmosphere */}
      <div
        className="absolute -top-40 -left-40 w-[850px] h-[850px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(38, 81, 185, 0.32) 0%, rgba(30, 64, 175, 0.16) 40%, rgba(8, 19, 48, 0) 75%)",
        }}
      />

      {/* 3. Mid-Right Radiant Pixim Brand Orange Ambient Flare */}
      <div
        className="absolute top-1/4 -right-48 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 133, 0, 0.18) 0%, rgba(255, 161, 51, 0.08) 45%, rgba(8, 19, 48, 0) 70%)",
        }}
      />

      {/* 4. Center-Left Electric Sapphire Glow */}
      <div
        className="absolute top-1/2 -left-48 w-[750px] h-[750px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.22) 0%, rgba(37, 99, 235, 0.1) 45%, rgba(8, 19, 48, 0) 70%)",
        }}
      />

      {/* 5. Bottom-Right Warm Amber Light Bloom */}
      <div
        className="absolute top-3/4 -right-40 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 133, 0, 0.15) 0%, rgba(38, 81, 185, 0.1) 50%, rgba(8, 19, 48, 0) 75%)",
        }}
      />

      {/* 6. Bottom-Center Deep Royal Sapphire Foundation Wash */}
      <div
        className="absolute -bottom-48 left-1/4 w-[900px] h-[900px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(38, 81, 185, 0.26) 0%, rgba(29, 78, 216, 0.12) 45%, rgba(8, 19, 48, 0) 75%)",
        }}
      />
    </div>
  );
};
