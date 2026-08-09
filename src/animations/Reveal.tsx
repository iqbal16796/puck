"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
}: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    const directionMap = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: 40 },
      right: { x: -40 },
    };

    return {
      hidden: { opacity: 0, ...directionMap[direction] },
      visible: { opacity: 1, y: 0, x: 0 },
    };
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
