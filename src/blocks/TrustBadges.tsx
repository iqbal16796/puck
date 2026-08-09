"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, ThumbsUp, Clock } from "lucide-react";
import { CautionStripe } from "./plumberPrimitives";

export type TrustBadgesProps = {
  badges: { title: string; subtitle: string; icon: string }[];
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={34} />,
  Award: <Award size={34} />,
  ThumbsUp: <ThumbsUp size={34} />,
  Clock: <Clock size={34} />
};

export const TrustBadges = ({ badges = [] }: TrustBadgesProps) => {
  return (
    <section className="grain relative w-full bg-slate-900 overflow-hidden">
      <CautionStripe className="h-1.5" />
      <div className="py-14 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-10">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center gap-4 text-center max-w-[220px]"
            >
              <div className="shrink-0 w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-500">
                {iconMap[badge.icon] || <Shield size={34} />}
              </div>
              <div className="text-left">
                <h4 className="text-white font-black uppercase tracking-wider text-base leading-tight">{badge.title}</h4>
                <p className="text-slate-400 font-medium mt-1 text-sm">{badge.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CautionStripe className="h-1.5" />
    </section>
  );
};
