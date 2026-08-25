"use client";
import { Marquee, Reveal } from "./magical/MagicMotion";
export function RealEstateStats({statement}:{statement:string}) {
 return <section className="overflow-hidden bg-slate-950 py-24 text-white"><Marquee><span className="text-[clamp(4rem,11vw,11rem)] font-semibold tracking-[-.07em]">{statement} ✦</span></Marquee><div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 border-y border-white/10 md:grid-cols-4">{[["18","years"],["420+","homes sold"],["96%","referrals"],["12","cities"]].map(([n,l],i)=><Reveal key={l} delay={i*80} className="border-r border-white/10 p-8 last:border-0"><div className="text-4xl font-semibold">{n}</div><div className="mt-2 text-sm text-white/40">{l}</div></Reveal>)}</div></section>;
}
