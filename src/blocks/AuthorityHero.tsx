"use client";
import React from "react";
import { motion } from "framer-motion";

export type AuthorityHeroProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  imageUrl: string;
};

// A slow, deliberate deceleration curve — no spring, no overshoot.
const EASE = [0.22, 1, 0.36, 1] as const;

export const AuthorityHero = ({ headline, subheadline, buttonText, imageUrl }: AuthorityHeroProps) => {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col md:flex-row bg-[#070a12] grain overflow-hidden">
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 z-10 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#b89a5e]/[0.06] to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-10 bg-[#b89a5e]" />
          <span className="eyebrow text-[#b89a5e]">Corporate &amp; Commercial Law</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-[#f3eee3] leading-[1.08] mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-lg font-serif"
        >
          {subheadline}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: EASE }}
          whileHover={{
            backgroundColor: "#b89a5e",
            color: "#070a12",
            borderColor: "#b89a5e",
            transition: { duration: 0.6, ease: EASE },
          }}
          className="self-start px-10 py-4 bg-transparent border border-[#b89a5e]/60 text-[#f3eee3] font-semibold tracking-[0.2em] uppercase text-sm"
        >
          {buttonText}
        </motion.button>
      </div>

      {/* Right Image Content */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full flex items-center justify-center p-8 md:p-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="relative w-full h-full min-h-[46vh]"
        >
          <div className="absolute inset-0 border border-[#b89a5e]/35" />
          <div
            className="absolute inset-3 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {/* Navy vignette for gravitas rather than a warm overlay */}
          <div className="absolute inset-3 bg-gradient-to-t from-[#070a12]/50 via-transparent to-[#070a12]/10" />

          {/* Engraved corner brackets, like a letterhead seal */}
          <span className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#b89a5e]" />
          <span className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#b89a5e]" />
        </motion.div>
      </div>
    </section>
  );
};
