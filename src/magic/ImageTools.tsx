"use client";
import {useEffect,useRef} from "react";
import {useMagic} from "./MagicProvider";
export function FocusCursor({label="VIEW"}:{label?:string}){const r=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 useEffect(()=>{if(!settings.focusCursor)return;const f=(e:PointerEvent)=>{if(r.current)r.current.style.transform=`translate(${e.clientX-28}px,${e.clientY-28}px)`};addEventListener("pointermove",f);return()=>removeEventListener("pointermove",f)},[settings.focusCursor]);
 return settings.focusCursor?<div ref={r} className="magic-focus">{label}</div>:null;
}
export function Parallax({children,speed=.08}:{children:React.ReactNode;speed?:number}){const r=useRef<HTMLDivElement>(null);const {settings}=useMagic();
 useEffect(()=>{if(!settings.parallax)return;let f=0;const loop=()=>{if(r.current){const b=r.current.getBoundingClientRect();r.current.style.transform=`translateY(${(innerHeight/2-(b.top+b.height/2))*speed}px)`}f=requestAnimationFrame(loop)};f=requestAnimationFrame(loop);return()=>cancelAnimationFrame(f)},[settings.parallax,speed]);
 return <div ref={r}>{children}</div>;
}
