"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type WorkProcessProps = {
  title: string;
  steps: { title: string; description: string }[];
};

export const WorkProcess = ({ title, steps = [] }: WorkProcessProps) => {
  return (
    <section className="py-32 bg-neutral-100 w-full text-neutral-950">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-24 border-b-4 border-[#8fb800] inline-block pb-2">
          {title}
        </h2>

        <div className="flex flex-col gap-32">
          {steps.map((step, index) => {
            const num = (index + 1).toString().padStart(2, "0");
            const isOdd = index % 2 === 1;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const ref = useRef<HTMLDivElement>(null);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { scrollYProgress } = useScroll({
              target: ref,
              offset: ["start center", "end center"],
            });

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const fillHeight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

            return (
              <div
                key={index}
                ref={ref}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${isOdd ? "md:ml-24" : ""}`}
              >
                {/* Massive Number */}
                <div className="relative text-[15vw] md:text-[10vw] font-black leading-none tracking-tighter shrink-0 select-none">
                  {/* Outline / Base Number */}
                  <span
                    className="text-transparent absolute inset-0"
                    style={{ WebkitTextStroke: "2px #d4d4d4" }}
                  >
                    {num}
                  </span>

                  {/* Filled Number, clips in from the bottom on scroll, in accent lime */}
                  <motion.div
                    className="overflow-hidden text-[#8fb800] absolute inset-0 bottom-0"
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    style={{ clipPath: useTransform(fillHeight, h => `inset(${h} 0 0 0)`) }}
                  >
                    {num}
                  </motion.div>

                  {/* Invisible spacer to maintain height */}
                  <span className="opacity-0">{num}</span>
                </div>

                {/* Text Content */}
                <div className="pt-4 md:pt-12">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
