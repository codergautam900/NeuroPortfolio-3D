"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { featuredProjects } from "@/lib/neural-content";
import { seededUnit } from "@/lib/utils";

function ProjectPreview({
  accent,
  title,
}: {
  accent: string;
  title: string;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 44 }} dpr={[1, 1.5]}>
      <ProjectPreviewScene accent={accent} title={title} />
    </Canvas>
  );
}

function ProjectPreviewScene({
  accent,
  title,
}: {
  accent: string;
  title: string;
}) {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        position: [
          (seededUnit(index + 1) - 0.5) * 3.8,
          (seededUnit(index + 41) - 0.5) * 2.2,
          (seededUnit(index + 81) - 0.5) * 2,
        ] as [number, number, number],
        scale: 0.03 + seededUnit(index + 121) * 0.06,
      })),
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.32;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.14;
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} intensity={20} color={accent} />
      <group ref={groupRef}>
        <mesh>
          <torusKnotGeometry args={[1.15, 0.22, 180, 24]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.15}
            roughness={0.22}
            metalness={0.82}
          />
        </mesh>
        <mesh rotation={[0.4, 0.8, 0.2]} scale={0.58}>
          <icosahedronGeometry args={[1.6, 2]} />
          <meshStandardMaterial
            color="#091220"
            emissive={accent}
            emissiveIntensity={0.18}
            roughness={0.3}
            metalness={0.48}
            wireframe
          />
        </mesh>
        {nodes.map((node, index) => (
          <mesh
            key={index}
            position={node.position}
            scale={node.scale}
          >
            <sphereGeometry args={[1, 14, 14]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={1.7}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <Html position={[0, -1.8, 0]} center>
        <div className="rounded-full border border-white/10 bg-[rgba(5,10,24,0.65)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/55 backdrop-blur-md">
          {title}
        </div>
      </Html>
    </>
  );
}

export default function ProjectsRail() {
  const [activeSlug, setActiveSlug] = useState<(typeof featuredProjects)[number]["slug"] | null>(
    null,
  );
  const activeProject =
    featuredProjects.find((project) => project.slug === activeSlug) ?? null;

  return (
    <>
      <div className="overflow-x-auto pb-4 [scrollbar-color:rgba(46,231,255,0.4)_transparent] [scrollbar-width:thin]">
        <div className="flex min-w-max gap-5">
          {featuredProjects.map((project) => (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => setActiveSlug(project.slug)}
              className="group relative w-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,13,28,0.96),rgba(4,7,18,0.98))] text-left shadow-[0_0_70px_rgba(46,231,255,0.05)] transition hover:border-cyan-300/28"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${project.accent}22, transparent 22%)`,
                  }}
                />
              </div>

              <div className="relative h-[240px] border-b border-white/8">
                <ProjectPreview accent={project.accent} title={project.category} />
              </div>

              <div className="relative space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/50">
                    {project.year}
                  </span>
                  <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-white/80" />
                </div>
                {project.badge ? (
                  <div className="rounded-2xl border border-cyan-300/14 bg-cyan-300/7 px-4 py-3 text-xs leading-6 text-cyan-50/78">
                    {project.badge}
                  </div>
                ) : null}
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-3xl tracking-[-0.05em] text-white">
                    {project.name}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-white/65">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSlug(null)}
          >
            <motion.div
              className="relative w-[min(1100px,100%)] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.98),rgba(4,7,18,1))] shadow-[0_0_120px_rgba(46,231,255,0.08)]"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
                <div className="min-h-[420px] border-b border-white/8 lg:min-h-[620px] lg:border-b-0 lg:border-r">
                  <ProjectPreview accent={activeProject.accent} title={activeProject.name} />
                </div>

                <div className="space-y-6 p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
                        {activeProject.category}
                      </p>
                      <h3 className="mt-2 font-display text-4xl tracking-[-0.06em] text-white">
                        {activeProject.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSlug(null)}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 transition hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <p className="max-w-2xl text-base leading-8 text-white/68">
                    {activeProject.summary}
                  </p>

                  {activeProject.badge ? (
                    <div className="rounded-[1.4rem] border border-cyan-300/16 bg-cyan-300/7 px-5 py-4 text-sm leading-7 text-cyan-50/80">
                      {activeProject.badge}
                    </div>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-fuchsia-100/55">
                        Highlights
                      </p>
                      <div className="mt-4 space-y-3">
                        {activeProject.highlights.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/72"
                          >
                            <Sparkles className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                        Orbiting stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeProject.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {activeProject.links.length ? (
                    <div className="flex flex-wrap gap-3">
                      {activeProject.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="secondary-button min-h-11 px-4 py-2 text-sm"
                        >
                          {link.label}
                          <ArrowUpRight className="size-4" />
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  <div className="rounded-[1.5rem] border border-white/10 bg-[#040915] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
                      Code breakdown
                    </p>
                    <pre className="mt-4 overflow-x-auto rounded-[1.2rem] bg-black/30 p-4 text-sm leading-7 text-white/78">
                      <code>{activeProject.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
