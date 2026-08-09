"use client";
import React from "react";
import { motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";
import { RevealText } from "./artisanPrimitives";

export type TrainerProfilesProps = {
  title: string;
  trainers: { name: string; specialty: string; imageUrl: string; quote: string }[];
};

export const TrainerProfiles = ({ title, trainers = [] }: TrainerProfilesProps) => {
  return (
    <section className="py-24 bg-zinc-900 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <RevealText>
          <div className="text-center mb-20">
            <span className="eyebrow text-red-500">The Roster</span>
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tight mt-3 mb-4">{title}</h2>
            <div className="w-24 h-2 bg-red-600 mx-auto -skew-x-12" />
          </div>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, type: "spring", damping: 13, stiffness: 120 }}
              className="group relative h-[500px] overflow-hidden bg-zinc-950"
            >
              {/* Desaturated Image turning to saturated on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 saturate-0 group-hover:saturate-100 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: `url(${trainer.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-red-600/10 mix-blend-overlay" />

              {/* Default Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:-translate-y-8">
                <h3 className="text-3xl font-black text-white uppercase italic tracking-wide">{trainer.name}</h3>
                <p className="text-red-500 font-bold uppercase tracking-widest text-sm mt-1">{trainer.specialty}</p>
              </div>

              {/* Slide Up Stats/Socials */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex flex-col gap-4 border-t-2 border-red-600/0 group-hover:border-red-600">
                <p className="text-zinc-300 italic font-medium">&ldquo;{trainer.quote}&rdquo;</p>
                <div className="flex items-center gap-4 text-lime-400">
                  <a href="#" className="hover:text-white transition-colors"><Activity size={24} /></a>
                  <a href="#" className="hover:text-white transition-colors"><Flame size={24} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
