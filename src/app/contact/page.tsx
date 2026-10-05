import { ContactView } from "@/components/pages/ContactView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get a free 30-minute consultation or send your project brief. Email contact@piximdesign.com or message us on WhatsApp; we typically reply within 2 hours.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <ContactView />
    </>
  );
}
