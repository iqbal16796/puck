"use client";

import React, { useEffect, useRef, useState } from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function WellnessReveal({
  children,
  delay = 0,
  className,
  direction = "up",
  duration = 800,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (revealed) return "none";
    switch (direction) {
      case "up": return "translateY(30px)";
      case "down": return "translateY(-30px)";
      case "left": return "translateX(30px)";
      case "right": return "translateX(-30px)";
      case "none": return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
        opacity: revealed ? 1 : 0,
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
}

export function WellnessTextReveal({
  text,
  className,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("inline-flex flex-wrap gap-[0.3em]", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: revealed ? `${delayOffset + i * 100}ms` : "0ms",
            opacity: revealed ? 1 : 0.1,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function WellnessMarquee({ text, className }: { text: string; className?: string }) {
  // We duplicate text to ensure seamless scrolling
  return (
    <div className={cn("relative flex overflow-hidden whitespace-nowrap", className)}>
      <div className="flex animate-wellnessMarquee whitespace-nowrap">
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
}

export function WellnessAtmosphere({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden -z-10", className)}>
      <div 
        className="absolute -left-[20%] -top-[20%] h-[60vw] w-[60vw] rounded-full bg-emerald-900/20 blur-[120px] animate-wellnessBreathe"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute -right-[10%] top-[30%] h-[40vw] w-[40vw] rounded-full bg-lime-900/10 blur-[100px] animate-wellnessBreathe"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] h-[50vw] w-[50vw] rounded-full bg-stone-800/40 blur-[140px] animate-wellnessBreathe"
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
    </div>
  );
}

export function WellnessMagnetic({
  children,
  className,
  as: Component = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
} & React.HTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Move 20% of the distance to the center
      const x = (clientX - centerX) * 0.2;
      const y = (clientY - centerY) * 0.2;
      
      setPosition({ x, y });
    }
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
