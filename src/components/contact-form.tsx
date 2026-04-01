"use client";

import { useActionState, useDeferredValue, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, LoaderCircle, Radar, Sparkles } from "lucide-react";
import { sendTransmissionAction } from "@/app/actions/transmission";
import {
  type TransmissionState,
  transmissionTypes,
  urgencyBands,
} from "@/lib/contact-schema";
import { profile } from "@/lib/neural-content";

const initialState: TransmissionState = {
  status: "idle",
  message:
    "Send a message for an internship, freelance project, collaboration, or general enquiry.",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-75"
    >
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          Sending message
        </>
      ) : (
        <>
          Send message
          <ArrowRight className="size-4" />
        </>
      )}
    </button>
  );
}

function formatFieldError(error?: string) {
  return error ? <span className="text-sm text-fuchsia-200">{error}</span> : null;
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendTransmissionAction, initialState);
  const [messageDraft, setMessageDraft] = useState("");
  const messageValue = useDeferredValue(messageDraft);

  const liveSignals = useMemo(
    () => {
      const lower = messageValue.toLowerCase();
      const items = [
        "Full-stack MERN collaboration",
        "Next.js and TypeScript product work",
        "Realtime and backend system design",
        "AI feature and LLM integration support",
      ];

      if (/intern|hire|role|placement|job/.test(lower)) {
        items.unshift("Hiring or internship signal detected");
      }

      if (/mern|react|frontend|ui|website|web app/.test(lower)) {
        items.unshift("Frontend and MERN alignment rising");
      }

      if (/node|express|api|backend|mongodb|database/.test(lower)) {
        items.unshift("Backend systems request recognized");
      }

      if (/ai|llm|openai|gemini|ollama|copilot|insight/.test(lower)) {
        items.unshift("AI integration request recognized");
      }

      if (/socket|realtime|real-time|telemetry|event/.test(lower)) {
        items.unshift("Realtime systems signal detected");
      }

      if (/freelance|collab|project|build/.test(lower)) {
        items.unshift("Project collaboration signal detected");
      }

      return Array.from(new Set(items)).slice(0, 4);
    },
    [messageValue],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
      <form action={formAction} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Name</span>
            <input name="name" className="field-input" placeholder="Your name" />
            {formatFieldError(state.fieldErrors?.name)}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Email</span>
            <input
              name="email"
              type="email"
              className="field-input"
              placeholder="name@company.com"
            />
            {formatFieldError(state.fieldErrors?.email)}
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-semibold text-white">Organization</span>
            <input name="organization" className="field-input" placeholder="Optional" />
            {formatFieldError(state.fieldErrors?.organization)}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Message Type</span>
            <select name="transmissionType" className="field-select" defaultValue={transmissionTypes[0]}>
              {transmissionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formatFieldError(state.fieldErrors?.transmissionType)}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Urgency</span>
            <select name="urgency" className="field-select" defaultValue={urgencyBands[0]}>
              {urgencyBands.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
            {formatFieldError(state.fieldErrors?.urgency)}
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-white">Project Brief</span>
          <textarea
            name="message"
            className="field-textarea"
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
            placeholder="Describe the internship, product, SaaS build, AI feature, or web project and how Gautam can help."
          />
          {formatFieldError(state.fieldErrors?.message)}
        </label>

        <SubmitButton />
      </form>

      <div className="space-y-5">
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
            Direct fallback
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">
            Email Gautam directly
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Live inbox delivery is not configured on this machine yet. For now, the form saves in
            local simulation mode, but you can directly mail Gautam here.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="secondary-button mt-5 min-h-11 px-4 py-2 text-sm"
          >
            {profile.email}
          </a>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                Contact routing
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.05em] text-white">
                Message priorities
              </h3>
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/16 bg-cyan-300/8">
              <Radar className="size-5 text-cyan-200" />
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {liveSignals.map((signal) => (
              <div
                key={signal}
                className="surface-line flex items-start gap-3 rounded-2xl px-4 py-3 text-sm text-white/72"
              >
                <Sparkles className="mt-0.5 size-4 shrink-0 text-fuchsia-300" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
            Contact status
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">
            {state.status === "success" ? "Message received" : "Awaiting input"}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/65">{state.message}</p>

          {state.leadId ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="surface-line rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                  Reference ID
                </p>
                <p className="mt-2 font-mono text-sm text-white">{state.leadId}</p>
              </div>
              <div className="surface-line rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                  Delivery mode
                </p>
                <p className="mt-2 text-sm text-white">
                  {state.deliveryMode === "resend" ? "Live inbox delivery" : "Simulation mode"}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
