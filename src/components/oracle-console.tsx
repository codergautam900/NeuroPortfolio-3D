"use client";

import { motion } from "framer-motion";
import { Mic, SendHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  start: () => void;
  stop: () => void;
};

type BrowserWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

type OracleMessage = {
  role: "user" | "oracle";
  content: string;
};

const starters = [
  "Why would Gautam be a strong full-stack intern?",
  "Tell me about SustainOS AI and its architecture.",
  "How did FOSSHack 2026 shape this portfolio?",
] as const;

export default function OracleConsole() {
  const [messages, setMessages] = useState<OracleMessage[]>([
    {
      role: "oracle",
      content:
        "Oracle online. Ask about Gautam's projects, MERN and Next.js work, AI integrations, realtime systems, or internship fit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  useEffect(() => {
    const browserWindow = window as BrowserWindow;
    const SpeechRecognitionAPI =
      browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setInput(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  async function askOracle(question: string) {
    const clean = question.trim();
    if (!clean) {
      return;
    }

    setMessages((current) => [...current, { role: "user", content: clean }]);
    setInput("");

    startTransition(async () => {
      const response = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean }),
      }).catch(() => null);

      if (!response?.body) {
        setMessages((current) => [
          ...current,
          {
            role: "oracle",
            content:
              "The oracle channel dropped for a second. Try once more and the relay should stabilize.",
          },
        ]);
        return;
      }

      const decoder = new TextDecoder();
      const reader = response.body.getReader();
      let aggregate = "";

      setMessages((current) => [...current, { role: "oracle", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        aggregate += decoder.decode(value, { stream: true });
        setMessages((current) => {
          const next = [...current];
          next[next.length - 1] = { role: "oracle", content: aggregate };
          return next;
        });
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.98),rgba(4,7,18,0.98))] p-6">
        <div className="rounded-[1.6rem] border border-cyan-300/16 bg-[radial-gradient(circle_at_top,rgba(46,231,255,0.16),transparent_42%),rgba(4,10,20,0.72)] p-6 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(46,231,255,0.45),rgba(255,79,216,0.22),transparent_70%)] shadow-[0_0_80px_rgba(46,231,255,0.12)]">
            <div className="h-12 w-12 rounded-full bg-[linear-gradient(135deg,#2ee7ff,#ff4fd8)] blur-[0.5px]" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-cyan-100/55">
            Portfolio oracle / guided Q&A
          </p>
          <h3 className="mt-3 font-display text-4xl tracking-[-0.06em] text-white">
            Ask about Gautam.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            This portfolio assistant can explain Gautam&apos;s projects, summarize his strengths,
            and answer visitor questions across full-stack engineering, AI features, and delivery
            experience.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {starters.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => askOracle(starter)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/65 transition hover:border-cyan-300/22 hover:text-white"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.98),rgba(4,7,18,0.98))] p-6">
        <div className="space-y-3 rounded-[1.5rem] border border-white/8 bg-black/16 p-4">
          <div className="max-h-[360px] space-y-3 overflow-auto pr-1">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`rounded-[1.35rem] border px-4 py-3 ${
                  message.role === "oracle"
                    ? "border-cyan-300/12 bg-cyan-300/5"
                    : "border-white/10 bg-white/6"
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {message.role === "oracle" ? "Oracle" : "Visitor"}
                </p>
                <p className="text-sm leading-7 text-white/72">
                  {message.content || "Streaming response..."}
                </p>
              </motion.div>
            ))}
          </div>

          <form
            className="flex flex-col gap-3 md:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void askOracle(input);
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Gautam's projects, skills, internships, Next.js, AI integrations, Socket.IO, or backend experience..."
              className="min-h-[96px] flex-1 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
            />
            <div className="flex gap-2 md:flex-col">
              <button
                type="button"
                onClick={() => recognitionRef.current?.start()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/70 transition hover:text-white"
              >
                <Mic className="size-4" />
                Voice
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2ee7ff,#ff4fd8)] px-5 text-sm font-semibold text-[#050816] transition disabled:opacity-70"
              >
                {isPending ? <Sparkles className="size-4 animate-pulse" /> : <SendHorizontal className="size-4" />}
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
