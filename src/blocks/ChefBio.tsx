"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export type ChefBioProps = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  signatureText: string;
};

export const ChefBio = ({ name, title, bio, imageUrl, signatureText }: ChefBioProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-cream py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Image side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 relative"
        >
          <motion.div 
            animate={{ y: shouldReduceMotion ? 0 : [0, -10, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl z-10 border border-amber-100"
          >
            <Image 
              src={imageUrl} 
              alt={name} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent mix-blend-overlay pointer-events-none" />
          </motion.div>
          {/* Decorative shapes */}
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-100 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Text side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col"
        >
          <h4 className="text-amber-600 font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500 inline-block"></span>
            {title}
          </h4>
          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-orange-600 to-amber-900 bg-[length:200%_auto] animate-shine">{name}</h2>
          
          <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
            {bio.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="w-16 h-px bg-amber-300" />
            <div className="font-signature text-4xl text-amber-900/60 tracking-wider">
              {signatureText}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
