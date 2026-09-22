"use client";

import React, { useRef, useEffect } from "react";
import type { AnimationItem } from "lottie-web";

interface PixxenLottieIconProps {
  type: string;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

// 1:1 Mapping to the Pixxen-style brand-colored Lottie animations in /public/lottie
const LOTTIE_MAP: Record<string, string> = {
  // 1. Logo & Brand Identity -> branding.json
  "logo-design": "/lottie/branding.json",
  "branding": "/lottie/branding.json",
  "brand-identity": "/lottie/branding.json",

  // 2. Website Design & Dev -> website-design.json
  "web-design": "/lottie/website-design.json",
  "website-design": "/lottie/website-design.json",

  // 3. Package & Label Design -> saas-design.json
  "package-design": "/lottie/saas-design.json",
  "saas-design": "/lottie/saas-design.json",
  "packaging": "/lottie/saas-design.json",

  // 4. Social Media & Posters -> mobile-app.json
  "social-media": "/lottie/mobile-app.json",
  "mobile-app": "/lottie/mobile-app.json",
  "mobile-app-design": "/lottie/mobile-app.json",

  // 5. Motion Graphics & 3D Intro -> web-app.json
  "motion-video": "/lottie/web-app.json",
  "web-app": "/lottie/web-app.json",
  "motion-graphics": "/lottie/web-app.json",

  // 6. Technical SEO & Growth -> dashboard-design.json
  "seo-growth": "/lottie/dashboard-design.json",
  "dashboard-design": "/lottie/dashboard-design.json",
  "technical-seo": "/lottie/dashboard-design.json",
};

export const PixxenLottieIcon: React.FC<PixxenLottieIconProps> = ({
  type,
  size = 72,
  className = "",
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const isLoadedRef = useRef(false);

  const jsonPath = LOTTIE_MAP[type] || "/lottie/branding.json";

  useEffect(() => {
    let isMounted = true;
    isLoadedRef.current = false;

    // Clean up previous instance if any
    if (animRef.current) {
      animRef.current.destroy();
      animRef.current = null;
    }

    import("lottie-web").then((lottieModule) => {
      if (!isMounted || !containerRef.current) return;
      const lottie = lottieModule.default || lottieModule;

      try {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: false,
          path: jsonPath,
        });

        anim.addEventListener("DOMLoaded", () => {
          if (!isMounted) return;
          isLoadedRef.current = true;
          // Freeze at frame 0 ready for hover interaction
          anim.goToAndStop(0, true);
        });

        animRef.current = anim;
      } catch (err) {
        console.error("Failed to load lottie animation:", jsonPath, err);
      }
    });

    return () => {
      isMounted = false;
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [jsonPath]);

  // Trigger animation on card hover or direct hover
  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;

    if (isHovered) {
      anim.goToAndPlay(0, true);
    } else {
      // Pause smoothly when hover leaves
      anim.pause();
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (animRef.current) {
      animRef.current.goToAndPlay(0, true);
    }
  };

  const handleMouseLeave = () => {
    if (animRef.current && !isHovered) {
      animRef.current.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none pointer-events-auto transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
};
