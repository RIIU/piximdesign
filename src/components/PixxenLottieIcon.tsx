"use client";

import React, { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import { AnimatedServiceIcon } from "./AnimatedServiceIcon";

interface PixxenLottieIconProps {
  type: string;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

const LOTTIE_MAP: Record<string, string> = {
  "logo-design": "/lottie/branding.json",
  "web-design": "/lottie/website-design.json",
  "package-design": "/lottie/saas-design.json",
  "social-media": "/lottie/mobile-app.json",
  "motion-video": "/lottie/web-app.json",
  "seo-growth": "/lottie/dashboard-design.json",
};

export const PixxenLottieIcon: React.FC<PixxenLottieIconProps> = ({
  type,
  size = 72,
  className = "",
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const lottiePath = LOTTIE_MAP[type];

  useEffect(() => {
    if (!containerRef.current || !lottiePath) return;

    // Clean up any previous animation
    if (animRef.current) {
      animRef.current.destroy();
      animRef.current = null;
    }

    try {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: lottiePath,
      });

      anim.addEventListener("DOMLoaded", () => {
        setIsLoaded(true);
        anim.goToAndStop(0, true);
      });

      anim.addEventListener("data_failed", () => {
        setHasError(true);
      });

      animRef.current = anim;
    } catch {
      setTimeout(() => {
        setHasError(true);
      }, 0);
    }

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [lottiePath]);

  // Only animate when the card is hovered, pause at frame 0 when not hovered
  useEffect(() => {
    if (animRef.current && isLoaded) {
      if (isHovered) {
        animRef.current.setSpeed(1.2);
        animRef.current.goToAndPlay(0, true);
      } else {
        animRef.current.goToAndStop(0, true);
      }
    }
  }, [isHovered, isLoaded]);

  if (hasError || !lottiePath) {
    return <AnimatedServiceIcon type={type} size={size} className={className} />;
  }

  return (
    <div
      className={`relative flex items-center justify-center transition-transform duration-500 select-none ${
        isHovered ? "scale-110" : "scale-100"
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center pointer-events-none drop-shadow-[0_4px_16px_rgba(255,133,0,0.35)]"
      />
      {/* Fallback while Lottie is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedServiceIcon type={type} size={size} />
        </div>
      )}
    </div>
  );
};
