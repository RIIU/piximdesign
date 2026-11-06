"use client";

/**
 * Sanity Studio configuration – the editor lives at https://piximdesign.com/studio
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { UploadIcon } from "@sanity/icons";
import { dataset, projectId } from "./src/sanity/env";
import { FIXED_TYPES, LEGAL_DOCS, PAGE_DOCS, SERVICE_PAGE_DOCS, schemaTypes, SINGLETONS, TEXT_DOCS } from "./src/sanity/schemaTypes";
import { ImportTool } from "./src/sanity/tools/ImportTool";

const singletonTypes = FIXED_TYPES;
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Pixim Design – Website Editor",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created again from the "+" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can't be deleted or duplicated
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({
      title: "Content",
      structure: (S) =>
        S.list()
          .title("Website content")
          .items([
            ...SINGLETONS.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.id)
                .schemaType(s.type)
                .child(S.document().schemaType(s.type).documentId(s.id).title(s.title))
            ),
            S.divider(),
            S.listItem()
              .title("Pages")
              .id("pages")
              .child(
                S.list()
                  .title("Pages")
                  .items(
                    PAGE_DOCS.map((p) =>
                      S.listItem()
                        .title(p.title)
                        .id(p.id)
                        .schemaType("sitePage")
                        .child(S.document().schemaType("sitePage").documentId(p.id).title(p.title))
                    )
                  )
              ),
            S.listItem()
              .title("Service pages")
              .id("servicePages")
              .child(
                S.list()
                  .title("Service pages")
                  .items(
                    SERVICE_PAGE_DOCS.map((p) =>
                      S.listItem()
                        .title(p.title)
                        .id(p.id)
                        .schemaType("servicePage")
                        .child(S.document().schemaType("servicePage").documentId(p.id).title(p.title))
                    )
                  )
              ),
            S.listItem()
              .title("Website text (buttons, labels…)")
              .id("websiteText")
              .child(
                S.list()
                  .title("Website text")
                  .items(
                    TEXT_DOCS.map((p) =>
                      S.listItem()
                        .title(p.title)
                        .id(p.id)
                        .schemaType("textGroup")
                        .child(S.document().schemaType("textGroup").documentId(p.id).title(`Text – ${p.title}`))
                    )
                  )
              ),
            S.listItem()
              .title("Legal pages")
              .id("legalPages")
              .child(
                S.list()
                  .title("Legal pages")
                  .items(
                    LEGAL_DOCS.map((p) =>
                      S.listItem()
                        .title(p.title)
                        .id(p.id)
                        .schemaType("legalPage")
                        .child(S.document().schemaType("legalPage").documentId(p.id).title(p.title))
                    )
                  )
              ),
          ]),
    }),
    presentationTool({
      title: "Visual Editing",
      previewUrl: {
        initial: "/",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          homePage: { locations: [{ title: "Home page", href: "/" }] },
          servicesCatalog: {
            locations: [
              { title: "Services", href: "/services" },
              { title: "Pricing", href: "/pricing" },
              { title: "Home page", href: "/" },
            ],
          },
          legalPage: {
            select: { docId: "_id" },
            resolve: (doc) => {
              const id = String(doc?.docId ?? "").replace(/^drafts\./, "");
              const page = LEGAL_DOCS.find((p) => p.id === id);
              return page ? { locations: [{ title: page.title, href: page.href }] } : null;
            },
          },
          sitePage: {
            select: { docId: "_id" },
            resolve: (doc) => {
              const id = String(doc?.docId ?? "").replace(/^drafts\./, "");
              const page = PAGE_DOCS.find((p) => p.id === id);
              return page ? { locations: [{ title: page.title, href: page.href }] } : null;
            },
          },
          servicePage: {
            select: { id: "serviceId", docId: "_id" },
            resolve: (doc) => {
              const slug = (doc?.id as string) || String(doc?.docId ?? "").replace(/^(drafts\.)?servicePage-/, "");
              const page = SERVICE_PAGE_DOCS.find((p) => p.slug === slug);
              return page ? { locations: [{ title: page.title, href: `/services/${page.slug}` }] } : null;
            },
          },
          textGroup: {
            select: { docId: "_id" },
            resolve: (doc) => {
              const id = String(doc?.docId ?? "").replace(/^drafts\./, "");
              const page = TEXT_DOCS.find((p) => p.id === id);
              return page ? { locations: [{ title: page.title, href: page.href }] } : null;
            },
          },
          iconLibrary: { message: "Icons are used on every page", tone: "positive", locations: [{ title: "Home page", href: "/" }] },
          mediaLibrary: { message: "Images & videos are used on every page", tone: "positive", locations: [{ title: "Home page", href: "/" }] },
          siteSettings: {
            message: "Used on every page",
            tone: "positive",
            locations: [
              { title: "Home page", href: "/" },
              { title: "Contact page", href: "/contact" },
            ],
          },
        },
      },
    }),
  ],
  tools: (prev) => [
    ...prev,
    { name: "import", title: "Import content", icon: UploadIcon, component: ImportTool },
  ],
});
