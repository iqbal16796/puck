"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Puck, resolveAllData, type Data } from "@measured/puck";
import "@measured/puck/puck.css";

// Import our custom Modal and Tour
import { PublishModal } from "@/components/PublishModal";
import { SpotlightTour } from "@/components/SpotlightTour";
import { EditorOnboarding } from "@/components/EditorOnboarding";
import { SeoLintPanel } from "@/components/SeoLintPanel";
import { VersionHistoryPanel } from "@/components/VersionHistoryPanel";
import { PresencePill } from "@/components/PresencePill";
import { getTemplateConfig } from "@/configs";
import { lintPuckData, applyAllLintFixes, type LintIssue } from "@/lib/siteLinter";
import { useCoEditing } from "@/hooks/useCoEditing";

// A brand-new site's initialData is a template's bare defaultData — just
// `{ id }` per block. Two things normally fill that in, both internal to
// the interactive <Puck> editor canvas: a defaultProps merge at render
// time, and each component's own `resolveData` hook (e.g. ProductMenu
// unwraps its Puck-internal `{ value }`-wrapped categories back to plain
// strings). <Render> — used by the preview/public pages and the ZIP
// export — does neither, so it crashes on anything that depended on
// either step. Do both explicitly before this ever gets saved: merge
// defaultProps ourselves (resolveAllData doesn't), then run resolveData
// via Puck's own resolveAllData (which does).
function withDefaultProps(data: Data, config: any): Data {
  const anyData = data as any;
  const content = (anyData.content ?? []).map((item: any) => ({
    ...item,
    props: { ...(config.components?.[item.type]?.defaultProps ?? {}), ...item.props },
  }));
  const root = {
    ...anyData.root,
    props: { ...(config.root?.defaultProps ?? {}), ...anyData.root?.props },
  };
  return { ...anyData, content, root } as Data;
}

export function EditorClient({
  siteId,
  templateId,
  initialData,
}: {
  siteId: string;
  templateId: string;
  initialData: Data;
}) {
  const router = useRouter();
  // Resolved client-side: Config objects carry render functions, which can't
  // cross the server -> client boundary as props.
  const config = getTemplateConfig(templateId, initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We temporarily store the Puck data here when they hit publish
  const [currentPuckData, setCurrentPuckData] = useState<Data | null>(null);

  // Puck manages its `data` prop as uncontrolled initial state, so restoring
  // a past version has to force a remount (bumping puckKey) with the
  // restored data fed in as the new initial state. displayData starts as
  // null and <Puck> doesn't mount until it's resolved (see the effect
  // below) — mounting it with bare initialData even briefly would seed
  // Puck's own internal state with incomplete props, and every autosave
  // after that would keep re-saving that incomplete state right back over
  // a correct first save.
  const [displayData, setDisplayData] = useState<Data | null>(null);
  const [puckKey, setPuckKey] = useState(0);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Single source of truth for "what data do we already know about" — shared
  // by local edits, remote co-editing updates, and version restores, so
  // applying an update that matches what we already have is always a no-op.
  // Without this, a remote update reflected back through Puck's onChange
  // would get re-broadcast and ping-pong between tabs indefinitely.
  const currentDataRef = useRef<string>("");

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { peers, self, broadcastChange } = useCoEditing(siteId, (data) => {
    const serialized = JSON.stringify(data);
    if (serialized === currentDataRef.current) return;
    currentDataRef.current = serialized;
    setDisplayData(data);
    setPuckKey((k) => k + 1);
  });

  const saveDraft = (data: Data) => {
    fetch("/api/save-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteName: siteId, puckData: data, templateId, publish: false }),
    }).catch((err) => console.error("Draft autosave failed:", err));
  };

  // Resolve once on mount, feed the result into <Puck> as its initial state
  // (not just into the DB save), and create the private preview row — "look
  // what I'm building" should work from second one, before any Publish.
  useEffect(() => {
    resolveAllData(withDefaultProps(initialData, config), config).then((resolved) => {
      currentDataRef.current = JSON.stringify(resolved);
      setDisplayData(resolved);
      saveDraft(resolved);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced autosave on every edit. This only ever writes to the draft —
  // is_published is left untouched server-side, so it never goes live here.
  const handlePuckChange = (data: Data) => {
    const serialized = JSON.stringify(data);
    if (serialized === currentDataRef.current) return; // echo from a remote/restore remount
    currentDataRef.current = serialized;

    broadcastChange(data);

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveDraft(data), 1500);
  };

  const [lintIssues, setLintIssues] = useState<LintIssue[]>([]);
  const [isLintOpen, setIsLintOpen] = useState(false);

  // 1. Intercept Puck's Publish action — run the structural linter first
  const handlePuckPublish = (data: Data) => {
    setCurrentPuckData(data);
    const issues = lintPuckData(data);
    if (issues.length > 0) {
      setLintIssues(issues);
      setIsLintOpen(true);
    } else {
      setIsModalOpen(true); // Pop the modal instead of publishing instantly!
    }
  };

  const handleFixAllAndContinue = () => {
    if (currentPuckData) {
      setCurrentPuckData(applyAllLintFixes(currentPuckData, lintIssues));
    }
    setIsLintOpen(false);
    setIsModalOpen(true);
  };

  const handlePublishAnyway = () => {
    setIsLintOpen(false);
    setIsModalOpen(true);
  };

  const handleRestoreVersion = (data: Data) => {
    currentDataRef.current = JSON.stringify(data);
    setDisplayData(data);
    setPuckKey((k) => k + 1);
    saveDraft(data);
    broadcastChange(data);
  };

  // 2. Handle the submission from our glassmorphic Modal
  const handleModalSubmit = async ({ email, siteName }: { email: string; siteName: string }) => {
    try {
      const response = await fetch("/api/save-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          siteName: siteName || siteId,
          puckData: currentPuckData,
          templateId,
          publish: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to save the site.");
        return;
      }

      // SUCCESS! Redirect them to their brand new live website.
      router.push(`/${result.site.site_name}`);

    } catch (err) {
      console.error(err);
      alert("A network error occurred. Please try again.");
    }
  };

  if (!displayData) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-500">
        Loading editor…
      </div>
    );
  }

  return (
    <>
      {/* Welcome modal — shown once per session */}
      <EditorOnboarding />

      {/* Spotlight tour — highlights the three Puck panels */}
      <SpotlightTour />

      {/* Live co-editing presence — anyone with this /editor/[siteId] URL joins the same session */}
      <PresencePill peers={peers} self={self} />

      {/* Private preview link — live from the first autosave, no-index, no publish needed */}
      <a
        href={`/preview/${siteId}`}
        target="_blank"
        rel="noreferrer"
        className="fixed top-3 right-[330px] z-[9998] rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm hover:bg-zinc-800"
      >
        Preview ↗
      </a>

      {/* Version history — scrub back through past saves */}
      <button
        onClick={() => setIsHistoryOpen(true)}
        className="fixed top-3 right-[220px] z-[9998] rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm hover:bg-zinc-800"
      >
        History
      </button>

      {/* The Visual Editor */}
      <Puck
        key={puckKey}
        config={config}
        data={displayData}
        onChange={handlePuckChange}
        onPublish={handlePuckPublish}
      />

      {/* Structural SEO/accessibility linter — shown before publish if issues exist */}
      <SeoLintPanel
        isOpen={isLintOpen}
        issues={lintIssues}
        onFixAll={handleFixAllAndContinue}
        onPublishAnyway={handlePublishAnyway}
        onClose={() => setIsLintOpen(false)}
      />

      {/* Version history time machine */}
      <VersionHistoryPanel
        isOpen={isHistoryOpen}
        siteId={siteId}
        onClose={() => setIsHistoryOpen(false)}
        onRestore={handleRestoreVersion}
      />

      {/* Our Custom Auth/Checkout Gateway */}
      <PublishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        siteId={siteId}
        onPublish={handleModalSubmit}
      />
    </>
  );
}
