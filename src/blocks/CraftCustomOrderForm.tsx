"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClayGlow, WobbleButton } from "./craftPrimitives";

/**
 * Craft's own commission-request form. Forked from ../blocks/CustomOrderForm
 * (still shared with bakery.config.tsx as its original dark/ember design) so
 * that reworking craft's look never touches bakery's copy. Same prop shape
 * as the original: { title, description }.
 */
export type CraftCustomOrderFormProps = {
  title: string;
  description: string;
};

export const CraftCustomOrderForm = ({ title, description }: CraftCustomOrderFormProps) => {
  return (
    <section className="grain relative py-32 bg-[#3E2B1E] w-full flex justify-center px-6 overflow-hidden">
      <ClayGlow className="opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-[#4A3323]/70 backdrop-blur-xl border border-[#6B4A35]/60 shadow-[0_0_60px_rgba(0,0,0,0.35)] rounded-3xl p-8 md:p-12 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#C97B4A]/10 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="font-display text-4xl text-[#F6F1E7] mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-[#C97B4A]/60 inline-block" />
            {title}
          </h2>
          <p className="text-[#EFE1D2]/70 mb-12 font-serif text-lg leading-loose">{description}</p>

          <form className="flex flex-col gap-10 font-sans" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col relative group">
              <label className="eyebrow text-[#C97B4A]/90 mb-2 group-focus-within:text-[#E2A87A] transition-colors">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-[#3E2B1E]/60 border border-[#6B4A35] rounded-xl focus:border-[#C97B4A]/60 outline-none text-xl text-[#F6F1E7] px-4 py-3 transition-all focus:shadow-[0_0_15px_rgba(201,123,74,0.25)]"
              />
            </div>

            <div className="flex flex-col relative group">
              <label className="eyebrow text-[#C97B4A]/90 mb-2 group-focus-within:text-[#E2A87A] transition-colors">
                What would you like made?
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#3E2B1E]/60 border border-[#6B4A35] rounded-xl focus:border-[#C97B4A]/60 outline-none text-xl text-[#F6F1E7] px-4 py-3 transition-all resize-none focus:shadow-[0_0_15px_rgba(201,123,74,0.25)]"
              />
            </div>

            <WobbleButton
              as="button"
              type="submit"
              className="mt-4 w-full justify-center bg-gradient-to-r from-[#B5563C] to-[#C97B4A] text-[#F6F1E7] px-8 py-4 font-bold uppercase tracking-widest rounded-xl shadow-[0_10px_30px_-10px_rgba(122,63,46,0.6)]"
            >
              Send Request
            </WobbleButton>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
