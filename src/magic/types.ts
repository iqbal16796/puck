export type MagicTheme="luxury"|"hotel"|"photography"|"interior"|"ai"|"creative"|"minimal";
export type MagicIntensity="minimal"|"elegant"|"cinematic"|"immersive";
export type MagicSettings={
 enabled:boolean; intensity:MagicIntensity; cursorAura:boolean; cursorTrail:boolean;
 magnetic:boolean; focusCursor:boolean; scrollReveal:boolean; depth:boolean; parallax:boolean;
 scrollProgress:boolean; particles:boolean; grain:boolean; imageReveal:boolean;
 glassReflection:boolean; constellation:boolean; morphingBlob:boolean; dynamicGrid:boolean;
 sectionHeaders:boolean;
};
export const defaultMagicSettings:MagicSettings={
 enabled:true,intensity:"cinematic",cursorAura:true,cursorTrail:false,magnetic:true,
 focusCursor:false,scrollReveal:true,depth:true,parallax:false,scrollProgress:true,
 particles:false,grain:true,imageReveal:true,glassReflection:true,constellation:false,
 morphingBlob:true,dynamicGrid:false,sectionHeaders:true
};
export const magicThemeVars:Record<MagicTheme,Record<string,string>>={
 luxury:{"--magic-a":"245 158 11","--magic-b":"255 255 255"},
 hotel:{"--magic-a":"251 191 36","--magic-b":"255 255 255"},
 photography:{"--magic-a":"255 255 255","--magic-b":"244 63 94"},
 interior:{"--magic-a":"148 163 184","--magic-b":"245 158 11"},
 ai:{"--magic-a":"34 211 238","--magic-b":"217 70 239"},
 creative:{"--magic-a":"244 63 94","--magic-b":"168 85 247"},
 minimal:{"--magic-a":"148 163 184","--magic-b":"255 255 255"}
};
