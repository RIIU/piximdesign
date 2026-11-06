// Sanity connection settings. All values come from environment variables so the
// site keeps working (with the built-in default content) when they are not set.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-01";
export const studioUrl = "/studio";

/** True once a Sanity project is connected. When false the site uses its default content. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

/** Server-only read token (Viewer). Needed for draft previews / visual editing. */
export const readToken = process.env.SANITY_API_READ_TOKEN || "";
