"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Auroras, RevealText } from "./artisanPrimitives";

export type VideoTestimonialProps = {
  title: string;
  videoUrl: string;
  quote: string;
  author: string;
  authorRole?: string;
};

export const VideoTestimonial = ({ title, videoUrl, quote, author, authorRole }: VideoTestimonialProps) => {
  return (
    <section className="py-24 bg-[#E2E8DE] w-full flex justify-center overflow-hidden relative">
      <Auroras intensity={25} />
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Floating Video/Image Pill */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 h-96 md:w-80 md:h-[500px] rounded-[100px] overflow-hidden shadow-2xl border-8 border-white bg-zinc-200 relative shadow-[0_25px_70px_-15px_rgba(132,146,113,0.45)]"
          >
            <Image 
              src={videoUrl} 
              alt="Testimonial Video"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Play Button Overlay (Visual Only) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-[#849271] border-b-8 border-b-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <RevealText>
            <h2 className="eyebrow text-[#849271] mb-8">{title}</h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-3xl md:text-4xl font-serif text-[#4A4238] leading-tight mb-8">
              "{quote}"
            </p>
          </RevealText>
          <RevealText delay={0.4}>
            <p className="text-[#756a5c] italic text-lg">
              — {author}
              {authorRole && <span className="block not-italic text-sm text-[#849271] mt-1 tracking-widest uppercase">{authorRole}</span>}
            </p>
          </RevealText>
        </div>

      </div>
    </section>
  );
};
