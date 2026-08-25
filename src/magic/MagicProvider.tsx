"use client";
import {createContext,useContext,useMemo,type ReactNode} from "react";
import {defaultMagicSettings,magicThemeVars,type MagicIntensity,type MagicSettings,type MagicTheme} from "./types";
const C=createContext<{theme:MagicTheme;intensity:MagicIntensity;settings:MagicSettings}>({theme:"minimal",intensity:"cinematic",settings:defaultMagicSettings});
export function MagicProvider({children,theme="minimal",settings}:{children:ReactNode;theme?:MagicTheme;settings?:Partial<MagicSettings>}){
 const merged=useMemo(()=>({...defaultMagicSettings,...settings}),[settings]);
 return <C.Provider value={{theme,intensity:merged.intensity,settings:merged}}>
   <div className="magic-root" data-magic-theme={theme} data-magic-intensity={merged.intensity} style={magicThemeVars[theme] as React.CSSProperties}>{children}</div>
 </C.Provider>;
}
export const useMagic=()=>useContext(C);
