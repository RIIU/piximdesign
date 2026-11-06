"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from "@sanity/ui";
import { apiVersion } from "../env";
import { buildAllDocs, buildLibraryItems } from "./importContent";
import { TEXT_AREAS } from "@/content/textManifest";

type Status = { state: "idle" | "working" | "done" | "error"; message?: string };

const LABELS: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  servicesCatalog: "Services & Prices",
  mediaLibrary: "Images & Videos",
  iconLibrary: "Icons",
  ...Object.fromEntries(TEXT_AREAS.map((a) => [`text-${a.id}`, `Website text: ${a.title}`])),
};
const label = (id: string) =>
  LABELS[id] ??
  (id.startsWith("page-")
    ? `Page: ${id.replace("page-", "")}`
    : id.startsWith("legal-")
      ? `Legal: ${id.replace("legal-", "")}`
      : `Service page: ${id.replace("servicePage-", "")}`);

/** Studio tool: copies the website's built-in content into Sanity. */
export function ImportTool() {
  const client = useClient({ apiVersion });
  const docs = useMemo(() => buildAllDocs(), []);
  const ids = useMemo(() => docs.map((d) => d._id), [docs]);
  const [existing, setExisting] = useState<Set<string> | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const check = useCallback(async () => {
    const found: string[] = await client.fetch(`*[_id in $ids || _id in $drafts]._id`, {
      ids,
      drafts: ids.map((id) => `drafts.${id}`),
    });
    setExisting(new Set(found.map((id) => id.replace(/^drafts\./, ""))));
  }, [client, ids]);

  useEffect(() => {
    check().catch(() => setExisting(new Set()));
  }, [check]);

  const missing = existing ? docs.filter((d) => !existing.has(d._id)) : [];

  // New texts / icons / images added to the code since the lists were imported
  const libraries = useMemo(() => buildLibraryItems(), []);
  const [newItems, setNewItems] = useState<{ docId: string; items: { [k: string]: unknown }[] }[]>([]);
  const checkLibraries = useCallback(async () => {
    const libIds = libraries.map((l) => l._id);
    const found: { _id: string; keys?: (string | null)[]; srcs?: (string | null)[] }[] = await client.fetch(
      `*[_id in $ids]{_id, "keys": items[].key, "srcs": items[].src}`,
      { ids: [...libIds, ...libIds.map((id) => `drafts.${id}`)] }
    );
    const result: { docId: string; items: { [k: string]: unknown }[] }[] = [];
    for (const doc of found) {
      const lib = libraries.find((l) => l._id === doc._id.replace(/^drafts\./, ""));
      if (!lib) continue;
      const have = new Set((lib.idField === "key" ? doc.keys : doc.srcs) ?? []);
      const add = lib.items.filter((item) => !have.has(item[lib.idField] as string));
      if (add.length) result.push({ docId: doc._id, items: add });
    }
    setNewItems(result);
  }, [client, libraries]);

  useEffect(() => {
    const t = setTimeout(() => checkLibraries().catch(() => setNewItems([])), 0);
    return () => clearTimeout(t);
  }, [checkLibraries]);

  const newCount = newItems.filter((n) => !n.docId.startsWith("drafts.")).reduce((sum, n) => sum + n.items.length, 0) ||
    newItems.reduce((sum, n) => sum + n.items.length, 0);

  const addNewItems = async () => {
    if (!newItems.length) return;
    setStatus({ state: "working", message: "Adding new items…" });
    try {
      const tx = client.transaction();
      for (const n of newItems) {
        tx.patch(n.docId, (p) => p.setIfMissing({ items: [] }).insert("after", "items[-1]", n.items));
      }
      await tx.commit();
      setStatus({ state: "done", message: `Done – ${newCount} new item(s) added. Your existing changes were kept.` });
      checkLibraries();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : String(err) });
    }
  };

  const run = async (mode: "missing" | "reset") => {
    if (
      mode === "reset" &&
      !window.confirm("This REPLACES all content in the editor with the website's original content. Your edits will be lost. Continue?")
    ) {
      return;
    }
    const list = mode === "reset" ? docs : missing;
    if (!list.length) return;
    setStatus({ state: "working", message: "Importing…" });
    try {
      const tx = client.transaction();
      for (const doc of list) {
        if (mode === "reset") tx.createOrReplace(doc).delete(`drafts.${doc._id}`);
        else tx.createIfNotExists(doc);
      }
      await tx.commit();
      setStatus({ state: "done", message: `Done – ${list.length} page(s) imported. Open them under “Content” to edit.` });
      check();
      checkLibraries();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : String(err) });
    }
  };

  return (
    <Container width={1} padding={5}>
      <Stack space={5}>
        <Heading size={3}>Import website content</Heading>
        <Text muted>
          Copies the website&apos;s current texts, lists, prices and media into the editor so they can be changed here.
          Existing content is never touched by “Import new pages”.
        </Text>
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            {docs.map((d) => (
              <Text key={d._id} size={1}>
                {label(d._id)}:{" "}
                <b>{existing ? (existing.has(d._id) ? "✓ in editor" : "not imported yet") : "checking…"}</b>
              </Text>
            ))}
          </Stack>
        </Card>
        <Flex gap={3} wrap="wrap" align="center">
          <Button
            text={missing.length ? `Import new pages (${missing.length})` : "Everything is imported"}
            tone="primary"
            disabled={status.state === "working" || !existing || !missing.length}
            onClick={() => run("missing")}
          />
          <Button
            text={newCount ? `Add new texts, icons & images (${newCount})` : "Texts, icons & images are up to date"}
            tone="positive"
            disabled={status.state === "working" || !newCount}
            onClick={addNewItems}
          />
          <Button
            text="Reset everything to the original website content"
            tone="critical"
            mode="ghost"
            disabled={status.state === "working" || !existing}
            onClick={() => run("reset")}
          />
        </Flex>
        {status.message && (
          <Box>
            <Card padding={3} radius={2} tone={status.state === "error" ? "critical" : status.state === "done" ? "positive" : "default"}>
              <Text size={1}>{status.message}</Text>
            </Card>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
