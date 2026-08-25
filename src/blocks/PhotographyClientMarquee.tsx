"use client";
import { Marquee } from "./magical/MagicMotion";

export function PhotographyClientMarquee({clients=[]}:{clients?:{name:string}[]}) {
 return <section className="overflow-hidden bg-[#e9e5dc] py-12 text-black"><p className="px-6 text-center text-[10px] font-bold uppercase tracking-[.3em] text-black/35">Selected clients</p><div className="mt-7"><Marquee reverse>{clients.map(x=><span key={x.name} className="text-4xl font-medium tracking-[-.04em]">{x.name} ✦</span>)}</Marquee></div></section>;
}
