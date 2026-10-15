"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

interface ProcessSectionProps {
  onOpenContact?: () => void;
}

// Custom Vector Icons in Pixim Brand Colors (#FF8500, #FFA229, #38BDF8)
const DiscoveryIcon = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,133,0,0.25)]"
  >
    <path
      d="M46.998 16C51.4163 16 54.998 19.5817 54.998 24V31.5059L28.1406 16H46.998Z"
      fill="#FFA229"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55 35.333V72C55 76.4183 51.4183 80 47 80H22C17.5817 80 14 76.4183 14 72V24C14 19.7364 17.3353 16.2525 21.5391 16.0137L55 35.333ZM21.5 50C20.6716 50 20 50.6716 20 51.5C20 52.3284 20.6716 53 21.5 53H27.5C28.3284 53 29 52.3284 29 51.5C29 50.6716 28.3284 50 27.5 50H21.5ZM21.5 44C20.6716 44 20 44.6716 20 45.5C20 46.3284 20.6716 47 21.5 47H36.5C37.3284 47 38 46.3284 38 45.5C38 44.6716 37.3284 44 36.5 44H21.5ZM21.5 38C20.6716 38 20 38.6716 20 39.5C20 40.3284 20.6716 41 21.5 41H47.5C48.3284 41 49 40.3284 49 39.5C49 38.6716 48.3284 38 47.5 38H21.5Z"
      fill="#FF8500"
    />
    <path
      d="M51.1004 49.1004C56.5677 43.6332 65.4319 43.6332 70.8993 49.1004C75.8866 54.0878 76.3234 61.9009 72.2118 67.3846L82.2118 77.3846L79.3836 80.2127L69.3836 70.2127C63.9 74.3235 56.0875 73.8863 51.1004 68.8993C45.6332 63.4319 45.6331 54.5677 51.1004 49.1004Z"
      fill="#38BDF8"
    />
  </svg>
);

const DefineIcon = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,133,0,0.25)]"
  >
    <path
      d="M79.6563 48C82.3886 45.4995 84 41.9421 84 38.1562C84 30.9745 78.2852 25.0984 71.1508 24.8079C70.8593 17.6964 64.9643 12 57.7593 12C57.6331 12 57.5075 12.0016 57.3835 12.0049C54.6457 12.0807 52.0655 13.0838 50 14.8548V81.1458C52.0655 82.9162 54.6457 83.9193 57.3824 83.9951C57.5075 83.9984 57.6331 84 57.7593 84C63.4637 84 68.3463 80.4289 70.2779 75.412C65.6829 75.3312 61.3794 73.5141 58.128 70.2737C58.1159 70.2616 58.1043 70.2495 58.0922 70.2374C56.6555 68.7834 58.1495 66.3768 60.1059 66.9783C60.7374 67.1722 61.3155 67.5029 61.8143 67.9347C64.4733 70.2374 67.8327 71.319 71.1508 71.1839V71.1921C78.2852 70.9016 84 65.0255 84 57.8438C84 54.0579 82.3886 50.5005 79.6563 48Z"
      fill="#FF8500"
    />
    <path
      d="M46 81.1455C43.9351 82.9164 41.3543 83.9193 38.6172 83.9951C38.4926 83.9984 38.3664 84 38.2402 84C31.0356 83.9998 25.1407 78.3036 24.8496 71.1924C17.7147 70.9017 12 65.0255 12 57.8438C12 54.1761 13.5122 50.7229 16.0908 48.2373L16.3438 48H46V81.1455Z"
      fill="#FFA229"
    />
    <path
      d="M44.927 27.4157C44.8597 27.2612 44.7489 27.1296 44.6082 27.0371C44.4676 26.9446 44.3031 26.8951 44.1348 26.8946H36.3343V13.8683C36.3343 13.6926 36.281 13.521 36.1816 13.3762C36.0822 13.2315 35.9414 13.1203 35.7776 13.0575C35.6138 12.9946 35.4349 12.983 35.2644 13.0242C35.0939 13.0654 34.9399 13.1574 34.8227 13.2882L19.2217 30.6567C19.1099 30.7815 19.0365 30.9361 19.0105 31.1019C18.9845 31.2676 19.007 31.4373 19.0752 31.5905C19.1434 31.7437 19.2544 31.8739 19.3949 31.9652C19.5353 32.0566 19.6991 32.1052 19.8666 32.1052H27.6671V45.1316C27.667 45.3073 27.7202 45.4789 27.8195 45.6237C27.9189 45.7686 28.0597 45.8798 28.2235 45.9427C28.3226 45.9804 28.4278 45.9998 28.5338 46C28.6555 46 28.7758 45.9743 28.8869 45.9246C28.998 45.875 29.0974 45.8024 29.1786 45.7117L44.7796 28.3432C44.8903 28.219 44.9631 28.0656 44.9892 27.9011C45.0153 27.7367 44.9937 27.5682 44.927 27.4157Z"
      fill="#38BDF8"
    />
  </svg>
);

const UiDesignIcon = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,133,0,0.25)]"
  >
    <path
      d="M58.4613 59.2021L65.1828 81.2959C65.8337 83.4356 68.8472 83.4818 69.5621 81.36L72.7089 72.0223C72.9395 71.3406 73.4725 70.8076 74.1541 70.577L83.4919 67.4303C85.611 66.7153 85.5675 63.7018 83.4278 63.051L61.3339 56.3295C59.5735 55.7965 57.9283 57.4416 58.4613 59.2021Z"
      fill="#38BDF8"
    />
    <path
      d="M11 25C11 20.5817 14.5817 17 19 17H74C78.4183 17 82 20.5817 82 25V29H11V25Z"
      fill="#FFA229"
    />
    <path
      d="M82.3174 58.6924L62.4521 52.6523C61.863 52.4731 61.2584 52.3838 60.6514 52.3838C58.7219 52.3838 56.8819 53.3165 55.7236 54.877C54.5552 56.4528 54.2114 58.4386 54.7852 60.3193L59.4775 75.7559H20.5586C15.2799 75.7559 11.0001 71.4769 11 66.1982V31H82.3174V58.6924Z"
      fill="#FF8500"
    />
    <path
      d="M25 43H46V45H25V66H23V45H17V43H23V37H25V43Z"
      fill="#081330"
    />
  </svg>
);

const DeliveryIcon = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,133,0,0.25)]"
  >
    <path
      d="M81.5765 16.1772H52.705L46.9636 9.35343C46.7705 9.12127 46.4811 8.99107 46.1793 9.00048H22.9002C19.6742 9.00577 16.9463 11.389 16.5078 14.585H37.7398C38.8532 14.5822 39.9103 15.0736 40.6262 15.9262L45.5283 21.7538H73.0978C78.1969 21.7624 82.3286 25.8941 82.3373 30.9933V63.8414C85.5703 63.438 87.9976 60.6915 88.0002 57.4333V22.6323C87.9918 19.0829 85.1256 16.2031 81.5765 16.1772Z"
      fill="#FFA229"
    />
    <path
      d="M37.7109 17.3613C38.0125 17.352 38.302 17.4819 38.4951 17.7139L44.2363 24.5381H73.0996C76.6672 24.5424 79.5582 27.4334 79.5625 31.001V65.8017C79.5582 69.3693 76.6672 72.2603 73.0996 72.2646H61.9951C61.7773 62.5127 53.8042 54.6738 44 54.6738C34.1958 54.6738 26.2227 62.5127 26.0049 72.2646H14.4629C10.8954 72.2603 8.00431 69.3693 8 65.8017V23.832C8.00003 20.2766 10.8684 17.3872 14.4238 17.3613H37.7109Z"
      fill="#FF8500"
    />
    <path
      d="M55.1815 67.8591C55.0094 65.8368 54.1059 63.8576 52.5569 62.3087C49.3299 59.0817 44.3819 58.7805 41.5422 61.6202L29.4518 73.7106C28.8494 74.313 28.8494 75.2596 29.4518 75.8189C30.0541 76.4213 31.0007 76.4213 31.5601 75.8189L43.6505 63.7285C45.3285 62.0505 48.3403 62.3517 50.4056 64.417C51.4382 65.4496 52.0406 66.7404 52.1697 68.0742C52.2557 69.322 51.9115 70.4406 51.137 71.2151L46.4902 75.8619L39.7781 82.531C38.7024 83.6067 36.8523 83.4776 35.6476 82.2729C34.4428 81.0681 34.3137 79.218 35.3894 78.1423L39.3909 74.1409C39.3909 74.1409 39.3909 74.1409 39.4339 74.0979L45.9309 67.6009C46.189 67.3427 46.7053 67.3427 47.0065 67.687C47.3077 67.9881 47.3507 68.5045 47.0926 68.7626L38.4873 77.4539C37.8849 78.0563 37.8849 79.0029 38.4873 79.5622C38.7885 79.8634 39.1757 79.9925 39.563 79.9925C39.9502 79.9925 40.3374 79.8634 40.6386 79.5622L49.2869 70.9139C50.7498 69.451 50.7068 67.0416 49.2009 65.5787C47.6949 64.0727 45.2855 64.0297 43.8656 65.4926L40.0362 69.322C40.0362 69.322 40.0362 69.322 39.9932 69.365L33.2811 76.0341C31.0437 78.2714 31.1728 82.0147 33.5393 84.4242C34.787 85.6719 36.379 86.2743 37.971 86.2743C39.4339 86.2743 40.8537 85.758 41.9294 84.6823L44.1237 82.488L53.2453 73.3664C54.6652 71.9466 55.3536 70.0104 55.1815 67.8591Z"
      fill="#38BDF8"
    />
  </svg>
);

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const mobileWavePathRef = useRef<SVGPathElement>(null);

  const PROCESS_ITEMS = [
    {
      step: "01",
      title: "Discovery",
      timeframe: "Days 1 – 3",
      tagline: "Research & Strategy",
      description: "User & Market Research, Behavioral Analysis, Persona Creation",
      icon: <DiscoveryIcon />,
    },
    {
      step: "02",
      title: "Define",
      timeframe: "Days 4 – 7",
      tagline: "UX & Architecture",
      description: "Lo-Fi/Hi-Fi Wireframe with UX, Interactive Prototype",
      icon: <DefineIcon />,
    },
    {
      step: "03",
      title: "UI Design & Testing",
      timeframe: "Days 8 – 11",
      tagline: "Visual Polish",
      description: "Design System, Brand Consistency, Usability Testing",
      icon: <UiDesignIcon />,
    },
    {
      step: "04",
      title: "Delivery & Support",
      timeframe: "Days 12 – 14",
      tagline: "Production Handoff",
      description: "Dev-Ready UI Files, Design Spec Guides, Post-Launch Support",
      icon: <DeliveryIcon />,
    },
  ];

  // Upore Niche (Over-Under-Over-Under) Wave Path:
  // Loops OVER Step 1 (upore) -> UNDER Step 2 (niche) -> OVER Step 3 (upore) -> UNDER Step 4 (niche)
  const UPORE_NICHE_WAVE_PATH =
    "M2 415V189C2 85.7228 85.7228 2 189 2C292.277 2 376 85.7228 376 189V227C376 331.382 460.618 416 565 416C669.382 416 754 331.382 754 227V189C754 85.7228 837.723 2 941 2C1044.28 2 1128 85.7228 1128 189V227C1128 331.382 1212.62 416 1317 416C1421.38 416 1506 331.382 1506 227V1";

  // Mobile Vertical Undulating Wave Path
  const MOBILE_WAVE_PATH =
    "M 16 0 C 28 20, 28 35, 16 60 C 4 85, 4 105, 16 130 C 28 155, 28 175, 16 200 C 4 225, 4 245, 16 270 C 28 295, 28 315, 16 340 C 4 365, 4 385, 16 410 C 28 435, 28 455, 16 480";

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      // Section header entrance
      gsap.from(".process-header > *", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Desktop Wave drawing animation
      const wPath = wavePathRef.current;
      if (wPath) {
        const len = wPath.getTotalLength();
        gsap.set(wPath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(wPath, {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          duration: 2.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      // Mobile Wave drawing animation
      const mPath = mobileWavePathRef.current;
      if (mPath) {
        const mLen = mPath.getTotalLength();
        gsap.set(mPath, { strokeDasharray: mLen, strokeDashoffset: mLen });
        gsap.to(mPath, {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          duration: 2.0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      // Process items stagger entrance
      gsap.from(".process-item-entry", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".process-items-wrap",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-16 bg-[#081330] overflow-hidden select-none"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[520px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.4) 0%, rgba(255, 133, 0, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="process-header text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            Quick Delivery, Faster Results
          </h2>

          <p className="font-sherika mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            Our agile design sprint prioritizes speed, precision, and high-impact delivery in 14 days or less.
          </p>
        </div>

        {/* ==============================================================
            1. DESKTOP VIEW: Box-free Floating Items with Upore-Niche Wave (lg+)
           ============================================================== */}
        <div className="hidden lg:block relative w-full process-items-wrap min-h-[440px]">
          {/* Animated Upore-Niche Wave SVG Layer (Arches OVER 1 & 3, Loops UNDER 2 & 4) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              viewBox="0 0 1506 416"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Vibrant Brand Multi-stop Gradient */}
                <linearGradient id="uporeNicheGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF8500" stopOpacity="0.4" />
                  <stop offset="15%" stopColor="#FF8500" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#FFA229" stopOpacity="0.95" />
                  <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.95" />
                  <stop offset="90%" stopColor="#34D399" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
                </linearGradient>

                <filter id="uporeNicheGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Aura Path */}
              <path
                d={UPORE_NICHE_WAVE_PATH}
                stroke="url(#uporeNicheGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.25"
                filter="url(#uporeNicheGlow)"
              />

              {/* Primary Active Wave Line */}
              <path
                ref={wavePathRef}
                id="upore-niche-wave-line"
                d={UPORE_NICHE_WAVE_PATH}
                stroke="url(#uporeNicheGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Traveling Light Photon 1 (Forward traveling pulse) */}
              <circle r="4.5" fill="#FFA229">
                <animateMotion
                  dur="6.5s"
                  repeatCount="indefinite"
                  path={UPORE_NICHE_WAVE_PATH}
                />
              </circle>
              <circle r="10" fill="#FF8500" opacity="0.35" filter="url(#uporeNicheGlow)">
                <animateMotion
                  dur="6.5s"
                  repeatCount="indefinite"
                  path={UPORE_NICHE_WAVE_PATH}
                />
              </circle>

              {/* Traveling Light Photon 2 (Cyan harmonic pulse, phase-delayed) */}
              <circle r="3.5" fill="#38BDF8">
                <animateMotion
                  dur="6.5s"
                  begin="-3.25s"
                  repeatCount="indefinite"
                  path={UPORE_NICHE_WAVE_PATH}
                />
              </circle>
              <circle r="8" fill="#38BDF8" opacity="0.3" filter="url(#uporeNicheGlow)">
                <animateMotion
                  dur="6.5s"
                  begin="-3.25s"
                  repeatCount="indefinite"
                  path={UPORE_NICHE_WAVE_PATH}
                />
              </circle>
            </svg>
          </div>

          {/* 4 Process Items - Pure Minimal Floating Content (NO BOXES) */}
          <div className="grid grid-cols-4 gap-4 relative z-10 items-center min-h-[420px]">
            {PROCESS_ITEMS.map((item, idx) => (
              <div
                key={item.step}
                className="process-item-entry flex flex-col items-center text-center px-3 py-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-2 select-none"
              >
                {/* Custom Vector Icon (Centered, Box-free) */}
                <div className="mb-4 relative flex items-center justify-center">
                  {/* Subtle hover bloom halo behind the icon */}
                  <div className="absolute -inset-2 rounded-full bg-[#FF8500]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                  {item.icon}
                </div>

                {/* Step Title */}
                <h3 className="font-agency text-2xl lg:text-[26px] font-bold text-white mb-2 tracking-tight group-hover:text-[#FFA229] transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Step Description - Clean floating typography */}
                <p className="font-sherika text-slate-300 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[230px] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==============================================================
            2. MOBILE VIEW: Minimal Box-free Stack (< lg)
           ============================================================== */}
        <div className="lg:hidden relative max-w-md mx-auto py-2">
          {/* Subtle vertical connector guide */}
          <div className="absolute left-6 top-10 bottom-10 w-8 pointer-events-none z-0">
            <svg
              viewBox="0 0 32 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <path
                ref={mobileWavePathRef}
                d={MOBILE_WAVE_PATH}
                stroke="url(#uporeNicheGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.75"
              />
              <circle r="3" fill="#FFA229">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path={MOBILE_WAVE_PATH}
                />
              </circle>
            </svg>
          </div>

          <div className="space-y-8 pl-12">
            {PROCESS_ITEMS.map((item, idx) => (
              <div
                key={item.step}
                className="process-item-entry text-left group select-none"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-agency text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description (NO BOX) */}
                <p className="font-sherika text-slate-300 text-xs sm:text-sm font-normal leading-relaxed pl-1 max-w-xs">
                  {item.description}
                </p>

                {/* Subtle Divider between items except last */}
                {idx < PROCESS_ITEMS.length - 1 && (
                  <div className="mt-6 pt-0 border-b border-white/[0.06] w-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Clean Pill CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA229] hover:from-[#FFA229] hover:to-[#FF8500] text-white font-agency font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 active:scale-95 cursor-pointer"
          >
            <span>Start Your 14-Day Sprint</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
