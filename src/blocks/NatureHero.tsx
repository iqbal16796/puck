"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Auroras, KineticHeadline, MagneticButton } from "./artisanPrimitives";

export type NatureHeroProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  imageUrl: string;
};

export const NatureHero = ({
  headline,
  subheadline,
  buttonText,
  imageUrl,
}: NatureHeroProps) => {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#F7F4F0] flex items-center overflow-hidden">
      <Auroras intensity={25} />
      <div className="grain opacity-50" />
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col-reverse md:flex-row items-center gap-16 py-20">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start"
          >
            <p className="eyebrow text-[#849271] mb-6">
              {subheadline}
            </p>
            <KineticHeadline 
              text={headline} 
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#4A4238] leading-tight mb-8 !text-left !justify-start [&>span>span>span]:!text-[#4A4238] [&>span>span>span]:!drop-shadow-none"
            />
            <MagneticButton className="!bg-[#849271] !text-white !shadow-none hover:!bg-[#6f7c5e]">
              {buttonText}
            </MagneticButton>
          </motion.div>
        </div>

        {/* Organic Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="w-[85%] aspect-square relative"
          >
            {/* Organic Shape Blob */}
            <div 
              className="absolute inset-0 overflow-hidden transition-transform duration-1000 hover:scale-105 shadow-2xl z-10"
              style={{ 
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" 
              }}
            >
              <Image 
                src={imageUrl} 
                alt={headline} 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Background Blob decoration */}
            <div 
              className="absolute inset-0 bg-[#e6ceb8] -z-10 blur-xl opacity-60 translate-x-8 translate-y-8"
              style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
