"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function HotelExperiences({
  title = "Stay for the place. Remember the feeling.",
  items = [],
}: {title?:string;items?:{name:string;detail:string;imageUrl:string}[]}) {
  return <section className="bg-[#181613] px-6 py-28 text-white lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill dark>Experiences</Pill><h2 className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="mt-16 grid gap-5 md:grid-cols-3">{items.map((x,i)=><Reveal key={x.name} delay={i*100}><article className="group relative aspect-[4/5] overflow-hidden rounded-[2rem]"><img src={x.imageUrl} alt={x.name} className="h-full w-full object-cover opacity-80 transition duration-[1400ms] group-hover:scale-105 group-hover:opacity-100"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"/><div className="absolute inset-x-5 bottom-5"><h3 className="text-2xl font-medium">{x.name}</h3><p className="mt-2 text-sm text-white/55">{x.detail}</p></div></article></Reveal>)}</div></div></section>;
}
