import { PricingView } from "@/components/pages/PricingView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing & Packages",
  description:
    "Transparent design and development pricing in BDT and USD. Compare Basic, Standard and Premium plans, see prices per service and estimate your project.",
  path: "/pricing",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }])} />
      <PricingView />
    </>
  );
}
