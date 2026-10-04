"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { COMPARISON_COLUMNS, COMPARISON_ROWS } from "@/data/agencyData";
import { GsapMagneticButton } from "@/components/animations";

// Index of the highlighted "Pixim Design" column
const PIXIM_COL = 1;

const CellValue: React.FC<{ value: string | boolean; highlight: boolean }> = ({ value, highlight }) => {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
          highlight ? "bg-[#FF8500] text-white shadow-md shadow-orange-500/30" : "bg-white/[0.08] text-slate-300"
        }`}
      >
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.04] text-slate-600">
        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return (
    <span className={highlight ? "font-bold text-white" : "text-slate-400"}>
      {value}
    </span>
  );
};

interface WhyPiximSectionProps {
  onOpenContact?: (service?: string, note?: string) => void;
}

export const WhyPiximSection: React.FC<WhyPiximSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".why-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const lastRow = COMPARISON_ROWS.length - 1;

  return (
    <section
      id="why-pixim"
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#2651B9]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="why-reveal text-center max-w-3xl mx-auto mb-12 sm:mb-14 relative z-10">
        <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
          Agency Quality, <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Without the Agency Overhead
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          The reliability of a full studio with the speed and price of a freelancer. Here&apos;s how we compare.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="relative z-10" role="table" aria-label="Pixim Design compared with freelancers and big agencies">
        {/* Column headers */}
        <div role="row" className="why-reveal grid grid-cols-3 md:grid-cols-[1.5fr_1fr_1.2fr_1fr] items-end">
          <div className="hidden md:block" role="columnheader">
            <span className="sr-only">Feature</span>
          </div>
          {COMPARISON_COLUMNS.map((col, i) => {
            const isPixim = i === PIXIM_COL;
            return (
              <div
                key={col}
                role="columnheader"
                className={`text-center px-2 sm:px-4 ${
                  isPixim
                    ? "relative pt-6 pb-4 rounded-t-3xl bg-gradient-to-b from-[#FF8500]/20 to-[#FF8500]/[0.07] border-x border-t border-[#FF8500]/45"
                    : "pb-4"
                }`}
              >
                {isPixim && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-white shadow-md shadow-orange-500/30">
                    <Sparkles className="w-3 h-3" />
                    Best Value
                  </span>
                )}
                <span
                  className={`font-agency text-sm sm:text-lg md:text-xl font-extrabold tracking-tight ${
                    isPixim ? "text-white" : "text-slate-400"
                  }`}
                >
                  {col}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rows */}
        {COMPARISON_ROWS.map((row, rowIdx) => (
          <div
            key={row.label}
            role="row"
            className="why-reveal grid grid-cols-3 md:grid-cols-[1.5fr_1fr_1.2fr_1fr] md:items-stretch"
          >
            {/* Feature label: full-width on mobile, first column on desktop */}
            <div
              role="rowheader"
              className="col-span-3 md:col-span-1 flex items-center pt-5 pb-2 md:py-5 md:pr-6 text-sm sm:text-base font-semibold text-slate-200 border-t border-white/[0.07]"
            >
              {row.label}
            </div>

            {row.values.map((value, colIdx) => {
              const isPixim = colIdx === PIXIM_COL;
              return (
                <div
                  key={colIdx}
                  role="cell"
                  className={`flex items-center justify-center text-center px-2 sm:px-4 py-3 md:py-5 text-xs sm:text-sm md:border-t ${
                    isPixim
                      ? `bg-[#FF8500]/[0.07] border-x border-[#FF8500]/45 md:border-t-[#FF8500]/15 ${
                          rowIdx === lastRow ? "rounded-b-3xl border-b" : ""
                        }`
                      : "md:border-white/[0.07]"
                  }`}
                >
                  <CellValue value={value} highlight={isPixim} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="why-reveal relative z-10 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <GsapMagneticButton
          onClick={() => onOpenContact?.("Free Quote", "I'd like a free quote for my brand project.")}
          variant="primary"
          strength={0.25}
          className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white shadow-lg shadow-orange-500/25"
        >
          <span>Get a Free Quote</span>
          <ArrowRight className="w-4 h-4" />
        </GsapMagneticButton>
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
        >
          See transparent pricing
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};
