import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { imageWithFallback, stringField, textField, titleField, urlThumb } from "./shared";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact info", default: true },
    { name: "brands", title: "Client logos" },
    { name: "layout", title: "Header, footer & banner" },
    { name: "brandIcons", title: "Website icon & share image" },
  ],
  fields: [
    defineField({
      name: "company",
      title: "Company details",
      type: "object",
      group: "contact",
      description: "Shown in the footer, contact page and legal pages. Leave a field empty to hide it.",
      fields: [
        stringField("name", "Company name"),
        stringField("email", "Email"),
        stringField("phone", "Phone (as displayed)", "e.g. +880 1752-971287"),
        stringField("whatsapp", "WhatsApp number", "Digits with country code, e.g. 8801752971287"),
        textField("address", "Office address", 2),
        stringField("hours", "Office hours", "e.g. Sat–Thu, 10:00 AM – 7:00 PM"),
        stringField("responseTime", "Response time", "e.g. Usually within 2 hours"),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social media links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "network",
              title: "Network",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Behance", value: "behance" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (r) => r.required(),
            }),
            stringField("label", "Label"),
            defineField({ name: "url", title: "Link", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Client logos",
      type: "array",
      group: "brands",
      description: "Shown in the homepage logo slider and on service/pricing/projects pages. Drag to reorder.",
      of: [
        defineArrayMember({
          type: "object",
          name: "clientLogo",
          fields: [stringField("name", "Brand name"), ...imageWithFallback("image", "Logo")],
          preview: {
            select: { title: "name", media: "image", url: "imageUrl" },
            prepare: ({ title, media, url }) => ({ title, media: media ?? urlThumb(url) }),
          },
        }),
      ],
    }),
    defineField({
      name: "navCtaLabel",
      title: "Header button text",
      type: "string",
      group: "layout",
      description: "The orange button in the top menu, e.g. Let's Talk",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "layout",
      fields: [textField("about", "About text", 3), stringField("consultationLabel", "Consultation button text")],
    }),
    defineField({
      name: "ctaBanner",
      title: "Bottom banner (above footer, every page)",
      type: "object",
      group: "layout",
      fields: [
        stringField("kicker", "Small label (desktop)"),
        titleField("title", "Title (desktop)"),
        stringField("primaryLabel", "Main button (desktop)"),
        stringField("secondaryLabel", "Second button (desktop)"),
        titleField("mobileTitle", "Title (mobile)"),
        textField("mobileText", "Text (mobile)", 2),
        stringField("mobilePrimaryLabel", "Main button (mobile)"),
        stringField("mobileSecondaryLabel", "Second button (mobile)"),
      ],
    }),
    defineField({
      name: "favicon",
      title: "Website icon (browser tab)",
      type: "image",
      group: "brandIcons",
      options: { accept: "image/png,image/svg+xml,image/x-icon,image/vnd.microsoft.icon,image/webp" },
      description: "The small icon in the browser tab and bookmarks. Square PNG or SVG, at least 192×192. Leave empty to keep the current icon.",
    }),
    defineField({
      name: "appleIcon",
      title: "Phone home-screen icon",
      type: "image",
      group: "brandIcons",
      options: { accept: "image/png" },
      description: "Shown when someone adds the site to their phone's home screen. Square PNG, 180×180. Empty → the website icon above is used.",
    }),
    defineField({
      name: "shareImage",
      title: "Share image (Facebook, WhatsApp, LinkedIn, X)",
      type: "image",
      group: "brandIcons",
      options: { hotspot: true },
      description: "The picture shown when a link to the site is shared. 1200×630 works best. Empty → the built-in card with the logo is used.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
