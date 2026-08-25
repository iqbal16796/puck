"use client";
import { Reveal, Pill } from "./magical/MagicMotion";
import { MagicCard } from "@/magic";

export function AIAgencyCaseStudies({title="Proof, not promises.",cases=[]}:{title?:string;cases?:{name:string;result:string;imageUrl?:string}[]}) {
 return <section className="bg-[#f1f1f4] px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill>Case studies</Pill><h2 className="mt-6 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="mt-16 grid gap-5 md:grid-cols-3">{cases.map((x,i)=><Reveal key={x.name} delay={i*90}><MagicCard className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl transition group-hover:scale-150"/><span className="relative text-xs text-white/30">CASE 0{i+1}</span><h3 className="relative mt-20 text-2xl">{x.name}</h3><p className="relative mt-8 text-4xl font-semibold text-cyan-300">{x.result}</p><span className="relative mt-8 block text-sm text-white/35">Read case study ↗</span></MagicCard></Reveal>)}</div></div></section>;
}
