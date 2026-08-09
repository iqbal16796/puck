"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Auroras } from "./artisanPrimitives";

export type ContactFooterProps = {
  email: string;
  tagline?: string;
  copyrightName?: string;
  socialLinks: { platform: string; url: string }[];
};

export const ContactFooter = ({
  email,
  tagline = "Got a craving?",
  copyrightName,
  socialLinks = [],
}: ContactFooterProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);

  return (
    <footer
      ref={ref}
      className="grain relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden border-t border-stone-800 bg-stone-950 py-32"
    >
      <Auroras intensity={14} />

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 flex w-full flex-col items-center px-6 text-center"
      >
        <p className="eyebrow text-amber-500 mb-12 tracking-[0.5em]">{tagline}</p>
        <motion.a
          href={`mailto:${email}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-block"
        >
          <h2 className="font-display text-[clamp(3.5rem,11vw,12rem)] font-black uppercase leading-[0.85] tracking-tighter text-gradient-cream">
            Let&apos;s Talk
          </h2>
          <span className="absolute -bottom-4 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.a>
        <a
          href={`mailto:${email}`}
          className="mt-10 text-sm uppercase tracking-[0.3em] text-stone-400 transition-colors hover:text-amber-500"
        >
          {email}
        </a>
      </motion.div>

      <div className="absolute bottom-10 z-10 flex w-full flex-col items-center justify-between gap-6 px-8 text-xs uppercase tracking-[0.25em] text-stone-500 md:flex-row md:px-12">
        <p>
          © {new Date().getFullYear()} {copyrightName || "All Rights Reserved"}
        </p>
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 transition-colors hover:text-amber-500"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
