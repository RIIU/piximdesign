"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, TrendingUp, Award, Layers } from "@/content/lucide";
import { tx } from "@/content/text";


export interface LoopedPanelItem {
  id: string;
  number: string;
  client: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  gradient: string;
  accentBorder: string;
  tag: string;
  href: string;
}

const DEFAULT_PANELS: LoopedPanelItem[] = [
  {
    id: "panel-1",
    number: "01",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.aura-botanicals", "Aura Botanicals"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.organic-beauty-tactile-packaging", "Organic Beauty & Tactile Packaging"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.brand-identity-packaging", "Brand Identity • Packaging"); },
    metric: "+240%",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.retail-sell-through-growth", "Retail Sell-Through Growth"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.custom-geometric-wordmark-embossed-tactile-boxes", "Custom geometric wordmark, embossed tactile boxes, and eco-friendly foil labels."); },
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentBorder: "group-hover:border-orange-500/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.verified-client", "Verified Client"); },
    href: "/projects",
  },
  {
    id: "panel-2",
    number: "02",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.finedge-wealth", "FinEdge Wealth"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.next-gen-fintech-ui-ux-web", "Next-Gen Fintech UI/UX & Web Engine"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.web-engineering-next-js-15", "Web Engineering • Next.js 15"); },
    metric: "1.2M+",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.active-digital-banking-users", "Active Digital Banking Users"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.sub-second-load-times-dark-mode", "Sub-second load times, dark-mode design tokens, and high-conversion signup funnels."); },
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    accentBorder: "group-hover:border-blue-500/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.fintech-excellence", "Fintech Excellence"); },
    href: "/projects",
  },
  {
    id: "panel-3",
    number: "03",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.krave-artisan-snacks", "Krave Artisan Snacks"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.shelf-popping-packaging-3d-renders", "Shelf-Popping Packaging & 3D Renders"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.retail-packaging-3d-visuals", "Retail Packaging • 3D Visuals"); },
    metric: "650+",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.supermarket-distribution-stores", "Supermarket Distribution Stores"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.vibrant-metallic-pouches-recyclable-carton-sleev", "Vibrant metallic pouches, recyclable carton sleeves, and photorealistic 3D retail mockups."); },
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentBorder: "group-hover:border-emerald-500/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.retail-award", "Retail Award"); },
    href: "/projects",
  },
  {
    id: "panel-4",
    number: "04",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.lumina-aesthetic-clinic", "Lumina Aesthetic Clinic"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.luxury-monogram-experiential-signage", "Luxury Monogram & Experiential Signage"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.luxury-branding-print-collateral", "Luxury Branding • Print Collateral"); },
    metric: "99.4%",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.brand-memorability-score", "Brand Memorability Score"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.minimalist-aesthetic-embossed-gold-foil-statione", "Minimalist aesthetic, embossed gold-foil stationery, and bespoke typography."); },
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentBorder: "group-hover:border-purple-500/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.luxury-tier", "Luxury Tier"); },
    href: "/projects",
  },
  {
    id: "panel-5",
    number: "05",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.orbit-ai-intelligence", "Orbit AI Intelligence"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.full-stack-saas-platform-interactive-web", "Full-Stack SaaS Platform & Interactive Web"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.ai-saas-full-stack-web", "AI SaaS • Full-Stack Web"); },
    metric: "$14M",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.series-a-investment-secured", "Series A Investment Secured"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.custom-interactive-webgl-shaders-technical-docum", "Custom interactive WebGL shaders, technical documentation hub, and SaaS design system."); },
    gradient: "from-orange-600/20 via-red-500/10 to-transparent",
    accentBorder: "group-hover:border-orange-500/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.venture-backed", "Venture Backed"); },
    href: "/projects",
  },
  {
    id: "panel-6",
    number: "06",
    get client() { return tx("animations/GsapInfiniteLoopedPanels.zenith-athletics", "Zenith Athletics"); },
    get title() { return tx("animations/GsapInfiniteLoopedPanels.global-apparel-branding-motion-video", "Global Apparel Branding & Motion Video"); },
    get category() { return tx("animations/GsapInfiniteLoopedPanels.motion-graphics-e-commerce", "Motion Graphics • E-Commerce"); },
    metric: "+180%",
    get metricLabel() { return tx("animations/GsapInfiniteLoopedPanels.international-order-volume", "International Order Volume"); },
    get description() { return tx("animations/GsapInfiniteLoopedPanels.dynamic-logo-animation-teasers-high-converting", "Dynamic logo animation teasers, high-converting Shopify store, and sportswear tags."); },
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    accentBorder: "group-hover:border-amber-400/60",
    get tag() { return tx("animations/GsapInfiniteLoopedPanels.athletic-brand", "Athletic Brand"); },
    href: "/projects",
  },
];

interface GsapInfiniteLoopedPanelsProps {
  items?: LoopedPanelItem[];
  title?: string;
  subtitle?: string;
  speed?: number; // Duration of one full loop cycle in seconds (default 36)
  className?: string;
}

export const GsapInfiniteLoopedPanels: React.FC<GsapInfiniteLoopedPanelsProps> = ({
  items = DEFAULT_PANELS,
  title = "Infinite Capability Showcase",
  subtitle = "Interactive Looped Panels",
  speed = 36,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple the items to ensure seamless infinite wrapping on any viewport width
  const loopItems = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure half width (one full set of items)
    const singleSetWidth = track.scrollWidth / 3;

    const ctx = gsap.context(() => {
      // Infinite seamless horizontal ticker using GSAP modifiers
      tweenRef.current = gsap.to(track, {
        x: -singleSetWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return parseFloat(x) % singleSetWidth;
          }),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  // Pause when offscreen to save 100% CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isPaused) tweenRef.current?.resume();
        } else {
          tweenRef.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPaused]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.4, overwrite: "auto" });
    }
  };

  const handleMouseLeave = () => {
    if (!isPaused && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4, overwrite: "auto" });
    }
  };

  const handleManualPrev = () => {
    if (!trackRef.current || !tweenRef.current) return;
    const currentX = gsap.getProperty(trackRef.current, "x") as number;
    gsap.to(trackRef.current, {
      x: currentX + 380,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleManualNext = () => {
    if (!trackRef.current || !tweenRef.current) return;
    const currentX = gsap.getProperty(trackRef.current, "x") as number;
    gsap.to(trackRef.current, {
      x: currentX - 380,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const togglePlayPause = () => {
    if (!tweenRef.current) return;
    if (isPaused) {
      tweenRef.current.play();
      setIsPaused(false);
    } else {
      tweenRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <section className={`relative w-full py-16 overflow-hidden select-none ${className}`}>
      {/* Background ambient light (GPU radial-gradient, zero blur cost) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 94, 30, 0.08) 0%, rgba(37, 99, 235, 0.06) 40%, transparent 70%)",
        }}
      />

      {/* Header & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {title && (
            <h2 className="font-agency text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {title}
            </h2>
          )}
        </div>

        {/* Panel Navigation Buttons */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={togglePlayPause}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/20 dark:border-[#2651B9]/35 hover:border-[#2651B9]/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#2651B9] dark:hover:text-[#60A5FA] transition-all cursor-pointer shadow-sm"
          >
            {isPaused ? "▶ Resume Loop" : "⏸ Pause Loop"}
          </button>

          <button
            onClick={handleManualPrev}
            className="p-2.5 rounded-xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/20 dark:border-[#2651B9]/35 hover:border-[#FF8500]/50 hover:bg-slate-50 dark:hover:bg-[#081330] text-slate-700 dark:text-slate-200 hover:text-[#FF8500] transition-all cursor-pointer active:scale-90 shadow-sm"
            aria-label="Previous panel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleManualNext}
            className="p-2.5 rounded-xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/20 dark:border-[#2651B9]/35 hover:border-[#FF8500]/50 hover:bg-slate-50 dark:hover:bg-[#081330] text-slate-700 dark:text-slate-200 hover:text-[#FF8500] transition-all cursor-pointer active:scale-90 shadow-sm"
            aria-label="Next panel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Infinite Panels Container with clean edge alpha fade (zero black shadow overlay) */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent_0%,black_36px,black_calc(100%-36px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_36px,black_calc(100%-36px),transparent_100%)]"
      >
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform py-4 px-4">
          {loopItems.map((panel, idx) => (
            <div
              key={`${panel.id}-${idx}`}
              className={`group relative w-[330px] sm:w-[400px] h-[450px] shrink-0 rounded-3xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/35 ${panel.accentBorder} p-7 transition-all duration-300 hover:shadow-2xl shadow-sm dark:shadow-[0_15px_40px_-10px_rgba(4,10,28,0.7)] flex flex-col justify-between overflow-hidden`}
            >
              {/* Internal Accent Glow Gradient */}
              <div
                className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${panel.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Top Row: Panel Number & Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-black tracking-widest text-[#C25E00] dark:text-[#FFA133] px-3 py-1 rounded-full bg-[#FF8500]/10 dark:bg-[#FF8500]/20 border border-orange-500/20">
                  {panel.number}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#081330] border border-slate-200 dark:border-[#2651B9]/30">
                  <Award className="w-3 h-3 text-amber-500" />
                  {panel.tag}
                </span>
              </div>

              {/* Middle Section: Client & Impact */}
              <div className="relative z-10 my-auto">
                <div className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  {panel.category}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A] dark:text-white group-hover:text-[#FF8500] transition-colors">
                  {panel.client}
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1 line-clamp-1">
                  {panel.title}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2">
                  {panel.description}
                </p>

                {/* Big Bold Impact Metric */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#081330]/80 border border-slate-200 dark:border-[#2651B9]/30 group-hover:border-orange-500/40 transition-colors">
                  <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
                    <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{panel.metric}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {panel.metricLabel}
                  </div>
                </div>
              </div>

              {/* Bottom Action CTA */}
              <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-[#2651B9]/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#2651B9] dark:group-hover:text-[#60A5FA] transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-500" />
                  <span>{tx("animations/GsapInfiniteLoopedPanels.case-study-details", "Case Study Details")}</span>
                </span>

                <Link
                  href={panel.href}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-[#081330] hover:bg-[#FF8500] hover:text-white text-slate-700 dark:text-slate-200 border border-transparent dark:border-[#2651B9]/30 transition-all duration-200 hover:scale-110 shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
