"use client";
import React, { useEffect } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

export type SuccessStatsProps = {
  stats: { value: number; suffix: string; label: string }[];
};

// Slow, deliberate deceleration — the same curve used across the template.
const EASE = [0.22, 1, 0.36, 1] as const;

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Heavily overdamped — the count rolls up and settles without any overshoot.
  const springValue = useSpring(0, {
    stiffness: 35,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const display = useTransform(springValue, (current) => Math.round(current).toString());

  return <motion.span ref={ref}>{display}</motion.span>;
};

export const SuccessStats = ({ stats = [] }: SuccessStatsProps) => {
  return (
    <section className="py-20 bg-[#0b101c] w-full border-y border-[#b89a5e]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-[#b89a5e]/20 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1, ease: EASE }}
              className="flex flex-col items-center justify-center py-8 md:py-4"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#f3eee3] mb-2 flex items-baseline">
                <AnimatedNumber value={stat.value} />
                <span className="text-[#b89a5e]">{stat.suffix}</span>
              </div>
              <p className="text-slate-400 uppercase tracking-widest font-semibold mt-4 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
