"use client";
import { Reveal } from "./magical/MagicMotion";

export function AIAgencyMetrics({items=[]}:{items?:{value:string;label:string}[]}) {
 return <section className="overflow-hidden bg-white px-6 py-20 lg:px-10"><div className="mx-auto grid max-w-7xl grid-cols-2 border-y border-black/10 md:grid-cols-4">{items.map((x,i)=><Reveal key={x.label} delay={i*70} className="border-r border-black/10 p-8 last:border-0"><div className="text-[clamp(2.5rem,5vw,5rem)] font-semibold tracking-[-.06em]">{x.value}</div><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-black/35">{x.label}</p></Reveal>)}</div></section>;
}
