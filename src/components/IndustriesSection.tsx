"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Rocket,
  Shirt,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { INDUSTRIES, SERVICES } from "@/data/agencyData";
import { GsapMagneticButton } from "@/components/animations";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  ecommerce: ShoppingBag,
  food: UtensilsCrossed,
  education: GraduationCap,
  tech: Rocket,
  fashion: Shirt,
  realestate: Building2,
};

interface IndustriesSectionProps {
  onOpenContact?: (service?: string, note?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenContact }) => {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[0];
  const ActiveIcon = INDUSTRY_ICONS[active.id];
  const stack = active.services
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  // Section entrance
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ".industry-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Panel content swap on tab change
  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current.querySelectorAll(".industry-panel-item"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    },
    { dependencies: [activeId], scope: panelRef }
  );

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 133, 0, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Section Header */}
      <div className="industry-reveal text-center max-w-3xl mx-auto mb-12 sm:mb-14 relative z-10">
        <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
          Branding Built Around <br />
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            Your Industry
          </span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Every market has its own rules. Pick yours and see the exact service stack we use to grow brands like you.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Industry Tabs: horizontal scroll on mobile, vertical list on desktop */}
        <div
          role="tablist"
          aria-label="Industries"
          className="industry-reveal lg:col-span-5 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 lg:pb-0 snap-x scroll-px-4 sm:scroll-px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {INDUSTRIES.map((industry) => {
            const Icon = INDUSTRY_ICONS[industry.id];
            const isActive = industry.id === activeId;
            return (
              <button
                key={industry.id}
                type="button"
                role="tab"
                id={`industry-tab-${industry.id}`}
                aria-selected={isActive}
                aria-controls="industry-panel"
                onClick={() => setActiveId(industry.id)}
                className={`group snap-start shrink-0 lg:shrink flex items-center gap-3 sm:gap-4 rounded-2xl border px-4 py-3 lg:px-5 lg:py-4 text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF8500]/15 to-[#0C1E4E]/80 border-[#FF8500]/55 shadow-[0_10px_30px_-12px_rgba(255,133,0,0.35)]"
                    : "bg-[#0C1E4E]/60 border-[#2651B9]/25 hover:border-[#FF8500]/40 hover:bg-[#0C1E4E]/90"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 lg:w-11 lg:h-11 rounded-xl border transition-colors duration-300 shrink-0 ${
                    isActive
                      ? "bg-[#FF8500] border-[#FF8500] text-white"
                      : "bg-[#081330]/80 border-[#2651B9]/30 text-slate-300 group-hover:text-[#FFA133]"
                  }`}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </span>
                <span
                  className={`whitespace-nowrap lg:whitespace-normal text-sm lg:text-base font-bold transition-colors ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {industry.name}
                </span>
                <ArrowRight
                  className={`hidden lg:block ml-auto w-4 h-4 transition-all duration-300 ${
                    isActive ? "text-[#FFA133] translate-x-0 opacity-100" : "text-slate-500 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Active Industry Playbook Panel */}
        <div
          ref={panelRef}
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active.id}`}
          className="industry-reveal lg:col-span-7 relative overflow-hidden rounded-[28px] border border-[#2651B9]/30 bg-[#0C1E4E]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10"
        >
          {/* Corner glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.22),transparent_70%)] pointer-events-none" />

          {/* Watermark icon */}
          <ActiveIcon
            aria-hidden
            className="absolute -bottom-8 -right-6 w-48 h-48 text-white/[0.03] pointer-events-none"
            strokeWidth={1.25}
          />

          <div className="relative z-10">
            <span className="industry-panel-item inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#081330]/80 text-[#FFA133] border border-[#FF8500]/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500]" />
              {active.name} Playbook
            </span>

            <h3 className="industry-panel-item mt-5 font-agency text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight">
              {active.headline}
            </h3>

            <p className="industry-panel-item mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              {active.challenge}
            </p>

            {/* What you get */}
            <ul className="mt-7 space-y-3">
              {active.outcomes.map((outcome) => (
                <li key={outcome} className="industry-panel-item flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF8500]/15 border border-[#FF8500]/40 shrink-0">
                    <Check className="w-3 h-3 text-[#FFA133]" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base text-slate-200">{outcome}</span>
                </li>
              ))}
            </ul>

            {/* Recommended service stack */}
            <div className="industry-panel-item mt-8 pt-6 border-t border-[#2651B9]/25">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-3">
                Recommended service stack
              </p>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#2651B9]/35 bg-[#081330]/70 pl-2 pr-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-[#FF8500]/60 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-[10px] sm:text-xs text-slate-500 group-hover:text-[#FFA133] transition-colors">
                      {service.number}
                    </span>
                    {service.title}
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FFA133] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="industry-panel-item mt-8">
              <GsapMagneticButton
                onClick={() =>
                  onOpenContact?.(
                    `${active.name} Branding`,
                    `I run a ${active.name.toLowerCase()} business and would like a plan covering: ${stack
                      .map((s) => s.title)
                      .join(", ")}.`
                  )
                }
                variant="primary"
                strength={0.25}
                className="px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider !bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white shadow-lg shadow-orange-500/25"
              >
                <span>Get My {active.shortName} Plan</span>
                <ArrowRight className="w-4 h-4" />
              </GsapMagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
