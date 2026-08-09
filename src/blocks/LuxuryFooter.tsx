"use client";
import React from "react";
import { motion } from "framer-motion";

export type LuxuryFooterProps = {
  brandName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  socialLinks: { platform: string; url: string }[];
  quickLinks: { label: string; url: string }[];
};

export const LuxuryFooter = ({
  brandName,
  tagline,
  address,
  phone,
  email,
  workingHours,
  socialLinks,
  quickLinks,
}: LuxuryFooterProps) => {
  return (
    <footer className="grain w-full bg-[#100609] py-20 px-6 text-rose-100/60 border-t border-[#e8d0a0]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h3 className="text-3xl font-display italic tracking-wider mb-2 bg-gradient-to-r from-rose-200 via-[#e8d0a0] to-rose-300 bg-clip-text text-transparent">
              {brandName}
            </h3>
            <p className="text-sm italic font-display text-rose-100/40">{tagline}</p>
          </div>

          <div className="flex gap-4 mt-2">
            {socialLinks && socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                whileHover={{ y: -3 }}
                className="text-rose-100/50 hover:text-[#e8d0a0] transition-colors text-sm uppercase tracking-wider font-semibold"
              >
                {social.platform}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <h4 className="eyebrow text-[#e8d0a0] mb-2">Explore</h4>
          <ul className="flex flex-col gap-3">
            {quickLinks && quickLinks.map((link, i) => (
              <li key={i}>
                <motion.a
                  href={link.url}
                  whileHover={{ x: 5 }}
                  className="text-rose-100/55 hover:text-rose-50 transition-colors"
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h4 className="eyebrow text-[#e8d0a0] mb-2">Contact &amp; Hours</h4>
          <div className="flex flex-col gap-3 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-rose-300 font-semibold w-16">Visit:</span>
              <span className="flex-1">{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-rose-300 font-semibold w-16">Call:</span>
              <span>{phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-rose-300 font-semibold w-16">Email:</span>
              <span>{email}</span>
            </p>
            <p className="flex items-start gap-2 mt-4 pt-4 border-t border-[#e8d0a0]/10">
              <span className="text-rose-300 font-semibold w-16">Hours:</span>
              <span className="flex-1 whitespace-pre-line leading-relaxed">{workingHours}</span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#e8d0a0]/10 text-center text-xs text-rose-100/30 uppercase tracking-widest"
      >
        © {new Date().getFullYear()} {brandName}. All Rights Reserved.
      </motion.div>
    </footer>
  );
};
