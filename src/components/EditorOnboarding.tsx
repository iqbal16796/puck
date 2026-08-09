"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Stable partial-class selectors derived from Puck's compiled CSS
const PUCK_SELECTORS = {
  left: '[class*="_Sidebar--left_"]',
  canvas: '[class*="_PuckCanvas_"]',
  right: '[class*="_Sidebar--right_"]',
  header: '[class*="_PuckHeader_"]',
};

const STEPS = [
  {
    title: "Welcome to your Workspace",
    text: "We've pre-loaded a complete, beautiful layout for you. Everything you see is 100% customizable.",
    target: null, // no highlight — full-screen welcome
  },
  {
    title: "Your Building Blocks",
    text: "Drag any of these components onto the canvas to add them to your site. Every section is fully customizable.",
    target: PUCK_SELECTORS.left,
  },
  {
    title: "The Canvas",
    text: "This is your live preview. Click any section to select it, then drag to reorder. What you see is what your visitors get.",
    target: PUCK_SELECTORS.canvas,
  },
  {
    title: "Edit Properties",
    text: "When you select a section on the canvas, its settings appear here — change text, images, colors, and more.",
    target: PUCK_SELECTORS.right,
  },
  {
    title: "Publish When Ready",
    text: "Hit the Publish button up top to go live. You'll get a unique URL to share with the world — no account needed.",
    target: PUCK_SELECTORS.header,
  },
];

type Rect = { top: number; left: number; width: number; height: number };

function getRect(selector: string | null): Rect | null {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

const PAD = 8; // padding around the highlighted element

export const EditorOnboarding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  // Poll until Puck's left sidebar is in the DOM
  useEffect(() => {
    const seen = localStorage.getItem("puck_tour_done");
    if (seen) return;

    const poll = setInterval(() => {
      if (document.querySelector(PUCK_SELECTORS.left)) {
        clearInterval(poll);
        setTimeout(() => setIsVisible(true), 600);
      }
    }, 200);

    const abort = setTimeout(() => {
      clearInterval(poll);
      setIsVisible(true);
    }, 5000);

    return () => {
      clearInterval(poll);
      clearTimeout(abort);
    };
  }, []);

  // Recompute highlight rect whenever step changes
  const updateRect = useCallback(() => {
    const step = STEPS[currentStep];
    setRect(getRect(step.target));
  }, [currentStep]);

  useEffect(() => {
    if (!isVisible) return;
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [isVisible, updateRect]);

  const finish = () => {
    setIsVisible(false);
    localStorage.setItem("puck_tour_done", "1");
  };

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      finish();
    }
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  if (!isVisible) return null;

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  // Spotlight hole dimensions
  const hole = rect
    ? {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null;

  const TOOLTIP_W = 340;
  const TOOLTIP_H = 220; // approximate height for clearance calc
  const MARGIN = 16;

  // Smart positioning: prefer beside the panel, fall back to below/above
  function calcTooltipStyle(): React.CSSProperties {
    if (!hole) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 420,
      };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rightOfHole = hole.left + hole.width + MARGIN;
    const leftOfHole  = hole.left - TOOLTIP_W - MARGIN;
    const topAligned  = Math.min(Math.max(hole.top, MARGIN), vh - TOOLTIP_H - MARGIN);

    // 1. Enough room to the RIGHT?
    if (rightOfHole + TOOLTIP_W + MARGIN <= vw) {
      return { position: "fixed", top: topAligned, left: rightOfHole, width: TOOLTIP_W };
    }
    // 2. Enough room to the LEFT?
    if (leftOfHole >= MARGIN) {
      return { position: "fixed", top: topAligned, left: leftOfHole, width: TOOLTIP_W };
    }
    // 3. Enough room BELOW?
    const belowTop = hole.top + hole.height + MARGIN;
    if (belowTop + TOOLTIP_H + MARGIN <= vh) {
      const l = Math.min(Math.max(hole.left, MARGIN), vw - TOOLTIP_W - MARGIN);
      return { position: "fixed", top: belowTop, left: l, width: TOOLTIP_W };
    }
    // 4. Fall back ABOVE
    const aboveTop = hole.top - TOOLTIP_H - MARGIN;
    const l = Math.min(Math.max(hole.left, MARGIN), vw - TOOLTIP_W - MARGIN);
    return { position: "fixed", top: Math.max(aboveTop, MARGIN), left: l, width: TOOLTIP_W };
  }

  const tooltipStyle = calcTooltipStyle();

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dark overlay with SVG cutout for spotlight */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: "default" }}
        onClick={(e) => {
          // only dismiss if clicking outside the hole
          if (!hole) return;
          const { clientX: x, clientY: y } = e;
          const inHole =
            x >= hole.left &&
            x <= hole.left + hole.width &&
            y >= hole.top &&
            y <= hole.top + hole.height;
          if (!inHole) next();
        }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {hole && (
              <rect
                x={hole.left}
                y={hole.top}
                width={hole.width}
                height={hole.height}
                rx={10}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(9,9,11,0.82)"
          mask="url(#spotlight-mask)"
        />
        {/* Glowing border around the highlighted element */}
        {hole && (
          <rect
            x={hole.left}
            y={hole.top}
            width={hole.width}
            height={hole.height}
            rx={10}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={2}
            style={{
              filter: "drop-shadow(0 0 8px rgba(244,63,94,0.7))",
            }}
          />
        )}
      </svg>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={tooltipStyle}
          className="pointer-events-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]"
        >
          {/* Step counter */}
          <span className="text-rose-500 font-mono text-xs tracking-widest uppercase mb-3 block">
            Step {currentStep + 1} of {STEPS.length}
          </span>

          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            {step.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {step.text}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mb-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-6 bg-rose-500"
                    : i < currentStep
                    ? "w-2 bg-rose-800"
                    : "w-2 bg-zinc-700"
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={finish}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-3">
              {!isFirst && (
                <button
                  onClick={back}
                  className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors uppercase tracking-wider"
                >
                  Back
                </button>
              )}
              <button
                onClick={next}
                className="px-5 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-rose-900/40 hover:scale-105 active:scale-95"
              >
                {isLast ? "Get Started" : "Next →"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
