"use client";

import React from "react";
import { Reveal } from "../animations/Reveal";
import { Stagger, StaggerItem } from "../animations/Stagger";
import { Clock, MapPin, Users } from "lucide-react";

export interface ClassScheduleProps {
  title: string;
  subtitle: string;
  classes: {
    time: string;
    name: string;
    instructor: string;
    location: string;
    spotsLeft: number;
  }[];
}

export const ClassSchedule = ({ title, subtitle, classes }: ClassScheduleProps) => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
        </Reveal>

        <Stagger className="relative border-l-2 border-slate-100 ml-3 md:ml-0 md:border-none">
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-0.5 bg-slate-100" />
          
          {classes.map((cls, idx) => (
            <StaggerItem key={idx}>
              <div className="relative mb-8 pl-8 md:pl-0 md:flex md:items-start group">
                <div className="md:w-[120px] md:shrink-0 md:text-right md:pr-8 md:pt-1.5">
                  <span className="text-sm font-bold text-blue-600">{cls.time}</span>
                </div>
                
                <div className="absolute left-[-5px] top-1.5 h-3 w-3 rounded-full bg-slate-200 ring-4 ring-white md:left-[116px] group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300 shadow-sm" />
                
                <div className="md:flex-1 md:pl-8">
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{cls.name}</h3>
                        <div className="mt-2 text-sm text-slate-500 font-medium">with {cls.instructor}</div>
                        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {cls.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {cls.spotsLeft} spots left
                          </div>
                        </div>
                      </div>
                      
                      <button className="shrink-0 rounded-full bg-slate-950 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105">
                        Reserve a seat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};