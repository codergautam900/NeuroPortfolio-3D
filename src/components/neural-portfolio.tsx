"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Disc3,
  PanelsTopLeft,
  RadioTower,
} from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";
import { AudioToggle } from "@/components/audio-toggle";
import { ContactForm } from "@/components/contact-form";
import { NeuralCursor } from "@/components/neural-cursor";
import { NeuralPreloader } from "@/components/neural-preloader";
import { Reveal } from "@/components/reveal";
import {
  featuredProjects,
  hackathonSpotlight,
  neuralLogs,
  profile,
  socialOrbs,
} from "@/lib/neural-content";

const NeuralHeroScene = dynamic(() => import("@/components/neural-hero-scene"), {
  ssr: false,
  loading: () => <div className="neural-scene-placeholder" />,
});
const AboutHologram = dynamic(() => import("@/components/about-hologram"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[520px]" />,
});
const SkillsNebula = dynamic(() => import("@/components/skills-nebula"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[620px]" />,
});
const ProjectsRail = dynamic(() => import("@/components/projects-rail"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[420px]" />,
});
const OracleConsole = dynamic(() => import("@/components/oracle-console"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[420px]" />,
});
const JourneyTimeline = dynamic(() => import("@/components/journey-timeline"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[520px]" />,
});
const NeuralGlobe = dynamic(() => import("@/components/neural-globe"), {
  ssr: false,
  loading: () => <div className="neural-canvas-placeholder h-[320px]" />,
});

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
    <Reveal className="mb-10 max-w-3xl space-y-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-white/64 md:text-lg">
        {description}
      </p>
    </Reveal>
  );
}

export function NeuralPortfolio() {
  const [entered, setEntered] = useState(false);
  const [tagline, setTagline] = useState<string>(profile.taglineFallback);
  const [ready, setReady] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const readyTimer = window.setTimeout(() => setReady(true), 2400);

    startTransition(async () => {
      const response = await fetch("/api/tagline").catch(() => null);
      if (!response?.ok) {
        return;
      }

      const payload = (await response.json()) as { tagline?: string };
      if (payload.tagline) {
        setTagline(payload.tagline);
      }
    });

    return () => {
      window.clearTimeout(readyTimer);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  function enterVoid() {
    setEntered(true);
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background">
      <NeuralPreloader ready={ready} />
      <NeuralCursor />
      <AudioToggle />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-px bg-[linear-gradient(90deg,#2ee7ff,#ff4fd8,#8b5cff)]"
        style={{ width: progressWidth }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-25 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(46,231,255,0.16),transparent_18%),radial-gradient(circle_at_82%_20%,rgba(255,79,216,0.16),transparent_18%),radial-gradient(circle_at_50%_90%,rgba(139,92,255,0.2),transparent_22%)]" />
      </div>

      <header className="sticky top-0 z-[80] border-b border-white/6 bg-[rgba(2,3,11,0.62)] backdrop-blur-2xl">
        <div className="section-shell flex items-center justify-between gap-4 py-4">
          <Link href="#hero" className="font-display text-lg tracking-[0.28em] text-white">
            GAUTAM//PORTFOLIO
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/55 md:flex">
            <Link href="#identity">About</Link>
            <Link href="#cortex">Skills</Link>
            <Link href="#creations">Projects</Link>
            <Link href="#hackathon">Hackathon</Link>
            <Link href="#oracle">Oracle</Link>
            <Link href="#timeline">Journey</Link>
            <Link href="#transmission">Contact</Link>
            <a href={profile.resumeHref} download className="text-white/70 transition hover:text-white">
              Resume
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={profile.resumeHref} download className="secondary-button min-h-11 px-4 py-2 text-sm">
              Download Resume
            </a>
            <Link href="#transmission" className="secondary-button min-h-11 px-4 py-2 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="section-shell min-h-screen py-6 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal className="space-y-8">
              <span className="eyebrow">
                {profile.role} / MERN x Next.js / AI x Realtime / B.Tech CSE
              </span>

              <div className="space-y-6">
                <h1 className="neural-title max-w-4xl text-white">
                  Building practical
                  <br />
                  full-stack systems that ship.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
                  {profile.intro}
                </p>
                <div className="neural-tagline max-w-xl">
                  <span className="mr-3 inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(46,231,255,0.9)]" />
                  {tagline}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button type="button" className="primary-button" onClick={enterVoid}>
                  Explore Portfolio
                  <ArrowRight className="size-4" />
                </button>
                <a href={profile.resumeHref} download className="secondary-button">
                  Download Resume
                  <ArrowDown className="size-4" />
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {profile.stats.map((item) => (
                  <div key={item.label} className="neural-metric">
                    <p className="font-display text-4xl tracking-[-0.06em] text-white">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/55">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="hero-stage overflow-hidden">
                <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/10 bg-[rgba(6,12,28,0.46)] px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-white/48 backdrop-blur-xl md:left-6 md:right-6 md:top-6">
                  <span>{profile.location}</span>
                  <span>{profile.availability}</span>
                </div>

                <NeuralHeroScene entered={entered} />

                <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-3 md:bottom-6 md:left-6 md:right-6 md:grid-cols-3">
                  {[
                    {
                      icon: BrainCircuit,
                      label: "CS foundations",
                      body: "Java, OOPs, DSA, debugging, and logical thinking anchor how complex features get built.",
                    },
                    {
                      icon: PanelsTopLeft,
                      label: "Scalable app systems",
                      body: "MERN and Next.js apps with auth, RBAC, APIs, data modeling, and production-minded structure.",
                    },
                    {
                      icon: Disc3,
                      label: "Realtime + AI",
                      body: "Socket.IO, telemetry-style pipelines, and LLM-powered features add practical intelligence to products.",
                    },
                  ].map((item) => (
                    <div key={item.label} className="surface-line rounded-[1.6rem] p-4">
                      <item.icon className="size-5 text-cyan-300" />
                      <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/72">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-shell pb-8">
          <Reveal className="flex flex-wrap gap-3">
            {[
              "Java + DSA",
              "React + Redux",
              "Next.js",
              "TypeScript",
              "Node.js",
              "JWT + RBAC",
              "Socket.IO",
              "OpenAI / Gemini",
              "Python ML",
              "Vercel + Render",
            ].map((item) => (
              <span key={item} className="pill-chip">
                <BadgeCheck className="size-4 text-cyan-300" />
                {item}
              </span>
            ))}
          </Reveal>
        </section>

        <section id="identity" ref={aboutRef} className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Professional Profile"
            title="A full-stack developer building practical products with strong fundamentals and modern system thinking."
            description="Gautam brings together CS foundations, frontend clarity, backend ownership, and hands-on experience with realtime and AI-enabled workflows to build production-minded web applications."
          />

          <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
            <Reveal className="glass-panel overflow-hidden p-4 md:p-5">
              <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative rounded-[1.9rem] border border-cyan-300/18 bg-[radial-gradient(circle_at_20%_15%,rgba(46,231,255,0.18),transparent_30%),linear-gradient(180deg,rgba(6,12,28,0.92),rgba(3,7,18,0.98))] p-3 shadow-[0_0_80px_rgba(46,231,255,0.08)]">
                  <div className="relative aspect-[0.72] overflow-hidden rounded-[1.45rem] border border-white/10 bg-black/20">
                    <Image
                      src="/profile-student.jpeg"
                      alt={`${profile.name} portrait`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      className="object-cover object-[center_18%]"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(2,6,18,0.75)_100%)]" />
                    <div className="absolute left-4 top-4 rounded-full border border-cyan-300/25 bg-[rgba(5,10,24,0.65)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100/70 backdrop-blur-lg">
                      Gautam // Professional Profile
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-[rgba(5,10,24,0.58)] px-4 py-3 backdrop-blur-xl">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/55">
                          Engineering Focus
                        </p>
                        <p className="mt-1 text-sm text-white/80">
                          Product thinking, system design, and reliable execution
                        </p>
                      </div>
                      <span className="inline-flex h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(46,231,255,0.85)]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
                      Profile Summary
                    </p>
                    <h3 className="mt-2 font-display text-4xl tracking-[-0.06em] text-white">
                      {profile.name}
                    </h3>
                  </div>
                  <p className="text-base leading-8 text-white/68">
                    Gautam is a B.Tech CSE student and full-stack developer focused on building
                    dependable web products. His work combines Java, OOP, and problem-solving
                    fundamentals with MERN, Next.js, TypeScript, API design, authentication,
                    realtime systems, and practical AI integrations. The goal is simple: create
                    interfaces that feel polished for users and systems that remain maintainable as
                    products grow.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Strong grounding in Java, OOP, debugging, and DSA",
                      "Full-stack delivery with MERN and Next.js",
                      "REST APIs, JWT authentication, and RBAC patterns",
                      "Realtime, telemetry-style, and AI-assisted features",
                    ].map((item) => (
                      <div
                        key={item}
                        className="surface-line rounded-2xl px-4 py-3 text-sm text-white/72"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <AboutHologram />
            </Reveal>
          </div>
        </section>

        <section id="cortex" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Skills Stack"
            title="A wider technical profile across frontend, backend, AI, realtime, and deployment."
            description="Hover the nodes to inspect Gautam's current strengths across the stack, from Java and DSA to Next.js, Socket.IO, and LLM integration."
          />
          <Reveal>
            <SkillsNebula />
          </Reveal>
        </section>

        <section id="creations" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Featured Projects"
            title="SustainOS AI leads the portfolio, supported by full-stack, realtime, and product-style builds."
            description="The project rail now puts the hackathon flagship first, with deep links to the live app, APIs, demo, and repository alongside other core projects."
          />
          <Reveal>
            <ProjectsRail />
          </Reveal>
        </section>

        <section id="hackathon" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Hackathon Flashpoint"
            title="SustainOS AI was pushed from serious build to showcase project during FOSSHack 2026."
            description="This section captures the story, links, and visual moments behind the hackathon flagship so the portfolio feels built-in-public instead of just listed on a resume."
          />

          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <Reveal className="space-y-6">
              <div className="glass-panel p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
                  {hackathonSpotlight.event}
                </p>
                <h3 className="mt-3 font-display text-4xl tracking-[-0.06em] text-white">
                  {hackathonSpotlight.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-white/68">
                  {hackathonSpotlight.subtitle}
                </p>
                <p className="mt-5 text-sm leading-8 text-white/64">
                  {hackathonSpotlight.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {hackathonSpotlight.highlights.map((item) => (
                    <div
                      key={item}
                      className="surface-line rounded-2xl px-4 py-3 text-sm leading-7 text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {hackathonSpotlight.stats.map((item) => (
                    <div key={item.label} className="neural-metric">
                      <p className="font-display text-3xl tracking-[-0.05em] text-white">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {hackathonSpotlight.tags.map((tag) => (
                    <span key={tag} className="pill-chip text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {hackathonSpotlight.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button min-h-11 px-4 py-2 text-sm"
                    >
                      {link.label}
                      <ArrowRight className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="grid gap-4 sm:grid-cols-2">
                {hackathonSpotlight.gallery.map((imageSrc, index) => (
                  <div
                    key={imageSrc}
                    className={`glass-panel p-2 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[1.5rem] ${
                        index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"
                      }`}
                    >
                      <Image
                        src={imageSrc}
                        alt={`FOSSHack 2026 SustainOS AI moment ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(2,6,18,0.7)_100%)]" />
                      <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-[rgba(5,10,24,0.68)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100/70 backdrop-blur-lg">
                        {index === 0 ? "Hackathon Showcase" : `Build Moment ${index + 1}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="oracle" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Portfolio Oracle"
            title="Ask about Gautam's technical range, project depth, or internship readiness."
            description="The oracle now reflects the broader profile: CS fundamentals, MERN and Next.js engineering, realtime systems, deployment, and AI feature work."
          />
          <Reveal>
            <OracleConsole />
          </Reveal>
        </section>

        <section id="timeline" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Education Journey"
            title="From school foundations to CS core, full-stack systems, AI features, and hackathons."
            description="This timeline follows Gautam's growth from academics into practical engineering, including Java fundamentals, MERN projects, realtime work, and FOSS Hack 2026 exposure."
          />
          <Reveal>
            <JourneyTimeline />
          </Reveal>
        </section>

        <section id="logs" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Builder Notes"
            title="Technical thinking shaped by systems work, debugging, and pressure-tested building."
            description="These notes reflect how Gautam thinks about engineering beyond the UI layer: architecture, realtime behavior, AI features, and problem-solving discipline."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {neuralLogs.map((log, index) => (
              <Reveal key={log.title} delay={index * 0.05}>
                <article className="glass-panel h-full p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                    {log.meta}
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-[-0.05em] text-white">
                    {log.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/65">{log.excerpt}</p>
                  <pre className="mt-5 overflow-x-auto rounded-[1.2rem] border border-white/8 bg-black/20 p-4 text-xs leading-6 text-white/70">
                    <code>{`<neural-log type="insight" scene="${index + 1}" />
const premise = "Ship practical systems with clarity and strong fundamentals.";
deploy(premise, withProductThinking);`}</code>
                  </pre>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="transmission" className="section-shell py-16 md:py-24">
          <SectionHeading
            eyebrow="Contact Gautam"
            title="Reach out for internships, full-stack roles, AI-enabled products, or freelance builds."
            description="This contact layer is aimed at teams or clients who need frontend polish, backend ownership, realtime features, or practical AI integration in web products."
          />

          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <Reveal className="space-y-6">
              <NeuralGlobe />

              <div className="glass-panel p-6">
                <div className="flex items-center gap-3">
                  <RadioTower className="size-5 text-cyan-300" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                      Quick links
                    </p>
                    <h3 className="mt-1 font-display text-3xl tracking-[-0.05em] text-white">
                      Connect and explore
                    </h3>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialOrbs.map((orb) => (
                    <a
                      key={orb.label}
                      href={orb.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/68 transition hover:border-cyan-300/28 hover:text-white"
                    >
                      <span
                        className="inline-flex h-3 w-3 rounded-full shadow-[0_0_20px_currentColor]"
                        style={{ backgroundColor: orb.accent, color: orb.accent }}
                      />
                      {orb.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.04} className="glass-panel p-6 md:p-8">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="section-shell pb-10 pt-4">
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            Built as Gautam Sagar&apos;s interactive portfolio for recruiters, collaborators, and
            teams looking for clean systems, thoughtful UI, and practical execution.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              `${featuredProjects.length} featured builds`,
              "FOSSHack 2026 flagship build",
              "Realtime, auth, AI, and deployment-ready thinking",
            ].map((item) => (
              <span key={item} className="pill-chip text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {!ready ? null : (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[40] h-32 bg-[radial-gradient(circle_at_50%_100%,rgba(46,231,255,0.08),transparent_55%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
