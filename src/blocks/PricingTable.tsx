"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CrispIn } from "./plumberPrimitives";

export type PricingTableProps = {
  title: string;
  subtitle: string;
  plans: { name: string; price: string; features: string[]; isPopular?: boolean }[];
};

export const PricingTable = ({ title, subtitle, plans = [] }: PricingTableProps) => {
  return (
    <section className="py-24 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <CrispIn className="text-center mb-16">
          <span className="eyebrow text-orange-600 mb-3 block">Upfront Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </CrispIn>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col bg-white rounded-2xl p-8 flex-1 max-w-md mx-auto w-full transition-shadow duration-300 ${
                plan.isPopular
                  ? "border-2 border-orange-600 shadow-[0_30px_70px_-24px_rgba(249,115,22,0.45)] lg:scale-105"
                  : "border border-slate-200 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.15)]"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-md text-xs font-black tracking-widest uppercase shadow-[0_8px_20px_-6px_rgba(249,115,22,0.6)]">
                  Most Booked
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
                <span className="text-5xl font-black text-slate-900">{plan.price}</span>
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                    <span className="shrink-0 mt-0.5 rounded-full bg-orange-100 text-orange-600 p-0.5">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-wide text-sm transition-colors ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-[0_16px_40px_-16px_rgba(249,115,22,0.6)]"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                Book Service
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
