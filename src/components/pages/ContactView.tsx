"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { ContactForm } from "@/components/ContactSection";
import { Price } from "@/components/currency/Price";
import { PageHero } from "@/components/page-kit/PageHero";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { Eyebrow, GradientText, SampleMark, SectionTitle } from "@/components/page-kit/shared";
import { ChipIconBox, FloatingChip, Lines, MonoLabel, TILE_DARK } from "@/components/page-kit/primitives";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import type { FaqItem } from "@/components/page-kit/types";
import { CONTACT_EMAIL, INTERNATIONAL_FAQ, PAYMENT_FAQ, WHATSAPP_URL } from "@/data/studioContent";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email us",
    value: CONTACT_EMAIL,
    sub: "For briefs, files and quotes",
    href: `mailto:${CONTACT_EMAIL}`,
    action: "Send an email",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    sub: "Quick questions and updates",
    href: WHATSAPP_URL,
    action: "Open WhatsApp",
    external: true,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Under 2 hours",
    sub: "Typical first reply",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Dhaka, Bangladesh",
    sub: "Working with clients worldwide",
  },
];

const NEXT_STEPS = [
  {
    title: "We review your brief",
    desc: "A specialist reads your brief and replies within 2 hours with first thoughts and any questions.",
  },
  {
    title: "Free 30-minute call",
    desc: "We talk through your goals, timeline and budget, and recommend the right scope.",
  },
  {
    title: "Fixed quote & kickoff",
    desc: "You receive a clear, fixed quote in BDT or USD. Once you approve it, we schedule the kickoff.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How quickly will you reply?",
    a: "We typically reply within 2 hours. Messages sent late at night Bangladesh time (GMT+6) are answered first thing the next morning.",
  },
  {
    q: "What should I include in my brief?",
    a: "Your business name, what you need (for example a logo, packaging or a website), examples you like, your budget range and your ideal launch date. If you're not sure about everything yet, that's fine; we'll work it out together on a call.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The 30-minute consultation is free and comes with no obligation. We'll review your goals and recommend the right scope and budget.",
  },
  {
    q: "Can we talk on WhatsApp or a video call?",
    a: "Of course. Many clients prefer WhatsApp for quick updates, and we hold consultations over Google Meet, Zoom or a WhatsApp call, whichever suits you.",
  },
  PAYMENT_FAQ,
  INTERNATIONAL_FAQ,
];

/* ---------- Hero composition ---------- */

const HeroVisual = () => (
  <div className="relative mx-auto max-w-md pb-6">
    <div className={`${TILE_DARK} p-5 sm:p-6`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <span className="flex w-9 h-9 items-center justify-center rounded-xl bg-[#FF8500]/12 border border-[#FF8500]/30 text-[#FFA133]">
            <Mail className="w-4 h-4" />
          </span>
          <span className="text-sm font-bold text-white">New project brief</span>
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">Received</span>
      </div>
      <dl className="mt-5 space-y-3">
        {[
          { label: "Service", value: "Logo & Brand Identity" },
          { label: "Budget", value: <Price usd="$100 - $200" bdt="৳12,000 - ৳24,000" /> },
          { label: "Launch", value: "In 2 weeks" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#081330]/70 px-3.5 py-2.5">
            <dt>
              <MonoLabel>{row.label}</MonoLabel>
            </dt>
            <dd className="text-xs font-semibold text-slate-200">{row.value}</dd>
          </div>
        ))}
      </dl>
      <Lines widths={["w-full", "w-11/12", "w-2/3"]} className="mt-4 space-y-1.5" />
    </div>

    <div className="relative -mt-4 ml-6 sm:ml-10 flex items-end gap-2.5">
      <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
        <SampleMark className="w-5 h-5" color="#FF8500" />
      </span>
      <div className="rounded-2xl rounded-bl-md bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-4 py-3 text-sm font-medium text-white shadow-[0_20px_45px_-18px_rgba(255,133,0,0.6)]">
        Thanks! Your brief is in. Free for a quick call tomorrow?
      </div>
    </div>
    <div className="mt-3 mr-2 flex justify-end">
      <div className="rounded-2xl rounded-br-md border border-white/10 bg-[#0C1E4E] px-4 py-3 text-sm text-slate-200 shadow-lg">
        Tomorrow at 11am works for me.
      </div>
    </div>

    <FloatingChip
      className="left-0 sm:-left-4 bottom-1"
      icon={
        <ChipIconBox>
          <Clock className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Replies in under 2 hrs"
    />
    <FloatingChip
      className="right-0 sm:-right-6 -top-4"
      delayed
      icon={
        <ChipIconBox>
          <MapPin className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="Dhaka · GMT+6"
      sub="Global remote"
    />
  </div>
);

/* ---------- Page ---------- */

export const ContactView: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useRevealAnimations(rootRef);

  const goToBrief = () => {
    document.getElementById("brief")?.scrollIntoView({ block: "start" });
    document.querySelector<HTMLInputElement>("#brief input")?.focus({ preventScroll: true });
  };

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s Build Something <GradientText>Remarkable Together</GradientText>
          </>
        }
        description="Book a free 30-minute consultation or send us your project brief. Our specialists typically respond with initial ideas within 2 hours."
        primary={{ label: "Send Your Brief", onClick: goToBrief }}
        secondary={{ label: "Email Us", href: `mailto:${CONTACT_EMAIL}` }}
        visual={<HeroVisual />}
      />

      {/* 2. Contact channels */}
      <section aria-label="Ways to reach us" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CHANNELS.map(({ icon: Icon, label, value, sub, href, action, external }) => {
            const body = (
              <>
                <span className="flex w-11 h-11 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133] transition-colors duration-300 group-hover:border-[#FF8500] group-hover:bg-[#FF8500] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="mt-5 block text-[10px] font-mono uppercase tracking-widest text-slate-500">{label}</span>
                <span className="mt-1 block break-words font-agency text-lg font-extrabold text-white">{value}</span>
                <span className="mt-1 block text-sm text-slate-400">{sub}</span>
                {action && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#FFA133] transition-colors group-hover:text-white">
                    {action}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                )}
              </>
            );
            const cardClass =
              "reveal-up group block rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 transition-[translate,border-color] duration-300";
            return href ? (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${cardClass} hover:-translate-y-1 hover:border-[#FF8500]/55`}
              >
                {body}
              </a>
            ) : (
              <div key={label} className={cardClass}>
                {body}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Brief form */}
      <section id="brief" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="reveal-up">
                <Eyebrow>Project Brief</Eyebrow>
                <SectionTitle className="mt-4">
                  Tell Us About <GradientText>Your Project</GradientText>
                </SectionTitle>
                <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                  Share a few details and we&apos;ll come back with ideas, a timeline and a fixed quote. No commitment needed.
                </p>
              </div>

              <ol className="mt-8 space-y-5">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step.title} className="reveal-up flex items-start gap-4">
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full border-2 border-[#FF8500]/60 font-mono text-sm font-bold text-[#FFA133]">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-agency text-lg font-extrabold text-white">{step.title}</span>
                      <span className="mt-0.5 block text-sm text-slate-400 leading-relaxed">{step.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className="reveal-up mt-8 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for new projects
              </p>
            </div>
          </div>

          <div className="reveal-up lg:col-span-7 rounded-[28px] border border-[#FF8500]/30 bg-[#0C1E4E]/85 p-6 sm:p-9 shadow-[0_30px_70px_-35px_rgba(255,133,0,0.45)]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 4. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="Verified Reviews from Valued Clients" subtitle="COMMITTED TO YOUR SUCCESS" speed={38} />
      </section>

      {/* 5. FAQ */}
      <FaqSplit
        title={
          <>
            Before You <GradientText>Reach Out</GradientText>
          </>
        }
        intro="Quick answers about replies, briefs, calls and payments."
        faqs={FAQS}
        onAsk={goToBrief}
        cardTitle="Prefer to talk first?"
        cardText="Send a short brief and we'll schedule a free 30-minute call at a time that suits you."
        cardCta="Send a brief"
      />
    </div>
  );
};
