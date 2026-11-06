import { ProjectsView } from "@/components/pages/ProjectsView";
import { PageContentProvider } from "@/content/page";
import { getPageOverride } from "@/sanity/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects & Case Studies",
  description:
    "Explore Pixim Design's work: brand identities, packaging, websites, web apps and product design case studies for startups and growing businesses.",
  path: "/projects",
});

export default async function Page() {
  const override = await getPageOverride("projects");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
      <PageContentProvider value={override}>
        <ProjectsView />
      </PageContentProvider>
    </>
  );
}
