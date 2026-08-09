"use client";
import React from "react";
import { motion } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type GalleryGridProps = {
  sectionTitle: string;
  items: { imageUrl: string; caption: string }[];
};

export const GalleryGrid = ({ sectionTitle, items }: GalleryGridProps) => {
  return (
    <section className="grain w-full bg-[#170b13] py-24 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <RevealText className="flex flex-col items-center gap-4">
          <span className="eyebrow text-[#e8d0a0]">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display italic tracking-tight text-center text-rose-50">
            {sectionTitle}
          </h2>
        </RevealText>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          {items && items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer border border-[#e8d0a0]/10"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />

              {/* Mirror-sheen light sweeping across the frame */}
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sheen z-10" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#170b13] via-[#170b13]/40 to-transparent opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-end p-8">
                <h3 className="text-2xl font-display italic text-rose-50 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.caption}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
