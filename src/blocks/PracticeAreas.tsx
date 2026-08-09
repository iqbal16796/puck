"use client";
import React from "react";
import { motion } from "framer-motion";
import { Scale, Briefcase, Users, FileText } from "lucide-react";

export type PracticeAreasProps = {
  title: string;
  description: string;
  areas: { title: string; excerpt: string; icon: string }[];
};

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale size={28} strokeWidth={1.25} />,
  Briefcase: <Briefcase size={28} strokeWidth={1.25} />,
  Users: <Users size={28} strokeWidth={1.25} />,
  FileText: <FileText size={28} strokeWidth={1.25} />
};

// Slow, deliberate deceleration — the same curve used across the template.
const EASE = [0.22, 1, 0.36, 1] as const;

const numeral = (n: number) => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][n] ?? String(n + 1);

export const PracticeAreas = ({ title, description, areas = [] }: PracticeAreasProps) => {
  return (
    <section className="py-24 bg-[#0b101c] w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#b89a5e]" />
              <span className="eyebrow text-[#b89a5e]">Areas of Practice</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#f3eee3]">{title}</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            className="text-slate-400 max-w-md font-serif text-lg"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a2236]">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
              className="group bg-[#0b101c] p-8 md:p-10 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="text-[#b89a5e] transition-opacity duration-700 group-hover:opacity-80">
                  {iconMap[area.icon] || <Scale size={28} strokeWidth={1.25} />}
                </div>
                <span className="font-serif text-sm text-[#b89a5e]/50 tracking-widest">{numeral(index)}</span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-[#f3eee3] mb-4">{area.title}</h3>
              <p className="text-slate-400 font-serif leading-relaxed mb-8">
                {area.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#b89a5e] uppercase tracking-widest text-xs font-semibold">
                Learn More
                <span className="inline-block h-px w-6 bg-[#b89a5e] transition-[width] duration-700 ease-out group-hover:w-10" />
              </div>

              {/* Gold rule that brightens on hover, like an underlined clause */}
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#b89a5e]/0 transition-colors duration-700 group-hover:bg-[#b89a5e]/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
