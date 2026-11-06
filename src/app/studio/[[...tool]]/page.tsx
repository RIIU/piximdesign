import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  title: { absolute: "Pixim Design – Website Editor" },
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: 40, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
        <h1>Website editor is not connected yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and <code>NEXT_PUBLIC_SANITY_DATASET</code>) to the hosting
          environment variables and redeploy. The website keeps working with its built-in content until then.
        </p>
      </main>
    );
  }
  return (
    <div className="sanity-studio" style={{ position: "fixed", inset: 0, zIndex: 100, background: "#fff" }}>
      <NextStudio config={config} />
    </div>
  );
}
