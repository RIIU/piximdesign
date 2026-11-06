import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";
import { stringField, textField, titleField } from "./shared";

// One generic document type for the inner pages (Services, Pricing, Projects, About, Contact).
// The hidden "blocks" list (written by the import) decides which parts a page shows in the editor.

type Ctx = { document?: unknown; parent?: unknown };
const blocksOf = (doc: unknown) => ((doc as { blocks?: string[] } | undefined)?.blocks ?? []);
const usesBlock = (name: string) => ({ document }: Ctx) => !blocksOf(document).includes(name);
const usesField = (name: string) => ({ parent }: Ctx) =>
  !((parent as { fields?: string[] } | undefined)?.fields ?? []).includes(name);

const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], description });

const items = (name: string, title: string, description: string, withOutput = false) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "object",
        name: "item",
        fields: [stringField("title", "Title"), textField("desc", "Text", 2), ...(withOutput ? [stringField("output", "What you receive")] : [])],
        preview: { select: { title: "title", subtitle: "desc" } },
      }),
    ],
  });

const tier = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      stringField("usd", "Price in USD"),
      stringField("bdt", "Price in BDT"),
      stringField("tagline", "Short line"),
      stringField("desc", "Description"),
      strings("features", "What's included"),
    ],
  });

export const sitePage = defineType({
  name: "sitePage",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "pageName", title: "Page", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "blocks", title: "Blocks", type: "array", of: [{ type: "string" }], readOnly: true, hidden: true }),
    defineField({
      name: "hero",
      title: "Top of the page",
      type: "object",
      fields: [
        defineField({ ...stringField("eyebrow", "Small label"), hidden: usesBlock("hero.eyebrow") }),
        titleField(),
        textField("description", "Description", 3),
        defineField({ ...stringField("primaryLabel", "Main button"), hidden: usesBlock("hero.buttons") }),
        defineField({ ...stringField("secondaryLabel", "Second button"), hidden: usesBlock("hero.buttons") }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Headings and texts of this page's sections, from top to bottom.",
      options: { sortable: false },
      of: [
        defineArrayMember({
          type: "object",
          name: "pageSection",
          fields: [
            defineField({ name: "key", type: "string", readOnly: true, hidden: true }),
            defineField({ name: "label", title: "Section", type: "string", readOnly: true }),
            defineField({ name: "fields", type: "array", of: [{ type: "string" }], readOnly: true, hidden: true }),
            defineField({ ...stringField("eyebrow", "Small label"), hidden: usesField("eyebrow") }),
            defineField({ ...titleField(), hidden: usesField("title") }),
            defineField({ ...textField("description", "Text", 3), hidden: usesField("description") }),
            defineField({ ...stringField("buttonLabel", "Button"), hidden: usesField("buttonLabel") }),
            defineField({ ...textField("secondaryLabel", "Second button / second paragraph", 2), hidden: usesField("secondaryLabel") }),
          ],
          preview: { select: { title: "label", subtitle: "title" } },
        }),
      ],
    }),
    defineField({ ...strings("points", "Check-list points"), hidden: usesBlock("points") }),
    defineField({
      name: "stats",
      title: "Numbers",
      type: "array",
      hidden: usesBlock("stats"),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [stringField("value", "Number", "e.g. 500+"), stringField("label", "Label")],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ ...items("cards", "Feature cards (in order)", "Icons stay the same, so keep the same number of cards."), hidden: usesBlock("cards") }),
    defineField({
      name: "packages",
      title: "Plans",
      type: "object",
      hidden: usesBlock("packages"),
      fields: [titleField(), textField("description", "Description", 2), tier("basic", "Basic"), tier("standard", "Standard"), tier("premium", "Premium")],
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "object",
      hidden: usesBlock("process"),
      fields: [titleField(), textField("description", "Description", 2), items("steps", "Steps", "Add, remove or reorder steps.", true)],
    }),
    defineField({
      name: "why",
      title: "Why us",
      type: "object",
      hidden: usesBlock("why"),
      fields: [
        titleField(),
        items("items", "Reasons (in order)", "Icons stay the same, so keep 4 reasons."),
        strings("tools", "Tools"),
        defineField({
          name: "highlight",
          title: "Highlight tile",
          type: "object",
          fields: [stringField("value", "Big value"), stringField("label", "Label"), strings("chips", "Chips")],
        }),
      ],
    }),
    defineField({ ...stringField("reviewsTitle", "Reviews slider title"), hidden: usesBlock("reviews") }),
    defineField({
      name: "cta",
      title: "Video call-to-action",
      type: "object",
      hidden: usesBlock("cta"),
      fields: [stringField("titleLead", "Title – first part"), stringField("titleHighlight", "Title – highlighted part"), textField("description", "Description", 3)],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      hidden: usesBlock("faq"),
      fields: [
        titleField(),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "faq",
              fields: [stringField("q", "Question"), textField("a", "Answer", 4)],
              preview: { select: { title: "q", subtitle: "a" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "pageName" } },
});
