import React from "react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";
import * as LineIcons from "@/content/lucide";
import { SERVICE_ICONS } from "@/components/serviceIcons";
import { SocialIcon } from "@/components/SocialIcon";
import type { SocialNetwork } from "@/data/company";

/** Small picture of the website's original icon, for the editor list. */
function OriginalIcon({ iconKey }: { iconKey?: string }) {
  if (!iconKey) return null;
  const [kind, id] = iconKey.split(":");
  const style = { width: "70%", height: "70%", margin: "15%" };
  if (kind === "social") return <SocialIcon network={id as SocialNetwork | "whatsapp"} className="" style={style} />;
  const Comp =
    kind === "service"
      ? SERVICE_ICONS[id]
      : ((LineIcons as unknown as Record<string, React.ComponentType<{ style?: React.CSSProperties }>>)[id] ?? null);
  return Comp ? <Comp style={style} /> : null;
}

/** Every icon on the website, each with an optional replacement upload. */
export const iconLibrary = defineType({
  name: "iconLibrary",
  title: "Icons",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "items",
      title: "Icons on the website",
      type: "array",
      description:
        "Click an icon and upload a new one (SVG or PNG with a transparent background works best). It changes everywhere that icon is used. Remove the upload to go back to the original.",
      options: { sortable: false },
      of: [
        defineArrayMember({
          type: "object",
          name: "iconItem",
          fields: [
            defineField({ name: "key", type: "string", readOnly: true, hidden: true }),
            defineField({ name: "name", title: "Icon", type: "string", readOnly: true }),
            defineField({ name: "area", title: "Used on", type: "string", readOnly: true }),
            defineField({
              name: "image",
              title: "New icon",
              type: "image",
              options: { accept: "image/svg+xml,image/png,image/webp" },
              description: "SVG or PNG, square, transparent background.",
            }),
            defineField({
              name: "tint",
              title: "Use the website's colour",
              type: "boolean",
              initialValue: true,
              description:
                "On: the icon is drawn in the same colour the original had at each spot (best for simple one-colour icons). Off: the uploaded colours are shown as they are.",
            }),
          ],
          preview: {
            select: { name: "name", area: "area", image: "image", key: "key" },
            prepare: ({ name, area, image, key }) => ({
              title: name,
              subtitle: `${image?.asset ? "✓ Replaced · " : ""}${area ?? ""}`,
              media: image?.asset ? image : <OriginalIcon iconKey={key} />,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Icons" }) },
});
