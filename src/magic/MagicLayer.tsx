"use client";
import {MagicProvider,useMagic} from "./MagicProvider";
import {useEffect,useRef,useMemo} from "react";
import type {MagicSettings,MagicTheme} from "./types";

export function MagicLayer({theme="minimal",settings,children}:{theme?:MagicTheme;settings?:Partial<MagicSettings>;children?:React.ReactNode}){
 return <MagicProvider theme={theme} settings={settings}><MagicEffects/>{children}</MagicProvider>;
}
function MagicEffects(){
 const {settings}=useMagic(); const aura=useRef<HTMLDivElement>(null); const trail=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!settings.cursorAura||!aura.current)return;let x=0,y=0,tx=0,ty=0,f=0;
 const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY}; const loop=()=>{x+=(tx-x)*.12;y+=(ty-y)*.12;if(aura.current)aura.current.style.transform=`translate3d(${x-180}px,${y-180}px,0)`;f=requestAnimationFrame(loop)};
 addEventListener("pointermove",move);f=requestAnimationFrame(loop);return()=>{removeEventListener("pointermove",move);cancelAnimationFrame(f)}} , [settings.cursorAura]);
 useEffect(()=>{if(!settings.cursorTrail||!trail.current)return;const dots=Array.from({length:8},()=>{const d=document.createElement("i");d.className="magic-trail-dot";trail.current!.append(d);return d});let n=0;
 const move=(e:PointerEvent)=>{const d=dots[n++%dots.length];d.style.left=e.clientX+"px";d.style.top=e.clientY+"px";d.animate([{opacity:.7,transform:"translate(-50%,-50%) scale(1)"},{opacity:0,transform:"translate(-50%,-50%) scale(.1)"}],{duration:600,fill:"forwards"})};
 addEventListener("pointermove",move);return()=>removeEventListener("pointermove",move)},[settings.cursorTrail]);
 const particles=useMemo(()=>Array.from({length:18},(_,i)=>i),[]);
 return <>
  {settings.cursorAura&&<div ref={aura} className="magic-cursor-aura" aria-hidden/>}
  {settings.cursorTrail&&<div ref={trail} className="magic-trail" aria-hidden/>}
  {settings.particles&&<div className="magic-particles" aria-hidden>{particles.map(i=><i key={i}/>)}</div>}
  {settings.grain&&<div className="magic-grain" aria-hidden/>}
  {settings.morphingBlob&&<div className="magic-morphing-blob" aria-hidden/>}
  {settings.constellation&&<svg className="magic-constellation" viewBox="0 0 100 100" aria-hidden>{Array.from({length:12},(_,i)=><circle key={i} cx={(i*31)%95+2} cy={(i*47)%90+4} r=".6"/>)}</svg>}
 </>;
}
