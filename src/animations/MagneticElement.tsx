"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

export interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  as?: any;
  href?: string;
  [key: string]: any;
}

export const MagneticElement = ({
  children,
  className,
  intensity = 0.2,
  as: Component = "button",
  ...props
}: MagneticElementProps) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = motion.create ? motion.create(Component) : motion(Component);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse as any}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
