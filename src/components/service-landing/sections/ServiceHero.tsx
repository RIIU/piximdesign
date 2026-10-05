"use client";

import React from "react";
import { PageHero } from "@/components/page-kit/PageHero";
import type { ServiceConfig } from "../types";

interface ServiceHeroProps {
  shortName: string;
  hero: ServiceConfig["hero"];
  onStart: () => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ shortName, hero, onStart }) => (
  <PageHero
    crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: shortName }]}
    eyebrow={hero.eyebrow}
    title={hero.title}
    description={hero.description}
    primary={{ label: hero.primaryCta, onClick: onStart }}
    secondary={{ label: "View Packages", href: "#service-packages" }}
    visual={hero.visual}
  />
);
