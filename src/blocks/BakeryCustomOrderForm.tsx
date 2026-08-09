"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Auroras, MagneticButton } from "./artisanPrimitives";

export type CustomOrderFormProps = {
  title: string;
  description: string;
};

export const CustomOrderForm = ({ title, description }: CustomOrderFormProps) => {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  return (
    <section
      id="order"
      className="grain relative flex w-full justify-center overflow-hidden bg-stone-950 px-6 py-32"
    >
      <Auroras intensity={18} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-4xl border border-stone-800 bg-stone-900/50 p-8 shadow-deep backdrop-blur-xl md:p-12"
      >
        <div className="pointer-events-none absolute inset-0 rounded-4xl bg-gradient-to-br from-amber-500/10 to-transparent" />

        <div className="relative z-10">
          <h2 className="mb-4 flex items-center gap-4 font-display text-4xl text-amber-50">
            <span className="h-px w-8 bg-amber-500/60" />
            {title}
          </h2>
          <p className="mb-12 font-display text-lg leading-loose text-stone-400">{description}</p>

          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Request sent", {
                description: `Thanks ${name || "friend"} — we'll reply within a day.`,
              });
              setName("");
              setRequest("");
            }}
          >
            <div className="group flex flex-col">
              <label
                htmlFor="order-name"
                className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-500/80 transition-colors group-focus-within:text-amber-500"
              >
                Your Name
              </label>
              <input
                id="order-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-stone-700 bg-stone-950/60 px-4 py-3 text-lg text-amber-50 outline-none transition-all focus:border-amber-500/60 focus:shadow-ember"
              />
            </div>

            <div className="group flex flex-col">
              <label
                htmlFor="order-request"
                className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-500/80 transition-colors group-focus-within:text-amber-500"
              >
                What should we bake?
              </label>
              <textarea
                id="order-request"
                rows={4}
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="w-full resize-none rounded-xl border border-stone-700 bg-stone-950/60 px-4 py-3 text-lg text-amber-50 outline-none transition-all focus:border-amber-500/60 focus:shadow-ember"
              />
            </div>

            <MagneticButton className="mt-2 w-full justify-center uppercase tracking-[0.2em]">
              Send Request
            </MagneticButton>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
