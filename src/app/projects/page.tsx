"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_PROJECTS } from "@/data/agencyData";
import { ArrowUpRight, X } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { GsapDrawSvg, GsapMagneticButton, GsapInfiniteLoopedPanels, GsapReviewsInfiniteSlider } from "@/components/animations";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof PORTFOLIO_PROJECTS)[0] | null>(null);
  const { openContact } = useContactModal();

  const categories = ["All", "Web App", "AI / SaaS", "Branding", "Mobile"];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category === activeFilter;
  });

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF8500]/10 via-[#2651B9]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <h1 className="font-agency relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.08]">
          Featured Work & <br />
          <span className="relative inline-block bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#FFA133] bg-clip-text text-transparent">
            Digital Case Studies
            <span className="absolute -bottom-2.5 left-0 w-full pointer-events-none">
              <GsapDrawSvg
                type="underline"
                strokeColor="#FF8500"
                strokeWidth={3}
                duration={1.2}
                delay={0.3}
              />
            </span>
          </span>
        </h1>

        <p className="relative z-10 mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore how we partner with venture-backed startups, retail brands, and global enterprises to craft iconic visual identities and high-performing web platforms.
        </p>

        {/* Filter Tabs */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-bold shadow-md shadow-orange-500/20"
                  : "bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:text-[#2651B9] dark:hover:text-[#60A5FA] border border-[#2651B9]/20 dark:border-[#2651B9]/30 hover:border-[#2651B9]/50 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GSAP Infinite Looped Panels Showcase */}
      <GsapInfiniteLoopedPanels
        title="Interactive Client Case Studies"
        subtitle="Flagship Design Loops"
        speed={34}
        className="mb-16 -mt-6"
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-3xl bg-white/80 dark:bg-[#0C1E4E]/85 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/30 dark:border-[#FF8500]/40 hover:border-[#FF8500]/70 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_32px_rgba(8,19,48,0.5)] hover:shadow-2xl cursor-pointer flex flex-col justify-between"
          >
            {/* Ambient Apple accent glow (normally visible) */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#FF8500]/10 via-[#2651B9]/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Image Box */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#0C1E4E]/90 via-transparent to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono font-medium shadow-sm">
                  {project.categoryBadge}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {project.metrics}
                </span>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-agency text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#FF8500] transition-colors">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#FF8500] text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0D1322] border border-[#2651B9]/20 dark:border-[#2651B9]/35 p-6 sm:p-10 shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#FF8500]/50 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 text-[#C25E00] dark:text-[#FFA133] border border-[#FF8500]/30 font-semibold">
                {selectedProject.categoryBadge}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {selectedProject.client} • {selectedProject.year}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
              {selectedProject.title}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
              Key Metric: {selectedProject.metrics}
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C25E00] dark:text-[#FFA133] mb-2">
                  The Challenge
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  Our Engineered Solution
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t: string) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {t}
                  </span>
                ))}
              </div>

              <GsapMagneticButton
                onClick={() => {
                  setSelectedProject(null);
                  openContact(`Project Inquiry: ${selectedProject.title}`);
                }}
                variant="primary"
                strength={0.25}
                className="px-6 py-2.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-xs shadow-md"
              >
                <span>Inquire Similar Scope</span>
              </GsapMagneticButton>
            </div>
          </div>
        </div>
      )}

      {/* Infinite Review Card Slider */}
      <div className="mb-20">
        <GsapReviewsInfiniteSlider
          title="What Founders Say About Our Case Studies"
          subtitle="CLIENT SATISFACTION"
          speed={38}
        />
      </div>

      {/* Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0C1E4E] border border-[#2651B9]/15 dark:border-[#2651B9]/25 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.09)] dark:shadow-[0_12px_36px_-6px_rgba(8,19,48,0.5)] text-center">
        <h2 className="font-agency text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
          Have an upcoming product launch or rebrand?
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Let&apos;s talk about how Pixim Design can bring your vision to reality with guaranteed speed and relentless execution standards.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GsapMagneticButton
            onClick={() => openContact()}
            variant="primary"
            strength={0.3}
            className="px-8 py-3.5 !bg-[#FF8500] hover:!bg-[#e67700] !text-white font-bold text-sm shadow-md"
          >
            <span>Start Your Project Brief</span>
          </GsapMagneticButton>
          <GsapMagneticButton
            href="/process"
            variant="secondary"
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium text-sm transition-colors"
          >
            <span>See Our 4-Step Process →</span>
          </GsapMagneticButton>
        </div>
      </div>
    </main>
  );
}
