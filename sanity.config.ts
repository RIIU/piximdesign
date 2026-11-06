"use client";

/**
 * Sanity Studio configuration – the editor lives at https://piximdesign.com/studio
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { UploadIcon } from "@sanity/icons";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes, SINGLETONS } from "./src/sanity/schemaTypes";
import { ImportTool } from "./src/sanity/tools/ImportTool";

const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));
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
          .items(
            SINGLETONS.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.id)
                .schemaType(s.type)
                .child(S.document().schemaType(s.type).documentId(s.id).title(s.title))
            )
          ),
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
