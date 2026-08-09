"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MonoMagnetic } from "./clothingPrimitives";

export type VIPPurchaseFormProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
};

export const VIPPurchaseForm = ({ title, subtitle, buttonText = "Confirm VIP Access" }: VIPPurchaseFormProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <section className="py-32 w-full bg-[#FAF9F6] flex justify-center items-center px-6">
      <div className="max-w-xl w-full relative">
        {/* Slow single-direction champagne sheen border */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(100deg, transparent 0%, #C9BFA6 35%, #8a8272 50%, #C9BFA6 65%, transparent 100%)",
            backgroundSize: "260% 100%",
          }}
          className="absolute -inset-px opacity-70"
        />

        {/* Form Container */}
        <div className="relative bg-white p-10 md:p-14 flex flex-col gap-8">
          <div className="text-center mb-4">
            <p className="eyebrow text-[#8a8272] mb-4">Private Access</p>
            <h2 className="text-3xl font-serif text-black mb-3 tracking-tight">{title}</h2>
            <p className="text-zinc-500 font-light text-sm tracking-widest uppercase">{subtitle}</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            {/* Input 1 */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedInput === "email" ? -24 : 12,
                  scale: focusedInput === "email" ? 0.85 : 1,
                  color: focusedInput === "email" ? "#000" : "#a1a1aa"
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 text-zinc-400 font-serif origin-left pointer-events-none"
              >
                Email Address
              </motion.label>
              <input
                type="email"
                onFocus={() => setFocusedInput("email")}
                onBlur={(e) => !e.target.value && setFocusedInput(null)}
                className="w-full bg-transparent border-b border-zinc-300 py-3 text-lg outline-none focus:border-black transition-colors rounded-none"
              />
            </div>

            {/* Input 2 */}
            <div className="relative mt-4">
              <motion.label
                animate={{
                  y: focusedInput === "name" ? -24 : 12,
                  scale: focusedInput === "name" ? 0.85 : 1,
                  color: focusedInput === "name" ? "#000" : "#a1a1aa"
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 text-zinc-400 font-serif origin-left pointer-events-none"
              >
                Full Name
              </motion.label>
              <input
                type="text"
                onFocus={() => setFocusedInput("name")}
                onBlur={(e) => !e.target.value && setFocusedInput(null)}
                className="w-full bg-transparent border-b border-zinc-300 py-3 text-lg outline-none focus:border-black transition-colors rounded-none"
              />
            </div>

            <MonoMagnetic
              as="button"
              strength={0.15}
              className="mt-8 w-full bg-black text-white py-5 tracking-[0.25em] uppercase text-xs font-semibold hover:bg-zinc-800 transition-colors duration-500"
            >
              {buttonText}
            </MonoMagnetic>
          </form>
        </div>
      </div>
    </section>
  );
};
