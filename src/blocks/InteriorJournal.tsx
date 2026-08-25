"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function InteriorJournal({posts=[]}:{posts?:{title:string;category:string;imageUrl:string}[]}) {
 return <section className="bg-slate-950 px-6 py-28 text-white lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill dark>Journal</Pill><h2 className="mt-6 text-5xl font-medium tracking-[-.05em]">Notes on space.</h2></Reveal><div className="mt-14 grid gap-5 md:grid-cols-3">{posts.map((x,i)=><Reveal key={x.title} delay={i*80}><article className="group"><div className="aspect-[4/3] overflow-hidden rounded-[2rem]"><img src={x.imageUrl} alt={x.title} className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"/></div><p className="mt-5 text-[10px] uppercase tracking-[.2em] text-white/35">{x.category}</p><h3 className="mt-2 text-xl">{x.title}</h3></article></Reveal>)}</div></div></section>;
}
