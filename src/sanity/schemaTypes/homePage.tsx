import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { SERVICES } from "@/data/agencyData";
import { imageWithFallback, stringField, textField, titleField, urlThumb, videoWithFallback } from "./shared";

const section = (name: string, title: string, fields: ReturnType<typeof defineField>[], description?: string) =>
  defineField({
    name,
    title,
    type: "object",
    group: name,
    description,
    options: { collapsible: false },
    fields,
  });

const heading = [titleField(), textField("description", "Description", 3)];

const AVATAR_COLORS = ["blue", "emerald", "orange", "purple", "rose", "teal", "cyan", "amber"].map((c) => ({
  title: c[0].toUpperCase() + c.slice(1),
  value: `bg-${c}-600`,
}));

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "showcase", title: "2. Showreel" },
    { name: "services", title: "3. Services" },
    { name: "industries", title: "4. Industries" },
    { name: "why", title: "5. Why Pixim" },
    { name: "brandStories", title: "6. Brand Stories" },
    { name: "logoCta", title: "7. Logo CTA" },
    { name: "stats", title: "8. Stats" },
    { name: "recentWork", title: "9. Recent Work" },
    { name: "testimonials", title: "10. Reviews" },
    { name: "consultation", title: "11. Free Consultation" },
    { name: "faq", title: "12. FAQ" },
  ],
  fields: [
    section("hero", "Hero (top of the page)", [
      defineField({ name: "pills", title: "Small tags above the title", type: "array", of: [{ type: "string" }] }),
      titleField(),
      textField("description", "Description", 4),
      stringField("primaryCta", "Main button text"),
      stringField("secondaryCta", "Second button text"),
      stringField("secondaryHref", "Second button link", "e.g. /services"),
      stringField("rating", "Rating", "e.g. 4.9 / 5.0"),
      stringField("reviews", "Reviews text (desktop)", "e.g. (500+ Reviews)"),
      stringField("reviewsShort", "Reviews text (mobile)", "e.g. (500+)"),
      stringField("brands", "Brands text (desktop)"),
      stringField("brandsShort", "Brands text (mobile)"),
      stringField("ownership", "Ownership text (desktop)"),
      stringField("ownershipShort", "Ownership text (mobile)"),
    ]),

    section("showcase", "Showreel video", [
      stringField("badge", "Badge on the video"),
      stringField("title", "Title on the video"),
      stringField("trustedText", "Text above the client logos"),
      ...videoWithFallback("video", "Video"),
      ...imageWithFallback("poster", "Poster image (shown before the video plays)"),
    ], "Client logos are managed in Site Settings → Client logos."),

    section("services", "Services section", [
      ...heading,
      stringField("buttonLabel", "Card button text"),
    ], "The service cards themselves come from the services list."),

    section("industries", "Industries section", [
      ...heading,
      defineField({
        name: "items",
        title: "Industries",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "industry",
            fields: [
              stringField("name", "Name", "e.g. E-commerce & Retail"),
              stringField("shortName", "Short name", "Shown on small tabs, e.g. E-commerce"),
              defineField({
                name: "id",
                title: "ID",
                type: "slug",
                options: { source: (_doc, ctx) => (ctx.parent as { name?: string })?.name ?? "" },
                description: "Click Generate. Used internally.",
              }),
              defineField({
                name: "icon",
                title: "Icon",
                type: "string",
                options: {
                  list: [
                    { title: "Shopping bag (E-commerce)", value: "ecommerce" },
                    { title: "Plate & cutlery (Food)", value: "food" },
                    { title: "Graduation cap (Education)", value: "education" },
                    { title: "Rocket (Tech)", value: "tech" },
                    { title: "Shirt (Fashion)", value: "fashion" },
                    { title: "Building (Real estate)", value: "realestate" },
                  ],
                },
              }),
              stringField("headline", "Headline"),
              textField("challenge", "Challenge", 3),
              defineField({ name: "outcomes", title: "What we deliver", type: "array", of: [{ type: "string" }] }),
              defineField({
                name: "serviceSlugs",
                title: "Recommended services",
                type: "array",
                of: [{ type: "string" }],
                options: { list: SERVICES.map((s) => ({ title: s.title, value: s.id })) },
              }),
            ],
            preview: { select: { title: "name", subtitle: "headline" } },
          }),
        ],
      }),
    ]),

    section("why", "Why Pixim section", heading),
    section("brandStories", "Brand Stories section", heading),

    section("logoCta", "“Ready for a Professional Logo?” section", [
      stringField("titleLead", "Title – first part", "e.g. Ready for a"),
      stringField("titleHighlight", "Title – highlighted part", "e.g. Professional Logo?"),
      textField("description", "Description", 3),
      ...videoWithFallback("video", "Video"),
      ...imageWithFallback("poster", "Poster image"),
    ]),

    section("stats", "Stats section", [
      ...heading,
      textField("quote", "Quote", 2),
      stringField("years", "Years (number)", "e.g. 5 (a + is added automatically)"),
      stringField("yearsLabel", "Years label"),
      stringField("clients", "Clients (number)", "e.g. 200 (a + is added automatically)"),
      stringField("clientsLabel", "Clients label"),
      textField("clientsText", "Clients text", 2),
    ]),

    section("recentWork", "Recent Work slider", [
      ...heading,
      defineField({
        name: "projects",
        title: "Projects",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "project",
            fields: [
              stringField("title", "Title"),
              defineField({
                name: "type",
                title: "Type",
                type: "string",
                options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
                initialValue: "image",
              }),
              ...imageWithFallback("image", "Cover image"),
              ...videoWithFallback("video", "Video (only for Video type)"),
              stringField("category", "Category"),
              stringField("clientLabel", "Client"),
              stringField("subtext", "Sub text"),
              stringField("badgeLabel", "Badge"),
              textField("description", "Description", 3),
            ],
            preview: {
              select: { title: "title", subtitle: "category", media: "image", url: "imageUrl" },
              prepare: ({ title, subtitle, media, url }) => ({ title, subtitle, media: media ?? urlThumb(url) }),
            },
          }),
        ],
      }),
    ]),

    section("testimonials", "Client reviews", [
      ...heading,
      defineField({
        name: "items",
        title: "Reviews",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "review",
            fields: [
              stringField("author", "Name"),
              stringField("role", "Role & company"),
              textField("review", "Review", 4),
              defineField({ name: "rating", title: "Stars", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
              stringField("tag", "Project type"),
              stringField("initials", "Initials", "e.g. NJ"),
              stringField("flag", "Country flag emoji", "e.g. 🇧🇩"),
              defineField({ name: "avatarBg", title: "Avatar colour", type: "string", options: { list: AVATAR_COLORS } }),
            ],
            preview: { select: { title: "author", subtitle: "role" } },
          }),
        ],
      }),
    ]),

    section("consultation", "Free consultation section", [
      ...heading,
      defineField({ name: "points", title: "Check-list points", type: "array", of: [{ type: "string" }] }),
    ]),

    section("faq", "FAQ section", [
      ...heading,
      defineField({
        name: "items",
        title: "Questions",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "faqItem",
            fields: [stringField("question", "Question"), textField("answer", "Answer", 4)],
            preview: { select: { title: "question", subtitle: "answer" } },
          }),
        ],
      }),
      stringField("cardTitle", "Side card title"),
      textField("cardText", "Side card text", 2),
      stringField("cardCta", "Side card button"),
    ]),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
