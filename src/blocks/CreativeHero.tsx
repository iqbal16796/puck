"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export type CreativeHeroProps = {
  firstName: string;
  lastName: string;
  role: string;
};

/** Terminal-glitch character set used while a word "resolves" into place. */
const GLYPHS = "#%&_+=<>/\\[]{}*^~?";

/**
 * Scrambles `text` into random glyphs, then progressively resolves it back
 * to the real characters. Runs client-only (gated on `mounted`) so SSR output
 * always matches the final text and there is no hydration mismatch.
 */
function useScramble(text: string, mounted: boolean, reduce: boolean, delay = 0, stepMs = 45) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!mounted || reduce) {
      setDisplay(text);
      return;
    }
    let tick: ReturnType<typeof setInterval> | undefined;
    const totalFrames = Math.max(8, text.replace(/\s/g, "").length * 3);
    const start = setTimeout(() => {
      let frame = 0;
      tick = setInterval(() => {
        frame += 1;
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        setDisplay(
          text
            .split("")
            .map((ch, i) => (ch === " " ? " " : i < revealCount ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join("")
        );
        if (frame >= totalFrames) {
          setDisplay(text);
          if (tick) clearInterval(tick);
        }
      }, stepMs);
    }, delay);
    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, [text, mounted, reduce, delay, stepMs]);

  return display;
}

export const CreativeHero = ({ firstName, lastName, role }: CreativeHeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const scrambledFirst = useScramble(firstName, mounted, !!reduce, 80);
  const scrambledLast = useScramble(lastName, mounted, !!reduce, 360);

  // Parallax scroll for the text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };

  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="grain relative w-full min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden flex flex-col justify-center px-6 md:px-20"
    >
      {/* corner crosshairs — art-director "viewfinder" framing */}
      <span className="pointer-events-none absolute left-6 top-8 text-[#d7ff3f]/60 text-lg leading-none select-none">+</span>
      <span className="pointer-events-none absolute right-6 top-8 text-[#d7ff3f]/60 text-lg leading-none select-none">+</span>
      <span className="pointer-events-none absolute left-6 bottom-8 text-[#d7ff3f]/60 text-lg leading-none select-none">+</span>

      {/* rotated eyebrow badge, deliberately off-grid */}
      <div className="pointer-events-none absolute right-8 top-16 md:right-24 md:top-24 rotate-3">
        <span className="eyebrow text-[#d7ff3f] border border-[#d7ff3f]/40 rounded-full px-4 py-1.5">
          Creative Freelancer
        </span>
      </div>

      <motion.div style={{ x: textX, y: textY }} className="z-10 flex flex-col relative">
        <div className="relative">
          <motion.h1
            style={{ y: y1 }}
            className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-neutral-50"
          >
            {scrambledFirst}
          </motion.h1>
          {/* accent glitch echo — same glyphs, offset, blended */}
          <motion.h1
            aria-hidden
            style={{ y: y1 }}
            animate={
              mounted && !reduce
                ? { x: [0, -4, 3, -2, 0], opacity: [0, 0.5, 0.15, 0.4, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-[#d7ff3f] mix-blend-difference"
          >
            {scrambledFirst}
          </motion.h1>
        </div>

        <motion.h1
          style={{ y: y1, WebkitTextStroke: "2px #d7ff3f", color: "transparent" }}
          className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter ml-auto md:ml-32"
        >
          {scrambledLast}
        </motion.h1>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-6 md:left-20 flex items-center gap-6 z-20"
      >
        <div className="w-3 h-3 bg-[#d7ff3f]" />
        <p className="uppercase tracking-[0.3em] font-semibold text-sm text-neutral-300">
          {role}
        </p>
      </motion.div>

      <div className="pointer-events-none absolute bottom-10 right-6 md:right-20 z-20 [writing-mode:vertical-rl] rotate-180">
        <span className="eyebrow text-neutral-500">Scroll to explore</span>
      </div>
    </section>
  );
};
