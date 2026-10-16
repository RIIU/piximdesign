"use client";

import React, { useRef, useEffect, useState } from "react";
import type { AnimationItem } from "lottie-web";
import { STATIC_SERVICE_SVGS, SERVICE_TYPE_MAP } from "./serviceIconsData";

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

  // 5. Digital Marketing & Ads -> mobile-app.json
  "digital-marketing": "/lottie/mobile-app.json",
  "digital-marketing-ads": "/lottie/mobile-app.json",

  // 6. Technical SEO & Growth -> dashboard-design.json
  "seo-growth": "/lottie/dashboard-design.json",
  "dashboard-design": "/lottie/dashboard-design.json",
  "technical-seo": "/lottie/dashboard-design.json",
};

export const PixxenLottieIcon: React.FC<PixxenLottieIconProps> = ({
  type,
  size,
  className = "",
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isLottieReady, setIsLottieReady] = useState(false);

  // Instant static SVG key and markup (0ms load time)
  const svgKey = SERVICE_TYPE_MAP[type] || "branding";
  const staticSvgHtml = STATIC_SERVICE_SVGS[svgKey] || STATIC_SERVICE_SVGS["branding"];
  const jsonPath = LOTTIE_MAP[type] || "/lottie/branding.json";

  useEffect(() => {
    let isMounted = true;

    // Clean up previous instance if any
    if (animRef.current) {
      animRef.current.destroy();
      animRef.current = null;
    }
    setIsLottieReady(false);

    // On touch/mobile devices with no hover, the instant SVG is perfect and saves 700KB network lag
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let io: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (io) {
            io.disconnect();
            io = null;
          }

          // SVG-only light player: loads dynamically in the background without blocking the UI
          import("lottie-web/build/player/lottie_light").then((lottieModule) => {
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
                setIsLottieReady(true);
                anim.goToAndStop(0, true);
              });

              animRef.current = anim;
            } catch (err) {
              console.error("Failed to load lottie animation:", jsonPath, err);
            }
          });
        }
      },
      { rootMargin: "600px 0px" }
    );

    io.observe(container);

    return () => {
      isMounted = false;
      if (io) {
        io.disconnect();
      }
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none pointer-events-auto transition-transform duration-300 group-hover:scale-105 ${!size && !className.includes("w-") ? "w-16 h-16" : ""} ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      {/* Instant static SVG fallback (Loads in 0ms, zero layout shift, zero blank state) */}
      <div
        className={`w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition-opacity duration-200 ${
          isLottieReady ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
        }`}
        dangerouslySetInnerHTML={{ __html: staticSvgHtml }}
      />

      {/* Interactive Lottie Animation container */}
      <div
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full transition-opacity duration-200 ${
          isLottieReady ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
        }`}
      />
    </div>
  );
};
