"use client";
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets, Flower2, Sparkles } from "lucide-react";
import { useSpotlight, Spotlight, RevealText } from "./artisanPrimitives";

export type RemedyGridProps = {
  title: string;
  treatments: {
    title: string;
    description: string;
    icon: string;
  }[];
};

const IconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={32} className="text-[#849271]" />,
  Droplets: <Droplets size={32} className="text-[#849271]" />,
  Flower2: <Flower2 size={32} className="text-[#849271]" />,
  Sparkles: <Sparkles size={32} className="text-[#849271]" />
};

export const RemedyGrid = ({ title, treatments = [] }: RemedyGridProps) => {
  return (
    <section className="py-24 bg-[#F7F4F0] w-full">
      <div className="max-w-6xl mx-auto px-6">
        <RevealText className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A4238] mb-6">{title}</h2>
          <div className="w-16 h-0.5 bg-[#849271] mx-auto" />
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <RemedyCard key={index} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RemedyCard = ({ treatment, index }: { treatment: any; index: number }) => {
  const { onMouseMove, background } = useSpotlight(300, 0.1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={onMouseMove}
      className="bg-white p-10 rounded-tr-[4rem] rounded-bl-[4rem] transition-shadow duration-300 group cursor-default relative overflow-hidden shadow-lg hover:shadow-[0_20px_60px_-20px_rgba(132,146,113,0.4)] border border-[#849271]/10"
    >
      <Spotlight background={background} />
      <div className="relative z-10 mb-6 p-4 bg-[#F7F4F0] inline-block rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
        {IconMap[treatment.icon] || <Leaf size={32} className="text-[#849271]" />}
      </div>
      <h3 className="relative z-10 text-2xl font-serif text-[#4A4238] mb-4">{treatment.title}</h3>
      <p className="relative z-10 text-[#756a5c] leading-relaxed">
        {treatment.description}
      </p>
    </motion.div>
  );
};
