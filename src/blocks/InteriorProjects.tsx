"use client";
import { Reveal, Pill } from "./magical/MagicMotion";
import { ImageReveal } from "@/magic";
export function InteriorProjects({title,projects}:{title:string;projects:{name:string;category:string;imageUrl:string}[]}) {
 return <section id="projects" className="bg-white px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill>Selected work</Pill><h2 className="mt-6 max-w-3xl text-5xl font-medium tracking-[-.05em]">{title}</h2></Reveal><div className="mt-16 space-y-24">{projects.map((p,i)=><Reveal key={p.name} delay={i*80}><article className={`grid items-center gap-10 lg:grid-cols-2 ${i%2?"lg:[&>*:first-child]:order-2":""}`}><div className="overflow-hidden rounded-[2.5rem]"><ImageReveal src={p.imageUrl} alt={p.name} className="aspect-[4/3] w-full"/></div><div><span className="text-xs uppercase tracking-[.2em] text-slate-400">0{i+1} · {p.category}</span><h3 className="mt-5 text-4xl font-medium tracking-[-.04em]">{p.name}</h3><a href="#contact" className="mt-7 inline-block text-sm font-semibold">Explore project →</a></div></article></Reveal>)}</div></div></section>;
}
