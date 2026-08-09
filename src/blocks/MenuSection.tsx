"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealText, Spotlight, useSpotlight } from "./artisanPrimitives";

export type MenuSectionProps = {
  title: string;
  categories: string[];
  items: { name: string; description: string; price: string; category: string }[];
};

const MenuRow = ({ item, index }: { item: MenuSectionProps["items"][number]; index: number }) => {
  const { onMouseMove, background } = useSpotlight(320, 0.16);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden rounded-2xl px-5 py-6 -mx-5 transition-colors hover:bg-[#2b0a12]/40"
    >
      <Spotlight background={background} />
      <div className="relative z-10 flex items-end gap-4">
        <h3 className="whitespace-nowrap font-display text-xl md:text-2xl text-[#f3e6d3] transition-colors duration-300 group-hover:text-amber-300">
          {item.name}
        </h3>
        <div className="relative top-[-6px] mx-2 flex-grow border-b-2 border-dotted border-[#5c1d2e] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="whitespace-nowrap text-lg font-medium text-amber-400">
          {item.price}
        </span>
      </div>
      <p className="relative z-10 mt-2 max-w-xl font-display italic text-[#b89a95]">
        {item.description}
      </p>
    </motion.div>
  );
};

export const MenuSection = ({ title, categories = [], items = [] }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "All");

  const filteredItems = activeCategory === "All" || !activeCategory
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <section className="grain relative py-32 bg-[#170609] w-full text-[#f3e6d3] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <RevealText className="text-center mb-20">
          <p className="eyebrow mb-4 text-amber-400">Tasting Menu</p>
          <h2 className="font-display text-4xl md:text-5xl mb-8 text-gradient-cream">
            {title}
          </h2>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 border-b border-[#3a0f1c] pb-6">
              <button
                onClick={() => setActiveCategory("All")}
                className="relative pb-2 uppercase tracking-[0.2em] text-xs font-semibold text-[#c9a9a0] transition-colors hover:text-amber-300"
              >
                <span className={activeCategory === "All" ? "text-amber-400" : ""}>All</span>
                {activeCategory === "All" && (
                  <motion.span
                    layoutId="menuTabUnderline"
                    className="absolute -bottom-[26px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className="relative pb-2 uppercase tracking-[0.2em] text-xs font-semibold text-[#c9a9a0] transition-colors hover:text-amber-300"
                >
                  <span className={activeCategory === cat ? "text-amber-400" : ""}>{cat}</span>
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="menuTabUnderline"
                      className="absolute -bottom-[26px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </RevealText>

        <motion.div layout className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <MenuRow key={`${item.category}-${item.name}-${index}`} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
