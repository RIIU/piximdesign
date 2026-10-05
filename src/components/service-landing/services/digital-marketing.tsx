"use client";

import React from "react";
import {
  Activity,
  ArrowRight,
  ChartColumn,
  Check,
  Eye,
  FlaskConical,
  Megaphone,
  MousePointerClick,
  Search,
  ShoppingCart,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SampleMark, Wordmark } from "@/components/page-kit/shared";
import { Bars, ChipDot, ChipIconBox, FloatingChip, Lines, MonoLabel, Sparkline, TILE_DARK } from "@/components/page-kit/primitives";
import type { ServiceConfig } from "../types";
import { SERVICE_PRICING } from "@/data/servicePricing";

const PRICING = SERVICE_PRICING["digital-marketing"];

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

/* ---------- Shared pieces ---------- */

const Kpi: React.FC<{ label: string; points: number[] }> = ({ label, points }) => (
  <div className="rounded-xl bg-[#081330] border border-white/10 p-2">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-mono text-slate-500">{label}</span>
      <TrendingUp className="w-3 h-3 text-emerald-400" />
    </div>
    <Sparkline points={points} className="mt-1 w-full h-6" fill={false} color="#60A5FA" />
  </div>
);

const MiniAd: React.FC<{ variant?: "orange" | "blue"; cta?: string; className?: string }> = ({
  variant = "orange",
  cta = "Shop Now",
  className = "",
}) => (
  <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#081330] shadow-xl ${className}`}>
    <div className="flex items-center gap-1.5 px-2.5 py-2">
      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center">
        <SampleMark className="w-2.5 h-2.5" color="#FFFFFF" />
      </span>
      <span className="leading-tight">
        <span className="block text-[9px] font-semibold text-white">yourbrand</span>
        <span className="block text-[7px] text-slate-500">Sponsored</span>
      </span>
    </div>
    <div
      className={`aspect-[4/3] flex items-center justify-center ${
        variant === "orange" ? "bg-gradient-to-br from-[#FF8500] to-[#FFA133]" : "bg-gradient-to-br from-[#2651B9] to-[#0F2260]"
      }`}
    >
      <span className="font-agency text-lg font-extrabold text-white text-center leading-none">
        {variant === "orange" ? (
          <>
            Fresh
            <br />
            Arrivals
          </>
        ) : (
          <>
            Free
            <br />
            Delivery
          </>
        )}
      </span>
    </div>
    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5">
      <Lines widths={["w-12"]} barClass="h-1 bg-white/25" />
      <span className="rounded bg-[#2651B9] px-1.5 py-0.5 text-[7px] font-bold text-white">{cta}</span>
    </div>
  </div>
);

const SearchAd: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`rounded-xl bg-white p-3 ${className}`}>
    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5">
      <Search className="w-3 h-3 text-slate-400" />
      <span className="text-[10px] text-slate-500 truncate">organic honey online</span>
    </div>
    <div className="mt-2.5">
      <span className="text-[9px] text-slate-700">
        <b>Sponsored</b> · yourbrand.com
      </span>
      <span className="block text-[12px] font-semibold text-[#1A0DAB] leading-snug">Organic Honey, Delivered Fresh</span>
      <Lines widths={["w-full", "w-4/5"]} className="mt-1 space-y-1" barClass="h-1 bg-slate-200" />
    </div>
  </div>
);

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <div className={`col-span-4 ${TILE_DARK} p-3.5 sm:p-4`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">Campaign overview</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Kpi label="ROAS" points={[3, 4, 3.5, 5, 6, 5.5, 7]} />
          <Kpi label="CTR" points={[2, 2.5, 2.2, 3, 3.4, 3.1, 3.9]} />
          <Kpi label="Leads" points={[5, 6, 8, 7, 9, 11, 12]} />
        </div>
        <div className="mt-3 rounded-xl bg-[#081330] border border-white/10 p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-500">Conversions</span>
            <span className="text-[9px] font-mono text-[#FFA133]">Last 30 days</span>
          </div>
          <Sparkline points={[10, 12, 11, 15, 14, 18, 17, 22, 21, 26, 28, 31]} className="mt-1 w-full h-14" />
        </div>
      </div>

      <MiniAd className="col-span-2 self-start" />

      <div className={`col-span-3 ${TILE_DARK} p-3.5 space-y-1.5`}>
        {[
          { l: "Awareness", w: "w-full", c: "bg-[#2651B9]" },
          { l: "Consideration", w: "w-[82%]", c: "bg-[#3B82F6]" },
          { l: "Conversion", w: "w-[62%]", c: "bg-gradient-to-r from-[#FF8500] to-[#FFA133]" },
        ].map((stage) => (
          <div key={stage.l} className={`mx-auto ${stage.w} ${stage.c} rounded-lg py-1.5 text-center text-[10px] font-bold text-white`}>
            {stage.l}
          </div>
        ))}
      </div>

      <SearchAd className="col-span-3" />
    </div>

    <FloatingChip
      className="right-[36%] -top-4"
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="Pixel tracking on"
    />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <ChartColumn className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Weekly report sent"
      sub="Every Monday · PDF"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const MetaAdsVisual = () => (
  <div className="flex h-full flex-col">
    <div className="flex flex-1 items-center justify-center gap-3 sm:gap-4">
      <MiniAd className="w-[46%] max-w-[190px] transition-transform duration-500 group-hover:-translate-y-1" />
      <div className="relative w-[30%] max-w-[120px] aspect-[9/16] overflow-hidden rounded-xl bg-gradient-to-b from-[#2651B9] to-[#0F2260] p-2 flex flex-col justify-between shadow-xl transition-transform duration-500 group-hover:translate-y-1">
        <div className="flex gap-0.5">
          <span className="h-0.5 flex-1 rounded bg-white" />
          <span className="h-0.5 flex-1 rounded bg-white/40" />
        </div>
        <span className="font-agency text-base font-extrabold text-white text-center leading-none">
          Free
          <br />
          Delivery
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-[7px] font-bold text-[#2651B9] text-center">Shop now</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
      {["Feed", "Stories", "Reels", "Messenger"].map((p) => (
        <span key={p} className="rounded-full border border-[#2651B9]/40 bg-[#081330] px-2.5 py-0.5 text-[10px] text-slate-300">
          {p}
        </span>
      ))}
    </div>
  </div>
);

const GoogleAdsVisual = () => (
  <div className="flex h-full items-center">
    <div className="w-full rounded-xl bg-white p-3">
      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
        <Search className="w-3 h-3 text-slate-400" />
        <span className="text-[10px] text-slate-500">organic honey online</span>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <span className="text-[9px] text-slate-700">
            <b>Sponsored</b> · yourbrand.com
          </span>
          <span className="block text-[11px] font-semibold text-[#1A0DAB]">Organic Honey, Delivered Fresh</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Shop", "Offers", "Reviews"].map((s) => (
              <span key={s} className="rounded-full border border-slate-200 px-1.5 py-0.5 text-[8px] text-[#1A0DAB]">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden sm:block opacity-50">
          <span className="text-[9px] text-slate-500">competitor.com</span>
          <Lines widths={["w-4/5", "w-full", "w-3/5"]} className="mt-1 space-y-1" barClass="h-1 bg-slate-200" />
        </div>
      </div>
    </div>
  </div>
);

const AudienceVisual = () => (
  <div className="flex h-full items-center justify-center">
    <svg viewBox="0 0 120 120" className="h-full max-h-[130px] w-auto" aria-hidden="true">
      {[54, 38, 22].map((r, i) => (
        <circle key={r} cx={60} cy={60} r={r} fill={i === 2 ? "rgba(255,133,0,0.25)" : "none"} stroke="rgba(96,165,250,0.35)" strokeDasharray={i === 0 ? "3 4" : undefined} />
      ))}
      {[
        [28, 40],
        [90, 34],
        [84, 86],
        [36, 88],
        [60, 18],
        [104, 62],
        [16, 66],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.5} fill="#60A5FA" />
      ))}
      {[
        [52, 54],
        [68, 62],
        [58, 70],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill="#FF8500" />
      ))}
    </svg>
  </div>
);

const TrackingVisual = () => (
  <div className="flex h-full flex-col justify-center gap-2.5">
    <div className="rounded-lg bg-[#05070D] border border-white/10 p-2.5 font-mono text-[9px] leading-relaxed text-slate-300">
      <div>
        <span className="text-[#C084FC]">fbq</span>(<span className="text-[#FFA133]">&apos;track&apos;</span>,{" "}
        <span className="text-emerald-400">&apos;Purchase&apos;</span>)
      </div>
      <div>
        <span className="text-[#C084FC]">gtag</span>(<span className="text-[#FFA133]">&apos;event&apos;</span>,{" "}
        <span className="text-emerald-400">&apos;conversion&apos;</span>)
      </div>
    </div>
    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
      <Check className="w-3 h-3" strokeWidth={3} /> Events firing correctly
    </span>
  </div>
);

const RetargetingVisual = () => (
  <div className="relative flex h-full flex-col justify-center">
    <div className="flex items-center justify-between gap-1">
      {[
        { icon: <Eye className="w-4 h-4" />, l: "Saw ad" },
        { icon: <MousePointerClick className="w-4 h-4" />, l: "Visited" },
        { icon: <ShoppingCart className="w-4 h-4" />, l: "Added to cart" },
        { icon: <Check className="w-4 h-4" strokeWidth={3} />, l: "Purchased" },
      ].map((s, i, arr) => (
        <React.Fragment key={s.l}>
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={`flex w-10 h-10 items-center justify-center rounded-xl border ${
                i === arr.length - 1
                  ? "border-[#FF8500] bg-[#FF8500] text-white"
                  : "border-[#2651B9]/40 bg-[#081330] text-[#60A5FA]"
              }`}
            >
              {s.icon}
            </span>
            <span className="text-[9px] text-slate-400 text-center leading-tight">{s.l}</span>
          </div>
          {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-600 -mt-4" />}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-3 mx-auto flex items-center gap-2 rounded-full border border-dashed border-[#FF8500]/50 px-3 py-1 text-[10px] font-semibold text-[#FFA133]">
      Retarget visitors who didn&apos;t buy
    </div>
  </div>
);

const ReportingVisual = () => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between">
      <MonoLabel>Weekly results</MonoLabel>
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-[#2651B9]" /> Spend
        </span>
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-[#FF8500]" /> Revenue
        </span>
      </div>
    </div>
    <div className="relative mt-2 flex-1 min-h-[80px]">
      <Bars values={[35, 42, 40, 55, 62, 70, 84]} className="absolute inset-0" barClass="bg-[#2651B9]/60" highlight={6} />
      <Sparkline points={[30, 38, 41, 52, 60, 72, 90]} className="absolute inset-0 w-full h-full" fill={false} color="#FFA133" />
    </div>
    <div className="mt-1.5 flex justify-between text-[8px] font-mono text-slate-500">
      {["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((w) => (
        <span key={w}>{w}</span>
      ))}
    </div>
  </div>
);

/* ---------- Showcase panels ---------- */

const AudienceMapPanel = () => (
  <div className="relative h-72 sm:h-80 overflow-hidden rounded-2xl bg-[#081330] border border-[#2651B9]/35">
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(148,163,184,0.08)" />
      ))}
    </svg>
    {[
      { l: "Lookalike audiences", s: "w-32 h-32 sm:w-36 sm:h-36", pos: "left-[6%] top-[12%]", c: "bg-[#2651B9]/45 border-[#3B82F6]/60" },
      { l: "Website visitors", s: "w-24 h-24 sm:w-28 sm:h-28", pos: "right-[10%] top-[8%]", c: "bg-[#FF8500]/35 border-[#FF8500]/70" },
      { l: "Engaged followers", s: "w-24 h-24", pos: "left-[40%] top-[40%]", c: "bg-[#3B82F6]/35 border-[#60A5FA]/60" },
      { l: "Cart abandoners", s: "w-20 h-20", pos: "right-[8%] bottom-[10%]", c: "bg-[#FFA133]/40 border-[#FFA133]/80" },
      { l: "Interest targeting", s: "w-24 h-24", pos: "left-[10%] bottom-[6%]", c: "bg-[#1E3A8A]/60 border-[#3B82F6]/40" },
    ].map((b) => (
      <span
        key={b.l}
        className={`absolute ${b.pos} ${b.s} ${b.c} rounded-full border flex items-center justify-center p-3 text-center text-[10px] sm:text-xs font-semibold text-white leading-tight`}
      >
        {b.l}
      </span>
    ))}
  </div>
);

const FunnelPlanPanel = () => (
  <div className="space-y-3">
    {[
      { stage: "TOFU", goal: "Reach new customers", formats: ["Video views", "Reels", "Broad interests"], c: "bg-[#2651B9]" },
      { stage: "MOFU", goal: "Build consideration", formats: ["Carousels", "Lead forms", "Engagers"], c: "bg-[#3B82F6]" },
      { stage: "BOFU", goal: "Convert & retarget", formats: ["Offers", "Catalogue ads", "Cart abandoners"], c: "bg-gradient-to-r from-[#FF8500] to-[#FFA133]" },
    ].map((row, i) => (
      <div key={row.stage} className="flex items-center gap-3 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-3 sm:p-4" style={{ marginLeft: `${i * 6}%`, marginRight: `${i * 6}%` }}>
        <span className={`shrink-0 rounded-lg ${row.c} px-2.5 py-1 font-mono text-[10px] font-bold text-white`}>{row.stage}</span>
        <div className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">{row.goal}</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {row.formats.map((f) => (
              <span key={f} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-300">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CreativeTestPanel = () => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    {[
      { name: "Variant A", variant: "blue" as const, ctr: "w-[45%]", winner: false },
      { name: "Variant B", variant: "orange" as const, ctr: "w-[78%]", winner: true },
    ].map((v) => (
      <div
        key={v.name}
        className={`relative rounded-2xl border p-3 sm:p-4 ${v.winner ? "border-[#FF8500]/60 bg-[#FF8500]/[0.06]" : "border-[#2651B9]/35 bg-[#081330]"}`}
      >
        {v.winner && (
          <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-2 py-0.5 text-[10px] font-bold text-white">
            <Trophy className="w-3 h-3" /> Winner
          </span>
        )}
        <span className="text-xs font-semibold text-white">{v.name}</span>
        <MiniAd variant={v.variant} className="mt-2" />
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Click-through rate</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-white/10">
            <div className={`h-full rounded-full ${v.ctr} ${v.winner ? "bg-[#FF8500]" : "bg-[#60A5FA]"}`} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const WeeklyReportPanel = () => (
  <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SampleMark className="w-5 h-5" color="#FF8500" />
        <Wordmark className="text-sm text-[#081330]" />
      </div>
      <span className="rounded-full bg-[#081330] px-2.5 py-0.5 text-[10px] font-mono text-white">Weekly report</span>
    </div>
    <div className="mt-3 rounded-xl bg-white border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Return on ad spend</span>
        <TrendingUp className="w-4 h-4 text-emerald-500" />
      </div>
      <Sparkline points={[12, 14, 13, 17, 19, 18, 23, 26]} className="mt-1 w-full h-16" color="#FF8500" />
    </div>
    <div className="mt-3">
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Next week</span>
      <ul className="mt-2 space-y-1.5">
        {["Scale the winning ad set", "Pause low-CTR creatives", "Test a new video hook"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Digital Marketing & Ads",
  shortName: "Digital Marketing",
  projectLabel: "a digital marketing campaign",
  hero: {
    eyebrow: "Digital Marketing & Ads",
    title: (
      <>
        Ads That Turn Your Budget <GradientText>Into Customers</GradientText>
      </>
    ),
    description:
      "Data-driven Meta and Google campaigns with sharp targeting, scroll-stopping creative and weekly reporting, so every taka and dollar works harder.",
    primaryCta: "Grow My Sales",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why strategy matters",
    text: "Ads without strategy are just expensive noise. We pair precise targeting with creative that converts, then measure everything so your budget keeps getting smarter.",
    highlights: ["noise.", "converts,", "smarter."],
    pillars: [
      { title: "Targeting", desc: "Reach the people most likely to buy." },
      { title: "Creative", desc: "Ads designed to stop the scroll and convert." },
      { title: "Measurement", desc: "Every click and conversion tracked and reported." },
    ],
  },
  bento: {
    eyebrow: "Our Digital Marketing Services",
    title: (
      <>
        Everything You Need to <GradientText>Win With Paid Ads</GradientText>
      </>
    ),
    description: "Strategy, creative, tracking and optimisation handled by one team, so nothing falls through the cracks.",
    tiles: [
      {
        title: "Meta Ads (Facebook & Instagram)",
        desc: "Campaigns across feeds, stories and reels with audiences and creative built to convert.",
        visual: <MetaAdsVisual />,
      },
      { title: "Google Search & Performance Max", desc: "Show up the moment customers search for what you sell.", visual: <GoogleAdsVisual /> },
      { title: "Audience Targeting", desc: "The right people, every time.", visual: <AudienceVisual /> },
      { title: "Conversion Tracking", desc: "Pixel & GA4 set up properly.", visual: <TrackingVisual /> },
      { title: "Retargeting Funnels", desc: "Bring back visitors who showed interest but didn't buy yet.", visual: <RetargetingVisual /> },
      { title: "Reporting & ROI", desc: "Weekly reports that show exactly what your ad spend returns.", visual: <ReportingVisual /> },
    ],
  },
  showcase: {
    eyebrow: "Inside Every Campaign",
    title: (
      <>
        Strategy You Can See, <GradientText>Results You Can Measure</GradientText>
      </>
    ),
    description: "No black boxes: you see the audiences, the funnel, the creative tests and the numbers behind every decision.",
    ctaLabel: "Plan My Campaign",
    panels: [
      {
        id: "audience-map",
        title: "Audience Map",
        desc: "Layered audiences, from lookalikes to cart abandoners, each with its own message.",
        visual: <AudienceMapPanel />,
      },
      {
        id: "funnel-plan",
        title: "Full-Funnel Plan",
        desc: "Awareness, consideration and conversion campaigns that work together instead of competing.",
        visual: <FunnelPlanPanel />,
      },
      {
        id: "creative-testing",
        title: "Creative Testing",
        desc: "Hooks, visuals and offers tested side by side, so budget flows to what actually converts.",
        visual: <CreativeTestPanel />,
      },
      {
        id: "weekly-report",
        title: "Weekly Report",
        desc: "Clear results every week, plus exactly what we'll scale, pause and test next.",
        visual: <WeeklyReportPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Audit to <GradientText>Scalable Growth</GradientText>
      </>
    ),
    description: "A test-and-learn system that improves your campaigns every single week.",
    steps: [
      { title: "Audit & Goals", desc: "We review your accounts, past results and competitors, then agree on targets.", output: "Account audit" },
      { title: "Strategy", desc: "Audiences, offers, budget split and funnel structure planned around your goals.", output: "Campaign plan" },
      { title: "Creative & Setup", desc: "Ad creative, copy, pixel and conversion tracking built and checked.", output: "Ads & tracking live" },
      { title: "Launch & Optimise", desc: "Campaigns go live and we test, tweak and reallocate budget every week.", output: "Optimised campaigns" },
      { title: "Report & Scale", desc: "Weekly reporting on ROI, then we scale what works and cut what doesn't.", output: "Weekly ROI report" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Ad Budget</GradientText>
      </>
    ),
    items: [
      { icon: Megaphone, title: "Creative and media under one roof", desc: "The team that designs your ads also runs them, so creative and targeting work together." },
      { icon: Activity, title: "Full-funnel tracking", desc: "Pixel, GA4 and conversion tracking set up properly from day one." },
      { icon: FlaskConical, title: "Relentless A/B testing", desc: "We test hooks, creatives and audiences every week to find what converts." },
      { icon: ChartColumn, title: "Transparent weekly reports", desc: "Clear reporting on spend, results and ROI, plus what we will do next." },
    ],
    tools: ["Meta Ads Manager", "Google Ads", "Google Analytics 4", "Looker Studio", "Hotjar"],
    highlight: { value: "Weekly", label: "Performance & ROI reporting", chips: ["Meta", "Google", "GA4", "Looker Studio"] },
  },
  packages: {
    title: (
      <>
        Ad Management Plans, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Monthly management plans for every stage of growth. Ad spend is paid directly to Meta or Google.",
    tiers: {
      basic: {
        ...PRICING.basic,
        tagline: "Start with one channel",
        features: ["One channel: Meta or Google", "Campaign setup & targeting", "Pixel / conversion tracking", "Weekly performance report"],
      },
      standard: {
        ...PRICING.standard,
        tagline: "Full-funnel growth",
        features: [
          "Meta + Google multi-channel funnels",
          "Audience retargeting",
          "Ad creative design & copy",
          "Weekly A/B testing",
          "Weekly performance & ROI report",
        ],
      },
      premium: {
        ...PRICING.premium,
        tagline: "Scale with confidence",
        features: [
          "Full-scale growth marketing",
          "Advanced audience segmentation",
          "Conversion rate optimisation",
          "Scaling & budget management",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Campaigns",
  faqs: [
    {
      q: "Is ad spend included in the price?",
      a: "No. Package prices cover strategy, setup, creative and management. Your ad budget is paid directly to Meta or Google, so you stay in full control of spend.",
    },
    {
      q: "Which platforms do you run ads on?",
      a: "Facebook and Instagram through Meta Ads, plus Google Search and Performance Max campaigns.",
    },
    {
      q: "How soon will I see results?",
      a: "Campaigns need a short learning phase while the platforms gather data. We optimise every week and show what's working in your report.",
    },
    {
      q: "Do I need a website to run ads?",
      a: "Not always. Lead forms and messaging campaigns work without one, but a fast landing page usually converts better. Our web team can build one for you.",
    },
    {
      q: "Will I own my ad accounts and data?",
      a: "We recommend running campaigns in your own ad accounts, so you keep full ownership of your data, audiences and history.",
    },
    {
      q: "What do the weekly reports include?",
      a: "Spend, results, cost per result and return on ad spend, plus the changes we made and what we'll test next.",
    },
  ],
  cta: {
    titleLead: "Ready to Make",
    titleHighlight: "Every Ad Count?",
    description: "Get data-driven Meta and Google campaigns with creative that converts and reporting you can actually understand.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const DigitalMarketingServicePage: React.FC = () => <ServiceLandingPage config={config} />;
