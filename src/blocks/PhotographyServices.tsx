"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function PhotographyServices({title="What we make.",services=[]}:{title?:string;services?:{name:string;description:string}[]}) {
 return <section className="bg-black px-6 py-28 text-white lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill dark>Services</Pill><h2 className="mt-6 text-[clamp(3rem,6vw,6rem)] font-medium leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="mt-16 border-y border-white/10">{services.map((x,i)=><Reveal key={x.name} delay={i*80}><article className="group grid gap-4 border-b border-white/10 py-8 last:border-0 md:grid-cols-[80px_1fr_1fr_auto]"><span className="text-white/25">0{i+1}</span><h3 className="text-2xl transition group-hover:translate-x-2">{x.name}</h3><p className="text-sm leading-6 text-white/45">{x.description}</p><span className="text-xl transition group-hover:translate-x-2">↗</span></article></Reveal>)}</div></div></section>;
}
