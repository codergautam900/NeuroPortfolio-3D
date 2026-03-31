"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { ArrowRight, LoaderCircle, Send, ShieldCheck, Sparkles } from "lucide-react";
import {
  budgetBands,
  contactSchema,
  projectTypes,
  type ContactPayload,
} from "@/lib/contact-schema";

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
  leadId?: string;
  responseWindow?: string;
  recommendedStack?: string[];
};

const defaultForm: ContactPayload = {
  name: "",
  email: "",
  company: "",
  projectType: projectTypes[0],
  budget: budgetBands[1],
  message: "",
};

function flattenErrors(fieldErrors: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""]),
  ) as FieldErrors;
}

function deriveLiveSignal(
  message: string,
  projectType: string,
  budget: string,
): {
  score: number;
  lane: string;
  notes: string[];
  recommendedStack: string[];
} {
  const normalized = `${projectType} ${message}`.toLowerCase();
  const has3D = /3d|three|motion|scroll|immersive|webgl|hero/.test(normalized);
  const hasProduct = /saas|dashboard|product|platform|workflow|app/.test(normalized);
  const hasBrand = /brand|visual|identity|story|launch|positioning/.test(normalized);
  const hasConversion = /lead|funnel|pricing|cta|book|convert|inquiry/.test(normalized);

  const score =
    68 +
    (has3D ? 10 : 0) +
    (hasProduct ? 7 : 0) +
    (hasBrand ? 6 : 0) +
    (hasConversion ? 5 : 0) +
    (budget === budgetBands[2] ? 4 : 0);

  const lane = has3D
    ? "Immersive flagship build"
    : hasProduct
      ? "Product-led portfolio system"
      : "Narrative-first personal brand";

  const notes = [
    has3D ? "3D interaction moments detected" : "Keep one signature motion moment in the first fold",
    hasProduct
      ? "Strong product language suggests dashboard or SaaS proof sections"
      : "Consider adding one product architecture block for credibility",
    hasConversion
      ? "Lead capture intent is clear and worth keeping prominent"
      : "A clear CTA stack will make the portfolio convert harder",
  ];

  const recommendedStack = [
    "Next.js 16",
    "React 19",
    has3D ? "React Three Fiber" : "Framer Motion",
    hasProduct ? "Route Handlers" : "Server Components",
    "Zod Validation",
  ];

  if (hasBrand) {
    recommendedStack.push("Narrative Content System");
  }

  return {
    score: Math.min(score, 98),
    lane,
    notes,
    recommendedStack: Array.from(new Set(recommendedStack)),
  };
}

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(defaultForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "Share your vision and the system will suggest the strongest build lane.",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, startTransition] = useTransition();

  const deferredMessage = useDeferredValue(form.message);
  const liveSignal = deriveLiveSignal(
    deferredMessage,
    form.projectType,
    form.budget,
  );

  function updateField<Key extends keyof ContactPayload>(
    key: Key,
    value: ContactPayload[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((current) => ({ ...current, [key]: "" }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      setFieldErrors(flattenErrors(parsed.error.flatten().fieldErrors));
      setSubmitState({
        status: "error",
        message: "A few fields need attention before the request can be sent.",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json()) as
        | {
            error?: string;
            summary?: string;
            leadId?: string;
            responseWindow?: string;
            recommendedStack?: string[];
          }
        | {
            error: string;
            fieldErrors?: Record<string, string[] | undefined>;
          };

      if (!response.ok) {
        setFieldErrors(
          "fieldErrors" in payload && payload.fieldErrors
            ? flattenErrors(payload.fieldErrors)
            : {},
        );
        setSubmitState({
          status: "error",
          message: payload.error ?? "Something interrupted the request. Please try again.",
        });
        return;
      }

      startTransition(() => {
        setSubmitState({
          status: "success",
          message:
            "summary" in payload && payload.summary
              ? payload.summary
              : "Your request has been sent successfully.",
          leadId: "leadId" in payload ? payload.leadId : undefined,
          responseWindow:
            "responseWindow" in payload ? payload.responseWindow : undefined,
          recommendedStack:
            "recommendedStack" in payload ? payload.recommendedStack : undefined,
        });
        setForm(defaultForm);
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network hiccup. Retry once and the request should go through.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="field-input"
              placeholder="Your name"
            />
            {fieldErrors.name ? (
              <span className="text-sm text-orange-300">{fieldErrors.name}</span>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Email</span>
            <input
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="field-input"
              type="email"
              placeholder="name@company.com"
            />
            {fieldErrors.email ? (
              <span className="text-sm text-orange-300">{fieldErrors.email}</span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2 md:col-span-1">
            <span className="text-sm font-semibold text-white">Company</span>
            <input
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              className="field-input"
              placeholder="Optional"
            />
            {fieldErrors.company ? (
              <span className="text-sm text-orange-300">{fieldErrors.company}</span>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Project Type</span>
            <select
              value={form.projectType}
              onChange={(event) =>
                updateField(
                  "projectType",
                  event.target.value as (typeof projectTypes)[number],
                )
              }
              className="field-select"
            >
              {projectTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldErrors.projectType ? (
              <span className="text-sm text-orange-300">{fieldErrors.projectType}</span>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Budget</span>
            <select
              value={form.budget}
              onChange={(event) =>
                updateField("budget", event.target.value as (typeof budgetBands)[number])
              }
              className="field-select"
            >
              {budgetBands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldErrors.budget ? (
              <span className="text-sm text-orange-300">{fieldErrors.budget}</span>
            ) : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-white">Project Vision</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="field-textarea"
            placeholder="Tell me what kind of portfolio or product experience you want to build, what vibe it should have, and what outcome matters most."
          />
          {fieldErrors.message ? (
            <span className="text-sm text-orange-300">{fieldErrors.message}</span>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Sending Request
            </>
          ) : (
            <>
              Send Project Brief
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <div className="space-y-5">
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Live project signal
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.04em] text-white">
                {liveSignal.lane}
              </h3>
            </div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold text-white">
              {liveSignal.score}%
            </span>
          </div>

          <div className="mt-5 signal-bar">
            <span style={{ width: `${liveSignal.score}%` }} />
          </div>

          <div className="mt-6 space-y-3">
            {liveSignal.notes.map((note) => (
              <div
                key={note}
                className="surface-line flex items-start gap-3 rounded-2xl px-4 py-3 text-sm text-white/90"
              >
                <Sparkles className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
                <span>{note}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {liveSignal.recommendedStack.map((item) => (
              <span key={item} className="pill-chip text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
              {submitState.status === "success" ? (
                <ShieldCheck className="size-5 text-[var(--accent)]" />
              ) : (
                <Send className="size-5 text-[var(--accent-warm)]" />
              )}
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Contact pipeline
              </p>
              <h3 className="mt-1 font-display text-2xl tracking-[-0.04em] text-white">
                {submitState.status === "success" ? "Request received" : "Ready to queue"}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{submitState.message}</p>

          {submitState.leadId ? (
            <div className="mt-5 space-y-3">
              <div className="surface-line rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Reference ID
                </p>
                <p className="mt-2 font-mono text-sm text-white">{submitState.leadId}</p>
              </div>
              {submitState.responseWindow ? (
                <div className="surface-line rounded-2xl px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Response window
                  </p>
                  <p className="mt-2 text-sm text-white">{submitState.responseWindow}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {submitState.recommendedStack?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {submitState.recommendedStack.map((item) => (
                <span key={item} className="pill-chip text-sm">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
