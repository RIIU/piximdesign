"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Star, Quote, CheckCircle2, Pause, Play } from "lucide-react";
import { TESTIMONIALS } from "@/data/agencyData";

export interface ReviewItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  highlight: string;
  projectType?: string;
}

interface GsapReviewsInfiniteSliderProps {
  reviews?: ReviewItem[];
  speed?: number; // duration of one full cycle in seconds
  reverse?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
  twoRows?: boolean; // render two opposite-flowing rows for maximum luxury feel
}

export const GsapReviewsInfiniteSlider: React.FC<GsapReviewsInfiniteSliderProps> = ({
  reviews = TESTIMONIALS,
  speed = 42,
  reverse = false,
  className = "",
  title = "What Global Brands & Founders Say",
  subtitle = "VERIFIED CLIENT REVIEWS",
  twoRows = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const tween1Ref = useRef<gsap.core.Tween | null>(null);
  const tween2Ref = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Setup infinite ticker using GSAP modifiers
  useEffect(() => {
    const track1 = track1Ref.current;
    if (!track1) return;

    const ctx = gsap.context(() => {
      // Calculate single set width by dividing scrollWidth by repeat count (3)
      const singleSetWidth1 = track1.scrollWidth / 3;

      gsap.set(track1, { x: 0 });

      tween1Ref.current = gsap.to(track1, {
        x: reverse ? `+=${singleSetWidth1}` : `-=${singleSetWidth1}`,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const current = parseFloat(x);
            if (reverse) {
              return (current % singleSetWidth1) - singleSetWidth1;
            }
            return current % singleSetWidth1;
          }),
        },
      });

      // If two rows requested, setup second row moving in opposite direction
      if (twoRows && track2Ref.current) {
        const track2 = track2Ref.current;
        const singleSetWidth2 = track2.scrollWidth / 3;
        gsap.set(track2, { x: -singleSetWidth2 / 2 });

        tween2Ref.current = gsap.to(track2, {
          x: reverse ? `-=${singleSetWidth2}` : `+=${singleSetWidth2}`,
          duration: speed * 1.15,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => {
              const current = parseFloat(x);
              return current % singleSetWidth2;
            }),
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reviews, speed, reverse, twoRows]);

  // Pause when offscreen to save 100% CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isPaused) {
            tween1Ref.current?.resume();
            tween2Ref.current?.resume();
          }
        } else {
          tween1Ref.current?.pause();
          tween2Ref.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPaused]);

  // Hover slow down for comfortable reading
  const handleMouseEnter = () => {
    if (isPaused) return;
    if (tween1Ref.current) gsap.to(tween1Ref.current, { timeScale: 0.2, duration: 0.5 });
    if (tween2Ref.current) gsap.to(tween2Ref.current, { timeScale: 0.2, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    if (isPaused) return;
    if (tween1Ref.current) gsap.to(tween1Ref.current, { timeScale: 1, duration: 0.5 });
    if (tween2Ref.current) gsap.to(tween2Ref.current, { timeScale: 1, duration: 0.5 });
  };

  // Toggle pause/play
  const togglePause = () => {
    if (isPaused) {
      tween1Ref.current?.play();
      tween2Ref.current?.play();
      setIsPaused(false);
    } else {
      tween1Ref.current?.pause();
      tween2Ref.current?.pause();
      setIsPaused(true);
    }
  };

  // Triple items for seamless loop coverage on ultra-wide screens
  const repeatedReviews = [...reviews, ...reviews, ...reviews];
  const row2Reviews = [...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse()];

  const renderCard = (t: ReviewItem, idx: number) => (
    <div
      key={`${t.author}-${idx}`}
      className="group relative w-[320px] sm:w-[410px] shrink-0 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/25 dark:border-[#FF8500]/35 hover:border-[#FF8500]/60 transition-all duration-300 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-default"
    >
      {/* Pixim Brand Ambient Glow (normally visible) */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#FF8500]/12 via-[#2651B9]/6 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Meta Row: Stars & Highlight Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: t.rating || 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-500 group-hover:scale-110 transition-transform"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Verified
            </span>
            {t.highlight && (
              <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 border border-[#FF8500]/25 dark:border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133]">
                {t.highlight}
              </span>
            )}
          </div>
        </div>

        {/* Quote text */}
        <div className="relative mt-2">
          <Quote className="w-5 h-5 text-orange-500/40 mb-2 group-hover:text-orange-500/70 transition-colors" />
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal italic">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-orange-500/60 shrink-0 group-hover:border-orange-500 group-hover:scale-105 transition-all">
          <Image
            src={t.avatar}
            alt={t.author}
            width={44}
            height={44}
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#FF8500] transition-colors truncate">
            {t.author}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {t.role} • <span className="text-[#C25E00] dark:text-[#FFA133] font-bold">{t.company}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`relative w-full py-12 overflow-hidden ${className}`}>
      {/* Ambient background brand halos (GPU radial-gradient, zero blur cost) */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 94, 30, 0.08) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-agency text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
                {title}
              </h2>
            )}
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Real feedback from industry leaders, startup founders, and retail brands scaling with Pixim Design.
            </p>
          </div>

          {/* Interactive Pause & Status Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePause}
              aria-label={isPaused ? "Resume Infinite Review Slider" : "Pause Infinite Review Slider"}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isPaused
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
                  : "bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 shadow-sm"
              }`}
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? "Paused" : "Hover to Slow"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Left/Right Edge Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-r from-[#081330] via-[#081330]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-l from-[#081330] via-[#081330]/90 to-transparent z-10" />

      {/* Slider Container */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden select-none flex flex-col gap-6"
      >
        {/* Track 1: Moving left */}
        <div
          ref={track1Ref}
          className="flex gap-5 sm:gap-6 w-max will-change-transform py-2 px-4"
        >
          {repeatedReviews.map((item, idx) => renderCard(item, idx))}
        </div>

        {/* Track 2: If enabled, moving in opposite direction for dense luxury feel */}
        {twoRows && (
          <div
            ref={track2Ref}
            className="flex gap-5 sm:gap-6 w-max will-change-transform py-2 px-4"
          >
            {row2Reviews.map((item, idx) => renderCard(item, idx + 100))}
          </div>
        )}
      </div>
    </section>
  );
};
