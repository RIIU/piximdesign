import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken } from "./env";

// Sanity Live: published changes are pushed to the site in real time (no rebuild needed).
// The token is optional; it only enables draft previews inside the Studio's Presentation tool.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: readToken || false,
  // Safety net: even if a live event is missed (e.g. nobody had the site open when
  // content was published), pages refresh from Sanity at most 60 seconds later.
  fetchOptions: { revalidate: 60 },
});
