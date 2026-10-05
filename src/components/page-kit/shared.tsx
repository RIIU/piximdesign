import React from "react";

// Concentric-diamond sample mark used across service page visuals ("yourbrand")
export const SAMPLE_MARK_PATH = "M24 3 45 24 24 45 3 24Z M24 13 35 24 24 35 13 24Z M24 19.5 28.5 24 24 28.5 19.5 24Z";

export const SampleMark: React.FC<{ className?: string; color?: string }> = ({
  className = "w-8 h-8",
  color = "currentColor",
}) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill={color} />
  </svg>
);

export const Wordmark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`font-agency font-extrabold tracking-tight ${className}`}>yourbrand</span>
);

export const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
    {children}
  </span>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#081330]/80 text-[#FFA133] border border-[#FF8500]/30 font-mono ${className}`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
    {children}
  </span>
);

export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h2
    className={`font-agency text-[28px] sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.1] ${className}`}
  >
    {children}
  </h2>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  align?: "center" | "left";
  className?: string;
}> = ({ eyebrow, title, desc, align = "center", className = "" }) => (
  <div className={`reveal-up max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <SectionTitle className="mt-4">{title}</SectionTitle>
    {desc && <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">{desc}</p>}
  </div>
);
