"use client";

import React, { createContext, useContext } from "react";
import { SETTINGS_DEFAULTS, type SiteSettings } from "./settings";
import { HOME_DEFAULTS, type HomeContent } from "./home";
import { CATALOG_DEFAULTS, startingFromPricing, type Catalog } from "./catalog";

const SettingsContext = createContext<SiteSettings>(SETTINGS_DEFAULTS);
const HomeContext = createContext<HomeContent>(HOME_DEFAULTS);
const CatalogContext = createContext<Catalog>(CATALOG_DEFAULTS);

export function SettingsProvider({ value, children }: { value: SiteSettings; children: React.ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function HomeContentProvider({ value, children }: { value: HomeContent; children: React.ReactNode }) {
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

/** Global content: company info, socials, client logos, footer, CTA banner. */
export const useSettings = () => useContext(SettingsContext);

/** Homepage content (falls back to defaults outside the homepage). */
export const useHome = () => useContext(HomeContext);

export function CatalogProvider({ value, children }: { value: Catalog; children: React.ReactNode }) {
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

/** The 7 services with editable names, taglines and features. */
export const useServices = () => useContext(CatalogContext).services;

/** Package prices per service (editable in Sanity → Services & Prices). */
export const usePricing = () => useContext(CatalogContext).pricing;

/** "Starting from" price for a service. */
export const useStartingFrom = () => {
  const pricing = usePricing();
  return (slug: string) => startingFromPricing(pricing, slug);
};
