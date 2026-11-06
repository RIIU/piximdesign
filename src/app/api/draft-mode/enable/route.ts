import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
import { isSanityConfigured, readToken } from "@/sanity/env";

// Called by the Studio's "Visual Editing" (Presentation) tool to preview unpublished changes.
const handler =
  isSanityConfigured && readToken
    ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) }).GET
    : async () =>
        new Response(
          "Visual editing preview needs SANITY_API_READ_TOKEN in the hosting environment variables.",
          { status: 500 }
        );

export const GET = handler;
