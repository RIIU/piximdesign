"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Star, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export interface SliderCardItem {
  id: string;
  client: string;
  category: string;
  impact: string;
  description: string;
  rating?: number;
  tag: string;
  accentColor?: string;
  href?: string;
}

const DEFAULT_ITEMS: SliderCardItem[] = [
  {
    id: "1",
    client: "Aura Botanicals",
    category: "Brand Identity & Packaging",
    impact: "+240% Retail Sell-through",
    description: "Complete organic beauty overhaul, tactile packaging & Shopify Plus store design.",
    rating: 5,
    tag: "Verified Client",
    accentColor: "from-orange-500/20 to-amber-500/05",
    href: "/projects",
  },
  {
    id: "2",
    client: "FinEdge Wealth",
    category: "Fintech UI/UX & Web",
    impact: "1.2M+ Active App Users",
    description: "Modern financial dashboard, bespoke typography and high-converting landing pages.",
    rating: 5,
    tag: "Fintech Award",
    accentColor: "from-blue-500/20 to-cyan-500/05",
    href: "/projects",
  },
  {
    id: "3",
    client: "Krave Artisan Snacks",
    category: "Packaging & 3D Render",
    impact: "Featured in 650+ Stores",
    description: "Vibrant shelf-popping pouches, recyclable metallic foil accents & shelf-ready cartons.",
    rating: 5,
    tag: "Retail Favorite",
    accentColor: "from-emerald-500/20 to-teal-500/05",
    href: "/projects",
  },
  {
    id: "4",
    client: "Lumina Skin Clinic",
    category: "Luxury Monogram & Identity",
    impact: "99.4% Brand Recognition",
    description: "High-end minimalist aesthetic, gold-foil collateral and experiential clinic signage.",
    rating: 5,
    tag: "Luxury Design",
    accentColor: "from-purple-500/20 to-pink-500/05",
    href: "/projects",
  },
  {
    id: "5",
    client: "Orbit AI Intelligence",
    category: "Web Platform & SaaS Brand",
    impact: "$14M Series A Closed",
    description: "Interactive WebGL animations, dark-mode design system & developer docs.",
    rating: 5,
    tag: "Tech Innovator",
    accentColor: "from-orange-500/20 to-red-500/05",
    href: "/projects",
  },
  {
    id: "6",
    client: "Zenith Athletics",
    category: "E-Commerce & Apparel",
    impact: "+180% International Orders",
    description: "Bold performance branding, dynamic motion graphics & global packaging standards.",
    rating: 5,
    tag: "Athletic Brand",
    accentColor: "from-amber-500/20 to-yellow-500/05",
    href: "/projects",
  },
];

interface GsapInfiniteCardSliderProps {
  items?: SliderCardItem[];
  speed?: number; // Duration in seconds (default 32)
  reverse?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const GsapInfiniteCardSlider: React.FC<GsapInfiniteCardSliderProps> = ({
  items = DEFAULT_ITEMS,
  speed = 32,
  reverse = false,
  className = "",
  title,
  subtitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Double items to make seamless infinite loop
    const totalWidth = track.scrollWidth / 2;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        x: reverse ? totalWidth : -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return reverse
              ? (parseFloat(x) % totalWidth) - totalWidth
              : parseFloat(x) % totalWidth;
          }),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items, speed, reverse]);

  // Pause when offscreen to save 100% CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tweenRef.current?.resume();
        } else {
          tweenRef.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
    }
  };

  // We repeat items 3 times to ensure no gaps on wide monitors
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className={`relative w-full py-6 overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
          {title && (
            <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Left/Right Edge Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#081330] via-[#081330]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#081330] via-[#081330]/80 to-transparent z-10" />

      {/* Slider Container */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform py-2">
          {repeatedItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/35 hover:border-[#FF8500]/60 p-6 transition-all duration-300 hover:shadow-xl shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] dark:shadow-[0_15px_40px_-10px_rgba(4,10,28,0.7)] group flex flex-col justify-between"
            >
              <div>
                {/* Header with Tag & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FF8500]/10 dark:bg-[#FF8500]/20 text-[#C25E00] dark:text-[#FFA133] border border-[#FF8500]/25 dark:border-[#FF8500]/35">
                    <Award className="w-3 h-3" />
                    {item.tag}
                  </span>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Client Name & Category */}
                <h4 className="text-lg font-bold text-[#0F172A] dark:text-white group-hover:text-[#FF8500] transition-colors">
                  {item.client}
                </h4>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{item.category}</p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-5">
                  {item.description}
                </p>
              </div>

              {/* Footer Impact Metric */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{item.impact}</span>
                </div>

                {item.href && (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#2651B9] dark:group-hover:text-[#60A5FA] transition-colors"
                  >
                    <span>View Case</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
