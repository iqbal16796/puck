"use client";

import React, { useState } from "react";
import { WellnessReveal, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessScheduleProps {
  eyebrow: string;
  title: string;
  classes: {
    time: string;
    title: string;
    instructor: string;
    type: string;
  }[];
}

export const WellnessSchedule = ({
  eyebrow,
  title,
  classes,
}: WellnessScheduleProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <section className="bg-stone-950 py-32 text-stone-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <WellnessReveal>
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] text-emerald-400 uppercase block mb-4">
                {eyebrow}
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none">
                {title}
              </h2>
            </div>
          </WellnessReveal>
          
          <WellnessReveal delay={200} direction="left">
            <div className="flex bg-stone-900 p-1 rounded-full w-fit border border-stone-800">
              {days.map((day, idx) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(idx)}
                  className={`relative px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors rounded-full z-10 ${
                    selectedDay === idx ? "text-stone-950" : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {selectedDay === idx && (
                    <span className="absolute inset-0 bg-emerald-400 rounded-full -z-10" style={{ animation: "fade-in-soft 0.3s ease-out" }} />
                  )}
                  {day}
                </button>
              ))}
            </div>
          </WellnessReveal>
        </div>

        <WellnessReveal delay={300} direction="up">
          <div className="overflow-x-auto pb-8 -mx-6 px-6 no-scrollbar">
            <div className="min-w-[800px] border-t border-stone-800">
              {classes.map((cls, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex items-center py-8 border-b border-stone-800/50 hover:bg-stone-900/50 transition-colors cursor-pointer px-4 -mx-4 rounded-2xl"
                >
                  {/* Hover accent line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-emerald-400 transition-all duration-300 group-hover:h-1/2 rounded-r" />
                  
                  <div className="w-[15%]">
                    <span className="font-serif text-3xl text-stone-300 group-hover:text-emerald-400 transition-colors">
                      {cls.time}
                    </span>
                  </div>
                  
                  <div className="w-[35%]">
                    <h4 className="text-2xl font-light text-stone-100 uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-500">{cls.title}</h4>
                    <div className="mt-2 text-stone-400 text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500 delay-75">
                      {cls.instructor}
                    </div>
                  </div>
                  
                  <div className="w-[20%]">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-stone-800 bg-stone-900 text-xs tracking-widest text-emerald-500/80 uppercase group-hover:border-emerald-900 group-hover:bg-emerald-950/50 transition-colors">
                      {cls.type}
                    </span>
                  </div>
                  
                  <div className="w-[15%] text-stone-500 text-xs tracking-widest uppercase">
                    60 MIN
                  </div>

                  <div className="flex-1 flex justify-end">
                    <WellnessMagnetic>
                      <div className="h-12 w-12 rounded-full border border-stone-700 flex items-center justify-center text-stone-500 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-all duration-300 -rotate-45 group-hover:rotate-0">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </WellnessMagnetic>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WellnessReveal>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
