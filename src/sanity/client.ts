import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl, isSanityConfigured } from "./env";

// Keys whose values are used for logic (links, ids, colours, media URLs) rather than
// displayed text. They must never carry invisible visual-editing (stega) characters.
const NON_TEXT_KEYS = new Set([
  "_key", "_type", "_id", "id", "key", "slug", "href", "url", "link", "src", "image", "video",
  "poster", "logo", "icon", "iconType", "current", "color", "bgColor", "accent", "network", "email",
  "phone", "whatsapp", "rating", "value", "usd", "bdt", "serviceId", "anchor", "avatarBg", "type", "mediaSrc", "thumbnailSrc",
]);

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl,
    filter: (props) => {
      if (props.sourcePath.some((seg) => seg === "serviceSlugs" || seg === "socials" || seg === "highlights")) return false;
      const last = props.sourcePath.at(-1);
      if (typeof last === "string" && (NON_TEXT_KEYS.has(last) || /(url|href|src|slug|color|id)$/i.test(last))) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});
