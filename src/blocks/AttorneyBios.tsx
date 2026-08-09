"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export type AttorneyBiosProps = {
  title: string;
  attorneys: { name: string; position: string; email: string; imageUrl: string; bio: string }[];
};

// Slow, deliberate deceleration — the same curve used across the template.
const EASE = [0.22, 1, 0.36, 1] as const;

export const AttorneyBios = ({ title, attorneys = [] }: AttorneyBiosProps) => {
  return (
    <section className="py-24 bg-[#0b101c] w-full text-[#f3eee3]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            {title}
          </motion.h2>
          <span className="h-px w-16 bg-[#b89a5e] mx-auto block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {attorneys.map((attorney, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: index * 0.15, ease: EASE }}
              className="group flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-[#131a2c] border border-[#b89a5e]/20">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.05] transition-all duration-1000 ease-out group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${attorney.imageUrl})` }}
                />

                {/* Overlay Contact Button */}
                <div className="absolute inset-0 bg-[#070a12]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                  <a
                    href={`mailto:${attorney.email}`}
                    className="flex items-center gap-2 border border-[#b89a5e]/70 bg-[#070a12]/70 text-[#f3eee3] px-6 py-3 font-semibold uppercase tracking-widest text-sm transition-all duration-700 translate-y-4 group-hover:translate-y-0 hover:bg-[#b89a5e] hover:text-[#070a12]"
                  >
                    <Mail size={16} /> Contact
                  </a>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-serif mb-1 transition-colors duration-700 group-hover:text-[#b89a5e]">
                {attorney.name}
              </h3>
              <p className="eyebrow text-[#b89a5e] mb-4">
                {attorney.position}
              </p>
              <p className="text-slate-400 font-serif leading-relaxed text-sm">
                {attorney.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
