"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonoMagnetic } from "./clothingPrimitives";

/**
 * Clothing-only fork of MegaFooter.tsx. MegaFooter is shared (via
 * globalBlocks.tsx) with ayurvedic/craft/plumber/lawyer/portfolio/restaurant,
 * so this stark black/white/ecru redesign lives here instead, leaving the
 * shared original untouched. Prop shape matches MegaFooterProps exactly so
 * clothing.config.tsx's fields/defaultProps stay valid.
 */
export type MegaFooterProps = {
  brandName: string;
  newsletterHeadline: string;
  socialLinks: { platform: string; url: string }[];
};

const initialMap: Record<string, string> = {
  Instagram: "IG",
  Twitter: "TW",
  Linkedin: "LI",
  Facebook: "FB",
};

export const MegaFooter = ({ brandName, newsletterHeadline, socialLinks = [] }: MegaFooterProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  // Slow parallax float for the massive brand name
  const y = useTransform(scrollYProgress, [0, 1], [-160, 0]);

  return (
    <footer ref={container} className="relative w-full h-[100vh] bg-black text-white overflow-hidden flex flex-col justify-between pt-24 border-t border-[#C9BFA6]/30">
      {/* Top Section */}
      <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
        {/* Newsletter */}
        <div className="w-full md:w-1/2">
          <p className="eyebrow text-[#C9BFA6] mb-6">Join the List</p>
          <h3 className="text-3xl md:text-5xl font-serif font-light mb-10 max-w-lg leading-tight tracking-tight">
            {newsletterHeadline}
          </h3>
          <div className="flex border-b border-white/30 pb-4 max-w-md group focus-within:border-white transition-colors duration-500">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full outline-none text-lg placeholder:text-white/40 font-light"
            />
            <button className="uppercase text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-500 group-focus-within:translate-x-1">
              Submit
            </button>
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-4 flex-wrap">
          {socialLinks.map((link, idx) => (
            <MonoMagnetic
              key={idx}
              as="a"
              href={link.url}
              strength={0.3}
              ariaLabel={link.platform}
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-[11px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500"
            >
              {initialMap[link.platform] || link.platform.slice(0, 2).toUpperCase()}
            </MonoMagnetic>
          ))}
        </div>
      </div>

      {/* Massive Brand Name at the bottom */}
      <div className="w-full overflow-hidden flex justify-center items-end mt-auto pointer-events-none select-none h-[40vh]">
        <motion.h1
          style={{ y }}
          className="text-[15vw] font-serif font-light tracking-tighter leading-[0.8] text-white/90 whitespace-nowrap"
        >
          {brandName}
        </motion.h1>
      </div>

      {/* Footer Bottom Bar */}
      <div className="w-full border-t border-white/10 py-6 text-center text-white/40 text-xs uppercase tracking-[0.2em] z-10 relative bg-black">
        <p>&copy; {new Date().getFullYear()} {brandName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
