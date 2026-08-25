"use client";
import { Reveal, Pill } from "./magical/MagicMotion";

export function RealEstateAgentSpotlight({
  name = "Maya Laurent",
  role = "Creative Director · Property Advisor",
  bio = "A quieter approach to real estate, pairing local knowledge with a sharp eye for architecture.",
  imageUrl = "",
}: {name?:string;role?:string;bio?:string;imageUrl?:string}) {
  return <section id="contact" className="bg-white px-6 py-28 lg:px-10"><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.7fr_1fr]"><Reveal><div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100"><img src={imageUrl} alt={name} className="h-full w-full object-cover transition duration-1000 hover:scale-105"/></div></Reveal><Reveal delay={120}><Pill>Your advisor</Pill><h2 className="mt-6 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">{name}</h2><p className="mt-4 text-sm uppercase tracking-[.2em] text-slate-400">{role}</p><p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">{bio}</p><a href="mailto:hello@example.com" className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1">Start a private conversation →</a></Reveal></div></section>;
}
