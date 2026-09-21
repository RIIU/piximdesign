"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_PROJECTS } from "@/data/agencyData";
import { ArrowUpRight, X, TrendingUp, Calendar, User } from "lucide-react";
import { GsapMagneticButton } from "./animations";

interface PortfolioSectionProps {
  onOpenContact: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContact }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState<(typeof PORTFOLIO_PROJECTS)[0] | null>(null);

  const categories = ["All", "Web App", "AI / SaaS", "Branding", "Mobile"];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Proof of Execution. <br />
            <span className="bg-gradient-to-r from-[#FF8500] via-amber-500 to-[#2651B9] bg-clip-text text-transparent">
              Built for Scale & Impact.
            </span>
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white font-bold shadow-md shadow-[#FF8500]/25"
                  : "bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:text-[#2651B9] dark:hover:text-[#60A5FA] border border-[#2651B9]/20 dark:border-[#2651B9]/35 hover:border-[#2651B9]/50 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveModalProject(project)}
            className="group relative rounded-3xl bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl ring-1 ring-inset ring-white/60 dark:ring-white/[0.08] border border-[#FF8500]/30 dark:border-[#FF8500]/40 hover:border-[#FF8500]/70 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-2xl flex flex-col"
          >
            {/* Ambient Apple accent glow (normally visible) */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#FF8500]/10 via-[#2651B9]/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Visual Preview Container */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#111827]/90 via-transparent to-transparent" />

              {/* Category Badge & Live Metric */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                  {project.categoryBadge}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 backdrop-blur-md text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{project.metrics}</span>
                </div>
              </div>

              {/* Hover View Case Study Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2651B9] text-white font-bold text-xs shadow-xl shadow-[#2651B9]/30 scale-90 group-hover:scale-100 transition-transform duration-300">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Meta Information Container */}
            <div className="relative z-10 p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white group-hover:text-[#FF8500] transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-2 rounded-full bg-[#FF8500]/12 dark:bg-[#FF8500]/20 text-[#C25E00] dark:text-[#FFA133] border border-[#FF8500]/30 group-hover:bg-[#FF8500] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0D1322] border border-[#2651B9]/20 dark:border-[#2651B9]/35 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#FF8500]/50 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C25E00] dark:text-[#FFA133] uppercase tracking-wider mb-2">
                <span>{activeModalProject.categoryBadge}</span>
                <span>•</span>
                <span>{activeModalProject.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                {activeModalProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Client: {activeModalProject.client}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeModalProject.metrics}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Year: {activeModalProject.year}</span>
                </div>
              </div>

              {/* Challenge & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF8500]" />
                    The Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeModalProject.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Pixim&apos;s Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Want similar results for your product?
                </div>
                <GsapMagneticButton
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenContact();
                  }}
                  variant="primary"
                  strength={0.25}
                  className="w-full sm:w-auto px-6 py-2.5 !text-white !bg-[#FF8500] hover:!bg-[#e67700] font-bold text-xs sm:text-sm shadow-md"
                >
                  <span>Start Project Like This →</span>
                </GsapMagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
