"use client";

import React from "react";
import { Check } from "lucide-react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { MagneticElement } from "../animations/MagneticElement";
import { TiltCard } from "../animations/TiltCard";
import { FloatingOrbs } from "../animations/FloatingOrbs";

export interface PricingPlansProps {
  title: string;
  subtitle: string;
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isPopular: boolean;
    ctaText: string;
  }[];
}

export const PricingPlans = ({ title, subtitle, plans }: PricingPlansProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 text-white">
      <FloatingOrbs />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </Reveal>

        <Stagger className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <StaggerItem key={plan.name}>
              <TiltCard intensity={2} className="h-full">
                <div className={`relative flex h-full flex-col rounded-3xl p-8 backdrop-blur-sm border ${
                  plan.isPopular 
                    ? "bg-gradient-to-b from-blue-900/50 to-slate-900 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)]" 
                    : "bg-white/[0.03] border-white/10"
                }`}>
                  {plan.isPopular && (
                    <div className="absolute -top-4 inset-x-0 mx-auto w-fit rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                      <span className="text-sm font-medium text-slate-400">{plan.period}</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">{plan.description}</p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-blue-400" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <MagneticElement as="a" href="#checkout" intensity={plan.isPopular ? 0.2 : 0}>
                    <div className={`w-full rounded-xl py-3 text-center text-sm font-bold transition-all ${
                      plan.isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}>
                      {plan.ctaText}
                    </div>
                  </MagneticElement>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};