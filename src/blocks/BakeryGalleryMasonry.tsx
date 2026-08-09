"use client";

import { motion } from "framer-motion";
import { Auroras, RevealText, Spotlight, useSpotlight } from "./artisanPrimitives";

export type GalleryMasonryProps = {
  sectionTitle: string;
  imageUrls: { url: string; title: string }[];
};

const GalleryCard = ({
  url,
  title,
  className,
  index,
}: {
  url: string;
  title: string;
  className: string;
  index: number;
}) => {
  const { onMouseMove, background } = useSpotlight(420, 0.28);

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      className={`${className} group relative overflow-hidden rounded-3xl border border-stone-800 shadow-deep`}
    >
      <Spotlight background={background} />
      <img
        src={url}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-70 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-90" />
      <figcaption className="pointer-events-none absolute bottom-8 left-8 z-20 overflow-hidden">
        <h3 className="font-display text-3xl text-amber-50 drop-shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:translate-y-[130%] md:group-hover:translate-y-0">
          {title}
        </h3>
        <div className="mt-2 h-[2px] w-0 bg-amber-500 transition-all delay-100 duration-700 ease-out group-hover:w-full" />
      </figcaption>
    </motion.figure>
  );
};

export const GalleryMasonry = ({ sectionTitle, imageUrls }: GalleryMasonryProps) => {
  const spans = [
    "h-[420px] md:col-span-8 md:row-span-2 md:h-auto",
    "h-[340px] md:col-span-4 md:row-span-1 md:h-auto",
    "h-[340px] md:col-span-4 md:row-span-1 md:h-auto",
    "h-[340px] md:col-span-12 md:row-span-1 md:h-auto",
  ];
  const images = (imageUrls ?? []).slice(0, 4);

  return (
    <section className="grain relative overflow-hidden bg-stone-950 px-6 py-32">
      <Auroras intensity={14} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <RevealText className="mb-16 text-center">
          <p className="eyebrow text-amber-500 mb-5">Inside the Bakehouse</p>
          <h2 className="font-display text-5xl text-gradient-cream md:text-6xl">{sectionTitle}</h2>
        </RevealText>

        <div className="grid grid-cols-1 gap-6 md:auto-rows-[300px] md:grid-cols-12">
          {images.map((img, i) => (
            <GalleryCard
              key={img.url}
              url={img.url}
              title={img.title}
              className={spans[i] ?? spans[1]!}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
