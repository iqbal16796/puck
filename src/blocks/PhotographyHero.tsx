"use client";
import { ImageReveal } from "@/magic";
import { Pill } from "./magical/MagicMotion";
export function PhotographyHero({title,imageUrl}:{title:string;imageUrl:string}) {
 return <section className="relative min-h-screen overflow-hidden bg-black text-white"><ImageReveal src={imageUrl} alt="Photography" className="absolute inset-0 h-full w-full opacity-75"/><div className="absolute inset-0 bg-black/30"/><div className="relative flex min-h-screen flex-col justify-between p-6 lg:p-10"><div className="flex justify-between"><Pill dark>Photography studio</Pill><span className="text-xs tracking-widest text-white/50">EST. 2012</span></div><div><h1 className="max-w-6xl text-[clamp(4rem,13vw,13rem)] font-medium leading-[.78] tracking-[-.08em]">{title}</h1><div className="mt-8 flex items-center justify-between text-sm text-white/60"><span>Portraits · Campaigns · Stories</span><a href="#work" className="rounded-full border border-white/30 px-5 py-3 text-white transition hover:bg-white hover:text-black">View work →</a></div></div></div></section>;
}
