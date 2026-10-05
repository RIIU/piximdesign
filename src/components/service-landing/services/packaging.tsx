"use client";

import React from "react";
import { Box, Check, Layers, Printer, ShieldCheck } from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SAMPLE_MARK_PATH, SampleMark, Wordmark } from "@/components/page-kit/shared";
import { ChipDot, ChipIconBox, FloatingChip, Lines, MonoLabel, TILE_DARK } from "@/components/page-kit/primitives";
import type { ServiceConfig } from "../types";
import { SERVICE_PRICING } from "@/data/servicePricing";

const PRICING = SERVICE_PRICING["package-design"];

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

/* ---------- Packaging shapes (SVG) ---------- */

const IsoBox: React.FC<{ className?: string; top?: string; left?: string; right?: string; mark?: string }> = ({
  className = "w-full h-full",
  top = "#FFB866",
  left = "#FF8500",
  right = "#D96F00",
  mark = "#FFFFFF",
}) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <polygon points="100,20 170,60 100,100 30,60" fill={top} />
    <polygon points="30,60 100,100 100,180 30,140" fill={left} />
    <polygon points="100,100 170,60 170,140 100,180" fill={right} />
    {/* tuck flap crease */}
    <line x1="65" y1="40" x2="135" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    {/* front face: mark + label line */}
    <g transform="matrix(70 40 0 80 30 60)">
      <g transform="translate(0.25 0.2) scale(0.0104)">
        <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill={mark} />
      </g>
      <rect x="0.2" y="0.8" width="0.6" height="0.05" fill={mark} opacity="0.75" />
    </g>
    {/* side face: copy + barcode block */}
    <g transform="matrix(70 -40 0 80 100 100)">
      <rect x="0.15" y="0.22" width="0.55" height="0.06" fill="rgba(255,255,255,0.8)" />
      <rect x="0.15" y="0.34" width="0.4" height="0.05" fill="rgba(255,255,255,0.45)" />
      <rect x="0.15" y="0.72" width="0.28" height="0.14" fill="rgba(255,255,255,0.9)" />
    </g>
    <polyline points="30,60 100,100 170,60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
    <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
  </svg>
);

const Pouch: React.FC<{ className?: string; body?: string; accent?: string }> = ({
  className = "w-full h-full",
  body = "#FF8500",
  accent = "#FFFFFF",
}) => (
  <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
    <path d="M22 18 Q22 8 32 8 H88 Q98 8 98 18 L104 138 Q105 152 92 152 H28 Q15 152 16 138 Z" fill={body} />
    <path d="M22 18 Q22 8 32 8 H88 Q98 8 98 18 L99 30 H21 Z" fill="rgba(0,0,0,0.12)" />
    <line x1="24" y1="36" x2="96" y2="36" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeDasharray="3 2" />
    <g transform="translate(42 54) scale(0.75)">
      <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill={accent} />
    </g>
    <rect x="34" y="102" width="52" height="7" rx="3.5" fill={accent} opacity="0.9" />
    <rect x="42" y="114" width="36" height="4" rx="2" fill={accent} opacity="0.5" />
    <path d="M17 136 Q60 126 103 136" stroke="rgba(0,0,0,0.18)" fill="none" />
  </svg>
);

const Jar: React.FC<{ className?: string; label?: string; lid?: string }> = ({
  className = "w-full h-full",
  label = "#FF8500",
  lid = "#2651B9",
}) => (
  <svg viewBox="0 0 100 130" className={className} aria-hidden="true">
    <rect x="22" y="6" width="56" height="18" rx="4" fill={lid} />
    <rect x="18" y="22" width="64" height="100" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
    <rect x="18" y="48" width="64" height="48" fill={label} />
    <g transform="translate(40 55) scale(0.42)">
      <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill="#FFFFFF" />
    </g>
    <rect x="30" y="82" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.85" />
  </svg>
);

const Bottle: React.FC<{ className?: string; label?: string }> = ({ className = "w-full h-full", label = "#2651B9" }) => (
  <svg viewBox="0 0 80 160" className={className} aria-hidden="true">
    <rect x="30" y="6" width="20" height="16" rx="3" fill="#081330" stroke="rgba(255,255,255,0.3)" />
    <path
      d="M32 22 H48 V38 Q66 46 66 66 V146 Q66 154 58 154 H22 Q14 154 14 146 V66 Q14 46 32 38 Z"
      fill="rgba(255,255,255,0.14)"
      stroke="rgba(255,255,255,0.3)"
    />
    <rect x="14" y="78" width="52" height="50" fill={label} />
    <g transform="translate(29 86) scale(0.46)">
      <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill="#FFFFFF" />
    </g>
    <rect x="24" y="114" width="32" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

/** Flat tuck-end box net: solid cut lines, dashed fold lines */
const Dieline: React.FC<{ className?: string; showBleed?: boolean }> = ({ className = "w-full h-full", showBleed = false }) => (
  <svg viewBox="0 0 300 190" className={className} aria-hidden="true">
    {showBleed && <rect x="16" y="4" width="268" height="182" rx="4" fill="none" stroke="#FF5F57" strokeWidth="1" strokeDasharray="2 3" />}
    <path
      d="M24 63 L36 55 L40 42 L82 42 L86 55 L86 25 L90 12 L152 12 L156 25 L156 55 L160 42 L202 42 L206 55 L276 55 L276 135 L276 165 L272 178 L210 178 L206 165 L206 135 L202 148 L160 148 L156 135 L86 135 L82 148 L40 148 L36 135 L24 127 Z"
      fill="rgba(255,133,0,0.08)"
      stroke="#FF8500"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <g stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 3">
      {[36, 86, 156, 206].map((x) => (
        <line key={x} x1={x} y1="55" x2={x} y2="135" />
      ))}
      <line x1="36" y1="55" x2="206" y2="55" />
      <line x1="86" y1="25" x2="156" y2="25" />
      <line x1="36" y1="135" x2="86" y2="135" />
      <line x1="156" y1="135" x2="276" y2="135" />
      <line x1="206" y1="165" x2="276" y2="165" />
    </g>
    <g fill="rgba(203,213,225,0.7)" fontSize="8" fontFamily="monospace" textAnchor="middle">
      <text x="61" y="98">SIDE</text>
      <text x="121" y="98">FRONT</text>
      <text x="181" y="98">SIDE</text>
      <text x="241" y="98">BACK</text>
    </g>
    <g transform="translate(109 64) scale(0.5)">
      <path fillRule="evenodd" clipRule="evenodd" d={SAMPLE_MARK_PATH} fill="#FF8500" opacity="0.8" />
    </g>
  </svg>
);

const BARCODE = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1];

const Barcode: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-stretch gap-[1.5px] bg-white px-1.5 py-1 rounded-sm ${className}`} aria-hidden="true">
    {BARCODE.map((w, i) => (
      <span key={i} className="bg-[#081330]" style={{ width: w * 1.5 }} />
    ))}
  </div>
);

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <div className="relative col-span-4 aspect-[4/3] rounded-3xl border border-[#2651B9]/35 bg-gradient-to-br from-[#0F2260] to-[#081330] overflow-hidden flex items-center justify-center">
        <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-1/2 h-4 rounded-full bg-black/40 blur-md" />
        <IsoBox className="relative w-[62%] h-[82%] drop-shadow-[0_20px_30px_rgba(255,133,0,0.25)]" />
        <MonoLabel className="absolute top-4 left-4 text-slate-500">Retail box</MonoLabel>
      </div>

      <div className="col-span-2 rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90 p-3 flex flex-col items-center justify-center gap-2">
        <Pouch className="w-full h-auto max-h-[120px]" />
        <MonoLabel>Pouch</MonoLabel>
      </div>

      <div className={`col-span-3 ${TILE_DARK} p-3.5 flex items-center gap-3`}>
        <div className="flex-1 rounded-xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-2.5">
          <div className="flex items-center gap-1">
            <SampleMark className="w-3.5 h-3.5" color="#FFFFFF" />
            <Wordmark className="text-[10px] text-white" />
          </div>
          <span className="mt-1 block font-agency text-sm font-extrabold text-white leading-none">Organic Honey</span>
          <span className="block text-[8px] text-white/80">Net wt. 250g</span>
        </div>
        <div className="hidden sm:block">
          <Barcode className="h-10" />
        </div>
      </div>

      <div className={`col-span-3 ${TILE_DARK} p-3 flex items-end justify-center gap-3`}>
        <Jar className="h-20 w-auto" />
        <Bottle className="h-24 w-auto" />
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-4"
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="Print-ready"
    />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <Printer className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="die-cut-box.pdf"
      sub="CMYK · 3mm bleed"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const BoxVisual = () => (
  <div className="relative flex h-full items-center justify-center">
    <span className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-2/5 h-4 rounded-full bg-black/40 blur-md" />
    <IsoBox className="relative h-[85%] w-auto max-h-[300px] transition-transform duration-500 group-hover:-translate-y-2" />
    <div className="absolute left-2 top-2 rounded-lg border border-white/10 bg-[#081330]/80 px-2.5 py-1.5">
      <MonoLabel>Dimensions</MonoLabel>
      <span className="block text-[11px] font-mono text-white">120 × 80 × 40 mm</span>
    </div>
  </div>
);

const LabelVisual = () => (
  <div className="flex h-full items-end justify-center gap-4 sm:gap-6">
    <Bottle className="h-full max-h-[130px] w-auto" label="#FF8500" />
    <Jar className="h-[80%] max-h-[105px] w-auto" label="#2651B9" lid="#FF8500" />
    <div className="mb-3 flex flex-col items-center gap-2">
      <span className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFA133] to-[#FF8500] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12">
        <span className="font-agency text-[11px] font-extrabold text-white text-center leading-none">
          100%
          <br />
          Natural
        </span>
      </span>
      <MonoLabel>Sticker</MonoLabel>
    </div>
  </div>
);

const PouchVisual = () => (
  <div className="flex h-full items-center justify-center">
    <Pouch className="h-full max-h-[140px] w-auto transition-transform duration-500 group-hover:-rotate-3" body="#2651B9" accent="#FFA133" />
  </div>
);

const MockupVisual = () => (
  <div className="relative flex h-full items-center justify-center">
    <span className="absolute w-28 h-28 rounded-full border border-dashed border-[#FF8500]/40 animate-[spin_18s_linear_infinite] motion-reduce:animate-none" />
    <IsoBox className="relative h-[80%] max-h-[110px] w-auto" top="#93C5FD" left="#2651B9" right="#1E3A8A" />
    <span className="absolute right-1 top-1 rounded-full bg-[#FF8500] px-2 py-0.5 text-[10px] font-bold text-white">360°</span>
  </div>
);

const DielineVisual = () => (
  <div className="relative h-full">
    <Dieline className="h-full w-full" />
    <div className="absolute right-1 bottom-0 flex gap-3">
      <span className="flex items-center gap-1 text-[9px] text-slate-400">
        <span className="w-3 h-0.5 bg-[#FF8500]" />
        Cut
      </span>
      <span className="flex items-center gap-1 text-[9px] text-slate-400">
        <span className="w-3 border-t border-dashed border-[#60A5FA]" />
        Fold
      </span>
    </div>
  </div>
);

const SeriesVisual = () => (
  <div className="flex h-full items-end justify-center gap-2 sm:gap-4">
    {[
      { top: "#FFB866", left: "#FF8500", right: "#D96F00", name: "Original" },
      { top: "#93C5FD", left: "#2651B9", right: "#1E3A8A", name: "Berry" },
      { top: "#6EE7B7", left: "#059669", right: "#047857", name: "Mint" },
    ].map((sku, i) => (
      <div key={sku.name} className="flex flex-col items-center gap-1.5 transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }}>
        <IsoBox className="h-20 sm:h-24 w-auto" top={sku.top} left={sku.left} right={sku.right} />
        <MonoLabel>{sku.name}</MonoLabel>
      </div>
    ))}
  </div>
);

/* ---------- Showcase panels ---------- */

const PrintSpecPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <Dieline className="w-full h-auto" showBleed />
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { swatch: <span className="w-4 h-0.5 bg-[#FF8500]" />, label: "Cut line" },
        { swatch: <span className="w-4 border-t border-dashed border-[#60A5FA]" />, label: "Fold line" },
        { swatch: <span className="w-4 border-t border-dashed border-[#FF5F57]" />, label: "Bleed 3mm" },
        { swatch: <span className="w-3 h-3 rounded-sm bg-[#FF8500]/20 border border-[#FF8500]/50" />, label: "Print area" },
      ].map((k) => (
        <span key={k.label} className="flex items-center gap-2 text-xs text-slate-300">
          {k.swatch}
          {k.label}
        </span>
      ))}
    </div>
  </div>
);

const MockupPanel = () => (
  <div className="grid grid-cols-3 gap-3">
    <div className="relative col-span-3 sm:col-span-2 sm:row-span-2 min-h-[220px] rounded-2xl bg-gradient-to-b from-[#1B2A55] to-[#081330] border border-[#2651B9]/35 flex items-center justify-center overflow-hidden">
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
      <span className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-1/3 h-5 rounded-full bg-black/50 blur-md" />
      <IsoBox className="relative h-48 w-auto drop-shadow-[0_25px_35px_rgba(255,133,0,0.3)]" />
      <MonoLabel className="absolute top-3 left-3">Studio render</MonoLabel>
    </div>
    {[
      { name: "Front", cls: "bg-[#FF8500]" },
      { name: "Side", cls: "bg-[#D96F00]" },
    ].map((v) => (
      <div key={v.name} className="rounded-2xl bg-[#0C1E4E] border border-[#2651B9]/35 p-3 flex flex-col items-center justify-center gap-2 min-h-[100px]">
        <span className={`w-12 h-14 rounded-md ${v.cls} flex items-center justify-center`}>
          {v.name === "Front" && <SampleMark className="w-6 h-6" color="#FFFFFF" />}
        </span>
        <MonoLabel>{v.name}</MonoLabel>
      </div>
    ))}
  </div>
);

const LabelCompliancePanel = () => (
  <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="rounded-xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-4 flex flex-col justify-between min-h-[170px]">
      <div className="flex items-center gap-1.5">
        <SampleMark className="w-5 h-5" color="#FFFFFF" />
        <Wordmark className="text-sm text-white" />
      </div>
      <div>
        <span className="block font-agency text-2xl font-extrabold text-white leading-none">Organic Honey</span>
        <span className="mt-1 block text-[11px] text-white/85">Raw · Unfiltered · Net wt. 250g</span>
      </div>
    </div>
    <div className="flex flex-col justify-between gap-3">
      <div className="rounded-lg border-2 border-[#081330] p-2.5">
        <span className="block font-agency text-sm font-extrabold text-[#081330]">Nutrition Facts</span>
        <div className="mt-1.5 divide-y divide-slate-300">
          {["Energy", "Carbohydrate", "Sugars", "Protein"].map((row, i) => (
            <div key={row} className="flex items-center justify-between py-1 text-[10px] text-slate-700">
              <span>{row}</span>
              <span className="h-1.5 rounded bg-slate-400" style={{ width: `${40 - i * 6}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <Lines widths={["w-24", "w-20", "w-16"]} className="space-y-1" barClass="h-1 bg-slate-300" />
        <Barcode className="h-10" />
      </div>
    </div>
  </div>
);

const ColourPrintPanel = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
      <MonoLabel>CMYK separation</MonoLabel>
      <div className="mt-3 space-y-2.5">
        {[
          { ch: "C", val: 0, color: "#22D3EE" },
          { ch: "M", val: 48, color: "#E879F9" },
          { ch: "Y", val: 100, color: "#FACC15" },
          { ch: "K", val: 0, color: "#94A3B8" },
        ].map((c) => (
          <div key={c.ch} className="flex items-center gap-3">
            <span className="w-4 text-xs font-mono font-bold text-white">{c.ch}</span>
            <span className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <span className="block h-full rounded-full" style={{ width: `${Math.max(c.val, 3)}%`, background: c.color }} />
            </span>
            <span className="w-8 text-right text-[10px] font-mono text-slate-400">{c.val}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-[#FF8500]" />
        <span className="text-xs text-slate-300">Sunrise Orange · print match</span>
      </div>
    </div>
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
      <MonoLabel>Pre-flight checklist</MonoLabel>
      <ul className="mt-3 space-y-2.5">
        {["300 DPI images", "Fonts outlined", "3mm bleed on all edges", "Barcode scale verified", "Overprint checked"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
            <span className="flex w-4 h-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Packaging Design",
  shortName: "Packaging",
  projectLabel: "a packaging project",
  hero: {
    eyebrow: "Packaging & Label Design",
    title: (
      <>
        Packaging That <GradientText>Sells Your Product</GradientText> on the Shelf
      </>
    ),
    description:
      "Print-ready boxes, pouches and labels with photorealistic 3D mockups, designed to grab attention in seconds and feel premium in every unboxing.",
    primaryCta: "Design My Packaging",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why packaging matters",
    text: "Shoppers decide in seconds. Your packaging is the salesperson standing on every shelf, in every unboxing video and on every doorstep.",
    highlights: ["seconds.", "salesperson"],
    pillars: [
      { title: "Shelf impact", desc: "Stand out next to every competitor in the aisle." },
      { title: "Premium feel", desc: "Unboxing moments people want to share." },
      { title: "Print accuracy", desc: "Die-lines, bleed and colours checked before printing." },
    ],
  },
  bento: {
    eyebrow: "Our Packaging Services",
    title: (
      <>
        Packaging Design for <GradientText>Every Product You Sell</GradientText>
      </>
    ),
    description: "Boxes, pouches, labels and complete product lines, designed to look premium and print perfectly.",
    tiles: [
      {
        title: "Product Box Design",
        desc: "Retail and shipping boxes with structure, artwork and finish planned together for maximum shelf appeal.",
        visual: <BoxVisual />,
      },
      { title: "Label & Sticker Design", desc: "Labels for bottles, jars and tubs that are clear, compliant and on-brand.", visual: <LabelVisual /> },
      { title: "Pouch Design", desc: "Stand-up pouches that pop.", visual: <PouchVisual /> },
      { title: "3D Mockups", desc: "Photorealistic renders before print.", visual: <MockupVisual /> },
      { title: "Die-Cut Templates", desc: "Print-ready die-lines with cut, fold and bleed marked for your printer.", visual: <DielineVisual /> },
      { title: "Product Line Series", desc: "One packaging system that scales across flavours, sizes and SKUs.", visual: <SeriesVisual /> },
    ],
  },
  showcase: {
    eyebrow: "From Concept to Shelf",
    title: (
      <>
        Every File Your Printer Needs, <GradientText>Done Right</GradientText>
      </>
    ),
    description: "We hand over more than a pretty picture: complete print specs, realistic mockups and compliant labels.",
    ctaLabel: "Start My Packaging",
    panels: [
      {
        id: "print-spec",
        title: "Die-line & Print Spec",
        desc: "A flat die-line with cut lines, fold lines, bleed and print areas clearly marked.",
        visual: <PrintSpecPanel />,
      },
      {
        id: "3d-mockup",
        title: "Photorealistic 3D Mockup",
        desc: "Studio-quality renders for e-commerce listings, pitches and social media before you print.",
        visual: <MockupPanel />,
      },
      {
        id: "label-compliance",
        title: "Label & Compliance",
        desc: "Product information, nutrition panels and barcodes laid out clearly and correctly.",
        visual: <LabelCompliancePanel />,
      },
      {
        id: "colour-print",
        title: "Colour & Print Setup",
        desc: "CMYK separations and a pre-flight checklist so colours print exactly as designed.",
        visual: <ColourPrintPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Brief to <GradientText>Print-Ready Files</GradientText>
      </>
    ),
    description: "A clear process that takes your product from idea to shelf-ready packaging without surprises at the printer.",
    steps: [
      { title: "Discover", desc: "We learn about your product, audience, retail channels and competitors.", output: "Packaging brief" },
      { title: "Concepts", desc: "Creative directions for structure, colour and artwork, shown in context.", output: "Concept directions" },
      { title: "Artwork", desc: "Final artwork built precisely on the die-line with all product information.", output: "Print-ready artwork" },
      { title: "Mockup & Review", desc: "Photorealistic 3D mockups so you can review every side before printing.", output: "3D mockups" },
      { title: "Deliver", desc: "Pre-flighted print files and specs your printer can use straight away.", output: "Die-cut files & print specs" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Packaging</GradientText>
      </>
    ),
    items: [
      { icon: Printer, title: "Print-first precision", desc: "Die-lines, bleed and CMYK separations are pre-flighted before files reach your printer." },
      { icon: Box, title: "Photorealistic 3D mockups", desc: "See and sell your product before a single box is printed." },
      { icon: ShieldCheck, title: "Compliance-aware layouts", desc: "Barcodes and regulatory information placed correctly from the start." },
      { icon: Layers, title: "Series-ready systems", desc: "One design language that scales across flavours, sizes and SKUs." },
    ],
    tools: ["Adobe Illustrator", "Cinema 4D", "Blender 3D", "Photoshop", "Esko Studio"],
    highlight: { value: "100%", label: "Print-ready, pre-flighted files", chips: ["AI", "PDF", "CMYK", "3mm bleed"] },
  },
  packages: {
    title: (
      <>
        Packaging Design, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Pick the scope that fits your product range today. No hidden fees, ever.",
    tiers: {
      basic: {
        ...PRICING.basic,
        tagline: "One label, done right",
        features: ["1 label or sticker design", "Print-ready vector file with bleed", "CMYK colour setup", "2 rounds of revisions"],
      },
      standard: {
        ...PRICING.standard,
        tagline: "A complete retail pack",
        features: [
          "Full box or pouch layout",
          "Die-cut template & bleed margins",
          "Photorealistic 3D mockup",
          "Barcode & label layout",
          "Master AI & PDF source files",
          "Revisions until you're 100% satisfied",
        ],
      },
      premium: {
        ...PRICING.premium,
        tagline: "A full product line",
        features: [
          "Packaging series for 3+ SKUs",
          "One consistent system across the line",
          "3D mockups for every SKU",
          "E-commerce ready renders",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Packaging",
  faqs: [
    {
      q: "Will my files be ready for printing?",
      a: "Yes. Every file is set up in CMYK with 3mm bleed, outlined fonts and the correct die-line, so any commercial printer can use it.",
    },
    {
      q: "Can you work with my printer's die-line?",
      a: "Absolutely. Send us your printer's template and we'll design on it, or we can create a die-cut template for standard box styles.",
    },
    {
      q: "Do I get 3D mockups?",
      a: "Standard and Premium include photorealistic 3D mockups, perfect for e-commerce listings, pitches and social media before you print.",
    },
    {
      q: "Can you design packaging for several products?",
      a: "Yes. Our Premium package creates a consistent series across 3 or more SKUs, so your whole range looks like one family.",
    },
    {
      q: "Do you add barcodes and label information?",
      a: "We lay out the barcodes, ingredients, weights and regulatory text you provide and check the layout against common labelling requirements.",
    },
    {
      q: "Do you print the packaging?",
      a: "We focus on design and deliver pre-flighted, print-ready files that work with any commercial printer you choose.",
    },
  ],
  cta: {
    titleLead: "Ready to Stand Out",
    titleHighlight: "On the Shelf?",
    description: "Get packaging that looks premium, prints perfectly and makes customers reach for your product first.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const PackagingServicePage: React.FC = () => <ServiceLandingPage config={config} />;
