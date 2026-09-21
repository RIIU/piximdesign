"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapExplodingHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  blastRadius?: number;
  highlightColor?: string;
}

export const GsapExplodingHeading: React.FC<GsapExplodingHeadingProps> = ({
  text,
  className = "",
  as: Component = "h2",
  blastRadius = 45,
  highlightColor = "#FF8500",
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const heading = headingRef.current;
    if (!heading) return;

    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!letters.length) return;

    const total = letters.length;

    // Generate deterministic explosion vectors for this heading
    const vectors = letters.map((_, i) => {
      const centerOffset = (i - (total - 1) / 2) / Math.max(1, (total - 1) / 2);
      const rand = ((i * 23 + text.charCodeAt(i % text.length)) % 100) / 100;
      const arc = (1 - Math.abs(centerOffset)) * 24;

      return {
        dx: centerOffset * blastRadius * 1.5 + (rand - 0.5) * 25,
        dy: -arc + (rand - 0.5) * 35,
        rot: centerOffset * 35 + (rand - 0.5) * 30,
        scale: 0.9 + rand * 0.3,
        opacity: Math.max(0.35, 1 - Math.abs(centerOffset) * 0.4),
      };
    });

    const ctx = gsap.context(() => {
      // Trigger as heading scrolls past center towards top
      ScrollTrigger.create({
        trigger: heading,
        start: "top 65%",
        end: "top 18%",
        scrub: 1.1,
        onUpdate: (self) => {
          const p = self.progress;
          letters.forEach((letter, i) => {
            const v = vectors[i];
            gsap.set(letter, {
              x: v.dx * p,
              y: v.dy * p,
              rotation: v.rot * p,
              scale: 1 + (v.scale - 1) * p,
              opacity: 1 - (1 - v.opacity) * p,
              color: p > 0.4 && i % 4 === 0 ? highlightColor : "inherit",
            });
          });
        },
      });
    }, heading);

    return () => ctx.revert();
  }, [text, blastRadius, highlightColor]);

  const chars = text.split("");

  const Tag = Component as React.ElementType;

  return (
    <Tag
      ref={headingRef}
      className={`inline-block select-none will-change-transform ${className}`}
    >
      {chars.map((char, i) => {
        const isSpace = char === " ";
        return (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="inline-block will-change-transform transition-colors duration-200"
            style={{
              transformOrigin: "center center",
              marginRight: isSpace ? "0.28em" : "0.01em",
            }}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </Tag>
  );
};
