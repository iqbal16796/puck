"use client";
import { Reveal, Marquee } from "./magical/MagicMotion";
export function PhotographyStatement({quote}:{quote:string}) {
 return <section className="overflow-hidden bg-[#e9e5dc] py-32 text-black"><Reveal><p className="mx-auto max-w-5xl px-6 text-center text-[clamp(3rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.06em]">“{quote}”</p></Reveal><div className="mt-24 border-y border-black/10 py-5"><Marquee reverse><span className="text-xs font-bold uppercase tracking-[.3em]">Observe · Feel · Frame · Remember · </span></Marquee></div></section>;
}
