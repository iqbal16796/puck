"use client";
import { Reveal, Pill } from "./magical/MagicMotion";
import { ImageReveal } from "@/magic";

export function HotelDining({title="Eat slowly. Stay longer.",imageUrl="",description="Seasonal cooking, local ingredients and a dining room made for lingering."}:{title?:string;imageUrl?:string;description?:string}) {
 return <section className="bg-white px-6 py-28 lg:px-10"><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_.8fr]"><Reveal><div className="aspect-[16/10] overflow-hidden rounded-[2.5rem]"><ImageReveal src={imageUrl} alt="Hotel dining" className="h-full w-full"/></div></Reveal><Reveal delay={100}><Pill>Dining</Pill><h2 className="mt-6 text-5xl font-medium tracking-[-.05em]">{title}</h2><p className="mt-6 text-lg leading-8 text-slate-500">{description}</p><a href="#book" className="mt-8 inline-block text-sm font-semibold">Explore the menu →</a></Reveal></div></section>;
}
