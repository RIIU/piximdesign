"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, TrendingUp, Award, Layers } from "lucide-react";


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
    client: "Aura Botanicals",
    title: "Organic Beauty & Tactile Packaging",
    category: "Brand Identity • Packaging",
    metric: "+240%",
    metricLabel: "Retail Sell-Through Growth",
    description: "Custom geometric wordmark, embossed tactile boxes, and eco-friendly foil labels.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    accentBorder: "group-hover:border-orange-500/60",
    tag: "Verified Client",
    href: "/projects",
  },
  {
    id: "panel-2",
    number: "02",
    client: "FinEdge Wealth",
    title: "Next-Gen Fintech UI/UX & Web Engine",
    category: "Web Engineering • Next.js 15",
    metric: "1.2M+",
    metricLabel: "Active Digital Banking Users",
    description: "Sub-second load times, dark-mode design tokens, and high-conversion signup funnels.",
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    accentBorder: "group-hover:border-blue-500/60",
    tag: "Fintech Excellence",
    href: "/projects",
  },
  {
    id: "panel-3",
    number: "03",
    client: "Krave Artisan Snacks",
    title: "Shelf-Popping Packaging & 3D Renders",
    category: "Retail Packaging • 3D Visuals",
    metric: "650+",
    metricLabel: "Supermarket Distribution Stores",
    description: "Vibrant metallic pouches, recyclable carton sleeves, and photorealistic 3D retail mockups.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentBorder: "group-hover:border-emerald-500/60",
    tag: "Retail Award",
    href: "/projects",
  },
  {
    id: "panel-4",
    number: "04",
    client: "Lumina Aesthetic Clinic",
    title: "Luxury Monogram & Experiential Signage",
    category: "Luxury Branding • Print Collateral",
    metric: "99.4%",
    metricLabel: "Brand Memorability Score",
    description: "Minimalist aesthetic, embossed gold-foil stationery, and bespoke typography.",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentBorder: "group-hover:border-purple-500/60",
    tag: "Luxury Tier",
    href: "/projects",
  },
  {
    id: "panel-5",
    number: "05",
    client: "Orbit AI Intelligence",
    title: "Full-Stack SaaS Platform & Interactive Web",
    category: "AI SaaS • Full-Stack Web",
    metric: "$14M",
    metricLabel: "Series A Investment Secured",
    description: "Custom interactive WebGL shaders, technical documentation hub, and SaaS design system.",
    gradient: "from-orange-600/20 via-red-500/10 to-transparent",
    accentBorder: "group-hover:border-orange-500/60",
    tag: "Venture Backed",
    href: "/projects",
  },
  {
    id: "panel-6",
    number: "06",
    client: "Zenith Athletics",
    title: "Global Apparel Branding & Motion Video",
    category: "Motion Graphics • E-Commerce",
    metric: "+180%",
    metricLabel: "International Order Volume",
    description: "Dynamic logo animation teasers, high-converting Shopify store, and sportswear tags.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    accentBorder: "group-hover:border-amber-400/60",
    tag: "Athletic Brand",
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

      {/* Left/Right Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#081330] via-[#081330]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#081330] via-[#081330]/90 to-transparent z-10" />

      {/* Infinite Panels Container */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
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
                  <span>Case Study Details</span>
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
