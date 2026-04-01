"use client";

import { Float, Html, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import { seededUnit } from "@/lib/utils";

const panels = [
  {
    title: "Professional Summary",
    body: "Full-stack developer profile shaped by CS fundamentals, practical shipping experience, and a strong interest in production-ready systems.",
    position: [-2.1, 1.1, 0],
    color: "#2ee7ff",
  },
  {
    title: "Core Strengths",
    body: "Works across MERN, Next.js, TypeScript, API design, authentication, realtime architecture, and AI-enabled product features.",
    position: [2.15, 0.6, -0.2],
    color: "#ff4fd8",
  },
  {
    title: "Execution Style",
    body: "Approaches work with ownership, fast iteration, debugging discipline, and the ability to build effectively under project and hackathon pressure.",
    position: [0.2, -1.5, 0.1],
    color: "#00ffa8",
  },
] as const;

function FloatingPanels() {
  const rigidBodies = useRef<Array<{ applyImpulse: (value: { x: number; y: number; z: number }, wakeUp: boolean) => void; translation: () => { x: number; y: number; z: number } } | null>>([]);

  useFrame((state) => {
    rigidBodies.current.forEach((body, index) => {
      if (!body) {
        return;
      }

      const pulse = Math.sin(state.clock.elapsedTime * 0.7 + index);
      body.applyImpulse(
        {
          x: MathUtils.clamp(pulse * 0.002, -0.003, 0.003),
          y: MathUtils.clamp(Math.cos(state.clock.elapsedTime * 0.6 + index) * 0.0026, -0.003, 0.003),
          z: MathUtils.clamp(Math.sin(state.clock.elapsedTime * 0.35 + index) * 0.001, -0.002, 0.002),
        },
        true,
      );
    });
  });

  return (
    <>
      {panels.map((panel, index) => (
        <RigidBody
          key={index}
          ref={(body) => {
            rigidBodies.current[index] = body;
          }}
          gravityScale={0}
          linearDamping={2.5}
          angularDamping={2.8}
          friction={0.1}
          position={panel.position as [number, number, number]}
        >
          <Float speed={1.8 + index * 0.4} rotationIntensity={0.18} floatIntensity={0.7}>
            <RoundedBox args={[2.4, 1.35, 0.18]} radius={0.16} smoothness={6}>
              <meshStandardMaterial
                color="#091220"
                emissive={panel.color}
                emissiveIntensity={0.14}
                metalness={0.55}
                roughness={0.18}
                transparent
                opacity={0.94}
              />
            </RoundedBox>
            <Html center transform distanceFactor={8.5}>
              <div className="w-[220px] rounded-[1.25rem] border border-white/12 bg-[rgba(5,10,24,0.38)] px-5 py-4 text-center backdrop-blur-lg">
                <p
                  className="text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: panel.color }}
                >
                  {panel.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/75">{panel.body}</p>
              </div>
            </Html>
          </Float>
        </RigidBody>
      ))}
    </>
  );
}

function AmbientNodes() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        position: [
          (seededUnit(index + 1) - 0.5) * 8,
          (seededUnit(index + 31) - 0.5) * 5,
          (seededUnit(index + 57) - 0.5) * 4,
        ] as [number, number, number],
        scale: 0.04 + seededUnit(index + 97) * 0.11,
      })),
    [],
  );

  return (
    <>
      {nodes.map((node, index) => (
        <mesh
          key={index}
          position={node.position}
          scale={node.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#2ee7ff" : index % 3 === 1 ? "#ff4fd8" : "#00ffa8"}
            emissive={index % 3 === 0 ? "#2ee7ff" : index % 3 === 1 ? "#ff4fd8" : "#00ffa8"}
            emissiveIntensity={1.6}
          />
        </mesh>
      ))}
    </>
  );
}

export default function AboutHologram() {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(46,231,255,0.1),transparent_32%),linear-gradient(180deg,rgba(6,10,24,0.96),rgba(3,7,18,0.98))]">
      <Canvas camera={{ position: [0, 0, 8], fov: 36 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 4, 4]} intensity={38} color="#2ee7ff" />
        <pointLight position={[-4, -2, 4]} intensity={26} color="#ff4fd8" />
        <Physics gravity={[0, 0, 0]}>
          <FloatingPanels />
        </Physics>
        <AmbientNodes />
      </Canvas>
    </div>
  );
}
