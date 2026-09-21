"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { LogoCarousel } from "./LogoCarousel";

interface VideoShowcaseSectionProps {
  onOpenContact?: () => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  // GSAP ScrollTrigger setup for scroll-expanding width
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      if (!videoBoxRef.current || !triggerRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          videoBoxRef.current,
          {
            width: "68%",
            borderRadius: "36px",
            scale: 0.95,
          },
          {
            width: "100%",
            borderRadius: "24px",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          videoBoxRef.current,
          {
            width: "88%",
            borderRadius: "24px",
            scale: 0.98,
          },
          {
            width: "100%",
            borderRadius: "16px",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => mm.revert();
    }
  );

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle Mute/Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!videoBoxRef.current) return;
    if (!document.fullscreenElement) {
      videoBoxRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Track video progress
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8 md:pb-10 bg-[#090D16] overflow-hidden"
    >
      {/* Background ambient radial lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[1100px] h-[450px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(38, 81, 185, 0.25) 0%, rgba(255, 133, 0, 0.15) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Trigger & Expanding Container */}
        <div
          ref={triggerRef}
          className="w-full flex justify-center items-center py-4"
        >
          <div
            ref={videoBoxRef}
            className="group relative overflow-hidden bg-black/80 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(38,81,185,0.3)] ring-1 ring-white/15 transition-all duration-300 will-change-[width,border-radius,transform]"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Ambient neon rim highlight */}
            <div className="absolute -inset-px rounded-[inherit] bg-gradient-to-r from-[#2651B9]/30 via-transparent to-[#FF8500]/30 opacity-70 pointer-events-none z-10" />

            {/* Video Element */}
            <div className="relative aspect-video w-full overflow-hidden">
              <video
                ref={videoRef}
                src="/video/Grow-Your-Business-with-Creative-Design-_-Pixim-Design-Agency.mp4"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Central Play/Pause Watermark on Pause */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-20"
                >
                  <div className="w-20 h-20 rounded-full bg-[#FF8500] text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3" />
                <span>Pixim Showreel</span>
              </div>

              {/* Bottom Interactive Glass Controls Bar */}
              <div
                className={`absolute bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-20 flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 transition-opacity duration-300 ${
                  showControls || !isPlaying ? "opacity-100" : "opacity-0 sm:opacity-90"
                }`}
              >
                {/* Thin progress scrubber */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2651B9] to-[#FF8500] transition-all duration-100 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play / Pause */}
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause Video" : "Play Video"}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      )}
                    </button>

                    {/* Mute / Unmute */}
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-slate-300" />
                          <span className="hidden sm:inline">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-[#FFA133]" />
                          <span className="hidden sm:inline">Mute</span>
                        </>
                      )}
                    </button>

                    <span className="hidden sm:inline-block text-xs text-slate-300 font-medium">
                      Grow Your Business with Creative Design
                    </span>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Client Logo Carousel Section */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <div className="text-center mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-slate-400">
              Trusted by 500+ Ambitious Brands Worldwide
            </span>
          </div>

          <LogoCarousel />
        </div>
      </div>
    </section>
  );
};
