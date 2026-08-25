"use client";

import React from "react";
import { WellnessReveal } from "./WellnessMotion";

export interface WellnessFooterProps {
  brandName: string;
  links: {
    label: string;
    href: string;
  }[];
  socials: {
    label: string;
    href: string;
  }[];
  copyright: string;
}

export const WellnessFooter = ({
  brandName,
  links,
  socials,
  copyright,
}: WellnessFooterProps) => {
  return (
    <footer className="bg-stone-950 pt-32 pb-8 overflow-hidden relative">
      
      {/* Huge Typography */}
      <div className="w-full text-center px-4 -mt-16 mb-20 pointer-events-none select-none overflow-hidden relative z-0">
        <WellnessReveal direction="up" duration={1200}>
          <h2 
            className="font-serif text-stone-900 leading-[0.8] tracking-tighter"
            style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
          >
            {brandName}
          </h2>
        </WellnessReveal>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-stone-800/50 pt-16">
          
          <div className="md:col-span-6 lg:col-span-8">
            <WellnessReveal delay={100} direction="up">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-6">Explore</h3>
                  <ul className="space-y-4">
                    {links.slice(0, Math.ceil(links.length / 2)).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.href} className="text-stone-400 hover:text-stone-100 transition-colors text-lg font-serif">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-6">Connect</h3>
                  <ul className="space-y-4">
                    {links.slice(Math.ceil(links.length / 2)).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.href} className="text-stone-400 hover:text-stone-100 transition-colors text-lg font-serif">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-6">Social</h3>
                  <ul className="space-y-4">
                    {socials.map((social, idx) => (
                      <li key={idx}>
                        <a href={social.href} className="text-stone-400 hover:text-stone-100 transition-colors text-lg font-serif">
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </WellnessReveal>
          </div>
          
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end items-start md:items-end mt-12 md:mt-0">
            <WellnessReveal delay={300} direction="up">
              <p className="text-stone-600 text-xs tracking-widest uppercase">
                {copyright}
              </p>
            </WellnessReveal>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
