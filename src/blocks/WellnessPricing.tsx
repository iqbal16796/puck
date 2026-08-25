"use client";

import React from "react";
import { WellnessReveal, WellnessMagnetic } from "./WellnessMotion";

export interface WellnessPricingProps {
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    featured: boolean;
  }[];
}

export const WellnessPricing = ({ plans }: WellnessPricingProps) => {
  return (
    <section className="bg-stone-50 py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        
        <WellnessReveal>
          <div className="text-center mb-24">
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-stone-900 leading-none">
              MEMBERSHIPS
            </h2>
          </div>
        </WellnessReveal>
        
        <div className="flex flex-col gap-6">
          {plans.map((plan, idx) => (
            <WellnessReveal key={idx} delay={idx * 150} direction="up" duration={800}>
              <div 
                className={`group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 cursor-pointer overflow-hidden ${
                  plan.featured 
                    ? "bg-stone-950 text-white shadow-2xl hover:scale-[1.02]" 
                    : "bg-white text-stone-900 border border-stone-200 hover:shadow-xl hover:scale-[1.01]"
                }`}
              >
                {/* Featured glowing background elements */}
                {plan.featured && (
                  <>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 animate-wellnessBreathe pointer-events-none" />
                    <div className="absolute inset-0 rounded-[2.5rem] border border-emerald-500/30 pointer-events-none" />
                  </>
                )}
                
                <div className="md:w-1/3 relative z-10">
                  {plan.featured && (
                    <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6 border border-emerald-500/20">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-serif text-4xl">{plan.name}</h3>
                  <p className={`mt-4 text-sm tracking-wide ${plan.featured ? "text-stone-400" : "text-stone-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="md:w-1/3 mt-8 md:mt-0 relative z-10">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`flex items-start text-sm tracking-wide ${plan.featured ? "text-stone-300" : "text-stone-600"}`}>
                        <span className={`mr-3 mt-1 text-[10px] ${plan.featured ? "text-emerald-400" : "text-emerald-600"}`}>✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-1/4 mt-12 md:mt-0 flex flex-col items-start md:items-end relative z-10">
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-light tracking-tight">{plan.price}</span>
                    <span className={`text-xs tracking-widest uppercase ${plan.featured ? "text-stone-500" : "text-stone-400"}`}>{plan.period}</span>
                  </div>
                  
                  <WellnessMagnetic>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      plan.featured
                        ? "bg-emerald-500 text-stone-950 group-hover:bg-emerald-400"
                        : "bg-stone-900 text-white group-hover:bg-emerald-600"
                    }`}>
                      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">
                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </WellnessMagnetic>
                </div>

              </div>
            </WellnessReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
