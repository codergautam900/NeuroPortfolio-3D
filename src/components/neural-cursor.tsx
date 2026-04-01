"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function NeuralCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const trailX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.4 });
  const trailY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.4 });
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    }

    function onDown() {
      setPressed(true);
    }

    function onUp() {
      setPressed(false);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [trailX, trailY, x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
        style={{
          x,
          y,
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
            pressed
              ? "h-5 w-5 border-fuchsia-300/90 bg-fuchsia-400/25"
              : "h-4 w-4 border-cyan-200/90 bg-cyan-300/30"
          }`}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/8 blur-sm" />
      </motion.div>
    </>
  );
}
