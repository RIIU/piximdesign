import { LegalPage } from "@/components/legal/LegalPage";
import { INTRO, SECTIONS, TITLE } from "@/content/legal/privacy";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/privacy-policy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Pixim Design collects, uses and protects personal information from website visitors and clients in Bangladesh and worldwide.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", path: PATH }])} />
      <LegalPage
        legalKey="privacy"
        title={TITLE}
        path={PATH}
        intro={INTRO}
        sections={SECTIONS}
      />
    </>
  );
}
