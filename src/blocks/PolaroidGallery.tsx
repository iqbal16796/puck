"use client";
import React from "react";
import { motion } from "framer-motion";

export type PolaroidGalleryProps = {
  title: string;
  images: { url: string; caption: string }[];
};

export const PolaroidGallery = ({ title, images = [] }: PolaroidGalleryProps) => {
  // Give some random-ish rotation between -8 and 8 degrees based on index,
  // like pins on a studio corkboard rather than a perfectly aligned grid.
  const getRotation = (idx: number) => {
    const rots = [-6, 4, -3, 7, -5, 3, -7, 5];
    return rots[idx % rots.length];
  };

  return (
    <section className="py-24 bg-[#EFE8D8] w-full border-b-[8px] border-[#6B4A35]">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <p className="eyebrow text-[#A6482E] mb-4">Pinned to the Board</p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-[#3E2B1E] mb-24 relative inline-block">
          {title}
        </h2>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {images.map((img, idx) => {
            const rot = getRotation(idx);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotate: rot }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.08,
                  rotate: rot * 0.25,
                  y: -10,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 240, damping: 12 },
                }}
                className="grain relative bg-[#FBF7EE] p-4 pb-12 shadow-[0_10px_28px_-14px_rgba(74,46,31,0.35)] hover:shadow-[0_28px_50px_-18px_rgba(74,46,31,0.45)] cursor-pointer"
                style={{ width: "280px" }}
              >
                {/* Pushpin */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-[#C97B4A] to-[#7C3F2E] shadow-[0_3px_6px_rgba(0,0,0,0.35)] z-20" />

                <div className="w-full h-[280px] bg-zinc-200 overflow-hidden relative">
                  {/* Warm vintage overlay */}
                  <div className="absolute inset-0 bg-[#7C3F2E]/15 mix-blend-multiply z-10 pointer-events-none" />
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover grayscale-[15%] sepia-[25%]"
                  />
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <p className="font-signature text-xl text-[#5B4A3C]">{img.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
