"use client";

import React from "react";
import { MagicLayer } from "@/magic/MagicLayer";
import { MagicTheme, MagicIntensity } from "@/magic/types";

const THEME_MAP: Record<string, MagicTheme> = {
  realestate: "luxury",
  hotel: "hotel",
  photography: "photography",
  interior: "interior",
  aiagency: "ai",
  salon: "luxury",
  bakery: "creative",
  plumber: "minimal",
  education: "creative",
  gym: "creative",
  lawyer: "minimal",
  restaurant: "hotel",
  portfolio: "photography",
  clothing: "creative",
  ayurvedic: "hotel",
  craft: "interior",
  wellness: "hotel",
};

const INTENSITY_MAP: Record<string, MagicIntensity> = {
  lawyer: "minimal",
  plumber: "minimal",
  education: "elegant",
  gym: "elegant",
  clothing: "elegant",
  salon: "cinematic",
  bakery: "cinematic",
  restaurant: "cinematic",
  ayurvedic: "cinematic",
  wellness: "cinematic",
  realestate: "cinematic",
  hotel: "cinematic",
  interior: "cinematic",
  craft: "cinematic",
  photography: "immersive",
  portfolio: "immersive",
  aiagency: "immersive",
};

export function MagicSiteRenderer({
  templateId,
  children,
  overrideSettings,
}: {
  templateId: string;
  children: React.ReactNode;
  overrideSettings?: any;
}) {
  const theme = THEME_MAP[templateId] || "minimal";
  const intensity = INTENSITY_MAP[templateId] || "minimal";

  return (
    <MagicLayer
      theme={theme}
      settings={{
        intensity,
        ...overrideSettings,
      }}
    >
      {children}
    </MagicLayer>
  );
}
