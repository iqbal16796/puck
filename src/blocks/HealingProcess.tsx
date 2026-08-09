"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type HealingProcessProps = {
  title: string;
  phases: {
    title: string;
    description: string;
  }[];
};

export const HealingProcess = ({ title, phases = [] }: HealingProcessProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-32 bg-white w-full overflow-hidden" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-6 relative">
        <RevealText className="mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A4238] text-center">{title}</h2>
        </RevealText>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[#E2E8DE] rounded-full" />
          
          {/* Fill Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[#849271] rounded-full z-0" 
          />

          <div className="flex flex-col gap-24 relative z-10">
            {phases.map((phase, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Text Content */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:text-left md:pr-12" : "md:text-right md:pl-12"}`}>
                    <RevealText delay={0.1}>
                      <span className="eyebrow text-[#849271] block mb-2">Phase 0{idx + 1}</span>
                      <h3 className="text-2xl font-serif text-[#4A4238] mb-4">{phase.title}</h3>
                      <p className="text-[#756a5c] leading-relaxed">
                        {phase.description}
                      </p>
                    </RevealText>
                  </div>

                  {/* Node */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#E2E8DE] shadow-sm flex items-center justify-center shrink-0">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#849271]" 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", delay: 0.3 }}
                    />
                  </div>

                  {/* Empty Spacer for desktop layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
