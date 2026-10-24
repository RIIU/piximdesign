"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

interface TakeFirstStepSectionProps {
  onOpenContact?: (service?: string, notes?: string) => void;
}

export const TakeFirstStepSection: React.FC<TakeFirstStepSectionProps> = ({
  onOpenContact,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".take-first-step-content", {
        y: 18,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto select-none"
    >
      {/* Ambient background radial glow without any enclosing box/card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] h-[320px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.45) 0%, rgba(255, 133, 0, 0.25) 50%, transparent 75%)",
        }}
      />

      {/* Main Content (Directly on page background - No box / card border) */}
      <div className="take-first-step-content relative z-10 flex flex-col items-center justify-center text-center">
        {/* Headline */}
        <h2 className="font-agency text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.1] mb-3 sm:mb-4 text-center">
          Take the{" "}
          <span className="bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent">
            First Step
          </span>
        </h2>

        {/* Subtitle */}
        <p className="font-sherika text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 text-center">
          From concept to MVP, from poor marketing strategy to powerful brand exposure – with Pixim, you&apos;re in good hands.
        </p>

        {/* Buttons (Side by Side in Mobile and Desktop) */}
        <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto">
          {/* Primary Action: Book a Strategy Call with Circular Arrow Badge */}
          <button
            type="button"
            onClick={() =>
              onOpenContact?.(
                "Strategy Call",
                "I want to book a strategy call for our project."
              )
            }
            className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-[#FF8500] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-black text-[10.5px] min-[380px]:text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-7 py-3 sm:py-3.5 shadow-[0_8px_25px_rgba(255,133,0,0.35)] hover:shadow-[0_12px_32px_rgba(255,133,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black/25 flex items-center justify-center shrink-0">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span>BOOK A STRATEGY CALL</span>
          </button>

          {/* Secondary Action: Contact Us (Outlined Rectangle) */}
          <button
            type="button"
            onClick={() =>
              onOpenContact?.(
                "General Inquiry",
                "I want to get in touch with Pixim Design."
              )
            }
            className="flex-initial inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white font-black text-[10.5px] min-[380px]:text-xs sm:text-sm uppercase tracking-wider px-3.5 sm:px-7 py-3 sm:py-3.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>CONTACT US</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TakeFirstStepSection;
