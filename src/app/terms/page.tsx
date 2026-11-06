import { LegalPage } from "@/components/legal/LegalPage";
import { INTRO, SECTIONS, TITLE } from "@/content/legal/terms";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/terms";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Pixim Design website or hire us for branding, design, web, marketing and SEO services.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms & Conditions", path: PATH }])} />
      <LegalPage
        legalKey="terms"
        title={TITLE}
        path={PATH}
        intro={INTRO}
        sections={SECTIONS}
      />
    </>
  );
}
