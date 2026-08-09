"use client";

export type EmberMarqueeProps = {
  items: string[];
};

/** Infinite marquee that stitches bakery sections together. */
export const EmberMarquee = ({ items }: EmberMarqueeProps) => {
  const loop = [...(items ?? []), ...(items ?? [])];
  return (
    <div className="relative overflow-hidden border-y border-stone-800 bg-stone-900/60 py-6">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 font-display text-3xl tracking-tight text-amber-100/70 md:text-5xl"
          >
            {item}
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-950 to-transparent" />
    </div>
  );
};
