"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from "@sanity/ui";
import { apiVersion } from "../env";
import { buildHomePageDoc, buildSiteSettingsDoc } from "./importContent";

type Status = { state: "idle" | "working" | "done" | "error"; message?: string };

/** Studio tool: copies the website's current content into Sanity with one click. */
export function ImportTool() {
  const client = useClient({ apiVersion });
  const [existing, setExisting] = useState<{ siteSettings: boolean; homePage: boolean } | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const check = useCallback(async () => {
    const ids: string[] = await client.fetch(`*[_id in ["siteSettings","homePage","drafts.siteSettings","drafts.homePage"]]._id`);
    setExisting({
      siteSettings: ids.some((id) => id.endsWith("siteSettings")),
      homePage: ids.some((id) => id.endsWith("homePage")),
    });
  }, [client]);

  useEffect(() => {
    check().catch(() => setExisting({ siteSettings: false, homePage: false }));
  }, [check]);

  const runImport = async () => {
    const already = existing && (existing.siteSettings || existing.homePage);
    if (
      already &&
      !window.confirm(
        "Some content already exists in Sanity. Importing will REPLACE it with the website's original content. Continue?"
      )
    ) {
      return;
    }
    setStatus({ state: "working", message: "Importing…" });
    try {
      await client
        .transaction()
        .createOrReplace(buildSiteSettingsDoc())
        .createOrReplace(buildHomePageDoc())
        .delete("drafts.siteSettings")
        .delete("drafts.homePage")
        .commit();
      setStatus({ state: "done", message: "Done! Open “Site Settings” or “Home Page” to start editing." });
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
          Copies everything that is currently on the website (texts, lists, links and the current images/videos) into
          the editor, so you can change it here. You normally only need to do this once.
        </Text>
        <Card padding={4} radius={3} shadow={1} tone={existing && (existing.siteSettings || existing.homePage) ? "caution" : "primary"}>
          <Stack space={3}>
            <Text size={1}>
              Site Settings: <b>{existing ? (existing.siteSettings ? "already has content" : "empty") : "checking…"}</b>
            </Text>
            <Text size={1}>
              Home Page: <b>{existing ? (existing.homePage ? "already has content" : "empty") : "checking…"}</b>
            </Text>
          </Stack>
        </Card>
        <Flex gap={3} align="center">
          <Button
            text={status.state === "working" ? "Importing…" : "Import current website content"}
            tone="primary"
            disabled={status.state === "working" || !existing}
            onClick={runImport}
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
