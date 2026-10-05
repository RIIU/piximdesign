"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clapperboard,
  Heart,
  MessageCircle,
  Music,
  Play,
  Smartphone,
  Sparkles,
  User,
} from "lucide-react";
import { ServiceLandingPage } from "../ServiceLandingPage";
import { GradientText, SampleMark, Wordmark } from "@/components/page-kit/shared";
import { ChipIconBox, FloatingChip, Lines, MonoLabel, TILE_DARK } from "@/components/page-kit/primitives";
import type { ServiceConfig } from "../types";
import { SERVICE_PRICING } from "@/data/servicePricing";

const PRICING = SERVICE_PRICING["motion-video"];

const GROW_VIDEO = "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4";
const GROW_POSTER = "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp";

const WAVE = [30, 55, 40, 70, 90, 60, 45, 80, 65, 35, 50, 75, 95, 70, 40, 60, 85, 55, 30, 45, 65, 80, 50, 35, 60, 75, 45, 30];

/* ---------- Shared pieces ---------- */

const Player: React.FC<{ children?: React.ReactNode; time?: string; progress?: number; className?: string }> = ({
  children,
  time = "00:12 / 00:30",
  progress = 40,
  className = "",
}) => (
  <div
    className={`relative aspect-video overflow-hidden rounded-2xl border border-[#2651B9]/35 bg-gradient-to-br from-[#0F2260] via-[#081330] to-[#1B2A55] ${className}`}
  >
    <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2.5">
      <div className="h-1 rounded-full bg-white/20">
        <div className="h-full rounded-full bg-[#FF8500]" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-white/80">
        <span className="flex items-center gap-1.5">
          <Play className="w-3 h-3 fill-white" />
          {time}
        </span>
        <span>4K</span>
      </div>
    </div>
  </div>
);

const Waveform: React.FC<{ className?: string; mirrored?: boolean; bars?: number; thin?: boolean }> = ({
  className = "h-12",
  mirrored = false,
  bars = WAVE.length,
  thin = false,
}) => (
  <div className={`flex items-center ${thin ? "justify-between" : "gap-[3px]"} ${className}`} aria-hidden="true">
    {WAVE.slice(0, bars).map((h, i) => (
      <span
        key={i}
        className={`${thin ? "w-[2px]" : "flex-1"} rounded-full ${i < bars * 0.45 ? "bg-[#FF8500]" : "bg-[#60A5FA]/60"}`}
        style={{ height: mirrored ? `${h}%` : `${Math.max(h * 0.9, 12)}%` }}
      />
    ))}
  </div>
);

const TRACKS: { name: string; clips?: { l: number; w: number; c: string }[]; wave?: boolean }[] = [
  { name: "V2", clips: [{ l: 8, w: 22, c: "bg-[#2651B9]" }, { l: 52, w: 30, c: "bg-[#3B82F6]" }] },
  { name: "V1", clips: [{ l: 0, w: 35, c: "bg-[#FF8500]" }, { l: 37, w: 28, c: "bg-[#FFA133]" }, { l: 67, w: 33, c: "bg-[#FF8500]" }] },
  { name: "A1", wave: true },
];

const Timeline: React.FC<{ tall?: boolean }> = ({ tall = false }) => (
  <div className="relative">
    {tall && (
      <div className="mb-2 ml-8 flex justify-between text-[9px] font-mono text-slate-500">
        {["00:00", "00:10", "00:20", "00:30"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    )}
    <div className="space-y-1.5">
      {TRACKS.map((track) => (
        <div key={track.name} className="flex items-center gap-2">
          <span className="w-6 shrink-0 text-[9px] font-mono text-slate-500">{track.name}</span>
          <div className={`relative flex-1 rounded-md bg-white/[0.05] ${tall ? "h-7" : "h-5"}`}>
            {track.clips?.map((clip, i) => (
              <span
                key={i}
                className={`absolute top-0.5 bottom-0.5 rounded ${clip.c}`}
                style={{ left: `${clip.l}%`, width: `${clip.w}%` }}
              />
            ))}
            {track.wave && <Waveform className="absolute inset-x-1.5 inset-y-0.5" mirrored thin />}
          </div>
        </div>
      ))}
    </div>
    {/* Playhead */}
    <span className="pointer-events-none absolute bottom-0 top-0 left-[calc(2rem_+_56%)] w-px bg-white">
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white" />
    </span>
  </div>
);

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative">
    <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
      <Player className="col-span-4">
        <div className="flex flex-col items-center gap-2">
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-[0_0_40px_rgba(255,133,0,0.55)]">
            <SampleMark className="w-8 h-8 sm:w-9 sm:h-9" color="#FFFFFF" />
          </span>
          <Wordmark className="text-base sm:text-lg text-white" />
        </div>
      </Player>

      <div className="col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FF8500] to-[#FFA133] p-2.5 flex flex-col justify-between">
        <div className="flex gap-0.5">
          <span className="h-0.5 flex-1 rounded bg-white" />
          <span className="h-0.5 flex-1 rounded bg-white/40" />
        </div>
        <span className="mx-auto flex w-9 h-9 items-center justify-center rounded-full bg-white/25">
          <Play className="w-4 h-4 text-white fill-white" />
        </span>
        <div className="flex items-end justify-between">
          <Lines widths={["w-12", "w-8"]} className="space-y-1" barClass="h-1 bg-white/70" />
          <Heart className="w-3.5 h-3.5 text-white fill-white" />
        </div>
      </div>

      <div className={`col-span-6 ${TILE_DARK} p-3.5 sm:p-4`}>
        <div className="mb-2.5 flex items-center justify-between">
          <MonoLabel>Edit timeline</MonoLabel>
          <MonoLabel className="text-[#FFA133]">brand-intro.prproj</MonoLabel>
        </div>
        <Timeline />
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-4"
      icon={<span className="w-2 h-2 rounded-full bg-[#FF5F57] animate-pulse" />}
      title="4K · 60fps"
    />
    <FloatingChip
      className="right-2 sm:-right-4 -bottom-5"
      delayed
      icon={
        <ChipIconBox>
          <Music className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Sound design added"
      sub="Licensed music · mixed"
    />
  </div>
);

/* ---------- Bento visuals ---------- */

const MotionPathVisual = () => {
  const ghosts = [
    [30, 178, 0.12],
    [86, 160, 0.2],
    [130, 96, 0.3],
    [180, 62, 0.42],
    [236, 96, 0.55],
  ];
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 12 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={14 + c * 27} cy={14 + r * 28} r={1} fill="rgba(148,163,184,0.25)" />
          ))
        )}
        <path d="M30 178 C 90 178, 110 40, 180 62 S 270 150, 290 40" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeDasharray="4 5" fill="none" />
        {ghosts.map(([x, y, o]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={11} fill="#FF8500" opacity={o} />
        ))}
        <circle cx={290} cy={40} r={15} fill="#FF8500" />
        <circle cx={290} cy={40} r={22} fill="none" stroke="rgba(255,133,0,0.4)" />
        <g>
          <line x1={24} y1={206} x2={296} y2={206} stroke="rgba(255,255,255,0.15)" />
          {[30, 130, 180, 236, 290].map((x) => (
            <rect key={x} x={x - 4} y={202} width={8} height={8} transform={`rotate(45 ${x} 206)`} fill={x === 290 ? "#FF8500" : "#60A5FA"} />
          ))}
        </g>
      </svg>
      <div className="absolute right-2 top-2 rounded-xl border border-white/10 bg-[#081330]/85 p-2.5">
        <MonoLabel>Ease out</MonoLabel>
        <svg viewBox="0 0 60 36" className="mt-1 w-16 h-10" aria-hidden="true">
          <path d="M2 34 C 20 4, 36 2, 58 2" stroke="#FFA133" strokeWidth={2} fill="none" strokeLinecap="round" />
          <line x1="2" y1="34" x2="58" y2="34" stroke="rgba(255,255,255,0.15)" />
        </svg>
      </div>
    </div>
  );
};

const LogoRevealVisual = () => (
  <div className="flex h-full items-center gap-2 sm:gap-3">
    {[
      { t: "0.0s", content: <span className="w-2 h-2 rounded-full bg-[#FF8500]" /> },
      { t: "0.4s", content: <SampleMark className="w-6 h-6 opacity-50 scale-75" color="#FF8500" /> },
      {
        t: "0.8s",
        content: (
          <span className="rounded-xl shadow-[0_0_30px_rgba(255,133,0,0.6)]">
            <SampleMark className="w-9 h-9" color="#FF8500" />
          </span>
        ),
      },
      {
        t: "1.2s",
        content: (
          <span className="flex flex-col items-center gap-1">
            <SampleMark className="w-7 h-7" color="#FF8500" />
            <Wordmark className="text-[10px] text-white" />
          </span>
        ),
      },
    ].map((frame, i) => (
      <div key={frame.t} className="flex flex-1 flex-col items-center gap-1.5">
        <div
          className={`flex w-full aspect-square items-center justify-center rounded-xl border ${
            i === 3 ? "border-[#FF8500]/60 bg-[#FF8500]/10" : "border-[#2651B9]/35 bg-[#081330]"
          }`}
        >
          {frame.content}
        </div>
        <span className="text-[9px] font-mono text-slate-500">{frame.t}</span>
      </div>
    ))}
  </div>
);

const ReelVisual = () => (
  <div className="flex h-full items-center justify-center">
    <div className="relative h-full max-h-[150px] aspect-[9/16] rounded-xl bg-gradient-to-b from-[#2651B9] to-[#0F2260] overflow-hidden transition-transform duration-500 group-hover:scale-105">
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex w-8 h-8 items-center justify-center rounded-full bg-white/25">
          <Play className="w-3.5 h-3.5 text-white fill-white" />
        </span>
      </span>
      <div className="absolute right-1.5 bottom-6 flex flex-col gap-1.5 text-white">
        <Heart className="w-3 h-3 fill-white" />
        <MessageCircle className="w-3 h-3" />
      </div>
      <Lines widths={["w-3/5", "w-2/5"]} className="absolute left-2 bottom-2 w-full space-y-1" barClass="h-1 bg-white/70" />
    </div>
  </div>
);

const SoundVisual = () => (
  <div className="flex h-full flex-col justify-center gap-3">
    <Waveform className="h-16" mirrored />
    <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
      <span className="flex items-center gap-1 text-[#FFA133]">
        <Music className="w-3 h-3" /> score.wav
      </span>
      <span>-14 LUFS</span>
    </div>
  </div>
);

const PromoVisual = () => (
  <div className="flex h-full items-center justify-center">
    <Player className="w-full max-w-[320px]" time="00:18 / 00:30" progress={60}>
      <span className="flex w-11 h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] shadow-lg shadow-orange-500/40 transition-transform duration-500 group-hover:scale-110">
        <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
      </span>
    </Player>
  </div>
);

const ExplainerVisual = () => (
  <div className="flex h-full items-center gap-1.5 sm:gap-2">
    {[
      { icon: <User className="w-6 h-6 text-slate-300" />, label: "Problem" },
      { icon: <Smartphone className="w-6 h-6 text-[#FFA133]" />, label: "Solution" },
      { icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />, label: "Result" },
    ].map((scene, i) => (
      <React.Fragment key={scene.label}>
        <div className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full aspect-[4/3] items-center justify-center rounded-xl border border-[#2651B9]/35 bg-[#081330]">
            {scene.icon}
          </div>
          <span className="text-[9px] font-mono text-slate-500">
            0{i + 1} · {scene.label}
          </span>
        </div>
        {i < 2 && <ArrowRight className="w-3.5 h-3.5 shrink-0 text-slate-500 -mt-4" />}
      </React.Fragment>
    ))}
  </div>
);

/* ---------- Showcase panels ---------- */

const StoryboardPanel = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      { scene: "Hook", art: <span className="w-10 h-10 rounded-full bg-[#FF8500]/80" /> },
      { scene: "Problem", art: <User className="w-8 h-8 text-slate-300" /> },
      { scene: "Product", art: <Smartphone className="w-8 h-8 text-[#60A5FA]" /> },
      { scene: "Benefit", art: <Sparkles className="w-8 h-8 text-[#FFA133]" /> },
      { scene: "Proof", art: <CheckCircle2 className="w-8 h-8 text-emerald-400" /> },
      { scene: "Logo", art: <SampleMark className="w-9 h-9" color="#FF8500" /> },
    ].map((panel, i) => (
      <div key={panel.scene} className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-2.5">
        <div className="flex aspect-video items-center justify-center rounded-lg bg-white/[0.04] border border-dashed border-white/15">
          {panel.art}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-white">{panel.scene}</span>
          <span className="text-[9px] font-mono text-slate-500">SC 0{i + 1}</span>
        </div>
        <Lines widths={["w-full", "w-2/3"]} className="mt-1.5 space-y-1" barClass="h-1 bg-white/15" />
      </div>
    ))}
  </div>
);

const TimelinePanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <Player className="mb-4" time="00:17 / 00:30" progress={56}>
      <div className="flex items-center gap-2">
        <SampleMark className="w-8 h-8" color="#FF8500" />
        <Wordmark className="text-xl text-white" />
      </div>
    </Player>
    <Timeline tall />
  </div>
);

const FormatsPanel = () => (
  <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4 sm:p-5">
    <div className="flex items-end justify-between gap-2 sm:gap-3">
      {[
        { ratio: "aspect-video", w: "w-[38%]", label: "16:9", use: "YouTube · Web", res: "3840×2160" },
        { ratio: "aspect-square", w: "w-[20%]", label: "1:1", use: "Feed", res: "1080×1080" },
        { ratio: "aspect-[4/5]", w: "w-[18%]", label: "4:5", use: "Portrait", res: "1080×1350" },
        { ratio: "aspect-[9/16]", w: "w-[14%]", label: "9:16", use: "Reels", res: "1080×1920" },
      ].map((f, i) => (
        <div key={f.label} className={`${f.w} flex flex-col items-center gap-1.5`}>
          <div
            className={`w-full ${f.ratio} rounded-lg flex items-center justify-center ${
              i === 0 ? "bg-gradient-to-br from-[#FF8500] to-[#FFA133]" : "bg-[#0F2260] border border-[#2651B9]/50"
            }`}
          >
            <Play className={`w-4 h-4 ${i === 0 ? "text-white fill-white" : "text-[#60A5FA]"}`} />
          </div>
          <span className="text-xs font-bold text-white">{f.label}</span>
          <span className="text-[9px] text-slate-400 text-center leading-tight">{f.use}</span>
          <span className="hidden sm:block text-[9px] font-mono text-slate-500">{f.res}</span>
        </div>
      ))}
    </div>
  </div>
);

const SoundFinishPanel = () => (
  <div className="space-y-3">
    <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-4">
      <div className="mb-3 flex items-center justify-between">
        <MonoLabel>Final mix</MonoLabel>
        <MonoLabel className="text-[#FFA133]">Music · SFX · VO</MonoLabel>
      </div>
      <Waveform className="h-20" mirrored />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {["Licensed background score", "Sound effects & mixing", "4K master export", "Smooth 60fps motion"].map((item) => (
        <div key={item} className="flex items-center gap-2 rounded-xl bg-[#081330] border border-[#2651B9]/35 p-3 text-xs text-slate-300">
          <span className="flex w-4 h-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
          </span>
          {item}
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Config ---------- */

const config: ServiceConfig = {
  serviceName: "Video & Motion Design",
  shortName: "Video & Motion",
  projectLabel: "a video project",
  hero: {
    eyebrow: "Video & Motion Design",
    title: (
      <>
        Video & Motion That Makes <GradientText>Your Brand Move</GradientText>
      </>
    ),
    description:
      "Logo reveals, brand intros, promo reels and explainers animated in 4K, with sound design that turns casual viewers into customers.",
    primaryCta: "Start My Video",
    visual: <HeroVisual />,
  },
  statement: {
    eyebrow: "Why motion matters",
    text: "People remember what moves. A few seconds of motion can say more about your brand than a full page of copy, when it is crafted with intent.",
    highlights: ["moves.", "seconds", "intent."],
    pillars: [
      { title: "Attention", desc: "Motion that earns the first three seconds." },
      { title: "Emotion", desc: "Sound and pacing that make people feel something." },
      { title: "Recall", desc: "A signature look viewers remember." },
    ],
  },
  bento: {
    eyebrow: "Our Video & Motion Services",
    title: (
      <>
        Motion Content for <GradientText>Every Screen</GradientText>
      </>
    ),
    description: "From five-second logo stings to full explainers, every frame is designed, animated and sound-designed in-house.",
    tiles: [
      {
        title: "Motion Graphics",
        desc: "Animated typography, icons and UI motion with smooth easing that makes every message feel premium.",
        visual: <MotionPathVisual />,
      },
      { title: "Brand Intro & Logo Reveal", desc: "Signature logo animations for videos, ads and presentations.", visual: <LogoRevealVisual /> },
      { title: "Reels & Shorts", desc: "Vertical edits built to hook fast.", visual: <ReelVisual /> },
      { title: "Sound Design", desc: "Licensed music and mixed SFX.", visual: <SoundVisual /> },
      { title: "Promo & Commercial Videos", desc: "30-second promos that sell a product, offer or launch.", visual: <PromoVisual /> },
      { title: "Explainer Videos", desc: "Clear, animated stories that explain your product in about a minute.", visual: <ExplainerVisual /> },
    ],
  },
  showcase: {
    eyebrow: "Inside Every Production",
    title: (
      <>
        Crafted Frame by Frame, <GradientText>Ready to Publish</GradientText>
      </>
    ),
    description: "A transparent production process with storyboards, edits and exports you can review at every stage.",
    ctaLabel: "Start My Video",
    panels: [
      {
        id: "storyboard",
        title: "Storyboard",
        desc: "Every scene planned before animation starts, so the story is right from the first frame.",
        visual: <StoryboardPanel />,
      },
      {
        id: "edit-timeline",
        title: "Animation & Edit",
        desc: "Layered motion, footage and music edited to a tight, deliberate rhythm.",
        visual: <TimelinePanel />,
      },
      {
        id: "formats",
        title: "Every Format",
        desc: "Widescreen, square, portrait and vertical versions cut from the same production.",
        visual: <FormatsPanel />,
      },
      {
        id: "sound-finish",
        title: "Sound & Finish",
        desc: "Licensed music, sound effects and a polished final mix, exported in 4K.",
        visual: <SoundFinishPanel />,
      },
    ],
  },
  process: {
    title: (
      <>
        From Idea to <GradientText>4K Master</GradientText>
      </>
    ),
    description: "Clear checkpoints mean your feedback lands early, before the time-consuming rendering starts.",
    steps: [
      { title: "Brief", desc: "Your goals, audience, platforms and the one message the video must deliver.", output: "Creative brief" },
      { title: "Storyboard", desc: "We shape the message and key scenes with you before anything moves.", output: "Storyboard" },
      { title: "Style Frames", desc: "Key frames that lock in colour, typography and the overall look.", output: "Style frames" },
      { title: "Animate & Edit", desc: "Motion, footage and pacing come together into a reviewable draft.", output: "Draft cut" },
      { title: "Sound & Delivery", desc: "Music, sound design and final exports in every format you need.", output: "4K masters in every format" },
    ],
  },
  why: {
    title: (
      <>
        Why Brands Trust Us <br className="hidden sm:block" />
        <GradientText>With Their Story</GradientText>
      </>
    ),
    items: [
      { icon: Clapperboard, title: "Broadcast-quality exports", desc: "Crisp 4K and 1080p masters ready for YouTube, ads, events and the web." },
      { icon: Smartphone, title: "Every format, one project", desc: "Vertical, square and widescreen versions cut from the same production." },
      { icon: Music, title: "Sound that sells", desc: "Sound design and licensed music that make your story land." },
      { icon: Sparkles, title: "Smooth 60fps motion", desc: "Fluid animation that feels premium on every screen." },
    ],
    tools: ["After Effects", "Premiere Pro", "Blender 3D", "Audition"],
    highlight: { value: "4K", label: "Broadcast-quality masters in every format", chips: ["16:9", "9:16", "1:1", "60fps"] },
  },
  packages: {
    title: (
      <>
        Video Packages, <GradientText>Clearly Priced</GradientText>
      </>
    ),
    description: "Pick the scope that fits your launch today. No hidden fees, ever.",
    tiers: {
      basic: {
        ...PRICING.basic,
        tagline: "Put your logo in motion",
        features: ["5–10s animated logo sting", "1080p & 4K exports", "Sound effect included", "2 rounds of revisions"],
      },
      standard: {
        ...PRICING.standard,
        tagline: "A promo that converts",
        features: [
          "30s promo video or reel",
          "Storyboard before animation",
          "Licensed background music",
          "9:16 & 16:9 versions",
          "Revisions until you're 100% satisfied",
        ],
      },
      premium: {
        ...PRICING.premium,
        tagline: "A complete brand story",
        features: [
          "60s explainer with custom 3D motion",
          "Storyboard & style frames",
          "Custom sound design",
          "All social & widescreen formats",
          "VIP priority support",
        ],
      },
    },
  },
  reviewsTitle: "What Clients Say About Our Videos",
  faqs: [
    {
      q: "How long can my video be?",
      a: "Logo stings run 5–10 seconds, promos around 30 seconds and explainers about 60 seconds. Longer videos can be quoted separately.",
    },
    {
      q: "Which formats will I receive?",
      a: "4K and 1080p exports in the ratios you need: 16:9 for YouTube and websites, 9:16 for reels and shorts, and square for feeds.",
    },
    {
      q: "Is the music licensed?",
      a: "Yes. We use licensed background music and sound effects, so you can publish and advertise without copyright issues.",
    },
    {
      q: "Can you edit my existing footage?",
      a: "Yes. Send your raw clips and we'll edit them into polished reels, shorts or promos with motion graphics and sound.",
    },
    {
      q: "Do you create 3D animation?",
      a: "Yes. We build 3D logo reveals and 3D motion scenes in Blender, combined with motion graphics in After Effects.",
    },
    {
      q: "How do revisions work?",
      a: "We share a storyboard first and then a draft cut, so most feedback happens before final rendering. Standard and Premium include revisions until you're happy.",
    },
  ],
  cta: {
    titleLead: "Ready to Put Your Brand",
    titleHighlight: "In Motion?",
    description: "Get logo reveals, reels and promo videos that stop the scroll and make your brand unforgettable.",
    videoSrc: GROW_VIDEO,
    posterSrc: GROW_POSTER,
  },
};

export const MotionVideoServicePage: React.FC = () => <ServiceLandingPage config={config} />;
