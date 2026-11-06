"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from "@sanity/ui";
import { apiVersion } from "../env";
import { buildAllDocs } from "./importContent";

type Status = { state: "idle" | "working" | "done" | "error"; message?: string };

const LABELS: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  servicesCatalog: "Services & Prices",
  mediaLibrary: "Images & Videos",
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
