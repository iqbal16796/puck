"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles as SparklesIcon, X } from "lucide-react";
import { CursorGlow } from "../animations/CursorGlow";
import { FloatingOrbs } from "../animations/FloatingOrbs";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { MagneticElement } from "../animations/MagneticElement";
import { ScrollProgress } from "../animations/ScrollProgress";
import { Sparkles } from "../animations/Sparkles";

export interface EducationHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImageUrl: string;
}

export const EducationHero = ({
  headline,
  subheadline,
  ctaText,
  backgroundImageUrl,
}: EducationHeroProps) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <ScrollProgress />
      <section className="relative min-h-[92vh] overflow-hidden bg-slate-950 text-white">
        <CursorGlow />
        
        {/* Background */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.48 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={backgroundImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <FloatingOrbs />
        <Sparkles />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-28">
          <Stagger className="max-w-4xl">
            {/* Eyebrow */}
            <StaggerItem>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 backdrop-blur-md">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-blue-400"
                />
                Top Rated Coaching Center
                <SparklesIcon className="h-3.5 w-3.5" />
              </div>
            </StaggerItem>

            {/* Heading */}
            <StaggerItem>
              <h1 className="max-w-5xl text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {headline}
              </h1>
            </StaggerItem>

            {/* Copy */}
            <StaggerItem>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg md:text-xl">
                {subheadline}
              </p>
            </StaggerItem>

            {/* Actions */}
            <StaggerItem>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticElement as="a" href="#programs" intensity={0.15}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 font-bold shadow-[0_15px_45px_rgba(37,99,235,.3)] transition-shadow hover:shadow-[0_20px_60px_rgba(37,99,235,.45)] sm:w-auto"
                  >
                    {ctaText}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </MagneticElement>

                <MagneticElement as="button" type="button" onClick={() => setShowDemo(true)} intensity={0.1}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10 sm:w-auto"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                    Watch Demo
                  </motion.div>
                </MagneticElement>
              </div>
            </StaggerItem>

            {/* Social proof */}
            <StaggerItem>
              <div className="mt-12 flex flex-wrap items-center gap-7 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["SP", "JM", "AK", "+2k"].map((item, index) => (
                      <span
                        key={item}
                        className={[
                          "grid h-9 w-9 place-items-center rounded-full border-2 border-slate-950 text-[9px] font-bold",
                          index === 0
                            ? "bg-blue-200 text-blue-900"
                            : index === 1
                              ? "bg-amber-200 text-amber-900"
                              : index === 2
                                ? "bg-violet-200 text-violet-900"
                                : "bg-slate-800 text-slate-300",
                        ].join(" ")}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div>
                    <strong className="block text-white">2,000+ learners</strong>
                    <span className="text-xs text-slate-400">building their next chapter</span>
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-white/10 sm:block" />
                <div>
                  <strong className="block text-white">4.9 / 5</strong>
                  <span className="text-xs tracking-widest text-amber-400">★★★★★</span>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Scroll indicator */}
        <Reveal delay={0.8} className="absolute bottom-8 right-8 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-slate-500"
          >
            <span>Scroll</span>
            <span className="h-12 w-px bg-gradient-to-b from-slate-500 to-transparent" />
          </motion.div>
        </Reveal>
      </section>

      {/* Demo modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/75 p-6 backdrop-blur-md"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-2xl sm:p-12"
            >
              <button
                type="button"
                onClick={() => setShowDemo(false)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
                <Play className="h-6 w-6 fill-current" />
              </div>
              <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
                Learning that moves with you.
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Expert mentors, practical projects, and a learning environment
                designed around real progress — not just watching lessons.
              </p>
              <button
                type="button"
                onClick={() => setShowDemo(false)}
                className="mt-7 rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-1"
              >
                Let's get started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};