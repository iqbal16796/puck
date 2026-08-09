 "use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

export interface EducationClassScheduleProps {
  title: string;
  subtitle: string;
  classes: { day: string; date: string; title: string; instructor: string; time: string; location: string; type: string }[];
}

export const EducationClassSchedule = ({ title, subtitle, classes }: EducationClassScheduleProps) => (
  <section className="bg-white py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-8 md:grid-cols-[1fr_.7fr] md:items-end">
        <div><span className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Upcoming</span><h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{title}</h2></div>
        <p className="text-lg leading-8 text-slate-600">{subtitle}</p>
      </div>
      <div className="mt-12 space-y-3">
        {classes.map((item, index) => (
          <motion.article key={`${item.date}-${item.title}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-[90px_1fr_auto] md:items-center md:p-6">
            <div className="rounded-2xl bg-slate-950 p-3 text-center text-white"><div className="text-[10px] font-bold uppercase text-blue-300">{item.day}</div><div className="mt-1 text-2xl font-black">{item.date}</div></div>
            <div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">{item.type}</span><span className="text-xs text-slate-400">{item.instructor}</span></div><h3 className="mt-2 text-xl font-extrabold text-slate-950">{item.title}</h3><div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500"><span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{item.time}</span><span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{item.location}</span></div></div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500"><CalendarDays className="h-4 w-4 text-blue-600" />Reserve a seat</div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);