"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface GsapTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const GsapTextReveal: React.FC<GsapTextRevealProps> = ({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0.1,
  duration = 0.8,
  stagger = 0.04,
  highlightWords = [],
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133]",
}) => {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".gsap-reveal-word");
    if (!words.length) return;

    // High performance GSAP stagger reveal with subtle blur removal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: 36,
          opacity: 0,
          filter: "blur(8px)",
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger]);

  // Split text into words while keeping highlighted styling
  const rawWords = text.split(" ");

  return (
    <Tag ref={containerRef as React.Ref<HTMLHeadingElement>} className={`overflow-hidden ${className}`}>
      {rawWords.map((word, index) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span
            key={index}
            className={`gsap-reveal-word inline-block will-change-transform mr-[0.28em] ${
              isHighlight ? highlightClass : ""
            }`}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
};
