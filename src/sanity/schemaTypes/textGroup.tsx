import { defineArrayMember, defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

/** All small texts of one page (buttons, labels, card texts …), each editable. */
export const textGroup = defineType({
  name: "textGroup",
  title: "Website text",
  type: "document",
  icon: TextIcon,
  fields: [
    defineField({ name: "title", title: "Page", type: "string", readOnly: true }),
    defineField({
      name: "items",
      title: "Texts on this page",
      type: "array",
      description:
        "Every button, label and small text of this page. Change the text and press Publish. Tip: in “Visual Editing” you can click a text on the page to jump straight to it.",
      options: { sortable: false },
      of: [
        defineArrayMember({
          type: "object",
          name: "textItem",
          fields: [
            defineField({ name: "key", type: "string", readOnly: true, hidden: true }),
            defineField({ name: "section", title: "Section", type: "string", readOnly: true }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2, description: "Leave empty to show the original text." }),
            defineField({ name: "original", title: "Original text", type: "text", rows: 2, readOnly: true }),
          ],
          preview: {
            select: { text: "text", original: "original", section: "section" },
            prepare: ({ text, original, section }) => {
              const changed = typeof text === "string" && text.trim() !== "" && text !== original;
              return { title: text || original, subtitle: `${changed ? "✓ Changed · " : ""}${section ?? ""}` };
            },
          },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Text – ${title ?? ""}` }) },
});
