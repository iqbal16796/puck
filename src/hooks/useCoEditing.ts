"use client";
import { useEffect, useRef, useState } from "react";
import type { Data } from "@measured/puck";
import { createClient } from "@/utils/supabase/client";

export type Peer = { id: string; name: string; color: string };

const COLORS = ["#f43f5e", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#06b6d4"];
const ADJECTIVES = ["Swift", "Bright", "Curious", "Bold", "Calm", "Sunny"];
const ANIMALS = ["Fox", "Owl", "Otter", "Wren", "Lynx", "Hare"];

function randomPeer(): Peer {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return {
    id: Math.random().toString(36).slice(2, 10),
    name: `${adjective} ${animal}`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

// Shareable co-editing over a Supabase Realtime channel keyed by siteId —
// the editor URL itself is the invite link, no extra service or account.
// Presence tracks who's connected; broadcast relays Puck data edits so every
// tab sees everyone else's changes within about a second.
export function useCoEditing(siteId: string, onRemoteChange: (data: Data) => void) {
  const [peers, setPeers] = useState<Peer[]>([]);
  // Identity is generated once per mount and never changes, so plain state
  // (not a ref) is safe to read during render.
  const [self] = useState<Peer>(() => randomPeer());
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>["channel"]> | null>(null);
  const onRemoteChangeRef = useRef(onRemoteChange);

  useEffect(() => {
    onRemoteChangeRef.current = onRemoteChange;
  }, [onRemoteChange]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`site-editor:${siteId}`, {
      config: { presence: { key: self.id } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as Record<string, Peer[]>;
        const all = Object.values(state).flat();
        setPeers(all.filter((p) => p.id !== self.id));
      })
      .on("broadcast", { event: "puck-change" }, ({ payload }) => {
        if (!payload || payload.senderId === self.id) return;
        onRemoteChangeRef.current(payload.data as Data);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.track(self);
        }
      });

    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
    };
  }, [siteId, self]);

  const broadcastChange = (data: Data) => {
    channelRef.current?.send({
      type: "broadcast",
      event: "puck-change",
      payload: { senderId: self.id, data },
    });
  };

  return { peers, self, broadcastChange };
}
