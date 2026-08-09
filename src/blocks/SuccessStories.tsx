"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export type SuccessStoriesProps = {
  sectionTitle?: string;
  imageUrl: string;
  quote: string;
  author: string;
  achievement: string;
};

export const SuccessStories = ({ sectionTitle, imageUrl, quote, author, achievement }: SuccessStoriesProps) => {
  return (
    <section className="bg-zinc-950 w-full border-y border-zinc-900">
      {sectionTitle && (
        <div className="max-w-7xl mx-auto px-8 pt-16">
          <span className="eyebrow text-red-500">Proof</span>
          <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tight mt-2">{sectionTitle}</h2>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full min-h-[70vh]">

        {/* Image side — shutter-wipe reveal, like a curtain snapping open on the transformation */}
        <div className="w-full md:w-1/2 relative overflow-hidden group min-h-[50vh]">
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            whileInView={{ clipPath: "inset(0 0 0 0%)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 saturate-50 group-hover:saturate-100"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay pointer-events-none" />
          </motion.div>

          <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-70 z-10">
            <span className="text-white text-xs font-black uppercase tracking-widest bg-red-600/90 px-2 py-1">Transformation</span>
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 bg-zinc-900 relative">
          <Quote size={80} className="text-zinc-800 absolute top-12 left-12 rotate-180" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase leading-tight mb-12 tracking-tight">
              &ldquo;{quote}&rdquo;
            </h3>

            <div className="flex items-center gap-6">
              <div className="w-16 h-2 bg-red-600 skew-x-[-20deg]" />
              <div>
                <h4 className="text-2xl font-black text-white uppercase tracking-wider">{author}</h4>
                <p className="text-lime-400 font-bold uppercase tracking-widest text-sm mt-1">{achievement}</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
