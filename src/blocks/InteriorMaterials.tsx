"use client";
import { Reveal } from "./magical/MagicMotion";

export function InteriorMaterials({title="Material is memory.",items=[]}:{title?:string;items?:{name:string;detail:string;imageUrl:string}[]}) {
 return <section className="bg-white px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><h2 className="text-[clamp(3rem,6vw,6rem)] font-medium leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((x,i)=><Reveal key={x.name} delay={i*70}><article className="group"><div className="aspect-[3/4] overflow-hidden rounded-[2rem]"><img src={x.imageUrl} alt={x.name} className="h-full w-full object-cover transition duration-[1000ms] group-hover:scale-110"/></div><h3 className="mt-5 text-lg font-medium">{x.name}</h3><p className="mt-1 text-sm text-slate-400">{x.detail}</p></article></Reveal>)}</div></div></section>;
}
