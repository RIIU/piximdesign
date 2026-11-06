import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { urlThumb } from "./shared";

/** Every built-in picture/video on the website, each with an optional replacement upload. */
export const mediaLibrary = defineType({
  name: "mediaLibrary",
  title: "Images & Videos",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "items",
      title: "Images & videos on the website",
      type: "array",
      description:
        "Click any item and upload a new image or video to replace it everywhere on the website. Remove the upload to go back to the original.",
      options: { sortable: false },
      of: [
        defineArrayMember({
          type: "object",
          name: "mediaItem",
          fields: [
            defineField({ name: "name", title: "File", type: "string", readOnly: true }),
            defineField({ name: "area", title: "Used on", type: "string", readOnly: true }),
            defineField({ name: "src", title: "Original file", type: "string", readOnly: true, hidden: true }),
            defineField({ name: "type", type: "string", readOnly: true, hidden: true }),
            defineField({
              name: "image",
              title: "New image",
              type: "image",
              options: { hotspot: true },
              description: "Tip: use a similar size/shape (and WebP or JPG) so the layout and speed stay the same.",
              hidden: ({ parent }) => (parent as { type?: string } | undefined)?.type === "video",
            }),
            defineField({
              name: "file",
              title: "New video",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
              description: "MP4 or WebM. Keep it small (under ~10 MB) for fast loading.",
              hidden: ({ parent }) => (parent as { type?: string } | undefined)?.type !== "video",
            }),
          ],
          preview: {
            select: { name: "name", area: "area", image: "image", src: "src", type: "type", file: "file.asset" },
            prepare: ({ name, area, image, src, type, file }) => {
              const replaced = Boolean(image?.asset || file);
              return {
                title: name,
                subtitle: `${replaced ? "✓ Replaced · " : ""}${type === "video" ? "Video · " : ""}${area ?? ""}`,
                media: image?.asset ? image : type === "video" ? undefined : urlThumb(src),
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Images & Videos" }) },
});
