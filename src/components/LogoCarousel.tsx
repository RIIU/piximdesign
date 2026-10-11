"use client";

import React, { useState } from "react";

// Client logos from the public/client logo directory
export const ROW_1_LOGOS = [
  { id: "elite-motors", name: "Elite Motors", src: "/client logo/elite-motors.webp" },
  { id: "tripshop", name: "TripShop Travels", src: "/client logo/tripshop.webp" },
  { id: "grameen-swad", name: "গ্রামীণ স্বাদ", src: "/client logo/grameen-swad.webp" },
  { id: "zarvila", name: "Zarvila", src: "/client logo/zarvila.webp" },
  { id: "eon-education", name: "EON Education", src: "/client logo/eon-education.webp" },
];

export const ROW_2_LOGOS = [
  { id: "guddi-studio", name: "Guddi Studio", src: "/client logo/guddi-studio.webp" },
  { id: "optix-photography", name: "Optix Photography", src: "/client logo/optix-photography.webp" },
  { id: "nextgen-it", name: "NextGen IT", src: "/client logo/nextgen-it.webp" },
  { id: "minivon-shop", name: "Minivon Shop", src: "/client logo/minivon-shop.webp" },
  { id: "movexa", name: "Movexa", src: "/client logo/movexa.webp" },
];

export const CLIENT_LOGOS = [...ROW_1_LOGOS, ...ROW_2_LOGOS];

export const LogoCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple arrays for seamless infinite looping
  const dupRow1 = [...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS];
  const dupRow2 = [...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS];

  return (
    <div
      className="relative w-full overflow-hidden select-none py-2 flex flex-col gap-4 sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Row 1: Flow Left */}
      <div
        className="flex w-max will-change-transform animate-marquee-left items-center"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: "32s",
        }}
      >
        {dupRow1.map((logo, idx) => (
          <div
            key={`row1-${logo.id}-${idx}`}
            className="group relative flex items-center justify-center mx-5 sm:mx-8 md:mx-10 shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              width={260}
              height={100}
              decoding="async"
              className="h-8 sm:h-10 md:h-11 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[180px] object-contain opacity-85 hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Flow Right */}
      <div
        className="flex w-max will-change-transform animate-marquee-right items-center"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: "36s",
        }}
      >
        {dupRow2.map((logo, idx) => (
          <div
            key={`row2-${logo.id}-${idx}`}
            className="group relative flex items-center justify-center mx-5 sm:mx-8 md:mx-10 shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              width={260}
              height={100}
              decoding="async"
              className="h-8 sm:h-10 md:h-11 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[180px] object-contain opacity-85 hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
