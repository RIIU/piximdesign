"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "./shared";
import type { ShowcasePanel } from "./types";

interface StickyShowcaseProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  panels: ShowcasePanel[];
  ctaLabel: string;
  onStart: () => void;
  secondary?: { label: string; href: string };
  id?: string;
}

/** Sticky split: index on the left stays pinned while visual panels scroll past on the right. */
export const StickyShowcase: React.FC<StickyShowcaseProps> = ({
  eyebrow,
  title,
  description,
  panels,
  ctaLabel,
  onStart,
  secondary = { label: "See our projects", href: "/projects" },
  id = "showcase",
}) => {
  const showcase = { eyebrow, title, description, panels, ctaLabel };
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Highlight the index item whose panel crosses the middle of the viewport
  useEffect(() => {
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => Boolean(p));
    if (!panels.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    panels.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  const scrollToPanel = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id={id}
      className="relative py-20 sm:py-28"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 45% at 15% 25%, rgba(255,133,0,0.10) 0%, rgba(38,81,185,0.14) 50%, transparent 80%), linear-gradient(to bottom, #081330, #0B1E52, #081330)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky intro + index */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="reveal-up">
              <Eyebrow>{showcase.eyebrow}</Eyebrow>
              <SectionTitle className="mt-4">{showcase.title}</SectionTitle>
              <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">{showcase.description}</p>
            </div>

            <ol className="mt-8 hidden lg:block space-y-1.5">
              {showcase.panels.map((panel, i) => {
                const isActive = active === i;
                return (
                  <li key={panel.id}>
                    <button
                      type="button"
                      onClick={() => scrollToPanel(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group w-full flex items-start gap-4 rounded-2xl px-4 py-3 text-left transition-colors cursor-pointer ${
                        isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex w-8 h-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-300 ${
                          isActive ? "bg-[#FF8500] border-[#FF8500] text-white" : "border-[#2651B9]/35 text-slate-500"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-agency text-lg font-extrabold transition-colors duration-300 ${
                            isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        >
                          {panel.title}
                        </span>
                        <span
                          className={`grid transition-all duration-300 ${
                            isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden text-sm text-slate-400 leading-relaxed">{panel.desc}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="reveal-up mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 cursor-pointer"
              >
                {showcase.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                {secondary.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Visual panels */}
        <div className="lg:col-span-7 space-y-6">
          {showcase.panels.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              data-index={i}
              className={`reveal-up rounded-[28px] border bg-[#0C1E4E]/80 backdrop-blur-xl p-5 sm:p-7 transition-colors duration-500 ${
                active === i ? "border-[#FF8500]/45" : "border-[#2651B9]/30"
              }`}
            >
              <div className="mb-5 flex items-start gap-3">
                <span className="font-mono text-xs text-[#FFA133] mt-1">0{i + 1}</span>
                <div>
                  <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white">{panel.title}</h3>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed lg:hidden">{panel.desc}</p>
                </div>
              </div>
              <div aria-hidden>{panel.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
