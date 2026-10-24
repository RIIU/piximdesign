"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  X,
  Layers,
} from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";

interface BrandStoriesSectionProps {
  onOpenContact?: () => void;
}

export const BrandStoriesSection: React.FC<BrandStoriesSectionProps> = ({ onOpenContact }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);



  return (
    <section
      ref={sectionRef}
      id="portfolioSection"
      className="steps-section relative py-10 sm:py-14 lg:py-16 overflow-x-clip bg-gradient-to-b from-[#081330] via-[#0B1E52] to-[#081330]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 65% 50% at 20% 30%, rgba(255, 133, 0, 0.12) 0%, rgba(38, 81, 185, 0.16) 50%, transparent 80%)",
      }}
    >
      {/* Decorative background workshape line */}
      <div className="common-line-shape-animation absolute bottom-0 left-0 z-10 pointer-events-none opacity-25">
        <Image
          src="/images/case-studies/workshape.svg"
          alt="decorative shape"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto"
        />
      </div>

      {/* Main Split Layout Container */}
      <div className="max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-16">
          
          {/* Left Column: Fixed / Sticky Text & CTA on Top Left */}
          <div className="steps-left w-full lg:w-[42%] xl:w-[40%] flex flex-col relative z-10 self-stretch">
            <div
              ref={leftContentRef}
              className="left-content lg:sticky lg:top-28 xl:top-32 flex flex-col items-center lg:items-start text-center lg:text-left justify-start py-4"
            >
              <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-6 text-center lg:text-left">
                Experience Brand <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Stories in Design
                </span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[#A7BDB5] leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 font-normal text-center lg:text-left">
                At Pixim, we believe design is more than just look and feel. It takes the end user through a mesmerizing journey that ends in conversion without any friction.
              </p>

              {/* Pixim Mega Reveal CTA Button */}
              <div className="flex justify-center lg:justify-start w-full">
                <Link
                  href="/projects"
                  prefetch={true}
                  className="group relative inline-flex items-center gap-3.5 px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-[#FF8500]/25 transition-all duration-300 hover:shadow-[#FF8500]/40 hover:scale-[1.02] active:scale-95"
                >
                  <span>See More Projects</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Case Studies Image Cards (Mobile sticky-stacking cards, sticky-scrolling on desktop) */}
          <div
            ref={rightColRef}
            className="steps-right w-full lg:w-[58%] xl:w-[60%] flex flex-col gap-8 sm:gap-10 lg:gap-14 relative z-10 pb-16 sm:pb-24 lg:pb-0"
          >
            {CASE_STUDIES.map((study, index) => {
              // Mobile sticky stack offset: each card stays sticky and subsequent cards overlap cleanly
              const topOffsetMobile = 74 + index * 8;
              const zIndexMobile = 10 + index;

              return (
              <div
                key={study.id}
                onClick={() => setActiveCaseStudy(study)}
                style={{
                  top: topOffsetMobile,
                  zIndex: zIndexMobile,
                }}
                className="step-content portfolio-card cursor-pointer group w-full sticky lg:static rounded-2xl sm:rounded-3xl bg-[#081330] border border-blue-400/25 p-2 sm:p-2.5 shadow-[0_-8px_24px_-4px_rgba(4,10,28,0.7),0_20px_35px_-5px_rgba(0,0,0,0.85)] lg:bg-transparent lg:border-0 lg:p-0 lg:shadow-none transition-all duration-300"
              >
                <div className="portfolio-work-item relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-blue-400/20 hover:border-[#FF8500]/60 transition-all duration-500 shadow-xl bg-[#0C1E4E]">
                  {/* Top Badges: 01 / 05 hidden on mobile per user request */}
                  <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-30 flex items-center justify-between pointer-events-none gap-2">
                    {/* Number Badge: Hidden on mobile */}
                    <span className="hidden sm:inline-flex shrink-0 font-mono text-xs font-black tracking-widest text-[#FFA133] px-3.5 py-1.5 rounded-full bg-[#081330]/85 backdrop-blur-md border border-[#FF8500]/30 shadow-lg">
                      {study.number} / 05
                    </span>
                    {/* Category Badge */}
                    <span className="ml-auto text-[11px] sm:text-xs font-semibold text-slate-200 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#081330]/85 backdrop-blur-md border border-white/15 shadow-lg">
                      {study.category}
                    </span>
                  </div>

                  {/* High-Resolution Mockup Image */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[736/491] overflow-hidden bg-slate-900">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 736px, 736px"
                      className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Backdrop Blur Overlay on Hover - only bottom half (desktop) */}
                  <div className="work-item-overlay absolute inset-x-0 bottom-0 h-[56%] pointer-events-none z-10 rounded-b-2xl sm:rounded-b-3xl" />

                  {/* Hover Information Box with 3 Metric Pills + View Details (desktop only) */}
                  <div className="all-portfolio-info absolute inset-x-0 bottom-0 p-5 sm:p-7 xl:p-8 z-20 hidden lg:flex flex-col justify-end">
                    {/* Top Stats Row: 3 metric highlight boxes */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mb-5">
                      {/* Box 1 */}
                      <div className="work-box-info bg-[#081330]/95 border border-blue-400/25 p-3 sm:p-4 rounded-2xl flex flex-col justify-between shadow-xl">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                          <Image
                            src={study.stat1.icon}
                            alt=""
                            width={28}
                            height={28}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                        </div>
                        <div>
                          <p className="text-white text-base sm:text-xl font-bold leading-tight">
                            {study.stat1.value}
                          </p>
                          <p className="text-slate-400 text-[11px] sm:text-xs line-clamp-1 mt-0.5">
                            {study.stat1.label}
                          </p>
                        </div>
                      </div>

                      {/* Box 2 */}
                      <div className="work-box-info bg-[#081330]/95 border border-blue-400/25 p-3 sm:p-4 rounded-2xl flex flex-col justify-between shadow-xl">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                          <Image
                            src={study.stat2.icon}
                            alt=""
                            width={28}
                            height={28}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                        </div>
                        <div>
                          <p className="text-white text-base sm:text-xl font-bold leading-tight">
                            {study.stat2.value}
                          </p>
                          <p className="text-slate-400 text-[11px] sm:text-xs line-clamp-1 mt-0.5">
                            {study.stat2.label}
                          </p>
                        </div>
                      </div>

                      {/* Box 3: View Details CTA */}
                      <div className="work-box-info bg-gradient-to-br from-[#FF8500]/30 to-[#2651B9]/30 border border-[#FF8500]/50 p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center group/btn hover:bg-[#FF8500]/40 transition-colors shadow-xl">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white flex items-center justify-center mb-1.5 shadow-md shadow-[#FF8500]/30 transition-transform group-hover/btn:scale-110">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <p className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                          View details
                        </p>
                      </div>
                    </div>

                    {/* Title & Tagline inside Hover Overlay */}
                    <div className="text-left">
                      <h3 className="font-agency text-white text-base sm:text-xl font-bold mb-1.5 line-clamp-1 text-[#FFA133]">
                        {study.title}
                      </h3>
                      <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 font-normal">
                        {study.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Mobile Card Footer (High-end agency styling) */}
                <div className="lg:hidden mt-3 px-1.5 flex items-center justify-between gap-3 text-left">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-agency text-base font-bold text-white tracking-tight truncate group-hover:text-[#FFA133] transition-colors">
                        {study.title}
                      </h3>
                      <span className="font-mono text-[10px] font-bold text-[#FFA133] px-2 py-0.5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/30 shrink-0">
                        {study.stat1.value}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs truncate mt-0.5">
                      {study.tagline}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#0C1E4E] border border-blue-400/30 flex items-center justify-center text-[#FFA133] group-hover:bg-[#FF8500] group-hover:text-white transition-all shadow-md shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#0C1E4E] border border-blue-400/25 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-[736/400] rounded-2xl overflow-hidden mb-6 bg-slate-900">
              <Image
                src={activeCaseStudy.image}
                alt={activeCaseStudy.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Category & Number */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/30 font-semibold uppercase tracking-wider font-mono">
                Case Study {activeCaseStudy.number}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/15 font-medium">
                {activeCaseStudy.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {activeCaseStudy.title}
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {activeCaseStudy.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#FF8500]">
                  {activeCaseStudy.stat1.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {activeCaseStudy.stat1.label}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#3B82F6]">
                  {activeCaseStudy.stat2.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {activeCaseStudy.stat2.label}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {onOpenContact && (
                <button
                  onClick={() => {
                    setActiveCaseStudy(null);
                    onOpenContact();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Start Similar Project
                </button>
              )}
              <Link
                href="/projects"
                prefetch={true}
                onClick={() => setActiveCaseStudy(null)}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-[#FFA133]" />
                <span>View Full Projects Portfolio →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
