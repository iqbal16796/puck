"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { ShieldCheck, Zap, Users, Target } from "lucide-react";
import { TiltCard } from "../animations/TiltCard";

export interface WhyChooseUsProps {
  title: string;
  subtitle: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const WhyChooseUs = ({ title, subtitle, features }: WhyChooseUsProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck": return <ShieldCheck className="h-6 w-6" />;
      case "Zap": return <Zap className="h-6 w-6" />;
      case "Users": return <Users className="h-6 w-6" />;
      case "Target": return <Target className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            {subtitle}
          </p>
        </Reveal>

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <StaggerItem key={idx}>
              <TiltCard intensity={3} className="h-full">
                <div className="group h-full rounded-[2rem] border border-slate-200 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 group-hover:bg-blue-100 group-hover:rotate-3">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};