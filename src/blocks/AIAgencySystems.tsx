"use client";
import { Reveal, Pill } from "./magical/MagicMotion";
export function AIAgencySystems({title,systems}:{title:string;systems:{name:string;description:string}[]}) {
 return <section id="systems" className="bg-[#0b0b0f] px-6 py-28 text-white lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill dark>Capabilities</Pill><h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-.05em]">{title}</h2></Reveal><div className="mt-14 border-y border-white/10">{systems.map((s,i)=><Reveal key={s.name} delay={i*70}><article className="group grid gap-5 border-b border-white/10 py-8 last:border-0 md:grid-cols-[80px_1fr_1fr_auto] md:items-center"><span className="text-sm text-white/20">0{i+1}</span><h3 className="text-2xl font-medium transition group-hover:text-cyan-300">{s.name}</h3><p className="text-sm leading-6 text-white/40">{s.description}</p><span className="text-xl transition group-hover:translate-x-2">↗</span></article></Reveal>)}</div></div></section>;
}
