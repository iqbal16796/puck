"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { RevealText } from "./artisanPrimitives";

export type TestimonialItem = {
  quote: string;
  customerName: string;
  starRating: number;
  avatarUrl?: string;
};

export type TestimonialProps = {
  testimonials: TestimonialItem[];
};

export const Testimonial = ({ testimonials = [] }: TestimonialProps) => {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-24 bg-[#170b13] flex flex-col justify-center overflow-hidden text-white">
      <RevealText className="mb-16 text-center flex flex-col items-center gap-4">
        <span className="eyebrow text-[#e8d0a0]">Client Love</span>
        <h2 className="text-4xl md:text-5xl font-display italic tracking-tight text-rose-50">
          Reflections
        </h2>
      </RevealText>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#170b13] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#170b13] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-8 px-4 w-max"
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="relative w-[350px] md:w-[450px] flex-shrink-0 p-8 md:p-10 rounded-3xl bg-[#241019]/80 border border-[#e8d0a0]/15 flex flex-col items-center gap-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] whitespace-normal"
            >
              <div className="absolute top-6 left-6 text-[#e8d0a0]/20">
                <Quote size={48} className="rotate-180" />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6 w-full text-center">
                <div className="flex items-center justify-center gap-1 text-[#e8d0a0]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < (testimonial.starRating || 5) ? "fill-[#e8d0a0] drop-shadow-[0_0_8px_rgba(232,208,160,0.35)]" : "text-rose-100/15"}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl font-light text-rose-50 leading-relaxed italic font-display">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {testimonial.avatarUrl ? (
                    <img src={testimonial.avatarUrl} alt={testimonial.customerName} className="w-12 h-12 rounded-full object-cover border-2 border-[#e8d0a0]/25 shadow-md" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-[#5b1f45] flex items-center justify-center text-rose-50 font-semibold text-lg border-2 border-[#e8d0a0]/20 shadow-lg">
                      {testimonial.customerName.charAt(0)}
                    </div>
                  )}
                  <div className="text-left flex flex-col justify-center">
                    <p className="text-base font-medium text-rose-50 m-0 leading-tight">{testimonial.customerName}</p>
                    <p className="text-xs text-rose-100/45 uppercase tracking-widest m-0 leading-tight mt-1">Verified Client</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
