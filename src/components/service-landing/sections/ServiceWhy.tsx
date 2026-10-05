import React from "react";
import { Star } from "lucide-react";
import { AGENCY_STATS } from "@/data/agencyData";
import { Eyebrow, SampleMark, SectionTitle } from "../shared";
import type { ServiceConfig } from "../types";

const [BRANDS, YEARS, , RATING] = AGENCY_STATS;

export const ServiceWhy: React.FC<{ why: ServiceConfig["why"] }> = ({ why }) => (
  <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Reasons */}
      <div className="lg:col-span-6">
        <div className="svc-reveal">
          <Eyebrow>Why Pixim</Eyebrow>
          <SectionTitle className="mt-4">{why.title}</SectionTitle>
        </div>

        <ul className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {why.items.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="svc-reveal flex items-start gap-4 py-5">
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

        <div className="svc-reveal mt-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Tools we use</span>
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
      <div className="lg:col-span-6 grid grid-cols-2 gap-4 auto-rows-[minmax(150px,auto)]">
        <div className="svc-reveal relative row-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-6 flex flex-col justify-between shadow-[0_25px_60px_-20px_rgba(255,133,0,0.55)]">
          <SampleMark className="absolute -right-12 -top-12 w-44 h-44 opacity-15" color="#FFFFFF" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Track record</span>
          <div className="relative">
            <span className="block font-agency text-5xl sm:text-7xl font-extrabold text-white leading-none">{BRANDS.value}</span>
            <span className="mt-2 block text-base font-bold text-white">{BRANDS.label}</span>
            <span className="block text-sm text-white/80">{BRANDS.detail}</span>
          </div>
        </div>

        <div className="svc-reveal rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 flex flex-col justify-between">
          <div className="flex text-[#FFA133]" aria-hidden>
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <div>
            <span className="block font-agency text-4xl sm:text-5xl font-extrabold text-white leading-none">
              {RATING.value.replace("★", "")}
            </span>
            <span className="mt-1 block text-sm font-semibold text-slate-300">{RATING.label}</span>
          </div>
        </div>

        <div className="svc-reveal rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 flex flex-col justify-end">
          <span className="block font-agency text-4xl sm:text-5xl font-extrabold text-white leading-none">
            {YEARS.value.replace("+", "")}
            <span className="text-[#FF8500]">+</span>
          </span>
          <span className="mt-1 block text-sm font-semibold text-slate-300">{YEARS.label}</span>
        </div>

        <div className="svc-reveal col-span-2 rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/80 p-5 sm:p-6 flex flex-col gap-4">
          <div>
            <span className="block font-agency text-4xl font-extrabold text-white leading-none">{why.highlight.value}</span>
            <span className="mt-1 block text-sm font-semibold text-slate-300">{why.highlight.label}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {why.highlight.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-lg border border-[#FF8500]/30 bg-[#FF8500]/10 px-2.5 py-1.5 font-mono text-xs font-bold text-[#FFA133]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
