"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Volume2 } from "lucide-react";

export function AudioToggle() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [bars, setBars] = useState<number[]>([16, 26, 18, 30, 22, 28]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      oscillatorsRef.current.forEach((osc) => osc.stop());
      audioContextRef.current?.close().catch(() => null);
    };
  }, []);

  function animateBars() {
    const analyser = analyserRef.current;
    if (!analyser) {
      return;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    const chunk = Math.floor(data.length / 6);
    const nextBars = Array.from({ length: 6 }, (_, index) => {
      const slice = data.slice(index * chunk, index * chunk + chunk);
      const average =
        slice.reduce((total, value) => total + value, 0) / Math.max(slice.length, 1);

      return Math.max(10, Math.min(42, average / 6.4));
    });

    setBars(nextBars);
    rafRef.current = requestAnimationFrame(animateBars);
  }

  async function toggleAudio() {
    if (enabled) {
      gainRef.current?.gain.linearRampToValueAtTime(
        0.0001,
        (audioContextRef.current?.currentTime ?? 0) + 0.25,
      );
      setEnabled(false);
      return;
    }

    const AudioCtx = window.AudioContext || (window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;

    if (!AudioCtx) {
      return;
    }

    const context = audioContextRef.current ?? new AudioCtx();
    const analyser = analyserRef.current ?? context.createAnalyser();
    const gain = gainRef.current ?? context.createGain();

    analyser.fftSize = 128;
    gain.gain.value = 0.0001;
    gain.connect(analyser);
    analyser.connect(context.destination);

    audioContextRef.current = context;
    analyserRef.current = analyser;
    gainRef.current = gain;

    if (oscillatorsRef.current.length === 0) {
      const base = context.createOscillator();
      const harmony = context.createOscillator();
      const shimmer = context.createOscillator();
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();

      base.type = "sawtooth";
      harmony.type = "triangle";
      shimmer.type = "sine";
      lfo.type = "sine";

      base.frequency.value = 92;
      harmony.frequency.value = 138;
      shimmer.frequency.value = 276;
      lfo.frequency.value = 0.22;
      lfoGain.gain.value = 14;

      lfo.connect(lfoGain);
      lfoGain.connect(shimmer.frequency);

      base.connect(gain);
      harmony.connect(gain);
      shimmer.connect(gain);

      base.start();
      harmony.start();
      shimmer.start();
      lfo.start();

      oscillatorsRef.current = [base, harmony, shimmer, lfo];
    }

    await context.resume();
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.linearRampToValueAtTime(0.028, context.currentTime + 0.45);
    setEnabled(true);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    animateBars();
  }

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="group fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-full border border-cyan-300/18 bg-[rgba(6,12,26,0.74)] px-4 py-3 text-sm text-white/80 shadow-[0_0_40px_rgba(46,231,255,0.08)] backdrop-blur-xl transition hover:border-cyan-200/35 hover:text-white"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6">
        {enabled ? <Pause className="size-4" /> : <Volume2 className="size-4" />}
      </span>
      <span className="hidden text-left md:block">
        <span className="block text-[10px] uppercase tracking-[0.24em] text-white/45">
          Atmosphere
        </span>
        <span className="block font-medium">{enabled ? "Neural synth on" : "Enable synth"}</span>
      </span>
      <span className="hidden items-end gap-1 md:flex">
        {bars.map((bar, index) => (
          <span
            key={index}
            className="w-1 rounded-full bg-[linear-gradient(180deg,#2ee7ff,#ff4fd8)] transition-[height] duration-150"
            style={{ height: `${bar}px` }}
          />
        ))}
      </span>
    </button>
  );
}
