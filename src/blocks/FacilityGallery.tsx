"use client";
import React from "react";
import { motion } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type FacilityGalleryProps = {
  title: string;
  subtitle?: string;
  images: { url: string; alt?: string }[];
};

export const FacilityGallery = ({ title, subtitle, images = [] }: FacilityGalleryProps) => {
  // We duplicate the images to create an infinite loop effect
  const marqueeImages = [...images, ...images];

  return (
    <section className="py-24 bg-zinc-950 w-full overflow-hidden">
      <RevealText>
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="eyebrow text-red-500">The Facility</span>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mt-2">
              {title}
            </h2>
            {subtitle && <p className="text-zinc-500 text-sm uppercase tracking-widest mt-2">{subtitle}</p>}
          </div>
          <div
            className="hidden md:block flex-1 h-2 ml-8 skew-x-[30deg]"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, #dc2626 0px, #dc2626 14px, #18181b 14px, #18181b 28px)" }}
          />
        </div>
      </RevealText>

      <div className="relative w-full overflow-hidden h-[300px] md:h-[450px]">
        {/* Left/Right Gradients for smooth fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex w-max h-full gap-4 px-4"
        >
          {marqueeImages.map((image, index) => (
            <div
              key={index}
              className="relative w-[300px] md:w-[450px] h-full overflow-hidden shrink-0 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 saturate-50 group-hover:saturate-100"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
