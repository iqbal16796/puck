"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Clothing-only fork of FloatingWhatsApp.tsx. That component is shared
 * (via globalBlocks.tsx) across ayurvedic/craft/plumber/lawyer/portfolio/
 * restaurant, so the green bouncing bubble stays untouched there — this
 * monochrome, slow-pulse version lives here instead. Prop shape matches
 * FloatingWhatsAppProps exactly so clothing.config.tsx stays in sync.
 */
export type FloatingWhatsAppProps = {
  phoneNumber: string;
  message: string;
};

export const FloatingWhatsApp = ({ phoneNumber, message }: FloatingWhatsAppProps) => {
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow bg-black text-white px-4 py-3 whitespace-nowrap"
          >
            Chat With Us
          </motion.span>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Slow pewter pulse, no bounce */}
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#C9BFA6]"
        />
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-16 h-16 bg-black text-white rounded-full border border-white/10"
        >
          <MessageCircle size={26} />
        </motion.a>
      </div>
    </div>
  );
};
