"use client";
import { Reveal, Pill } from "./magical/MagicMotion";
import { ImageReveal } from "@/magic";
export function HotelRooms({title,rooms}:{title:string;rooms:{name:string;detail:string;imageUrl:string}[]}) {
 return <section id="rooms" className="bg-[#f0ede7] px-6 py-28 lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill>Rooms & suites</Pill><h2 className="mt-6 max-w-3xl text-5xl font-medium tracking-[-.05em]">{title}</h2></Reveal><div className="mt-14 space-y-5">{rooms.map((r,i)=><Reveal key={r.name} delay={i*90}><article className="group grid items-center gap-6 border-t border-black/10 py-7 md:grid-cols-[80px_1fr_1.1fr_auto]"><span className="text-sm text-black/30">0{i+1}</span><h3 className="text-2xl font-medium">{r.name}</h3><div className="relative aspect-[16/7] overflow-hidden rounded-2xl"><ImageReveal src={r.imageUrl} alt={r.name} className="h-full w-full"/></div><span className="text-sm font-semibold">Explore →</span></article></Reveal>)}</div></div></section>;
}
