"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { FloatingOrbs } from "../animations/FloatingOrbs";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { AnimatedCounter } from "../animations/AnimatedCounter";

export interface StudentTestimonialsProps {
  title: string;
  testimonials: {
    name: string;
    role: string;
    quote: string;
    image: string;
  }[];
}

export const StudentTestimonials = ({
  title,
  testimonials,
}: StudentTestimonialsProps) => {
  return (
    <section id="stories" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
      <FloatingOrbs />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            03 / Success stories
          </span>
          <h2 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Real learners. Real progress. Real reasons to keep going.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <StaggerItem key={testimonial.name}>
              <article className="group relative flex min-h-[370px] flex-col rounded-[1.7rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-md transition-colors duration-500 hover:border-blue-500/30 hover:bg-white/[0.075]">
                {/* Top accent */}
                <div className="absolute left-7 right-auto top-0 h-1 w-16 rounded-b-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Quote className="h-9 w-9 text-blue-400/40" />

                {/* Stars */}
                <div className="mt-6 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.12 + starIndex * 0.08 }}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="mt-6 flex-1 text-lg leading-8 text-slate-200">
                  "{testimonial.quote}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-md transition-opacity group-hover:opacity-100" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative h-12 w-12 rounded-full border border-white/20 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="mt-1 text-xs text-blue-300">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Stats */}
        <Reveal delay={0.3} className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-extrabold sm:text-3xl">
              <AnimatedCounter value={2000} suffix="+" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Learners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold sm:text-3xl">
              4.9/5
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Average rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold sm:text-3xl">
              <AnimatedCounter value={94} suffix="%" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Completion rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold sm:text-3xl">
              <AnimatedCounter value={87} suffix="%" />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Career impact</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};