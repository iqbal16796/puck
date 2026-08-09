"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";

export interface UniversityPartnersProps {
  title: string;
  partners: {
    name: string;
    logo: string;
  }[];
}

export const UniversityPartners = ({ title, partners }: UniversityPartnersProps) => {
  return (
    <section className="bg-white py-16 sm:py-20 border-y border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            {title}
          </h2>
        </Reveal>

        <Stagger className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
          {partners.map((partner, idx) => (
            <StaggerItem key={idx}>
              <div className="group relative grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-10 md:h-12 w-auto object-contain opacity-50 group-hover:opacity-100"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};