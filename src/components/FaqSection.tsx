"use client";

import React, { useRef } from "react";
import { FaqSplit } from "@/components/page-kit/FaqSplit";
import { useHome } from "@/content/ContentProvider";
import { RichTitle } from "@/content/RichTitle";
import type { FaqItem } from "@/components/page-kit/types";
import { useRevealAnimations } from "@/components/page-kit/useRevealAnimations";

const GRADIENT_CLASS = "bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent";

interface FaqSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}


export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { faq: content } = useHome();
  const HOME_FAQS: FaqItem[] = content.items.map((f) => ({ q: f.question, a: f.answer }));
  useRevealAnimations(containerRef);

  return (
    <div id="faq" ref={containerRef} className="relative w-full">
      <FaqSplit
        title={
          <RichTitle
            text={content.title}
            breakClassName="hidden sm:inline"
            highlightClassName={GRADIENT_CLASS}
          />
        }
        intro={content.description}
        faqs={HOME_FAQS}
        onAsk={() =>
          onOpenContact?.(
            "FAQ Discovery Call",
            "Book a 30-minute discovery call from the FAQ section"
          )
        }
        cardTitle={content.cardTitle}
        cardText={content.cardText}
        cardCta={content.cardCta}
      />
    </div>
  );
};

export default FaqSection;
