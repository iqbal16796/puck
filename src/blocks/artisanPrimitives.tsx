"use client";

import React, { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** Soft drifting aurora field used as an atmospheric backdrop. */
export function Auroras({ intensity = 30 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-screen"
      style={{ opacity: intensity / 100 }}
      aria-hidden
    >
      <div className="absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] animate-drift rounded-full bg-amber-500/25 blur-[150px]" />
      <div
        className="absolute -right-1/4 top-1/3 h-[50vw] w-[50vw] animate-drift rounded-full bg-amber-700/30 blur-[150px]"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}

/** Cursor-following spotlight for cards. */
export function useSpotlight(radius = 400, strength = 0.14) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 22 });
  const sy = useSpring(my, { stiffness: 120, damping: 22 });

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${sx}px ${sy}px, color-mix(in oklab, hsl(var(--ember)) ${strength * 100}%, transparent), transparent 45%)`;

  return { onMouseMove, background };
}

export function Spotlight({ background }: { background: ReturnType<typeof useMotionTemplate> }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background }}
    />
  );
}

/** Button that leans toward the cursor. */
export function MagneticButton({
  children,
  as = "button",
  href,
  className = "",
}: {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMouse = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.25,
      y: (e.clientY - (top + height / 2)) * 0.25,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = as === "a" ? motion.a : motion.button;

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 160, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-ember px-10 py-4 text-base font-semibold tracking-wide text-stone-950 shadow-ember ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span className="absolute inset-0 -translate-x-full skew-x-12 bg-amber-50/30 group-hover:animate-sheen" />
    </Comp>
  );
}

/** Headline that assembles letter by letter with 3D flip + blur. */
export function KineticHeadline({
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
      transition: { staggerChildren: reduce ? 0 : 0.035, delayChildren: delay },
    },
  };
  const child = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 90,
      rotateX: reduce ? 0 : 92,
      filter: reduce ? "blur(0px)" : "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 15, stiffness: 90 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000 }}
      className={`flex flex-wrap justify-center gap-x-6 font-display leading-[0.85] ${className}`}
    >
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span key={w} className="flex overflow-hidden pb-3" aria-hidden>
          {word.split("").map((letter, l) => (
            <motion.span
              key={`${w}-${l}`}
              variants={child}
              className="inline-block origin-bottom text-gradient-cream drop-shadow-2xl"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

/** Words that rise into place when scrolled into view. */
export function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
