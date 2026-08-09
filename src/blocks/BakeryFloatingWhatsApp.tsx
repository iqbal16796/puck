"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export type FloatingWhatsAppProps = {
  phoneNumber: string;
  message: string;
};

export const FloatingWhatsApp = ({ phoneNumber, message }: FloatingWhatsAppProps) => {
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-green-500"
      />
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-deep"
      >
        <MessageCircle size={30} />
      </motion.a>
    </div>
  );
};
