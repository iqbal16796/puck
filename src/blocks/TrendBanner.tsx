"use client";
import React from "react";
import { motion } from "framer-motion";

export type TrendBannerProps = {
  words: { value: string }[];
};

export const TrendBanner = ({ words = [] }: TrendBannerProps) => {
  const marqueeText = words.map(w => w.value).join("   /   ") + "   /   ";
  const repeatedText = Array(10).fill(marqueeText).join("");

  return (
    <section className="relative py-7 bg-black text-white w-full overflow-hidden flex items-center border-y border-white/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 34, repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        <p className="text-sm md:text-base uppercase tracking-[0.3em] font-light text-white/90">
          {repeatedText}
        </p>
      </motion.div>
    </section>
  );
};
