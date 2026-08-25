"use client";
import { ImageReveal } from "@/magic";
import { Atmosphere, MagneticButton, Pill } from "./magical/MagicMotion";
export function InteriorHero({description,imageUrl}:{description:string;imageUrl:string}) {
 return <section className="relative min-h-screen overflow-hidden bg-[#d9d4ca] text-slate-950"><Atmosphere/><div className="relative mx-auto grid min-h-screen max-w-[1500px] items-center gap-10 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><Pill>Interior architecture</Pill><h1 className="mt-7 text-[clamp(4rem,9vw,9rem)] font-medium leading-[.82] tracking-[-.075em]">Spaces<br/><em className="font-serif text-slate-500">that feel.</em></h1><p className="mt-8 max-w-md text-lg leading-8 text-slate-600">{description}</p><div className="mt-8"><MagneticButton href="#projects">View projects</MagneticButton></div></div><div className="relative aspect-[5/6] overflow-hidden rounded-[3rem]"><ImageReveal src={imageUrl} alt="Interior architecture" className="h-full w-full"/></div></div></section>;
}
