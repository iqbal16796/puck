"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Data } from "@measured/puck";

type VersionMeta = { id: number; created_at: string };

interface VersionHistoryPanelProps {
  isOpen: boolean;
  siteId: string;
  onClose: () => void;
  onRestore: (data: Data) => void;
}

function relativeTime(iso: string) {
  const diffSec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

export function VersionHistoryPanel({ isOpen, siteId, onClose, onRestore }: VersionHistoryPanelProps) {
  // null = still loading; an array (possibly empty) = loaded.
  const [versions, setVersions] = useState<VersionMeta[] | null>(null);
  const [index, setIndex] = useState(0);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    fetch(`/api/site-versions?siteId=${encodeURIComponent(siteId)}`)
      .then((res) => res.json())
      .then((result) => {
        if (cancelled) return;
        if (result.error) throw new Error(result.error);
        setError(null);
        setVersions(result.versions ?? []);
        setIndex(Math.max(0, (result.versions?.length ?? 1) - 1));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load history");
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, siteId]);

  const loading = isOpen && versions === null && !error;

  const handleRestore = async () => {
    const version = versions?.[index];
    if (!version) return;
    setRestoring(true);
    try {
      const res = await fetch(
        `/api/site-versions?siteId=${encodeURIComponent(siteId)}&versionId=${version.id}`
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to load version");
      onRestore(result.version.puck_data as Data);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to restore version");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg p-8 bg-zinc-900 border shadow-2xl border-zinc-800 rounded-3xl"
          >
            <h2 className="text-xl font-bold text-white">Version history</h2>
            <p className="mt-1 text-sm text-zinc-400">Scrub back through this site&apos;s save history.</p>

            {loading && <p className="mt-6 text-sm text-zinc-500">Loading…</p>}
            {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

            {!loading && !error && versions && versions.length === 0 && (
              <p className="mt-6 text-sm text-zinc-500">No saved versions yet.</p>
            )}

            {!loading && !error && versions && versions.length > 0 && (
              <div className="mt-6">
                <input
                  type="range"
                  min={0}
                  max={versions.length - 1}
                  value={index}
                  onChange={(e) => setIndex(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                  <span>Oldest</span>
                  <span className="text-sm font-medium text-zinc-200">
                    {versions[index] ? relativeTime(versions[index].created_at) : ""}
                  </span>
                  <span>Newest</span>
                </div>

                <button
                  onClick={handleRestore}
                  disabled={restoring}
                  className="mt-6 w-full py-3 text-sm font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-900/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                >
                  {restoring ? "Restoring…" : "Restore this version"}
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
