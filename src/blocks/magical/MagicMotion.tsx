"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export { Reveal } from "@/magic";
export function Marquee({children,reverse=false}:{children:ReactNode;reverse?:boolean}) {
  return <div className="overflow-hidden whitespace-nowrap"><div className={`inline-flex min-w-max gap-10 ${reverse?"animate-[magicMarqueeReverse_28s_linear_infinite]":"animate-[magicMarquee_28s_linear_infinite]"}`}>{children}{children}{children}</div></div>;
}
export function Atmosphere({dark=false}:{dark?:boolean}) {
  return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className={`absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl ${dark?"bg-fuchsia-500/15":"bg-emerald-300/20"} animate-[magicFloat_12s_ease-in-out_infinite]`}/>
    <div className={`absolute -right-20 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl ${dark?"bg-cyan-400/10":"bg-amber-200/20"} animate-[magicFloat_15s_ease-in-out_infinite_reverse]`}/>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.16),transparent_42%)]"/>
  </div>;
}
export function Pill({children,dark=false}:{children:ReactNode;dark?:boolean}) {
 return <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] ${dark?"border-white/15 bg-white/5 text-white/60":"border-slate-900/10 bg-white/70 text-slate-500"}`}>{children}</span>;
}
import { Magnetic } from "@/magic";
export function MagneticButton({children,href="#"}:{children:ReactNode;href?:string}) {
 return <Magnetic><a href={href} className="group inline-flex items-center gap-4 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl">{children}<span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition group-hover:translate-x-1">→</span></a></Magnetic>;
}
