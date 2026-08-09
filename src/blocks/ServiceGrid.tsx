"use client";
import React from "react";
import { motion } from "framer-motion";
import { Droplet, Wrench, ThermometerSun, ShieldCheck } from "lucide-react";
import { CrispIn } from "./plumberPrimitives";

export type ServiceGridProps = {
  title: string;
  subtitle: string;
  services: { title: string; description: string; icon: string }[];
};

const iconMap: Record<string, React.ReactNode> = {
  Droplet: <Droplet size={30} />,
  Wrench: <Wrench size={30} />,
  ThermometerSun: <ThermometerSun size={30} />,
  ShieldCheck: <ShieldCheck size={30} />
};

export const ServiceGrid = ({ title, subtitle, services = [] }: ServiceGridProps) => {
  return (
    <section className="grain py-24 bg-slate-950 w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/[0.06] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 max-w-3xl">
          <CrispIn>
            <span className="eyebrow text-orange-500 mb-3 block">What We Fix</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight uppercase">
              {title}
            </h2>
          </CrispIn>
          <CrispIn delay={0.08}>
            <p className="text-lg text-slate-400 leading-relaxed">{subtitle}</p>
          </CrispIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-2xl p-8 flex flex-col gap-6 transition-colors duration-300 group shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.35)]"
            >
              <div className="relative w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-orange-500 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <span className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/40 group-hover:animate-ping" />
                {iconMap[service.icon] || <Wrench size={30} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/0 group-hover:via-orange-500/60 to-transparent transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
