"use client";
import { Atmosphere, Pill } from "./magical/MagicMotion";
export function AIAgencyCTA({title}:{title:string}) {
 return <section className="relative overflow-hidden bg-black px-6 py-36 text-white lg:px-10"><Atmosphere dark/><div className="relative mx-auto max-w-6xl text-center"><Pill dark>Start a conversation</Pill><h2 className="mx-auto mt-8 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.82] tracking-[-.08em]">{title}</h2><a href="mailto:hello@example.com" className="mt-10 inline-flex h-36 w-36 items-center justify-center rounded-full bg-white text-center text-xs font-bold uppercase tracking-widest text-black transition duration-500 hover:scale-110 hover:bg-cyan-300">Build<br/>something<br/>new ↗</a></div></section>;
}
