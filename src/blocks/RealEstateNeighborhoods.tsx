"use client";
import { Reveal, Marquee } from "./magical/MagicMotion";

export function RealEstateNeighborhoods({
  title = "The places behind the addresses.",
  items = [],
}: {
  title?: string;
  items?: {name:string; description:string; imageUrl:string}[];
}) {
  return <section className="overflow-hidden bg-slate-950 py-28 text-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-10"><Reveal><h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">{title}</h2></Reveal></div>
    <div className="mt-16 flex gap-5 overflow-x-auto px-6 pb-4 lg:px-10">
      {items.map((x,i)=><Reveal key={x.name} delay={i*70} className="min-w-[78vw] md:min-w-[42vw] lg:min-w-[28vw]"><article className="group relative aspect-[4/5] overflow-hidden rounded-[2rem]"><img src={x.imageUrl} alt={x.name} className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/><div className="absolute inset-x-6 bottom-6"><h3 className="text-3xl font-semibold">{x.name}</h3><p className="mt-2 max-w-sm text-sm text-white/60">{x.description}</p></div></article></Reveal>)}
    </div>
    <div className="mt-20 border-y border-white/10 py-5"><Marquee><span className="text-xs font-bold uppercase tracking-[.35em] text-white/40">LIVE HERE · LOVE HERE · BELONG HERE · </span></Marquee></div>
  </section>;
}
