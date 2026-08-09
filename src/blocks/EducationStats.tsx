"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { AnimatedCounter } from "../animations/AnimatedCounter";
import { Users, BookOpen, Trophy, Globe } from "lucide-react";
import { TiltCard } from "../animations/TiltCard";

export interface EducationStatsProps {
  stats: {
    label: string;
    value: number;
    suffix?: string;
    icon: string;
  }[];
}

export const EducationStats = ({ stats }: EducationStatsProps) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Users": return <Users className="h-6 w-6" />;
      case "BookOpen": return <BookOpen className="h-6 w-6" />;
      case "Trophy": return <Trophy className="h-6 w-6" />;
      case "Globe": return <Globe className="h-6 w-6" />;
      default: return <Users className="h-6 w-6" />;
    }
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Stagger className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <StaggerItem key={idx}>
              <TiltCard intensity={2}>
                <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-100 border border-transparent">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-150" />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="relative z-10 mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                  </div>
                  <div className="relative z-10 mt-2 text-sm font-semibold text-slate-500">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};