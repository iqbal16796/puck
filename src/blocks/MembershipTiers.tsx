"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { RevealText } from "./artisanPrimitives";

export type MembershipTiersProps = {
  title: string;
  subtitle: string;
  tiers: { name: string; price: string; period: string; features: string[]; isPopular?: boolean }[];
};

export const MembershipTiers = ({ title, subtitle, tiers = [] }: MembershipTiersProps) => {
  return (
    <section className="py-24 bg-zinc-950 w-full font-sans text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-950/25 via-zinc-950 to-zinc-950" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[40vw] w-[60vw] rounded-full bg-red-600/10 blur-[150px] mix-blend-screen" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealText>
          <div className="text-center mb-20">
            <span className="eyebrow text-red-500">Membership</span>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mt-3 mb-4">
              {title}
            </h2>
            <p className="text-xl text-zinc-400 font-bold uppercase tracking-widest">
              {subtitle}
            </p>
          </div>
        </RevealText>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -1.5 : 1.5, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 110, damping: 13 }}
              whileHover={{ scale: tier.isPopular ? 1.08 : 1.02 }}
              className={`relative flex flex-col w-full max-w-sm p-8 transition-all duration-300 ${tier.isPopular ? "bg-zinc-900 border-2 border-red-600 shadow-[0_0_40px_-5px_rgba(220,38,38,0.35)] scale-105 z-10" : "bg-zinc-900/50 border border-zinc-800"}`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 font-black text-sm uppercase tracking-widest skew-x-[-10deg]">
                  Most Popular
                </div>
              )}

              <h3 className={`text-3xl font-black uppercase italic tracking-wide mb-2 ${tier.isPopular ? "text-red-500" : "text-white"}`}>
                {tier.name}
              </h3>

              <div className="flex items-end gap-1 mb-8 pb-8 border-b border-zinc-800">
                <span className="text-5xl font-black">{tier.price}</span>
                <span className="text-zinc-500 font-bold uppercase tracking-wider mb-2">/{tier.period}</span>
              </div>

              <ul className="flex flex-col gap-4 mb-10 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                    <Check size={20} className="text-lime-400 shrink-0" strokeWidth={4} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.isPopular ? (
                <motion.button
                  animate={{
                    scale: [1, 1.04, 1, 1.03, 1],
                    boxShadow: [
                      "0 0 0px rgba(220,38,38,0)",
                      "0 0 30px rgba(220,38,38,0.5)",
                      "0 0 8px rgba(220,38,38,0.2)",
                      "0 0 24px rgba(220,38,38,0.4)",
                      "0 0 0px rgba(220,38,38,0)",
                    ],
                  }}
                  transition={{ duration: 1.7, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
                  className="w-full py-4 font-black uppercase tracking-widest text-lg transition-all skew-x-[-5deg] bg-red-600 text-white hover:bg-red-500"
                >
                  Join Now
                </motion.button>
              ) : (
                <button className="w-full py-4 font-black uppercase tracking-widest text-lg transition-all skew-x-[-5deg] bg-zinc-800 text-white hover:bg-zinc-700">
                  Join Now
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
