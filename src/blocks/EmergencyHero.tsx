"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, ShieldAlert } from "lucide-react";
import { CautionStripe, PulseBeacon, WordWipe } from "./plumberPrimitives";

export type EmergencyHeroProps = {
  headline: string;
  subheadline: string;
  phoneNumber: string;
  backgroundImageUrl: string;
};

export const EmergencyHero = ({ headline, subheadline, phoneNumber, backgroundImageUrl }: EmergencyHeroProps) => {
  return (
    <section className="grain relative w-full min-h-[92vh] flex flex-col justify-center items-start overflow-hidden bg-slate-950">
      <CautionStripe className="absolute top-0 left-0 h-1.5 z-20" />

      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30 mix-blend-luminosity grayscale"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 bg-slate-900 border border-orange-500/40 text-orange-400 px-5 py-2.5 rounded-md font-bold tracking-wide uppercase text-sm mb-8 shadow-[0_0_30px_-8px_rgba(249,115,22,0.5)]"
        >
          <PulseBeacon />
          <ShieldAlert size={18} />
          24/7 Emergency Dispatch
        </motion.div>

        <WordWipe
          text={headline}
          className="text-5xl md:text-7xl font-black text-white leading-[0.95] max-w-4xl mb-6 font-sans tracking-tight uppercase"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 font-medium leading-relaxed border-l-2 border-orange-500/50 pl-4"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-5"
        >
          <motion.a
            href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-2xl md:text-3xl font-black px-9 py-5 rounded-xl transition-colors shadow-[0_20px_50px_-12px_rgba(249,115,22,0.55)] group overflow-hidden"
          >
            <span className="absolute inset-0 rounded-xl border-2 border-white/0 group-hover:border-white/20 transition-colors" />
            <div className="bg-white/15 p-3 rounded-lg group-hover:scale-110 transition-transform relative">
              <span className="absolute inset-0 rounded-lg bg-white/20 animate-ping" />
              <Phone size={30} className="text-white fill-white relative" />
            </div>
            {phoneNumber}
          </motion.a>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-widest">
            <span className="eyebrow text-slate-500">Avg. response</span>
            <span className="text-orange-400 font-black text-base tracking-normal">45 min</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </section>
  );
};
