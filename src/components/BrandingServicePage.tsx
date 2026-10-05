"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Compass,
  CreditCard,
  FileCheck,
  Gem,
  IdCard,
  Lightbulb,
  Palette,
  PenTool,
  RefreshCw,
  Send,
  ShieldCheck,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { LogoCarousel } from "@/components/LogoCarousel";
import { StatsBar } from "@/components/StatsBar";
import { BrandStoriesSection } from "@/components/BrandStoriesSection";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapMagneticButton, GsapReviewsInfiniteSlider } from "@/components/animations";

type Tier = { usd: string; bdt: string; desc: string };

interface BrandingServicePageProps {
  pricing: { basic: Tier; standard: Tier; premium: Tier };
  deliverables: string[];
}

const BRANDING_SERVICES: { icon: LucideIcon; title: string; desc: string; tags: string[] }[] = [
  {
    icon: PenTool,
    title: "Logo Design",
    desc: "A distinctive, scalable mark built on strategy, not trends, so it works from a favicon to a billboard.",
    tags: ["Primary & secondary marks", "Monochrome versions", "Vector source"],
  },
  {
    icon: Palette,
    title: "Brand Identity Design",
    desc: "Colour palette, typography and visual language that make every touchpoint instantly recognisable.",
    tags: ["Colour system", "Typography", "Visual language"],
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    desc: "A clear rulebook so your team, printers and agencies apply your brand the same way, every time.",
    tags: ["Logo usage", "Do's & don'ts", "PDF brand book"],
  },
  {
    icon: IdCard,
    title: "Stationery Design",
    desc: "Letterheads, envelopes, invoices and email signatures that make every document look professional.",
    tags: ["Letterhead", "Envelope", "Email signature"],
  },
  {
    icon: CreditCard,
    title: "Business Card Design",
    desc: "Print-ready cards with premium finishes that leave a lasting first impression after every meeting.",
    tags: ["Print-ready", "Front & back", "Finish guidance"],
  },
  {
    icon: RefreshCw,
    title: "Rebranding & Brand Refresh",
    desc: "Modernise an outdated identity while keeping the equity your customers already recognise.",
    tags: ["Brand audit", "Evolution concepts", "Rollout plan"],
  },
];

const PROCESS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Compass, title: "Discover", desc: "A brief and short call to understand your business, audience and competitors." },
  { icon: Target, title: "Strategize", desc: "Brand positioning, personality and a moodboard that sets the creative direction." },
  { icon: Lightbulb, title: "Concepts", desc: "Multiple original logo and identity concepts presented with real-world mockups." },
  { icon: PenTool, title: "Refine", desc: "We polish your chosen direction through feedback rounds until it feels right." },
  { icon: Send, title: "Deliver", desc: "Final source files, brand guidelines and ready-to-use assets, with full IP." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Gem, title: "Strategy-first design", desc: "Every mark is built from your positioning and audience, not from templates or trends." },
  { icon: ShieldCheck, title: "100% IP ownership", desc: "All master files (AI, SVG, EPS, PNG, PDF) and full commercial rights are yours." },
  { icon: Clock, title: "3–7 day delivery", desc: "Structured sprints get your identity launch-ready in days, not months." },
  { icon: FileCheck, title: "30-day warranty", desc: "Complimentary tweaks and support after handover, so the rollout goes smoothly." },
];

const BRANDING_FAQS = [
  {
    q: "What is the difference between a logo and a brand identity?",
    a: "A logo is the mark itself. A brand identity is the full system around it: colours, typography, imagery style, and the rules for using them, so your brand looks consistent everywhere.",
  },
  {
    q: "How long does a branding project take?",
    a: "Most logo and identity projects are delivered in 3 to 7 business days. Larger rebrands with stationery and guidelines are planned with weekly milestones.",
  },
  {
    q: "How many concepts and revisions do I get?",
    a: "It depends on the package. Basic includes one initial concept with feedback rounds, while Standard and Premium include multiple concepts and revisions until you are 100% satisfied.",
  },
  {
    q: "Which files will I receive?",
    a: "You get print and digital master files (AI, EPS, SVG, PDF, high-res transparent PNG and JPG), plus a brand guidelines PDF on Standard and Premium packages.",
  },
  {
    q: "Do I own the copyright to my logo?",
    a: "Yes. On final payment, full commercial and intellectual property rights are transferred to your business.",
  },
];

const SectionHeading: React.FC<{ eyebrow: string; title: React.ReactNode; desc?: string; align?: "center" | "left" }> = ({
  eyebrow,
  title,
  desc,
  align = "center",
}) => (
  <div className={`brand-reveal max-w-3xl mb-12 sm:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
    <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#081330]/80 text-[#FFA133] border border-[#FF8500]/30 font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
      {eyebrow}
    </span>
    <h2 className="mt-4 font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
      {title}
    </h2>
    {desc && <p className="mt-4 text-slate-400 text-base sm:text-lg">{desc}</p>}
  </div>
);

const Gradient: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">{children}</span>
);

export const BrandingServicePage: React.FC<BrandingServicePageProps> = ({ pricing, deliverables }) => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>(".brand-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
      gsap.fromTo(
        ".brand-hero-item",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
      );
    },
    { scope: rootRef }
  );

  const tiers = [
    { key: "basic", name: "Basic", tier: pricing.basic, popular: false },
    { key: "standard", name: "Standard", tier: pricing.standard, popular: true },
    { key: "premium", name: "Premium", tier: pricing.premium, popular: false },
  ];

  return (
    <main ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.25),transparent_70%)] pointer-events-none" />
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.15),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="brand-hero-item flex items-center gap-2 text-xs text-slate-500 mb-5">
              <Link href="/" className="hover:text-[#FFA133] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#FFA133] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-slate-300">Branding</span>
            </nav>

            <span className="brand-hero-item inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/35 font-mono font-bold">
              Logo & Brand Identity Design
            </span>

            <h1 className="brand-hero-item mt-5 font-agency text-[34px] sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.05]">
              Branding That Makes Your Business <Gradient>Unforgettable</Gradient>
            </h1>

            <p className="brand-hero-item mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              We craft strategic logos and complete brand identities that build trust at first glance, set you apart from
              competitors and stay consistent across every touchpoint.
            </p>

            <div className="brand-hero-item mt-8 flex flex-wrap items-center gap-3.5">
              <GsapMagneticButton
                onClick={() => openContact("Logo & Brand Identity", "I'd like to start a branding project.")}
                variant="primary"
                strength={0.25}
                className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] !text-white shadow-lg shadow-orange-500/25"
              >
                <span>Start Your Brand</span>
                <ArrowRight className="w-4 h-4" />
              </GsapMagneticButton>
              <Link
                href="#branding-packages"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.06] text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/[0.1] transition-colors"
              >
                View Packages
              </Link>
            </div>

            {/* Trust row */}
            <div className="brand-hero-item mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex text-[#FFA133]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-300">
                  <strong className="text-white">4.9</strong> client rating
                </span>
              </div>
              <div className="text-sm text-slate-300">
                <strong className="text-white">500+</strong> brands launched
              </div>
              <div className="text-sm text-slate-300">
                <strong className="text-white">8+</strong> years experience
              </div>
            </div>
          </div>

          {/* Brand kit visual */}
          <div className="brand-hero-item lg:col-span-5" aria-hidden>
            <div className="relative grid grid-cols-6 gap-3 sm:gap-4">
              {/* Logo tile */}
              <div className="col-span-4 aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] p-6 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(255,133,0,0.5)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">Primary mark</span>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rotate-45 rounded-md bg-[#081330]" />
                  </span>
                  <span className="font-agency text-2xl sm:text-3xl font-extrabold text-white">yourbrand</span>
                </div>
              </div>
              {/* Type tile */}
              <div className="col-span-2 aspect-[2/3] sm:aspect-auto rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90 p-4 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Type</span>
                <span className="font-agency text-5xl font-extrabold text-white leading-none">Aa</span>
                <span className="text-[10px] text-slate-400">Agency · Jakarta</span>
              </div>
              {/* Palette */}
              <div className="col-span-3 rounded-3xl border border-[#2651B9]/35 bg-[#0C1E4E]/90 p-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Palette</span>
                <div className="mt-3 flex gap-2">
                  {["#FF8500", "#FFA133", "#2651B9", "#081330", "#F8FAFC"].map((c) => (
                    <span key={c} className="flex-1 h-10 rounded-xl border border-white/10" style={{ background: c }} />
                  ))}
                </div>
              </div>
              {/* Business card */}
              <div className="col-span-3 rounded-3xl border border-[#2651B9]/35 bg-gradient-to-br from-[#0F2260] to-[#081330] p-4 flex flex-col justify-between rotate-[-3deg] shadow-xl">
                <span className="w-6 h-6 rotate-45 rounded-md bg-[#FF8500]" />
                <div>
                  <div className="h-1.5 w-20 rounded bg-white/80" />
                  <div className="mt-1.5 h-1.5 w-14 rounded bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client logos */}
      <section className="relative pb-8">
        <p className="brand-reveal text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">
          Trusted by growing brands
        </p>
        <LogoCarousel />
      </section>

      {/* 3. Branding services */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Branding Services"
          title={<>Everything Your Brand Needs <br /><Gradient>To Stand Out</Gradient></>}
          desc="From the first sketch of your logo to the last page of your brand book, one team handles your entire identity."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDING_SERVICES.map(({ icon: Icon, title, desc, tags }) => (
            <button
              key={title}
              type="button"
              onClick={() => openContact("Logo & Brand Identity", `I'm interested in ${title}.`)}
              className="brand-reveal pixxen-service-card group text-left flex flex-col p-7 cursor-pointer"
            >
              <div className="relative z-10 flex flex-col h-full">
                <span className="w-12 h-12 rounded-2xl bg-[#081330]/80 border border-[#2651B9]/30 flex items-center justify-center text-[#FFA133] group-hover:bg-[#FF8500] group-hover:border-[#FF8500] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-5 font-agency text-xl font-extrabold text-white group-hover:text-[#FFA133] transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[#081330]/70 border border-[#2651B9]/25 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                  Discuss this service
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Stats */}
      <StatsBar className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4" />

      {/* 5. Portfolio */}
      <BrandStoriesSection onOpenContact={() => openContact("Logo & Brand Identity")} />

      {/* 6. Process */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How We Work"
          title={<>Our Branding <Gradient>Process</Gradient></>}
          desc="A clear, collaborative process so you always know what happens next."
        />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {PROCESS.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="brand-reveal relative rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 hover:border-[#FF8500]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-[#FF8500]/15 border border-[#FF8500]/35 flex items-center justify-center text-[#FFA133]">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-agency text-3xl font-extrabold text-white/10">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-agency text-lg font-extrabold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. Packages + deliverables */}
      <section id="branding-packages" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <SectionHeading
          eyebrow="Pricing"
          title={<>Branding <Gradient>Packages</Gradient></>}
          desc="Transparent pricing in USD and BDT with zero hidden fees."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map(({ key, name, tier, popular }) => (
            <div
              key={key}
              className={`brand-reveal relative flex flex-col rounded-3xl p-7 ${
                popular
                  ? "border-2 border-[#FF8500] bg-gradient-to-b from-[#FF8500]/15 to-[#0C1E4E] shadow-[0_25px_60px_-20px_rgba(255,133,0,0.45)]"
                  : "border border-[#2651B9]/30 bg-[#0C1E4E]/80"
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <span className={`text-sm font-bold ${popular ? "text-[#FFA133]" : "text-slate-300"}`}>{name}</span>
              <span className="mt-3 font-agency text-3xl font-extrabold text-white">{tier.usd}</span>
              <span className="mt-1 text-xs font-mono text-slate-400">{tier.bdt}</span>
              <p className="mt-4 flex-1 text-sm text-slate-300 leading-relaxed">{tier.desc}</p>
              <button
                type="button"
                onClick={() => openContact("Logo & Brand Identity", `I'm interested in the ${name} branding package (${tier.usd}).`)}
                className={`mt-7 w-full rounded-xl py-3 text-sm font-bold transition-all cursor-pointer ${
                  popular
                    ? "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40"
                    : "bg-[#081330] border border-[#2651B9]/35 text-slate-200 hover:border-[#FF8500]/50 hover:text-white"
                }`}
              >
                Choose {name}
              </button>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div className="brand-reveal mt-10 rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/60 p-7 sm:p-9">
          <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white">What you receive</h3>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm sm:text-base text-slate-300">
                <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/40 shrink-0">
                  <Check className="w-3 h-3 text-[#FFA133]" strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Why Pixim */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why Pixim"
          title={<>Why Brands Trust Us <br /><Gradient>With Their Identity</Gradient></>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="brand-reveal rounded-3xl border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-7 text-center">
              <span className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8500] to-[#FFA133] flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-agency text-lg font-extrabold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="What Clients Say About Our Branding" subtitle="PROVEN TRACK RECORD" speed={38} />
      </section>

      {/* 10. FAQ */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeading eyebrow="FAQ" title={<>Branding <Gradient>Questions, Answered</Gradient></>} />
        <div className="space-y-3">
          {BRANDING_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className={`brand-reveal rounded-2xl border transition-colors ${
                  isOpen ? "border-[#FF8500]/55 bg-[#0C1E4E]/95" : "border-[#2651B9]/30 bg-[#0C1E4E]/70 hover:border-[#FF8500]/35"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FFA133]" : "text-slate-400"}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 sm:px-6 pb-6 -mt-1 text-sm sm:text-base text-slate-300 leading-relaxed">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Final CTA */}
      <ReadyForLogoSection onOpenContact={(service, note) => openContact(service, note)} />
    </main>
  );
};
