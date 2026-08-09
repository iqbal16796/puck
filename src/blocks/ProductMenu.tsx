"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Auroras, RevealText, Spotlight, useSpotlight } from "./artisanPrimitives";

export type Product = {
  title: string;
  price: string;
  description: string;
  category: string;
};

export type ProductMenuProps = {
  categories: string[];
  products: Product[];
  currencySymbol: string;
};

const ProductCard = ({
  product,
  currencySymbol,
  i,
}: {
  product: Product;
  currencySymbol: string;
  i: number;
}) => {
  const { onMouseMove, background } = useSpotlight(420, 0.22);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
      transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/60 p-8 backdrop-blur-md transition-colors hover:border-amber-500/40"
    >
      <Spotlight background={background} />
      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
        <h3 className="font-display text-2xl leading-tight text-amber-50 transition-colors group-hover:text-amber-400">
          {product.title}
        </h3>
        <span className="whitespace-nowrap rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-lg font-semibold text-amber-500">
          {currencySymbol}
          {product.price}
        </span>
      </div>
      <p className="relative z-10 leading-relaxed text-stone-400">{product.description}</p>
      <span className="relative z-10 mt-2 self-start rounded-md bg-stone-800 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-amber-200/80">
        {product.category}
      </span>
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
};

export const ProductMenu = ({
  categories = [],
  products = [],
  currencySymbol = "$",
}: ProductMenuProps) => {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories];
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="menu" className="grain relative w-full overflow-hidden bg-stone-950 py-32">
      <Auroras intensity={16} />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-6">
        <RevealText className="text-center">
          <p className="eyebrow text-amber-500 mb-5">The Counter</p>
          <h2 className="font-display text-5xl tracking-tight text-gradient-cream md:text-7xl">
            Today&apos;s Fresh Bakes
          </h2>
        </RevealText>

        <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 p-2 backdrop-blur-md">
          {tabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`relative rounded-full px-7 py-3 text-sm font-medium transition-colors ${
                active === cat ? "text-stone-950" : "text-stone-400 hover:text-amber-50"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="activeCat"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-ember shadow-ember"
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-4 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard
                key={`${product.category}-${product.title}`}
                product={product}
                currencySymbol={currencySymbol}
                i={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
