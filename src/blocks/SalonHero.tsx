"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SalonAuroras, MirrorSheenButton, SalonKineticHeadline, VanityLights } from "./salonPrimitives";
import { RevealText } from "./artisanPrimitives";

export type SalonHeroProps = {
  backgroundImageUrl?: string;
  backgroundVideo?: string; // We keep our new video prop
  headline: string;
  subheadline: string;
  buttonText: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  badgeText?: string;
};

export const SalonHero = ({
  backgroundImageUrl,
  backgroundVideo,
  headline,
  subheadline,
  buttonText,
  secondaryButtonText,
  badgeText,
}: SalonHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // This gives the background that nice depth effect on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="grain flex flex-col items-center justify-center text-center py-28 px-6 min-h-[720px] md:min-h-[820px] relative overflow-hidden bg-[#170b13] text-white w-full"
    >
      {/* BACKGROUND LAYER: Swaps between video and image automatically */}
      {backgroundVideo ? (
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-65"
          style={{
            y: backgroundY,
            scale: 1.0,
          }}
          src={backgroundVideo}
        />
      ) : backgroundImageUrl ? (
        <motion.div
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-35 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            y: backgroundY,
            scale: 1.1,
          }}
        />
      ) : null}

      {/* Plum colour-grade wash over the photo/video, editorial rather than a flat tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#170b13] via-[#170b13]/75 to-[#3b1226]/40 mix-blend-multiply z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#170b13] via-[#170b13]/60 to-transparent z-10" />

      {/* Restored your Aurora animations */}
      <SalonAuroras intensity={26} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-7 w-full"
      >
        {/* Restored the glowing dots */}
        <VanityLights count={7} />

        {/* Restored your custom eyebrow badge styling */}
        {badgeText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8d0a0]/10 border border-[#e8d0a0]/25 text-[#e8d0a0]"
          >
            {badgeText}
          </motion.div>
        )}

        {/* Restored the Kinetic animated text */}
        <SalonKineticHeadline
          text={headline}
          delay={0.45}
          className="text-5xl md:text-7xl text-center"
        />

        {/* Restored the text reveal for the subheadline */}
        <RevealText delay={0.2} className="max-w-2xl">
          <p className="text-xl font-light text-rose-100/80 leading-relaxed italic font-display">
            {subheadline}
          </p>
        </RevealText>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4 w-full"
        >
          {/* Restored your custom shiny buttons */}
          <MirrorSheenButton>{buttonText}</MirrorSheenButton>

          {secondaryButtonText && (
            <MirrorSheenButton variant="ghost">{secondaryButtonText}</MirrorSheenButton>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
