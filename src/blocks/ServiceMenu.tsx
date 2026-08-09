"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMirrorSpotlight, MirrorSpotlight } from "./salonPrimitives";
import { RevealText } from "./artisanPrimitives";

export type ServiceMenuProps = {
  categories: string[];
  services: { title: string; price: string; description: string; category: string }[];
  currencySymbol: string;
};

type ServiceItem = { title: string; price: string; description: string; category: string };

const ServiceCard = ({ service, currencySymbol }: { service: ServiceItem; currencySymbol: string }) => {
  const { onMouseMove, background } = useMirrorSpotlight();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, type: "spring" }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      onMouseMove={onMouseMove}
      className="group relative p-8 rounded-3xl bg-[#241019]/70 border border-[#e8d0a0]/15 backdrop-blur-md flex flex-col justify-between gap-4 hover:border-rose-400/40 transition-colors w-full cursor-pointer shadow-[0_30px_60px_-30px_rgba(0,0,0,0.65)] overflow-hidden"
    >
      <MirrorSpotlight background={background} />
      <div className="relative z-10 flex justify-between items-start gap-4">
        <h3 className="text-xl font-display italic text-rose-50">{service.title}</h3>
        <span className="px-3 py-1 bg-[#e8d0a0]/10 text-[#e8d0a0] font-semibold text-sm rounded-full whitespace-nowrap border border-[#e8d0a0]/25">
          {currencySymbol}{service.price}
        </span>
      </div>
      <p className="relative z-10 text-rose-100/60 text-sm leading-relaxed mt-2">{service.description}</p>
    </motion.div>
  );
};

export const ServiceMenu = ({ categories = [], services = [], currencySymbol = "$" }: ServiceMenuProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "All");

  const filteredServices =
    activeCategory === "All" || !activeCategory
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section className="w-full bg-[#170b13] text-white">
      <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12">
        <RevealText className="text-center flex flex-col gap-4 w-full items-center">
          <span className="eyebrow text-[#e8d0a0]">The Menu</span>
          <h2 className="text-4xl md:text-5xl font-display italic tracking-tight text-rose-50">
            Our Services
          </h2>
        </RevealText>

        {categories && categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#241019]/60 border border-[#e8d0a0]/15 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory("All")}
              className="relative px-6 py-2.5 text-sm font-medium transition-colors z-10"
            >
              {activeCategory === "All" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-rose-600 to-[#5b1f45] rounded-full shadow-[0_0_20px_rgba(139,26,84,0.55)] -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className={activeCategory === "All" ? "text-rose-50" : "text-rose-100/50 hover:text-rose-100"}>
                All
              </span>
            </button>

            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className="relative px-6 py-2.5 text-sm font-medium transition-colors z-10"
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-rose-600 to-[#5b1f45] rounded-full shadow-[0_0_20px_rgba(139,26,84,0.55)] -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className={activeCategory === cat ? "text-rose-50" : "text-rose-100/50 hover:text-rose-100"}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <ServiceCard key={`${service.title}-${service.category}`} service={service} currencySymbol={currencySymbol} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
