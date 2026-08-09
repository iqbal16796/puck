"use client";
import React, { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type ContactFooterProps = {
  email: string;
  tagline?: string;
  copyrightName?: string;
  socialLinks: { platform: string; url: string }[];
};

const GLYPHS = "#%&_+=<>/\\[]{}*^~?";

/** Scrambles into random glyphs on hover, then resolves back to the real text. */
function useHoverScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const reduce = useReducedMotion();

  const trigger = () => {
    if (reduce) return;
    let frame = 0;
    const totalFrames = 10;
    const tick = setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => (ch === " " || ch === "@" || ch === "." ? ch : i < revealCount ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(tick);
      }
    }, 35);
  };

  return { display, trigger };
}

export const ContactFooter = ({ email, tagline = "Got an idea?", copyrightName, socialLinks = [] }: ContactFooterProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const { display: emailDisplay, trigger } = useHoverScramble(email);

  return (
    <section ref={ref} className="grain relative w-full min-h-[100svh] py-32 bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
      <span className="pointer-events-none absolute left-6 top-8 text-[#d7ff3f]/50 text-lg select-none">+</span>
      <span className="pointer-events-none absolute right-6 top-8 text-[#d7ff3f]/50 text-lg select-none">+</span>

      <motion.div
        style={{ scale, opacity }}
        className="text-center w-full px-6 flex flex-col items-center justify-center h-full relative z-10"
      >
        <p className="eyebrow text-[#d7ff3f] mb-12">
          {tagline}
        </p>

        <motion.a
          href={`mailto:${email}`}
          onMouseEnter={trigger}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-block group"
        >
          <h2 className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-[#d7ff3f] drop-shadow-2xl">
            Let&apos;s Create
          </h2>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#d7ff3f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
          <p className="mt-8 font-mono text-lg md:text-2xl tracking-wide text-neutral-400 group-hover:text-[#d7ff3f] transition-colors duration-300">
            {emailDisplay}
          </p>
        </motion.a>

        <div className="absolute bottom-12 w-full flex flex-col md:flex-row justify-between items-center px-12 gap-6 text-sm uppercase tracking-widest font-semibold">
          <p className="text-neutral-500">© {new Date().getFullYear()} {copyrightName || "All Rights Reserved"}</p>
          <div className="flex gap-8">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={`text-white hover:text-[#d7ff3f] transition-colors ${i % 2 === 1 ? "md:-translate-y-1" : ""}`}
                target="_blank"
                rel="noreferrer"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
