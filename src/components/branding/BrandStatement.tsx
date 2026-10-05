"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "./shared";
import { BRAND_PILLARS } from "./brandingData";

const STATEMENT =
  "Your brand is the first thing people notice and the last thing they forget. We design identities that earn trust before a single word is read.";
const HIGHLIGHTS = new Set(["notice", "forget.", "trust"]);

export const BrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Words fill in as the reader scrolls through the statement
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".statement-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".statement-text",
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative pt-20 sm:pt-28 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Eyebrow>Why branding matters</Eyebrow>

      <h2 className="statement-text mt-6 font-agency text-[28px] sm:text-4xl lg:text-[52px] font-extrabold leading-[1.15] tracking-tight text-white">
        {STATEMENT.split(" ").map((word, i) => (
          <span key={i} className={`statement-word ${HIGHLIGHTS.has(word) ? "text-[#FFA133]" : ""}`}>
            {word}{" "}
          </span>
        ))}
      </h2>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
        {BRAND_PILLARS.map((pillar, i) => (
          <div key={pillar.title} className="brand-reveal border-t border-white/10 pt-5">
            <span className="font-mono text-xs text-[#FFA133]">0{i + 1}</span>
            <h3 className="mt-2 font-agency text-xl font-extrabold text-white">{pillar.title}</h3>
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
