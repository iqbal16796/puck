"use client";

import React from "react";
import { WellnessReveal } from "./WellnessMotion";

export interface WellnessStatementProps {
  quote: string;
  author: string;
}

export const WellnessStatement = ({
  quote,
  author,
}: WellnessStatementProps) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background gradients that slowly transition */}
      <div className="absolute inset-0 bg-stone-950 animate-wellnessBreathe" style={{ animationDuration: "10s" }}>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-900/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-800/30 to-transparent" />
        
        {/* Moving light */}
        <div 
          className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-wellnessMorph"
          style={{ animationDuration: "25s" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <WellnessReveal direction="up" duration={1200}>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] text-stone-200 uppercase tracking-wide">
            {quote.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
        </WellnessReveal>
        <WellnessReveal delay={400} direction="up">
          <p className="mt-8 font-sans text-xs tracking-[0.4em] text-emerald-400/80 uppercase">
            — {author}
          </p>
        </WellnessReveal>
      </div>
    </section>
  );
};
