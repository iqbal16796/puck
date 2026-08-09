"use client";
import React from "react";
import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { Auroras, KineticHeadline, RevealText, MagneticButton } from "./artisanPrimitives";

export type WellnessConsultationProps = {
  title: string;
  description: string;
  buttonText?: string;
};

export const WellnessConsultation = ({ title, description, buttonText = "Book Consultation" }: WellnessConsultationProps) => {
  return (
    <section className="py-24 bg-[#E2E8DE] w-full relative overflow-hidden">
      <Auroras intensity={30} />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-[#849271]/10 flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Left Side: Info */}
          <div className="w-full md:w-1/2">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7F4F0]">
              <CalendarHeart size={32} className="text-[#D37B63]" />
            </div>
            <KineticHeadline 
              text={title}
              className="text-3xl md:text-4xl font-serif text-[#4A4238] mb-6 leading-tight !text-left !justify-start [&>span>span>span]:!text-[#4A4238] [&>span>span>span]:!drop-shadow-none"
            />
            <RevealText delay={0.2} className="text-[#756a5c] text-lg leading-relaxed mb-8">
              {description}
            </RevealText>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-1/2">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-[#756a5c] mb-2 pl-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#F7F4F0] border-none rounded-full px-6 py-4 text-[#4A4238] focus:ring-2 focus:ring-[#849271] outline-none transition-all placeholder:text-[#a8a196]"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#756a5c] mb-2 pl-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[#F7F4F0] border-none rounded-full px-6 py-4 text-[#4A4238] focus:ring-2 focus:ring-[#849271] outline-none transition-all placeholder:text-[#a8a196]"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#756a5c] mb-2 pl-2">Primary Health Concern</label>
                <select className="w-full bg-[#F7F4F0] border-none rounded-full px-6 py-4 text-[#4A4238] focus:ring-2 focus:ring-[#849271] outline-none transition-all appearance-none cursor-pointer">
                  <option>Digestive Health</option>
                  <option>Stress & Anxiety</option>
                  <option>Skin Conditions</option>
                  <option>Joint & Muscle Pain</option>
                  <option>General Wellness</option>
                </select>
              </div>

              <div className="mt-4 flex justify-start">
                <MagneticButton className="w-full !bg-[#D37B63] !text-white !shadow-none hover:!bg-[#b86751]">
                  {buttonText}
                </MagneticButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
