"use client";
import React from "react";
import { motion } from "framer-motion";

export type ConsultationFormProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  privacyNote: string;
};

// Slow, deliberate deceleration — the same curve used across the template.
const EASE = [0.22, 1, 0.36, 1] as const;

export const ConsultationForm = ({
  title,
  subtitle,
  buttonText = "Request Consultation",
  privacyNote,
}: ConsultationFormProps) => {
  return (
    <section className="py-24 bg-[#f5f1e8] grain w-full">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col md:flex-row bg-[#0b101c] text-[#f3eee3] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] overflow-hidden relative border border-[#b89a5e]/25"
        >
          {/* Text Info */}
          <div className="w-full md:w-5/12 p-12 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#b89a5e]/15">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">{title}</h2>
            <span className="h-px w-12 bg-[#b89a5e] mb-6 block" />
            <p className="text-slate-400 font-serif leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="w-full md:w-7/12 p-12 md:p-16 relative z-10">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">First Name</label>
                  <input
                    type="text"
                    className="bg-[#131a2c] border border-[#b89a5e]/25 text-white px-4 py-3 focus:outline-none focus:border-[#b89a5e] transition-colors duration-500 font-serif"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">Last Name</label>
                  <input
                    type="text"
                    className="bg-[#131a2c] border border-[#b89a5e]/25 text-white px-4 py-3 focus:outline-none focus:border-[#b89a5e] transition-colors duration-500 font-serif"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    className="bg-[#131a2c] border border-[#b89a5e]/25 text-white px-4 py-3 focus:outline-none focus:border-[#b89a5e] transition-colors duration-500 font-serif"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    className="bg-[#131a2c] border border-[#b89a5e]/25 text-white px-4 py-3 focus:outline-none focus:border-[#b89a5e] transition-colors duration-500 font-serif"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">Case Details</label>
                <textarea
                  rows={4}
                  className="bg-[#131a2c] border border-[#b89a5e]/25 text-white px-4 py-3 focus:outline-none focus:border-[#b89a5e] transition-colors duration-500 font-serif resize-none"
                  placeholder="Briefly describe your legal matter..."
                />
              </div>

              <motion.button
                whileHover={{
                  backgroundColor: "#c9b47e",
                  transition: { duration: 0.5, ease: EASE },
                }}
                className="bg-[#b89a5e] text-[#0b101c] font-bold uppercase tracking-widest py-4 mt-4"
              >
                {buttonText}
              </motion.button>

              {privacyNote && (
                <p className="text-slate-500 text-xs font-serif italic text-center mt-1">{privacyNote}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
