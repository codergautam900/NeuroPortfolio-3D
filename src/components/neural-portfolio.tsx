"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { startTransition, useEffect, useMemo, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import {
  featuredProjects,
  hackathonSpotlight,
  neuralLogs,
  neuralSkills,
  profile,
  socialOrbs,
  timelineMilestones,
} from "@/lib/neural-content";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;

type SkillItem = (typeof neuralSkills)[number];

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
    <Reveal className="max-w-3xl space-y-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{description}</p>
    </Reveal>
  );
}

function groupSkills() {
  const clusters = new Map<string, SkillItem[]>();

  neuralSkills.forEach((skill) => {
    const existing = clusters.get(skill.cluster) ?? [];
    clusters.set(skill.cluster, [...existing, skill]);
  });

  return Array.from(clusters.entries()).map(([cluster, items]) => ({
    cluster,
    items: items.slice(0, 4),
  }));
}

export function NeuralPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tagline, setTagline] = useState<string>(profile.taglineFallback);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    startTransition(async () => {
      const response = await fetch("/api/tagline").catch(() => null);
      if (!response?.ok) return;

      const payload = (await response.json()) as { tagline?: string };
      if (payload.tagline) {
        setTagline(payload.tagline);
      }
    });
  }, []);

  const skillGroups = useMemo(() => groupSkills(), []);
  const featuredProject = featuredProjects[0];
  const supportingProjects = featuredProjects.slice(1);

  return (
    <div className="portfolio-shell">
      <motion.div aria-hidden className="progress-line" style={{ width: progressWidth }} />

      <header className="site-header">
        <div className="section-shell flex items-center justify-between gap-4 py-4">
          <Link href="#top" className="brand-mark">
            Gautam Sagar
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={profile.resumeHref} download className="secondary-button px-4 py-2 text-sm">
              <Download className="size-4" />
              Resume
            </a>
            <Link href="#contact" className="primary-button px-5 py-2 text-sm">
              Let&apos;s talk
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <button
            type="button"
            className="menu-button lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="section-shell pb-4 lg:hidden">
            <div className="mobile-nav">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={profile.resumeHref}
                download
                className="secondary-button w-full justify-center px-4 py-3 text-sm"
              >
                <Download className="size-4" />
                Download resume
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="section-shell hero-grid">
          <Reveal className="space-y-8">
            <span className="eyebrow">{profile.role} / MERN / Next.js / AI Features</span>

            <div className="space-y-5">
              <h1 className="hero-title">
                Full-stack portfolio with cleaner design, stronger storytelling, and production
                thinking.
              </h1>
              <p className="hero-copy">{profile.intro}</p>
              <div className="status-strip">
                <Sparkles className="size-4 text-amber-300" />
                <span>{tagline}</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link href="#work" className="primary-button">
                View selected work
                <ArrowRight className="size-4" />
              </Link>
              <a href={profile.resumeHref} download className="secondary-button">
                <Download className="size-4" />
                Download resume
              </a>
            </div>

            <div className="hero-stats">
              {profile.stats.map((item) => (
                <div key={item.label} className="metric-card">
                  <p className="metric-value">{item.value}</p>
                  <p className="metric-label">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hero-visual">
              <div className="hero-photo-card">
                <div className="hero-photo-copy">
                  <span className="mini-label">Based in {profile.location}</span>
                  <p className="text-sm leading-7 text-slate-300">
                    Available for internships, product builds, and freelance collaborations.
                  </p>
                </div>

                <div className="hero-photo-frame">
                  <Image
                    src="/profile-student.jpeg"
                    alt={`${profile.name} portrait`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover object-[center_18%]"
                  />
                </div>

                <div className="hero-note-grid">
                  <div className="info-tile">
                    <MapPin className="size-4 text-emerald-300" />
                    <div>
                      <p className="mini-label">Current focus</p>
                      <p className="text-sm text-slate-200">
                        Full-stack apps, API systems, AI features, and recruiter-ready polish.
                      </p>
                    </div>
                  </div>
                  <div className="info-tile">
                    <Mail className="size-4 text-sky-300" />
                    <div>
                      <p className="mini-label">Reachout</p>
                      <p className="text-sm text-slate-200">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section-shell logo-strip">
          {[
            "Java + OOP",
            "React + Redux",
            "Next.js + TypeScript",
            "Node.js + Express",
            "MongoDB + APIs",
            "Socket.IO + Realtime",
          ].map((item) => (
            <span key={item} className="cap-chip">
              <BadgeCheck className="size-4 text-emerald-300" />
              {item}
            </span>
          ))}
        </section>

        <section id="about" className="section-shell section-stack">
          <SectionHeading
            eyebrow="About"
            title="Built for recruiters and teams who want signal fast, not noise."
            description="Recent portfolio reviews consistently emphasize scannability, sharp summaries, and clear case-study outcomes. This version follows that direction with a cleaner visual hierarchy, stronger project framing, and less gimmick-heavy interaction."
          />

          <div className="two-col-panel">
            <Reveal className="surface-card p-6 md:p-8">
              <div className="space-y-5">
                <p className="mini-label">Professional summary</p>
                <h3 className="card-title">{profile.name}</h3>
                <p className="section-copy">
                  I am a B.Tech CSE student and full-stack developer focused on building products
                  that look polished, stay maintainable, and solve real workflow problems. My work
                  blends frontend clarity, backend ownership, authentication, APIs, realtime
                  systems, and practical AI integrations.
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Strong Java, OOP, debugging, and DSA fundamentals",
                    "Clean responsive UIs with React, Next.js, and TypeScript",
                    "Backend ownership with Node.js, Express, MongoDB, auth, and RBAC",
                    "Product-style features with realtime, AI, and deployment workflows",
                  ].map((item) => (
                    <div key={item} className="soft-card text-sm leading-7 text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="surface-card p-6 md:p-8">
              <div className="space-y-5">
                <p className="mini-label">Why this portfolio works better</p>
                <div className="space-y-4">
                  {[
                    "Hero section now prioritizes your face, role, availability, and strongest value proposition.",
                    "Projects are framed as outcomes, architecture decisions, and links instead of visual clutter.",
                    "Mobile navigation, layout stacking, and card spacing are tuned so the site stays strong on smaller screens.",
                  ].map((item) => (
                    <div key={item} className="feature-row">
                      <ArrowDownRight className="mt-1 size-4 shrink-0 text-amber-300" />
                      <p className="text-sm leading-7 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="section-shell section-stack">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects positioned like product case studies, not just screenshots."
            description="The lead project gets space to explain what it does, why it matters, and how the system is structured. Supporting builds stay easy to scan for hiring managers and collaborators."
          />

          <Reveal className="featured-project">
            <div className="space-y-5">
              <span className="eyebrow">{featuredProject.year}</span>
              <div className="space-y-4">
                <h3 className="card-title">{featuredProject.name}</h3>
                <p className="text-lg leading-8 text-slate-200">{featuredProject.summary}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {featuredProject.highlights.map((item) => (
                  <div key={item} className="soft-card text-sm leading-7 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredProject.stack.map((item) => (
                  <span key={item} className="cap-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="code-panel">
                <p className="mini-label">Architecture snapshot</p>
                <pre className="code-block">
                  <code>{featuredProject.code}</code>
                </pre>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredProject.links.slice(0, 4).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="project-grid">
            {supportingProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <article className="surface-card h-full p-6">
                  <p className="mini-label">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="cap-chip text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.length ? (
                      project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="secondary-button px-4 py-2 text-sm"
                        >
                          {link.label}
                          <ExternalLink className="size-4" />
                        </a>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">
                        Repository or live link not added yet.
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell section-stack">
          <SectionHeading
            eyebrow="Skills"
            title="Grouped to show range clearly across frontend, backend, realtime, and AI."
            description="Instead of floating 3D nodes, skills are organized by capability so someone scanning the page quickly understands where your strengths sit."
          />

          <div className="skill-grid">
            {skillGroups.map((group, index) => (
              <Reveal key={group.cluster} delay={index * 0.04}>
                <div className="surface-card h-full p-6">
                  <p className="mini-label">{group.cluster}</p>
                  <div className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between gap-3 text-sm text-white">
                          <span>{item.name}</span>
                          <span className="text-slate-400">{item.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <span style={{ width: `${item.level}%` }} />
                        </div>
                        <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell section-stack">
          <SectionHeading
            eyebrow="Hackathon Highlight"
            title="SustainOS AI turned hackathon pressure into a credible flagship build."
            description="This section keeps the strongest story visible: a month-long build sharpened through a 36-hour sprint, with live links and clear product depth."
          />

          <div className="two-col-panel">
            <Reveal className="surface-card p-6 md:p-8">
              <p className="mini-label">{hackathonSpotlight.event}</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{hackathonSpotlight.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                {hackathonSpotlight.subtitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {hackathonSpotlight.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {hackathonSpotlight.stats.map((item) => (
                  <div key={item.label} className="soft-card">
                    <p className="metric-value text-3xl">{item.value}</p>
                    <p className="metric-label">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {hackathonSpotlight.gallery.slice(0, 4).map((imageSrc, index) => (
                  <div
                    key={imageSrc}
                    className={`hackathon-shot ${index === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={`Hackathon moment ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 30vw"
                      className="object-cover"
                    />
                    <div className="hackathon-shot-overlay">
                      <span className="mini-label text-white/80">
                        {index === 0 ? "Main showcase" : `Build moment ${index + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05} className="surface-card p-6 md:p-8">
              <p className="mini-label">Proof points</p>
              <div className="mt-5 space-y-3">
                {hackathonSpotlight.highlights.map((item) => (
                  <div key={item} className="feature-row">
                    <BadgeCheck className="mt-1 size-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {hackathonSpotlight.tags.map((tag) => (
                  <span key={tag} className="cap-chip text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {hackathonSpotlight.links.slice(0, 4).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button px-4 py-2 text-sm"
                  >
                    {link.label}
                    <ExternalLink className="size-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="journey" className="section-shell section-stack">
          <SectionHeading
            eyebrow="Journey"
            title="The path from CS foundations to shipping full-stack systems."
            description="This keeps your story chronological and easy to understand, especially for recruiters who want context quickly."
          />

          <div className="timeline-list">
            {timelineMilestones.map((item, index) => (
              <Reveal key={`${item.year}-${item.title}`} delay={index * 0.04}>
                <article className="timeline-card">
                  <p className="mini-label">{item.year}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell section-stack">
          <SectionHeading
            eyebrow="Builder Notes"
            title="How I think when products need to ship cleanly."
            description="A short writing layer helps the portfolio feel thoughtful and mature without overwhelming the page."
          />

          <div className="project-grid">
            {neuralLogs.map((log, index) => (
              <Reveal key={log.title} delay={index * 0.05}>
                <article className="surface-card h-full p-6">
                  <p className="mini-label">{log.meta}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{log.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{log.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell section-stack">
          <SectionHeading
            eyebrow="Contact"
            title="Reach out for internships, freelance builds, or full-stack collaboration."
            description="The contact area keeps quick links visible while the form stays available for longer project or hiring conversations."
          />

          <div className="contact-layout">
            <Reveal className="space-y-5">
              <div className="surface-card p-6 md:p-8">
                <p className="mini-label">Quick links</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">Where to find me</h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialOrbs.map((orb) => (
                    <a
                      key={orb.label}
                      href={orb.href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      <span>{orb.label}</span>
                      <ExternalLink className="size-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6 md:p-8">
                <p className="mini-label">Best fit</p>
                <div className="mt-5 space-y-3">
                  {[
                    "Internship roles for full-stack, frontend, or web engineering",
                    "Freelance product builds with Next.js, APIs, dashboards, or auth flows",
                    "Realtime and AI-enabled features that need practical execution",
                  ].map((item) => (
                    <div key={item} className="feature-row">
                      <BadgeCheck className="mt-1 size-4 shrink-0 text-emerald-300" />
                      <p className="text-sm leading-7 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="surface-card p-6 md:p-8">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="section-shell footer-block">
        <p className="text-sm leading-7 text-slate-400">
          Built as a cleaner, high-signal portfolio focused on responsiveness, project clarity,
          and a more premium first impression across desktop and mobile.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="cap-chip text-sm">Responsive across mobile and desktop</span>
          <span className="cap-chip text-sm">Recruiter-first structure</span>
          <span className="cap-chip text-sm">Less gimmick, more signal</span>
        </div>
      </footer>
    </div>
  );
}
