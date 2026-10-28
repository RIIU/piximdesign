"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, X, Sparkles, ZoomIn, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Eyebrow, GradientText, SectionTitle } from "@/components/page-kit/shared";
import { type ServiceProject, getServiceProjects } from "@/data/serviceProjects";

interface ServicePreviousProjectsProps {
  shortName: string;
  serviceName: string;
  projectLabel: string;
  projects?: ServiceProject[];
  onInquire: (projectTitle: string) => void;
}

export const ServicePreviousProjects: React.FC<ServicePreviousProjectsProps> = ({
  shortName,
  serviceName,
  projectLabel,
  projects: customProjects,
  onInquire,
}) => {
  const allProjects = customProjects && customProjects.length > 0
    ? customProjects
    : getServiceProjects(shortName);

  const isLogoSection = allProjects.some((p) => p.isLogo);

  // Lightbox zoom state: holds the index of the currently zoomed project
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const currentZoomProject = zoomedIndex !== null ? allProjects[zoomedIndex] : null;

  // Next / Previous helpers for lightbox
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomedIndex === null) return;
    setZoomedIndex((zoomedIndex + 1) % allProjects.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomedIndex === null) return;
    setZoomedIndex((zoomedIndex - 1 + allProjects.length) % allProjects.length);
  };

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    if (zoomedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedIndex(null);
      if (e.key === "ArrowRight") setZoomedIndex((i) => (i === null ? 0 : (i + 1) % allProjects.length));
      if (e.key === "ArrowLeft") setZoomedIndex((i) => (i === null ? 0 : (i - 1 + allProjects.length) % allProjects.length));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedIndex, allProjects.length]);

  return (
    <section
      id="previous-projects"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[450px] rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.18),transparent_70%)] pointer-events-none" />

      {/* Heading Bar */}
      <div className="reveal-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FFA133] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8500]" />
            Previous Work
          </div>
          <SectionTitle>
            Previous <GradientText>{isLogoSection ? "Logo Designs" : `${shortName} Projects`}</GradientText>
          </SectionTitle>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {isLogoSection
              ? "Browse authentic brand logos and emblem marks crafted by Pixim Design. Click any logo to zoom in."
              : `Explore selected real-world ${projectLabel} delivered by Pixim Design. Click any project to zoom in.`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono shrink-0">
          <ZoomIn className="w-4 h-4 text-[#FF8500]" />
          <span>Click any {isLogoSection ? "logo" : "project"} to zoom in</span>
        </div>
      </div>

      {/* =========================================================================
          CLEAN VISUAL GALLERY GRID (NO TEXT / TAG CLUTTER ON TILES)
          "ai gulo thakbe nah just logo gulo thakbe click korle zoom kore dekha jabe"
          "sob service amon tyope hobe"
          All services have pure visual showcase tiles. Clicking ANY tile zooms in!
         ========================================================================= */}
      {isLogoSection ? (
        // Logo Grid (Pure Centered Logo Tiles, No Text)
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
          {allProjects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setZoomedIndex(idx)}
              className="group relative flex items-center justify-center aspect-[4/3] rounded-2xl sm:rounded-3xl border border-[#2651B9]/30 bg-gradient-to-b from-[#09183d] via-[#050e26] to-[#0a1b42] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF8500]/70 hover:shadow-[0_20px_40px_-12px_rgba(255,133,0,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              aria-label={`Zoom in on ${project.title}`}
            >
              {/* Ambient center spotlight glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,133,0,0.25),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl sm:rounded-3xl" />

              {/* Subtle Zoom Badge in Top-Right on Hover */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-slate-400 group-hover:text-[#FFA133] group-hover:border-[#FF8500]/50 transition-all opacity-0 group-hover:opacity-100 shadow-sm z-20">
                <ZoomIn className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>

              {/* Clean Logo Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="relative z-10 max-h-14 sm:max-h-16 lg:max-h-20 w-auto max-w-[85%] object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      ) : (
        // Other Services (Pure Visual Project Tiles, No Text / Tag Clutter)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {allProjects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setZoomedIndex(idx)}
              className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#2651B9]/30 bg-[#071333] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF8500]/70 hover:shadow-[0_20px_45px_-12px_rgba(255,133,0,0.4)] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
              aria-label={`Zoom in on ${project.title}`}
            >
              {/* Image Stage: Pure clean visual artwork */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#081330] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient spotlight glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Centered Zoom Badge on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#030919]/80 border border-[#FF8500]/50 text-white shadow-xl backdrop-blur-md">
                    <ZoomIn className="w-4 h-4 text-[#FFA133]" />
                    <span className="text-xs font-semibold tracking-wide uppercase">Click to Zoom</span>
                  </div>
                </div>

                {/* Subtle top-right zoom icon */}
                <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#081330]/80 border border-white/15 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFA133]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* =========================================================================
          FULL-SCREEN ZOOM LIGHTBOX MODAL ("click korle zoom kore dekha jabe")
         ========================================================================= */}
      {zoomedIndex !== null && currentZoomProject && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020714]/92 p-3 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setZoomedIndex(null)}
        >
          {/* Lightbox Dialog Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={currentZoomProject.title}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[94vh] flex flex-col items-center justify-center rounded-[28px] sm:rounded-[36px] border border-[#2651B9]/40 bg-gradient-to-b from-[#081538] via-[#050D24] to-[#040A1C] p-5 sm:p-8 md:p-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(38,81,185,0.3)] animate-in zoom-in-95 duration-200 text-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setZoomedIndex(null)}
              aria-label="Close zoom preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev & Next Arrows */}
            {allProjects.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous item"
                  className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/[0.08] hover:bg-[#FF8500]/25 border border-white/15 hover:border-[#FF8500]/50 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next item"
                  className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/[0.08] hover:bg-[#FF8500]/25 border border-white/15 hover:border-[#FF8500]/50 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Zoom Display Stage */}
            <div className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-6 sm:p-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-[#091b42] via-[#050e26] to-[#030919] shadow-inner">
              {/* Warm Ambient Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,133,0,0.22),transparent_70%)] pointer-events-none" />

              {currentZoomProject.isLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentZoomProject.image}
                  alt={currentZoomProject.title}
                  className="relative z-10 max-h-36 sm:max-h-52 md:max-h-64 w-auto max-w-[85%] object-contain filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-200"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentZoomProject.image}
                    alt={currentZoomProject.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 800px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Bottom Meta & Action Bar */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl px-2">
              <div className="text-center sm:text-left">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFA133] font-semibold">
                  {currentZoomProject.categoryBadge} · {zoomedIndex + 1} of {allProjects.length}
                </span>
                <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  {currentZoomProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  const title = currentZoomProject.title;
                  setZoomedIndex(null);
                  onInquire(title);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <span>{isLogoSection ? "Inquire This Logo Style" : "Inquire Similar Project"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Cross-Navigation & CTA */}
      <div className="reveal-up mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#2651B9]/30 bg-[#081433]/70">
        <div>
          <p className="font-agency text-lg font-bold text-white">
            Looking for something specific or custom?
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Browse our full archive of 500+ projects or request a tailored design proposal.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04]"
          >
            <span>All Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => onInquire(`Custom ${shortName} Inquiry`)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicePreviousProjects;
