"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Auroras, MagneticButton, RevealText } from "./artisanPrimitives";

export type ReservationCTAProps = {
  headline: string;
  subheadline: string;
  buttonText: string;
  backgroundImageUrl: string;
};

export const ReservationCTA = ({ headline, subheadline, buttonText, backgroundImageUrl }: ReservationCTAProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={ref} className="grain relative w-full py-40 overflow-hidden bg-[#150508]">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y }}
        animate={reduce ? undefined : { scale: [1, 1.1] }}
        transition={reduce ? undefined : { duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Image src={backgroundImageUrl} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#150508]/75" />
      <Auroras intensity={14} />

      {mounted && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[26vw] w-[26vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_70%)] mix-blend-screen blur-2xl"
          animate={{ opacity: [0.3, 0.55, 0.35, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <RevealText>
          <p className="eyebrow mb-6 text-amber-400">Reserve Your Evening</p>
          <h2 className="font-display text-5xl md:text-7xl text-[#f3e6d3] mb-6">
            {headline}
          </h2>
        </RevealText>

        <RevealText delay={0.15}>
          <p className="font-display italic text-xl text-[#b89a95] mb-16 max-w-xl">
            {subheadline}
          </p>
        </RevealText>

        <RevealText delay={0.3}>
          <MagneticButton>
            {buttonText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </RevealText>
      </div>
    </section>
  );
};
