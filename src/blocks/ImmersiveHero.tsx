"use client";
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Auroras, KineticHeadline } from "./artisanPrimitives";

export type ImmersiveHeroProps = {
  restaurantName: string;
  tagline: string;
  backgroundImageUrl: string;
  openingHours?: string;
  reservationPhone?: string;
};

export const ImmersiveHero = ({ restaurantName, tagline, backgroundImageUrl, openingHours, reservationPhone }: ImmersiveHeroProps) => {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 260]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="grain relative w-full h-screen overflow-hidden bg-[#150508]">
      {/* Cinematic slow zoom on the room / plate */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        animate={reduce ? undefined : { scale: [1, 1.13] }}
        transition={reduce ? undefined : { duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Image
          src={backgroundImageUrl}
          alt={restaurantName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Wine-dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#150508_100%)] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#150508] via-[#150508]/40 to-[#2b0a12]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#150508]/70 via-transparent to-transparent" />

      <Auroras intensity={16} />

      {/* Candlelight flicker, low and warm */}
      {mounted && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[62%] z-[5] h-[38vw] w-[38vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22),transparent_70%)] mix-blend-screen blur-2xl"
          animate={{ opacity: [0.35, 0.6, 0.4, 0.55, 0.35], scale: [1, 1.08, 0.96, 1.05, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="eyebrow mb-7 flex items-center gap-4 text-amber-400"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60" />
          {tagline}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>

        <KineticHeadline
          text={restaurantName}
          delay={0.6}
          className="text-6xl font-medium md:text-8xl lg:text-[8.5rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-signature mt-3 text-3xl text-amber-200/70"
        >
          Bon Appétit
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-5"
        >
          {(openingHours || reservationPhone) && (
            <div className="flex flex-wrap justify-center gap-8 text-[0.65rem] uppercase tracking-[0.3em] text-[#c9a9a0]">
              {openingHours && <span>{openingHours}</span>}
              {reservationPhone && <span>{reservationPhone}</span>}
            </div>
          )}
          <span className="eyebrow text-[#c9a9a0]">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-12 w-px bg-gradient-to-b from-amber-400/70 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
