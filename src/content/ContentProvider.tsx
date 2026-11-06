"use client";

import React, { createContext, useContext } from "react";
import { SETTINGS_DEFAULTS, type SiteSettings } from "./settings";
import { HOME_DEFAULTS, type HomeContent } from "./home";

const SettingsContext = createContext<SiteSettings>(SETTINGS_DEFAULTS);
const HomeContext = createContext<HomeContent>(HOME_DEFAULTS);

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
