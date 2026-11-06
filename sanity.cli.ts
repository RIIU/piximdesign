import path from "node:path";
import { defineCliConfig } from "sanity/cli";

// Only used for Sanity CLI commands (e.g. `npx sanity schema validate`).
// The editor itself is embedded in the Next.js site at /studio.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  vite: (config) => ({
    ...config,
    resolve: { ...config.resolve, alias: { ...(config.resolve?.alias || {}), "@": path.resolve(__dirname, "src") } },
  }),
});
