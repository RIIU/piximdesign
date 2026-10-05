"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, GradientText, SampleMark, Wordmark } from "./shared";
import { KIT_PANELS } from "./brandingData";

/* ---------- Panel visuals (decorative) ---------- */

const Variant: React.FC<{ label: string; className: string; labelClass?: string; children: React.ReactNode }> = ({
  label,
  className,
  labelClass = "text-white/70",
  children,
}) => (
  <div className={`relative flex min-h-[140px] sm:min-h-[160px] items-center justify-center rounded-2xl ${className}`}>
    {children}
    <span className={`absolute bottom-2.5 left-3 text-[10px] font-mono uppercase tracking-widest ${labelClass}`}>{label}</span>
  </div>
);

const LogoSuiteVisual = () => (
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

const ColourSystemVisual = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 row-span-2 flex min-h-[200px] flex-col justify-between rounded-2xl bg-[#FF8500] p-4 sm:p-5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Primary</span>
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
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Base</span>
        <span>
          <span className="block font-agency text-base font-extrabold text-white">Midnight</span>
          <span className="block text-[10px] font-mono text-slate-400">#081330</span>
        </span>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-[#2651B9] p-3 sm:p-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">Accent</span>
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

    {/* 60 / 30 / 10 usage ratio */}
    <div className="rounded-2xl bg-[#081330]/80 border border-[#2651B9]/30 p-3 sm:p-4">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
        <span>Usage ratio</span>
        <span>60 · 30 · 10</span>
      </div>
      <div className="mt-2.5 flex h-3 overflow-hidden rounded-full">
        <span className="w-[60%] bg-[#0F2260]" />
        <span className="w-[30%] bg-[#FF8500]" />
        <span className="w-[10%] bg-[#3B82F6]" />
      </div>
    </div>
  </div>
);

const TypographyVisual = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Headings</span>
        <span className="mt-2 block font-agency text-6xl font-extrabold text-white leading-none">Aa</span>
        <span className="mt-3 block font-agency text-lg font-extrabold text-white">Agency</span>
        <span className="block text-[10px] font-mono text-slate-500 truncate">ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
      </div>
      <div className="rounded-2xl bg-[#F8FAFC] p-5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Body</span>
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

const ApplicationsVisual = () => (
  <div className="grid grid-cols-6 gap-3">
    {/* Social post */}
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
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Social post</span>
    </div>
    {/* App icon */}
    <div className="col-span-3 flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#081330] border border-[#2651B9]/35 p-3">
      <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center shadow-lg shadow-orange-500/25">
        <SampleMark className="w-7 h-7" color="#FFFFFF" />
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">App icon</span>
    </div>
    {/* Business card */}
    <div className="col-span-3 flex items-center justify-center rounded-2xl bg-[#0C1E4E] border border-[#2651B9]/35 p-3">
      <div className="w-full max-w-[150px] aspect-[1.75/1] rounded-lg bg-[#081330] border border-[#2651B9]/50 shadow-xl p-2.5 flex flex-col justify-between rotate-[-4deg]">
        <SampleMark className="w-4 h-4" color="#FF8500" />
        <div className="space-y-1">
          <div className="h-1 w-3/5 rounded bg-white/80" />
          <div className="h-1 w-2/5 rounded bg-white/30" />
        </div>
      </div>
    </div>
    {/* Email signature */}
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
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 sm:hidden">Email</span>
    </div>
  </div>
);

const PANEL_VISUALS: Record<string, React.ReactNode> = {
  "logo-suite": <LogoSuiteVisual />,
  "colour-system": <ColourSystemVisual />,
  typography: <TypographyVisual />,
  applications: <ApplicationsVisual />,
};

/* ---------- Section ---------- */

interface BrandKitAnatomyProps {
  onStart: () => void;
}

export const BrandKitAnatomy: React.FC<BrandKitAnatomyProps> = ({ onStart }) => {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Highlight the list item whose panel crosses the middle of the viewport
  useEffect(() => {
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => Boolean(p));
    if (!panels.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  const scrollToPanel = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="brand-kit"
      className="relative py-20 sm:py-28"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 45% at 15% 25%, rgba(255,133,0,0.10) 0%, rgba(38,81,185,0.14) 50%, transparent 80%), linear-gradient(to bottom, #081330, #0B1E52, #081330)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky intro + index */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="brand-reveal">
              <Eyebrow>Inside Your Brand Kit</Eyebrow>
              <h2 className="mt-4 font-agency text-[28px] sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.1]">
                Every Piece Your Brand Needs to <GradientText>Show Up Consistently</GradientText>
              </h2>
              <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                We don&apos;t stop at a logo. You get a complete, ready-to-use identity system your whole team can apply
                with confidence.
              </p>
            </div>

            <ol className="mt-8 hidden lg:block space-y-1.5">
              {KIT_PANELS.map((panel, i) => {
                const isActive = active === i;
                return (
                  <li key={panel.id}>
                    <button
                      type="button"
                      onClick={() => scrollToPanel(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group w-full flex items-start gap-4 rounded-2xl px-4 py-3 text-left transition-colors cursor-pointer ${
                        isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex w-8 h-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-300 ${
                          isActive ? "bg-[#FF8500] border-[#FF8500] text-white" : "border-[#2651B9]/35 text-slate-500"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-agency text-lg font-extrabold transition-colors duration-300 ${
                            isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        >
                          {panel.title}
                        </span>
                        <span
                          className={`grid transition-all duration-300 ${
                            isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden text-sm text-slate-400 leading-relaxed">{panel.desc}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="brand-reveal mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 cursor-pointer"
              >
                Get Your Brand Kit
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                See our projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Visual panels */}
        <div className="lg:col-span-7 space-y-6">
          {KIT_PANELS.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              data-index={i}
              className={`brand-reveal rounded-[28px] border bg-[#0C1E4E]/80 backdrop-blur-xl p-5 sm:p-7 transition-colors duration-500 ${
                active === i ? "border-[#FF8500]/45" : "border-[#2651B9]/30"
              }`}
            >
              <div className="mb-5 flex items-start gap-3">
                <span className="font-mono text-xs text-[#FFA133] mt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white">{panel.title}</h3>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed lg:hidden">{panel.desc}</p>
                </div>
              </div>
              <div aria-hidden>{PANEL_VISUALS[panel.id]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
