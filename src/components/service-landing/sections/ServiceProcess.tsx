"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "../shared";
import type { ServiceConfig } from "../types";

export const ServiceProcess: React.FC<{ process: ServiceConfig["process"] }> = ({ process }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Orange progress line grows with scroll and lights up each step node as it is reached
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".timeline-list", start: "top 60%", end: "bottom 60%", scrub: true },
          }
        );
        gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
          ScrollTrigger.create({ trigger: node, start: "top 60%", toggleClass: { targets: node, className: "is-active" } });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => node.classList.add("is-active"));
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading eyebrow="How We Work" title={process.title} desc={process.description} className="mb-14 sm:mb-20" />

      <ol className="timeline-list relative space-y-10 lg:space-y-14">
        {/* Track + progress */}
        <span className="absolute left-5 lg:left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-[#2651B9]/30" aria-hidden />
        <span
          className="timeline-progress absolute left-5 lg:left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-[#FF8500] to-[#FFA133]"
          aria-hidden
        />

        {process.steps.map((step, i) => {
          const cardOnLeft = i % 2 === 0;
          return (
            <li key={step.title} className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
              {/* Node */}
              <span
                className="timeline-node absolute left-5 lg:left-1/2 top-5 lg:top-1/2 z-10 flex w-10 h-10 -translate-x-1/2 lg:-translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FF8500]/60 bg-[#081330] font-mono text-sm font-bold text-[#FFA133] transition-colors duration-300 [&.is-active]:bg-[#FF8500] [&.is-active]:border-[#FF8500] [&.is-active]:text-white [&.is-active]:shadow-[0_0_0_6px_rgba(255,133,0,0.15)]"
                aria-hidden
              >
                {i + 1}
              </span>

              {/* Card */}
              <div className={`svc-reveal pl-16 lg:pl-0 lg:row-start-1 ${cardOnLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-2"}`}>
                <div className="rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 sm:p-7 transition-colors hover:border-[#FF8500]/45">
                  <span className="font-mono text-xs text-slate-500">Step 0{i + 1}</span>
                  <h3 className="mt-1 font-agency text-2xl font-extrabold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">{step.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FF8500]/30 bg-[#FF8500]/10 px-3 py-1 text-xs font-semibold text-[#FFA133]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
                    You receive: {step.output}
                  </span>
                </div>
              </div>

              {/* Oversized step number on the opposite side */}
              <div className={`hidden lg:flex lg:row-start-1 ${cardOnLeft ? "lg:col-start-2" : "lg:col-start-1 justify-end"}`} aria-hidden>
                <span className="font-agency text-[120px] font-extrabold leading-none text-white/[0.04] select-none">0{i + 1}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
