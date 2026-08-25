"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function PhotographyContact({title="Have a story worth seeing?",description="Tell us what you are making, where you are going and why it matters."}:{title?:string;description?:string}) {
 return <section className="bg-white px-6 py-32 lg:px-10"><Reveal><div className="mx-auto max-w-6xl rounded-[3rem] bg-[#151515] px-7 py-20 text-center text-white lg:px-20"><Pill dark>Let's make something</Pill><h2 className="mx-auto mt-8 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.84] tracking-[-.06em]">{title}</h2><p className="mx-auto mt-7 max-w-xl text-white/45">{description}</p><a href="mailto:hello@example.com" className="mt-9 inline-flex rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:scale-105">Start a project →</a></div></Reveal></section>;
}
