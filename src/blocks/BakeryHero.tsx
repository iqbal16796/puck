"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Auroras, KineticHeadline, MagneticButton } from "./artisanPrimitives";

export type BakeryHeroProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  backgroundImageUrl: string;
  backgroundVideo?: string;
};

export const BakeryHero = ({
  headline,
  subheadline,
  buttonText,
  backgroundImageUrl,
  backgroundVideo,
}: BakeryHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const spotlight = useMotionTemplate`radial-gradient(circle 760px at ${sx}px ${sy}px, color-mix(in oklab, hsl(var(--ember)) 18%, transparent), transparent 78%)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, { damping: 22, stiffness: 110 });

  const yBg = useTransform(p, [0, 1], ["0%", "28%"]);
  const scaleBg = useTransform(p, [0, 1], [1, 1.15]);
  const opacityText = useTransform(p, [0, 0.55], [1, 0]);
  const yText = useTransform(p, [0, 1], ["0%", "45%"]);
  const blurText = useTransform(p, [0, 0.6], ["blur(0px)", "blur(14px)"]);

  return (
    <section
      ref={containerRef}
      className="grain relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-stone-950"
    >
      {backgroundVideo ? (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ y: yBg, scale: scaleBg }}
          src={backgroundVideo}
        />
      ) : backgroundImageUrl ? (
        <motion.div className="absolute inset-0 z-0" style={{ y: yBg, scale: scaleBg }}>
          <Image
            src={backgroundImageUrl}
            alt="Freshly baked artisan sourdough resting in warm light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : null}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-stone-950/50 via-stone-950/65 to-stone-950" />

      <Auroras intensity={28} />

      {mounted && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-overlay"
          style={{ background: spotlight }}
        />
      )}

      <motion.div
        style={{ opacity: opacityText, y: yText, filter: blurText }}
        className="relative z-20 mt-14 flex max-w-6xl flex-col items-center gap-8 px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="eyebrow text-amber-500 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-amber-500/50" />
          Fresh From the Hearth
          <span className="h-px w-12 bg-amber-500/50" />
        </motion.div>

        <KineticHeadline
          text={headline}
          className="text-6xl font-medium text-amber-50 md:text-8xl lg:text-[9.5rem]"
        />

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl"
        >
          <p className="text-lg font-light leading-relaxed tracking-wide text-amber-100/80 md:text-2xl">
            {subheadline}
          </p>
          <div className="absolute -inset-6 -z-10 rounded-full bg-amber-700/10 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-8"
        >
          <MagneticButton as="a" href="#menu">
            {buttonText}
            <ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: opacityText }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-amber-100/60"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
          Scroll to taste
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-amber-500/70 to-transparent"
        />
      </motion.div>
    </section>
  );
};
