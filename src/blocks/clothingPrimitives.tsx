"use client";

/**
 * Clothing-only motion primitives.
 *
 * These are deliberately NOT added to artisanPrimitives.tsx: that file's
 * MagneticButton / Spotlight / KineticHeadline bake in the bakery's amber
 * "ember" palette (bg-gradient-ember, text-gradient-cream, hsl(var(--ember)))
 * which would fight this template's stark black/white/ecru identity. This
 * file holds unstyled, color-agnostic equivalents used only by clothing's
 * own blocks — every visible color is supplied by the caller's className.
 */

import React, { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps any element in a subtle cursor-following lean. Unlike
 * artisanPrimitives' MagneticButton, this imposes no background, text
 * color, or shape — the caller's className is the only source of style.
 */
export function MonoMagnetic({
  children,
  as = "button",
  href,
  className = "",
  strength = 0.25,
  ariaLabel,
}: {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  className?: string;
  strength?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMouse = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * strength,
      y: (e.clientY - (top + height / 2)) * strength,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = as === "a" ? motion.a : motion.button;

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.2 }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * Slow, cinematic word-by-word crossfade for editorial headlines.
 * No rotation, no flip, no spring bounce — just a soft rise out of blur,
 * intended to read as "unveiling" rather than "popping in".
 */
export function CrossfadeWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const child = {
    hidden: { opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "blur(0px)" : "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          aria-hidden
          className="mx-[0.3em] inline-block first:ml-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
