"use client";
import { Reveal, FocusCursor, ImageReveal } from "@/magic";
export function PhotographyGallery({images}:{images:{title:string;imageUrl:string}[]}) {
 return <section id="work" className="bg-black px-4 py-20 text-white lg:px-8"><FocusCursor label="VIEW" /><div className="grid gap-4 md:grid-cols-12">{images.map((x,i)=><Reveal key={x.title} delay={(i%4)*80} className={i%5===0?"md:col-span-7":"md:col-span-5"}><article className="group relative overflow-hidden"><ImageReveal src={x.imageUrl} alt={x.title} className="w-full"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 transition group-hover:opacity-100"/><div className="absolute bottom-5 left-5 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"><p className="text-xl">{x.title}</p><p className="text-xs text-white/50">View project →</p></div></article></Reveal>)}</div></section>;
}
