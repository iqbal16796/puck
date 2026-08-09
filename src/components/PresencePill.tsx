"use client";
import { useState } from "react";
import type { Peer } from "@/hooks/useCoEditing";

export function PresencePill({ peers, self }: { peers: Peer[]; self: Peer }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="fixed top-3 left-3 z-[9998] flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm">
      <span className="flex items-center -space-x-1.5">
        <span
          title={`${self.name} (you)`}
          className="h-4 w-4 rounded-full border border-zinc-900"
          style={{ backgroundColor: self.color }}
        />
        {peers.map((peer) => (
          <span
            key={peer.id}
            title={peer.name}
            className="h-4 w-4 rounded-full border border-zinc-900"
            style={{ backgroundColor: peer.color }}
          />
        ))}
      </span>
      <span>{peers.length === 0 ? "Just you" : `${peers.length} co-editing`}</span>
      <button onClick={handleCopyLink} className="ml-1 text-zinc-400 hover:text-white">
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
