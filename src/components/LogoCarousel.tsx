"use client";

import React, { useState } from "react";
import Image from "next/image";

// Client logos from the public/client logo directory
export const CLIENT_LOGOS = [
  {
    id: "elite-motors",
    name: "Elite Motors",
    src: "/client logo/website_clients_logo_photo_home_page-removebg-preview.png",
  },
  {
    id: "tripshop",
    name: "TripShop Travels",
    src: "/client logo/website_clients_logo_photo_home_page_2- (1).png",
  },
  {
    id: "grameen-swad",
    name: "গ্রামীণ স্বাদ",
    src: "/client logo/website_clients_logo_photo_home_page_3- (1).png",
  },
  {
    id: "zarvila",
    name: "Zarvila",
    src: "/client logo/website_clients_logo_photo_home_page_3-removebg-preview.png",
  },
  {
    id: "eon-education",
    name: "EON Education & Immigration",
    src: "/client logo/website_clients_logo_photo_home_page_4- (1).png",
  },
  {
    id: "guddi-studio",
    name: "Guddi Studio",
    src: "/client logo/website_clients_logo_photo_home_page_5- (1).png",
  },
  {
    id: "optix-photography",
    name: "Optix Photography",
    src: "/client logo/website_clients_logo_photo_home_page_6- (1).png",
  },
  {
    id: "nextgen-it",
    name: "NextGen IT",
    src: "/client logo/website_clients_logo_photo_home_page_7- (1).png",
  },
  {
    id: "minivon-shop",
    name: "Minivon Shop",
    src: "/client logo/website_clients_logo_photo_home_page_8- (1).png",
  },
  {
    id: "movexa",
    name: "Movexa",
    src: "/client logo/website_clients_logo_photo_home_page_9- (1).png",
  },
];

export const LogoCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the array for seamless 100% infinite marquee loop (0% to -33.333333%)
  const duplicatedLogos = [
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
  ];

  return (
    <div
      className="relative w-full overflow-hidden select-none py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left and Right vignette fade gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#090D16] via-[#090D16]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#090D16] via-[#090D16]/90 to-transparent z-20 pointer-events-none" />

      {/* Just 1 Single Line of Pure Client Logos (No boxes/backgrounds) */}
      <div
        className="flex w-max will-change-transform animate-marquee-left items-center py-2"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: "35s",
        }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <div
            key={`${logo.id}-${idx}`}
            className="group relative flex items-center justify-center mx-3 sm:mx-4 md:mx-6 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={180}
              height={52}
              style={{ width: "auto" }}
              className="h-9 sm:h-11 md:h-13 max-w-[130px] sm:max-w-[160px] md:max-w-[190px] object-contain opacity-80 hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
