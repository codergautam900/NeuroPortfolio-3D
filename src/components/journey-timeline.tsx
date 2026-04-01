"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { timelineMilestones } from "@/lib/neural-content";

export default function JourneyTimeline() {
  const [scrub, setScrub] = useState(42);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.98),rgba(4,7,18,0.98))] p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
            Education and growth timeline
          </p>
          <h3 className="mt-3 font-display text-4xl tracking-[-0.06em] text-white">
            Drag through Gautam&apos;s journey.
          </h3>
        </div>
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
            <span>Timeline position</span>
            <span>{scrub}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={scrub}
            onChange={(event) => setScrub(Number(event.target.value))}
            className="w-full accent-cyan-300"
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2" />
        <motion.div
          className="absolute left-3 top-0 w-px bg-[linear-gradient(180deg,#2ee7ff,#ff4fd8,#8b5cff)] md:left-1/2"
          animate={{ height: `${Math.max(10, scrub)}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="space-y-6">
          {timelineMilestones.map((milestone, index) => {
            const activeThreshold = ((index + 1) / timelineMilestones.length) * 100;
            const active = scrub >= activeThreshold - 14;

            return (
              <motion.div
                key={milestone.year}
                className={`relative grid gap-4 md:grid-cols-2 ${
                  index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="hidden md:block" />
                <div className="relative">
                  <span
                    className={`absolute left-0 top-6 h-3 w-3 rounded-full border md:left-[-1.72rem] ${
                      active
                        ? "border-cyan-200 bg-cyan-300 shadow-[0_0_24px_rgba(46,231,255,0.9)]"
                        : "border-white/15 bg-[#091220]"
                    }`}
                  />
                  <div
                    className={`rounded-[1.7rem] border p-5 md:p-6 ${
                      active
                        ? "border-cyan-300/22 bg-[rgba(5,12,28,0.88)] shadow-[0_0_80px_rgba(46,231,255,0.07)]"
                        : "border-white/10 bg-[rgba(5,10,24,0.7)]"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
                      {milestone.year}
                    </p>
                    <h4 className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">
                      {milestone.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
