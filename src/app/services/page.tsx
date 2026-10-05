import { ServicesView } from "@/components/pages/ServicesView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Branding, Web & Marketing Services",
  description:
    "Logo and brand identity, packaging, social media, motion video, websites, ads and SEO from one team, with clear pricing in BDT and USD.",
  path: "/services",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <ServicesView />
    </>
  );
}
