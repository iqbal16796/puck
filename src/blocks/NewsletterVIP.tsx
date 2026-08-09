"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Auroras, MagneticButton, RevealText } from "./artisanPrimitives";

export type NewsletterVIPProps = {
  title: string;
  subtitle: string;
  placeholderText: string;
  buttonText?: string;
};

export const NewsletterVIP = ({ title, subtitle, placeholderText, buttonText = "Join" }: NewsletterVIPProps) => {
  return (
    <section className="grain relative py-24 bg-[#0e0407] w-full border-t border-[#3a0f1c] overflow-hidden">
      <Auroras intensity={12} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <RevealText>
          <div className="bg-[#170609] p-12 md:p-20 border border-[#3a0f1c] relative overflow-hidden rounded-sm">
            {/* Subtle gold glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <p className="eyebrow mb-4 text-amber-400">Members Only</p>
              <h2 className="font-display text-3xl md:text-4xl text-gradient-cream mb-4">
                {title}
              </h2>
              <p className="font-display italic text-[#b89a95] mb-10 max-w-lg mx-auto">
                {subtitle}
              </p>

              <form
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={placeholderText}
                  className="w-full rounded-full bg-[#0e0407] border border-[#5c1d2e] text-[#f3e6d3] px-6 py-4 focus:outline-none focus:border-amber-500/70 transition-colors font-display placeholder:text-[#7a5a55]"
                  required
                />
                <MagneticButton className="w-full sm:w-auto whitespace-nowrap">
                  {buttonText} <ArrowRight size={18} />
                </MagneticButton>
              </form>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
};
