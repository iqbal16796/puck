"use client";

import React, { useState } from "react";
import { WellnessReveal, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessProgramsProps {
  programs: {
    title: string;
    description: string;
    duration: string;
    level: string;
    imageUrl: string;
  }[];
}

export const WellnessPrograms = ({ programs }: WellnessProgramsProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!programs || programs.length === 0) return null;

  return (
    <section className="bg-stone-50 py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Main Large Program (Index 0) */}
          {programs[0] && (
            <div className="lg:col-span-7 flex flex-col justify-center">
              <WellnessReveal delay={100} duration={1000} direction="up" className="h-full w-full">
                <div 
                  className={`group relative h-full w-full overflow-hidden rounded-[2rem] transition-all duration-700 ease-out cursor-pointer min-h-[60vh] lg:min-h-[800px] ${hoveredIdx !== null && hoveredIdx !== 0 ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}
                  onMouseEnter={() => setHoveredIdx(0)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <img
                    src={programs[0].imageUrl}
                    alt={programs[0].title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/20 transition-opacity duration-700 group-hover:bg-stone-900/40" />
                  
                  {/* Overlay slide effect (CSS trick with pseudo element) */}
                  <div className="absolute inset-0 bg-stone-950 origin-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none animate-[slideDown_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" />

                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                    <div className="text-white/80 font-sans text-xs tracking-widest uppercase">
                      01
                    </div>
                    <div>
                      <div className="overflow-hidden mb-4">
                        <h3 className="font-serif text-5xl md:text-7xl text-white transform transition-transform duration-700 group-hover:-translate-y-2">
                          {programs[0].title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 opacity-0 transition-opacity duration-500 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="text-white font-sans text-xs tracking-widest uppercase">{programs[0].duration}</span>
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        <span className="text-white font-sans text-xs tracking-widest uppercase">{programs[0].level}</span>
                      </div>
                      <WellnessMagnetic className="absolute bottom-8 right-8">
                        <div className="h-16 w-16 rounded-full bg-emerald-600/90 backdrop-blur-md flex items-center justify-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </WellnessMagnetic>
                    </div>
                  </div>
                </div>
              </WellnessReveal>
            </div>
          )}

          {/* Side smaller programs (Index 1 and 2) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-8 lg:gap-16 mt-8 lg:mt-0">
            {programs.slice(1, 3).map((program, idx) => {
              const actualIdx = idx + 1;
              return (
                <WellnessReveal key={actualIdx} delay={200 + idx * 200} duration={1000} direction="left" className="h-full">
                  <div 
                    className={`group relative h-full w-full overflow-hidden rounded-[2rem] transition-all duration-700 ease-out cursor-pointer min-h-[40vh] lg:min-h-[380px] ${hoveredIdx !== null && hoveredIdx !== actualIdx ? 'scale-[0.98] opacity-80' : 'scale-100 opacity-100'}`}
                    onMouseEnter={() => setHoveredIdx(actualIdx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/20 transition-opacity duration-700 group-hover:bg-stone-900/50" />
                    
                    <div className="absolute inset-0 bg-stone-950 origin-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none animate-[slideDown_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: `${200 + idx * 200}ms` }} />

                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div className="text-white/80 font-sans text-xs tracking-widest uppercase">
                        0{actualIdx + 1}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-serif text-3xl md:text-4xl text-white transform transition-transform duration-700 group-hover:-translate-y-2">
                            {program.title}
                          </h3>
                        </div>
                        <WellnessMagnetic>
                          <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </WellnessMagnetic>
                      </div>
                    </div>
                  </div>
                </WellnessReveal>
              );
            })}
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes slideDown {
          0% { transform: scaleY(1); transform-origin: top; }
          100% { transform: scaleY(0); transform-origin: top; }
        }
      `}</style>
    </section>
  );
};
