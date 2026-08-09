"use client";
import React from "react";
import { motion } from "framer-motion";
import { MonoMagnetic } from "./clothingPrimitives";

export type FeaturedApparelProps = {
  title: string;
  products: {
    name: string;
    price: string;
    primaryImage: string;
    secondaryImage: string;
  }[];
};

export const FeaturedApparel = ({ title, products = [] }: FeaturedApparelProps) => {
  return (
    <section className="py-28 bg-white w-full text-zinc-950">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-20 border-b border-zinc-200 pb-8">
          <div>
            <p className="eyebrow text-[#8a8272] mb-4">The Collection</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight">{title}</h2>
          </div>
          <MonoMagnetic
            as="a"
            href="#"
            strength={0.3}
            className="uppercase tracking-[0.25em] text-xs font-medium hover:opacity-60 transition-opacity border-b border-black pb-1 hidden md:inline-flex"
          >
            View All
          </MonoMagnetic>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-zinc-100">
                <span className="absolute top-4 left-4 z-10 text-xs tracking-widest text-white/80 font-light mix-blend-difference">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Primary Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                  style={{ backgroundImage: `url(${product.primaryImage})` }}
                />
                {/* Secondary Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-[900ms] ease-in-out group-hover:opacity-100 group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${product.secondaryImage})` }}
                />
              </div>

              <div className="flex justify-between items-start gap-4">
                <h3 className="font-serif text-lg tracking-wide">{product.name}</h3>
                <p className="text-zinc-500 font-serif italic">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
