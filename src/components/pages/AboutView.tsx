"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck, Handshake, LifeBuoy, MessageCircle } from "lucide-react";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { Eyebrow, GradientText, SectionTitle } from "@/components/page-kit/shared";
import { AGENCY_STATS } from "@/data/agencyData";
import { useServices, useSettings } from "@/content/ContentProvider";
import { T, usePageContent, type PageContent } from "@/content/page";
import { TeamSection } from "@/components/about/TeamSection";
import { ProcessSection } from "@/components/about/ProcessSection";
import { BookingCalendarSection } from "@/components/about/BookingCalendarSection";
import { media } from "@/content/media";

export const ABOUT_PAGE_DEFAULTS: PageContent = {
  hero: {
    eyebrow: "",
    title: "About {company}",
    description:
      "We are a branding and digital design studio based in {address}. For over 8 years we have helped 500+ founders and businesses build memorable brands and high-converting online experiences.",
    primaryLabel: "",
    secondaryLabel: "",
  },
  sections: {
    story: {
      label: "Our story",
      eyebrow: "Who we are",
      title: "Where Design Meets *Engineering*",
      description:
        "Pixim Design was founded to close the gap between graphic designers who don't understand code and web developers who lack design sense.",
      secondaryLabel:
        "Our team works across both worlds. Your logo and packaging look right in print and on screen, and your website pairs careful typography with fast, modern technology.",
    },
    photo: { label: "Photo caption", description: "Design Director, {company}" },
    whatWeDo: { label: "“What we do” heading", eyebrow: "What we do", title: "Seven Services, *One Team*", buttonLabel: "View all services" },
    values: { label: "“Why clients choose us” heading", eyebrow: "Why clients choose us", title: "What You Can *Count On*" },
  },
  points: [
  "100% vector master source files delivered (AI, EPS, SVG, Figma, PNG)",
  "Full intellectual property and commercial copyright ownership",
  "Direct collaboration with lead specialists, with no middlemen",
  "30-day post-handover warranty and ongoing partner support",
],
  stats: AGENCY_STATS.map(({ value, label }) => ({ value, label })),
  cards: [
  {
    icon: Handshake,
    title: "Direct access to specialists",
    desc: "You work with the designers and developers doing the work, not a chain of account managers.",
  },
  {
    icon: FileCheck,
    title: "Full ownership",
    desc: "All master source files and commercial rights transfer to your business on final payment.",
  },
  {
    icon: MessageCircle,
    title: "Clear, fast communication",
    desc: "Progress updates at every milestone, with replies on WhatsApp or email typically within 2 hours.",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    desc: "A 30-day warranty covering adjustments and technical help after delivery.",
  },
],
};

/** Comprehensive about page: story, numbers, core team, process framework, services, values and calendar booking. */
export const AboutView: React.FC = () => {
  const { company } = useSettings();
  const SERVICES = useServices();
  const c = usePageContent(ABOUT_PAGE_DEFAULTS);
  const { story, photo, whatWeDo, values } = c.sections;
  // {company} and {address} in the texts are filled in from Site Settings
  const fill = (text = "") => text.replaceAll("{company}", company.name).replaceAll("{address}", company.address);
  return (
  <div className="w-full overflow-x-clip">
    {/* Header */}
    <section className="relative pt-32 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute top-28 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#FFA133] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-300" aria-current="page">
              About
            </li>
          </ol>
        </nav>
        <h1 className="font-agency text-[38px] sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.05]">
          {fill(c.hero.title)}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          {fill(c.hero.description)}
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <SectionTitle className="mt-4">
            <T text={story.title} />
          </SectionTitle>
          <p className="mt-5 text-base text-slate-300 leading-relaxed">{fill(story.description)}</p>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">{fill(story.secondaryLabel)}</p>
          <ul className="mt-7 space-y-3">
            {c.points!.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-slate-300">
                <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-[#FF8500]" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-md">
          <Image
            src={media("/images/consultation/director-card-clean.png")}
            alt="Pixim Design's design director"
            width={466}
            height={411}
            sizes="(max-width: 1024px) 90vw, 448px"
            className="w-full h-auto rounded-[28px] border border-[#2651B9]/30"
          />
          <figcaption className="mt-3 text-center text-sm text-slate-400">{fill(photo.description)}</figcaption>
        </figure>
      </div>
    </section>

    {/* Numbers */}
    <section aria-label="Pixim Design in numbers" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {c.stats!.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse rounded-[24px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-5 sm:p-6">
            <dt className="mt-2 text-sm font-semibold text-slate-300">{stat.label}</dt>
            <dd className="font-agency text-4xl sm:text-5xl font-extrabold text-white leading-none">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* Team Section (Image 1) */}
    <TeamSection />

    {/* Process Timeline Section (Image 2) */}
    <ProcessSection />

    {/* What we do */}
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
      <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
      <SectionTitle className="mt-4">
        <T text={whatWeDo.title} />
      </SectionTitle>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.id];
          return (
            <li key={service.id}>
              <Link
                href={`/services/${service.id}`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-4 transition-colors hover:border-[#FF8500]/50"
              >
                <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-bold text-white transition-colors group-hover:text-[#FFA133]">{service.title}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/services"
            className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-[#FF8500]/35 bg-[#FF8500]/10 p-4 text-sm font-bold text-[#FFA133] transition-colors hover:bg-[#FF8500]/15"
          >
            {whatWeDo.buttonLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </li>
      </ul>
    </section>

    {/* Values */}
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
      <Eyebrow>{values.eyebrow}</Eyebrow>
      <SectionTitle className="mt-4">
        <T text={values.title} />
      </SectionTitle>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {c.cards!.map(({ icon: Icon, title, desc }) => (
          <li key={title} className="flex items-start gap-4 rounded-[24px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-5 sm:p-6">
            <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
              <Icon className="w-5 h-5" />
            </span>
            <span>
              <span className="block font-agency text-lg font-extrabold text-white">{title}</span>
              <span className="mt-1 block text-sm text-slate-400 leading-relaxed">{desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>

    {/* Interactive Discovery Booking & Calendar Section (Image 3) */}
    <BookingCalendarSection />
  </div>
);
};
