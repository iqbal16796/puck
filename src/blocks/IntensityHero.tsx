"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowDown } from "lucide-react";
import { RevealText } from "./artisanPrimitives";

export type IntensityHeroProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  backgroundImageUrl: string;
};

// Words slam into place with a bounced, overshooting spring — a "barbell drop"
// impact instead of a gentle fade.
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const word = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 90,
    scale: 0.55,
    rotate: i % 2 === 0 ? -9 : 9,
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, damping: 9, stiffness: 190, mass: 0.9 },
  },
};

export const IntensityHero = ({ headline, subheadline, buttonText, backgroundImageUrl }: IntensityHeroProps) => {
  const words = (headline || "").split(" ");

  return (
    <section className="grain relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Ken-burns background photo, desaturated and dialed to near-monochrome */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center saturate-0 contrast-125 opacity-35"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.28 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/25 via-zinc-950/92 to-zinc-950 z-0" />

      {/* Ambient red/lime glow blobs for depth */}
      <div className="pointer-events-none absolute -left-1/3 -top-1/4 z-0 h-[55vw] w-[55vw] rounded-full bg-red-600/20 blur-[150px] mix-blend-screen" aria-hidden />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 z-0 h-[45vw] w-[45vw] rounded-full bg-lime-400/10 blur-[150px] mix-blend-screen" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="eyebrow text-red-500 mb-6 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-red-500/60" />
          No Pain. No Excuses.
          <span className="h-px w-10 bg-red-500/60" />
        </motion.div>

        <div className="relative">
          {/* Impact flash behind the headline as it lands */}
          <motion.div
            initial={{ opacity: 0.7, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-red-500/40 blur-3xl"
            aria-hidden
          />
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85] flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8"
          >
            {words.map((w, i) => (
              <motion.span
                variants={word}
                custom={i}
                key={i}
                className={i % 2 !== 0 ? "bg-gradient-to-r from-red-600 via-red-500 to-red-300 bg-clip-text text-transparent" : ""}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <RevealText delay={0.9}>
          <p className="text-xl md:text-3xl text-zinc-400 font-bold uppercase tracking-widest max-w-2xl mb-12">
            {subheadline}
          </p>
        </RevealText>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.button
            animate={{
              scale: [1, 1.05, 1, 1.03, 1],
              boxShadow: [
                "0 0 0px rgba(220,38,38,0)",
                "0 0 44px rgba(220,38,38,0.55)",
                "0 0 12px rgba(220,38,38,0.25)",
                "0 0 32px rgba(220,38,38,0.45)",
                "0 0 0px rgba(220,38,38,0)",
              ],
            }}
            transition={{ duration: 1.7, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, skewX: -6 }}
            whileTap={{ scale: 0.94 }}
            className="group relative px-10 py-5 bg-red-600 text-white font-black text-2xl uppercase italic tracking-widest overflow-hidden"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-15" />
            <span className="relative flex items-center gap-3">
              {buttonText} <ChevronRight className="group-hover:translate-x-2 transition-transform" strokeWidth={4} />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="eyebrow text-zinc-500">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>

      {/* Hazard-tape footer band */}
      <div
        className="absolute -bottom-8 left-0 w-full h-14 rotate-1 z-20"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #dc2626 0px, #dc2626 40px, #09090b 40px, #09090b 80px)" }}
      />
      <div className="absolute -bottom-11 left-0 w-full h-14 bg-zinc-900 -rotate-2 z-10" />
    </section>
  );
};
