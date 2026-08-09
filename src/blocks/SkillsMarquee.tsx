"use client";
import React from "react";
import { motion } from "framer-motion";

export type SkillsMarqueeProps = {
  skills: { value: string }[];
};

export const SkillsMarquee = ({ skills = [] }: SkillsMarqueeProps) => {
  const list = skills.length ? skills : [{ value: "Design" }];
  // duplicate heavily so the loop never shows a seam at any viewport width
  const looped = Array(6).fill(list).flat();

  return (
    <section className="bg-neutral-950 text-white w-full overflow-hidden border-y border-white/10 flex flex-col">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 22, repeat: Infinity }}
        className="flex whitespace-nowrap items-center py-6"
      >
        {looped.map((s, i) => (
          <span key={`a-${i}`} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? "text-4xl md:text-6xl font-black uppercase tracking-tight text-neutral-50 px-6"
                  : "text-4xl md:text-6xl font-black uppercase tracking-tight px-6 text-transparent"
              }
              style={i % 2 === 0 ? undefined : { WebkitTextStroke: "1.5px #d7ff3f" }}
            >
              {s.value}
            </span>
            <span className="text-[#d7ff3f] text-2xl">✦</span>
          </span>
        ))}
      </motion.div>

      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 26, repeat: Infinity }}
        className="flex whitespace-nowrap items-center py-6 border-t border-white/10 opacity-40"
      >
        {looped.map((s, i) => (
          <span key={`b-${i}`} className="flex items-center">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-500 px-5">
              {s.value}
            </span>
            <span className="text-neutral-700 text-lg">/</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};
