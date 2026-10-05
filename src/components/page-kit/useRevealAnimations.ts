"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Shared entrance animations for page-kit pages: `.hero-reveal` items stagger in on load,
 * `.reveal-up` items rise in as they scroll into view. Skipped for reduced-motion users.
 */
export function useRevealAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hero-reveal",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", clearProps: "transform" }
        );
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
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
    { scope }
  );
}
