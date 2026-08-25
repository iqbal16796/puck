"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function AIAgencyWorkflow({title="One intelligent system. Many moving parts.",steps=[]}:{title?:string;steps?:{name:string;description:string}[]}) {
 return <section className="relative overflow-hidden bg-[#08080b] px-6 py-32 text-white lg:px-10"><div className="mx-auto max-w-7xl"><Reveal><Pill dark>How it works</Pill><h2 className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">{title}</h2></Reveal><div className="relative mt-20 grid gap-5 md:grid-cols-4">{steps.map((x,i)=><Reveal key={x.name} delay={i*100} className="relative"><div className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 backdrop-blur"><span className="text-cyan-300">0{i+1}</span><h3 className="mt-16 text-xl font-medium">{x.name}</h3><p className="mt-4 text-sm leading-6 text-white/40">{x.description}</p></div>{i<steps.length-1&&<span className="absolute right-[-14px] top-1/2 z-10 hidden text-cyan-300 md:block">→</span>}</Reveal>)}</div></div></section>;
}
