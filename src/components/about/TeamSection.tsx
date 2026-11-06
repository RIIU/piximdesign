"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Eyebrow, GradientText } from "@/components/page-kit/shared";
import { MapPin, Sparkles, Play, Pause, Volume2, VolumeX } from "@/content/lucide";
import { SocialIcon } from "@/components/SocialIcon";
import { media } from "@/content/media";
import { tx } from "@/content/text";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  badge?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sahin-mia",
    get name() { return tx("about/TeamSection.sahin-mia", "Sahin Mia"); },
    get role() { return tx("about/TeamSection.founder-ceo", "Founder & CEO"); },
    image: "/images/team/sahin-mia.jpg",
    get bio() { return tx("about/TeamSection.brand-strategist-and-creative-technologist-drivi", "Brand strategist and creative technologist driving visual identity & vision."); },
    linkedin: "https://linkedin.com",
    get badge() { return tx("about/TeamSection.leadership", "Leadership"); },
  },
  {
    id: "ismail-nahid",
    get name() { return tx("about/TeamSection.ismail-nahid", "Ismail Nahid"); },
    get role() { return tx("about/TeamSection.sales-manager", "Sales Manager"); },
    image: "/images/team/ismail-nahid.jpg",
    get bio() { return tx("about/TeamSection.client-partnership-lead-ensuring-clear-scopes", "Client partnership lead ensuring clear scopes, swift kickoffs & client success."); },
    linkedin: "https://linkedin.com",
    get badge() { return tx("about/TeamSection.partnerships", "Partnerships"); },
  },
  {
    id: "shariful-islam",
    get name() { return tx("about/TeamSection.shariful-islam", "Shariful Islam"); },
    get role() { return tx("about/TeamSection.web-developer", "Web Developer"); },
    image: "/images/team/shariful-islam.jpg",
    get bio() { return tx("about/TeamSection.full-stack-engineer-crafting-high-performance", "Full-stack engineer crafting high-performance, pixel-perfect web applications."); },
    linkedin: "https://linkedin.com",
    get badge() { return tx("about/TeamSection.engineering", "Engineering"); },
  },
  {
    id: "sowrov-kazi",
    get name() { return tx("about/TeamSection.sowrov-kazi", "Sowrov Kazi"); },
    get role() { return tx("about/TeamSection.webflow-developer", "Webflow Developer"); },
    image: "/images/team/sowrov-kazi.jpg",
    get bio() { return tx("about/TeamSection.no-code-interactive-developer-translating-intric", "No-code & interactive developer translating intricate UI into smooth animations."); },
    linkedin: "https://linkedin.com",
    get badge() { return tx("about/TeamSection.interactions", "Interactions"); },
  },
];

interface TeamSectionProps {
  videoSrc?: string;
  posterSrc?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  videoSrc = "/video/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.mp4",
  posterSrc = "/video/posters/Creative-Logo-Branding-Solutions-for-Your-Business-_-Pixim-Design.webp",
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Video Player States
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-play muted and observe visibility via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
      { threshold: 0.25 }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
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

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(38,81,185,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(255,133,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Heading, Subtitle & Studio Culture Video */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <Eyebrow>{tx("about/TeamSection.in-house-specialists", "In-House Specialists")}</Eyebrow>
            <h2 className="mt-4 font-agency text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.08]">
              {tx("about/TeamSection.the-team-your-project", "The team your project")} <GradientText>{tx("about/TeamSection.actually-lands-with", "actually lands with")}</GradientText>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {tx("about/TeamSection.the-people-behind-every-pixim-project", "The people behind every Pixim project. Senior, experienced, and built for startups and SaaS teams worldwide. No subcontracting, no junior handoffs.")}
            </p>
          </div>

          {/* Studio Culture Video Card */}
          <div
            ref={videoContainerRef}
            className="mt-8 relative group overflow-hidden rounded-[26px] border border-[#2651B9]/35 bg-gradient-to-b from-[#0C1E4E]/80 to-[#081330] p-3 shadow-[0_12px_36px_rgba(4,10,28,0.4)] transition-all duration-300 hover:border-[#FF8500]/50"
          >
            {/* Ambient backlight glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2651B9]/20 via-transparent to-[#FF8500]/15 pointer-events-none" />

            <div
              onClick={togglePlay}
              className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-[20px] overflow-hidden bg-slate-950 border border-white/10 cursor-pointer select-none"
            >
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                src={media(videoSrc)}
                poster={media(posterSrc)}
                playsInline
                autoPlay
                muted={isMuted}
                loop
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Gradient overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081330]/90 via-transparent to-black/40 pointer-events-none" />

              {/* Top Bar: Studio Tag & Audio Toggle Button */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081330]/85 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-200 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <MapPin className="w-3 h-3 text-[#FF8500]" />
                  <span>{tx("about/TeamSection.dhaka-creative-hub", "Dhaka Creative Hub")}</span>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-8 h-8 rounded-full bg-[#081330]/80 hover:bg-[#FF8500] backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Center Play / Pause Indicator (shows when paused or hover) */}
              <div
                className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#FF8500]/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl shadow-orange-500/30 scale-95 group-hover:scale-100 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Bottom Info Plate */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#081330]/90 backdrop-blur-md border border-[#2651B9]/40 flex items-center justify-between z-20">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFA133]" />
                    <span>{tx("about/TeamSection.collaborative-studio-culture", "Collaborative Studio Culture")}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tx("about/TeamSection.watch-our-designers-engineers-in-action", "Watch our designers & engineers in action")}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FF8500]/15 text-[#FFA133] border border-[#FF8500]/30 font-bold">
                  {tx("about/TeamSection.in-house", "In-House")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Grid of Team Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {TEAM_MEMBERS.map((member) => {
            const hasError = imageErrors[member.id];
            return (
              <div
                key={member.id}
                className="group relative rounded-[24px] border border-[#2651B9]/30 bg-gradient-to-b from-[#0C1E4E]/75 via-[#0C1E4E]/50 to-[#081330]/90 p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#FF8500]/50 hover:shadow-[0_12px_32px_rgba(255,133,0,0.12)] hover:-translate-y-1"
              >
                {/* Subtle Amber / Blue radial glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#2651B9]/30 to-[#FF8500]/15 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                {/* Portrait Photo Container */}
                <div className="relative aspect-[4/3] w-full rounded-[18px] overflow-hidden bg-gradient-to-b from-blue-950/60 via-[#0B1A44] to-[#071128] border border-white/5 flex items-center justify-center">
                  {!hasError && member.image ? (
                    <Image
                      src={media(member.image)}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      onError={() => handleImageError(member.id)}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* High-tech Stylized Fallback Avatar with Initials & Lighting Glow */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#12275e] via-[#0C1E4E] to-[#06102b]">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#2452C7] to-[#FF8500] p-[2px] shadow-lg shadow-blue-900/40">
                        <div className="w-full h-full rounded-2xl bg-[#081330] flex items-center justify-center text-2xl font-black text-white font-agency tracking-wider">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <span className="mt-3 text-[11px] font-mono text-[#FFA133] tracking-wider uppercase font-semibold">
                        {member.badge || "Core Specialist"}
                      </span>
                    </div>
                  )}

                  {/* Gradient bottom overlay to ensure text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#081330]/90 to-transparent pointer-events-none" />
                </div>

                {/* Bottom Docked Floating Nameplate */}
                <div className="relative z-10 mt-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-agency text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#FFA133] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#FF8500] mt-0.5">
                        {member.role}
                      </p>
                    </div>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="w-8 h-8 rounded-lg bg-[#2651B9]/20 hover:bg-[#FF8500] text-slate-300 hover:text-white border border-[#2651B9]/30 hover:border-[#FF8500] flex items-center justify-center transition-all duration-200"
                      >
                        <SocialIcon network="linkedin" className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {member.bio && (
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
