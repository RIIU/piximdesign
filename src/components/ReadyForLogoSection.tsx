"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Send, Volume2, VolumeX, Play } from "lucide-react";
import { GsapMagneticButton } from "@/components/animations";

interface ReadyForLogoSectionProps {
  onOpenContact?: (service?: string, note?: string) => void;
  colorVariant?: "blue" | "orange";
}

export const ReadyForLogoSection: React.FC<ReadyForLogoSectionProps> = ({
  onOpenContact,
  colorVariant = "blue",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Toggle Play / Pause
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

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const isOrange = colorVariant === "orange";

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full pointer-events-none opacity-35 blur-3xl"
        style={{
          background: isOrange
            ? "radial-gradient(circle at center, rgba(255, 133, 0, 0.28) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(38, 81, 185, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full pointer-events-none opacity-35 blur-3xl"
        style={{
          background: isOrange
            ? "radial-gradient(circle at center, rgba(38, 81, 185, 0.25) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(255, 133, 0, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card Container: Deep to Light Brand Color (Completely Black-Free) */}
        <div
          className={`relative rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden border backdrop-blur-xl transition-colors duration-500 ${
            isOrange
              ? "border-orange-400/40 bg-gradient-to-br from-[#7C2D12] via-[#C2410C] via-45% to-[#FF8500] shadow-[0_25px_70px_-10px_rgba(124,45,18,0.75),0_0_55px_rgba(255,133,0,0.35)]"
              : "border-[#2651B9]/30 bg-gradient-to-br from-[#09173E]/95 via-[#0D2258]/90 to-[#081434]/95 shadow-[0_25px_70px_-15px_rgba(4,10,28,0.85),0_0_50px_rgba(38,81,185,0.2)]"
          }`}
        >
          {/* Luminous Specular Top-Left Lighting */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isOrange
                ? "bg-[radial-gradient(ellipse_75%_60%_at_15%_20%,rgba(254,215,170,0.35),transparent_65%)]"
                : "bg-[radial-gradient(ellipse_75%_60%_at_15%_20%,rgba(38,81,185,0.28),transparent_65%)]"
            }`}
          />

          {/* Counter-Glow at Bottom-Right */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isOrange
                ? "bg-[radial-gradient(ellipse_60%_50%_at_90%_85%,rgba(38,81,185,0.35),transparent_60%)]"
                : "bg-[radial-gradient(ellipse_60%_50%_at_90%_85%,rgba(255,133,0,0.18),transparent_60%)]"
            }`}
          />

          {/* Ambient inner neon rim border highlight */}
          <div
            className={`absolute -inset-px rounded-[inherit] opacity-70 pointer-events-none ${
              isOrange
                ? "bg-gradient-to-r from-amber-300/40 via-orange-400/25 to-blue-400/35"
                : "bg-gradient-to-r from-blue-400/30 via-transparent to-[#FF8500]/25"
            }`}
          />

          {/* Grid Layout: Left Content, Right Video */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Description & Action Buttons */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center text-left">
              <h2 className="font-agency text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15]">
                Ready for a{" "}
                <span
                  className={`block sm:inline bg-clip-text text-transparent drop-shadow-sm ${
                    isOrange
                      ? "bg-gradient-to-r from-white via-amber-100 to-amber-200"
                      : "bg-gradient-to-r from-[#FF8500] via-[#FFA133] to-[#FF8500]"
                  }`}
                >
                  Professional Logo?
                </span>
              </h2>

              <p
                className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl ${
                  isOrange ? "text-orange-50/95" : "text-slate-300"
                }`}
              >
                With 8+ years of experience and 500+ happy clients, Piximdesign creates Premium brand identities, logos, and modern websites that stand out.
              </p>

              {/* Action Buttons */}
              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4">
                {/* Primary Button: Get Started */}
                <GsapMagneticButton
                  onClick={() =>
                    onOpenContact?.(
                      "Logo Design",
                      "I'm ready to get started on my professional logo design."
                    )
                  }
                  variant={isOrange ? "secondary" : "primary"}
                  strength={0.28}
                  className={`px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    isOrange
                      ? "!bg-[#1E40AF] hover:!bg-[#1D4ED8] !text-white shadow-lg shadow-blue-950/40 border border-blue-400/40"
                      : "!bg-gradient-to-r !from-[#FF8500] !to-[#FFA133] hover:!from-[#e67700] hover:!to-[#FF8500] !text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </GsapMagneticButton>

                {/* Secondary Button: Book Now */}
                <GsapMagneticButton
                  onClick={() =>
                    onOpenContact?.(
                      "Logo Consultation",
                      "I would like to book a consultation for logo branding."
                    )
                  }
                  variant="secondary"
                  strength={0.28}
                  className={`px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    isOrange
                      ? "!bg-white border border-white/60 hover:!bg-amber-50 !text-[#7C2D12] shadow-orange-950/20"
                      : "!bg-white/[0.08] hover:!bg-white/[0.15] !text-white border border-white/25 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-white/40 hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  <span>BOOK NOW</span>
                  <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 -rotate-12" />
                </GsapMagneticButton>
              </div>
            </div>

            {/* Right Column: Video Showcase Card */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center">
              <div
                className={`relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden border group transition-all duration-300 ring-1 ring-white/10 ${
                  isOrange
                    ? "border-orange-300/35 bg-[#2A0E05] shadow-[0_20px_50px_-10px_rgba(30,10,3,0.7),0_0_35px_rgba(255,133,0,0.3)]"
                    : "border-white/20 bg-[#071330] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6),0_0_40px_rgba(38,81,185,0.2)]"
                }`}
              >
                {/* Video Element */}
                <video
                  ref={videoRef}
                  src="/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Top-Left: Pixim Logo Icon */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 shadow-md pointer-events-none">
                  <Image
                    src="/images/logo.webp"
                    alt="Pixim Design"
                    width={22}
                    height={22}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
                    Pixim
                  </span>
                </div>

                {/* Top-Right: Sound Listen/Mute Pill Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  aria-label={isMuted ? "Listen with audio" : "Mute audio"}
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                    isMuted
                      ? "bg-black/65 hover:bg-black/80 text-white border-white/20 shadow-black/40"
                      : "bg-[#2651B9] hover:bg-[#1E40AF] text-white border-[#3B82F6]/50 shadow-[#2651B9]/40"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isMuted
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#2651B9]"
                    }`}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    )}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    {isMuted ? "Listen" : "Mute"}
                  </span>
                </button>

                {/* Center Play/Pause Watermark Overlay when paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] cursor-pointer z-10"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform duration-200">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Video Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20 pointer-events-none">
                  <div
                    className={`h-full transition-all duration-100 ${
                      isOrange
                        ? "bg-gradient-to-r from-[#2651B9] via-amber-300 to-white"
                        : "bg-gradient-to-r from-[#2651B9] to-[#FF8500]"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
