"use client";

import React, { useRef } from "react";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { GradientText } from "@/components/page-kit/shared";
import { FAQS } from "@/data/agencyData";
import type { FaqItem } from "@/components/page-kit/types";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";

interface FaqSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

const HOME_FAQS: FaqItem[] = FAQS.map((f) => ({
  q: f.question,
  a: f.answer,
}));

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimations(containerRef);

  return (
    <div id="faq" ref={containerRef} className="relative w-full">
      <FaqSplit
        title={
          <>
            Frequently Asked <br className="hidden sm:inline" />
            <GradientText>Questions</GradientText>
          </>
        }
        intro="Clear answers about our consultation, deliverables, mobile responsiveness, and branding packages."
        faqs={HOME_FAQS}
        onAsk={() =>
          onOpenContact?.(
            "FAQ Discovery Call",
            "Book a 30-minute discovery call from the FAQ section"
          )
        }
        cardTitle="Talk to a specialist, free."
        cardText="A 30-minute call to review your goals and recommend the right scope."
        cardCta="Book a free call"
      />
    </div>
  );
};

export default FaqSection;
