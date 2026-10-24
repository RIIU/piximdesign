"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Rocket,
  Shirt,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { INDUSTRIES, SERVICES } from "@/data/agencyData";
import { GsapMagneticButton } from "@/components/animations";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  ecommerce: ShoppingBag,
  food: UtensilsCrossed,
  education: GraduationCap,
  tech: Rocket,
  fashion: Shirt,
  realestate: Building2,
};

interface IndustriesSectionProps {
  onOpenContact?: (service?: string, note?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenContact }) => {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState<boolean>(true);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[0];
  const ActiveIcon = INDUSTRY_ICONS[active.id];
  const stack = active.services
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  const [direction, setDirection] = useState<"next" | "prev">("next");
  const currentIndex = INDUSTRIES.findIndex((i) => i.id === activeId);

  // Check viewport on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause autoplay temporarily during user interaction
  const pauseTemporarily = useCallback((duration = 7500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  }, []);

  const handleNext = useCallback(() => {
    pauseTemporarily();
    setDirection("next");
    setActiveId((prevId) => {
      const idx = INDUSTRIES.findIndex((i) => i.id === prevId);
      const nextIdx = (idx + 1) % INDUSTRIES.length;
      return INDUSTRIES[nextIdx].id;
    });
  }, [pauseTemporarily]);

  const handlePrev = useCallback(() => {
    pauseTemporarily();
    setDirection("prev");
    setActiveId((prevId) => {
      const idx = INDUSTRIES.findIndex((i) => i.id === prevId);
      const prevIdx = (idx - 1 + INDUSTRIES.length) % INDUSTRIES.length;
      return INDUSTRIES[prevIdx].id;
    });
  }, [pauseTemporarily]);

  const handleSelect = (id: string, index: number) => {
    pauseTemporarily();
    setDirection(index >= currentIndex ? "next" : "prev");
    setActiveId(id);
  };

  // Center active tab horizontally inside its container (avoids whole-page jitter)
  const centerActiveTab = useCallback((id: string, smooth = true) => {
    const container = tabsContainerRef.current;
    if (!container) return;
    const btn = document.getElementById(`industry-tab-${id}`);
    if (!btn) return;

    const containerWidth = container.clientWidth;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.clientWidth;
    const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Auto-scroll active tab into view on mobile whenever activeId changes
  useEffect(() => {
    if (isMobile) {
      centerActiveTab(activeId, true);
    }
  }, [activeId, isMobile, centerActiveTab]);

  // Autoplay carousel timer on mobile
  useEffect(() => {
    if (!isAutoPlayEnabled || isPaused || !isMobile) return;

    const interval = setInterval(() => {
      setDirection("next");
      setActiveId((prevId) => {
        const idx = INDUSTRIES.findIndex((i) => i.id === prevId);
        const nextIdx = (idx + 1) % INDUSTRIES.length;
        return INDUSTRIES[nextIdx].id;
      });
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoPlayEnabled, isPaused, isMobile]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseTemporarily();
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diffX = mouseStartX.current - e.clientX;
    if (Math.abs(diffX) > 30) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
    mouseStartX.current = null;
  };

  // Section entrance
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".industry-reveal",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Fast, crisp panel content swap on change
  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current.querySelectorAll(".industry-panel-item"),
        { opacity: 0, x: direction === "next" ? 18 : -18 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.015, ease: "power2.out" }
      );
    },
    { dependencies: [activeId], scope: panelRef }
  );

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Section Header */}
      <div className="industry-reveal text-center max-w-3xl mx-auto mb-8 sm:mb-10 relative z-10">
        <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
          Branding Built Around <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Your Industry
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Every market has its own rules. Pick yours and see the exact service stack we use to grow brands like you.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Industry Tabs Column */}
        <div className="lg:col-span-5 relative">
          {/* Mobile Carousel Top Control Bar */}
          <div className="flex lg:hidden items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#FFA133] bg-[#FF8500]/10 border border-[#FF8500]/25 px-2.5 py-0.5 rounded-full">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-[#FF8500] ${
                    !isPaused && isAutoPlayEnabled ? "animate-ping" : ""
                  }`}
                />
                {!isAutoPlayEnabled
                  ? "Manual"
                  : isPaused
                  ? "Paused"
                  : "Auto-moving"}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {currentIndex + 1} of {INDUSTRIES.length}
              </span>
            </div>

            {/* Quick Carousel Prev/Next & Play/Pause */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Industry"
                className="w-8 h-8 rounded-full bg-[#0C1E4E] border border-[#2651B9]/40 text-slate-300 hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isPaused) {
                    setIsPaused(false);
                    setIsAutoPlayEnabled(true);
                  } else {
                    setIsPaused(true);
                  }
                }}
                aria-label={isPaused ? "Resume Carousel" : "Pause Carousel"}
                className="w-8 h-8 rounded-full bg-[#0C1E4E] border border-[#2651B9]/40 text-slate-300 hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Industry"
                className="w-8 h-8 rounded-full bg-[#0C1E4E] border border-[#2651B9]/40 text-slate-300 hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Industry Tabs: horizontal scrollable carousel on mobile, vertical list on desktop */}
          <div className="relative">
            {/* Fade cues on mobile edges */}
            <div className="lg:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#081330] to-transparent z-10" />
            <div className="lg:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#081330] to-transparent z-10" />

            <div
              ref={tabsContainerRef}
              role="tablist"
              aria-label="Industries"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="industry-reveal flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 lg:pb-0 snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative"
            >
              {INDUSTRIES.map((industry, index) => {
                const Icon = INDUSTRY_ICONS[industry.id];
                const isActive = industry.id === activeId;
                return (
                  <button
                    key={industry.id}
                    type="button"
                    role="tab"
                    id={`industry-tab-${industry.id}`}
                    aria-selected={isActive}
                    aria-controls="industry-panel"
                    onClick={() => handleSelect(industry.id, index)}
                    className={`group relative snap-center shrink-0 lg:shrink flex items-center gap-3 sm:gap-4 rounded-2xl border px-4 py-3 lg:px-5 lg:py-4 text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-[#FF8500]/20 to-[#0C1E4E]/90 border-[#FF8500] shadow-[0_10px_30px_-12px_rgba(255,133,0,0.45)] ring-1 ring-[#FF8500]/40 scale-[1.02] lg:scale-100"
                        : "bg-[#0C1E4E]/60 border-[#2651B9]/25 hover:border-[#FF8500]/40 hover:bg-[#0C1E4E]/90 opacity-80 lg:opacity-100"
                    }`}
                  >
                    {/* Active tab bottom glow line on mobile */}
                    {isActive && (
                      <span className="lg:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF8500] via-[#FFA133] to-amber-300 shadow-[0_0_8px_rgba(255,133,0,0.8)]" />
                    )}

                    <span
                      className={`flex items-center justify-center w-9 h-9 lg:w-11 lg:h-11 rounded-xl border transition-colors duration-300 shrink-0 ${
                        isActive
                          ? "bg-[#FF8500] border-[#FF8500] text-white"
                          : "bg-[#081330]/80 border-[#2651B9]/30 text-slate-300 group-hover:text-[#FFA133]"
                      }`}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </span>
                    <span
                      className={`whitespace-nowrap lg:whitespace-normal text-sm lg:text-base font-bold transition-colors ${
                        isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {industry.name}
                    </span>
                    <ArrowRight
                      className={`hidden lg:block ml-auto w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "text-[#FFA133] translate-x-0 opacity-100"
                          : "text-slate-500 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Industry Playbook Panel */}
        <div
          ref={panelRef}
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active.id}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="industry-reveal lg:col-span-7 relative overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 select-none cursor-grab active:cursor-grabbing lg:cursor-default touch-pan-y"
        >
          {/* Corner glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.22),transparent_70%)] pointer-events-none" />

          {/* Watermark icon */}
          <ActiveIcon
            aria-hidden
            className="absolute -bottom-8 -right-6 w-48 h-48 text-white/[0.03] pointer-events-none"
            strokeWidth={1.25}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="industry-panel-item inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#081330]/80 text-[#FFA133] border border-[#FF8500]/30 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
                {active.name} Playbook
              </span>
              <span className="lg:hidden text-xs font-mono text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/10">
                {currentIndex + 1} / {INDUSTRIES.length}
              </span>
            </div>

            <h3 className="industry-panel-item mt-5 font-agency text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight">
              {active.headline}
            </h3>

            <p className="industry-panel-item mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              {active.challenge}
            </p>

            {/* What you get */}
            <ul className="mt-7 space-y-3">
              {active.outcomes.map((outcome) => (
                <li key={outcome} className="industry-panel-item flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/40 shrink-0">
                    <Check className="w-3 h-3 text-[#FFA133]" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base text-slate-200">{outcome}</span>
                </li>
              ))}
            </ul>

            {/* Recommended service stack */}
            <div className="industry-panel-item mt-8 pt-6 border-t border-[#2651B9]/25">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-3">
                Recommended service stack
              </p>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#2651B9]/35 bg-[#081330]/70 pl-2 pr-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-[#FF8500]/60 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-[10px] sm:text-xs text-slate-500 group-hover:text-[#FFA133] transition-colors">
                      {service.number}
                    </span>
                    {service.title}
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FFA133] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="industry-panel-item mt-8">
              <GsapMagneticButton
                onClick={() =>
                  onOpenContact?.(
                    `${active.name} Branding`,
                    `I run a ${active.name.toLowerCase()} business and would like a plan covering: ${stack
                      .map((s) => s.title)
                      .join(", ")}.`
                  )
                }
                variant="primary"
                strength={0.25}
                className="px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white shadow-lg shadow-orange-500/25 w-full sm:w-auto"
              >
                <span>Get My {active.shortName} Plan</span>
                <ArrowRight className="w-4 h-4" />
              </GsapMagneticButton>
            </div>

            {/* Mobile Carousel Controls & Dots Indicator */}
            <div className="flex lg:hidden items-center justify-between gap-3 mt-8 pt-6 border-t border-[#2651B9]/25">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Industry"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#081330] border border-[#2651B9]/40 text-slate-300 hover:text-white hover:border-[#FF8500] active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {INDUSTRIES.map((ind, idx) => {
                  const isActive = ind.id === activeId;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => handleSelect(ind.id, idx)}
                      aria-label={`Go to ${ind.name}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "w-7 bg-gradient-to-r from-[#FF8500] to-[#FFA133] shadow-sm shadow-[#FF8500]/40"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Industry"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#081330] border border-[#2651B9]/40 text-slate-300 hover:text-white hover:border-[#FF8500] active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile swipe helper hint */}
            <div className="lg:hidden text-center mt-3">
              <span className="text-[11px] font-mono text-slate-500">
                ← Swipe left / right to change →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
