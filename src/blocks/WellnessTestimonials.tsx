"use client";

import React from "react";
import { WellnessReveal } from "./WellnessMotion";

export interface WellnessTestimonialsProps {
  testimonials: {
    quote: string;
    name: string;
    detail: string;
  }[];
}

export const WellnessTestimonials = ({ testimonials }: WellnessTestimonialsProps) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-stone-50 py-32 sm:py-48 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none animate-wellnessBreathe" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-900/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 min-h-[60vh] flex items-center justify-center">
        
        {/* Main large quote */}
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <WellnessReveal direction="up" duration={1000}>
            <div className="font-serif text-[clamp(4rem,8vw,8rem)] text-emerald-900/10 leading-none absolute -top-12 md:-top-20 left-1/2 -translate-x-1/2 select-none">“</div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-stone-900 uppercase relative z-10">
              {testimonials[0].quote}
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center">
              <span className="font-sans text-xs tracking-[0.3em] font-bold text-stone-900 uppercase">
                {testimonials[0].name}
              </span>
              <span className="font-sans text-[10px] tracking-widest text-stone-500 uppercase mt-2">
                {testimonials[0].detail}
              </span>
            </div>
          </WellnessReveal>
        </div>

        {/* Scattered small quotes (only visible on md+) */}
        {testimonials.slice(1).map((t, idx) => {
          // Calculate random-ish but deterministic positions for up to 4 extra quotes
          const positions = [
            { top: "10%", left: "5%", delay: 200, floatDuration: "15s" },
            { bottom: "10%", right: "10%", delay: 400, floatDuration: "18s" },
            { top: "20%", right: "5%", delay: 600, floatDuration: "12s" },
            { bottom: "15%", left: "15%", delay: 800, floatDuration: "20s" },
          ];
          const pos = positions[idx % positions.length];
          
          return (
            <div 
              key={idx}
              className="hidden lg:block absolute z-10 animate-wellnessFloat max-w-[250px]"
              style={{ ...pos, animationDuration: pos.floatDuration }}
            >
              <WellnessReveal delay={pos.delay} direction="none" duration={1200}>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-200/50">
                  <p className="font-serif text-lg leading-tight text-stone-700 italic mb-4">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-stone-900 uppercase">{t.name}</div>
                  </div>
                </div>
              </WellnessReveal>
            </div>
          );
        })}
        
      </div>
    </section>
  );
};
