"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import { TiltCard } from "../animations/TiltCard";

export interface CourseListProps {
  title: string;
  subtitle: string;
  courses: {
    title: string;
    description: string;
    duration: string;
    level: string;
    image: string;
  }[];
}

export const CourseList = ({
  title,
  subtitle,
  courses,
}: CourseListProps) => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(courses.map((course) => {
    const title = course.title.toLowerCase();
    if (title.includes("math") || title.includes("sat") || title.includes("academic")) return "Academic";
    if (title.includes("data") || title.includes("engineering") || title.includes("coding") || title.includes("ai")) return "Career";
    return "Creative";
  })))];

  const filteredCourses = courses.filter((course) => {
    if (filter === "All") return true;
    const title = course.title.toLowerCase();
    if (filter === "Academic") return title.includes("math") || title.includes("sat") || title.includes("academic");
    if (filter === "Career") return title.includes("data") || title.includes("engineering") || title.includes("coding") || title.includes("ai");
    return true;
  });

  return (
    <section id="programs" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-100/70 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-indigo-100/70 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <Reveal>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              01 / Programs
            </span>
            <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.05em] text-slate-950 sm:text-5xl md:text-6xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={[
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                  filter === category
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
            <span className="ml-auto hidden text-xs text-slate-400 sm:block">
              <strong className="text-slate-900">
                {String(filteredCourses.length).padStart(2, "0")}
              </strong>{" "}
              programs
            </span>
          </div>
        </Reveal>

        <motion.div layout className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
                key={course.title}
              >
                <TiltCard intensity={3}>
                  <article className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_15px_40px_rgba(15,23,42,.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,.12)] hover:border-blue-200">
                    <div className="relative h-60 overflow-hidden">
                      <motion.img
                        src={course.image}
                        alt={course.title}
                        transition={{ duration: 0.65 }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                      
                      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 backdrop-blur-md shadow-sm">
                        {course.level}
                      </div>
                      
                      <div className="absolute bottom-5 left-5 text-xs font-semibold text-white">
                        PROGRAM {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="p-7 relative bg-white">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
                      
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                        {course.duration}
                      </div>
                      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 transition-colors group-hover:text-blue-600">
                        {course.title}
                      </h3>
                      <p className="mt-3 min-h-[70px] text-sm leading-6 text-slate-600">
                        {course.description}
                      </p>
                      <div className="mt-6 border-t border-slate-100 pt-5">
                        <span className="group/link inline-flex items-center gap-3 text-sm font-bold text-blue-600">
                          Explore program
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 transition-all group-hover:bg-blue-600 group-hover:text-white">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};