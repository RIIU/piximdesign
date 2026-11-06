import React from "react";
import { defineField } from "sanity";

export const TITLE_HELP =
  "Put *stars* around words to highlight them (e.g. One Stop Solution for *Branding*). Press Enter for a new line.";

/** Multi-line title with highlight support */
export const titleField = (name = "title", title = "Title") =>
  defineField({ name, title, type: "text", rows: 2, description: TITLE_HELP });

export const textField = (name: string, title: string, rows = 3, description?: string) =>
  defineField({ name, title, type: "text", rows, description });

export const stringField = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", description });

/** Small preview thumbnail for items whose image is still the website's built-in file */
export const urlThumb = (url?: string) =>
  url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  ) : undefined;

/** Upload field + fallback path field (the path is filled by "Import website content"). */
export const imageWithFallback = (name: string, title: string) => [
  defineField({ name, title, type: "image", options: { hotspot: true }, description: "Upload a new image to replace the current one." }),
  defineField({
    name: `${name}Url`,
    title: `${title} – current file`,
    type: "string",
    description: "The website's existing file. Used only when no image is uploaded above.",
  }),
];

export const videoWithFallback = (name: string, title: string) => [
  defineField({
    name,
    title,
    type: "file",
    options: { accept: "video/mp4,video/webm" },
    description: "Upload an MP4/WebM video (keep it under ~10 MB for fast loading).",
  }),
  defineField({
    name: `${name}Url`,
    title: `${title} – current file`,
    type: "string",
    description: "The website's existing video. Used only when no video is uploaded above.",
  }),
];
