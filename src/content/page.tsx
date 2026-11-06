"use client";

import React, { createContext, useContext, useMemo } from "react";
import { RichTitle } from "./RichTitle";
import { mergePage, type PageContent, type PageOverride } from "./pageMerge";

export type { PageContent, PageOverride, PageSection, TierName } from "./pageMerge";
export { mergePage } from "./pageMerge";

const PageOverrideContext = createContext<PageOverride | null>(null);

export function PageContentProvider({ value, children }: { value: PageOverride | null; children: React.ReactNode }) {
  return <PageOverrideContext.Provider value={value}>{children}</PageOverrideContext.Provider>;
}

/** Page content = the page's DEFAULTS with any Sanity edits applied. */
export function usePageContent(defaults: PageContent): PageContent {
  const override = useContext(PageOverrideContext);
  return useMemo(() => mergePage(defaults, override), [defaults, override]);
}

const GRADIENT = "bg-gradient-to-r from-[#FF8500] via-[#FFA229] to-amber-300 bg-clip-text text-transparent";

/** Title text with *highlight* support, styled like the site's gradient titles. */
export const T = ({ text, breakClassName = "hidden sm:block" }: { text?: string; breakClassName?: string }) => (
  <RichTitle text={text ?? ""} highlightClassName={GRADIENT} breakClassName={breakClassName} />
);
