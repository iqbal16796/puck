"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { FloatingOrbs } from "../animations/FloatingOrbs";
import { Sparkles } from "../animations/Sparkles";
import { MagneticElement } from "../animations/MagneticElement";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface EnrollmentCTAProps {
  title: string;
  description: string;
  ctaText: string;
  benefits: string[];
}

export const EnrollmentCTA = ({ title, description, ctaText, benefits }: EnrollmentCTAProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32 text-white">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950 to-indigo-900/40" />
      <FloatingOrbs />
      <Sparkles />
      
      {/* Radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal direction="down">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Enrollment Open
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">{title}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                {benefit}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12">
            <MagneticElement as="a" href="#enroll" intensity={0.2}>
              <div className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-bold text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                {ctaText}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </MagneticElement>
          </div>
        </Reveal>
      </div>
    </section>
  );
};