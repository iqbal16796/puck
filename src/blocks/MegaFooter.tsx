"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Camera, MessageCircle, Briefcase, Users } from "lucide-react";

export type MegaFooterProps = {
  brandName: string;
  newsletterHeadline: string;
  socialLinks: { platform: string; url: string }[];
};

const iconMap: Record<string, React.ReactNode> = {
  Instagram: <Camera size={24} />,
  Twitter: <MessageCircle size={24} />,
  Linkedin: <Briefcase size={24} />,
  Facebook: <Users size={24} />,
};

const MagneticButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
    >
      {children}
    </motion.a>
  );
};

export const MegaFooter = ({ brandName, newsletterHeadline, socialLinks = [] }: MegaFooterProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  // Parallax effect for the massive brand name
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <footer ref={container} className="relative w-full h-[100vh] bg-black text-white overflow-hidden flex flex-col justify-between pt-24">
      {/* Top Section */}
      <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
        
        {/* Newsletter */}
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl md:text-5xl font-light mb-8 max-w-lg leading-tight">
            {newsletterHeadline}
          </h3>
          <div className="flex border-b border-white/30 pb-4 max-w-md group focus-within:border-white transition-colors">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent w-full outline-none text-lg placeholder:text-white/40"
            />
            <button className="text-white hover:text-white/70 transition-colors group-focus-within:translate-x-2 duration-300">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-4 flex-wrap">
          {socialLinks.map((link, idx) => (
            <MagneticButton key={idx} href={link.url}>
              {iconMap[link.platform] || <ArrowRight size={24} />}
            </MagneticButton>
          ))}
        </div>
      </div>

      {/* Massive Brand Name at the bottom */}
      <div className="w-full overflow-hidden flex justify-center items-end mt-auto pointer-events-none select-none h-[40vh]">
        <motion.h1 
          style={{ y }}
          className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white/90 whitespace-nowrap"
        >
          {brandName}
        </motion.h1>
      </div>
      
      {/* Footer Bottom Bar */}
      <div className="w-full border-t border-white/10 py-6 text-center text-white/40 text-sm z-10 relative bg-black">
        <p>&copy; {new Date().getFullYear()} {brandName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
