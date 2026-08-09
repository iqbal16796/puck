"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "./artisanPrimitives";
import { ClayGlow, WobbleButton } from "./craftPrimitives";

export type MakerHeroProps = {
  makerName: string;
  headline: string;
  description: string;
  imageUrl: string;
};

/** Headline that settles into place word by word with a faint, hand-set tilt. */
const HandsetHeadline = ({ text }: { text: string }) => {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <h1 className="font-display flex flex-wrap gap-x-4 gap-y-1 text-5xl font-medium leading-[1.05] tracking-tight text-[#3E2B1E] md:text-7xl">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: reduce ? 0 : 24, rotate: reduce ? 0 : (i % 2 === 0 ? -3 : 3) }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block bg-gradient-to-br from-[#7C3F2E] via-[#B5563C] to-[#C97B4A] bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

export const MakerHero = ({
  makerName,
  headline,
  description,
  imageUrl,
}: MakerHeroProps) => {
  return (
    <section className="grain relative w-full min-h-[92vh] bg-[#F6F1E7] flex flex-col md:flex-row overflow-hidden border-b-[10px] border-[#6B4A35]">
      <ClayGlow className="opacity-70" />

      {/* Text Half */}
      <div className="relative z-10 w-full md:w-1/2 p-10 sm:p-14 md:p-20 lg:p-24 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-[#A6482E] mb-5 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#A6482E]/50" />
          Handcrafted · Small Batch
        </motion.p>

        <HandsetHeadline text={headline} />

        <RevealText delay={0.35} className="mt-8 max-w-lg">
          <p className="font-serif text-lg leading-relaxed text-[#5B4A3C]">
            {description}
          </p>
        </RevealText>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <WobbleButton
            as="a"
            href="#gallery"
            className="rounded-full bg-[#3E2B1E] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F6F1E7] shadow-[0_18px_45px_-16px_rgba(62,43,30,0.55)]"
          >
            Shop the Collection
          </WobbleButton>
          <span className="font-signature text-2xl text-[#8C5A3C]">— {makerName}</span>
        </motion.div>
      </div>

      {/* Image Half */}
      <div className="relative z-10 w-full md:w-1/2 h-[46vh] md:h-auto p-6 sm:p-10 md:p-14 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          whileHover={{ rotate: 0, scale: 1.015 }}
          className="grain relative h-full w-full max-w-xl overflow-hidden rounded-sm border-[10px] border-[#EDE4D3] shadow-[0_30px_70px_-24px_rgba(62,43,30,0.45)]"
        >
          <Image
            src={imageUrl}
            alt={`${makerName} — handmade work`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#A6482E]/10 mix-blend-multiply" />
        </motion.div>
      </div>
    </section>
  );
};
