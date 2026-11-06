"use client";

import React from "react";
import { PageHero } from "@/components/page-kit/PageHero";
import type { ServiceConfig } from "../types";
import { tx } from "@/content/text";

interface ServiceHeroProps {
  shortName: string;
  hero: ServiceConfig["hero"];
  onStart: () => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ shortName, hero, onStart }) => (
  <PageHero
    crumbs={[{ label: tx("service-landing/sections/ServiceHero.home", "Home"), href: "/" }, { label: tx("service-landing/sections/ServiceHero.services", "Services"), href: "/services" }, { label: shortName }]}
    eyebrow={hero.eyebrow}
    title={hero.title}
    description={hero.description}
    primary={{ label: hero.primaryCta, onClick: onStart }}
    secondary={{ label: tx("service-landing/sections/ServiceHero.view-packages", "View Packages"), href: "#service-packages" }}
    visual={hero.visual}
  />
);
