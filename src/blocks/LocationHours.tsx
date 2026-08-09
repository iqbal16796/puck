"use client";
import React, { useState, MouseEvent } from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";

export type LocationHoursProps = {
  address: string;
  hours: string;
  phone: string;
};

const LocationCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleLeave = () => {
    setSpotlight((s) => ({ ...s, active: false }));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={itemVariants} 
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col items-center gap-5 p-8 bg-stone-900/40 rounded-3xl border border-stone-800/50 hover:bg-stone-900/70 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-xl"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={
          spotlight.active
            ? {
              background: `radial-gradient(350px circle at ${spotlight.x}% ${spotlight.y}%, rgba(217, 119, 6, 0.12), transparent 40%)`,
            }
            : undefined
        }
      />
      <div className="relative z-10 w-16 h-16 rounded-full bg-amber-900/30 flex items-center justify-center text-amber-500 mb-2 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] group-hover:bg-amber-900/50 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300">
        <Icon size={28} className="drop-shadow-md" />
      </div>
      <h3 className="relative z-10 text-2xl font-serif text-white tracking-wide group-hover:text-amber-50 transition-colors">{title}</h3>
      <p className="relative z-10 whitespace-pre-line text-amber-100/70 text-lg group-hover:text-amber-100/90 transition-colors">{content}</p>
    </motion.div>
  );
};

export const LocationHours = ({ address, hours, phone }: LocationHoursProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <section className="w-full bg-stone-950 text-stone-300 py-32 border-t-4 border-amber-600/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-5 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent blur-3xl pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10"
      >
        <LocationCard icon={MapPin} title="Visit Us" content={address} />
        <LocationCard icon={Clock} title="Opening Hours" content={hours} />
        <LocationCard icon={Phone} title="Contact" content={phone} />
      </motion.div>
    </section>
  );
};
