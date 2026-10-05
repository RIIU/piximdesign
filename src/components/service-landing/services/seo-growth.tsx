"use client";

import React from "react";
import { ChartColumn, Check, FileSearch, Gauge, MapPin, Search, Star, Target, TrendingUp, X } from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SampleMark } from "../shared";
import { ChipDot, ChipIconBox, FloatingChip, Lines, MonoLabel, Ring, Sparkline, TILE_DARK } from "../primitives";
import type { ServiceConfig } from "../types";

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

/* ---------- Shared pieces ---------- */

const Stars: React.FC<{ className?: string }> = ({ className = "w-2.5 h-2.5" }) => (
  <span className="flex text-[#F59E0B]" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((s) => (
      <Star key={s} className={`${className} fill-current`} />
    ))}
  </span>
);

const Serp: React.FC<{ query?: string; compact?: boolean; className?: string }> = ({
  query = "best organic honey online",
  compact = false,
  className = "",
}) => (
  <div className={`rounded-2xl bg-white p-3.5 ${className}`}>
    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 shadow-sm">
      <Search className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-[11px] text-slate-600 truncate">{query}</span>
    </div>
    <div className="mt-3 space-y-2.5">
      <div className="rounded-lg border-l-4 border-[#FF8500] bg-[#FFF7ED] p-2">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#081330] flex items-center justify-center">
            <SampleMark className="w-2.5 h-2.5" color="#FF8500" />
          </span>
          <span className="text-[9px] text-slate-600">yourbrand.com › honey</span>
        </div>
        <span className="mt-0.5 block text-[12px] font-semibold text-[#1A0DAB] leading-snug">Pure Organic Honey | Delivered Fresh</span>
        <span className="mt-0.5 flex items-center gap-1">
          <Stars />
          <span className="text-[8px] text-slate-500">Rating · Reviews · In stock</span>
        </span>
        <Lines widths={["w-full", "w-4/5"]} className="mt-1 space-y-1" barClass="h-1 bg-slate-300" />
      </div>
      {!compact &&
        [1, 2].map((i) => (
          <div key={i} className="px-2 opacity-45">
            <span className="text-[9px] text-slate-500">competitor-{i}.com</span>
            <Lines widths={["w-3/4", "w-full"]} className="mt-1 space-y-1" barClass="h-1 bg-slate-200" />
          </div>
        ))}
    </div>
  </div>
);

const KEYWORDS = [
  { k: "organic honey online", intent: "Buy", d: 35 },
  { k: "raw honey benefits", intent: "Learn", d: 55 },
  { k: "honey gift box", intent: "Buy", d: 25 },
  { k: "best honey brand", intent: "Compare", d: 70 },
];

const INTENT_STYLE: Record<string, string> = {
  Buy: "bg-[#FF8500]/15 text-[#FFA133] border-[#FF8500]/30",
  Learn: "bg-[#2651B9]/25 text-[#93C5FD] border-[#3B82F6]/30",
  Compare: "bg-white/10 text-slate-300 border-white/15",
};

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <Serp className="col-span-6" />

      <div className={`col-span-4 ${TILE_DARK} p-3.5`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">Organic traffic</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <Sparkline points={[8, 9, 9, 11, 12, 14, 15, 18, 20, 24, 27, 31]} className="mt-2 w-full h-14" />
        <div className="mt-1 flex justify-between text-[8px] font-mono text-slate-500">
          {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className={`col-span-2 ${TILE_DARK} p-3 flex flex-col items-center justify-center gap-2`}>
        <Ring value={94} size={60} stroke={5} color="#22C55E">
          <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
        </Ring>
        <span className="text-[10px] font-semibold text-slate-300 text-center leading-tight">Site health</span>
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-4"
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="Rich result live"
    />
    <FloatingChip
      className="left-2 sm:-left-6 top-[38%]"
      delayed
      icon={
        <ChipIconBox>
          <FileSearch className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Indexed in Google"
      sub="Sitemap submitted"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const TechnicalAuditVisual = () => (
  <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center">
    <div className="flex flex-col items-center gap-2 sm:w-[38%]">
      <Ring value={94} size={120} stroke={9} color="#22C55E">
        <span className="text-center leading-tight">
          <Check className="mx-auto w-7 h-7 text-emerald-400" strokeWidth={3} />
          <span className="block text-[10px] text-slate-400">Healthy</span>
        </span>
      </Ring>
      <MonoLabel>Site audit</MonoLabel>
    </div>
    <ul className="flex-1 space-y-2">
      {[
        { k: "HTTPS & security", ok: true },
        { k: "XML sitemap & indexing", ok: true },
        { k: "Core Web Vitals", ok: true },
        { k: "Broken links & redirects", ok: true },
        { k: "Mobile usability", ok: true },
        { k: "Duplicate meta tags", ok: false },
      ].map((row) => (
        <li key={row.k} className="flex items-center justify-between gap-2 rounded-lg bg-[#081330] border border-white/10 px-3 py-2">
          <span className="text-[11px] text-slate-300">{row.k}</span>
          {row.ok ? (
            <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
              <Check className="w-3 h-3" strokeWidth={3} /> Fixed
            </span>
          ) : (
            <span className="text-[9px] font-bold text-[#FFA133]">In progress</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const KeywordVisual = () => (
  <div className="flex h-full flex-col justify-center">
    <div className="grid grid-cols-[1fr_auto_70px] items-center gap-x-3 gap-y-2">
      <MonoLabel>Keyword</MonoLabel>
      <MonoLabel>Intent</MonoLabel>
      <MonoLabel>Difficulty</MonoLabel>
      {KEYWORDS.map((row) => (
        <React.Fragment key={row.k}>
          <span className="text-[11px] text-slate-200 truncate">{row.k}</span>
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${INTENT_STYLE[row.intent]}`}>{row.intent}</span>
          <span className="h-1.5 rounded-full bg-white/10">
            <span
              className={`block h-full rounded-full ${row.d > 60 ? "bg-[#FF5F57]" : row.d > 40 ? "bg-[#FFA133]" : "bg-emerald-400"}`}
              style={{ width: `${row.d}%` }}
            />
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const OnPageVisual = () => (
  <div className="flex h-full flex-col justify-center gap-2">
    <div className="rounded-lg bg-white p-2.5">
      <span className="block text-[8px] text-[#15803D]">yourbrand.com › honey</span>
      <span className="block text-[10px] font-semibold text-[#1A0DAB] leading-tight">Pure Organic Honey | Delivered Fresh</span>
      <Lines widths={["w-full", "w-3/4"]} className="mt-1 space-y-0.5" barClass="h-0.5 bg-slate-300" />
    </div>
    <div className="flex justify-between text-[9px] font-mono">
      <span className="text-emerald-400">Title 54/60</span>
      <span className="text-emerald-400">Meta 148/160</span>
    </div>
  </div>
);

const LocalVisual = () => (
  <div className="relative h-full min-h-[110px] overflow-hidden rounded-xl bg-[#0F2260]">
    <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 H200 M0 85 H200 M60 0 V120 M140 0 V120" stroke="rgba(148,163,184,0.18)" strokeWidth="6" />
      <path d="M0 110 L200 10" stroke="rgba(148,163,184,0.12)" strokeWidth="4" />
    </svg>
    <MapPin className="absolute left-1/2 top-[22%] -translate-x-1/2 w-7 h-7 text-[#FF8500] fill-[#FF8500]/30 drop-shadow" />
    <div className="absolute inset-x-2 bottom-2 rounded-lg bg-white px-2 py-1.5">
      <span className="block text-[10px] font-bold text-[#081330]">yourbrand</span>
      <span className="flex items-center gap-1">
        <Stars className="w-2 h-2" />
        <span className="text-[8px] font-semibold text-emerald-600">Open now</span>
      </span>
    </div>
  </div>
);

const SchemaVisual = () => (
  <div className="flex h-full flex-col justify-center gap-2.5 sm:flex-row sm:items-center">
    <div className="flex-1 rounded-lg bg-[#05070D] border border-white/10 p-2.5 font-mono text-[9px] leading-relaxed text-slate-300">
      <div>{"{"}</div>
      <div className="pl-3">
        <span className="text-[#93C5FD]">&quot;@type&quot;</span>: <span className="text-emerald-400">&quot;Product&quot;</span>,
      </div>
      <div className="pl-3">
        <span className="text-[#93C5FD]">&quot;name&quot;</span>: <span className="text-emerald-400">&quot;Organic Honey&quot;</span>,
      </div>
      <div className="pl-3">
        <span className="text-[#93C5FD]">&quot;aggregateRating&quot;</span>: <span className="text-[#FFA133]">{"{…}"}</span>
      </div>
      <div>{"}"}</div>
    </div>
    <div className="flex-1 rounded-lg bg-white p-2.5">
      <span className="block text-[10px] font-semibold text-[#1A0DAB] leading-tight">Pure Organic Honey</span>
      <span className="mt-0.5 flex items-center gap-1">
        <Stars className="w-2 h-2" />
        <span className="text-[8px] text-slate-500">Reviews · In stock</span>
      </span>
      <Lines widths={["w-full"]} className="mt-1" barClass="h-0.5 bg-slate-300" />
    </div>
  </div>
);

const GrowthVisual = () => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between">
      <MonoLabel>Search performance</MonoLabel>
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-[#FF8500]" /> Clicks
        </span>
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-[#60A5FA]" /> Impressions
        </span>
      </div>
    </div>
    <div className="relative mt-2 flex-1 min-h-[80px]">
      <Sparkline points={[20, 24, 23, 30, 34, 40, 44, 52, 58, 66]} className="absolute inset-x-0 top-0 w-full h-3/5" color="#60A5FA" fill={false} />
      <Sparkline points={[8, 9, 10, 12, 15, 17, 21, 24, 29, 35]} className="absolute inset-x-0 bottom-0 w-full h-3/5" />
    </div>
    <div className="mt-1.5 flex justify-between text-[8px] font-mono text-slate-500">
      {["M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
        <span key={m}>{m}</span>
      ))}
    </div>
  </div>
);

/* ---------- Showcase panels ---------- */

const AuditPanel = () => (
  <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-5">
    <Ring value={94} size={130} stroke={10} color="#22C55E">
      <span className="text-center leading-tight">
        <Check className="mx-auto w-8 h-8 text-emerald-400" strokeWidth={3} />
        <span className="block text-[10px] text-slate-400">Site health</span>
      </span>
    </Ring>
    <div className="w-full flex-1 space-y-3">
      {[
        { k: "Crawlability", w: 96 },
        { k: "Page speed", w: 90 },
        { k: "On-page SEO", w: 88 },
        { k: "Content quality", w: 80 },
        { k: "Internal links", w: 84 },
      ].map((c) => (
        <div key={c.k}>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>{c.k}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${c.w}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const KeywordMapPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-6">
    <div className="flex flex-col items-center">
      <span className="rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-4 py-2 text-xs sm:text-sm font-bold text-white">
        Pillar: Organic Honey
      </span>
      <span className="h-5 w-px bg-[#2651B9]/70" />
      <div className="relative grid w-full grid-cols-3 gap-2">
        <span className="absolute top-0 left-[16.6%] right-[16.6%] h-px bg-[#2651B9]/70" />
        {[
          { cluster: "Buy", kws: ["organic honey online", "honey gift box"] },
          { cluster: "Learn", kws: ["raw honey benefits", "honey vs sugar"] },
          { cluster: "Compare", kws: ["best honey brand", "raw vs regular"] },
        ].map((c) => (
          <div key={c.cluster} className="flex flex-col items-center">
            <span className="h-4 w-px bg-[#2651B9]/70" />
            <span className={`rounded-lg border px-3 py-1 text-[11px] font-semibold ${INTENT_STYLE[c.cluster]}`}>{c.cluster}</span>
            <div className="mt-2 flex w-full flex-col gap-1.5">
              {c.kws.map((k) => (
                <span key={k} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-center text-[9px] sm:text-[10px] text-slate-300">
                  {k}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BeforeAfterPanel = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
      <div className="mb-2 flex items-center justify-between">
        <MonoLabel>Before</MonoLabel>
        <span className="flex w-5 h-5 items-center justify-center rounded-full bg-[#FF5F57]/20 text-[#FF5F57]">
          <X className="w-3 h-3" strokeWidth={3} />
        </span>
      </div>
      <div className="rounded-lg bg-white p-3 opacity-70">
        <span className="block text-[9px] text-[#15803D]">yourbrand.com</span>
        <span className="block text-sm font-semibold text-[#1A0DAB]">Home</span>
        <span className="block text-[10px] text-slate-500">Welcome to our website. We sell many products…</span>
      </div>
    </div>
    <div className="rounded-2xl bg-[#081330] border border-[#FF8500]/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <MonoLabel className="text-[#FFA133]">After</MonoLabel>
        <span className="flex w-5 h-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
      </div>
      <div className="rounded-lg bg-white p-3">
        <span className="block text-[9px] text-[#15803D]">yourbrand.com › organic-honey</span>
        <span className="block text-sm font-semibold text-[#1A0DAB] leading-snug">Pure Organic Honey | Delivered Fresh</span>
        <span className="mt-0.5 flex items-center gap-1">
          <Stars className="w-2.5 h-2.5" />
        </span>
        <span className="block text-[10px] text-slate-600">Raw, unfiltered honey from local farms. Free delivery on orders over $30.</span>
      </div>
    </div>
  </div>
);

const MonthlyReportPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <div className="flex items-center justify-between">
      <span className="font-agency text-lg font-extrabold text-white">Monthly SEO report</span>
      <TrendingUp className="w-5 h-5 text-emerald-400" />
    </div>
    <Sparkline points={[10, 12, 12, 15, 17, 16, 20, 24, 27, 30, 35, 40]} className="mt-3 w-full h-20" />
    <div className="mt-4 divide-y divide-white/5">
      {["/organic-honey", "/honey-gift-box", "/blog/raw-honey-benefits"].map((page) => (
        <div key={page} className="flex items-center justify-between py-2">
          <span className="text-xs font-mono text-slate-300 truncate">{page}</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
            <TrendingUp className="w-3 h-3" /> Rising
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "SEO & Organic Growth",
  shortName: "SEO",
  projectLabel: "an SEO project",
  hero: {
    eyebrow: "SEO & Organic Growth",
    title: (
      <>
        Get Found by Customers <GradientText>Already Searching for You</GradientText>
      </>
    ),
    description:
      "Technical SEO, keyword strategy and on-page optimisation that lift your rankings and bring steady, high-intent traffic without paying for every click.",
    primaryCta: "Grow My Traffic",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why SEO matters",
    text: "If you are not on page one, you are almost invisible. We make sure the people already searching for what you offer find you first and choose you.",
    highlights: ["invisible.", "first", "choose"],
    pillars: [
      { title: "Visibility", desc: "Rank for the searches that matter to your business." },
      { title: "Relevance", desc: "Pages that match exactly what searchers want." },
      { title: "Growth", desc: "Traffic that keeps compounding, even when ads stop." },
    ],
  },
  bento: {
    eyebrow: "Our SEO Services",
    title: (
      <>
        Everything It Takes to <GradientText>Rank and Stay There</GradientText>
      </>
    ),
    description: "Technical fixes, smart keywords, local visibility and clear reporting, all handled by one team.",
    tiles: [
      {
        title: "Technical SEO",
        desc: "Speed, indexing, crawlability and site health fixed at the foundation, so every page can rank.",
        visual: <TechnicalAuditVisual />,
      },
      { title: "Keyword Research", desc: "High-intent keywords mapped to the pages that should rank for them.", visual: <KeywordVisual /> },
      { title: "On-Page SEO", desc: "Titles, meta and headings tuned.", visual: <OnPageVisual /> },
      { title: "Local SEO", desc: "Show up in nearby map results.", visual: <LocalVisual /> },
      { title: "Schema & Rich Results", desc: "Structured data that earns stars, prices and FAQs in search results.", visual: <SchemaVisual /> },
      { title: "Organic Growth Reporting", desc: "Monthly reports on rankings, clicks and the pages driving growth.", visual: <GrowthVisual /> },
    ],
  },
  showcase: {
    eyebrow: "Inside Your SEO Roadmap",
    title: (
      <>
        A Clear Plan to <GradientText>Page One</GradientText>
      </>
    ),
    description: "See exactly what we fix, which keywords we target and how your traffic grows, month after month.",
    ctaLabel: "Get My SEO Audit",
    panels: [
      {
        id: "site-audit",
        title: "Site Audit",
        desc: "A full technical health check covering crawlability, speed, on-page issues, content and links.",
        visual: <AuditPanel />,
      },
      {
        id: "keyword-map",
        title: "Keyword Map",
        desc: "Pillar pages and keyword clusters organised by search intent, so every page has a clear job.",
        visual: <KeywordMapPanel />,
      },
      {
        id: "on-page",
        title: "On-Page Optimisation",
        desc: "Titles, descriptions and content rewritten to earn clicks as well as rankings.",
        visual: <BeforeAfterPanel />,
      },
      {
        id: "monthly-report",
        title: "Monthly Report",
        desc: "Traffic, rankings and your fastest-rising pages, explained in plain language.",
        visual: <MonthlyReportPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Audit to <GradientText>Compounding Growth</GradientText>
      </>
    ),
    description: "A proven roadmap that fixes the foundations first, then builds rankings that last.",
    steps: [
      { title: "Audit", desc: "A complete technical and content audit of your site and competitors.", output: "SEO audit" },
      { title: "Keyword Strategy", desc: "High-intent keywords grouped into clusters and mapped to pages.", output: "Keyword map" },
      { title: "On-Page & Technical", desc: "Fixes to speed, indexing, titles, meta tags, headings and schema.", output: "Optimised pages" },
      { title: "Content & Local", desc: "Content improvements plus Google Business Profile optimisation.", output: "Local listings & content plan" },
      { title: "Report & Grow", desc: "Monthly reporting and a roadmap for the next round of growth.", output: "Monthly growth report" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Rankings</GradientText>
      </>
    ),
    items: [
      { icon: Gauge, title: "Technical depth", desc: "Core Web Vitals, indexing and schema handled properly, not just keywords." },
      { icon: Target, title: "Intent-led keywords", desc: "We target searches from people ready to buy, not just vanity traffic." },
      { icon: MapPin, title: "Local SEO ready", desc: "Google Business Profile and local signals optimised so nearby customers find you." },
      { icon: ChartColumn, title: "Transparent monthly reports", desc: "Rankings, traffic and next steps explained in plain language." },
    ],
    tools: ["Google Search Console", "Ahrefs", "Semrush", "Lighthouse", "Schema.org"],
    highlight: { value: "Monthly", label: "Ranking & traffic reports", chips: ["Technical", "On-page", "Local", "Content"] },
  },
  packages: {
    title: (
      <>
        SEO Packages, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Start with a one-time setup or grow with an ongoing retainer. No hidden fees, ever.",
    tiers: {
      basic: {
        usd: "$120 - $200",
        bdt: "৳15,000 - ৳25,000",
        desc: "One-time technical & on-page SEO setup",
        tagline: "Fix the foundations",
        features: ["Full technical SEO audit", "On-page title, meta & heading fixes", "Core Web Vitals review", "Search Console setup & indexing"],
      },
      standard: {
        usd: "$250 - $450",
        bdt: "৳30,000 - ৳55,000",
        desc: "Full on-page + local SEO + ranking roadmap",
        tagline: "Rank locally & beyond",
        features: [
          "Everything in Basic",
          "Keyword research & mapping",
          "Local SEO & Google Business Profile",
          "Schema markup (JSON-LD)",
          "Competitor gap analysis",
          "Ranking roadmap",
        ],
      },
      premium: {
        usd: "$500+/mo",
        bdt: "৳65,000+/mo",
        desc: "Complete ongoing SEO retainer & organic lead gen",
        tagline: "Compounding growth",
        features: [
          "Ongoing monthly SEO retainer",
          "Content & on-page optimisation",
          "Organic lead generation focus",
          "Monthly performance report",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our SEO Work",
  faqs: [
    {
      q: "How long does SEO take to work?",
      a: "SEO compounds over time. Technical fixes can help quickly, while rankings for competitive keywords usually build over several months. We report progress every month.",
    },
    {
      q: "Can you guarantee #1 rankings?",
      a: "No honest agency can guarantee rankings, because search engines control them. We commit to best-practice work and transparent monthly reporting on what's improving.",
    },
    {
      q: "Do you work on existing websites?",
      a: "Yes. We optimise existing sites built on WordPress, Next.js and most other platforms, without needing a rebuild.",
    },
    {
      q: "What is local SEO?",
      a: "Optimising your Google Business Profile and local signals so you appear in map results when nearby customers search for your services.",
    },
    {
      q: "What do you need from me?",
      a: "Access to your website, Google Search Console and Google Analytics, plus a quick call about your goals and best-selling services.",
    },
    {
      q: "What's included in the monthly report?",
      a: "Keyword rankings, organic traffic, top pages, technical health and the work planned for next month.",
    },
  ],
  cta: {
    titleLead: "Ready to Climb",
    titleHighlight: "the Rankings?",
    description: "Get found by customers already searching for what you offer, with SEO that keeps paying off month after month.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const SeoGrowthServicePage: React.FC = () => <ServiceLandingPage config={config} />;
