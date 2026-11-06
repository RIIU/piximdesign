import { AboutView } from "@/components/pages/AboutView";
import { PageContentProvider } from "@/content/page";
import { getPageOverride } from "@/sanity/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Pixim Design is a Dhaka-based branding and digital design studio with 8+ years of experience and 500+ brands launched for clients worldwide.",
  path: "/about",
});

export default async function Page() {
  const override = await getPageOverride("about");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageContentProvider value={override}>
        <AboutView />
      </PageContentProvider>
    </>
  );
}
