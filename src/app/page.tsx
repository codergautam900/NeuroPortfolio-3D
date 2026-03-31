import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  Cpu,
  Database,
  Globe,
  Layers3,
  Orbit,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import HeroScene from "@/components/hero-scene";
import { Reveal } from "@/components/reveal";

const signatureSystems = [
  {
    title: "Launch Trailer Hero",
    description:
      "A cinematic first fold with a live 3D scene, layered copy, and motion-driven CTA hierarchy.",
    icon: Orbit,
    bullets: [
      "React Three Fiber scene",
      "Scroll-stopping visual depth",
      "Recruiter-friendly narrative hook",
    ],
  },
  {
    title: "Proof of Range",
    description:
      "Premium cards and capability blocks that sell engineering depth, product thinking, and frontend craft fast.",
    icon: Layers3,
    bullets: [
      "System design storytelling",
      "High-signal content layout",
      "Glassmorphism with restraint",
    ],
  },
  {
    title: "Conversion Layer",
    description:
      "A real API-backed contact flow with validation and live project intelligence so the site behaves like a product.",
    icon: Workflow,
    bullets: [
      "Next.js Route Handler",
      "Zod schema validation",
      "Client-side live qualification",
    ],
  },
] as const;

const proofSignals = [
  {
    title: "Visual Authority",
    copy: "The UI feels deliberate, modern, and premium instead of another safe template clone.",
    icon: Sparkles,
  },
  {
    title: "Engineering Depth",
    copy: "App Router, typed APIs, and interaction systems show that this is more than surface-level styling.",
    icon: Braces,
  },
  {
    title: "Product Sense",
    copy: "Each section answers a business question: who you are, what you build, and why someone should hire you.",
    icon: Globe,
  },
  {
    title: "Trust Layer",
    copy: "The contact section adds structure, validation, and responsiveness that feels deployment-ready.",
    icon: ShieldCheck,
  },
] as const;

const stackGroups = [
  {
    title: "Frontend Motion Stack",
    icon: Sparkles,
    items: [
      "Next.js 16 App Router",
      "React 19 component architecture",
      "Framer Motion reveals",
      "Tailwind CSS v4 styling system",
    ],
  },
  {
    title: "3D Experience Layer",
    icon: Orbit,
    items: [
      "Three.js rendering",
      "React Three Fiber scene control",
      "Drei helpers and materials",
      "Pointer-reactive animation loops",
    ],
  },
  {
    title: "Backend and Validation",
    icon: Database,
    items: [
      "Route Handlers in the app directory",
      "Shared Zod validation schema",
      "Client + server form feedback",
      "Full-stack structure ready for email/CRM integration",
    ],
  },
] as const;

const deliveryFlow = [
  {
    step: "01",
    title: "Positioning",
    copy: "We frame the portfolio around your strongest edge: frontend, full stack, AI, product, or founder-led storytelling.",
  },
  {
    step: "02",
    title: "Visual System",
    copy: "We translate that positioning into a bold design language with depth, motion, hierarchy, and signature moments.",
  },
  {
    step: "03",
    title: "Interaction Build",
    copy: "The UI gets 3D scenes, responsive layouts, and conversion surfaces that feel premium on desktop and mobile.",
  },
  {
    step: "04",
    title: "Ship Ready",
    copy: "The final result is a real product shell, not just a mockup: typed, responsive, and easy to extend.",
  },
] as const;

const technologyStrip = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "Framer Motion",
  "React Three Fiber",
  "Drei",
  "Zod",
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="mb-8 max-w-3xl space-y-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-white md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
        {description}
      </p>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="relative isolate overflow-x-clip">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(5,8,22,0.72)] backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between gap-4 py-4">
          <Link href="#hero" className="font-display text-lg tracking-[0.24em] text-white">
            NEXUS//PORTFOLIO
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
            <Link href="#signature">Signature</Link>
            <Link href="#impact">Proof</Link>
            <Link href="#stack">Stack</Link>
            <Link href="#flow">Flow</Link>
          </nav>
          <Link href="#contact" className="secondary-button min-h-11 px-4 py-2 text-sm">
            Book Intro
          </Link>
        </div>
      </header>

      <main>
        <section id="hero" className="section-shell pb-16 pt-8 md:pb-20 md:pt-12">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10">
            <Reveal className="space-y-8">
              <span className="eyebrow">
                Creative Full-Stack Engineer / 3D-first web system / Recruiter magnet
              </span>
              <div className="space-y-6">
                <h1 className="hero-title max-w-4xl text-white">
                  Cinematic interfaces.
                  <br />
                  Real engineering depth.
                  <br />
                  One-scroll impact.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                  This portfolio is built to make founders, clients, and hiring teams stop
                  scrolling. It combines high-end 3D visuals, polished motion, and a real
                  full-stack contact system so the experience feels expensive and the codebase
                  stays serious.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="#contact" className="primary-button">
                  Build My Portfolio
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="#signature" className="secondary-button">
                  Explore The System
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: "3D", label: "immersive first impression" },
                  { value: "API", label: "live contact qualification" },
                  { value: "60fps", label: "motion-first target feel" },
                ].map((item) => (
                  <div key={item.label} className="glass-panel p-5">
                    <p className="font-display text-4xl tracking-[-0.05em] text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="scene-frame overflow-hidden p-4 md:p-6">
                <div className="surface-line absolute left-4 right-4 top-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] text-[var(--muted)] md:left-6 md:right-6 md:top-6">
                  <span>Recruiter-grade storytelling</span>
                  <span>Desktop + mobile ready</span>
                </div>

                <HeroScene />

                <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-3 md:bottom-6 md:left-6 md:right-6 md:grid-cols-2">
                  <div className="surface-line rounded-3xl p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Experience layer
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/90">
                      Scroll-safe depth, pointer-reactive motion, and structured copy that feels
                      like a premium launch page.
                    </p>
                  </div>
                  <div className="surface-line rounded-3xl p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Technology spine
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/90">
                      App Router, React 19, Three.js, Framer Motion, and typed validation woven
                      into one clean build.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-shell pb-8 md:pb-12">
          <Reveal className="flex flex-wrap gap-3">
            {technologyStrip.map((item) => (
              <span key={item} className="pill-chip">
                <BadgeCheck className="size-4 text-[var(--accent)]" />
                {item}
              </span>
            ))}
          </Reveal>
        </section>

        <section id="signature" className="section-shell py-14 md:py-20">
          <SectionHeading
            eyebrow="Signature Sections"
            title="Everything that makes the site feel elite is intentional."
            description="The layout is split into distinct systems so your portfolio sells taste, depth, and technical range in the first few scrolls."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {signatureSystems.map(({ title, description, icon: Icon, bullets }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="glass-panel h-full p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                      <Icon className="size-6 text-[var(--accent)]" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl leading-tight tracking-[-0.04em] text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {bullets.map((bullet) => (
                      <span key={bullet} className="pill-chip text-sm">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="impact" className="section-shell py-14 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal className="glass-panel p-8 md:p-10">
              <span className="eyebrow">Proof Layer</span>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.04em] text-white md:text-5xl">
                This portfolio is designed to say
                <br />
                &ldquo;not another generic candidate.&rdquo;
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
                It positions you as someone who can think like a designer, build like an engineer,
                and present work like a product team. The visuals grab attention, but the structure
                underneath is what keeps people reading.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Design taste", value: "Premium" },
                  { label: "Technical credibility", value: "Typed" },
                  { label: "Motion quality", value: "Intentional" },
                  { label: "Conversion readiness", value: "Built-in" },
                ].map((item) => (
                  <div key={item.label} className="surface-line rounded-3xl p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-2xl tracking-[-0.03em] text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {proofSignals.map(({ title, copy, icon: Icon }, index) => (
                <Reveal key={title} delay={0.04 * index}>
                  <article className="glass-panel h-full p-6">
                    <span className="inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                      <Icon className="size-5 text-[var(--accent-warm)]" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em] text-white">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="section-shell py-14 md:py-20">
          <SectionHeading
            eyebrow="Stack Arsenal"
            title="Modern tools, but used with actual intent."
            description="The tech stack is current, but the bigger point is how the pieces work together: fast rendering, clean interactivity, immersive visuals, and extendable backend hooks."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {stackGroups.map(({ title, icon: Icon, items }, index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="glass-panel h-full p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded-2xl border border-white/10 bg-white/6 p-3">
                      <Icon className="size-5 text-[var(--accent)]" />
                    </span>
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-white">
                      {title}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-3">
                    {items.map((item) => (
                      <div
                        key={item}
                        className="surface-line flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/90"
                      >
                        <Cpu className="size-4 text-[var(--accent)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="flow" className="section-shell py-14 md:py-20">
          <SectionHeading
            eyebrow="Build Flow"
            title="The portfolio is packaged like a product, not a one-off page."
            description="A strong site needs more than flashy visuals. The process below keeps the message sharp, the interface cohesive, and the technical base easy to keep growing."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {deliveryFlow.map(({ step, title, copy }, index) => (
              <Reveal key={step} delay={index * 0.05}>
                <article className="glass-panel h-full p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
                    {step}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell py-14 md:py-20">
          <Reveal className="glass-panel p-6 md:p-10">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="eyebrow">Contact System</span>
                <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-white md:text-5xl">
                  Close with something that feels as polished as the hero.
                </h2>
                <p className="text-base leading-8 text-[var(--muted)] md:text-lg">
                  The form below includes shared validation, API feedback, and a live project
                  signal panel so even your inquiry flow feels premium.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="surface-line rounded-3xl px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Response window
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">Within 24 hours</p>
                </div>
                <div className="surface-line rounded-3xl px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Ideal projects
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    3D showcases, SaaS, founder portfolios
                  </p>
                </div>
              </div>
            </div>

            <ContactForm />
          </Reveal>
        </section>
      </main>

      <footer className="section-shell pb-8 pt-2">
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Built to make a random HR, founder, or client pause and keep looking.</p>
          <div className="flex flex-wrap gap-3">
            <span className="pill-chip text-sm">3D-first</span>
            <span className="pill-chip text-sm">Full-stack ready</span>
            <span className="pill-chip text-sm">High-signal UI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
