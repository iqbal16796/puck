"use client";
import React from "react";
import { motion } from "framer-motion";

export type ProcessTimelineProps = {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
};

export const ProcessTimeline = ({ title, steps = [] }: ProcessTimelineProps) => {
  return (
    <section className="relative py-32 bg-[#F6F1E7] w-full overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,#6B4A35_0px,#6B4A35_10px,transparent_10px,transparent_18px)] opacity-0 md:opacity-20" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="eyebrow text-[#A6482E] mb-4">Behind the Scenes</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-[#3E2B1E]">
            {title}
          </h2>
        </div>

        {/* Vertical Line — hand-drawn, slightly uneven */}
        <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-48 bottom-0 w-px bg-[#D8C9AE]" />

        <div className="flex flex-col gap-16 md:gap-24 relative">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const tilt = isEven ? -1.2 : 1.2;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:text-left" : "md:text-right"}`}>
                  <motion.div
                    whileHover={{ y: -4, rotate: tilt }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="grain relative border border-[#D8C9AE] bg-[#FBF7EE] p-8 shadow-[0_14px_36px_-18px_rgba(74,46,31,0.3)]"
                  >
                    {/* Number Watermark */}
                    <span
                      className={`absolute top-2 ${isEven ? "right-4" : "left-4"} text-[6rem] font-display leading-none -z-10 select-none text-[#EFE8D8] transition-colors`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-display text-2xl font-medium text-[#3E2B1E] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#5B4A3C] font-serif leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#F6F1E7] bg-gradient-to-br from-[#B5563C] to-[#7C3F2E] shadow-sm flex items-center justify-center shrink-0 z-10" />

                {/* Empty Space for Grid Alignment */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
