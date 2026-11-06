import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";
import { HomeContentProvider } from "@/content/ContentProvider";
import { getHomeContent } from "@/sanity/content";
import { BASE_OPEN_GRAPH, OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { ...BASE_OPEN_GRAPH, url: "/", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default async function Page() {
  const content = await getHomeContent();
  return (
    <HomeContentProvider value={content}>
      <HomeView />
    </HomeContentProvider>
  );
}
