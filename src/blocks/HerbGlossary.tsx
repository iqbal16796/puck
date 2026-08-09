"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "./artisanPrimitives";

export type HerbGlossaryProps = {
  title: string;
  herbs: {
    name: string;
    benefits: string;
    imageUrl: string;
  }[];
};

export const HerbGlossary = ({ title, herbs = [] }: HerbGlossaryProps) => {
  return (
    <section className="py-24 bg-[#FAF9F6] w-full text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <RevealText className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A4238]">{title}</h2>
        </RevealText>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {herbs.map((herb, idx) => (
            <RevealText key={idx} delay={idx * 0.1} className="flex flex-col items-center group cursor-pointer w-48">
              
              <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-transparent group-hover:border-[#849271] transition-colors duration-500 hover:shadow-[0_20px_60px_-20px_rgba(132,146,113,0.4)]">
                <Image 
                  src={herb.imageUrl}
                  alt={herb.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                {/* Circling Text on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                   {/* We can simulate wrapping text with a simple rotating svg */}
                   <motion.svg 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     viewBox="0 0 100 100" 
                     className="w-full h-full text-[#849271] scale-110"
                   >
                     <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent" />
                     <text className="text-[10px] uppercase tracking-[0.2em]" fill="currentColor">
                       <textPath href="#curve" startOffset="0%">
                         {herb.benefits} • {herb.benefits} • 
                       </textPath>
                     </text>
                   </motion.svg>
                </div>
              </div>

              <h3 className="text-xl font-serif text-[#4A4238] group-hover:text-[#849271] transition-colors">
                {herb.name}
              </h3>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
};
