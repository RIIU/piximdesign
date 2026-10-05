"use client";

import React, { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Eyebrow, SectionTitle } from "./shared";
import type { FaqItem } from "./types";

interface FaqSplitProps {
  title: React.ReactNode;
  intro?: string;
  faqs: FaqItem[];
  onAsk: () => void;
  cardTitle?: string;
  cardText?: string;
  cardCta?: string;
}

/** Two-column FAQ: sticky intro + consultation card on the left, accordion on the right. */
export const FaqSplit: React.FC<FaqSplitProps> = ({
  title,
  intro = "Everything you need to know before starting your project with us.",
  faqs,
  onAsk,
  cardTitle = "Talk to a specialist, free.",
  cardText = "A 30-minute call to review your goals and recommend the right scope.",
  cardCta = "Book a free call",
}) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Intro + contact card */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="reveal-up">
              <Eyebrow>FAQ</Eyebrow>
              <SectionTitle className="mt-4">{title}</SectionTitle>
              <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">{intro}</p>
            </div>

            <div className="reveal-up mt-8 relative overflow-hidden rounded-3xl border border-[#FF8500]/30 bg-gradient-to-br from-[#FF8500]/15 via-[#0C1E4E] to-[#0C1E4E] p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">Still unsure?</span>
              <p className="mt-2 font-agency text-xl font-extrabold text-white">{cardTitle}</p>
              <p className="mt-1.5 text-sm text-slate-400">{cardText}</p>
              <button
                type="button"
                onClick={onAsk}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 cursor-pointer"
              >
                {cardCta}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            const panelId = `svc-faq-${idx}`;
            return (
              <div
                key={faq.q}
                className={`reveal-up rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-[#FF8500]/50 bg-[#0C1E4E]/95" : "border-[#2651B9]/30 bg-[#0C1E4E]/60 hover:border-[#FF8500]/35"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                  <span
                    className={`flex w-8 h-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-[#FF8500] bg-[#FF8500] text-white" : "border-[#2651B9]/40 text-slate-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
