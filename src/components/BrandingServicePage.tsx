"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useContactModal } from "@/components/AppLayoutWrapper";
import { ReadyForLogoSection } from "@/components/ReadyForLogoSection";
import { GsapReviewsInfiniteSlider } from "@/components/animations";
import { BrandingHero } from "@/components/branding/BrandingHero";
import { BrandLogoWall } from "@/components/branding/BrandLogoWall";
import { BrandStatement } from "@/components/branding/BrandStatement";
import { BrandServicesBento } from "@/components/branding/BrandServicesBento";
import { BrandKitAnatomy } from "@/components/branding/BrandKitAnatomy";
import { BrandProcessTimeline } from "@/components/branding/BrandProcessTimeline";
import { BrandWhyPixim } from "@/components/branding/BrandWhyPixim";
import { BrandPackages } from "@/components/branding/BrandPackages";
import { BrandFaq } from "@/components/branding/BrandFaq";

type Tier = { usd: string; bdt: string; desc: string };

interface BrandingServicePageProps {
  pricing: { basic: Tier; standard: Tier; premium: Tier };
}

const SERVICE = "Logo & Brand Identity";

export const BrandingServicePage: React.FC<BrandingServicePageProps> = ({ pricing }) => {
  const { openContact } = useContactModal();
  const rootRef = useRef<HTMLElement>(null);

  // Shared entrance animations for every section on the page
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".brand-hero-item",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", clearProps: "transform" }
        );
        gsap.utils.toArray<HTMLElement>(".brand-reveal").forEach((el) => {
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

  const start = (note = "I'd like to start a branding project.") => openContact(SERVICE, note);

  return (
    <main ref={rootRef} className="w-full overflow-x-clip">
      {/* 1. Hero with brand-kit composition */}
      <BrandingHero onStart={() => start()} />

      {/* 2. Client logo wall */}
      <BrandLogoWall />

      {/* 3. Scroll-filled brand statement + pillars */}
      <BrandStatement />

      {/* 4. Branding services bento */}
      <BrandServicesBento onSelect={(name) => start(`I'm interested in ${name}.`)} />

      {/* 5. Sticky brand-kit anatomy showcase */}
      <BrandKitAnatomy onStart={() => start("I'd like a complete brand kit.")} />

      {/* 6. Vertical process timeline */}
      <BrandProcessTimeline />

      {/* 7. Why Pixim + stats bento */}
      <BrandWhyPixim />

      {/* 8. Packages with USD / BDT toggle */}
      <BrandPackages
        pricing={pricing}
        onChoose={(name, price) => start(`I'm interested in the ${name} branding package (${price}).`)}
        onCustom={() => start("I'd like a tailored quote for my branding project.")}
      />

      {/* 9. Client reviews */}
      <section className="relative py-10 sm:py-14">
        <GsapReviewsInfiniteSlider title="What Clients Say About Our Branding" subtitle="PROVEN TRACK RECORD" speed={38} />
      </section>

      {/* 10. Two-column FAQ */}
      <BrandFaq onAsk={() => start("I have a few questions before starting my branding project.")} />

      {/* 11. Final CTA */}
      <ReadyForLogoSection onOpenContact={(service, note) => openContact(service, note)} />
    </main>
  );
};
