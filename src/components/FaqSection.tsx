"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/agencyData";
import { HelpCircle, ChevronDown } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2651B9]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
          Frequently Asked <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Clear answers about our consultation, deliverables, mobile responsiveness, and branding packages.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4 relative z-10">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] ${
                isOpen
                  ? "bg-white/95 dark:bg-[#0C1E4E]/95 border-[#FF8500]/60 shadow-[0_8px_30px_rgba(255,133,0,0.15)] ring-2 ring-[#FF8500]/30"
                  : "bg-white/80 dark:bg-[#0C1E4E]/80 border-[#2651B9]/20 dark:border-[#2651B9]/30 hover:border-[#FF8500]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_20px_rgba(8,19,48,0.4)]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border transition-colors ${
                    isOpen
                      ? "bg-[#FF8500]/10 dark:bg-[#FF8500]/20 border-[#FF8500]/30 text-[#C25E00] dark:text-[#FFA133]"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`p-1.5 rounded-full border transition-transform duration-300 shrink-0 ${
                    isOpen
                      ? "rotate-180 text-[#C25E00] dark:text-[#FFA133] border-[#FF8500]/30 bg-[#FF8500]/10 dark:bg-[#FF8500]/20"
                      : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
