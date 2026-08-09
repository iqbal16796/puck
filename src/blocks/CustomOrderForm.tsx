"use client";
import React from "react";
import { motion } from "framer-motion";

export type CustomOrderFormProps = {
  title: string;
  description: string;
};

export const CustomOrderForm = ({ title, description }: CustomOrderFormProps) => {
  return (
    <section className="py-32 bg-stone-950 w-full flex justify-center px-6 relative overflow-hidden">
      {/* Auroras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-20 z-0">
        <div className="aurora aurora-1 absolute top-0 left-1/4 h-[50vw] w-[50vw] rounded-full bg-amber-500/30 blur-[120px] animate-drift" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-stone-900/40 backdrop-blur-xl border border-stone-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl p-8 md:p-12 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-4xl font-serif text-amber-50 mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-amber-500/50 inline-block"></span>
            {title}
          </h2>
          <p className="text-amber-100/60 mb-12 font-serif text-lg leading-loose">{description}</p>

          <form className="flex flex-col gap-10 font-sans" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col relative group">
              <label className="text-sm tracking-widest uppercase text-amber-500/80 mb-2 font-bold group-focus-within:text-amber-400 transition-colors">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-stone-950/50 border border-stone-800 rounded-xl focus:border-amber-500/50 outline-none text-xl text-amber-50 px-4 py-3 transition-all focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              />
            </div>
            
            <div className="flex flex-col relative group">
              <label className="text-sm tracking-widest uppercase text-amber-500/80 mb-2 font-bold group-focus-within:text-amber-400 transition-colors">What would you like us to bake?</label>
              <textarea 
                rows={4}
                className="w-full bg-stone-950/50 border border-stone-800 rounded-xl focus:border-amber-500/50 outline-none text-xl text-amber-50 px-4 py-3 transition-all resize-none focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full bg-amber-600 hover:bg-amber-500 text-stone-950 px-8 py-4 font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all"
            >
              Send Request
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
