"use client";
import {useEffect,useRef} from "react";
import {useMagic} from "./MagicProvider";

export function Magnetic({children,className="",strength=.2}:{children:React.ReactNode;className?:string;strength?:number}){
 const ref=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 useEffect(()=>{if(!settings.magnetic)return;const e=ref.current;if(!e)return;
 const move=(x:PointerEvent)=>{const r=e.getBoundingClientRect();e.style.transform=`translate(${(x.clientX-r.left-r.width/2)*strength}px,${(x.clientY-r.top-r.height/2)*strength}px)`};
 const leave=()=>{e.style.transition="transform .5s cubic-bezier(.16,1,.3,1)";e.style.transform="translate(0,0)"};e.addEventListener("pointermove",move);e.addEventListener("pointerleave",leave);return()=>{e.removeEventListener("pointermove",move);e.removeEventListener("pointerleave",leave)}},[settings.magnetic,strength]);
 return <div ref={ref} className={className}>{children}</div>;
}
export function Reveal({children,className="",delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
 const ref=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 useEffect(()=>{if(!settings.scrollReveal)return;const e=ref.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){e.dataset.visible="true";o.disconnect()}},{threshold:.1});o.observe(e);return()=>o.disconnect()},[settings.scrollReveal]);
 return <div ref={ref} className={"magic-reveal "+className} style={{"--magic-delay":`${delay}ms`} as React.CSSProperties}>{children}</div>;
}
export function MagicCard({children,className=""}:{children:React.ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 const move=(e:React.PointerEvent<HTMLDivElement>)=>{if(!settings.glassReflection)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--mx",`${((e.clientX-r.left)/r.width)*100}%`);e.currentTarget.style.setProperty("--my",`${((e.clientY-r.top)/r.height)*100}%`)};
 return <div ref={ref} onPointerMove={move} className={"magic-card "+className}>{children}</div>;
}
export function ImageReveal({src,alt="",className=""}:{src:string;alt?:string;className?:string}){
 const ref=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 useEffect(()=>{if(!settings.imageReveal)return;const e=ref.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x.isIntersecting){e.dataset.visible="true";o.disconnect()}},{threshold:.08});o.observe(e);return()=>o.disconnect()},[settings.imageReveal]);
 return <div ref={ref} className={"magic-image "+className}><img src={src} alt={alt}/></div>;
}
export function SectionTitle({eyebrow,title}:{eyebrow?:string;title:string}){
 return <div className="magic-section-title"><span>{eyebrow}</span><h2>{title}</h2></div>;
}
