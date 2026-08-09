"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { AnimatedCounter } from "../animations/AnimatedCounter";
import { ProgressRing } from "../animations/ProgressRing";
import { Sparkles } from "../animations/Sparkles";
import { Trophy, TrendingUp, Target } from "lucide-react";
import { TiltCard } from "../animations/TiltCard";

export interface StudentResultsProps {
  title: string;
  subtitle: string;
  results: {
    metric: string;
    value: number;
    description: string;
    icon: string;
    progress?: number;
  }[];
}

export const StudentResults = ({ title, subtitle, results }: StudentResultsProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Trophy": return <Trophy className="h-6 w-6" />;
      case "TrendingUp": return <TrendingUp className="h-6 w-6" />;
      case "Target": return <Target className="h-6 w-6" />;
      default: return <Trophy className="h-6 w-6" />;
    }
  };

  return (
    <section className="bg-slate-950 py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <Sparkles />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {results.map((result, idx) => (
            <StaggerItem key={idx}>
              <TiltCard intensity={2} className="h-full">
                <div className="group h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-blue-500/50">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    {getIcon(result.icon)}
                  </div>
                  
                  {result.progress !== undefined ? (
                    <div className="flex justify-center mb-6">
                      <ProgressRing 
                        progress={result.progress} 
                        size={100} 
                        strokeWidth={8} 
                        color="text-blue-400" 
                        trackColor="text-slate-800"
                        className="text-white text-xl font-bold"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 text-4xl font-extrabold text-white">
                      <AnimatedCounter value={result.value} />
                      <span className="text-blue-400">+</span>
                    </div>
                  )}

                  <h3 className="mb-2 text-xl font-bold text-white">{result.metric}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{result.description}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};