import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon, TagsIcon } from "@sanity/icons";
import { SERVICES } from "@/data/agencyData";
import { imageWithFallback, stringField, textField, titleField, videoWithFallback } from "./shared";

const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], description });

const textItems = (name: string, title: string, description: string, withOutput = false) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "object",
        name: "item",
        fields: [
          stringField("title", "Title"),
          textField("desc", "Text", 2),
          ...(withOutput ? [stringField("output", "What you receive")] : []),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }),
    ],
  });

const group = (name: string, title: string, fields: ReturnType<typeof defineField>[], description?: string) =>
  defineField({ name, title, type: "object", group: name, description, fields });

const tier = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [stringField("tagline", "Short line"), strings("features", "What's included")],
  });

/** One document per service landing page (IDs: servicePage-<service id>). */
export const servicePage = defineType({
  name: "servicePage",
  title: "Service page",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "statement", title: "Statement" },
    { name: "bento", title: "Services grid" },
    { name: "showcase", title: "Deliverables" },
    { name: "process", title: "Process" },
    { name: "why", title: "Why us" },
    { name: "packages", title: "Packages" },
    { name: "faq", title: "FAQ & reviews" },
    { name: "cta", title: "Video CTA" },
  ],
  fields: [
    defineField({
      name: "serviceId",
      title: "Service",
      type: "string",
      readOnly: true,
      options: { list: SERVICES.map((s) => ({ title: s.title, value: s.id })) },
      hidden: true,
    }),
    group("hero", "Hero (top of the page)", [
      stringField("eyebrow", "Small label"),
      titleField(),
      textField("description", "Description", 3),
      stringField("primaryCta", "Button text"),
    ]),
    group("statement", "Big statement", [
      stringField("eyebrow", "Small label"),
      textField("text", "Statement text", 3),
      strings("highlights", "Words shown in orange", "Type the exact words (with punctuation) from the statement text."),
      textItems("pillars", "Three points under the statement", "Usually 3 items."),
    ]),
    group("bento", "Services grid", [
      stringField("eyebrow", "Small label"),
      titleField(),
      textField("description", "Description", 2),
      textItems("tiles", "Tiles (in order)", "Edit the text of the 6 tiles. The pictures stay the same, so keep 6 items in this order."),
    ]),
    group("showcase", "Deliverables showcase", [
      stringField("eyebrow", "Small label"),
      titleField(),
      textField("description", "Description", 2),
      stringField("ctaLabel", "Button text"),
      textItems("panels", "Panels (in order)", "Edit the text of each panel. The pictures stay the same, so keep the same number of items."),
    ]),
    group("process", "Process", [
      titleField(),
      textField("description", "Description", 2),
      textItems("steps", "Steps", "Add, remove or reorder steps.", true),
    ]),
    group("why", "Why us", [
      titleField(),
      textItems("items", "Reasons (in order)", "Edit the text of the 4 reasons. Icons stay the same."),
      strings("tools", "Tools we use"),
      defineField({
        name: "highlight",
        title: "Highlight tile",
        type: "object",
        fields: [stringField("value", "Big value", "e.g. 100%"), stringField("label", "Label"), strings("chips", "Small chips")],
      }),
    ]),
    group(
      "packages",
      "Packages",
      [titleField(), textField("description", "Description", 2), tier("basic", "Basic"), tier("standard", "Standard"), tier("premium", "Premium")],
      "Prices are edited in “Services & Prices” so they stay the same on every page."
    ),
    group("faq", "FAQ & reviews", [
      stringField("reviewsTitle", "Reviews slider title"),
      titleField("faqTitle", "FAQ title"),
      defineField({
        name: "faqs",
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
    ]),
    group("cta", "Video call-to-action", [
      stringField("titleLead", "Title – first part"),
      stringField("titleHighlight", "Title – highlighted part"),
      textField("description", "Description", 3),
      ...videoWithFallback("video", "Video"),
      ...imageWithFallback("poster", "Poster image"),
    ]),
  ],
  preview: {
    select: { id: "serviceId" },
    prepare: ({ id }) => ({ title: SERVICES.find((s) => s.id === id)?.title ?? "Service page" }),
  },
});

const priceTier = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { columns: 1 },
    fields: [
      stringField("usd", "Price in USD", "e.g. $75 - $120 (add /mo for monthly)"),
      stringField("bdt", "Price in BDT", "e.g. ৳9,000 - ৳15,000"),
      stringField("desc", "Short description"),
    ],
  });

/** The 7 services: names, taglines, feature tags and package prices (used on every page). */
export const servicesCatalog = defineType({
  name: "servicesCatalog",
  title: "Services & Prices",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      description: "These 7 services appear in the menu, homepage, services, pricing and about pages. Their order and page addresses are fixed.",
      validation: (r) => r.max(SERVICES.length),
      of: [
        defineArrayMember({
          type: "object",
          name: "catalogService",
          fields: [
            defineField({
              name: "serviceId",
              title: "Service",
              type: "string",
              readOnly: true,
              options: { list: SERVICES.map((s) => ({ title: s.title, value: s.id })) },
            }),
            stringField("title", "Name"),
            textField("tagline", "Tagline", 2),
            stringField("badge", "Badge"),
            strings("features", "Feature tags"),
            priceTier("basic", "Basic package"),
            priceTier("standard", "Standard package"),
            priceTier("premium", "Premium package"),
          ],
          preview: {
            select: { title: "title", price: "basic.bdt" },
            prepare: ({ title, price }) => ({ title, subtitle: price ? `From ${price}` : undefined }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Services & Prices" }) },
});
