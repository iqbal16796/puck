"use client";
import React from "react";
import { motion } from "framer-motion";
import { MirrorSheenButton } from "./salonPrimitives";

export type NavbarProps = {
  logoText: string;
  navLinks: { label: string; url: string }[];
  ctaText: string;
};

export const Navbar = ({ logoText, navLinks, ctaText }: NavbarProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#170b13]/85 border-b border-[#e8d0a0]/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0 cursor-pointer"
        >
          <span className="text-2xl font-display italic tracking-wider bg-gradient-to-r from-rose-200 via-[#e8d0a0] to-rose-300 bg-clip-text text-transparent">
            {logoText}
          </span>
        </motion.div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks && navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-rose-100/70 hover:text-[#e8d0a0] transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <MirrorSheenButton size="sm">{ctaText}</MirrorSheenButton>
        </div>
      </div>
    </motion.header>
  );
};
