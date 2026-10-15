"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, ChevronLeft, ChevronRight, Star, Pause, Play, Sparkles, CheckCircle2 } from "lucide-react";

interface TestimonialsSectionProps {
  onOpenContact?: () => void;
}

const TESTIMONIALS_DATA = [
  {
    id: "1",
    author: "Nicolas Jaccard",
    role: "Principal AI Architect, Orbis International",
    flag: "🇺🇸",
    avatarBg: "bg-emerald-600",
    initials: "NJ",
    rating: 5,
    tag: "Telemedicine Platform",
    review:
      "We hired Pixim for our telemedicine and e-learning platform. Thanks to them, we're now training 5K+ healthcare professionals effectively with our solution.",
  },
  {
    id: "2",
    author: "Sharon Winson",
    role: "General Manager, Permeco Group Ltd",
    flag: "🇬🇧",
    avatarBg: "bg-blue-600",
    initials: "SW",
    rating: 5,
    tag: "Enterprise App UX",
    review:
      "They paid special attention to how people were using our app and gave it a more organized design. You could tell the difference immediately.",
  },
  {
    id: "3",
    author: "Nathan Jespersen",
    role: "Owner, Anytime Fitness",
    flag: "🇺🇸",
    avatarBg: "bg-amber-600",
    initials: "NJ",
    rating: 5,
    tag: "Fitness Mobile App",
    review:
      "Thank you for such an outstanding UX flow for my fitness app. Pixim went the extra effort and hope to work with them again.",
  },
  {
    id: "4",
    author: "Henrik Lindqvist",
    role: "Head of Product, Nordic Tech Labs",
    flag: "🇳🇴",
    avatarBg: "bg-rose-600",
    initials: "HL",
    rating: 5,
    tag: "10-Day Rapid Delivery",
    review:
      "The velocity and senior execution was unmatched. Delivered our complete brand system and UI screens in 10 days flat.",
  },
  {
    id: "5",
    author: "Ariful Islam",
    role: "Founder, Shop BD",
    flag: "🇧🇩",
    avatarBg: "bg-purple-600",
    initials: "AI",
    rating: 5,
    tag: "E-Commerce Growth",
    review:
      "Creative, responsive, and affordable. Best design agency I have worked with in Bangladesh. They took our brand identity to the next level.",
  },
  {
    id: "6",
    author: "Zarin Tasnim",
    role: "Creative Director, Luxe Media",
    flag: "🇦🇪",
    avatarBg: "bg-teal-600",
    initials: "ZT",
    rating: 5,
    tag: "Brand & Video Ads",
    review:
      "I needed video ads and packaging delivered fast. Pixim delivered within a short turnaround without compromising an ounce of quality.",
  },
  {
    id: "7",
    author: "Sakib Ahmed",
    role: "CEO, TechBD",
    flag: "🇧🇩",
    avatarBg: "bg-cyan-600",
    initials: "SA",
    rating: 5,
    tag: "SaaS Redesign",
    review:
      "Provides professional consultation and top-tier product designs. Their work helped us scale user conversion by 40%.",
  },
  {
    id: "8",
    author: "Nusrat Jahan",
    role: "CEO, Organic Glow",
    flag: "🇸🇬",
    avatarBg: "bg-orange-600",
    initials: "NJ",
    rating: 5,
    tag: "Packaging & Identity",
    review:
      "Fast delivery, world-class packaging and high-quality graphics. Pixim Design is now our permanent design partner for all products.",
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple items for gapless infinite translation
  const infiniteReviews = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  // GSAP continuous fast infinite carousel setup
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Width of a single set of 8 cards
      const singleSetWidth = track.scrollWidth / 3;
      gsap.set(track, { x: 0 });

      // Fast, continuous, ultra-smooth conveyor (26s per full cycle across 8 cards)
      tweenRef.current = gsap.to(track, {
        x: `-=${singleSetWidth}`,
        duration: 26,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const current = parseFloat(x);
            return current % singleSetWidth;
          }),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause when off-screen to preserve 100% CPU/GPU performance
  useEffect(() => {
    const el = sectionRef.current;
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

  // Entrance animations on scroll
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".testimonial-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".testimonial-fast-carousel-wrap", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".testimonial-fast-carousel-wrap",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  // Smooth hover slow-down: slows to 15% speed so the user can easily read any card
  const handleMouseEnter = () => {
    if (isPaused) return;
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.4 });
    }
  };

  // Resume full brisk velocity when mouse leaves
  const handleMouseLeave = () => {
    if (isPaused) return;
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
    }
  };

  // Toggle Pause/Play
  const togglePause = () => {
    if (isPaused) {
      tweenRef.current?.resume();
      if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.3 });
      setIsPaused(false);
    } else {
      tweenRef.current?.pause();
      setIsPaused(true);
    }
  };

  // Manual fast-skip buttons (nudge carousel by 420px forward/backward)
  const handleNudge = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const delta = direction === "right" ? -420 : 420;
    gsap.to(track, {
      x: `+=${delta}`,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-16 bg-[#050e24] overflow-hidden select-none"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.4) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="testimonial-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8500]/10 border border-[#FF8500]/25 text-[#FF8500] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Stories</span>
            </div>

            <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
              Don&apos;t Just Take Our Word for It
            </h2>

            <p className="font-sherika mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
              Real feedback from founders and tech leaders we&apos;ve helped scale across the globe.
            </p>
          </div>

          {/* Interactive Fast Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Pause / Resume Pill */}
            <button
              onClick={togglePause}
              className={`px-3.5 py-2 rounded-full border text-xs font-mono font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                isPaused
                  ? "bg-[#FF8500]/20 text-[#FFA133] border-[#FF8500]/50"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
              aria-label={isPaused ? "Resume fast carousel" : "Pause fast carousel"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? "Paused" : "Hover to Slow"}</span>
            </button>

            {/* Fast Manual Nudge Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNudge("left")}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-[#081330] border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNudge("right")}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-[#081330] border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          FAST CONTINUOUS INFINITE CAROUSEL TRACK
         ============================================================== */}
      <div
        className="testimonial-fast-carousel-wrap relative w-full overflow-hidden select-none py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left & Right Smooth Dark Alpha Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050e24] via-[#050e24]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050e24] via-[#050e24]/80 to-transparent z-20" />

        {/* Continuous Gliding Track */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 w-max will-change-transform py-3 px-4"
        >
          {infiniteReviews.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="testimonial-card w-[320px] sm:w-[380px] lg:w-[410px] shrink-0 group relative rounded-[26px] p-6 sm:p-7 bg-[#0b1b36] border border-white/10 hover:border-[#FF8500]/60 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2 cursor-pointer"
            >
              {/* Subtle hover gradient halo */}
              <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-[#FF8500]/15 via-transparent to-[#38BDF8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                {/* Top Row: Stars + Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#FFA133]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFA133] text-[#FFA133]" />
                    ))}
                  </div>

                  {item.tag && (
                    <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Author row with Avatar + Name/Role + Country Flag */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rounded avatar pod */}
                    <div
                      className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-md`}
                    >
                      {item.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-agency text-base sm:text-lg font-bold text-white leading-tight truncate group-hover:text-[#FFA229] transition-colors">
                        {item.author}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Flag */}
                  <span className="text-xl shrink-0 opacity-90">{item.flag}</span>
                </div>

                {/* Vertical accent bar + Review Quote */}
                <div className="relative pl-3.5 border-l-2 border-[#FF8500]/70 mt-2">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Row: Verified Client Badge + Watermark Quote Icon */}
              <div className="relative z-10 mt-6 pt-3 flex items-center justify-between border-t border-white/5">
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Review
                </span>
                <Quote className="w-7 h-7 text-white/[0.08] group-hover:text-[#FF8500]/25 transition-colors rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
