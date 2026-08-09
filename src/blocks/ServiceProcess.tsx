"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Truck, CheckCircle2 } from "lucide-react";
import { CrispIn } from "./plumberPrimitives";

export type ServiceProcessProps = {
  title: string;
  steps: { title: string; description: string; icon: string }[];
};

const iconMap: Record<string, React.ReactNode> = {
  Phone: <Phone size={28} />,
  Truck: <Truck size={28} />,
  CheckCircle2: <CheckCircle2 size={28} />
};

export const ServiceProcess = ({ title, steps = [] }: ServiceProcessProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-slate-50 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <CrispIn className="mb-20 text-center">
          <span className="eyebrow text-orange-600 mb-3 block">The Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            {title}
          </h2>
        </CrispIn>

        <div ref={containerRef} className="relative flex flex-col gap-12 md:gap-24">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2 rounded-full overflow-hidden z-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-orange-600 to-orange-400 rounded-full"
            />
          </div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:text-left" : "md:text-right"}`}
                >
                  <span className="text-orange-600 font-black text-xl mb-2 block tracking-tight">Step 0{index + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                </motion.div>

                {/* Icon Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ rotate: [0, -18, 18, -10, 0] }}
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-white border-[3px] border-orange-600 rounded-full flex items-center justify-center text-orange-600 shadow-[0_16px_40px_-16px_rgba(249,115,22,0.5)] z-10"
                >
                  {iconMap[step.icon] || <CheckCircle2 size={28} />}
                </motion.div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
