"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, FileCheck, LifeBuoy, ShieldCheck, Wallet } from "lucide-react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { ProjectEstimator } from "@/components/ProjectEstimator";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { Price } from "@/components/currency/Price";
import { CurrencyToggle } from "@/components/currency/CurrencyToggle";
import { PageHero } from "@/components/page-kit/PageHero";
import { ClientLogoWall } from "@/components/page-kit/ClientLogoWall";
import { PackageTiers } from "@/components/page-kit/PackageTiers";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { GradientText, SectionHeading } from "@/components/page-kit/shared";
import { ChipIconBox, FloatingChip, TILE_DARK } from "@/components/page-kit/primitives";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import type { FaqItem, PackagesContent } from "@/components/page-kit/types";
import { SERVICES } from "@/data/agencyData";
import { SERVICE_PRICING, type TierKey } from "@/data/servicePricing";
import { CTA_VIDEOS, OWNERSHIP_FAQ, PAYMENT_FAQ } from "@/data/studioContent";

const PLANS: PackagesContent = {
  title: (
    <>
      Simple Plans, <GradientText>Clear Deliverables</GradientText>
    </>
  ),
  description:
    "Three starting points that fit most projects. Every plan is confirmed with a fixed quote for your exact scope before work begins.",
  tiers: {
    basic: {
      usd: "$75 – $180",
      bdt: "৳9,000 – ৳22,000",
      tagline: "Starter tier",
      desc: "Essential branding & assets for early-stage initiatives.",
      features: [
        "1 initial custom design concept",
        "Essential vector & raster exports (PNG, JPG, SVG)",
        "Standard typography & color codes",
        "2 rounds of feedback & tuning",
        "Email & chat communication",
        "3 to 5 business day delivery",
      ],
    },
    standard: {
      usd: "$180 – $500",
      bdt: "৳22,000 – ৳60,000",
      tagline: "Growing businesses",
      desc: "Complete commercial identity, website & marketing kit.",
      features: [
        "Multiple bespoke creative concepts",
        "Full master source files (AI, EPS, SVG, PNG, Figma)",
        "Comprehensive brand guidelines book",
        "Photorealistic 3D mockups or responsive web layouts",
        "Unlimited revisions until you're 100% satisfied",
        "Direct channel to your lead designer & developer",
        "30-day post-delivery support",
      ],
    },
    premium: {
      usd: "$500+",
      bdt: "৳60,000+",
      tagline: "Enterprise grade",
      desc: "Full-scale corporate branding, custom web app & 3D motion.",
      features: [
        "Full 360° corporate branding system & design tokens",
        "Custom Next.js or WordPress multi-page website",
        "3D packaging renders & animated intro video",
        "Complete on-page SEO & speed optimization",
        "Priority delivery & VIP support",
        "Commercial IP assignment for all final work",
        "Retainer options & ongoing growth consulting",
      ],
    },
  },
};

const TIERS: { key: TierKey; name: string }[] = [
  { key: "basic", name: "Basic" },
  { key: "standard", name: "Standard" },
  { key: "premium", name: "Premium" },
];

const INCLUDED = [
  {
    icon: FileCheck,
    title: "All master files",
    desc: "Never pay extra for AI, EPS, SVG or Figma source files. You receive every raw file.",
  },
  {
    icon: BadgeCheck,
    title: "Full ownership",
    desc: "Complete commercial rights to the final work transfer to your company on final payment.",
  },
  {
    icon: LifeBuoy,
    title: "30-day support",
    desc: "Complimentary adjustments and technical help for 30 days after delivery.",
  },
  {
    icon: Wallet,
    title: "Pay your way",
    desc: "bKash, Nagad, Rocket, bank transfer or cards in Bangladesh; cards or bank wire worldwide.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Are these prices fixed?",
    a: "The ranges show typical budgets. After a short call we send a fixed quote for your exact scope, and that price stays the same unless you decide to add to the scope.",
  },
  {
    q: "Which currency will I be billed in?",
    a: "Clients in Bangladesh are billed in Taka (BDT) and international clients in US dollars (USD). The site shows your local currency automatically, and you can switch at any time with the currency toggle.",
  },
  PAYMENT_FAQ,
  {
    q: "Are revisions included?",
    a: "Yes. The Basic plan includes 2 revision rounds, while Standard and Premium include unlimited revisions within the agreed scope until you're happy with the result.",
  },
  {
    q: "What if I need to cancel?",
    a: "Refunds depend on how far the project has progressed: payments for work that hasn't started are refundable, while completed milestones are billed. The full terms are in our Refund Policy, linked at the bottom of every page.",
  },
  OWNERSHIP_FAQ,
];

/* ---------- Hero composition ---------- */

const HERO_FEATURES = ["Full master source files", "Brand guidelines book", "Unlimited revisions", "30-day support"];

const HeroVisual = () => (
  <div className="relative mx-auto max-w-md pt-4">
    <div className={`${TILE_DARK} absolute inset-x-6 top-0 bottom-8 rotate-[5deg] opacity-60`} />
    <div className="relative rounded-[28px] border-2 border-[#FF8500] bg-gradient-to-b from-[#FF8500]/[0.16] via-[#0C1E4E] to-[#0C1E4E] p-6 sm:p-7 shadow-[0_30px_70px_-25px_rgba(255,133,0,0.5)]">
      <div className="flex items-center justify-between gap-3">
        <span className="font-agency text-xl font-extrabold text-[#FFA133]">Standard</span>
        <span className="rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Most Popular
        </span>
      </div>
      <span className="mt-5 block font-agency text-[32px] sm:text-[38px] font-extrabold text-white leading-tight">
        <Price usd={PLANS.tiers.standard.usd} bdt={PLANS.tiers.standard.bdt} />
      </span>
      <span className="mt-2 block text-sm text-slate-400">{PLANS.tiers.standard.desc}</span>
      <div className="my-5 h-px bg-white/[0.08]" />
      <ul className="space-y-2.5">
        {HERO_FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#FF8500]">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#FFA133] py-3 text-center text-sm font-bold text-white">
        Choose Standard
      </div>
    </div>

    <FloatingChip
      className="-left-2 sm:-left-6 -bottom-6"
      icon={
        <ChipIconBox>
          <ShieldCheck className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="No hidden fees"
      sub="Fixed quote before we start"
    />
    <FloatingChip
      className="right-0 sm:-right-4 -top-9"
      delayed
      icon={
        <ChipIconBox>
          <Wallet className="w-3.5 h-3.5" />
        </ChipIconBox>
      }
      title="bKash · Nagad · Cards"
      sub="Billed in BDT or USD"
    />
  </div>
);

/* ---------- Page ---------- */

export const PricingView: React.FC = () => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLDivElement>(null);

  useRevealAnimations(rootRef);

  const quote = (note: string) => openContact("Custom Quote", note);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        eyebrow="Transparent Pricing"
        title={
          <>
            Flexible Plans, <GradientText>Transparent Pricing</GradientText>
          </>
        }
        description="Predictable scopes and zero surprises. Prices show in Taka for Bangladesh and in US dollars everywhere else. Pick a plan, compare services or build a custom estimate."
        primary={{ label: "Get a Custom Quote", onClick: () => quote("I'd like a custom quote for my project.") }}
        secondary={{ label: "Estimate Your Project", href: "#estimator" }}
        visual={<HeroVisual />}
      >
        <div className="hero-reveal mt-7 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Show prices in</span>
          <CurrencyToggle />
        </div>
      </PageHero>

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. General plans */}
      <PackageTiers
        id="plans"
        eyebrow="Plans"
        packages={PLANS}
        showCurrencyToggle={false}
        onChoose={(name, price) => openContact(`${name} Plan`, `I'm interested in the ${name} plan (${price}).`)}
        onCustom={() => quote("I'd like a tailored quote for my project.")}
      />

      {/* 4. Price ranges per service */}
      <section id="service-pricing" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <SectionHeading
          eyebrow="By Service"
          title={
            <>
              Pricing for <GradientText>Every Service</GradientText>
            </>
          }
          desc="Typical package ranges for each service. Open a service to see exactly what every package includes."
        />

        <div className="reveal-up mt-12 overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/60">
          <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-white/[0.08] px-7 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span className="col-span-4">Service</span>
            <span className="col-span-6 grid grid-cols-3 gap-4">
              {TIERS.map((tier) => (
                <span key={tier.key}>{tier.name}</span>
              ))}
            </span>
            <span className="col-span-2 text-right">Details</span>
          </div>

          <ul className="divide-y divide-white/[0.06]">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.id];
              const pricing = SERVICE_PRICING[service.id];
              return (
                <li
                  key={service.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 px-5 sm:px-7 py-6 lg:items-center transition-colors hover:bg-white/[0.02]"
                >
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <span className="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block font-agency text-lg font-extrabold text-white leading-tight">{service.title}</span>
                      <span className="block text-xs text-slate-500">{service.badge}</span>
                    </span>
                  </div>

                  <dl className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    {TIERS.map((tier) => (
                      <div
                        key={tier.key}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#081330]/60 px-4 py-3 sm:block lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                      >
                        <dt className="text-[10px] font-mono uppercase tracking-widest text-slate-500 lg:sr-only">{tier.name}</dt>
                        <dd className="font-agency text-base font-extrabold text-white sm:mt-1 lg:mt-0">
                          <Price usd={pricing[tier.key].usd} bdt={pricing[tier.key].bdt} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="lg:col-span-2 lg:text-right">
                    <Link
                      href={`/services/${service.id}#service-packages`}
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#FFA133] transition-colors hover:text-white"
                    >
                      See packages
                      <span className="sr-only">for {service.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. Interactive estimator */}
      <ProjectEstimator onEstimateSubmit={(summary) => openContact("Estimate from Pricing Page", `Scope: ${summary}`)} />

      {/* 6. Included in every plan */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Included in Every Plan"
          title={
            <>
              No Hidden Costs, <GradientText>Ever</GradientText>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INCLUDED.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="reveal-up rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/70 p-6 sm:p-7 transition-colors hover:border-[#FF8500]/45">
              <span className="flex w-11 h-11 items-center justify-center rounded-xl border border-[#FF8500]/30 bg-[#FF8500]/12 text-[#FFA133]">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-5 font-agency text-xl font-extrabold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="What Founders Say About Our Value" subtitle="TRANSPARENT CLIENT REVIEWS" speed={38} />
      </section>

      {/* 8. FAQ */}
      <FaqSplit
        title={
          <>
            Pricing Questions, <GradientText>Answered</GradientText>
          </>
        }
        faqs={FAQS}
        onAsk={() => quote("I have a few questions about pricing.")}
      />

      {/* 9. Final CTA */}
      <ReadyForLogoSection
        onOpenContact={(service, note) => openContact(service, note)}
        titleLead="Let's Price"
        titleHighlight="Your Project"
        description="Share your brief and get a clear, fixed quote in Taka or US dollars, with no hidden fees."
        primaryService="Custom Quote"
        primaryNote="I'd like a fixed quote for my project."
        secondaryService="Pricing Consultation"
        secondaryNote="I would like to book a free call to discuss pricing."
        {...CTA_VIDEOS.grow}
      />
    </div>
  );
};
