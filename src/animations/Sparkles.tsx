"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

interface SparkleProps {
  className?: string;
}

export const Sparkles = ({ className }: SparkleProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState<{ id: string; x: string; y: string; scale: number }[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const generateSparkles = () => {
      return Array.from({ length: 6 }).map((_, i) => ({
        id: `sparkle-${i}-${Date.now()}`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
      }));
    };

    setSparkles(generateSparkles());
    
    const interval = setInterval(() => {
      setSparkles(generateSparkles());
    }, 2500);
    
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute h-[3px] w-[3px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, sparkle.scale, 0] }}
          transition={{ duration: 1.5 + Math.random() * 1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};
