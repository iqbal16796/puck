"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { LintIssue } from "@/lib/siteLinter";

interface SeoLintPanelProps {
  isOpen: boolean;
  issues: LintIssue[];
  onFixAll: () => void;
  onPublishAnyway: () => void;
  onClose: () => void;
}

const RULE_LABEL: Record<LintIssue["rule"], string> = {
  "missing-alt": "Missing alt text",
  "empty-text-field": "Empty heading",
  "hero-no-text": "Empty hero",
};

export function SeoLintPanel({ isOpen, issues, onFixAll, onPublishAnyway, onClose }: SeoLintPanelProps) {
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
            <h2 className="text-xl font-bold text-white">
              {issues.length} accessibility/SEO issue{issues.length === 1 ? "" : "s"} found
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Structural checks on your site&apos;s content — no crawler, just rules.
            </p>

            <ul className="mt-5 max-h-64 space-y-2 overflow-y-auto pr-1">
              {issues.map((issue) => (
                <li
                  key={issue.id}
                  className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3"
                >
                  <span className="mt-0.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                    {RULE_LABEL[issue.rule]}
                  </span>
                  <span className="text-sm text-zinc-300">{issue.message}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={onFixAll}
                className="w-full py-3 text-sm font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-900/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                Fix all & continue
              </button>
              <button
                onClick={onPublishAnyway}
                className="w-full py-3 text-sm font-medium text-zinc-300 transition-colors rounded-xl border border-zinc-800 hover:bg-zinc-800"
              >
                Publish without fixing
              </button>
            </div>

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
