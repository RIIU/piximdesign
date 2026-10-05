"use client";

import React, { useId } from "react";

// Building blocks for the decorative, code-drawn visuals on service pages.

export const TILE_DARK = "rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90";
export const TILE_DEEP = "rounded-3xl border border-[#2651B9]/40 bg-[#081330]";
export const TILE_ORANGE =
  "rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] shadow-[0_25px_60px_-15px_rgba(255,133,0,0.5)]";

export const MonoLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "text-slate-500",
}) => <span className={`text-[10px] font-mono uppercase tracking-widest ${className}`}>{children}</span>;

/** Skeleton text bars */
export const Lines: React.FC<{ widths?: string[]; className?: string; barClass?: string }> = ({
  widths = ["w-3/4", "w-full", "w-5/6"],
  className = "space-y-1.5",
  barClass = "h-1.5 bg-white/15",
}) => (
  <div className={className}>
    {widths.map((w, i) => (
      <div key={i} className={`rounded-full ${barClass} ${w}`} />
    ))}
  </div>
);

export const BrowserFrame: React.FC<{ url?: string; className?: string; children: React.ReactNode }> = ({
  url = "yourbrand.com",
  className = "",
  children,
}) => (
  <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#0A1838] shadow-xl ${className}`}>
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#081330] px-3 py-2">
      <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
      <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
      <span className="w-2 h-2 rounded-full bg-[#28C840]" />
      <span className="ml-2 flex-1 truncate rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-slate-400">
        {url}
      </span>
    </div>
    {children}
  </div>
);

export const PhoneFrame: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`relative overflow-hidden rounded-[26px] border-[5px] border-[#1B2A55] bg-[#081330] shadow-2xl ${className}`}>
    <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#1B2A55]" />
    {children}
  </div>
);

/** Circular gauge (value 0–100) */
export const Ring: React.FC<{
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}> = ({ value, size = 64, stroke = 6, color = "#FF8500", track = "rgba(255,255,255,0.1)", children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">{children}</span>
    </div>
  );
};

/** Smooth-ish trend line with optional gradient fill */
export const Sparkline: React.FC<{ points: number[]; className?: string; color?: string; fill?: boolean }> = ({
  points,
  className = "w-full h-16",
  color = "#FF8500",
  fill = true,
}) => {
  const gid = `spark${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const w = 100;
  const h = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => [(i / (points.length - 1)) * w, h - ((p - min) / (max - min || 1)) * (h - 6) - 3]);
  const d = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${d} L${w} ${h} L0 ${h} Z`} fill={`url(#${gid})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

/** Simple vertical bar chart; values are relative heights (0–100) */
export const Bars: React.FC<{ values: number[]; className?: string; barClass?: string; highlight?: number }> = ({
  values,
  className = "h-16",
  barClass = "bg-[#2651B9]/70",
  highlight,
}) => (
  <div className={`flex items-end gap-1.5 ${className}`} aria-hidden="true">
    {values.map((v, i) => (
      <span
        key={i}
        className={`flex-1 rounded-t-md ${i === highlight ? "bg-gradient-to-t from-[#FF8500] to-[#FFA133]" : barClass}`}
        style={{ height: `${v}%` }}
      />
    ))}
  </div>
);

/** Floating status chip used around hero compositions */
export const FloatingChip: React.FC<{
  className: string;
  icon: React.ReactNode;
  title: string;
  sub?: string;
  delayed?: boolean;
}> = ({ className, icon, title, sub, delayed = false }) => (
  <div
    className={`animate-float-y absolute flex items-center gap-2 border border-white/15 bg-[#0C1E4E]/90 backdrop-blur-md shadow-lg ${
      sub ? "rounded-2xl px-3 py-2" : "rounded-full px-3 py-1.5"
    } ${delayed ? "[animation-delay:1.2s]" : ""} ${className}`}
  >
    {icon}
    {sub ? (
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold text-white">{title}</span>
        <span className="block text-[10px] text-slate-400">{sub}</span>
      </span>
    ) : (
      <span className="text-[11px] font-semibold text-white">{title}</span>
    )}
  </div>
);

export const ChipIconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FF8500]/15 border border-[#FF8500]/35 text-[#FFA133]">
    {children}
  </span>
);

export const ChipDot: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "bg-emerald-500",
}) => <span className={`flex items-center justify-center w-4 h-4 rounded-full text-white ${className}`}>{children}</span>;
