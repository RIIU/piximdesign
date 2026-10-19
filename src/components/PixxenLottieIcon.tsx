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

// Global cache for lottie-web player and parsed animation JSONs
let lottieLightInstance: any = null;
let lottieLightPromise: Promise<any> | null = null;
const animationDataCache = new Map<string, any>();

function getLottieLight() {
  if (lottieLightInstance) return Promise.resolve(lottieLightInstance);
  if (!lottieLightPromise) {
    lottieLightPromise = import("lottie-web/build/player/lottie_light").then((m) => {
      lottieLightInstance = m.default || m;
      return lottieLightInstance;
    });
  }
  return lottieLightPromise;
}

async function getAnimationData(path: string) {
  if (animationDataCache.has(path)) {
    return animationDataCache.get(path);
  }
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    const data = await res.json();
    animationDataCache.set(path, data);
    return data;
  } catch {
    return null;
  }
}

// Preload player and top JSONs immediately when in browser
if (typeof window !== "undefined") {
  const preload = () => {
    getLottieLight();
    const paths = [
      "/lottie/branding.json",
      "/lottie/website-design.json",
      "/lottie/saas-design.json",
      "/lottie/mobile-app.json",
      "/lottie/web-app.json",
      "/lottie/dashboard-design.json",
    ];
    paths.forEach((p) => getAnimationData(p));
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(preload);
  } else {
    setTimeout(preload, 100);
  }
}

export const PixxenLottieIcon: React.FC<PixxenLottieIconProps> = ({
  type,
  size,
  className = "",
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  // Instant static SVG key and markup (0ms load time)
  const svgKey = SERVICE_TYPE_MAP[type] || "branding";
  const staticSvgHtml = STATIC_SERVICE_SVGS[svgKey] || STATIC_SERVICE_SVGS["branding"];
  const jsonPath = LOTTIE_MAP[type] || "/lottie/branding.json";

  const [readyPath, setReadyPath] = useState<string | null>(() =>
    animationDataCache.has(jsonPath) ? jsonPath : null
  );
  const isLottieReady = readyPath === jsonPath;

  useEffect(() => {
    let isMounted = true;

    // Clean up previous instance if any
    if (animRef.current) {
      animRef.current.destroy();
      animRef.current = null;
    }

    const container = containerRef.current;
    if (!container) return;

    const startAnimation = async () => {
      try {
        const [lottie, animData] = await Promise.all([
          getLottieLight(),
          getAnimationData(jsonPath),
        ]);

        if (!isMounted || !containerRef.current) return;

        // Clean any leftovers in container
        containerRef.current.innerHTML = "";

        const anim = animData
          ? lottie.loadAnimation({
              container: containerRef.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: animData,
            })
          : lottie.loadAnimation({
              container: containerRef.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              path: jsonPath,
            });

        anim.setSpeed(1.3);
        setReadyPath(jsonPath);
        animRef.current = anim;
      } catch (err) {
        console.error("Failed to load lottie animation:", jsonPath, err);
      }
    };

    // If data is already cached, start immediately with 0 delay
    if (animationDataCache.has(jsonPath)) {
      startAnimation();
      return () => {
        isMounted = false;
        if (animRef.current) {
          animRef.current.destroy();
          animRef.current = null;
        }
      };
    }

    // Otherwise use IntersectionObserver with generous rootMargin
    let io: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (io) {
            io.disconnect();
            io = null;
          }
          startAnimation();
        }
      },
      { rootMargin: "600px 0px" }
    );

    io.observe(container);

    return () => {
      isMounted = false;
      if (io) io.disconnect();
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [jsonPath]);

  // Adjust animation speed on hover for interactive feel while keeping animation active
  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;

    if (isHovered) {
      anim.setSpeed(1.7);
    } else {
      anim.setSpeed(1.3);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (animRef.current) {
      animRef.current.setSpeed(1.7);
    }
  };

  const handleMouseLeave = () => {
    if (animRef.current) {
      animRef.current.setSpeed(1.3);
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
