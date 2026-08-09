"use client";
import React from "react";
import { motion } from "framer-motion";
import { useClayTilt } from "./craftPrimitives";

export type ArtisanGalleryProps = {
  title: string;
  items: {
    title: string;
    imageUrl: string;
  }[];
};

const GalleryCard = ({ item, index }: { item: { title: string; imageUrl: string }; index: number }) => {
  const tilt = useClayTilt(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className="grain break-inside-avoid group relative mb-6 cursor-pointer overflow-hidden border border-[#D8C9AE] bg-[#FBF7EE] p-3 shadow-[0_10px_30px_-14px_rgba(74,46,31,0.25)] transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-18px_rgba(74,46,31,0.4)]"
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-auto object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.04] group-hover:sepia-[.18]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#A6482E]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#A6482E]/10" />
      </div>
      <div className="flex items-center justify-between pt-4 pb-2 text-left">
        <p className="font-serif italic text-lg text-[#5B4A3C] transition-colors group-hover:text-[#A6482E]">
          {item.title}
        </p>
        <span className="eyebrow text-[#8C7A6B]">0{index + 1}</span>
      </div>
    </motion.div>
  );
};

export const ArtisanGallery = ({ title, items = [] }: ArtisanGalleryProps) => {
  return (
    <section className="relative py-24 bg-[#EFE8D8] w-full border-b border-[#D8C9AE]">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <p className="eyebrow text-[#A6482E] mb-4">Fresh From the Kiln</p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-[#3E2B1E] mb-16 relative inline-block">
          {title}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-gradient-to-r from-[#7C3F2E] to-[#C97B4A]" />
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {items.map((item, index) => (
            <GalleryCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
