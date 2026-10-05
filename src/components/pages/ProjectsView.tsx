"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Rocket, Star, TrendingUp, X } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapInfiniteLoopedPanels, GsapReviewsInfiniteSlider } from "@/components/animations";
import { PageHero } from "@/components/page-kit/PageHero";
import { ClientLogoWall } from "@/components/page-kit/ClientLogoWall";
import { StickyShowcase } from "@/components/page-kit/StickyShowcase";
import { FilterPills } from "@/components/page-kit/FilterPills";
import { Eyebrow, GradientText, SectionTitle } from "@/components/page-kit/shared";
import { BrowserFrame, ChipIconBox, FloatingChip } from "@/components/page-kit/primitives";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import { useDialog } from "@/lib/useDialog";
import { PORTFOLIO_PROJECTS } from "@/data/agencyData";
import { CASE_STUDIES, type CaseStudy } from "@/data/caseStudies";
import { CTA_VIDEOS } from "@/data/studioContent";

type Project = (typeof PORTFOLIO_PROJECTS)[number];

const FILTERS = ["All", "Web App", "AI / SaaS", "Branding", "Mobile"].map((label) => ({ id: label, label }));

const [HERO_MAIN, HERO_LEFT, HERO_RIGHT] = [CASE_STUDIES[3], CASE_STUDIES[1], CASE_STUDIES[2]];

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative px-2 pt-8 pb-14 sm:px-6">
    <div className="absolute right-0 top-0 z-0 w-[42%] rotate-[5deg] overflow-hidden rounded-2xl border border-white/10 shadow-xl">
      <Image src={HERO_RIGHT.image} alt="" width={736} height={491} sizes="200px" className="w-full h-auto" />
    </div>

    <BrowserFrame url="ecoray.app/dashboard" className="relative z-10">
      <Image src={HERO_MAIN.image} alt="" width={736} height={491} sizes="(max-width: 1024px) 90vw, 460px" loading="eager" className="w-full h-auto" />
    </BrowserFrame>

    <div className="absolute bottom-0 left-0 z-20 w-[46%] -rotate-[4deg] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
      <Image src={HERO_LEFT.image} alt="" width={736} height={491} sizes="220px" className="w-full h-auto" />
    </div>

    <FloatingChip
      className="right-0 sm:-right-4 bottom-6 z-30"
      icon={
        <ChipIconBox>
          <Rocket className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="500+ brands launched"
      sub="Startups to enterprises"
    />
    <FloatingChip
      className="left-0 sm:-left-4 top-2 z-30"
      delayed
      icon={<Star className="w-3.5 h-3.5 fill-[#FFA133] text-[#FFA133]" />}
      title="4.9 client rating"
    />
  </div>
);

/* ---------- Case study panel ---------- */

const CaseStudyVisual: React.FC<{ study: CaseStudy }> = ({ study }) => (
  <div>
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <Image
        src={study.image}
        alt=""
        width={736}
        height={491}
        sizes="(max-width: 1024px) 92vw, 640px"
        className="w-full h-auto transition-transform duration-700 hover:scale-[1.03]"
      />
      <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-[#081330]/85 px-3 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur-md">
        {study.category}
      </span>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3">
      {[study.stat1, study.stat2].map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-[#2651B9]/30 bg-[#081330]/70 p-4">
          <span className="block font-agency text-2xl font-extrabold text-white leading-none">{stat.value}</span>
          <span className="mt-1 block text-xs text-slate-400">{stat.label}</span>
        </div>
      ))}
    </div>
    <p className="mt-4 text-sm text-slate-400 leading-relaxed">{study.description}</p>
  </div>
);

/* ---------- Project card + modal ---------- */

const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => (
  <article className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF8500]/55 hover:shadow-[0_20px_45px_-18px_rgba(255,133,0,0.35)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#FF8500]">
    <div className="relative aspect-[16/10] overflow-hidden bg-[#081330]">
      <Image
        src={project.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E4E] via-[#0C1E4E]/10 to-transparent" />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/15 bg-[#081330]/85 px-3 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur-md">
          {project.categoryBadge}
        </span>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
        <TrendingUp className="w-3.5 h-3.5" />
        {project.metrics}
      </span>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white transition-colors group-hover:text-[#FFA133]">
          {/* Stretched button makes the whole card clickable */}
          <button type="button" onClick={onOpen} className="text-left cursor-pointer after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </button>
        </h3>
        <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-[#2651B9]/35 bg-[#081330] text-slate-300 transition-colors duration-300 group-hover:border-[#FF8500] group-hover:bg-[#FF8500] group-hover:text-white">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.description}</p>
      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5 font-mono text-xs text-slate-500">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </div>
  </article>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void; onInquire: () => void }> = ({ project, onClose, onInquire }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onClose);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#040A1C]/75 p-4 backdrop-blur-md" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#2651B9]/40 bg-[#0C1E4E] p-5 sm:p-8 shadow-2xl"
      >
        <button
          data-autofocus
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 flex w-10 h-10 items-center justify-center rounded-full border border-white/15 bg-[#081330]/90 text-slate-300 transition-colors hover:border-[#FF8500]/60 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#FF8500]/35 bg-[#FF8500]/12 px-3 py-1 text-xs font-semibold text-[#FFA133]">
            {project.categoryBadge}
          </span>
          <span className="font-mono text-xs text-slate-400">
            {project.client} · {project.year}
          </span>
        </div>

        <h2 id="project-modal-title" className="mt-3 font-agency text-2xl sm:text-3xl font-extrabold text-white">
          {project.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">{project.description}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300">
          <TrendingUp className="w-4 h-4" />
          Key result: {project.metrics}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#2651B9]/30 bg-[#081330]/70 p-5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">The challenge</span>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{project.challenge}</p>
          </div>
          <div className="rounded-2xl border border-[#2651B9]/30 bg-[#081330]/70 p-5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Our solution</span>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/[0.08] pt-6">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                {tag}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onInquire}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 cursor-pointer"
          >
            Inquire similar scope
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */

export const ProjectsView: React.FC = () => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  useRevealAnimations(rootRef);

  // Filtering changes the page height, so scroll-triggered sections below need fresh positions
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  const projects = PORTFOLIO_PROJECTS.filter((p) => filter === "All" || p.category === filter);
  const startProject = (note: string) => openContact("Project Inquiry", note);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        eyebrow="Our Work"
        title={
          <>
            Featured Work & <GradientText>Case Studies</GradientText>
          </>
        }
        description="Explore how we partner with venture-backed startups, retail brands, and global enterprises to craft iconic visual identities and high-performing web platforms."
        primary={{ label: "Start Your Project", onClick: () => startProject("I'd like to discuss a new project.") }}
        secondary={{ label: "Explore Services", href: "/services" }}
        visual={<HeroVisual />}
      />

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. Sticky case studies */}
      <StickyShowcase
        id="case-studies"
        eyebrow="Case Studies"
        title={
          <>
            Product Design <GradientText>Case Studies</GradientText>
          </>
        }
        description="A closer look at how we research, design and ship digital products, from the first user persona to the final pixel."
        panels={CASE_STUDIES.map((study) => ({
          id: study.id,
          title: study.title,
          desc: study.tagline,
          visual: <CaseStudyVisual study={study} />,
        }))}
        ctaLabel="Start a Similar Project"
        onStart={() => startProject("I'd like to start a product design project.")}
        secondary={{ label: "Explore our services", href: "/services" }}
      />

      {/* 4. Filterable featured projects */}
      <section id="featured-projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <Eyebrow>Featured Projects</Eyebrow>
            <SectionTitle className="mt-4">
              Selected <GradientText>Product Builds</GradientText>
            </SectionTitle>
            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Web apps, AI platforms, e-commerce and mobile products we&apos;ve designed and engineered end to end.
            </p>
          </div>
          <FilterPills label="Filter projects" options={FILTERS} value={filter} onChange={setFilter} className="lg:justify-end" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={closeModal}
          onInquire={() => {
            setSelected(null);
            openContact(`Project Inquiry: ${selected.title}`, `I'd like a project with a similar scope to ${selected.title}.`);
          }}
        />
      )}

      {/* 5. Looped impact panels */}
      <GsapInfiniteLoopedPanels title="Cross-Service Impact & Deployments" subtitle="REAL-WORLD EXECUTION" speed={36} />

      {/* 6. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="What Founders Say About Our Work" subtitle="CLIENT SATISFACTION" speed={38} />
      </section>

      {/* 7. Final CTA */}
      <ReadyForLogoSection
        onOpenContact={(service, note) => openContact(service, note)}
        titleLead="Have a Launch or"
        titleHighlight="Rebrand Coming Up?"
        description="Let's talk about how Pixim Design can bring your vision to life, with clear milestones and careful, fast execution."
        primaryService="Project Inquiry"
        primaryNote="I have an upcoming launch or rebrand and would like to discuss it."
        secondaryService="Project Consultation"
        secondaryNote="I would like to book a free call about my project."
        {...CTA_VIDEOS.grow}
      />
    </div>
  );
};
