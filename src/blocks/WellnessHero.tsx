"use client";

import React, { useState, useEffect } from "react";
import { WellnessReveal, WellnessAtmosphere, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessHeroProps {
  eyebrow: string;
  headline: string;
  accentWord: string;
  description: string;
  primaryCta: string;
  imageUrl: string;
}

export const WellnessHero = ({
  eyebrow,
  headline,
  accentWord,
  description,
  primaryCta,
  imageUrl,
}: WellnessHeroProps) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (window.matchMedia("(hover: none)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setParallax({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out z-0"
        style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
      >
        <img 
          src={imageUrl} 
          alt="Wellness Hero" 
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/20" />
      </div>

      {/* Liquid Orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] max-h-[800px] max-w-[800px] animate-wellnessMorph opacity-40 mix-blend-screen blur-3xl z-0"
           style={{ background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.4), rgba(4, 120, 87, 0.1))" }}
      />
      
      <WellnessAtmosphere className="opacity-60" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 flex flex-col justify-center h-full pt-20">
        <div className="max-w-4xl">
          <WellnessReveal delay={100} direction="up">
            <span className="font-sans text-xs tracking-[0.3em] font-semibold text-emerald-400 uppercase mb-8 block">
              {eyebrow}
            </span>
          </WellnessReveal>
          
          <WellnessReveal delay={300} direction="up" duration={1200}>
            <h1 className="font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-tight text-stone-100 uppercase">
              {headline.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
              <span className="block mt-2 font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-600">
                {accentWord}
              </span>
            </h1>
          </WellnessReveal>

          <WellnessReveal delay={600} direction="up">
            <p className="mt-12 max-w-md text-lg text-stone-300 font-light leading-relaxed">
              {description}
            </p>
          </WellnessReveal>

          <WellnessReveal delay={800} direction="up">
            <WellnessMagnetic as="a" href="#explore" className="inline-flex items-center gap-4 mt-12 group cursor-pointer">
              <span className="font-sans text-xs tracking-[0.2em] font-semibold text-stone-100 uppercase group-hover:text-emerald-300 transition-colors">
                {primaryCta}
              </span>
              <span className="flex items-center justify-center h-12 w-12 rounded-full border border-stone-700 bg-white/5 backdrop-blur-md group-hover:bg-emerald-900/50 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:translate-x-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </WellnessMagnetic>
          </WellnessReveal>
        </div>
      </div>

      {/* Floating Micro UI */}
      <div className="hidden lg:flex absolute top-1/4 right-[15%] flex-col items-end gap-1 animate-wellnessFloat z-20" style={{ animationDuration: "12s" }}>
        <div className="text-stone-400 font-sans text-xs tracking-widest uppercase">07:00</div>
        <div className="text-stone-100 font-serif text-xl">MORNING FLOW</div>
      </div>

      <div className="hidden lg:flex absolute bottom-1/4 right-[20%] flex-col items-start gap-2 animate-wellnessFloat z-20" style={{ animationDuration: "18s", animationDelay: "2s" }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-sans text-[10px] tracking-widest uppercase font-bold">LIVE</span>
        </div>
        <div className="text-stone-100 font-sans text-sm tracking-wider uppercase">18 PEOPLE MOVING</div>
      </div>

      <div className="hidden lg:flex absolute top-1/3 left-[60%] flex-col items-center gap-1 animate-wellnessFloat z-20" style={{ animationDuration: "15s", animationDelay: "1s" }}>
        <div className="flex items-center gap-1 text-emerald-400">
          <span className="text-lg">★</span>
          <span className="font-sans font-bold text-lg text-stone-100">4.9</span>
        </div>
        <div className="text-stone-400 font-sans text-[10px] tracking-widest uppercase">MEMBER RATING</div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
        <span className="text-stone-500 font-sans text-[10px] tracking-[0.3em] uppercase">SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-500 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-200 animate-[wellnessFloat_3s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
