"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { ServiceHero } from "./sections/ServiceHero";
import { ClientLogoWall } from "./sections/ClientLogoWall";
import { ServiceStatement } from "./sections/ServiceStatement";
import { ServiceBento } from "./sections/ServiceBento";
import { ServiceShowcase } from "./sections/ServiceShowcase";
import { ServiceProcess } from "./sections/ServiceProcess";
import { ServiceWhy } from "./sections/ServiceWhy";
import { ServicePackages } from "./sections/ServicePackages";
import { ServiceFaq } from "./sections/ServiceFaq";
import type { ServiceConfig } from "./types";

export const ServiceLandingPage: React.FC<{ config: ServiceConfig }> = ({ config }) => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLElement>(null);
  const { serviceName, shortName, projectLabel } = config;

  // Shared entrance animations for every section on the page
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".svc-hero-item",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", clearProps: "transform" }
        );
        gsap.utils.toArray<HTMLElement>(".svc-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        });
      });
    },
    { scope: rootRef }
  );

  const start = (note: string) => openContact(serviceName, note);

  return (
    <main ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero with service composition */}
      <ServiceHero shortName={shortName} hero={config.hero} onStart={() => start(`I'd like to start ${projectLabel}.`)} />

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. Scroll-filled statement + pillars */}
      <ServiceStatement statement={config.statement} />

      {/* 4. Offerings bento */}
      <ServiceBento
        bento={config.bento}
        onSelect={(title) => start(`I'm interested in ${title}.`)}
        onDiscuss={() => start(`I'd like to discuss ${projectLabel}.`)}
      />

      {/* 5. Sticky deliverables showcase */}
      <ServiceShowcase showcase={config.showcase} onStart={() => start(`I'd like to get started with ${serviceName}.`)} />

      {/* 6. Vertical process timeline */}
      <ServiceProcess process={config.process} />

      {/* 7. Why Pixim + stats bento */}
      <ServiceWhy why={config.why} />

      {/* 8. Packages with USD / BDT toggle */}
      <ServicePackages
        packages={config.packages}
        onChoose={(name, price) => start(`I'm interested in the ${name} ${shortName} package (${price}).`)}
        onCustom={() => start(`I'd like a tailored quote for ${projectLabel}.`)}
      />

      {/* 9. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title={config.reviewsTitle} subtitle="PROVEN TRACK RECORD" speed={38} />
      </section>

      {/* 10. Two-column FAQ */}
      <ServiceFaq
        shortName={shortName}
        faqs={config.faqs}
        onAsk={() => start(`I have a few questions before starting ${projectLabel}.`)}
      />

      {/* 11. Final CTA */}
      <ReadyForLogoSection
        onOpenContact={(service, note) => openContact(service, note)}
        titleLead={config.cta.titleLead}
        titleHighlight={config.cta.titleHighlight}
        description={config.cta.description}
        primaryService={serviceName}
        primaryNote={`I'm ready to get started with ${serviceName}.`}
        secondaryService={`${serviceName} Consultation`}
        secondaryNote={`I would like to book a consultation about ${serviceName}.`}
        videoSrc={config.cta.videoSrc}
        posterSrc={config.cta.posterSrc}
      />
    </main>
  );
};
