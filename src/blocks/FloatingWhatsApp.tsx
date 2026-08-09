"use client";
import React from "react";
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
      {/* Pulse Effect Background */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-green-500 rounded-full"
      />
      
      {/* Bouncing Icon */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)] backdrop-blur-md border border-green-300/30"
      >
        <MessageCircle size={32} />
      </motion.a>
    </div>
  );
};
