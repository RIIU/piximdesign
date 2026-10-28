"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export interface ServiceHeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  badge?: string;
  aspectRatio?: string;
  topChip?: React.ReactNode;
  bottomChip?: React.ReactNode;
  className?: string;
}

/**
 * High-definition hero video component used across all service landing pages.
 * Features ambient backlight glow, autoplay, audio toggle, play/pause controls,
 * progress bar, and floating corner chips with smooth float animation.
 */
export const ServiceHeroVideo: React.FC<ServiceHeroVideoProps> = ({
  videoSrc,
  posterSrc,
  badge = "4K Showcase",
  aspectRatio = "aspect-[16/10]",
  topChip,
  bottomChip,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-play when component mounts and handle visibility via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing muted
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else {
          if (videoRef.current && isPlaying) {
            videoRef.current.play().catch(() => {});
          }
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      {/* Ambient background bloom */}
      <div className="absolute -inset-2.5 rounded-[32px] bg-gradient-to-r from-[#2651B9]/30 via-[#FF8500]/25 to-[#FFA133]/30 blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

      {/* Main Video Frame */}
      <div
        onClick={togglePlay}
        className={`relative ${aspectRatio} w-full rounded-3xl overflow-hidden border border-white/15 bg-[#081330] shadow-[0_25px_60px_-15px_rgba(255,133,0,0.35)] ring-1 ring-white/10 cursor-pointer select-none`}
      >
        {/* HTML5 Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Ambient Top and Bottom Gradient Vignettes */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#081330]/80 via-[#081330]/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081330]/90 via-[#081330]/30 to-transparent pointer-events-none" />

        {/* Top-Left Live Showcase Badge */}
        {badge && (
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#081330]/85 backdrop-blur-md border border-white/20 text-[11px] font-mono font-medium text-white shadow-md pointer-events-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide uppercase text-[10px] sm:text-[11px] text-white/90">{badge}</span>
          </div>
        )}

        {/* Bottom-Left Audio Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          className={`absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 text-xs font-semibold cursor-pointer shadow-lg active:scale-95 ${
            isMuted
              ? "bg-[#081330]/80 hover:bg-[#081330] text-white/80 border-white/20 hover:text-white"
              : "bg-[#FF8500] hover:bg-[#FFA133] text-white border-orange-300/40 shadow-orange-500/30"
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
              <span className="text-[10px] uppercase font-mono tracking-wider">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] uppercase font-mono tracking-wider">Audio On</span>
            </>
          )}
        </button>

        {/* Center Play Button Watermark if Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-transform duration-200">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Progress Line */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#FF8500] to-[#FFA133] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Floating Corner Chips with smooth animation */}
      {topChip}
      {bottomChip}
    </div>
  );
};
