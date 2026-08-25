"use client";
import {useEffect,useState} from "react";
import {useMagic} from "./MagicProvider";
export function ScrollProgress({labels=[]}:{labels?:string[]}){
 const {settings}=useMagic();const [p,setP]=useState(0);
 useEffect(()=>{if(!settings.scrollProgress)return;const f=()=>{const m=document.documentElement.scrollHeight-innerHeight;setP(m>0?scrollY/m:0)};addEventListener("scroll",f,{passive:true});f();return()=>removeEventListener("scroll",f)},[settings.scrollProgress]);
 if(!settings.scrollProgress)return null;
 return <div className="magic-progress" aria-hidden><i style={{transform:`scaleY(${p})`}}/>{labels.length>0&&<div>{labels.map((x,i)=><span key={x+i}>{x}</span>)}</div>}</div>;
}
