"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface GsapMagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: "primary" | "secondary" | "glow" | "outline";
  strength?: number; // Distance multiplier for magnetism (default 0.38)
  textStrengthMultiplier?: number; // Parallax multiplier for inner text (default 1.55)
  showOverwriteFill?: boolean; // Liquid overwrite hover sweep
  type?: "button" | "submit" | "reset";
}

export const GsapMagneticButton: React.FC<GsapMagneticButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  strength = 0.38,
  textStrengthMultiplier = 1.55,
  showOverwriteFill = true,
  type = "button",
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    // 1. Magnetic button body attraction with overwrite: "auto"
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.32,
      ease: "power2.out",
      overwrite: "auto",
    });

    // 2. Inner content parallax (moves further for 3D depth) with overwrite: "auto"
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: relX * (strength * textStrengthMultiplier),
        y: relY * (strength * textStrengthMultiplier),
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // 3. Magnetic Overwrite Fill bubble tracking cursor with overwrite: "auto"
    if (fillRef.current && showOverwriteFill) {
      gsap.to(fillRef.current, {
        x: relX * 0.8,
        y: relY * 0.8,
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // 4. Cursor glow sheen
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 0.75,
        duration: 0.15,
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      scale: 1.04,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });

    // Position overwrite fill at entry point and scale up
    if (fillRef.current && showOverwriteFill) {
      gsap.set(fillRef.current, {
        x: relX,
        y: relY,
        scale: 0,
        opacity: 0.3,
      });
      gsap.to(fillRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;

    // Spring button body back to center with overwrite: "auto"
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.75,
      ease: "elastic.out(1.15, 0.4)",
      overwrite: "auto",
    });

    // Spring inner content back with overwrite: "auto"
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto",
      });
    }

    // Shrink liquid overwrite fill away with overwrite: "auto"
    if (fillRef.current && showOverwriteFill) {
      gsap.to(fillRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.35,
        overwrite: "auto",
      });
    }
  };

  const handleMouseDown = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.12,
        ease: "power1.in",
        overwrite: "auto",
      });
    }
  };

  const handleMouseUp = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.04,
        duration: 0.2,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    }
  };

  // Base styling per variant
  let variantStyles = "";
  let fillStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white shadow-xl shadow-[#FF8500]/25 border border-orange-400/40 hover:shadow-[#FF8500]/40";
      fillStyles = "bg-gradient-to-r from-[#E67300] via-[#FF8500] to-[#FFB35C]";
      break;
    case "glow":
      variantStyles =
        "bg-[#2651B9]/10 text-[#2651B9] border border-[#2651B9]/25 hover:border-[#2651B9]/50 hover:bg-[#2651B9]/15 shadow-sm";
      fillStyles = "bg-gradient-to-r from-[#FF8500]/20 to-[#2651B9]/20";
      break;
    case "secondary":
      variantStyles =
        "bg-white dark:bg-[#081330] hover:bg-slate-50 dark:hover:bg-[#0C1E4E] text-[#0F172A] dark:text-white border border-slate-200 dark:border-[#2651B9]/40 hover:border-[#2651B9]/30 dark:hover:border-[#FF8500]/50 shadow-sm";
      fillStyles = "bg-slate-100 dark:bg-[#2651B9]/25";
      break;
    case "outline":
      variantStyles =
        "bg-transparent text-[#0F172A] dark:text-white border border-slate-300 dark:border-[#2651B9]/40 hover:border-[#FF8500] hover:text-[#FF8500] dark:hover:text-[#FFA133]";
      fillStyles = "bg-[#FF8500]/10";
      break;
  }

  const isFullWidth = className.includes("w-full");

  const renderedContent = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-shadow duration-300 cursor-pointer select-none will-change-transform ${variantStyles} ${className}`}
    >
      {/* Liquid Overwrite Hover Fill Layer */}
      {showOverwriteFill && (
        <div
          ref={fillRef}
          className={`pointer-events-none absolute w-[240%] h-[240%] rounded-full opacity-0 will-change-transform ${fillStyles}`}
          style={{ transform: "scale(0)" }}
        />
      )}

      {/* Cursor Glow Sheen */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-12 -top-12 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-md opacity-0 will-change-transform"
      />

      {/* Inner Button Content with 3D Depth Parallax */}
      <span
        ref={textRef}
        className="relative z-10 flex items-center justify-center gap-2 will-change-transform pointer-events-none w-full"
      >
        {children}
      </span>
    </div>
  );

  const wrapperClasses = `${isFullWidth ? "w-full" : "inline-block"} focus:outline-none`;

  if (href) {
    return (
      <Link href={href} className={wrapperClasses}>
        {renderedContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={wrapperClasses}>
      {renderedContent}
    </button>
  );
};
