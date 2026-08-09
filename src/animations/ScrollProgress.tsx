"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

export const ScrollProgress = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-[100]", className)}
      style={{ scaleX }}
    />
  );
};
