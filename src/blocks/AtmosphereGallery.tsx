"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type AtmosphereGalleryProps = {
  title: string;
  images: { url: string }[];
};

/** A few slow-rising wisps of steam drifting up over a tile. */
const SteamDrift = () => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-screen" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 h-2/3 w-10 rounded-full bg-white/25 blur-xl"
          style={{ left: `${28 + i * 20}%` }}
          animate={{ y: ["10%", "-90%"], opacity: [0, 0.5, 0], scaleX: [1, 1.6, 2.2] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const GalleryTile = ({ url, aspect, steam }: { url: string; aspect: string; steam?: boolean }) => (
  <div className={`w-full relative overflow-hidden group rounded-sm border border-[#3a0f1c]/60 ${aspect}`}>
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out sepia-[.2] grayscale-[.15] group-hover:scale-[1.08] group-hover:sepia-0 group-hover:grayscale-0"
      style={{ backgroundImage: `url(${url})` }}
    />
    <div className="absolute inset-0 bg-[#150508]/45 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
    {steam && <SteamDrift />}
    <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-amber-400/0 transition-all duration-500 group-hover:ring-amber-400/40" />
  </div>
);

export const AtmosphereGallery = ({ title, images = [] }: AtmosphereGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Split images into two columns
  const midIndex = Math.ceil((images.length || 1) / 2);
  const leftColumn = images.slice(0, midIndex);
  const rightColumn = images.slice(midIndex);

  return (
    <section className="grain py-32 bg-[#150508] w-full overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <RevealText className="text-center mb-24">
          <p className="eyebrow mb-4 text-amber-400">The Ambiance</p>
          <h2 className="font-display text-4xl md:text-5xl text-gradient-cream tracking-wide">
            {title}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8" />
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column (moves up faster) */}
          <motion.div style={{ y: yFast }} className="flex flex-col gap-8 md:gap-16">
            {leftColumn.map((img, index) => (
              <GalleryTile key={index} url={img.url} aspect="aspect-[4/3]" steam={mounted && index === 0} />
            ))}
          </motion.div>

          {/* Right Column (moves down or slower) */}
          <motion.div style={{ y: ySlow }} className="flex flex-col gap-8 md:gap-16 mt-0 md:mt-32">
            {rightColumn.map((img, index) => (
              <GalleryTile key={index} url={img.url} aspect="aspect-[3/4]" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
