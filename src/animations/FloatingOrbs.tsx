"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

export const FloatingOrbs = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <>
        <div className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </>
    );
  }

  return (
    <>
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[120px]"
      />
    </>
  );
};
