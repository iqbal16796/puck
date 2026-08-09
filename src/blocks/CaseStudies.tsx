"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CaseStudiesProps = {
  title: string;
  cases: { title: string; category: string; description: string; outcome: string; duration: string }[];
};

// Slow, deliberate deceleration — the same curve used across the template.
const EASE = [0.22, 1, 0.36, 1] as const;

const docket = (n: number) => `No. ${String(n + 1).padStart(2, "0")}`;

export const CaseStudies = ({ title, cases = [] }: CaseStudiesProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 bg-[#f5f1e8] grain w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="h-px w-16 bg-[#8a6d3f] mx-auto mb-6 block" />
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#0b101c]">{title}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Tabs */}
          <div className="w-full md:w-1/3 flex flex-col gap-2 border-l border-[#0b101c]/10">
            {cases.map((study, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-left px-6 py-4 relative transition-colors duration-500 ${isActive ? "text-[#0b101c]" : "text-slate-400 hover:text-slate-500"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#8a6d3f]"
                    />
                  )}
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8a6d3f] mb-1">
                    {docket(index)} &middot; {study.category}
                  </p>
                  <h3 className="font-serif font-bold text-lg">{study.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 bg-white p-8 md:p-12 relative overflow-hidden border border-[#0b101c]/5">
            <AnimatePresence mode="wait">
              {cases.length > 0 && cases[activeTab] && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative z-10 flex flex-col h-full justify-between"
                >
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-[#0b101c] mb-6">
                      {cases[activeTab].title}
                    </h3>
                    <p className="text-slate-600 font-serif leading-relaxed mb-10 text-lg">
                      {cases[activeTab].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#0b101c]/10">
                    <div>
                      <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold mb-2">Outcome</p>
                      <p className="text-3xl font-bold font-serif bg-gradient-to-r from-[#8a6d3f] to-[#c9b47e] bg-clip-text text-transparent">
                        {cases[activeTab].outcome}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold mb-2">Duration</p>
                      <p className="text-2xl font-bold font-serif text-[#0b101c]">{cases[activeTab].duration}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Watermark docket numeral, in place of a soft decorative glow */}
            <span
              aria-hidden
              className="absolute -top-6 right-4 text-[10rem] font-serif font-bold text-[#0b101c]/[0.03] pointer-events-none select-none leading-none"
            >
              {docket(activeTab)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
