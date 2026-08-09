"use client";

/**
 * Salon-only visual primitives.
 *
 * These mirror the *shape* of the shared `artisanPrimitives.tsx` helpers
 * (ambient backdrop, cursor spotlight, hero button, kinetic headline) but are
 * deliberately NOT imported from there, because those versions bake in
 * bakery's amber/ember palette (hsl(var(--ember)), .bg-gradient-ember,
 * .text-gradient-cream, etc). This file exists so salon gets the same
 * quality of motion without tinting anything amber, and without touching the
 * shared file other templates depend on.
 *
 * Visual identity: "vanity mirror" beauty editorial — deep aubergine/plum,
 * blush rose, warm champagne. The signature interaction is a soft diagonal
 * "mirror-sheen" light sweep (a compact mirror catching light) rather than
 * bakery's magnetic pull.
 */

import React, { type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** Soft drifting blush/plum blur field used as an atmospheric backdrop. */
export function SalonAuroras({ intensity = 30 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen"
      style={{ opacity: intensity / 100 }}
      aria-hidden
    >
      <div className="absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] animate-drift rounded-full bg-rose-500/25 blur-[150px]" />
      <div
        className="absolute -right-1/4 top-1/3 h-[50vw] w-[50vw] animate-drift rounded-full bg-[#6b2450]/35 blur-[150px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute left-1/3 bottom-0 h-[40vw] w-[40vw] animate-drift rounded-full bg-[#e8d0a0]/10 blur-[130px]"
        style={{ animationDelay: "-13s" }}
      />
    </div>
  );
}

/** Cursor-following champagne glow for cards — the "vanity mirror" light. */
export function useMirrorSpotlight(radius = 380, strength = 0.16) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 22 });
  const sy = useSpring(my, { stiffness: 120, damping: 22 });

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${sx}px ${sy}px, color-mix(in oklab, #e8d0a0 ${strength * 100}%, transparent), transparent 45%)`;

  return { onMouseMove, background };
}

export function MirrorSpotlight({ background }: { background: ReturnType<typeof useMotionTemplate> }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background }}
    />
  );
}

/** Pill button with a diagonal champagne light-sweep on hover — a compact
 *  mirror catching light, rather than a magnetic pull. */
export function MirrorSheenButton({
  children,
  as = "button",
  href,
  variant = "solid",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
  className?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = as === "a" ? motion.a : motion.button;

  const solid =
    "bg-gradient-to-r from-rose-600 via-[#8a2e5c] to-[#5b1f45] text-rose-50 shadow-[0_20px_60px_-20px_rgba(139,26,84,0.65)]";
  const ghost =
    "bg-white/5 border border-[#e8d0a0]/30 text-[#f3e6c8] backdrop-blur-md";
  const sizing = size === "sm" ? "px-6 py-2.5 text-sm" : "px-9 py-4 text-base";

  return (
    <Comp
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium tracking-wide transition-colors ${sizing} ${variant === "solid" ? solid : ghost} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-[#f6e9d2]/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sheen" />
    </Comp>
  );
}

/** A slim arc of pulsing "vanity bulbs" — the mirror-light motif used to
 *  frame headlines and section eyebrows. */
export function VanityLights({ count = 7, className = "" }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full bg-[#f6e9d2] shadow-[0_0_10px_2px_rgba(246,233,210,0.7)] ${reduce ? "" : "animate-twinkle"}`}
          style={reduce ? undefined : { animationDelay: `${(i % 5) * 0.6}s` }}
        />
      ))}
    </div>
  );
}

/** Headline that assembles letter by letter with a soft blur-rise, dressed
 *  in the salon's blush/champagne gradient rather than bakery's cream. */
export function SalonKineticHeadline({
  text,
  className = "",
  delay = 0.2,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.03, delayChildren: delay },
    },
  };
  const child = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 40,
      filter: reduce ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 18, stiffness: 100 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center gap-x-4 font-display leading-[0.95] ${className}`}
    >
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span key={w} className="flex overflow-hidden pb-2" aria-hidden>
          {word.split("").map((letter, l) => (
            <motion.span
              key={`${w}-${l}`}
              variants={child}
              className="inline-block origin-bottom bg-gradient-to-b from-rose-100 via-[#f3ddb2] to-rose-300 bg-clip-text text-transparent"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
