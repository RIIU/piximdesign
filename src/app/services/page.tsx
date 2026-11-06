import { ServicesView } from "@/components/pages/ServicesView";
import { PageContentProvider } from "@/content/page";
import { getPageOverride } from "@/sanity/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Branding, Web & Marketing Services",
  description:
    "Logo and brand identity, packaging, social media, motion video, websites, ads and SEO from one team, with clear pricing in BDT and USD.",
  path: "/services",
});

export default async function Page() {
  const override = await getPageOverride("services");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageContentProvider value={override}>
        <ServicesView />
      </PageContentProvider>
    </>
  );
}
