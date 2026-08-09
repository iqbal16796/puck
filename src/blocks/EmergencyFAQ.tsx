"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle } from "lucide-react";

export type EmergencyFAQProps = {
  title: string;
  faqs: { question: string; answer: string }[];
};

export const EmergencyFAQ = ({ title, faqs = [] }: EmergencyFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="grain py-24 bg-slate-950 w-full overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(90deg,transparent_calc(100%-1px),#f97316_calc(100%-1px)),linear-gradient(0deg,transparent_calc(100%-1px),#f97316_calc(100%-1px))] bg-[length:48px_48px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-orange-500/15 text-orange-500 rounded-xl border border-orange-500/30">
            <AlertTriangle size={28} />
          </div>
          <div>
            <span className="eyebrow text-orange-500 block mb-1">Know Before You Call</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">{title}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? "bg-slate-900 border-orange-500/50" : "bg-slate-900/40 border-slate-800"}`}
              >
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transition-transform duration-300 origin-top ${isOpen ? "scale-y-100" : "scale-y-0"}`}
                  aria-hidden
                />
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? "text-orange-400" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 ml-4 text-slate-400"
                  >
                    <ChevronDown size={22} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
