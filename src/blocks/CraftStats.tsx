"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export type CraftStatsProps = {
  stats: {
    label: string;
    value: number;
    suffix: string;
  }[];
};

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(easeOut * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="font-display bg-gradient-to-br from-[#7C3F2E] via-[#B5563C] to-[#C97B4A] bg-clip-text text-5xl font-medium tracking-tight text-transparent md:text-7xl mb-4"
    >
      {count}
      {suffix}
    </div>
  );
};

export const CraftStats = ({ stats = [] }: CraftStatsProps) => {
  return (
    <section className="grain relative py-24 bg-[#EFE8D8] w-full border-b border-[#D8C9AE]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center divide-y md:divide-y-0 md:divide-x divide-[#D8C9AE]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="pt-12 md:pt-0 flex flex-col items-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="eyebrow text-[#8C7A6B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
