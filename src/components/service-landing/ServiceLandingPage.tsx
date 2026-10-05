"use client";

import React, { useRef } from "react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { ClientLogoWall } from "@/components/page-kit/ClientLogoWall";
import { StickyShowcase } from "@/components/page-kit/StickyShowcase";
import { ProcessTimeline } from "@/components/page-kit/ProcessTimeline";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { ScrollStatement } from "@/components/page-kit/ScrollStatement";
import { WhySplit } from "@/components/page-kit/WhySplit";
import { PackageTiers } from "@/components/page-kit/PackageTiers";
import { GradientText } from "@/components/page-kit/shared";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";
import { ServiceHero } from "./sections/ServiceHero";
import { ServiceBento } from "./sections/ServiceBento";
import type { ServiceConfig } from "./types";

export const ServiceLandingPage: React.FC<{ config: ServiceConfig }> = ({ config }) => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLDivElement>(null);
  const { serviceName, shortName, projectLabel } = config;

  useRevealAnimations(rootRef);

  const start = (note: string) => openContact(serviceName, note);

  return (
    <div ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero with service composition */}
      <ServiceHero shortName={shortName} hero={config.hero} onStart={() => start(`I'd like to start ${projectLabel}.`)} />

      {/* 2. Client logo wall */}
      <ClientLogoWall />

      {/* 3. Scroll-filled statement + pillars */}
      <ScrollStatement statement={config.statement} />

      {/* 4. Offerings bento */}
      <ServiceBento
        bento={config.bento}
        onSelect={(title) => start(`I'm interested in ${title}.`)}
        onDiscuss={() => start(`I'd like to discuss ${projectLabel}.`)}
      />

      {/* 5. Sticky deliverables showcase */}
      <StickyShowcase
        id="service-showcase"
        {...config.showcase}
        onStart={() => start(`I'd like to get started with ${serviceName}.`)}
      />

      {/* 6. Vertical process timeline */}
      <ProcessTimeline {...config.process} />

      {/* 7. Why Pixim + stats bento */}
      <WhySplit why={config.why} />

      {/* 8. Packages with USD / BDT toggle */}
      <PackageTiers
        packages={config.packages}
        onChoose={(name, price) => start(`I'm interested in the ${name} ${shortName} package (${price}).`)}
        onCustom={() => start(`I'd like a tailored quote for ${projectLabel}.`)}
      />

      {/* 9. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title={config.reviewsTitle} subtitle="PROVEN TRACK RECORD" speed={38} />
      </section>

      {/* 10. Two-column FAQ */}
      <FaqSplit
        title={
          <>
            {shortName} Questions, <GradientText>Answered</GradientText>
          </>
        }
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
    </div>
  );
};
