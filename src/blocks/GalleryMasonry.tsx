"use client";
import React, { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import Image from "next/image";

export type GalleryMasonryProps = {
  sectionTitle: string;
  imageUrls: { url: string; title: string }[];
};

const GalleryCard = ({ url, title, className, index }: { url: string, title: string, className: string, index: number }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${sx}px ${sy}px, rgba(251, 191, 36, 0.15), transparent 40%)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMove}
      className={`${className} relative rounded-3xl overflow-hidden group shadow-2xl border border-stone-800/50 block`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{ background: spotlight }}
      />
      <Image 
        src={url} 
        alt={title || "Gallery image"} 
        fill 
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 z-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-80 transition-opacity duration-500 z-10 pointer-events-none" />
      
      {title && (
        <div className="absolute bottom-8 left-8 z-20 overflow-hidden pointer-events-none">
          <h3 className="text-amber-50 font-serif text-3xl font-[family-name:--font-playfair] transform translate-y-0 md:translate-y-[120%] md:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] drop-shadow-xl">
            {title}
          </h3>
          <div className="h-[2px] w-0 bg-amber-500 group-hover:w-full transition-all duration-700 ease-out delay-100 mt-2" />
        </div>
      )}
    </motion.div>
  );
};

export const GalleryMasonry = ({ sectionTitle, imageUrls }: GalleryMasonryProps) => {
  // Ensure we have exactly 4 images for this layout, pad with placeholders if needed
  const images = [...(imageUrls || [])];
  while (images.length < 4) {
    images.push({ url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop", title: "Transformation" });
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-32 px-6 bg-stone-950 min-h-[800px] relative overflow-hidden"
    >
      {/* Auroras */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-20 z-0">
        <div className="aurora aurora-1 absolute top-1/2 left-1/4 h-[40vw] w-[40vw] rounded-full bg-amber-500/20 blur-[100px] animate-drift" />
      </div>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-center mb-16 font-serif text-white font-[family-name:--font-playfair]"
        >
          {sectionTitle || "Transformations"}
        </motion.h2>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[300px]">
          <GalleryCard 
            url={images[0].url} 
            title={images[0].title} 
            className="md:col-span-8 md:row-span-2 h-[450px] md:h-auto" 
            index={0} 
          />
          <GalleryCard 
            url={images[1].url} 
            title={images[1].title} 
            className="md:col-span-4 md:row-span-1 h-[350px] md:h-auto" 
            index={1} 
          />
          <GalleryCard 
            url={images[2].url} 
            title={images[2].title} 
            className="md:col-span-6 md:row-span-1 h-[350px] md:h-auto" 
            index={2} 
          />
          <GalleryCard 
            url={images[3].url} 
            title={images[3].title} 
            className="md:col-span-6 md:row-span-1 h-[350px] md:h-auto" 
            index={3} 
          />
        </div>
      </div>
    </motion.section>
  );
};
