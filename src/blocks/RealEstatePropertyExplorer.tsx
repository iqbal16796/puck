"use client";
import { Reveal, MagicCard, ImageReveal } from "@/magic";
import { Pill } from "./magical/MagicMotion";

export function RealEstatePropertyExplorer({
  eyebrow = "Explore the collection",
  title = "Find the one that feels like yours.",
  properties = [],
}: {
  eyebrow?: string;
  title?: string;
  properties?: { name:string; location:string; price:string; type:string; imageUrl:string }[];
}) {
  return (
    <section className="bg-[#f5f2eb] px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal><Pill>{eyebrow}</Pill><h2 className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.88] tracking-[-.06em]">{title}</h2></Reveal>
        <div className="mt-14 flex gap-2 overflow-x-auto pb-2">
          {["All homes","New listings","Waterfront","Architectural"].map((x,i)=><button key={x} className={`shrink-0 rounded-full border px-5 py-2 text-xs font-semibold transition ${i===0?"bg-slate-950 text-white":"bg-white hover:bg-slate-100"}`}>{x}</button>)}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {properties.map((p,i)=><Reveal key={p.name} delay={i*90}><MagicCard className="group overflow-hidden rounded-[2rem] bg-white">
            <div className="relative aspect-[4/5] overflow-hidden"><ImageReveal src={p.imageUrl} alt={p.name} className="h-full w-full"/><span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">{p.type}</span></div>
            <div className="p-5"><div className="flex justify-between gap-4"><h3 className="text-xl font-semibold">{p.name}</h3><span className="text-sm">{p.price}</span></div><p className="mt-2 text-sm text-slate-500">{p.location}</p><a href="#contact" className="mt-5 inline-block text-sm font-semibold">View residence →</a></div>
          </MagicCard></Reveal>)}
        </div>
      </div>
    </section>
  );
}
