"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { RevealText } from "./artisanPrimitives";

export type LookbookCarouselProps = {
  title: string;
  images: { url: string; alt: string }[];
};

export const LookbookCarousel = ({ title, images = [] }: LookbookCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (isHovered) {
      window.addEventListener("mousemove", updateMousePosition);
    } else {
      window.removeEventListener("mousemove", updateMousePosition);
    }

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isHovered, mouseX, mouseY]);

  return (
    <section className="py-28 bg-[#FAF9F6] w-full overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex items-end justify-between gap-6 flex-wrap">
        <RevealText>
          <p className="eyebrow text-[#8a8272] mb-4">Runway / Editorial</p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-black tracking-tight">{title}</h2>
        </RevealText>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-light pb-2">
          {String(images.length).padStart(2, "0")} Looks — Drag to explore
        </p>
      </div>

      <div
        className="w-full relative cursor-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        {/* Custom Cursor */}
        {isHovered && (
          <motion.div
            style={{ x: springX, y: springY }}
            className="fixed top-0 left-0 w-20 h-20 rounded-full border border-black/70 bg-[#FAF9F6]/90 backdrop-blur-sm flex items-center justify-center text-[10px] tracking-[0.2em] uppercase font-medium text-black pointer-events-none z-50 -ml-10 -mt-10 select-none"
          >
            Explore
          </motion.div>
        )}

        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.08}
          dragTransition={{ power: 0.2, timeConstant: 250 }}
          className="flex px-6 md:px-[5vw] cursor-grab active:cursor-grabbing pb-12"
          whileTap={{ cursor: "grabbing" }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative min-w-[70vw] md:min-w-[40vw] lg:min-w-[30vw] aspect-[3/4] shrink-0 overflow-hidden ${idx > 0 ? "border-l border-black/10" : ""}`}
            >
              <span className="absolute top-5 left-5 z-10 text-[11px] tracking-[0.2em] text-white/90 mix-blend-difference">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <motion.img
                src={img.url}
                alt={img.alt}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover pointer-events-none grayscale-[0.35] transition-[filter] duration-700 ease-in-out group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
