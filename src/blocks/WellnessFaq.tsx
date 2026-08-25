"use client";

import React, { useState } from "react";
import { WellnessReveal } from "./WellnessMotion";

export interface WellnessFaqProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export const WellnessFaq = ({ items }: WellnessFaqProps) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-stone-50 py-32 overflow-hidden border-t border-stone-200/50">
      <div className="mx-auto max-w-4xl px-6">
        <WellnessReveal>
          <div className="text-center mb-24">
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-stone-900 leading-none">
              DETAILS
            </h2>
          </div>
        </WellnessReveal>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const isOtherOpen = openIdx !== null && !isOpen;
            
            return (
              <WellnessReveal key={idx} delay={idx * 50} direction="up">
                <div 
                  className={`group relative rounded-3xl transition-all duration-500 overflow-hidden border border-transparent ${
                    isOpen 
                      ? "bg-stone-100/80 border-stone-200 shadow-sm" 
                      : isOtherOpen 
                        ? "opacity-40 hover:opacity-70 bg-transparent" 
                        : "bg-transparent hover:bg-stone-100/50"
                  }`}
                >
                  {/* Left accent line */}
                  <div 
                    className={`absolute left-0 top-0 w-1 bg-emerald-500 transition-all duration-500 rounded-r-full ${
                      isOpen ? "h-full opacity-100" : "h-0 opacity-0"
                    }`} 
                  />

                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-8 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xl md:text-2xl font-serif text-stone-900 pr-8 transition-colors">
                      {item.question}
                    </span>
                    
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center text-stone-900">
                      <span className={`absolute w-full h-[1.5px] bg-current transition-transform duration-500 ${isOpen ? "rotate-180 bg-emerald-600" : ""}`} />
                      <span className={`absolute w-[1.5px] h-full bg-current transition-transform duration-500 ${isOpen ? "rotate-90 bg-emerald-600 scale-0" : ""}`} />
                    </span>
                  </button>
                  
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ 
                      maxHeight: isOpen ? "400px" : "0", 
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-10px)"
                    }}
                  >
                    <div className="px-8 pb-8 pt-0 text-stone-600 leading-relaxed font-light text-lg">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </WellnessReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
