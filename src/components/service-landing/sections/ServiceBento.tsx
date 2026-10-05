"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, SectionTitle } from "@/components/page-kit/shared";
import type { ServiceConfig } from "../types";

// Fixed 4-column bento: large (2x2), wide, small, small, wide, wide
const LAYOUT = [
  { tile: "md:col-span-2 lg:col-span-2 lg:row-span-2", visual: "min-h-[220px] lg:min-h-0" },
  { tile: "md:col-span-2 lg:col-span-2", visual: "min-h-[140px] lg:min-h-0" },
  { tile: "", visual: "min-h-[140px] lg:min-h-0" },
  { tile: "", visual: "min-h-[140px] lg:min-h-0" },
  { tile: "md:col-span-2 lg:col-span-2", visual: "min-h-[160px] lg:min-h-0" },
  { tile: "md:col-span-2 lg:col-span-2", visual: "min-h-[160px] lg:min-h-0" },
];

interface ServiceBentoProps {
  bento: ServiceConfig["bento"];
  onSelect: (tileTitle: string) => void;
  onDiscuss: () => void;
}

export const ServiceBento: React.FC<ServiceBentoProps> = ({ bento, onSelect, onDiscuss }) => (
  <section id="service-offerings" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
      <div className="max-w-2xl">
        <Eyebrow>{bento.eyebrow}</Eyebrow>
        <SectionTitle className="mt-4">{bento.title}</SectionTitle>
      </div>
      <div className="max-w-sm">
        <p className="text-slate-400 leading-relaxed">{bento.description}</p>
        <button
          type="button"
          onClick={onDiscuss}
          className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#FFA133] hover:text-white transition-colors cursor-pointer"
        >
          Discuss your project
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[268px] gap-5">
      {bento.tiles.map((tile, i) => {
        const layout = LAYOUT[i] ?? LAYOUT[2];
        return (
          <button
            key={tile.title}
            type="button"
            onClick={() => onSelect(tile.title)}
            className={`reveal-up group relative flex flex-col overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 text-left transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF8500]/55 hover:shadow-[0_20px_45px_-18px_rgba(255,133,0,0.35)] cursor-pointer ${layout.tile}`}
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,133,0,0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className={`relative flex-1 overflow-hidden p-5 sm:p-6 pb-0 ${layout.visual}`} aria-hidden>
              {tile.visual}
            </div>

            <div className="relative flex items-end justify-between gap-4 p-5 sm:p-6">
              <div>
                <h3 className="font-agency text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors">
                  {tile.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400 leading-snug">{tile.desc}</p>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-full border border-[#2651B9]/35 bg-[#081330] flex items-center justify-center text-slate-300 transition-all duration-300 group-hover:bg-[#FF8500] group-hover:border-[#FF8500] group-hover:text-white">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </section>
);
