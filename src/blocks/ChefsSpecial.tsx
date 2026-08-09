"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export type ChefsSpecialProps = {
  title: string;
  dishName: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
};

export const ChefsSpecial = ({ title, dishName, description, ingredients = [], imageUrl }: ChefsSpecialProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={containerRef} className="py-32 bg-stone-950 w-full overflow-hidden relative border-y border-amber-900/30">
      {/* Auroras */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-30 z-0">
          <div className="aurora aurora-1 absolute top-0 right-0 h-[40vw] w-[40vw] rounded-full bg-amber-600/20 blur-[100px] animate-drift" />
          <div className="aurora aurora-2 absolute bottom-0 left-0 h-[50vw] w-[50vw] rounded-full bg-orange-600/20 blur-[120px] animate-drift" style={{ animationDelay: "-4s" }} />
        </div>
      )}

      {/* Decorative background text */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 right-0 text-amber-900/10 text-[15vw] font-serif font-black leading-none whitespace-nowrap pointer-events-none select-none z-0 mix-blend-overlay"
      >
        SIGNATURE
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              style={{ y: shouldReduceMotion ? 0 : y2 }}
              className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(217,119,6,0.15)] border border-amber-900/40 group"
            >
              <Image 
                src={imageUrl} 
                alt={dishName} 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
            </motion.div>
            
            {/* Rotating Badge */}
            {!shouldReduceMotion && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -right-8 w-32 h-32 md:w-40 md:h-40 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-400/30 flex items-center justify-center shadow-2xl z-20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200 opacity-80">
                  <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[12px] font-bold tracking-widest uppercase">
                    <textPath href="#curve" startOffset="0%">
                      • Chef's Special • Handcrafted • Premium Quality
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            )}
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-amber-500 uppercase tracking-[0.3em] font-semibold text-sm mb-4 flex items-center gap-3">
                <span className="w-12 h-px bg-amber-500/50"></span>
                {title}
              </p>
              <h2 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 mb-8 leading-tight drop-shadow-lg">
                {dishName}
              </h2>
              <p className="text-amber-100/70 font-serif text-xl leading-relaxed italic mb-12 relative">
                <span className="text-6xl text-amber-900/40 absolute -top-4 -left-6 font-serif opacity-50">"</span>
                {description}
              </p>

              <div className="bg-stone-900/40 p-8 rounded-3xl border border-stone-800/50 backdrop-blur-sm relative overflow-hidden group hover:border-amber-900/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-amber-100 uppercase tracking-widest text-sm font-bold mb-6 border-b border-stone-700/50 pb-4 relative z-10">
                  Key Ingredients
                </p>
                <ul className="grid grid-cols-2 gap-y-4 gap-x-2 relative z-10">
                  {ingredients.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-300 font-sans hover:text-amber-200 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
