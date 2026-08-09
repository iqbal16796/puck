"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { RevealText, Spotlight, useSpotlight } from "./artisanPrimitives";

export type Testimonial = { quote: string; author: string; role: string; rating: number };

export type TestimonialCarouselProps = {
  title: string;
  testimonials: Testimonial[];
};

const TestimonialCard = ({ testimonial, i }: { testimonial: Testimonial; i: number }) => {
  const { onMouseMove, background } = useSpotlight(360, 0.2);

  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      onMouseMove={onMouseMove}
      className="group relative flex min-w-[300px] shrink-0 flex-col gap-6 overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/50 p-8 backdrop-blur-md transition-colors hover:border-amber-500/40 md:min-w-[400px] md:p-10"
    >
      <Spotlight background={background} />
      <div className="relative z-10 flex gap-1 text-amber-500">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            fill={index < testimonial.rating ? "currentColor" : "none"}
            strokeWidth={index < testimonial.rating ? 0 : 2}
          />
        ))}
      </div>
      <p className="relative z-10 font-display text-lg italic leading-relaxed text-stone-200 md:text-xl">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="relative z-10 mt-auto flex flex-col border-t border-stone-800 pt-6">
        <span className="font-semibold text-amber-50 transition-colors group-hover:text-amber-400">
          {testimonial.author}
        </span>
        <span className="text-sm text-stone-400">{testimonial.role}</span>
      </footer>
    </motion.blockquote>
  );
};

export const TestimonialCarousel = ({ title, testimonials = [] }: TestimonialCarouselProps) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carousel.current;
    if (!el) return;
    const calc = () => setWidth(el.scrollWidth - el.offsetWidth);
    calc();
    const observer = new ResizeObserver(calc);
    observer.observe(el);
    return () => observer.disconnect();
  }, [testimonials]);

  return (
    <section className="grain relative w-full overflow-hidden bg-stone-900/40 py-32">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6">
        <RevealText className="mb-16 text-center">
          <p className="eyebrow text-amber-500 mb-5">Word of Mouth</p>
          <h2 className="font-display text-4xl text-gradient-cream md:text-6xl">{title}</h2>
        </RevealText>

        <motion.div
          ref={carousel}
          className="w-full cursor-grab overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          whileTap={{ cursor: "grabbing" }}
          tabIndex={0}
          aria-label="Testimonials carousel. Use left and right arrow keys to scroll."
          onKeyDown={(e) => {
            if (!carousel.current) return;
            if (e.key === "ArrowRight") carousel.current.scrollBy({ left: 320, behavior: "smooth" });
            if (e.key === "ArrowLeft") carousel.current.scrollBy({ left: -320, behavior: "smooth" });
          }}
        >
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} i={i} />
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-12 flex items-center gap-3 text-sm text-stone-500">
          <span className="h-px w-8 bg-stone-700" />
          Drag to explore
          <span className="h-px w-8 bg-stone-700" />
        </div>
      </div>
    </section>
  );
};
