"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "../animations/Reveal";

export interface LearningProcessProps {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
}

export const LearningProcess = ({ title, steps }: LearningProcessProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  const shouldReduceMotion = useReducedMotion();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          {/* Progress Line */}
          {!shouldReduceMotion && (
            <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100 rounded-full md:left-1/2 md:-ml-[2px]">
              <motion.div 
                className="absolute top-0 w-full bg-blue-600 rounded-full" 
                style={{ height }} 
              />
            </div>
          )}

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Circle */}
                  <div className="absolute left-0 md:left-1/2 md:-ml-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-blue-600 font-bold z-10 shadow-sm transition-colors duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200">
                    0{idx + 1}
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <Reveal direction={isEven ? "left" : "right"}>
                      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-slate-600">{step.description}</p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};