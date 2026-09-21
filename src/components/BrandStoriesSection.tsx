"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  X,
  Layers,
} from "lucide-react";

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  stat1: {
    icon: string;
    value: string;
    label: string;
  };
  stat2: {
    icon: string;
    value: string;
    label: string;
  };
  description: string;
  link: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "skyra-flight",
    number: "01",
    title: "AI Flight Booking Mobile App Design for Skyra",
    category: "Mobile App & AI",
    tagline: "Skyra is an AI-powered flight booking mobile app that analyzes flight prices, routes, and timing.",
    image: "/images/case-studies/skyra-flight-booking.webp",
    stat1: {
      icon: "/images/case-studies/activeuser.svg",
      value: "5",
      label: "User Personas Analyzed",
    },
    stat2: {
      icon: "/images/case-studies/rating.svg",
      value: "4",
      label: "Major Competitors Researched",
    },
    description: "Built with intelligent predictive flight price tracking, multi-city route optimization, and a seamless checkout experience.",
    link: "/projects",
  },
  {
    id: "helixa-health",
    number: "02",
    title: "AI-Powered Health App Design for Helixa",
    category: "HealthTech & Wearables",
    tagline: "Helixa is an AI-powered health app designed for both patients and doctors with real-time biometric tracking.",
    image: "/images/case-studies/helixa-health-app.webp",
    stat1: {
      icon: "/images/case-studies/activeuser.svg",
      value: "2",
      label: "User Groups Analyzed",
    },
    stat2: {
      icon: "/images/case-studies/increase.svg",
      value: "3",
      label: "Core Health Modules",
    },
    description: "Engineered with comprehensive sleep telemetry, cardiovascular risk scoring, and encrypted doctor-patient consultation streams.",
    link: "/projects",
  },
  {
    id: "monoq-spatial",
    number: "03",
    title: "Spatial E-Commerce App Design for Monoq",
    category: "Spatial UI & Web3",
    tagline: "Monoq is a spatial e-commerce application engineered for next-gen interactive product visualization.",
    image: "/images/case-studies/monoq-spatial-ecommerce.webp",
    stat1: {
      icon: "/images/case-studies/star-count.svg",
      value: "4 Weeks",
      label: "Project Duration",
    },
    stat2: {
      icon: "/images/case-studies/activeuser.svg",
      value: "3",
      label: "User Personas Analyzed",
    },
    description: "Features realistic 3D tactile product inspection, frictionless one-tap spatial ordering, and fluid micro-interactions.",
    link: "/projects",
  },
  {
    id: "ecoray-solar",
    number: "04",
    title: "AI-Powered Solar Monitoring Dashboard for EcoRay",
    category: "CleanTech Dashboard",
    tagline: "An AI-powered solar monitoring dashboard, EcoRay tracks real-time energy generation and monitors system health.",
    image: "/images/case-studies/ecoray-solar-dashboard.webp",
    stat1: {
      icon: "/images/case-studies/star-count.svg",
      value: "4 Weeks",
      label: "Project Duration",
    },
    stat2: {
      icon: "/images/case-studies/increase.svg",
      value: "4",
      label: "Major Competitors Researched",
    },
    description: "Delivers sub-second telemetry graphs, automated predictive inverter maintenance alerts, and high-concurrency fleet controls.",
    link: "/projects",
  },
  {
    id: "taskflux-management",
    number: "05",
    title: "Modern Task Management Dashboard for TaskFlux",
    category: "Enterprise SaaS",
    tagline: "TaskFlux streamlines enterprise workflows by transforming complex project metrics into clear, actionable intelligence.",
    image: "/images/case-studies/taskflux-dashboard.webp",
    stat1: {
      icon: "/images/case-studies/increase.svg",
      value: "30%",
      label: "Faster Monitoring",
    },
    stat2: {
      icon: "/images/case-studies/star-count.svg",
      value: "6.08K",
      label: "Task Insights",
    },
    description: "Designed with drag-and-drop kanban boards, real-time workload heatmaps, and customizable automated workflow pipelines.",
    link: "/projects",
  },
];

interface BrandStoriesSectionProps {
  onOpenContact?: () => void;
}

export const BrandStoriesSection: React.FC<BrandStoriesSectionProps> = ({ onOpenContact }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  return (
    <section
      id="portfolioSection"
      className="steps-section relative py-20 sm:py-24 lg:py-28 bg-[#090D16]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 65% 50% at 20% 30%, rgba(255, 133, 0, 0.08) 0%, rgba(38, 81, 185, 0.06) 50%, transparent 80%)",
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

      {/* Main Split Layout Container (1280px max-width, matching all flagship sections) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12 xl:gap-14">
          
          {/* Left Column: Fixed / Sticky Text & CTA at Top Left */}
          <div className="steps-left w-full lg:w-[42%] xl:w-[40%] lg:sticky lg:top-28 xl:top-32 self-start z-10">
            <div className="left-content flex flex-col justify-start py-2 sm:py-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-bold text-white tracking-tight leading-[1.16] mb-4 sm:mb-6 text-left">
                Experience Brand <br />
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Stories in Design
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#A7BDB5] leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal text-left">
                At Pixim, we believe design is more than just look and feel. It takes the end user through a mesmerizing journey that ends in conversion without any friction.
              </p>

              {/* Pixim Mega Reveal CTA Button */}
              <div>
                <Link
                  href="/projects"
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

          {/* Right Column: Scrolling Case Studies Image Cards (Scrolls past naturally) */}
          <div className="steps-right w-full lg:w-[58%] xl:w-[60%] flex flex-col gap-8 sm:gap-12 relative z-10">
            {CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                onClick={() => setActiveCaseStudy(study)}
                className="step-content portfolio-card cursor-pointer group w-full"
              >
                <div className="portfolio-work-item relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#FF8500]/60 transition-all duration-500 shadow-2xl bg-[#090D16]">
                  {/* Top Badge: Number and Category */}
                  <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 z-30 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[11px] sm:text-xs font-black tracking-widest text-[#FFA133] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#090D16]/85 backdrop-blur-md border border-[#FF8500]/30 shadow-lg">
                      {study.number} / 05
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-200 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#090D16]/85 backdrop-blur-md border border-white/15 shadow-lg">
                      {study.category}
                    </span>
                  </div>

                  {/* High-Resolution Mockup Image */}
                  <div className="relative w-full aspect-[736/491] overflow-hidden bg-slate-900">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 736px, 736px"
                      className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={study.id === "skyra-flight"}
                    />
                  </div>

                  {/* Backdrop Blur Overlay on Hover: Strictly bottom half (50%), top half remains completely normal */}
                  <div className="work-item-overlay absolute inset-x-0 bottom-0 top-1/2 h-1/2 pointer-events-none z-10" />

                  {/* Hover Information Box with 3 Metric Pills + View Details */}
                  <div className="all-portfolio-info absolute inset-x-0 bottom-0 p-4 sm:p-6 xl:p-7 z-20 flex flex-col justify-end">
                    {/* Top Stats Row: 3 metric highlight boxes */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3.5 sm:mb-4">
                      {/* Box 1 */}
                      <div className="work-box-info bg-[#090D16]/80 backdrop-blur-md border border-white/15 p-2.5 sm:p-3.5 rounded-2xl flex flex-col justify-between shadow-xl">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 flex items-center justify-center mb-1.5">
                          <Image
                            src={study.stat1.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm sm:text-base xl:text-lg font-bold leading-tight">
                            {study.stat1.value}
                          </p>
                          <p className="text-slate-400 text-[10px] sm:text-[11px] xl:text-xs line-clamp-1 mt-0.5">
                            {study.stat1.label}
                          </p>
                        </div>
                      </div>

                      {/* Box 2 */}
                      <div className="work-box-info bg-[#090D16]/80 backdrop-blur-md border border-white/15 p-2.5 sm:p-3.5 rounded-2xl flex flex-col justify-between shadow-xl">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 flex items-center justify-center mb-1.5">
                          <Image
                            src={study.stat2.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm sm:text-base xl:text-lg font-bold leading-tight">
                            {study.stat2.value}
                          </p>
                          <p className="text-slate-400 text-[10px] sm:text-[11px] xl:text-xs line-clamp-1 mt-0.5">
                            {study.stat2.label}
                          </p>
                        </div>
                      </div>

                      {/* Box 3: View Details CTA */}
                      <div className="work-box-info bg-gradient-to-br from-[#FF8500]/30 to-[#2651B9]/30 backdrop-blur-md border border-[#FF8500]/50 p-2.5 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center text-center group/btn hover:bg-[#FF8500]/40 transition-colors shadow-xl">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white flex items-center justify-center mb-1 shadow-md shadow-[#FF8500]/30 transition-transform group-hover/btn:scale-110">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-white text-[11px] sm:text-xs xl:text-sm font-semibold whitespace-nowrap">
                          View details
                        </p>
                      </div>
                    </div>

                    {/* Title & Tagline inside Hover Overlay */}
                    <div className="text-left">
                      <h3 className="text-white text-base sm:text-xl font-bold mb-1 line-clamp-1 text-[#FFA133]">
                        {study.title}
                      </h3>
                      <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 font-normal">
                        {study.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile / Fallback text underneath image (always readable on touch screens) */}
                <div className="lg:hidden mt-3 px-2 text-left">
                  <h3 className="text-white text-lg font-bold">
                    {study.title}
                  </h3>
                  <p className="text-[#A7BDB5] text-xs sm:text-sm mt-1">
                    {study.tagline}
                  </p>
                </div>
              </div>
            ))}
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
            className="relative w-full max-w-3xl rounded-3xl bg-[#0F172A] border border-white/10 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left"
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
