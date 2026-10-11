"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "lucide-react";

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
    review:
      "The velocity and senior execution was unmatched. Delivered our complete brand system and UI screens in 10 days flat.",
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

      gsap.from(".testimonial-card", {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

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
        {/* Section Header (1:1 from 2nd reference image) */}
        <div className="testimonial-header text-center max-w-3xl mx-auto mb-14 sm:mb-18 md:mb-20">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            Don&apos;t Just Take Our Word for It
          </h2>

          <p className="font-sherika mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            Real feedback from founders and tech leaders we&apos;ve helped scale across the globe.
          </p>
        </div>

        {/* 4 Testimonial Cards (1:1 from Image: Dark forest/navy tint with green accent line & quote watermark) */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="testimonial-card group relative rounded-[28px] p-6 sm:p-7 bg-[#0b1b36] border border-white/10 hover:border-[#FF8500]/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
            >
              <div>
                {/* Author row with Avatar + Name/Role + Country Flag */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    {/* Rounded avatar pod */}
                    <div className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 shadow-md`}>
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
                  <span className="text-lg shrink-0 opacity-90">{item.flag}</span>
                </div>

                {/* Vertical accent bar + Review Quote */}
                <div className="relative pl-3.5 border-l-2 border-[#FF8500]/60 mt-4">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {item.review}
                  </p>
                </div>
              </div>

              {/* Bottom Huge Watermark Quotation Icon */}
              <div className="mt-8 pt-2 flex justify-end">
                <Quote className="w-10 h-10 text-white/[0.08] group-hover:text-[#FF8500]/25 transition-colors rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
