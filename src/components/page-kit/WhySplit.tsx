import React from "react";
import { Eyebrow, SectionTitle } from "./shared";
import { StatsBento } from "./StatsBento";
import type { WhyContent } from "./types";

/** Reasons list + tools on the left, agency stats bento on the right. */
export const WhySplit: React.FC<{ why: WhyContent; eyebrow?: string; toolsLabel?: string }> = ({
  why,
  eyebrow = "Why Pixim",
  toolsLabel = "Tools we use",
}) => (
  <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Reasons */}
      <div className="lg:col-span-6">
        <div className="reveal-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionTitle className="mt-4">{why.title}</SectionTitle>
        </div>

        <ul className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {why.items.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="reveal-up flex items-start gap-4 py-5">
              <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl bg-[#FF8500]/12 border border-[#FF8500]/30 text-[#FFA133]">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-agency text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal-up mt-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{toolsLabel}</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {why.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-[#2651B9]/35 bg-[#0C1E4E]/70 px-3 py-1 text-xs text-slate-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stat bento */}
      <StatsBento highlight={why.highlight} className="lg:col-span-6" />
    </div>
  </section>
);
