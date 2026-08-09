"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Ruler } from "lucide-react";

export type SizeGuideProps = {
  title: string;
  tableData: { size: string; bust: string; waist: string; hips: string }[];
};

export const SizeGuide = ({ title, tableData = [] }: SizeGuideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-28 w-full bg-white relative overflow-hidden flex justify-center">
      <div className="w-full max-w-3xl px-6 relative z-10">
        <p className="eyebrow text-[#8a8272] mb-6 text-center">Fit Guide</p>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border border-zinc-200 p-6 md:p-8 cursor-pointer hover:border-black transition-colors duration-500 flex justify-between items-center group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 border border-[#C9BFA6]/50 text-[#8a8272]">
              <Ruler size={22} />
            </div>
            <h2 className="text-2xl font-serif text-zinc-900 tracking-wide">{title}</h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 group-hover:text-black transition-colors"
          >
            <ChevronDown size={26} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border border-t-0 border-zinc-200 p-6 md:p-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-400 uppercase tracking-widest text-xs">
                        <th className="py-4 px-4 font-normal">Size</th>
                        <th className="py-4 px-4 font-normal">Bust (in)</th>
                        <th className="py-4 px-4 font-normal">Waist (in)</th>
                        <th className="py-4 px-4 font-normal">Hips (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, idx) => (
                        <tr key={idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors">
                          <td className="py-4 px-4 font-serif text-lg">{row.size}</td>
                          <td className="py-4 px-4 text-zinc-600">{row.bust}</td>
                          <td className="py-4 px-4 text-zinc-600">{row.waist}</td>
                          <td className="py-4 px-4 text-zinc-600">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
