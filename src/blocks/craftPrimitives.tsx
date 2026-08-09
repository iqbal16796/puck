"use client";

/**
 * Craft's own small motion/visual toolkit — the handmade counterpart to
 * ../blocks/artisanPrimitives (bakery's reference kit). Where bakery's
 * primitives are crisp and magnetic, these lean intentionally imperfect:
 * loose spring wobbles, hand-tilt instead of a flat cursor spotlight, and
 * clay/walnut tones baked in rather than reusing bakery's amber "--ember"
 * tokens. Kept local to craft so other templates are never affected.
 */

import React, {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Warm terracotta/walnut ambient glow — craft's answer to Auroras. */
export function ClayGlow({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute -left-1/4 -top-1/3 h-[55vw] w-[55vw] animate-drift rounded-full bg-orange-800/15 blur-[130px]" />
      <div
        className="absolute -right-1/4 bottom-0 h-[45vw] w-[45vw] animate-drift rounded-full bg-amber-800/15 blur-[130px]"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}

/**
 * Cursor-reactive tilt — like turning a hand-thrown piece over in your
 * hands, rather than a flat cursor-following spotlight. Loose spring,
 * small max angle, settles imperfectly instead of snapping back square.
 */
export function useClayTilt(maxDeg = 5) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 11 });
  const sry = useSpring(ry, { stiffness: 120, damping: 11 });

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * maxDeg * 2);
    rx.set(-py * maxDeg * 2);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return {
    onMouseMove,
    onMouseLeave,
    style: { rotateX: srx, rotateY: sry, transformPerspective: 900 },
  };
}

/**
 * Button with a loose, hand-set wobble on hover/tap instead of a crisp
 * magnetic snap — a small, bouncy spring rather than a tracked cursor pull.
 */
export function WobbleButton({
  children,
  as = "button",
  href,
  className = "",
  onClick,
  type,
}: {
  children: ReactNode;
  as?: "button" | "a";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = as === "a" ? motion.a : motion.button;

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      href={href}
      type={as === "button" ? type ?? "button" : undefined}
      onClick={onClick}
      whileHover={reduce ? undefined : { rotate: -2.5, scale: 1.04, y: -2 }}
      whileTap={reduce ? undefined : { rotate: 1.5, scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 9 }}
      className={`relative inline-flex items-center justify-center gap-3 ${className}`}
    >
      {children}
    </Comp>
  );
}

/** A slightly-off, hand-set tilt for entrance/hover — never a clean, dead-square scale. */
export const handmadeSpring = { type: "spring" as const, stiffness: 210, damping: 15 };
