import React from "react";
import { CLIENT_LOGOS } from "@/components/LogoCarousel";

export const ClientLogoWall: React.FC = () => (
  <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6">
    <div className="svc-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Trusted by growing brands</p>
      <p className="text-sm text-slate-400">
        <strong className="text-white">500+</strong> businesses have trusted Pixim with their brand
      </p>
    </div>

    <div className="svc-reveal grid grid-cols-2 sm:grid-cols-5 gap-px overflow-hidden rounded-3xl border border-[#2651B9]/25 bg-[#2651B9]/20">
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.id}
          className="group relative flex items-center justify-center aspect-[5/2] bg-[#0A1838] px-4 transition-colors duration-300 hover:bg-[#0C1E4E]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.name}
            width={300}
            height={120}
            loading="lazy"
            decoding="async"
            className="h-11 sm:h-12 lg:h-14 w-auto max-w-[88%] object-contain opacity-85 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  </section>
);
