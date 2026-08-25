"use client";

import React from "react";
import { WellnessReveal, WellnessAtmosphere, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessCtaProps {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string;
}

export const WellnessCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
}: WellnessCtaProps) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 py-32 sm:py-48 text-center text-stone-100 min-h-[90vh] flex flex-col justify-center animate-wellnessBreathe" style={{ animationDuration: "12s" }}>
      <WellnessAtmosphere className="opacity-70" />
      
      {/* Huge Background Circle Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full overflow-hidden opacity-30 mix-blend-luminosity z-0 pointer-events-none">
        <img 
          src={imageUrl} 
          alt="Wellness" 
          className="h-full w-full object-cover grayscale opacity-50 transition-all duration-[3s]"
        />
        <div className="absolute inset-0 bg-stone-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center">
        <WellnessReveal delay={100} direction="up">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] text-emerald-400 uppercase block mb-12">
            {eyebrow}
          </span>
        </WellnessReveal>

        <WellnessReveal delay={300} direction="up" duration={1200}>
          <h2 className="font-serif text-[clamp(3.5rem,8vw,7rem)] font-light tracking-tight text-white leading-[0.95]">
            {title.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
        </WellnessReveal>

        <WellnessReveal delay={600} direction="up">
          <p className="mx-auto mt-8 max-w-xl text-lg sm:text-xl font-light text-stone-300 leading-relaxed">
            {description}
          </p>
        </WellnessReveal>

        <WellnessReveal delay={900} direction="up" className="mt-20">
          <WellnessMagnetic as="a" href="#join" className="group relative flex h-40 w-40 sm:h-56 sm:w-56 items-center justify-center rounded-full bg-stone-900 border border-stone-700/50 hover:bg-emerald-900/40 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl hover:scale-110 cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <span className="font-sans text-xs tracking-[0.2em] font-semibold text-stone-100 uppercase transition-colors group-hover:text-emerald-300">
                {buttonLabel.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
              </span>
              <span className="text-emerald-400 group-hover:text-emerald-300 transition-transform duration-500 transform group-hover:rotate-45 group-hover:scale-125">
                <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </WellnessMagnetic>
        </WellnessReveal>
      </div>
    </section>
  );
};
