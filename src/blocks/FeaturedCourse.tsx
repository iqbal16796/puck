"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "../animations/Reveal";
import { MagneticElement } from "../animations/MagneticElement";
import { ArrowRight, Star } from "lucide-react";

export interface FeaturedCourseProps {
  badge: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  stats: string[];
}

export const FeaturedCourse = ({
  badge,
  title,
  description,
  image,
  ctaText,
  stats,
}: FeaturedCourseProps) => {
  return (
    <section className="py-24 sm:py-32 bg-slate-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-900/10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/30 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase text-blue-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                {badge}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-slate-300">
                {description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-300 border border-white/10 rounded-lg px-4 py-2 bg-white/5 backdrop-blur-sm">
                    {stat}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10">
                <MagneticElement as="a" href="#enroll" intensity={0.15}>
                  <div className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 transition-all hover:bg-blue-50">
                    {ctaText}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </MagneticElement>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={0.2} direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 opacity-80" />
              <motion.img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};