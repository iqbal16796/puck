"use client";
import { Reveal } from "./magical/MagicMotion";

export function HotelAmenities({title="Everything you need. Nothing you don't.", amenities=[]}:{title?:string;amenities?:{name:string}[]}) {
 return <section className="bg-[#ede9e1] px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><h2 className="max-w-3xl text-5xl font-medium tracking-[-.05em]">{title}</h2></Reveal><div className="mt-14 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">{amenities.map((x,i)=><Reveal key={x.name} delay={i*60}><div className="group border-b border-r border-black/10 p-7 transition hover:bg-white"><span className="text-xs text-black/30">0{i+1}</span><h3 className="mt-8 text-xl font-medium">{x.name}</h3><span className="mt-8 block text-black/30 transition group-hover:translate-x-2">↗</span></div></Reveal>)}</div></div></section>;
}
