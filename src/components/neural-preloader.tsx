"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const preloadSignals = [
  "Booting Gautam's portfolio...",
  "Loading interactive scenes...",
  "Syncing project and skill signals...",
  "Preparing contact and profile layers...",
] as const;

export function NeuralPreloader({
  ready,
}: {
  ready: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (ready) {
      return;
    }

    const progressInterval = window.setInterval(() => {
      setProgress((value) => Math.min(value + Math.random() * 14, 96));
    }, 160);

    const phaseInterval = window.setInterval(() => {
      setPhase((value) => (value + 1) % preloadSignals.length);
    }, 520);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(phaseInterval);
    };
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready ? (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-[#02030b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,231,255,0.12),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(255,79,216,0.12),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:54px_54px]" />

          <div className="relative z-10 flex w-[min(560px,calc(100%-2rem))] flex-col gap-7 rounded-[2rem] border border-cyan-300/15 bg-[rgba(5,10,24,0.72)] p-8 shadow-[0_0_120px_rgba(46,231,255,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-cyan-100/60">
              <span>Portfolio Boot</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="relative overflow-hidden rounded-full border border-white/8 bg-white/6">
              <div
                className="h-2 rounded-full bg-[linear-gradient(90deg,#2ee7ff,#ff4fd8,#8b5cff)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-3">
              <p className="font-display text-4xl tracking-[-0.06em] text-white">
                {preloadSignals[phase]}
              </p>
              <p className="max-w-xl text-sm leading-7 text-white/60">
                Initializing visuals, motion layers, and portfolio sections for the live
                experience.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="h-6 rounded-full bg-[linear-gradient(90deg,rgba(46,231,255,0.22),rgba(255,79,216,0.06))]"
                  animate={{
                    opacity: [0.25, 1, 0.35],
                    scaleX: [0.86, 1.08, 0.92],
                  }}
                  transition={{
                    duration: 1.1 + index * 0.05,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
