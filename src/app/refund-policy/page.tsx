import { LegalPage } from "@/components/legal/LegalPage";
import { INTRO, SECTIONS, TITLE } from "@/content/legal/refund";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/refund-policy";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "When and how Pixim Design refunds payments for design, web and marketing projects, including cancellations and how to request a refund.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Refund Policy", path: PATH }])} />
      <LegalPage
        legalKey="refund"
        title={TITLE}
        path={PATH}
        intro={INTRO}
        sections={SECTIONS}
      />
    </>
  );
}
