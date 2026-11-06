import { PricingView } from "@/components/pages/PricingView";
import { PageContentProvider } from "@/content/page";
import { getPageOverride } from "@/sanity/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing & Packages",
  description:
    "Transparent design and development pricing in BDT and USD. Compare Basic, Standard and Premium plans, see prices per service and estimate your project.",
  path: "/pricing",
});

export default async function Page() {
  const override = await getPageOverride("pricing");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }])} />
      <PageContentProvider value={override}>
        <PricingView />
      </PageContentProvider>
    </>
  );
}
