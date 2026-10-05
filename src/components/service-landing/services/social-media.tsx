"use client";

import React from "react";
import {
  Bookmark,
  CalendarCheck,
  Check,
  Heart,
  Layers,
  MessageCircle,
  MessagesSquare,
  Palette,
  Play,
  Quote,
  Smartphone,
  Star,
} from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SampleMark, Wordmark } from "@/components/page-kit/shared";
import { ChipDot, ChipIconBox, FloatingChip, Lines, MonoLabel, PhoneFrame, Ring, TILE_DARK } from "@/components/page-kit/primitives";
import type { ServiceConfig } from "../types";
import { SERVICE_PRICING } from "@/data/servicePricing";

const PRICING = SERVICE_PRICING["social-media"];

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

/* ---------- Feed tile (shared by hero + bento) ---------- */

const FeedTile: React.FC<{ i: number }> = ({ i }) => {
  const base = "relative aspect-square overflow-hidden rounded-md flex items-center justify-center";
  switch (i % 9) {
    case 0:
      return (
        <div className={`${base} bg-gradient-to-br from-[#FF8500] to-[#FFA133]`}>
          <SampleMark className="w-1/2 h-1/2" color="#FFFFFF" />
        </div>
      );
    case 1:
      return (
        <div className={`${base} bg-[#0F2260] p-[12%]`}>
          <Quote className="absolute top-[10%] left-[10%] w-1/4 h-1/4 text-[#FFA133]" />
          <Lines widths={["w-full", "w-4/5"]} className="w-full space-y-1 mt-[20%]" barClass="h-1 bg-white/40" />
        </div>
      );
    case 2:
      return (
        <div className={`${base} bg-[#2651B9]`}>
          <span className="w-1/2 h-1/2 rounded-full bg-[#FFA133]/90" />
        </div>
      );
    case 3:
      return (
        <div className={`${base} bg-[#F8FAFC] p-[14%] items-end`}>
          <span className="font-agency text-[clamp(8px,2.2vw,14px)] font-extrabold leading-none text-[#FF8500]">NEW</span>
        </div>
      );
    case 4:
      return (
        <div className={`${base} bg-gradient-to-br from-[#FFA133] to-[#FF8500]`}>
          <span className="font-agency text-[clamp(10px,3vw,20px)] font-extrabold text-white">%</span>
        </div>
      );
    case 5:
      return (
        <div className={`${base} bg-[#081330] border border-[#2651B9]/40`}>
          <Play className="w-1/3 h-1/3 text-white fill-white" />
        </div>
      );
    case 6:
      return (
        <div className={`${base} bg-[#3B82F6]`}>
          <Star className="w-2/5 h-2/5 text-white fill-white" />
        </div>
      );
    case 7:
      return (
        <div className={`${base} bg-gradient-to-tr from-[#0F2260] to-[#2651B9] p-[14%]`}>
          <Lines widths={["w-full", "w-3/5", "w-4/5"]} className="w-full space-y-1" barClass="h-1 bg-white/35" />
        </div>
      );
    default:
      return (
        <div className={`${base} bg-[#FFB866]`}>
          <SampleMark className="w-2/5 h-2/5" color="#081330" />
        </div>
      );
  }
};

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <PhoneFrame className="col-span-3 row-span-2">
        <div className="p-2.5 pt-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center ring-2 ring-[#FF8500]/40 ring-offset-2 ring-offset-[#081330]">
              <SampleMark className="w-4 h-4" color="#FFFFFF" />
            </span>
            <div className="flex-1">
              <Wordmark className="block text-[11px] text-white leading-none" />
              <Lines widths={["w-4/5"]} className="mt-1" barClass="h-1 bg-white/20" />
            </div>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {["bg-[#FF8500]", "bg-[#2651B9]", "bg-[#FFA133]", "bg-white/20"].map((c) => (
              <span key={c} className={`w-5 h-5 rounded-full ring-1 ring-white/20 ${c}`} />
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <FeedTile key={i} i={i} />
            ))}
          </div>
        </div>
      </PhoneFrame>

      <div className="col-span-3 aspect-square rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-4 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(255,133,0,0.5)]">
        <div className="flex items-center gap-1.5">
          <SampleMark className="w-4 h-4" color="#FFFFFF" />
          <Wordmark className="text-xs text-white" />
        </div>
        <span className="font-agency text-3xl sm:text-4xl font-extrabold text-white leading-[0.9]">
          New
          <br />
          Drop
        </span>
        <span className="self-start rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#FF8500]">Shop now</span>
      </div>

      <div className={`col-span-3 ${TILE_DARK} p-3.5 flex flex-col justify-between`}>
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex gap-2.5">
            <Heart className="w-4 h-4 text-[#FF5F57] fill-[#FF5F57]" />
            <MessageCircle className="w-4 h-4" />
          </div>
          <Bookmark className="w-4 h-4" />
        </div>
        <Lines widths={["w-full", "w-2/3"]} className="mt-3 space-y-1.5" barClass="h-1.5 bg-white/15" />
        <MonoLabel className="mt-3 text-slate-500">Caption & hashtags</MonoLabel>
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-4"
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="On-brand"
    />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <CalendarCheck className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Post scheduled"
      sub="Friday · 7:00 PM"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const FeedGridVisual = () => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center">
          <SampleMark className="w-3.5 h-3.5" color="#FFFFFF" />
        </span>
        <span className="text-xs font-semibold text-white">@yourbrand</span>
      </div>
      <MonoLabel>Grid preview</MonoLabel>
    </div>
    <div className="mt-3 grid flex-1 grid-cols-3 content-start gap-1.5 sm:gap-2 max-w-[340px] w-full mx-auto">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="transition-transform duration-500 group-hover:scale-[1.03]" style={{ transitionDelay: `${i * 25}ms` }}>
          <FeedTile i={(i + 3) % 9} />
        </div>
      ))}
    </div>
  </div>
);

const CoverVisual = () => (
  <div className="relative h-full">
    <div className="h-[62%] rounded-2xl bg-gradient-to-r from-[#0F2260] via-[#2651B9] to-[#FF8500] p-4 flex items-start justify-end">
      <div className="text-right">
        <Wordmark className="block text-lg text-white leading-none" />
        <span className="text-[10px] text-white/80">Designed to be remembered</span>
      </div>
    </div>
    <div className="absolute left-4 top-[42%] flex items-end gap-3">
      <span className="w-14 h-14 rounded-full border-4 border-[#0C1E4E] bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center">
        <SampleMark className="w-7 h-7" color="#FFFFFF" />
      </span>
      <div className="pb-1">
        <span className="block text-xs font-bold text-white">yourbrand</span>
        <Lines widths={["w-16"]} className="mt-1" barClass="h-1 bg-white/25" />
      </div>
    </div>
    <span className="absolute right-3 bottom-2 rounded-full bg-[#2651B9] px-3 py-1 text-[10px] font-bold text-white">Follow</span>
  </div>
);

const StoryVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="relative h-full max-h-[150px] aspect-[9/16] rounded-xl bg-gradient-to-b from-[#2651B9] to-[#0F2260] p-2 flex flex-col justify-between overflow-hidden transition-transform duration-500 group-hover:scale-105">
      <div className="flex gap-0.5">
        <span className="h-0.5 flex-1 rounded bg-white" />
        <span className="h-0.5 flex-1 rounded bg-white/40" />
        <span className="h-0.5 flex-1 rounded bg-white/40" />
      </div>
      <span className="font-agency text-base font-extrabold text-white text-center leading-none">
        New
        <br />
        In
      </span>
      <span className="rounded-full border border-white/40 px-2 py-0.5 text-[7px] text-white/80 text-center">Send message</span>
    </div>
  </div>
);

const CarouselVisual = () => (
  <div className="flex h-full flex-col items-center justify-center gap-3">
    <div className="relative w-[70%] max-w-[150px] aspect-[4/3]">
      <span className="absolute inset-0 translate-x-4 -translate-y-1 rotate-6 rounded-xl bg-[#2651B9]/60" />
      <span className="absolute inset-0 translate-x-2 rotate-3 rounded-xl bg-[#FFA133]/70" />
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-1">
        <span className="font-agency text-lg font-extrabold text-white">1/5</span>
      </span>
    </div>
    <div className="flex gap-1">
      <span className="w-4 h-1.5 rounded-full bg-[#FF8500]" />
      {[0, 1, 2, 3].map((d) => (
        <span key={d} className="w-1.5 h-1.5 rounded-full bg-white/25" />
      ))}
    </div>
  </div>
);

const AdCreativeVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="w-full max-w-[300px] rounded-xl border border-white/10 bg-[#081330] overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center">
          <SampleMark className="w-3 h-3" color="#FFFFFF" />
        </span>
        <div className="leading-tight">
          <span className="block text-[10px] font-semibold text-white">yourbrand</span>
          <span className="block text-[8px] text-slate-500">Sponsored</span>
        </div>
      </div>
      <div className="h-14 sm:h-16 bg-gradient-to-r from-[#FF8500] via-[#FFA133] to-[#FFB866] flex items-center justify-between px-4">
        <span className="font-agency text-xl font-extrabold text-white">Up to 30% off</span>
        <span className="w-9 h-9 rounded-full bg-white/30" />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <Lines widths={["w-24", "w-16"]} className="space-y-1" barClass="h-1 bg-white/25" />
        <span className="rounded-md bg-[#2651B9] px-2.5 py-1 text-[9px] font-bold text-white">Shop Now</span>
      </div>
    </div>
  </div>
);

const PageSetupVisual = () => (
  <div className="flex h-full items-center gap-5">
    <Ring value={100} size={84} stroke={7}>
      <span className="text-center leading-tight">
        <span className="block font-agency text-lg font-extrabold text-white">100%</span>
        <span className="block text-[8px] text-slate-400">complete</span>
      </span>
    </Ring>
    <ul className="flex-1 space-y-1.5">
      {["Profile & cover", "Bio & contact info", "Call-to-action button", "Pinned welcome post"].map((item) => (
        <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
          <span className="flex w-4 h-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* ---------- Showcase panels ---------- */

const PostTemplatesPanel = () => (
  <div className="grid grid-cols-2 gap-3">
    <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-4 flex flex-col justify-between">
      <MonoLabel className="text-white/80">Announcement</MonoLabel>
      <span className="font-agency text-2xl sm:text-4xl font-extrabold text-white leading-[0.9]">
        Big
        <br />
        News
      </span>
      <Wordmark className="text-xs text-white/90" />
    </div>
    <div className="relative aspect-square rounded-2xl bg-[#0F2260] border border-[#2651B9]/40 p-4 flex flex-col justify-between">
      <MonoLabel>Quote</MonoLabel>
      <div>
        <Quote className="w-6 h-6 text-[#FFA133]" />
        <Lines widths={["w-full", "w-11/12", "w-2/3"]} className="mt-2 space-y-1.5" barClass="h-1.5 bg-white/40" />
      </div>
      <Lines widths={["w-1/3"]} barClass="h-1 bg-[#FFA133]/70" />
    </div>
    <div className="relative aspect-square rounded-2xl bg-[#F8FAFC] p-4 flex flex-col justify-between">
      <MonoLabel>Product</MonoLabel>
      <span className="mx-auto w-1/2 aspect-square rounded-full bg-gradient-to-br from-[#2651B9] to-[#3B82F6] shadow-lg" />
      <div className="flex items-center justify-between">
        <Lines widths={["w-16"]} barClass="h-1.5 bg-slate-300" />
        <span className="rounded-full bg-[#FF8500] px-2 py-0.5 text-[10px] font-bold text-white">$29</span>
      </div>
    </div>
    <div className="relative aspect-square rounded-2xl bg-[#2651B9] p-4 flex flex-col justify-between">
      <MonoLabel className="text-white/70">Testimonial</MonoLabel>
      <div className="flex text-[#FFB866]">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} className="w-3.5 h-3.5 fill-current" />
        ))}
      </div>
      <Lines widths={["w-full", "w-4/5"]} className="space-y-1.5" barClass="h-1.5 bg-white/45" />
    </div>
  </div>
);

const StorySetPanel = () => (
  <div className="grid grid-cols-3 gap-3">
    {[
      { bg: "bg-gradient-to-b from-[#FF8500] to-[#FFA133]", title: "Sale", sub: "Today only" },
      { bg: "bg-gradient-to-b from-[#2651B9] to-[#0F2260]", title: "Poll", sub: "Vote now" },
      { bg: "bg-[#F8FAFC]", title: "Tips", sub: "Swipe" },
    ].map((s, i) => (
      <div key={s.title} className={`relative aspect-[9/16] rounded-2xl ${s.bg} p-2.5 flex flex-col justify-between overflow-hidden`}>
        <div className="flex gap-0.5">
          {[0, 1, 2].map((b) => (
            <span key={b} className={`h-0.5 flex-1 rounded ${b <= i ? (i === 2 ? "bg-slate-700" : "bg-white") : i === 2 ? "bg-slate-300" : "bg-white/40"}`} />
          ))}
        </div>
        <div className="text-center">
          <span className={`block font-agency text-xl sm:text-3xl font-extrabold leading-none ${i === 2 ? "text-[#081330]" : "text-white"}`}>
            {s.title}
          </span>
          <span className={`mt-1 block text-[9px] ${i === 2 ? "text-slate-500" : "text-white/80"}`}>{s.sub}</span>
        </div>
        {i === 1 ? (
          <div className="space-y-1">
            <span className="block rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-[#0F2260]">Option A · 64%</span>
            <span className="block rounded-full bg-white/30 px-2 py-0.5 text-[8px] font-bold text-white">Option B</span>
          </div>
        ) : (
          <span className={`mx-auto rounded-full px-2 py-0.5 text-[8px] font-bold ${i === 2 ? "bg-[#081330] text-white" : "bg-white text-[#FF8500]"}`}>
            {i === 2 ? "Learn more" : "Shop now"}
          </span>
        )}
      </div>
    ))}
  </div>
);

const CALENDAR_PLAN: Record<number, string> = {
  1: "bg-[#FF8500]",
  3: "bg-[#2651B9]",
  5: "bg-[#FFA133]",
  8: "bg-[#FF8500]",
  10: "bg-emerald-500",
  12: "bg-[#2651B9]",
  15: "bg-[#FF8500]",
  17: "bg-[#FFA133]",
  19: "bg-[#2651B9]",
  22: "bg-[#FF8500]",
  24: "bg-emerald-500",
  26: "bg-[#FFA133]",
  29: "bg-[#FF8500]",
};

const CalendarPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
    <div className="flex items-center justify-between">
      <span className="font-agency text-lg font-extrabold text-white">Content calendar</span>
      <MonoLabel>30 days</MonoLabel>
    </div>
    <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <span key={i} className="text-[9px] font-mono text-slate-500">
          {d}
        </span>
      ))}
      {Array.from({ length: 35 }).map((_, i) => {
        const day = i + 1;
        const plan = day <= 30 ? CALENDAR_PLAN[day] : undefined;
        return (
          <span
            key={i}
            className={`relative aspect-square rounded-md text-[9px] font-mono flex items-start justify-start p-1 ${
              day <= 30 ? "bg-white/[0.04] text-slate-400" : "bg-transparent"
            }`}
          >
            {day <= 30 ? day : ""}
            {plan && <span className={`absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${plan}`} />}
          </span>
        );
      })}
    </div>
    <div className="mt-3 flex flex-wrap gap-3">
      {[
        { c: "bg-[#FF8500]", l: "Post" },
        { c: "bg-[#2651B9]", l: "Reel" },
        { c: "bg-[#FFA133]", l: "Story" },
        { c: "bg-emerald-500", l: "Ad" },
      ].map((k) => (
        <span key={k.l} className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className={`w-2 h-2 rounded-full ${k.c}`} />
          {k.l}
        </span>
      ))}
    </div>
  </div>
);

const SizesPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <div className="flex items-end justify-around gap-3">
      {[
        { ratio: "aspect-square", w: "w-[22%]", label: "Feed", size: "1080×1080" },
        { ratio: "aspect-[4/5]", w: "w-[22%]", label: "Portrait", size: "1080×1350" },
        { ratio: "aspect-[9/16]", w: "w-[18%]", label: "Story / Reel", size: "1080×1920" },
      ].map((s, i) => (
        <div key={s.label} className={`${s.w} flex flex-col items-center gap-2`}>
          <div
            className={`w-full ${s.ratio} rounded-lg border-2 border-dashed ${
              i === 2 ? "border-[#FF8500] bg-[#FF8500]/10" : "border-[#2651B9]/60 bg-[#2651B9]/10"
            }`}
          />
          <span className="text-[10px] font-semibold text-white text-center">{s.label}</span>
          <span className="text-[9px] font-mono text-slate-500">{s.size}</span>
        </div>
      ))}
    </div>
    <div className="mt-5 flex flex-col items-center gap-2">
      <div className="w-3/4 aspect-[820/312] rounded-lg border-2 border-dashed border-[#FFA133]/60 bg-[#FFA133]/10 flex items-center justify-center">
        <span className="text-[10px] font-semibold text-white">Page cover</span>
      </div>
      <span className="text-[9px] font-mono text-slate-500">820×312 · Facebook · LinkedIn · YouTube banners</span>
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Social Media & Content Design",
  shortName: "Social Media",
  projectLabel: "a social media project",
  hero: {
    eyebrow: "Social Media & Content Design",
    title: (
      <>
        Scroll-Stopping Content That <GradientText>Grows Your Brand</GradientText>
      </>
    ),
    description:
      "Thumb-stopping posts, covers and campaign creatives that lift engagement, keep your feed on-brand and turn followers into customers.",
    primaryCta: "Plan My Content",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why content design matters",
    text: "Your feed is your storefront. Every post either earns attention or gets scrolled past. We design content that stops the scroll and starts conversations.",
    highlights: ["storefront.", "stops", "conversations."],
    pillars: [
      { title: "Attention", desc: "Designs that stop the scroll in a split second." },
      { title: "Consistency", desc: "Every post instantly recognisable as yours." },
      { title: "Conversion", desc: "Creative built to drive clicks, messages and sales." },
    ],
  },
  bento: {
    eyebrow: "Our Social Media Services",
    title: (
      <>
        Content Designed for <GradientText>Every Corner of Your Feed</GradientText>
      </>
    ),
    description: "Posts, covers, stories and ads designed as one consistent system, so your brand looks sharp wherever people find you.",
    tiles: [
      {
        title: "Social Media Post Design",
        desc: "On-brand posts for launches, offers, tips and testimonials that keep your grid looking intentional.",
        visual: <FeedGridVisual />,
      },
      { title: "Cover & Banner Design", desc: "Page covers and banners that make a strong first impression.", visual: <CoverVisual /> },
      { title: "Stories & Reels", desc: "Vertical templates made for tapping.", visual: <StoryVisual /> },
      { title: "Carousel Posts", desc: "Multi-slide posts that get saved.", visual: <CarouselVisual /> },
      { title: "Ad Creatives", desc: "High-CTR creatives designed for Meta feeds, stories and reels.", visual: <AdCreativeVisual /> },
      {
        title: "Facebook Page Setup & Optimization",
        desc: "A complete, professional page that is ready to convert visitors.",
        visual: <PageSetupVisual />,
      },
    ],
  },
  showcase: {
    eyebrow: "Inside Your Content Kit",
    title: (
      <>
        Your Content Kit, <GradientText>Ready to Post</GradientText>
      </>
    ),
    description: "Everything you need to show up consistently: templates, stories, a posting plan and files sized for every platform.",
    ctaLabel: "Get Your Content Kit",
    panels: [
      {
        id: "post-templates",
        title: "Post Templates",
        desc: "Announcement, quote, product and testimonial layouts that keep every post on-brand.",
        visual: <PostTemplatesPanel />,
      },
      {
        id: "story-set",
        title: "Story Set",
        desc: "Tappable story frames for offers, polls and tips, designed to keep viewers watching.",
        visual: <StorySetPanel />,
      },
      {
        id: "content-calendar",
        title: "Content Calendar",
        desc: "A month-long posting plan that balances posts, reels, stories and ads.",
        visual: <CalendarPanel />,
      },
      {
        id: "platform-sizes",
        title: "Platform-Ready Sizes",
        desc: "Every design exported in the right size for feeds, stories, reels and page covers.",
        visual: <SizesPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Audit to <GradientText>Ready-to-Post Content</GradientText>
      </>
    ),
    description: "A simple, collaborative workflow that keeps your feed fresh without eating up your week.",
    steps: [
      { title: "Audit", desc: "We review your current pages, audience and competitors to see what's working.", output: "Audit & goals" },
      { title: "Plan", desc: "A content mix and visual direction built around your goals and calendar.", output: "Content plan" },
      { title: "Design", desc: "Posts, stories and covers designed on-brand and sized for every platform.", output: "Post designs" },
      { title: "Refine", desc: "Feedback rounds until every post feels unmistakably yours.", output: "Final creatives" },
      { title: "Deliver", desc: "Ready-to-post files plus editable templates for future posts.", output: "Files & templates" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Feed</GradientText>
      </>
    ),
    items: [
      { icon: Smartphone, title: "Platform-native design", desc: "Every design sized and optimised for Facebook, Instagram, LinkedIn and more." },
      { icon: Palette, title: "On-brand every time", desc: "Your colours, fonts and tone applied consistently across the whole feed." },
      { icon: Layers, title: "Editable templates", desc: "Reusable Canva or Photoshop templates so you can keep posting between projects." },
      { icon: MessagesSquare, title: "Direct designer chat", desc: "Share ideas and feedback straight with the designer behind your content." },
    ],
    tools: ["Photoshop", "Illustrator", "Figma", "Canva Pro"],
    highlight: { value: "100%", label: "Editable, reusable source files", chips: ["PSD", "Canva", "PNG", "JPG"] },
  },
  packages: {
    title: (
      <>
        Social Media Packages, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Pick the scope that fits where your brand is today. No hidden fees, ever.",
    tiers: {
      basic: {
        ...PRICING.basic,
        tagline: "Kick-start your feed",
        features: ["5 promotional post or banner designs", "Sized for Facebook & Instagram", "High-res PNG & JPG exports", "2 rounds of revisions"],
      },
      standard: {
        ...PRICING.standard,
        tagline: "A month of on-brand content",
        features: [
          "15 posts + story templates per month",
          "Editable Canva or Photoshop templates",
          "Consistent brand colours & style",
          "All feed & story sizes",
          "Revisions until you're 100% satisfied",
        ],
      },
      premium: {
        ...PRICING.premium,
        tagline: "A full social presence",
        features: [
          "Complete 30-day content calendar",
          "Multi-channel ad creatives",
          "Profile & cover design",
          "Facebook page setup & optimization",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Social Content",
  faqs: [
    {
      q: "Which platforms do you design for?",
      a: "Facebook, Instagram, LinkedIn, TikTok and YouTube. Every design is exported in the right size for feeds, stories, covers and ads.",
    },
    {
      q: "Can I edit the designs myself later?",
      a: "Yes. Standard and Premium include editable Canva or Photoshop templates, so your team can create new posts in the same style.",
    },
    {
      q: "How many posts do I get?",
      a: "Basic includes 5 designs, Standard covers 15 posts plus story templates per month, and Premium includes a complete 30-day content calendar.",
    },
    {
      q: "Can you match my existing brand?",
      a: "Of course. We work with your logo, colours and fonts. If you don't have a brand identity yet, our branding team can create one first.",
    },
    {
      q: "Do you design ads as well as organic posts?",
      a: "Yes. We design ad creatives optimised for Meta feeds and stories. If you want us to run the campaigns too, see our Digital Marketing & Ads service.",
    },
    {
      q: "What files will I receive?",
      a: "High-resolution PNG and JPG files for every platform, plus editable source templates on Standard and Premium packages.",
    },
  ],
  cta: {
    titleLead: "Ready to Level Up",
    titleHighlight: "Your Social Feed?",
    description:
      "Get scroll-stopping posts, stories and ad creatives from the team that has helped 500+ brands stand out online.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const SocialMediaServicePage: React.FC = () => <ServiceLandingPage config={config} />;
