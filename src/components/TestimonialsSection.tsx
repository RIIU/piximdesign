"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse drag support for desktop
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Animate on scroll trigger
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

      gsap.from(".testimonial-carousel-wrap", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".testimonial-carousel-wrap",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  // Helper to scroll by 1 card step
  const scrollByCard = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector<HTMLElement>(".testimonial-card");
    const step = card ? card.offsetWidth + 24 : 380;

    if (direction === "right") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -step, behavior: "smooth" });
      }
    }
  }, []);

  // Jump to specific slide index
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector<HTMLElement>(".testimonial-card");
    const step = card ? card.offsetWidth + 24 : 380;
    container.scrollTo({ left: index * step, behavior: "smooth" });
    setActiveIndex(index);
  };

  // Sync active dot on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector<HTMLElement>(".testimonial-card");
    const step = card ? card.offsetWidth + 24 : 380;
    const index = Math.round(container.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(0, index), TESTIMONIALS_DATA.length - 1));
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      scrollByCard("right");
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, scrollByCard]);

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 md:py-32 bg-[#050e24] overflow-hidden select-none"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.4) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="testimonial-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
              Don&apos;t Just Take Our Word for It
            </h2>

            <p className="font-sherika mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
              Real feedback from founders and tech leaders we&apos;ve helped scale across the globe.
            </p>
          </div>

          {/* Desktop Top-Right Prev/Next Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollByCard("left")}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-black border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByCard("right")}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-black border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ==============================================================
            INTERACTIVE TESTIMONIALS CAROUSEL
           ============================================================== */}
        <div className="testimonial-carousel-wrap relative">
          {/* Scrollable Track */}
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              handleMouseUp();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onScroll={handleScroll}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3 px-1 cursor-grab active:cursor-grabbing"
          >
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="testimonial-card snap-start shrink-0 w-[84vw] sm:w-[350px] md:w-[380px] lg:w-[400px] group relative rounded-[28px] p-6 sm:p-7 bg-[#0b1b36] border border-white/10 hover:border-[#FF8500]/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Row: Stars + Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#FFA133]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFA133] text-[#FFA133]" />
                      ))}
                    </div>

                    {item.tag && (
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Author row with Avatar + Name/Role + Country Flag */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      {/* Rounded avatar pod */}
                      <div
                        className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-md`}
                      >
                        {item.initials}
                      </div>

                      <div>
                        <h3 className="font-agency text-base sm:text-lg font-bold text-white leading-tight">
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
                  <div className="relative pl-3.5 border-l-2 border-[#FF8500]/70 mt-3">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Huge Watermark Quotation Icon */}
                <div className="mt-8 pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Client
                  </span>
                  <Quote className="w-8 h-8 text-white/[0.08] group-hover:text-[#FF8500]/25 transition-colors rotate-180" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation & Indicator Dots */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => scrollByCard("left")}
              className="md:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-black border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-8 bg-[#FF8500]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollByCard("right")}
              className="md:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF8500] hover:text-black border border-white/10 hover:border-[#FF8500] text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
