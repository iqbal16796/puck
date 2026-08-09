"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Plumber-only motion/visual helpers.
 *
 * These are deliberately NOT shared with artisanPrimitives.tsx: that file's
 * MagneticButton/KineticHeadline/Auroras/useSpotlight hardcode bakery's
 * amber/cream palette (see --ember tokens in globals.css), and its whole
 * feel is soft/dreamy. Plumber's brief is the opposite — steel-blue/navy +
 * safety-orange, sharp and confident, not soft. So these primitives are
 * built fresh, colored entirely via the classNames passed in by callers.
 */

/** Thin diagonal hazard/caution stripe — a recurring "trades" motif used as a divider. */
export function CautionStripe({ className = "h-1.5" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`w-full bg-[repeating-linear-gradient(45deg,#f97316_0px,#f97316_14px,#0f172a_14px,#0f172a_28px)] ${className}`}
    />
  );
}

/** Small solid dot with an expanding radar/sonar ring — reads as "live / dispatch active". */
export function PulseBeacon({
  dotClassName = "bg-orange-500",
  ringClassName = "bg-orange-500/70",
  size = 8,
}: {
  dotClassName?: string;
  ringClassName?: string;
  size?: number;
}) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }} aria-hidden>
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${ringClassName}`} />
      <span className={`relative inline-flex rounded-full ${dotClassName}`} style={{ width: size, height: size }} />
    </span>
  );
}

/**
 * Headline reveal: each word slides up from behind a hard mask, like a
 * shutter/panel opening — crisp and mechanical rather than a soft blur-in.
 */
export function WordWipe({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <h1 className={`flex flex-wrap ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.3em] overflow-hidden pb-2 inline-block" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0 } : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Fast, no-blur fade+rise for scroll-triggered content. Snappier than a dreamy blur-reveal. */
export function CrispIn({
  children,
  className = "",
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
