"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function InteriorProcess({title="From first sketch to final light.",steps=[]}:{title?:string;steps?:{name:string;description:string}[]}) {
 return <section className="bg-[#f2efe8] px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill>Our process</Pill><h2 className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="mt-16 grid gap-px bg-black/10 md:grid-cols-4">{steps.map((x,i)=><Reveal key={x.name} delay={i*80} className="bg-[#f2efe8] p-7"><span className="text-xs text-black/30">0{i+1}</span><h3 className="mt-16 text-xl font-medium">{x.name}</h3><p className="mt-4 text-sm leading-6 text-black/50">{x.description}</p></Reveal>)}</div></div></section>;
}
