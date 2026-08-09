"use client";
import React from "react";
import { motion } from "framer-motion";
import { CrossfadeWords, MonoMagnetic } from "./clothingPrimitives";

export type LookbookHeroProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  backgroundImageUrl: string;
};

export const LookbookHero = ({
  headline,
  subheadline,
  buttonText,
  backgroundImageUrl,
}: LookbookHeroProps) => {
  return (
    <section className="grain relative w-full h-[92vh] min-h-[640px] flex items-end md:items-center justify-center overflow-hidden bg-black">
      {/* Slow Ken Burns background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ opacity: { duration: 1.6, ease: "easeOut" }, scale: { duration: 22, ease: "linear" } }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto flex flex-col items-center pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-10 bg-[#C9BFA6]/60" />
          <p className="eyebrow text-[#E7E0CE]">{subheadline}</p>
          <span className="h-px w-10 bg-[#C9BFA6]/60" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-light mb-12 tracking-tight leading-[0.95]">
          <CrossfadeWords text={headline} delay={0.6} stagger={0.12} />
        </h1>

        <MonoMagnetic
          as="a"
          href="#"
          strength={0.2}
          ariaLabel={buttonText}
          className="relative overflow-hidden border border-white/70 px-10 py-4 uppercase tracking-[0.25em] text-xs font-medium text-white transition-colors duration-700 hover:bg-white hover:text-black"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="inline-block"
          >
            {buttonText}
          </motion.span>
        </MonoMagnetic>
      </div>

      {/* Cinematic scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/60"
      >
        <span className="eyebrow text-white/60">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-white/60 origin-top"
        />
      </motion.div>
    </section>
  );
};
