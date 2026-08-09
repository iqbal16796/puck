"use client";
import React from "react";
import { motion } from "framer-motion";

export type ClientLogosProps = {
  title: string;
  logos: { name: string; url: string }[];
};

export const ClientLogos = ({ title, logos = [] }: ClientLogosProps) => {
  return (
    <section className="py-24 bg-neutral-100 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16">
          <p className="eyebrow text-[#8fb800] mb-4">
            {title}
          </p>
          <div className="w-12 h-0.5 bg-neutral-950" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center">
          {logos.map((logo, index) => {
            const rotate = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-0" : "rotate-2";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`w-32 md:w-40 h-20 relative group flex items-center justify-center ${rotate} hover:rotate-0 transition-transform duration-300`}
              >
                <div className="absolute inset-0 border border-transparent group-hover:border-[#8fb800]/50 transition-colors duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="w-full h-full object-contain p-3 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
