"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, Eye, X, ArrowUpRight, ArrowRight } from "lucide-react";

interface RecentWorkProps {
  onOpenContact?: () => void;
}

export interface RecentProject {
  id: string;
  type: "video" | "image";
  title: string;
  clientLabel: string;
  category: string;
  subtext: string;
  mediaSrc: string;
  thumbnailSrc: string;
  badgeLabel: string;
  description: string;
}

const RECENT_PROJECTS: RecentProject[] = [
  {
    id: "branding-reel",
    type: "video",
    title: "Creative Logo & Brand Identity Reel",
    clientLabel: "Pixim Studios",
    category: "Brand Motion & Vector System",
    subtext: "Dynamic Vector System & Iconic Mark",
    mediaSrc: "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
    thumbnailSrc: "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
    badgeLabel: "Video Showcase",
    description: "Full-motion brand identity and vector design system crafted for modern high-growth companies.",
  },
  {
    id: "skyra-flight",
    type: "image",
    title: "Skyra AI Flight Booking App",
    clientLabel: "Skyra AI",
    category: "Mobile App & AI",
    subtext: "Predictive Route Intelligence & Booking",
    mediaSrc: "/images/case-studies/skyra-flight-booking.webp",
    thumbnailSrc: "/images/case-studies/skyra-flight-booking.webp",
    badgeLabel: "UI/UX Design",
    description: "AI-powered flight route tracking, predictive pricing, and frictionless mobile booking flow.",
  },
  {
    id: "agency-growth-reel",
    type: "video",
    title: "Digital Motion & Creative Agency Reel",
    clientLabel: "Pixim Agency",
    category: "Motion & 3D Video",
    subtext: "60fps Fluid Agency Video Reel",
    mediaSrc: "/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4",
    thumbnailSrc: "/video/posters/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.webp",
    badgeLabel: "Agency Reel",
    description: "High-octane agency motion reel featuring 3D product animations and dynamic UI transitions.",
  },
  {
    id: "helixa-health",
    type: "image",
    title: "Helixa AI Health & Telemetry",
    clientLabel: "Helixa Health",
    category: "HealthTech & UI",
    subtext: "Biometric Telemetry & Encrypted Consult",
    mediaSrc: "/images/case-studies/helixa-health-app.webp",
    thumbnailSrc: "/images/case-studies/helixa-health-app.webp",
    badgeLabel: "Mobile App",
    description: "Comprehensive cardiovascular telemetry, biometric tracking, and encrypted doctor consultations.",
  },
  {
    id: "monoq-spatial",
    type: "image",
    title: "Monoq Spatial E-Commerce",
    clientLabel: "Monoq 3D",
    category: "Spatial UI & Web3",
    subtext: "Interactive 3D Product Inspection",
    mediaSrc: "/images/case-studies/monoq-spatial-ecommerce.webp",
    thumbnailSrc: "/images/case-studies/monoq-spatial-ecommerce.webp",
    badgeLabel: "Spatial UI",
    description: "Tactile spatial e-commerce interface with real-time 3D models and micro-interaction design.",
  },
  {
    id: "taskflux-dashboard",
    type: "image",
    title: "TaskFlux Enterprise Dashboard",
    clientLabel: "TaskFlux SaaS",
    category: "Enterprise SaaS",
    subtext: "Real-Time Pipeline Analytics & Heatmaps",
    mediaSrc: "/images/case-studies/taskflux-dashboard.webp",
    thumbnailSrc: "/images/case-studies/taskflux-dashboard.webp",
    badgeLabel: "SaaS Dashboard",
    description: "Modern enterprise management dashboard converting complex metrics into actionable insights.",
  },
  {
    id: "ecoray-solar",
    type: "image",
    title: "EcoRay Solar Intelligence",
    clientLabel: "EcoRay Energy",
    category: "CleanTech Dashboard",
    subtext: "Sub-Second Inverter Telemetry & AI Alerts",
    mediaSrc: "/images/case-studies/ecoray-solar-dashboard.webp",
    thumbnailSrc: "/images/case-studies/ecoray-solar-dashboard.webp",
    badgeLabel: "CleanTech UI",
    description: "Predictive solar telemetry dashboard with automated inverter maintenance algorithms.",
  },
];

export const RecentWorkSection: React.FC<RecentWorkProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeItem, setActiveItem] = useState<RecentProject | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  // Triple duplicated list for 100% seamless marquee infinite carousel loop
  const duplicatedProjects = [
    ...RECENT_PROJECTS,
    ...RECENT_PROJECTS,
    ...RECENT_PROJECTS,
  ];

  // GSAP continuous smooth infinite carousel setup
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // 1/3 of the total width for 1 full set of projects
      const singleSetWidth = track.scrollWidth / 3;
      gsap.set(track, { x: 0 });

      // Smooth conveyor (34s full set cycle)
      tweenRef.current = gsap.to(track, {
        x: `-=${singleSetWidth}`,
        duration: 34,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const current = parseFloat(x);
            return current % singleSetWidth;
          }),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause when off-screen to preserve CPU/GPU performance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tweenRef.current?.resume();
        } else {
          tweenRef.current?.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth hover slow-down to a complete stop and resume
  const handleMouseEnter = () => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, {
      timeScale: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, {
      timeScale: 1,
      duration: 0.45,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".recent-work-header > *", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 md:py-16 bg-[#081330] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[1100px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.35) 0%, rgba(255, 133, 0, 0.12) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="recent-work-header text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            More Recent Work.
          </h2>

          <p className="font-sherika mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            Built for 50+ YC Companies. Most ship in under 2 weeks.
          </p>

          {/* Trusted by avatars badge (Clean, no sparkle icons) */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
            <span className="text-[11px] font-medium text-slate-400">Trusted by</span>
            <div className="flex -space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">C</span>
              <span className="w-5 h-5 rounded-full bg-[#FF8500] border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">P</span>
              <span className="w-5 h-5 rounded-full bg-emerald-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">I</span>
              <span className="w-5 h-5 rounded-full bg-fuchsia-500 border border-black/40 flex items-center justify-center text-[9px] text-white font-bold">M</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          CONTINUOUS INFINITE CAROUSEL STREAM (Smooth Animated Flow)
         ============================================================== */}
      <div
        className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform items-center py-2"
        >
          {duplicatedProjects.map((proj, idx) => (
            <div
              key={`${proj.id}-${idx}`}
              onClick={() => setActiveItem(proj)}
              className="recent-work-card group w-[280px] sm:w-[320px] md:w-[360px] mx-2.5 sm:mx-3 shrink-0 flex flex-col rounded-3xl overflow-hidden bg-[#0C1E4E]/80 border border-white/10 hover:border-[#FF8500]/60 shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(255,133,0,0.22)]"
            >
              {/* Top Media Showcase Canvas (Real Video Poster or Case Study Image) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050D24]">
                <img
                  src={proj.thumbnailSrc}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Dark gradient overlay for typography clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07112B] via-transparent to-black/30 pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-md ${
                      proj.type === "video"
                        ? "bg-[#FF8500]/95 text-[#081330]"
                        : "bg-[#0C1E4E]/90 text-sky-300 border border-sky-400/30"
                    }`}
                  >
                    {proj.type === "video" ? (
                      <>
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Video Reel</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-2.5 h-2.5" />
                        <span>Case Study</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Center Hover Action Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md ${
                      proj.type === "video"
                        ? "bg-black/60 border border-white/20 text-white group-hover:scale-115 group-hover:bg-[#FF8500] group-hover:text-[#081330]"
                        : "bg-black/60 border border-white/20 text-white group-hover:scale-115 group-hover:bg-white group-hover:text-[#081330]"
                    }`}
                  >
                    {proj.type === "video" ? (
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Metadata Label Bar */}
              <div className="p-4 sm:p-4.5 bg-[#07112B] border-t border-white/10 flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>
                      Made For <strong className="text-white font-bold">{proj.clientLabel}</strong>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      {proj.badgeLabel}
                    </span>
                  </div>
                  <h3 className="font-agency font-bold text-lg sm:text-xl text-white tracking-tight line-clamp-1 group-hover:text-[#FFA133] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                    {proj.subtext}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
                  <span className="text-[#FF8500] font-semibold text-[11px] group-hover:underline">
                    {proj.type === "video" ? "▶ Play Video Reel" : "🔍 View Full Project"}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-[#FF8500] group-hover:text-[#081330] transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==============================================================
          INTERACTIVE MEDIA LIGHTBOX / MODAL (Video Player & Image Popup)
         ============================================================== */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#040A1C]/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#091538] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#07112B]">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    activeItem.type === "video"
                      ? "bg-[#FF8500]/20 text-[#FF8500] border border-[#FF8500]/30"
                      : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                  }`}
                >
                  {activeItem.type === "video" ? "Video Reel" : "Case Study"}
                </span>
                <h3 className="font-agency font-bold text-base sm:text-xl text-white truncate">
                  {activeItem.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Media Body */}
            <div className="relative flex-1 overflow-auto bg-black/60 flex items-center justify-center p-2 sm:p-4">
              {activeItem.type === "video" ? (
                <div className="relative aspect-video w-full max-h-[65vh] rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
                  <video
                    src={activeItem.mediaSrc}
                    poster={activeItem.thumbnailSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full max-h-[65vh] flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={activeItem.mediaSrc}
                    alt={activeItem.title}
                    className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Modal Bottom Details & CTA Bar */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#07112B] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Client:</span>
                  <span className="font-semibold text-white">{activeItem.clientLabel}</span>
                  <span>•</span>
                  <span className="text-slate-300">{activeItem.category}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {activeItem.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveItem(null);
                  onOpenContact?.();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8500] hover:bg-[#FFA030] text-[#081330] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-orange-500/20 shrink-0"
              >
                <span>Get Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentWorkSection;
