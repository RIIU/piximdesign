"use client";

import React from "react";
import { ArrowRight, Check, MousePointer2, MousePointerClick, Rocket, ShieldCheck, ShoppingCart, SquarePen, Zap } from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SampleMark, Wordmark } from "../shared";
import { BrowserFrame, ChipIconBox, FloatingChip, Lines, MonoLabel, PhoneFrame, Ring, TILE_DARK } from "../primitives";
import type { ServiceConfig } from "../types";

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

/* ---------- Mini website preview (shared) ---------- */

const SitePreview: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className={`${compact ? "p-2 space-y-2" : "p-3 space-y-3"}`}>
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <SampleMark className="w-3.5 h-3.5" color="#FF8500" />
        <Wordmark className="text-[9px] text-white" />
      </div>
      {!compact && (
        <div className="hidden sm:flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-6 rounded bg-white/25" />
          ))}
        </div>
      )}
      <span className="rounded-full bg-[#FF8500] px-2 py-0.5 text-[7px] font-bold text-white">Get started</span>
    </div>
    <div className={`grid gap-3 items-center ${compact ? "grid-cols-1" : "grid-cols-5"}`}>
      <div className={compact ? "" : "col-span-3"}>
        <div className="h-2.5 w-11/12 rounded bg-white/85" />
        <div className="mt-1.5 h-2.5 w-3/4 rounded bg-white/85" />
        <Lines widths={["w-full", "w-5/6"]} className="mt-2 space-y-1" barClass="h-1 bg-white/25" />
        <div className="mt-2.5 flex gap-1.5">
          <span className="h-3.5 w-12 rounded-full bg-[#FF8500]" />
          <span className="h-3.5 w-10 rounded-full border border-white/30" />
        </div>
      </div>
      <div className={`${compact ? "aspect-[4/3]" : "col-span-2 aspect-square"} rounded-lg bg-gradient-to-br from-[#2651B9] to-[#FF8500]/80`} />
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-md bg-white/[0.06] p-1.5">
          <span className="block w-3 h-3 rounded bg-[#FF8500]/70" />
          <Lines widths={["w-full", "w-2/3"]} className="mt-1 space-y-0.5" barClass="h-0.5 bg-white/25" />
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <BrowserFrame className="col-span-4 self-center">
        <SitePreview />
      </BrowserFrame>
      <PhoneFrame className="col-span-2">
        <div className="pt-3">
          <SitePreview compact />
        </div>
      </PhoneFrame>

      <div className={`col-span-3 ${TILE_DARK} p-3.5 flex items-center gap-3`}>
        <Ring value={100} size={58} stroke={5} color="#22C55E">
          <span className="font-agency text-lg font-extrabold text-white">100</span>
        </Ring>
        <div>
          <span className="block text-xs font-semibold text-white">Performance</span>
          <span className="block text-[10px] text-slate-400">Lighthouse target</span>
        </div>
      </div>

      <div className={`col-span-3 ${TILE_DARK} p-3.5`}>
        <MonoLabel>Built with</MonoLabel>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Next.js", "React", "WordPress", "Tailwind"].map((t) => (
            <span key={t} className="rounded-md border border-[#2651B9]/40 bg-[#081330] px-2 py-0.5 text-[10px] text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>

    <FloatingChip className="right-3 -top-4" icon={<Zap className="w-3.5 h-3.5 text-[#FFA133] fill-[#FFA133]" />} title="Sub-second load" />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <Rocket className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Deployed to production"
      sub="Mobile-first · SEO-ready"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const BusinessSiteVisual = () => (
  <div className="relative h-full">
    <div className="mb-2 flex gap-1.5">
      {["Home", "About", "Services", "Contact"].map((p, i) => (
        <span
          key={p}
          className={`rounded-full px-2.5 py-0.5 text-[10px] ${i === 0 ? "bg-[#FF8500] text-white font-semibold" : "border border-white/15 text-slate-400"}`}
        >
          {p}
        </span>
      ))}
    </div>
    <div className="relative">
      <div className="absolute inset-x-6 -top-1 h-full rounded-xl border border-white/10 bg-[#0F2260]/70" />
      <BrowserFrame className="relative transition-transform duration-500 group-hover:-translate-y-1">
        <SitePreview />
      </BrowserFrame>
    </div>
  </div>
);

const LandingPageVisual = () => (
  <div className="flex h-full items-center gap-1.5 sm:gap-2">
    {[
      { l: "Hero", c: "bg-gradient-to-br from-[#2651B9] to-[#0F2260]" },
      { l: "Benefits", c: "bg-[#0F2260]" },
      { l: "Proof", c: "bg-[#0F2260]" },
      { l: "Book a call", c: "bg-gradient-to-br from-[#FF8500] to-[#FFA133]" },
    ].map((s, i, arr) => (
      <React.Fragment key={s.l}>
        <div className={`flex flex-1 aspect-[3/4] flex-col justify-between rounded-lg border border-white/10 p-2 ${s.c}`}>
          <Lines widths={["w-full", "w-2/3"]} className="space-y-1" barClass="h-1 bg-white/40" />
          <span className="text-[9px] font-semibold text-white leading-tight">{s.l}</span>
        </div>
        {i < arr.length - 1 && <ArrowRight className="w-3 h-3 shrink-0 text-slate-600" />}
      </React.Fragment>
    ))}
  </div>
);

const EcommerceVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="relative w-full max-w-[150px] rounded-xl border border-white/10 bg-[#081330] p-2.5 shadow-xl">
      <span className="absolute -top-2 -right-2 flex w-6 h-6 items-center justify-center rounded-full bg-[#FF8500] text-[10px] font-bold text-white">
        2
      </span>
      <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#FFA133] to-[#FF8500] flex items-center justify-center">
        <span className="w-8 h-8 rounded-full bg-white/40" />
      </div>
      <Lines widths={["w-4/5"]} className="mt-2" barClass="h-1.5 bg-white/40" />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs font-bold text-white">$29</span>
        <span className="flex items-center gap-1 rounded-md bg-[#2651B9] px-1.5 py-0.5 text-[8px] font-bold text-white">
          <ShoppingCart className="w-2.5 h-2.5" /> Add
        </span>
      </div>
    </div>
  </div>
);

const CmsVisual = () => (
  <div className="flex h-full flex-col justify-center gap-2">
    <div className="rounded-lg border border-white/10 bg-[#081330] px-2.5 py-1.5">
      <span className="block text-[8px] font-mono text-slate-500">Page title</span>
      <span className="block text-[11px] text-white">Summer Collection</span>
    </div>
    <div className="rounded-lg border border-white/10 bg-[#081330] p-2.5">
      <div className="mb-1.5 flex gap-1.5 text-[9px] font-bold text-slate-400">
        <span>B</span>
        <span className="italic">I</span>
        <span className="underline">U</span>
      </div>
      <Lines widths={["w-full", "w-4/5"]} className="space-y-1" barClass="h-1 bg-white/20" />
    </div>
    <span className="self-end rounded-md bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-3 py-1 text-[10px] font-bold text-white">Publish</span>
  </div>
);

const SpeedVisual = () => (
  <div className="flex h-full items-center gap-4 sm:gap-6">
    <Ring value={100} size={86} stroke={7} color="#22C55E">
      <span className="text-center leading-tight">
        <span className="block font-agency text-2xl font-extrabold text-white">100</span>
        <span className="block text-[8px] text-slate-400">Performance</span>
      </span>
    </Ring>
    <div className="flex-1 space-y-2">
      {[
        { k: "Largest Contentful Paint", v: "Good" },
        { k: "Layout Shift", v: "Good" },
        { k: "Interaction to Next Paint", v: "Good" },
      ].map((m) => (
        <div key={m.k} className="flex items-center justify-between gap-2 rounded-lg bg-[#081330] border border-white/10 px-2.5 py-1.5">
          <span className="text-[10px] text-slate-300 truncate">{m.k}</span>
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">{m.v}</span>
        </div>
      ))}
    </div>
  </div>
);

const InteractionVisual = () => (
  <div className="relative flex h-full items-center justify-center gap-4">
    <div className="w-[38%] max-w-[150px] rounded-xl border border-white/10 bg-[#081330] p-3">
      <span className="block w-6 h-6 rounded-lg bg-[#2651B9]/70" />
      <Lines widths={["w-full", "w-2/3"]} className="mt-2 space-y-1" barClass="h-1 bg-white/20" />
    </div>
    <div className="relative w-[38%] max-w-[150px] -translate-y-2 rounded-xl border border-[#FF8500]/60 bg-[#0F2260] p-3 shadow-[0_18px_35px_-12px_rgba(255,133,0,0.5)] transition-transform duration-500 group-hover:-translate-y-4">
      <span className="block w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF8500] to-[#FFA133]" />
      <Lines widths={["w-full", "w-2/3"]} className="mt-2 space-y-1" barClass="h-1 bg-white/35" />
      <MousePointer2 className="absolute -bottom-3 -right-2 w-5 h-5 text-white fill-white drop-shadow" />
    </div>
    <span className="absolute left-2 bottom-1 rounded-md border border-[#88CE02]/40 bg-[#88CE02]/10 px-2 py-0.5 text-[9px] font-mono text-[#88CE02]">
      ease: power3.out
    </span>
  </div>
);

/* ---------- Showcase panels ---------- */

const SitemapNode: React.FC<{ label: string; primary?: boolean }> = ({ label, primary = false }) => (
  <span
    className={`rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-semibold ${
      primary ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white" : "border border-[#2651B9]/50 bg-[#0F2260] text-slate-200"
    }`}
  >
    {label}
  </span>
);

const SitemapPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-6">
    <div className="flex flex-col items-center">
      <SitemapNode label="Home" primary />
      <span className="h-5 w-px bg-[#2651B9]/70" />
      <div className="relative grid w-full grid-cols-4">
        <span className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-[#2651B9]/70" />
        {["About", "Services", "Blog", "Contact"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className="h-4 w-px bg-[#2651B9]/70" />
            <SitemapNode label={label} />
            {label === "Services" && (
              <>
                <span className="h-3 w-px bg-[#2651B9]/70" />
                <div className="flex flex-col items-center gap-1.5">
                  {["Branding", "Web", "SEO"].map((s) => (
                    <span key={s} className="rounded-md border border-dashed border-[#FF8500]/50 px-2 py-0.5 text-[9px] text-[#FFA133]">
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="mt-6 grid grid-cols-3 gap-2">
      {["Wireframe · Home", "Wireframe · Services", "Wireframe · Contact"].map((w) => (
        <div key={w} className="rounded-lg border border-dashed border-white/15 p-2">
          <Lines widths={["w-1/2", "w-full", "w-4/5"]} className="space-y-1" barClass="h-1 bg-white/15" />
          <span className="mt-1.5 block h-6 rounded bg-white/[0.06]" />
          <span className="mt-1.5 block text-[8px] font-mono text-slate-500 truncate">{w}</span>
        </div>
      ))}
    </div>
  </div>
);

const ResponsivePanel = () => (
  <div className="flex items-end gap-2 sm:gap-3 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <div className="w-[58%]">
      <BrowserFrame>
        <SitePreview />
      </BrowserFrame>
      <MonoLabel className="mt-2 block text-center">Desktop</MonoLabel>
    </div>
    <div className="w-[25%]">
      <div className="overflow-hidden rounded-xl border-4 border-[#1B2A55] bg-[#081330]">
        <SitePreview compact />
      </div>
      <MonoLabel className="mt-2 block text-center">Tablet</MonoLabel>
    </div>
    <div className="w-[17%]">
      <PhoneFrame className="rounded-[16px] border-4">
        <div className="pt-3">
          <SitePreview compact />
        </div>
      </PhoneFrame>
      <MonoLabel className="mt-2 block text-center">Mobile</MonoLabel>
    </div>
  </div>
);

const DesignSystemPanel = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
      <MonoLabel>Colour tokens</MonoLabel>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {["#FF8500", "#FFA133", "#2651B9", "#0F2260", "#F8FAFC"].map((c) => (
          <span key={c} className="aspect-square rounded-lg border border-white/10" style={{ background: c }} />
        ))}
      </div>
      <MonoLabel className="mt-4 block">Type scale</MonoLabel>
      <div className="mt-2 space-y-1">
        <span className="block font-agency text-2xl font-extrabold text-white leading-none">Heading</span>
        <span className="block font-agency text-lg font-extrabold text-white leading-none">Subheading</span>
        <span className="block text-xs text-slate-300">Body copy for readable paragraphs.</span>
      </div>
    </div>
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 space-y-3">
      <MonoLabel>Components</MonoLabel>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-3 py-1.5 text-[11px] font-bold text-white">Primary</span>
        <span className="rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-bold text-white">Secondary</span>
      </div>
      <div className="rounded-lg border border-white/15 bg-[#0C1E4E] px-3 py-2 text-[11px] text-slate-400">you@company.com</div>
      <div className="rounded-xl border border-white/10 bg-[#0C1E4E] p-3">
        <span className="block w-6 h-6 rounded-lg bg-[#FF8500]/80" />
        <Lines widths={["w-2/3", "w-full"]} className="mt-2 space-y-1" barClass="h-1 bg-white/20" />
      </div>
    </div>
  </div>
);

const SpeedSeoPanel = () => (
  <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-5">
    <Ring value={100} size={120} stroke={9} color="#22C55E">
      <span className="text-center leading-tight">
        <span className="block font-agency text-4xl font-extrabold text-white">100</span>
        <span className="block text-[10px] text-slate-400">Performance</span>
      </span>
    </Ring>
    <ul className="flex-1 w-full space-y-2">
      {["Sub-second page loads", "Semantic HTML & meta tags", "JSON-LD schema markup", "XML sitemap & clean URLs", "Optimised images & fonts"].map((item) => (
        <li key={item} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
          <span className="flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Website Design & Development",
  shortName: "Website",
  projectLabel: "a website project",
  hero: {
    eyebrow: "Website Design & Development",
    title: (
      <>
        Websites That <GradientText>Win Customers</GradientText> While You Sleep
      </>
    ),
    description:
      "Fast, mobile-first websites designed to convert and built on Next.js, React and WordPress, with smooth animations and SEO baked in from day one.",
    primaryCta: "Build My Website",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why your website matters",
    text: "Your website works 24/7. It should load instantly, look credible on every screen and guide visitors to act, not just sit there looking pretty.",
    highlights: ["24/7.", "instantly,", "act,"],
    pillars: [
      { title: "Speed", desc: "Pages that load before visitors lose interest." },
      { title: "Clarity", desc: "Layouts that make your offer obvious." },
      { title: "Conversion", desc: "Every page designed to drive enquiries and sales." },
    ],
  },
  bento: {
    eyebrow: "Our Web Services",
    title: (
      <>
        Websites Built for <GradientText>Speed and Sales</GradientText>
      </>
    ),
    description: "From one-page launches to full web apps, we design and engineer everything in-house.",
    tiles: [
      {
        title: "Business Websites",
        desc: "Multi-page company websites that explain what you do and turn visitors into enquiries.",
        visual: <BusinessSiteVisual />,
      },
      { title: "Landing Pages", desc: "Focused pages built around one goal: getting the click.", visual: <LandingPageVisual /> },
      { title: "E-commerce", desc: "Stores that make buying easy.", visual: <EcommerceVisual /> },
      { title: "CMS & Easy Updates", desc: "Edit content without code.", visual: <CmsVisual /> },
      { title: "Speed & Core Web Vitals", desc: "Sub-second loads with a 100/100 Lighthouse performance target.", visual: <SpeedVisual /> },
      { title: "Animations & Interactions", desc: "Smooth GSAP micro-interactions that make your site feel premium.", visual: <InteractionVisual /> },
    ],
  },
  showcase: {
    eyebrow: "Inside Every Website",
    title: (
      <>
        Designed With Care, <GradientText>Engineered to Perform</GradientText>
      </>
    ),
    description: "Every build follows the same proven path: clear structure, responsive design, a reusable system and serious speed.",
    ctaLabel: "Plan My Website",
    panels: [
      {
        id: "sitemap",
        title: "Sitemap & Wireframes",
        desc: "A clear page structure and wireframes agreed before any visual design starts.",
        visual: <SitemapPanel />,
      },
      {
        id: "responsive",
        title: "Responsive Design",
        desc: "Layouts crafted for desktop, tablet and mobile, not just squeezed to fit.",
        visual: <ResponsivePanel />,
      },
      {
        id: "design-system",
        title: "Design System",
        desc: "Reusable colours, type and components that keep every page consistent as you grow.",
        visual: <DesignSystemPanel />,
      },
      {
        id: "speed-seo",
        title: "Speed & Technical SEO",
        desc: "Performance and search basics built into the code from the very first commit.",
        visual: <SpeedSeoPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Idea to <GradientText>Live Website</GradientText>
      </>
    ),
    description: "Structured milestones so you know exactly where your project stands every week.",
    steps: [
      { title: "Discovery", desc: "Goals, audience, competitors and the actions you want visitors to take.", output: "Project brief" },
      { title: "Sitemap & Wireframes", desc: "Page structure and layouts planned for clarity and conversion.", output: "Sitemap & wireframes" },
      { title: "UI Design", desc: "High-fidelity designs for desktop and mobile, refined with your feedback.", output: "Hi-fi UI designs" },
      { title: "Development", desc: "A fast, responsive build with CMS, animations and on-page SEO.", output: "Responsive build + CMS" },
      { title: "Launch & Support", desc: "Testing, deployment and a 30-day warranty after you go live.", output: "Live site + 30-day warranty" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Website</GradientText>
      </>
    ),
    items: [
      { icon: MousePointerClick, title: "Built to convert", desc: "Clear structure and strong calls to action on every page." },
      { icon: Zap, title: "Blazing fast", desc: "Sub-second load times with a 100/100 Lighthouse performance target." },
      { icon: SquarePen, title: "Easy to update", desc: "A friendly CMS so your team can edit pages without touching code." },
      { icon: ShieldCheck, title: "30-day post-launch warranty", desc: "Fixes, tweaks and deployment help after your site goes live." },
    ],
    tools: ["Next.js 15", "React 19", "WordPress", "Tailwind CSS", "TypeScript", "GSAP Motion"],
    highlight: { value: "100", label: "Lighthouse performance target", chips: ["Next.js", "React", "WordPress", "CMS"] },
  },
  packages: {
    title: (
      <>
        Website Packages, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Pick the scope that fits your business today. No hidden fees, ever.",
    tiers: {
      basic: {
        usd: "$180 - $350",
        bdt: "৳22,000 - ৳42,000",
        desc: "High-converting modern landing page",
        tagline: "Launch fast",
        features: ["High-converting landing page", "Mobile-first responsive design", "Contact or lead form", "Basic on-page SEO", "2 rounds of revisions"],
      },
      standard: {
        usd: "$450 - $800",
        bdt: "৳55,000 - ৳98,000",
        desc: "Full multi-page corporate website + CMS",
        tagline: "Your complete website",
        features: [
          "Multi-page corporate website",
          "CMS for easy updates",
          "Smooth GSAP animations",
          "On-page SEO setup",
          "Revisions until you're 100% satisfied",
          "30-day post-launch warranty",
        ],
      },
      premium: {
        usd: "$1,200+",
        bdt: "৳145,000+",
        desc: "Custom web app / SaaS portal with dynamic database",
        tagline: "Custom web apps",
        features: [
          "Custom web app or SaaS portal",
          "Dynamic database & user accounts",
          "Next.js & React engineering",
          "Performance & speed optimisation",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Websites",
  faqs: [
    {
      q: "Which platform will my website be built on?",
      a: "We build on Next.js and React for speed and flexibility, or WordPress when you want a familiar CMS. We'll recommend the best fit for your goals.",
    },
    {
      q: "Can I update the content myself?",
      a: "Yes. Standard and Premium sites include a CMS, so you can edit text, images and pages without writing code.",
    },
    {
      q: "Will my website work on mobile?",
      a: "Every site is designed mobile-first and tested across phones, tablets and desktops.",
    },
    {
      q: "How long does a website take?",
      a: "Landing pages are quicker, while full custom web platforms typically take 2 to 3 weeks, managed with weekly milestones.",
    },
    {
      q: "Do you help with hosting and launch?",
      a: "Yes. Deployment is part of every launch, and you get a 30-day post-launch warranty for fixes and adjustments.",
    },
    {
      q: "Is SEO included?",
      a: "Technical SEO basics are built in: fast loading, semantic HTML and meta tags. For ongoing rankings, pair it with our SEO & Organic Growth service.",
    },
  ],
  cta: {
    titleLead: "Ready for a Website That",
    titleHighlight: "Works as Hard as You?",
    description: "Get a fast, beautiful website built to turn visitors into customers, with a 30-day warranty after launch.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const WebDesignServicePage: React.FC = () => <ServiceLandingPage config={config} />;
