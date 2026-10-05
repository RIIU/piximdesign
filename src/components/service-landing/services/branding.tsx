"use client";

import React from "react";
import { ArrowRight, Check, Clock, FileCheck, FileText, Gem, MessagesSquare } from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SAMPLE_MARK_PATH, SampleMark, Wordmark } from "@/components/page-kit/shared";
import { ChipDot, ChipIconBox, FloatingChip, MonoLabel, TILE_DARK } from "@/components/page-kit/primitives";
import type { ServiceConfig } from "../types";
import { SERVICE_PRICING } from "@/data/servicePricing";

const PRICING = SERVICE_PRICING["logo-design"];

/* ---------- Hero composition ---------- */

const HERO_PALETTE = [
  { hex: "#FF8500", text: "text-white" },
  { hex: "#FFA133", text: "text-white" },
  { hex: "#2651B9", text: "text-white" },
  { hex: "#081330", text: "text-slate-300" },
  { hex: "#F8FAFC", text: "text-slate-700" },
];

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-5 sm:p-6 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(255,133,0,0.5)]">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-dashed border-white/30" />
        <div className="absolute -right-2 -top-2 w-28 h-28 rounded-full border border-white/20" />
        <div className="relative flex items-center justify-between">
          <MonoLabel className="text-white/75">Primary mark</MonoLabel>
          <span className="text-[10px] font-mono text-white/60">01</span>
        </div>
        <div className="relative flex items-center gap-3">
          <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shadow-md">
            <SampleMark className="w-7 h-7 sm:w-8 sm:h-8" color="#FF8500" />
          </span>
          <Wordmark className="text-2xl sm:text-3xl text-white" />
        </div>
      </div>

      <div className={`col-span-2 ${TILE_DARK} p-4 flex flex-col justify-between`}>
        <MonoLabel>Type</MonoLabel>
        <span className="font-agency text-5xl font-extrabold text-white leading-none">Aa</span>
        <span className="text-[10px] text-slate-400 leading-tight">Agency · Jakarta</span>
      </div>

      <div className={`col-span-3 ${TILE_DARK} p-4`}>
        <MonoLabel>Palette</MonoLabel>
        <div className="mt-3 flex gap-1.5 sm:gap-2">
          {HERO_PALETTE.map((c) => (
            <span key={c.hex} className="flex-1 h-11 rounded-xl border border-white/10 flex items-end justify-center pb-1" style={{ background: c.hex }}>
              <span className={`hidden sm:block text-[7px] font-mono ${c.text}`}>{c.hex.slice(1)}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="col-span-3 rounded-3xl border border-[#2651B9]/35 bg-gradient-to-br from-[#0F2260] to-[#081330] p-4 flex flex-col justify-between rotate-[-3deg] shadow-xl">
        <SampleMark className="w-7 h-7" color="#FF8500" />
        <div>
          <div className="h-1.5 w-20 rounded bg-white/80" />
          <div className="mt-1.5 h-1.5 w-14 rounded bg-white/30" />
        </div>
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-4"
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="Vector ready"
    />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <FileText className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="brand-guidelines.pdf"
      sub="24 pages · ready"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const LogoConstructionVisual = () => {
  const anchors = [
    [160, 68],
    [202, 110],
    [160, 152],
    [118, 110],
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={220} stroke="rgba(59,130,246,0.14)" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 44} x2={320} y2={i * 44} stroke="rgba(59,130,246,0.14)" />
      ))}
      <circle cx={160} cy={110} r={92} fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
      <circle cx={160} cy={110} r={62} fill="none" stroke="rgba(255,255,255,0.12)" />
      <line x1={60} y1={10} x2={260} y2={210} stroke="rgba(255,161,51,0.25)" />
      <line x1={260} y1={10} x2={60} y2={210} stroke="rgba(255,161,51,0.25)" />
      <g transform="translate(112 62) scale(2)">
        <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill="#FF8500" />
      </g>
      {anchors.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width={7} height={7} fill="#081330" stroke="#FFFFFF" strokeWidth={1.2} />
      ))}
      <text x={14} y={208} fill="rgba(148,163,184,0.7)" fontSize={9} fontFamily="monospace">
        grid 40 · golden ratio
      </text>
    </svg>
  );
};

const PaletteVisual = () => (
  <div className="flex h-full gap-2">
    {[
      { hex: "#FF8500", name: "Sunrise", text: "text-white" },
      { hex: "#FFA133", name: "Amber", text: "text-white" },
      { hex: "#2651B9", name: "Electric", text: "text-white" },
      { hex: "#081330", name: "Midnight", text: "text-slate-300" },
      { hex: "#F8FAFC", name: "Cloud", text: "text-slate-700" },
    ].map((c, i) => (
      <div
        key={c.hex}
        className="flex-1 rounded-2xl border border-white/10 p-2.5 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1"
        style={{ background: c.hex, transitionDelay: `${i * 40}ms` }}
      >
        <span className={`text-[10px] font-semibold ${c.text}`}>{c.name}</span>
        <span className={`text-[9px] font-mono opacity-80 ${c.text}`}>{c.hex}</span>
      </div>
    ))}
  </div>
);

const TypeVisual = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="font-agency text-6xl font-extrabold text-white leading-none">Aa</span>
    <div className="space-y-1">
      <div className="flex items-baseline gap-2 text-slate-300">
        <span className="text-xs font-normal">Regular</span>
        <span className="text-xs font-semibold">Medium</span>
        <span className="text-xs font-extrabold">Bold</span>
      </div>
      <span className="block text-[10px] font-mono text-slate-500 truncate">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
    </div>
  </div>
);

const GuidelinesVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="flex w-full max-w-[200px] aspect-[3/2] rounded-xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105">
      <div className="flex-1 bg-[#F8FAFC] p-2.5 flex flex-col justify-between">
        <SampleMark className="w-5 h-5" color="#FF8500" />
        <div>
          <span className="block font-agency text-[11px] font-extrabold text-[#081330] leading-none">Brand Book</span>
          <span className="block text-[7px] text-slate-500 mt-0.5">v1.0 · guidelines</span>
        </div>
      </div>
      <div className="flex-1 bg-white border-l border-slate-200 p-2.5 space-y-1.5">
        <div className="h-1 w-3/4 rounded bg-slate-300" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-5/6 rounded bg-slate-200" />
        <div className="flex gap-1 pt-1">
          <span className="h-3 flex-1 rounded-sm bg-[#FF8500]" />
          <span className="h-3 flex-1 rounded-sm bg-[#2651B9]" />
          <span className="h-3 flex-1 rounded-sm bg-[#081330]" />
        </div>
      </div>
    </div>
  </div>
);

const StationeryVisual = () => (
  <div className="relative h-full">
    <div className="absolute left-[6%] top-[8%] w-[46%] h-[92%] rounded-lg bg-white shadow-xl p-3 rotate-[-4deg] transition-transform duration-500 group-hover:rotate-[-6deg]">
      <div className="flex items-center gap-1.5">
        <SampleMark className="w-4 h-4" color="#FF8500" />
        <Wordmark className="text-[10px] text-[#081330]" />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1 w-1/2 rounded bg-slate-300" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-11/12 rounded bg-slate-200" />
        <div className="h-1 w-4/5 rounded bg-slate-200" />
      </div>
      <div className="absolute bottom-2 left-3 right-3 h-0.5 rounded bg-[#FF8500]" />
    </div>
    <div className="absolute right-[8%] top-[10%] w-[40%] aspect-[1.75/1] rounded-lg bg-gradient-to-br from-[#FF8500] to-[#FFA133] shadow-xl flex items-center justify-center rotate-[6deg] transition-transform duration-500 group-hover:rotate-[9deg]">
      <Wordmark className="text-sm sm:text-base text-white" />
    </div>
    <div className="absolute right-[16%] bottom-[4%] w-[40%] aspect-[1.75/1] rounded-lg bg-[#081330] border border-[#2651B9]/50 shadow-2xl p-2.5 flex flex-col justify-between rotate-[-2deg] transition-transform duration-500 group-hover:-translate-y-1">
      <SampleMark className="w-4 h-4" color="#FF8500" />
      <div className="space-y-1">
        <div className="h-1 w-3/5 rounded bg-white/80" />
        <div className="h-1 w-2/5 rounded bg-white/30" />
      </div>
    </div>
  </div>
);

const RebrandVisual = () => (
  <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
    <div className="flex flex-col items-center gap-2">
      <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-700/60 border border-slate-600 flex items-center justify-center">
        <span className="font-serif italic text-xl sm:text-2xl text-slate-400">Yb</span>
      </span>
      <MonoLabel>Before</MonoLabel>
    </div>
    <ArrowRight className="w-5 h-5 text-[#FFA133] transition-transform duration-500 group-hover:translate-x-1" />
    <div className="flex flex-col items-center gap-2">
      <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-lg shadow-orange-500/30">
        <SampleMark className="w-9 h-9 sm:w-10 sm:h-10" color="#FFFFFF" />
      </span>
      <MonoLabel className="text-[#FFA133]">After</MonoLabel>
    </div>
  </div>
);

/* ---------- Showcase panels ---------- */

const Variant: React.FC<{ label: string; className: string; labelClass?: string; children: React.ReactNode }> = ({
  label,
  className,
  labelClass = "text-white/70",
  children,
}) => (
  <div className={`relative flex min-h-[140px] sm:min-h-[160px] items-center justify-center rounded-2xl ${className}`}>
    {children}
    <MonoLabel className={`absolute bottom-2.5 left-3 ${labelClass}`}>{label}</MonoLabel>
  </div>
);

const LogoSuitePanel = () => (
  <div className="grid grid-cols-2 gap-3">
    <Variant label="Primary" className="bg-gradient-to-br from-[#FF8500] to-[#FFA133]">
      <div className="flex items-center gap-2">
        <SampleMark className="w-7 h-7 sm:w-9 sm:h-9" color="#FFFFFF" />
        <Wordmark className="text-xl sm:text-3xl text-white" />
      </div>
    </Variant>
    <Variant label="Secondary" className="bg-[#081330] border border-[#2651B9]/40" labelClass="text-slate-500">
      <div className="flex flex-col items-center gap-1.5">
        <SampleMark className="w-9 h-9 sm:w-11 sm:h-11" color="#FF8500" />
        <Wordmark className="text-base sm:text-xl text-white" />
      </div>
    </Variant>
    <Variant label="Icon" className="bg-[#F8FAFC]" labelClass="text-slate-500">
      <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22%] bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-lg shadow-orange-500/30">
        <SampleMark className="w-8 h-8 sm:w-9 sm:h-9" color="#FFFFFF" />
      </span>
    </Variant>
    <Variant label="Monochrome" className="bg-[#05070D] border border-white/10" labelClass="text-slate-500">
      <div className="flex items-center gap-2">
        <SampleMark className="w-6 h-6 sm:w-8 sm:h-8" color="#FFFFFF" />
        <Wordmark className="text-lg sm:text-2xl text-white" />
      </div>
    </Variant>
  </div>
);

const ColourSystemPanel = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 row-span-2 flex min-h-[200px] flex-col justify-between rounded-2xl bg-[#FF8500] p-4 sm:p-5">
        <MonoLabel className="text-white/80">Primary</MonoLabel>
        <div>
          <span className="block font-agency text-2xl sm:text-3xl font-extrabold text-white">Sunrise Orange</span>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-0.5 text-[10px] sm:text-[11px] font-mono text-white/90">
            <span>HEX #FF8500</span>
            <span>RGB 255 133 0</span>
            <span>CMYK 0 48 100 0</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-[#081330] border border-[#2651B9]/40 p-3 sm:p-4">
        <MonoLabel>Base</MonoLabel>
        <span>
          <span className="block font-agency text-base font-extrabold text-white">Midnight</span>
          <span className="block text-[10px] font-mono text-slate-400">#081330</span>
        </span>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-[#2651B9] p-3 sm:p-4">
        <MonoLabel className="text-white/70">Accent</MonoLabel>
        <span>
          <span className="block font-agency text-base font-extrabold text-white">Electric</span>
          <span className="block text-[10px] font-mono text-white/80">#2651B9</span>
        </span>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-3">
      {[
        { hex: "#F8FAFC", name: "Cloud", text: "text-slate-700" },
        { hex: "#CBD5E1", name: "Mist", text: "text-slate-700" },
        { hex: "#475569", name: "Slate", text: "text-white" },
        { hex: "#0F172A", name: "Ink", text: "text-slate-300" },
      ].map((n) => (
        <div key={n.hex} className="rounded-xl border border-white/10 p-2.5" style={{ background: n.hex }}>
          <span className={`block text-[11px] font-semibold ${n.text}`}>{n.name}</span>
          <span className={`block text-[9px] font-mono opacity-80 ${n.text}`}>{n.hex}</span>
        </div>
      ))}
    </div>
    <div className="rounded-2xl bg-[#081330]/80 border border-[#2651B9]/30 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <MonoLabel>Usage ratio</MonoLabel>
        <MonoLabel>60 · 30 · 10</MonoLabel>
      </div>
      <div className="mt-2.5 flex h-3 overflow-hidden rounded-full">
        <span className="w-[60%] bg-[#0F2260]" />
        <span className="w-[30%] bg-[#FF8500]" />
        <span className="w-[10%] bg-[#3B82F6]" />
      </div>
    </div>
  </div>
);

const TypographyPanel = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-5">
        <MonoLabel>Headings</MonoLabel>
        <span className="mt-2 block font-agency text-6xl font-extrabold text-white leading-none">Aa</span>
        <span className="mt-3 block font-agency text-lg font-extrabold text-white">Agency</span>
        <span className="block text-[10px] font-mono text-slate-500 truncate">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
      </div>
      <div className="rounded-2xl bg-[#F8FAFC] p-5">
        <MonoLabel>Body</MonoLabel>
        <span className="mt-2 block font-sans text-6xl font-semibold text-[#081330] leading-none">Aa</span>
        <span className="mt-3 block font-sans text-lg font-bold text-[#081330]">Plus Jakarta Sans</span>
        <span className="block text-[10px] font-mono text-slate-500 truncate">abcdefghijklmnopqrstuvwxyz 0123456789</span>
      </div>
    </div>
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5 divide-y divide-white/5">
      {[
        { tag: "H1", size: "56px", sample: "Build a brand", cls: "font-agency text-2xl sm:text-3xl font-extrabold" },
        { tag: "H2", size: "40px", sample: "Stand out", cls: "font-agency text-xl sm:text-2xl font-extrabold" },
        { tag: "H3", size: "28px", sample: "Stay consistent", cls: "font-agency text-lg sm:text-xl font-extrabold" },
        { tag: "Body", size: "16px", sample: "Clear, readable copy for every touchpoint.", cls: "font-sans text-sm" },
      ].map((row) => (
        <div key={row.tag} className="flex items-center gap-3 sm:gap-4 py-2">
          <span className="w-10 shrink-0 text-[10px] font-mono text-[#FFA133]">{row.tag}</span>
          <span className="w-10 shrink-0 text-[10px] font-mono text-slate-500">{row.size}</span>
          <span className={`truncate text-white ${row.cls}`}>{row.sample}</span>
        </div>
      ))}
    </div>
  </div>
);

const ApplicationsPanel = () => (
  <div className="grid grid-cols-6 gap-3">
    <div className="col-span-3 row-span-2 flex aspect-square flex-col justify-between rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-4">
      <div className="flex items-center gap-1.5">
        <SampleMark className="w-5 h-5" color="#FFFFFF" />
        <Wordmark className="text-sm text-white" />
      </div>
      <span className="font-agency text-2xl sm:text-4xl font-extrabold text-white leading-[0.95]">
        Grand
        <br />
        Opening
      </span>
      <MonoLabel className="text-white/80">Social post</MonoLabel>
    </div>
    <div className="col-span-3 flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-3">
      <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-lg shadow-orange-500/25">
        <SampleMark className="w-7 h-7" color="#FFFFFF" />
      </span>
      <MonoLabel>App icon</MonoLabel>
    </div>
    <div className="col-span-3 flex items-center justify-center rounded-2xl bg-[#0C1E4E] border border-[#2651B9]/35 p-3">
      <div className="w-full max-w-[150px] aspect-[1.75/1] rounded-lg bg-[#081330] border border-[#2651B9]/50 shadow-xl p-2.5 flex flex-col justify-between rotate-[-4deg]">
        <SampleMark className="w-4 h-4" color="#FF8500" />
        <div className="space-y-1">
          <div className="h-1 w-3/5 rounded bg-white/80" />
          <div className="h-1 w-2/5 rounded bg-white/30" />
        </div>
      </div>
    </div>
    <div className="col-span-6 flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-3 sm:p-4">
      <span className="w-10 h-10 shrink-0 rounded-full bg-[#081330] flex items-center justify-center">
        <SampleMark className="w-5 h-5" color="#FF8500" />
      </span>
      <div className="flex-1 space-y-1.5">
        <div className="h-1.5 w-28 rounded bg-slate-700" />
        <div className="h-1 w-20 rounded bg-slate-300" />
      </div>
      <span className="hidden sm:block h-8 w-px bg-[#FF8500]" />
      <Wordmark className="hidden sm:block text-lg text-[#081330]" />
      <MonoLabel className="text-slate-400 sm:hidden">Email</MonoLabel>
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Logo & Brand Identity",
  shortName: "Branding",
  projectLabel: "a branding project",
  hero: {
    eyebrow: "Logo & Brand Identity Design",
    title: (
      <>
        Branding That Makes Your Business <GradientText>Unforgettable</GradientText>
      </>
    ),
    description:
      "We craft strategic logos and complete brand identities that build trust at first glance, set you apart from competitors and stay consistent across every touchpoint.",
    primaryCta: "Start Your Brand",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why branding matters",
    text: "Your brand is the first thing people notice and the last thing they forget. We design identities that earn trust before a single word is read.",
    highlights: ["notice", "forget.", "trust"],
    pillars: [
      { title: "Recognition", desc: "A mark people remember after a single glance." },
      { title: "Trust", desc: "Look established and credible from day one." },
      { title: "Consistency", desc: "One clear voice across every touchpoint." },
    ],
  },
  bento: {
    eyebrow: "Our Branding Services",
    title: (
      <>
        Everything Your Brand Needs, <GradientText>Under One Roof</GradientText>
      </>
    ),
    description: "From the first sketch of your logo to the last page of your brand book, one team crafts your entire identity.",
    tiles: [
      {
        title: "Logo Design",
        desc: "A distinctive, scalable mark built on strategy and geometry, so it works from a favicon to a billboard.",
        visual: <LogoConstructionVisual />,
      },
      { title: "Visual Identity & Colour", desc: "A purposeful palette and visual language people instantly recognise.", visual: <PaletteVisual /> },
      { title: "Typography", desc: "Typefaces that give your brand a voice.", visual: <TypeVisual /> },
      { title: "Brand Guidelines", desc: "One rulebook for consistent use.", visual: <GuidelinesVisual /> },
      {
        title: "Stationery & Business Cards",
        desc: "Letterheads and print-ready cards that make every handover look professional.",
        visual: <StationeryVisual />,
      },
      {
        title: "Rebranding & Refresh",
        desc: "Modernise an outdated identity while keeping the equity customers recognise.",
        visual: <RebrandVisual />,
      },
    ],
  },
  showcase: {
    eyebrow: "Inside Your Brand Kit",
    title: (
      <>
        Every Piece Your Brand Needs to <GradientText>Show Up Consistently</GradientText>
      </>
    ),
    description:
      "We don't stop at a logo. You get a complete, ready-to-use identity system your whole team can apply with confidence.",
    ctaLabel: "Get Your Brand Kit",
    panels: [
      {
        id: "logo-suite",
        title: "Logo Suite",
        desc: "Primary, secondary, icon and monochrome versions, so your mark works on any background and at any size.",
        visual: <LogoSuitePanel />,
      },
      {
        id: "colour-system",
        title: "Colour System",
        desc: "A purposeful palette with HEX, RGB and CMYK codes plus clear rules for how much of each colour to use.",
        visual: <ColourSystemPanel />,
      },
      {
        id: "typography",
        title: "Typography",
        desc: "Heading and body typefaces with a type scale that keeps every page, post and print piece consistent.",
        visual: <TypographyPanel />,
      },
      {
        id: "applications",
        title: "Brand Applications",
        desc: "Your identity applied to real touchpoints: social posts, business cards, app icons and email signatures.",
        visual: <ApplicationsPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From First Call to <GradientText>Final Brand Kit</GradientText>
      </>
    ),
    description: "A clear, collaborative process so you always know what happens next, and what you receive at every step.",
    steps: [
      { title: "Discover", desc: "A short brief and a call to understand your business, audience and competitors.", output: "Creative brief" },
      { title: "Strategize", desc: "Positioning, personality and a moodboard that set a clear creative direction.", output: "Moodboard & direction" },
      { title: "Concepts", desc: "Original logo and identity concepts, presented on real-world mockups.", output: "Logo concepts" },
      { title: "Refine", desc: "We polish your chosen direction through feedback rounds until it feels right.", output: "Final identity" },
      { title: "Deliver", desc: "Master files, brand guidelines and ready-to-use assets, with full IP ownership.", output: "Brand kit & source files" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Identity</GradientText>
      </>
    ),
    items: [
      { icon: Gem, title: "Strategy-first design", desc: "Every mark starts from your positioning and audience, never from templates or trends." },
      {
        icon: MessagesSquare,
        title: "Senior designers, direct chat",
        desc: "You work directly with the designer crafting your brand, with no account-manager middlemen.",
      },
      { icon: Clock, title: "Fast, structured delivery", desc: "Most identities are launch-ready in 3 to 7 business days, with clear milestones." },
      { icon: FileCheck, title: "30-day warranty", desc: "Complimentary tweaks and support after handover, so your rollout goes smoothly." },
    ],
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Pantone Color Books"],
    highlight: { value: "100%", label: "Full commercial copyright ownership", chips: [".ai", ".eps", ".svg", ".pdf", ".png"] },
  },
  packages: {
    title: (
      <>
        Branding Packages, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Pick the scope that fits where your business is today. No hidden fees, ever.",
    tiers: {
      basic: {
        ...PRICING.basic,
        tagline: "Launch with a professional mark",
        features: ["1 initial logo concept", "Basic colour palette", "PNG, JPG & SVG exports", "2 rounds of revisions", "3–5 business day delivery"],
      },
      standard: {
        ...PRICING.standard,
        tagline: "A complete identity system",
        features: [
          "Multiple logo concepts",
          "Full colour & typography system",
          "Master source files (AI, EPS, SVG, PDF, PNG)",
          "Brand guidelines book",
          "Revisions until you're 100% satisfied",
          "30-day post-delivery support",
        ],
      },
      premium: {
        ...PRICING.premium,
        tagline: "A full 360° brand rollout",
        features: [
          "Everything in Standard",
          "Complete 360° rebrand strategy",
          "Stationery & business card suite",
          "Photorealistic 3D brand mockups",
          "Social media avatar & cover kit",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Branding",
  faqs: [
    {
      q: "What is the difference between a logo and a brand identity?",
      a: "A logo is the mark itself. A brand identity is the full system around it: colours, typography, imagery style and the rules for using them, so your brand looks consistent everywhere.",
    },
    {
      q: "How long does a branding project take?",
      a: "Most logo and identity projects are delivered in 3 to 7 business days. Larger rebrands with stationery and guidelines are planned with weekly milestones.",
    },
    {
      q: "How many concepts and revisions do I get?",
      a: "It depends on the package. Basic includes one initial concept with two revision rounds, while Standard and Premium include multiple concepts and revisions until you are 100% satisfied.",
    },
    {
      q: "Which files will I receive?",
      a: "You get print and digital files (PNG, JPG, SVG) on every package. Standard and Premium add master source files (AI, EPS, PDF) and a brand guidelines book.",
    },
    {
      q: "Do I own the copyright to my logo?",
      a: "Yes. On final payment, full commercial and intellectual property rights are transferred to your business.",
    },
    {
      q: "Can you refresh my existing logo instead of starting over?",
      a: "Absolutely. We audit what already works, keep the equity your customers recognise, and modernise the rest into a cleaner, more flexible identity.",
    },
  ],
  cta: {
    titleLead: "Ready for a",
    titleHighlight: "Professional Logo?",
    description:
      "With 8+ years of experience and 500+ happy clients, Piximdesign creates Premium brand identities, logos, and modern websites that stand out.",
    videoSrc: "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
    posterSrc: "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
  },
};

export const BrandingServicePage: React.FC = () => <ServiceLandingPage config={config} />;
