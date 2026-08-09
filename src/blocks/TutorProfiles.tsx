"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { TiltCard } from "../animations/TiltCard";

export interface TutorProfilesProps {
  title: string;
  tutors: {
    name: string;
    subject: string;
    bio: string;
    image: string;
  }[];
}

export const TutorProfiles = ({
  title,
  tutors,
}: TutorProfilesProps) => {
  return (
    <section id="mentors" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 grid gap-8 md:grid-cols-[1fr_.65fr] md:items-end">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                02 / Mentors
              </span>
              <h2 className="text-4xl font-extrabold tracking-[-0.05em] text-slate-950 sm:text-5xl md:text-6xl">
                {title}
              </h2>
            </div>
            <p className="text-base leading-7 text-slate-600">
              Learn from experienced practitioners who know what it takes to
              turn knowledge into real-world results.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor, idx) => (
            <StaggerItem key={tutor.name}>
              <TiltCard intensity={4}>
                <article className="group relative h-[430px] overflow-hidden rounded-[1.7rem] bg-slate-900 shadow-lg">
                  <motion.img
                    src={tutor.image}
                    alt={tutor.name}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Number */}
                  <span className="absolute left-5 top-5 z-10 text-xs font-bold tracking-widest text-white/60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <motion.div
                      initial={{ x: -15, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.25 }}
                      className="mb-3 inline-flex rounded-full bg-blue-600/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md"
                    >
                      {tutor.subject}
                    </motion.div>

                    <h3 className="text-2xl font-extrabold tracking-tight text-white">
                      {tutor.name}
                    </h3>

                    <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                      <p className="text-sm leading-6 text-slate-300">
                        {tutor.bio}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      View mentor
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};