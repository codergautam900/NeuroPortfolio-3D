import Image from "next/image";
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

const featuredProjects = [
  {
    title: "Atlas AI Desk",
    description:
      "An AI-powered study workspace for notes, summaries, topic search, and sprint planning built for students who live inside deadlines.",
    icon: Orbit,
    bullets: ["Next.js + Python stack", "Semantic note search", "Planner + revision dashboard"],
  },
  {
    title: "CampusSync OS",
    description:
      "A full-stack platform for college clubs and events with role-based dashboards, notices, applications, and live engagement tracking.",
    icon: Layers3,
    bullets: ["Role-based auth", "PostgreSQL-backed workflows", "Admin + student interfaces"],
  },
  {
    title: "VisionMark",
    description:
      "A computer-vision attendance system with analytics, profile tracking, and clean reporting for faculty and student coordinators.",
    icon: Workflow,
    bullets: ["OpenCV + Flask pipeline", "Dashboard analytics", "Attendance reliability layer"],
  },
] as const;

const standoutSignals = [
  {
    title: "Hackathon Energy",
    copy: "I like shipping fast, presenting clearly, and turning rough ideas into demos that feel polished enough to be real products.",
    icon: Sparkles,
  },
  {
    title: "CS Foundations",
    copy: "DSA, OOP, DBMS, OS, and computer networks are not buzzwords for me, they shape how I think through systems.",
    icon: Braces,
  },
  {
    title: "UI Obsession",
    copy: "I care about motion, hierarchy, and detail so the frontend feels memorable instead of just functional.",
    icon: Globe,
  },
  {
    title: "Ownership Mindset",
    copy: "Whether it is a college build, freelance sprint, or internship task, I like picking up the full problem and carrying it through.",
    icon: ShieldCheck,
  },
] as const;

const stackGroups = [
  {
    title: "CS Core + Languages",
    icon: Braces,
    items: [
      "C++, Java, Python, TypeScript",
      "Data Structures and Algorithms",
      "OOP, DBMS, OS, Computer Networks",
      "Problem solving with product thinking",
    ],
  },
  {
    title: "Frontend + Experience",
    icon: Sparkles,
    items: [
      "Next.js, React, Tailwind CSS",
      "Framer Motion and 3D interactions",
      "Responsive UI systems",
      "Design-heavy landing and portfolio builds",
    ],
  },
  {
    title: "Backend + Data",
    icon: Database,
    items: [
      "Node.js, Express, REST APIs",
      "MongoDB, PostgreSQL, Supabase",
      "Auth, dashboards, validation layers",
      "Python services and CV/AI experiments",
    ],
  },
] as const;

const journeyFlow = [
  {
    step: "01",
    title: "Foundation Mode",
    copy: "Started with core CS, logic building, and the habit of understanding how things work under the hood.",
  },
  {
    step: "02",
    title: "Build Mode",
    copy: "Moved into full-stack projects, student products, hackathons, and interfaces that feel more alive than usual college work.",
  },
  {
    step: "03",
    title: "Experiment Mode",
    copy: "Exploring AI workflows, computer vision, and interaction-heavy web experiences that blend engineering with design taste.",
  },
  {
    step: "04",
    title: "Career Mode",
    copy: "Now focused on internships, real teams, and harder product problems where I can contribute fast and level up faster.",
  },
] as const;

const technologyStrip = [
  "BTech CSE '27",
  "C++",
  "Java",
  "Python",
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
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
          <Link href="#hero" className="font-display text-lg tracking-[0.22em] text-white">
            AARAV//GRAVITY
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
            <Link href="#projects">Projects</Link>
            <Link href="#signals">Signals</Link>
            <Link href="#stack">Stack</Link>
            <Link href="#journey">Journey</Link>
          </nav>
          <Link href="#contact" className="secondary-button min-h-11 px-4 py-2 text-sm">
            Say Hello
          </Link>
        </div>
      </header>

      <main>
        <section id="hero" className="section-shell pb-16 pt-8 md:pb-20 md:pt-12">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10">
            <Reveal className="space-y-8">
              <span className="eyebrow">
                Aarav Sharma / BTech Computer Science Student / Full-Stack + AI Builder
              </span>
              <div className="space-y-6">
                <h1 className="hero-title max-w-5xl text-white">
                  Anti-gravity style interfaces.
                  <br />
                  CS-backed engineering.
                  <br />
                  Student hustle, pro execution.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                  I&apos;m a BTech CSE student who likes turning ideas from labs, hackathons, and
                  late-night coding sessions into polished full-stack products. My sweet spot is
                  modern frontend systems, backend logic, and UI that makes people stop scrolling.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="#projects" className="primary-button">
                  View Featured Builds
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="#journey" className="secondary-button">
                  Explore My Journey
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: "12+", label: "projects and prototypes shipped" },
                  { value: "350+", label: "DSA and problem-solving reps" },
                  { value: "3x", label: "hackathon and sprint build mindset" },
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
                  <span>BTech CSE &apos;27 / India based</span>
                  <span>Open to internships + serious collabs</span>
                </div>

                <HeroScene />

                <div className="absolute right-4 top-20 z-10 w-[220px] sm:w-[250px] md:right-6 md:top-24 md:w-[296px]">
                  <div className="glass-panel p-3">
                    <div className="overflow-hidden rounded-[1.6rem]">
                      <Image
                        src="/profile-student.jpeg"
                        alt="Aarav Sharma working on a laptop"
                        width={592}
                        height={888}
                        priority
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    <div className="px-2 pb-2 pt-4">
                      <p className="font-display text-3xl tracking-[-0.05em] text-white">
                        Aarav Sharma
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        CS undergrad building premium web products, AI-side tools, and frontends
                        that feel heavier than templates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 grid gap-3 md:bottom-6 md:left-6 md:right-6 md:grid-cols-2">
                  <div className="surface-line rounded-3xl p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Current focus
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/90">
                      Internship-ready full-stack products, 3D interfaces, and student tools with
                      real backend depth.
                    </p>
                  </div>
                  <div className="surface-line rounded-3xl p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Build style
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/90">
                      Sharp UI taste, CS fundamentals, fast iteration, and the habit of carrying
                      ideas all the way to something usable.
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

        <section id="projects" className="section-shell py-14 md:py-20">
          <SectionHeading
            eyebrow="Featured Builds"
            title="Projects that feel sharper than typical student portfolios."
            description="These are the kind of systems I like building: product-minded, full-stack, and visually strong enough to stand out in a crowded shortlist."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map(({ title, description, icon: Icon, bullets }, index) => (
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

        <section id="signals" className="section-shell py-14 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal className="glass-panel p-8 md:p-10">
              <span className="eyebrow">Why Me</span>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.04em] text-white md:text-5xl">
                More than a student portfolio.
                <br />
                It reads like a builder profile.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
                I wanted this site to show range fast: CS fundamentals, product instinct, clean
                execution, and the kind of visual ambition that instantly separates me from a basic
                resume page.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Focus areas", value: "AI + Full Stack" },
                  { label: "Preferred roles", value: "Intern / Builder" },
                  { label: "Strength zone", value: "Frontend + Systems" },
                  { label: "Energy level", value: "Hackathon Fast" },
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
              {standoutSignals.map(({ title, copy, icon: Icon }, index) => (
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
            eyebrow="Stack + CS Core"
            title="The toolkit is modern, but the thinking is grounded."
            description="I care about current tools, but I also care about how systems are modeled, where data flows, how interfaces feel, and whether the product can scale past demo mode."
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

        <section id="journey" className="section-shell py-14 md:py-20">
          <SectionHeading
            eyebrow="Journey Mode"
            title="From CS classroom curiosity to product-builder momentum."
            description="The path is simple: learn hard concepts properly, ship visible work, keep raising quality, and be ready when strong opportunities show up."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {journeyFlow.map(({ step, title, copy }, index) => (
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
                <span className="eyebrow">Contact Layer</span>
                <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-white md:text-5xl">
                  If you have an internship, product sprint, or crazy build idea, I&apos;m in.
                </h2>
                <p className="text-base leading-8 text-[var(--muted)] md:text-lg">
                  Recruiters, startup teams, hackathon squads, and collaborators can drop a note
                  here. The form is wired like a real product touchpoint, not a dead-end section.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="surface-line rounded-3xl px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Open to
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Internships, hackathons, freelance prototypes
                  </p>
                </div>
                <div className="surface-line rounded-3xl px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Current vibe
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Shipping, learning, and saying yes to hard builds
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
          <p>Built to make recruiters, founders, and random HR people stop and actually remember me.</p>
          <div className="flex flex-wrap gap-3">
            <span className="pill-chip text-sm">BTech CSE</span>
            <span className="pill-chip text-sm">3D-heavy UI</span>
            <span className="pill-chip text-sm">Internship-ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
