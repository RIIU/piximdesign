"use client";

// Site-wide image & video replacement.
// Every picture/video on the site goes through media(src). If the client uploaded a
// replacement for that file in Sanity → "Images & Videos", the new file's URL is used.

import React from "react";

let MEDIA_MAP: Record<string, string> = {};

/** Returns the replacement URL for a built-in image/video, or the original path. */
export function media<T extends string | undefined | null>(src: T): T {
  if (!src) return src;
  return (MEDIA_MAP[src as string] ?? src) as T;
}

/** Sets the replacement map before the page renders (works on the server and in the browser). */
export function MediaProvider({ value, children }: { value: Record<string, string>; children: React.ReactNode }) {
  MEDIA_MAP = value || {};
  return <>{children}</>;
}
