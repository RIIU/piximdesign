"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  FileCheck,
  Globe2,
  Handshake,
  LifeBuoy,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Package,
  PenTool,
  TrendingUp,
} from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { PageHero } from "@/components/page-kit/PageHero";
import { ClientLogoWall } from "@/components/page-kit/ClientLogoWall";
import { ScrollStatement } from "@/components/page-kit/ScrollStatement";
import { ProcessTimeline } from "@/components/page-kit/ProcessTimeline";
import { WhySplit } from "@/components/page-kit/WhySplit";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { Eyebrow, GradientText, SampleMark, SectionTitle } from "@/components/page-kit/shared";
import { ChipIconBox, FloatingChip, MonoLabel, TILE_DARK, TILE_DEEP, TILE_ORANGE } from "@/components/page-kit/primitives";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import type { FaqItem, StatementContent, WhyContent } from "@/components/page-kit/types";
import { INDUSTRIES } from "@/data/agencyData";
import { CTA_VIDEOS, OWNERSHIP_FAQ, STUDIO_PROCESS } from "@/data/studioContent";

const STATEMENT: StatementContent = {
  eyebrow: "Our Mission",
  text: "We started Pixim Design to close the gap between designers who don't understand code and developers who lack design sense. Today one team takes your brand from the first sketch to a fast, live website.",
  highlights: ["gap", "one", "team", "first", "sketch", "live", "website."],
  pillars: [
    {
      title: "Design-led",
      desc: "Every project starts with strategy and craft: research, concepts and typography that make a brand memorable.",
    },
    {
      title: "Engineering-backed",
      desc: "Designs are built for the real world, from print-ready packaging files to fast, accessible websites.",
    },
    {
      title: "Growth-focused",
      desc: "We measure success by your results: more enquiries, more sales and a brand people recognise.",
    },
  ],
};

const STORY_POINTS = [
  "100% vector master source files delivered (AI, EPS, SVG, Figma, PNG)",
  "Full intellectual property and commercial copyright ownership",
  "Direct collaboration with lead specialists, with no middlemen",
  "30-day post-handover warranty and ongoing partner support",
];

const PILLARS = [
  {
    icon: PenTool,
    title: "Strategic Brand Identity",
    highlight: "8+ years of vector craft",
    desc: "Memorable visual identities, typography guidelines and brand language that command market authority.",
  },
  {
    icon: MonitorSmartphone,
    title: "Next-Gen Web Engineering",
    highlight: "Sub-second performance",
    desc: "Fast, mobile-first websites built with Next.js, React and WordPress, optimized for quick loads and search.",
  },
  {
    icon: Package,
    title: "Retail Packaging & 3D Renders",
    highlight: "Print-ready die-cuts",
    desc: "Box, label and pouch packaging with photorealistic 3D mockups that stand out on physical and digital shelves.",
  },
  {
    icon: TrendingUp,
    title: "Conversion-Focused Growth",
    highlight: "Data-driven ROI",
    desc: "Campaign graphics, video teasers and organic SEO built to turn attention into enquiries and sales.",
  },
];

const WHY: WhyContent = {
  title: (
    <>
      What You Can <GradientText>Count On</GradientText>
    </>
  ),
  items: [
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
  tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Blender", "Next.js", "React", "WordPress", "Meta Ads", "Google Ads"],
  highlight: {
    value: String(INDUSTRIES.length),
    label: "Industries we know inside out",
    chips: INDUSTRIES.map((industry) => industry.shortName),
  },
};

const FAQS: FaqItem[] = [
  {
    q: "Where is Pixim Design based?",
    a: "Our studio is in Dhaka, Bangladesh. We work with businesses across Bangladesh and, remotely, with clients around the world.",
  },
  {
    q: "Who will I work with?",
    a: "You'll work directly with the lead designer or developer on your project, so feedback is quick and nothing gets lost along the way.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Startups, small businesses and established brands in e-commerce and retail, food and restaurants, education and coaching, tech and SaaS, fashion and lifestyle, and real estate and automotive.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute consultation or send us a brief from the contact page. We'll reply with next steps and, after a short call, a fixed quote for your project.",
  },
  OWNERSHIP_FAQ,
];

/* ---------- Hero composition: design meets engineering ---------- */

const CODE_LINES = [
  { indent: 0, parts: [{ c: "text-slate-500", t: "<" }, { c: "text-[#FFA133]", t: "Brand" }] },
  { indent: 1, parts: [{ c: "text-sky-300", t: "logo" }, { c: "text-slate-500", t: "=" }, { c: "text-emerald-300", t: '"mark.svg"' }] },
  { indent: 1, parts: [{ c: "text-sky-300", t: "font" }, { c: "text-slate-500", t: "=" }, { c: "text-emerald-300", t: '"Agency"' }] },
  { indent: 1, parts: [{ c: "text-sky-300", t: "fast" }] },
  { indent: 0, parts: [{ c: "text-slate-500", t: "/>" }] },
];

const HeroVisual = () => (
  <div className="relative">
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className={`${TILE_DARK} relative aspect-square overflow-hidden p-4 sm:p-5 flex flex-col justify-between`}>
        <MonoLabel>Design</MonoLabel>
        <div className="relative mx-auto flex w-[62%] aspect-square items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-dashed border-[#FF8500]/40" />
          <span className="absolute inset-[18%] rounded-full border border-white/10" />
          <span className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <span className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
          <SampleMark className="relative w-[58%] h-[58%]" color="#FF8500" />
          {["left-0 top-1/2", "right-0 top-1/2", "left-1/2 top-0", "left-1/2 bottom-0"].map((pos) => (
            <span key={pos} className={`absolute ${pos} w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#FFA133] bg-[#081330]`} />
          ))}
        </div>
        <div className="flex gap-1.5">
          {["#FF8500", "#FFA133", "#2651B9", "#F8FAFC"].map((hex) => (
            <span key={hex} className="h-3 flex-1 rounded-full border border-white/10" style={{ background: hex }} />
          ))}
        </div>
      </div>

      <div className={`${TILE_DEEP} aspect-square p-4 sm:p-5 flex flex-col justify-between`}>
        <MonoLabel>Engineering</MonoLabel>
        <pre className="font-mono text-[10px] sm:text-xs leading-relaxed">
          {CODE_LINES.map((line, i) => (
            <span key={i} className="block" style={{ paddingLeft: `${line.indent * 1.25}em` }}>
              {line.parts.map((part, j) => (
                <span key={j} className={part.c}>
                  {part.t}
                </span>
              ))}
            </span>
          ))}
        </pre>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Live in 0.8s
        </span>
      </div>

      <div className={`${TILE_ORANGE} relative col-span-2 overflow-hidden p-5 sm:p-6 flex items-center justify-between gap-4`}>
        <SampleMark className="absolute -right-8 -bottom-10 w-40 h-40 opacity-15" color="#FFFFFF" />
        <div className="relative flex items-center gap-3">
          <span className="flex w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-2xl bg-white shadow-md">
            <Image src="/images/logo-mark.png" alt="" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8" />
          </span>
          <span>
            <span className="block font-agency text-xl sm:text-2xl font-extrabold text-white leading-none">Pixim Design</span>
            <span className="mt-1 block text-[11px] text-white/85">Designed & built by one team</span>
          </span>
        </div>
        <span className="relative hidden sm:block text-right">
          <span className="block font-agency text-3xl font-extrabold text-white leading-none">500+</span>
          <span className="block text-[11px] text-white/85">brands launched</span>
        </span>
      </div>
    </div>

    <FloatingChip
      className="left-3 -bottom-9"
      icon={
        <ChipIconBox>
          <MapPin className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Dhaka, Bangladesh"
      sub="Studio HQ"
    />
    <FloatingChip
      className="right-2 sm:-right-4 top-[46%]"
      delayed
      icon={
        <ChipIconBox>
          <Globe2 className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Clients worldwide"
    />
  </div>
);

/* ---------- Page ---------- */

export const AboutView: React.FC = () => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLDivElement>(null);

  useRevealAnimations(rootRef);

  const consult = (note: string) => openContact("Free Consultation", note);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Pixim Design"
        title={
          <>
            Turning Bold Ideas Into <GradientText>Market-Leading Brands</GradientText>
          </>
        }
        description="We are a branding and digital design studio based in Dhaka, Bangladesh. For over 8 years we have helped 500+ ambitious founders and businesses build unforgettable brands and high-converting online experiences."
        primary={{ label: "Book a Free Consultation", onClick: () => consult("I'd like to book a free 30-minute consultation.") }}
        secondary={{ label: "Explore Services", href: "/services" }}
        visual={<HeroVisual />}
      />

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. Mission statement */}
      <ScrollStatement statement={STATEMENT} />

      {/* 4. Story + what we do */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="reveal-up">
              <Eyebrow>Our Story</Eyebrow>
              <SectionTitle className="mt-4">
                Where Precision Design Meets <GradientText>Engineering Excellence</GradientText>
              </SectionTitle>
              <p className="mt-5 text-base text-slate-300 leading-relaxed">
                Pixim Design was founded with a clear mission: to eliminate the frustrating gap between graphic designers who
                don&apos;t understand code and web developers who lack design sensibility.
              </p>
              <p className="mt-3 text-base text-slate-400 leading-relaxed">
                Our team bridges both worlds. When we create your logo or packaging, we make sure it looks stunning in print
                and on screen. When we build your website, we pair pixel-perfect typography with fast, modern infrastructure.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {STORY_POINTS.map((point) => (
                <li key={point} className="reveal-up flex items-start gap-3 text-sm sm:text-base text-slate-300">
                  <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-[#FF8500]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map(({ icon: Icon, title, highlight, desc }, i) => (
              <div
                key={title}
                className={`reveal-up rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 sm:p-7 transition-colors hover:border-[#FF8500]/45 ${
                  i % 2 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <span className="flex w-12 h-12 items-center justify-center rounded-2xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="mt-5 inline-flex rounded-full border border-[#FF8500]/30 bg-[#FF8500]/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFA133]">
                  {highlight}
                </span>
                <h3 className="mt-3 font-agency text-xl font-extrabold text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Values + stats */}
      <WhySplit why={WHY} eyebrow="Our Promise" />

      {/* 6. Process */}
      <ProcessTimeline
        title={
          <>
            How We <GradientText>Work Together</GradientText>
          </>
        }
        description="A simple, transparent process that keeps you informed from the first call to the final handover."
        steps={STUDIO_PROCESS}
      />

      {/* 7. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="Trusted by 500+ High-Growth Brands" subtitle="VERIFIED CLIENT VOICES" speed={40} />
      </section>

      {/* 8. FAQ */}
      <FaqSplit
        title={
          <>
            Getting to <GradientText>Know Us</GradientText>
          </>
        }
        intro="A few things clients often ask before working with us."
        faqs={FAQS}
        onAsk={() => consult("I'd like to learn more about working with Pixim Design.")}
      />

      {/* 9. Final CTA */}
      <ReadyForLogoSection
        onOpenContact={(service, note) => openContact(service, note)}
        titleLead="Ready to Elevate"
        titleHighlight="Your Brand's Identity?"
        description="Schedule a free 30-minute consultation call. We'll review your goals and suggest the ideal strategy for your business."
        primaryService="Free Consultation"
        primaryNote="I'd like to book a free 30-minute consultation."
        secondaryService="Brand Consultation"
        secondaryNote="I would like to book a consultation about my brand."
        {...CTA_VIDEOS.branding}
      />
    </div>
  );
};
