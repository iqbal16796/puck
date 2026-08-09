"use client";
import React, { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type ProjectGalleryProps = {
  projects: { title: string; category: string; imageUrl: string; size: "small" | "medium" | "large" }[];
};

/** A project tile that tilts toward the cursor in 3D, like a card on a light table. */
function TiltCard({
  project,
  index,
}: {
  project: { title: string; category: string; imageUrl: string; size: "small" | "medium" | "large" };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(rx, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(ry, [-0.5, 0.5], [-8, 8]), springConfig);

  const heightClass =
    project.size === "large" ? "h-[600px]" :
    project.size === "medium" ? "h-[450px]" : "h-[320px]";

  // deterministic, index-based stagger so the grid reads as scattered, not centered
  const tiltRest = index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-0" : "rotate-1";
  const offsetClass = index % 3 === 0 ? "md:mt-0" : index % 3 === 1 ? "md:mt-10" : "md:mt-4";

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rx.set((e.clientX - rect.left) / rect.width - 0.5);
    ry.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      className={`${offsetClass} break-inside-avoid mb-6`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        className={`group relative w-full ${heightClass} ${tiltRest} bg-neutral-900 overflow-hidden cursor-pointer border border-white/5`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />

        <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/50 transition-colors duration-500" />

        {/* accent corner marks that snap in on hover */}
        <span className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-[#d7ff3f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-[#d7ff3f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#d7ff3f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#d7ff3f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="eyebrow text-[#d7ff3f] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.category}
          </p>
          <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.title}
          </h3>
        </div>

        <div
          className={`absolute inset-0 shadow-[inset_0_0_0_1px_rgba(215,255,63,0)] transition-shadow duration-300 ${hovered ? "shadow-[inset_0_0_0_1px_rgba(215,255,63,0.5)]" : ""}`}
        />
      </motion.div>
    </motion.div>
  );
}

export const ProjectGallery = ({ projects = [] }: ProjectGalleryProps) => {
  return (
    <section className="py-24 bg-neutral-950 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-neutral-50">
            Selected<br />Work
          </h2>
          <span className="eyebrow text-neutral-500">{String(projects.length).padStart(2, "0")} projects</span>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {projects.map((project, index) => (
            <TiltCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
