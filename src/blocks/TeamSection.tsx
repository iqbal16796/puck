"use client";
import React from "react";
import { motion } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type TeamSectionProps = {
  sectionTitle: string;
  members: { imageUrl: string; name: string; role: string; bio: string }[];
};

export const TeamSection = ({ sectionTitle, members }: TeamSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-[#170b13] py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <RevealText className="flex flex-col items-center gap-4">
          <span className="eyebrow text-[#e8d0a0]">The Artists</span>
          <h2 className="text-4xl md:text-5xl font-display italic tracking-tight text-center text-rose-50">
            {sectionTitle}
          </h2>
        </RevealText>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {members && members.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-48 h-64 mb-6 overflow-hidden rounded-[2rem] border border-[#e8d0a0]/25 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.imageUrl})` }}
                />
                {/* mirror-sheen catching the light across the portrait */}
                <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-sheen" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#170b13]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#e8d0a0]/20" />
              </div>

              <h3 className="text-xl font-display italic text-rose-50 mb-1">{member.name}</h3>
              <p className="eyebrow text-rose-300 mb-3">{member.role}</p>
              <p className="text-rose-100/60 text-sm leading-relaxed max-w-[200px]">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
