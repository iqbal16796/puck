"use client";

import React from "react";
import { WellnessReveal, WellnessTextReveal, WellnessMarquee } from "./WellnessMotion";

export interface WellnessIntroProps {
  marqueeText: string;
  headline: string;
  stats: {
    value: string;
    label: string;
  }[];
}

export const WellnessIntro = ({
  marqueeText,
  headline,
  stats,
}: WellnessIntroProps) => {
  return (
    <section className="relative overflow-hidden bg-stone-50 pt-24 pb-32 border-b border-stone-200 z-10">
      
      {/* Huge Marquee Transition */}
      <div className="mb-24 -rotate-2 scale-110 bg-emerald-900 py-6 text-emerald-400">
        <WellnessMarquee text={marqueeText} className="font-serif text-5xl sm:text-6xl uppercase tracking-widest opacity-80" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-32">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-stone-900 leading-[1.1] uppercase">
            <WellnessTextReveal text={headline} delayOffset={100} />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 max-w-5xl mx-auto border-t border-stone-200 pt-16">
          {stats.map((stat, idx) => (
            <WellnessReveal key={idx} delay={200 + idx * 100} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="text-[clamp(3rem,6vw,5rem)] font-light text-stone-900 mb-2 leading-none">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  {stat.label}
                </div>
              </div>
            </WellnessReveal>
          ))}
        </div>
      </div>
      
      {/* Decorative floating text */}
      <div className="pointer-events-none absolute left-[-5%] top-[40%] text-[15vw] font-serif font-black text-stone-200/50 -rotate-90 select-none z-0">
        BREATHE
      </div>
    </section>
  );
};
