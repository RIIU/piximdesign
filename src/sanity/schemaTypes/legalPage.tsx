import { defineArrayMember, defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";
import { stringField, textField } from "./shared";

/** Terms & Conditions, Privacy Policy and Refund Policy (IDs: legal-terms, legal-privacy, legal-refund). */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: BookIcon,
  fields: [
    stringField("title", "Page title"),
    textField("intro", "Intro text", 3),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description: "Each section appears in the table of contents. Write like in Word: paragraphs, bullet lists, bold and links.",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            stringField("title", "Section title"),
            defineField({ name: "anchor", title: "Link name", type: "string", hidden: true }),
            defineField({
              name: "body",
              title: "Text",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [{ title: "Bullets", value: "bullet" }],
                  marks: {
                    decorators: [{ title: "Bold", value: "strong" }],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [{ name: "href", type: "string", title: "Link (e.g. /terms, mailto:… or https://…)" }],
                      },
                    ],
                  },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
