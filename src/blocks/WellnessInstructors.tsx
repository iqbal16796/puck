"use client";

import React from "react";
import { WellnessReveal, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessInstructorsProps {
  instructors: {
    name: string;
    role: string;
    imageUrl: string;
  }[];
}

export const WellnessInstructors = ({ instructors }: WellnessInstructorsProps) => {
  // We expect 4 instructors for this asymmetric layout
  if (!instructors || instructors.length < 4) return null;

  return (
    <section className="bg-stone-50 py-32 overflow-hidden relative">
      <div className="pointer-events-none absolute right-[-5%] top-[10%] text-[15vw] font-serif font-black text-stone-200/50 rotate-90 select-none z-0">
        GUIDES
      </div>
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Large portrait (Instructor 1) */}
          <div className="md:col-span-5 md:mt-24">
            <WellnessReveal delay={100} duration={1000} direction="up">
              <WellnessMagnetic>
                <div className="group relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-[2rem] bg-stone-200 cursor-pointer">
                  <img
                    src={instructors[0].imageUrl}
                    alt={instructors[0].name}
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/0 to-stone-900/0 opacity-60 transition-opacity group-hover:opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="font-serif text-3xl text-white transform transition-transform duration-700 group-hover:-translate-y-2">{instructors[0].name}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {instructors[0].role}
                    </p>
                  </div>
                </div>
              </WellnessMagnetic>
            </WellnessReveal>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-6 md:gap-12">
            {/* Small portrait top (Instructor 2) */}
            <div className="col-span-2 sm:col-span-1">
              <WellnessReveal delay={200} duration={1000} direction="up">
                <WellnessMagnetic>
                  <div className="group relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2rem] bg-stone-200 cursor-pointer">
                    <img
                      src={instructors[1].imageUrl}
                      alt={instructors[1].name}
                      className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/0 to-stone-900/0 opacity-60 transition-opacity group-hover:opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl text-white transform transition-transform duration-700 group-hover:-translate-y-2">{instructors[1].name}</h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        {instructors[1].role}
                      </p>
                    </div>
                  </div>
                </WellnessMagnetic>
              </WellnessReveal>
            </div>

            {/* Medium portrait right (Instructor 3) */}
            <div className="col-span-2 sm:col-span-1 sm:mt-32">
              <WellnessReveal delay={300} duration={1000} direction="up">
                <WellnessMagnetic>
                  <div className="group relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[2rem] bg-stone-200 cursor-pointer">
                    <img
                      src={instructors[2].imageUrl}
                      alt={instructors[2].name}
                      className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/0 to-stone-900/0 opacity-60 transition-opacity group-hover:opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl text-white transform transition-transform duration-700 group-hover:-translate-y-2">{instructors[2].name}</h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        {instructors[2].role}
                      </p>
                    </div>
                  </div>
                </WellnessMagnetic>
              </WellnessReveal>
            </div>

            {/* Small portrait bottom (Instructor 4) */}
            <div className="col-span-2 flex justify-center sm:justify-start sm:ml-12 mt-4 md:-mt-12">
              <WellnessReveal delay={400} duration={1000} direction="up">
                <WellnessMagnetic>
                  <div className="group relative aspect-square w-[200px] sm:w-[240px] overflow-hidden rounded-full bg-stone-200 cursor-pointer">
                    <img
                      src={instructors[3].imageUrl}
                      alt={instructors[3].name}
                      className="absolute inset-0 h-full w-full object-cover grayscale opacity-80 transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-stone-900/40 transition-opacity group-hover:bg-stone-900/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-stone-900/60 backdrop-blur-sm">
                      <h3 className="font-serif text-xl text-white">{instructors[3].name}</h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        {instructors[3].role}
                      </p>
                    </div>
                  </div>
                </WellnessMagnetic>
              </WellnessReveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
