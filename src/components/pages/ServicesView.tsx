"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarCheck, Check, FileCheck, Layers, Star, Timer, Wallet } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { Price } from "@/components/currency/Price";
import { PageHero } from "@/components/page-kit/PageHero";
import { ClientLogoWall } from "@/components/page-kit/ClientLogoWall";
import { FilterPills } from "@/components/page-kit/FilterPills";
import { ProcessTimeline } from "@/components/page-kit/ProcessTimeline";
import { WhySplit } from "@/components/page-kit/WhySplit";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { Eyebrow, GradientText, SampleMark, SectionTitle } from "@/components/page-kit/shared";
import { ChipDot, ChipIconBox, FloatingChip, TILE_DARK, TILE_DEEP, TILE_ORANGE } from "@/components/page-kit/primitives";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import type { FaqItem, WhyContent } from "@/components/page-kit/types";
import { SERVICES } from "@/data/agencyData";
import { startingFrom } from "@/data/servicePricing";
import { CTA_VIDEOS, INTERNATIONAL_FAQ, OWNERSHIP_FAQ, PAYMENT_FAQ, STUDIO_PROCESS } from "@/data/studioContent";

type Service = (typeof SERVICES)[number];

const SHORT_LABELS: Record<string, string> = {
  "logo-design": "Branding",
  "social-media": "Social",
  "package-design": "Packaging",
  "motion-video": "Motion",
  "digital-marketing": "Ads",
  "web-design": "Web",
  "seo-growth": "SEO",
};

const CATEGORIES = [
  { id: "all", label: "All 7 Services", ids: SERVICES.map((s) => s.id) },
  { id: "branding", label: "Branding & Packaging", ids: ["logo-design", "package-design"] },
  { id: "digital", label: "Social & Ads", ids: ["social-media", "digital-marketing"] },
  { id: "web-video", label: "Web, Video & SEO", ids: ["web-design", "motion-video", "seo-growth"] },
];

// Column span for the closing CTA card so it always completes the last grid row
const CTA_SPAN_LG: Record<number, string> = { 0: "lg:col-span-3", 1: "lg:col-span-2", 2: "lg:col-span-1" };
const CTA_SPAN_MD: Record<number, string> = { 0: "md:col-span-2", 1: "md:col-span-1" };

/* ---------- Hero composition ---------- */

const HeroServiceTile: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = SERVICE_ICONS[service.id];
  return (
    <div className={`${TILE_DARK} aspect-square p-3 sm:p-4 flex flex-col justify-between`}>
      <span className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-xl bg-[#FF8500]/12 border border-[#FF8500]/30 text-[#FFA133]">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </span>
      <span className="flex items-end justify-between gap-1">
        <span className="font-agency text-sm sm:text-base font-extrabold text-white leading-none">{SHORT_LABELS[service.id]}</span>
        <span className="font-mono text-[9px] text-slate-500">{service.number}</span>
      </span>
    </div>
  );
};

const HeroVisual = () => (
  <div className="relative">
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {SERVICES.slice(0, 4).map((service) => (
        <HeroServiceTile key={service.id} service={service} />
      ))}
      <div className={`${TILE_ORANGE} relative aspect-square overflow-hidden p-3 sm:p-4 flex flex-col justify-between`}>
        <SampleMark className="absolute -right-6 -top-6 w-24 h-24 opacity-20" color="#FFFFFF" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/80">One studio</span>
        <span>
          <span className="block font-agency text-5xl sm:text-6xl font-extrabold text-white leading-none">7</span>
          <span className="block text-[11px] font-semibold text-white/90">services</span>
        </span>
      </div>
      {SERVICES.slice(4).map((service) => (
        <HeroServiceTile key={service.id} service={service} />
      ))}
      <div className={`${TILE_DEEP} aspect-square p-3 sm:p-4 flex flex-col justify-between`}>
        <span className="flex text-[#FFA133]">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} className="w-3 h-3 fill-current" />
          ))}
        </span>
        <span>
          <span className="block font-agency text-3xl sm:text-4xl font-extrabold text-white leading-none">4.9</span>
          <span className="block text-[10px] text-slate-400">client rating</span>
        </span>
      </div>
    </div>

    <FloatingChip
      className="right-3 -top-6"
      icon={
        <ChipIconBox>
          <CalendarCheck className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Free 30-min consultation"
      sub="No obligation"
    />
    <FloatingChip
      className="left-3 -bottom-7"
      delayed
      icon={
        <ChipDot>
          <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
        </ChipDot>
      }
      title="Prices in ৳ BDT & $ USD"
    />
  </div>
);

/* ---------- Service card ---------- */

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = SERVICE_ICONS[service.id];
  const from = startingFrom(service.id);

  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 sm:p-7 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#FF8500]/55 hover:shadow-[0_20px_45px_-18px_rgba(255,133,0,0.35)]"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,133,0,0.16),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex w-12 h-12 items-center justify-center rounded-2xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133] transition-colors duration-300 group-hover:border-[#FF8500] group-hover:bg-[#FF8500] group-hover:text-white">
          <Icon className="w-6 h-6" />
        </span>
        <span className="font-mono text-sm font-bold text-slate-500 transition-colors group-hover:text-[#FFA133]">{service.number}</span>
      </div>

      <span className="relative mt-6 text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">{service.badge}</span>
      <h3 className="relative mt-1.5 font-agency text-xl sm:text-2xl font-extrabold text-white transition-colors group-hover:text-[#FFA133]">
        {service.title}
      </h3>
      <p className="relative mt-2 text-sm text-slate-400 leading-relaxed">{service.tagline}</p>

      <ul className="relative mt-4 flex flex-wrap gap-1.5">
        {service.features.map((feature) => (
          <li key={feature} className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300">
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-6">
        <div className="flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
          {from && (
            <span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500">Starting from</span>
              <span className="mt-1 block font-agency text-xl font-extrabold text-white">
                <Price usd={from.usd} bdt={from.bdt} />
              </span>
            </span>
          )}
          <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-[#2651B9]/35 bg-[#081330] text-slate-300 transition-colors duration-300 group-hover:border-[#FF8500] group-hover:bg-[#FF8500] group-hover:text-white">
            <ArrowUpRight className="w-4 h-4" />
            <span className="sr-only">View {service.title}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ---------- Content ---------- */

const WHY: WhyContent = {
  title: (
    <>
      One Team for Your <GradientText>Entire Brand</GradientText>
    </>
  ),
  items: [
    {
      icon: Layers,
      title: "Everything under one roof",
      desc: "Branding, packaging, social, video, web and ads from one team, so every touchpoint looks and sounds like the same brand.",
    },
    {
      icon: Wallet,
      title: "Clear pricing in ৳ and $",
      desc: "Fixed quotes before work starts, billed in Taka for Bangladesh and in US dollars for international clients.",
    },
    {
      icon: FileCheck,
      title: "You own every file",
      desc: "All master source files and full commercial rights transfer to your business on final payment.",
    },
    {
      icon: Timer,
      title: "Fast, dependable delivery",
      desc: "Agreed milestones, quick replies on WhatsApp and email, and 30 days of support after delivery.",
    },
  ],
  tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Blender", "Next.js", "WordPress", "Meta Ads", "Google Ads", "Search Console"],
  highlight: {
    value: "7",
    label: "Services under one roof",
    chips: Object.values(SHORT_LABELS),
  },
};

const FAQS: FaqItem[] = [
  {
    q: "Which service should I start with?",
    a: "Most new businesses start with a logo and brand identity, because social posts, packaging and your website all build on it. If you're unsure, book a free 30-minute call and we'll recommend the right starting point for your stage and budget.",
  },
  {
    q: "Can I combine several services in one project?",
    a: "Yes. Many clients bundle branding, a social media kit and a website. A combined project runs on one brief with one team, and you receive a single quote that covers everything.",
  },
  {
    q: "How long does a typical project take?",
    a: "Logos and brand identities usually take 3 to 7 business days, and full custom websites 2 to 3 weeks. We agree the milestones with you before any work begins.",
  },
  OWNERSHIP_FAQ,
  PAYMENT_FAQ,
  INTERNATIONAL_FAQ,
];

/* ---------- Page ---------- */

export const ServicesView: React.FC = () => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("all");

  useRevealAnimations(rootRef);

  // Filtering changes the page height, so scroll-triggered sections below need fresh positions
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [category]);

  const active = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  const services = SERVICES.filter((s) => active.ids.includes(s.id));
  const consult = (note: string) => openContact("Free Consultation", note);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Our Services"
        title={
          <>
            One Studio for Every Part of <GradientText>Your Brand&apos;s Growth</GradientText>
          </>
        }
        description="We provide complete branding, web engineering, packaging, and digital solutions to turn your idea into a successful online brand. Built with 8+ years of expertise."
        primary={{ label: "Get a Free Quote", onClick: () => consult("I'd like a quote for my project.") }}
        secondary={{ label: "View Pricing", href: "/pricing" }}
        visual={<HeroVisual />}
      />

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. Filterable services grid */}
      <section id="all-services" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <Eyebrow>What We Do</Eyebrow>
            <SectionTitle className="mt-4">
              Seven Services, <GradientText>One Standard of Quality</GradientText>
            </SectionTitle>
            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Choose a single service or combine several. Every project gets the same senior team, clear pricing and full
              ownership of the final files.
            </p>
          </div>
          <FilterPills
            label="Filter services"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            className="lg:shrink-0 lg:flex-nowrap"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* Closing CTA card fills the rest of the last row */}
          <div
            className={`relative flex flex-col justify-between gap-6 overflow-hidden rounded-[28px] border border-[#FF8500]/35 bg-gradient-to-br from-[#FF8500]/15 via-[#0C1E4E] to-[#0C1E4E] p-6 sm:p-8 ${
              CTA_SPAN_LG[services.length % 3]
            } ${CTA_SPAN_MD[services.length % 2]}`}
          >
            <SampleMark className="pointer-events-none absolute -right-10 -bottom-10 w-48 h-48 opacity-10" color="#FF8500" />
            <div className="relative">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFA133]">Not sure yet?</span>
              <h3 className="mt-2 font-agency text-2xl sm:text-3xl font-extrabold text-white">Get a free recommendation for your brand.</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400 leading-relaxed">
                Tell us where your business is today. In a free 30-minute call we&apos;ll suggest the right mix of services,
                timeline and budget.
              </p>
            </div>
            <div className="relative flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => consult("I'd like a recommendation on which services fit my brand.")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 cursor-pointer"
              >
                Book a free call
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:bg-white/[0.1]"
              >
                Compare prices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shared process */}
      <ProcessTimeline
        title={
          <>
            From First Call to <GradientText>Final Files</GradientText>
          </>
        }
        description="Every service follows the same clear five-step process, so you always know what happens next and what you'll receive."
        steps={STUDIO_PROCESS}
      />

      {/* 5. Why Pixim + stats */}
      <WhySplit why={WHY} />

      {/* 6. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="Verified Client Reviews Across Services" subtitle="PROVEN TRACK RECORD" speed={38} />
      </section>

      {/* 7. FAQ */}
      <FaqSplit
        title={
          <>
            Service Questions, <GradientText>Answered</GradientText>
          </>
        }
        faqs={FAQS}
        onAsk={() => consult("I have a few questions about your services.")}
      />

      {/* 8. Final CTA */}
      <ReadyForLogoSection
        onOpenContact={(service, note) => openContact(service, note)}
        titleLead="Not Sure Where"
        titleHighlight="to Start?"
        description="Tell us about your business and goals. In a free 30-minute call we'll recommend the right services, timeline and budget."
        primaryService="Free Consultation"
        primaryNote="I'd like help choosing the right services for my brand."
        secondaryService="Service Consultation"
        secondaryNote="I would like to book a free consultation about your services."
        {...CTA_VIDEOS.grow}
      />
    </div>
  );
};
