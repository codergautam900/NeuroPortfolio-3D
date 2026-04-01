"use client";

import { Line, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { neuralSkills } from "@/lib/neural-content";

type SkillName = (typeof neuralSkills)[number]["name"];

function NebulaScene({
  selected,
  onSelect,
}: {
  selected: SkillName;
  onSelect: (name: SkillName) => void;
}) {
  const groupRef = useRef<Group>(null);
  const skillNodes = useMemo(
    () =>
      neuralSkills.map((skill, index) => {
        const angle = (index / neuralSkills.length) * Math.PI * 2;
        const radius = 2.7 + (index % 3) * 0.65;
        return {
          ...skill,
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle * 1.4) * 1.6,
            Math.sin(angle) * radius * 0.5,
          ] as [number, number, number],
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <>
      <group ref={groupRef}>
        {skillNodes.map((skill) => (
          <group key={skill.name} position={skill.position}>
            <mesh
              onPointerOver={() => onSelect(skill.name)}
              onClick={() => onSelect(skill.name)}
              scale={skill.name === selected ? 1.55 : 1}
            >
              <sphereGeometry args={[0.18 + skill.level / 420, 32, 32]} />
              <meshStandardMaterial
                color={skill.name === selected ? "#ff4fd8" : "#2ee7ff"}
                emissive={skill.name === selected ? "#ff4fd8" : "#2ee7ff"}
                emissiveIntensity={skill.name === selected ? 2.4 : 1.4}
                roughness={0.18}
                metalness={0.65}
              />
            </mesh>
            <Text
              position={[0, 0.42, 0]}
              fontSize={0.16}
              color="#dff9ff"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
          </group>
        ))}

        {skillNodes.map((skill, index) => {
          const next = skillNodes[(index + 3) % skillNodes.length];
          return (
            <Line
              key={`${skill.name}-${next?.name ?? index}`}
              points={[skill.position, next?.position ?? [0, 0, 0]]}
              color={skill.name === selected ? "#ff4fd8" : "#2ee7ff"}
              transparent
              opacity={skill.name === selected || next?.name === selected ? 0.75 : 0.18}
              lineWidth={skill.name === selected ? 1.8 : 0.8}
            />
          );
        })}

        <mesh>
          <icosahedronGeometry args={[0.52, 8]} />
          <meshStandardMaterial
            color="#8b5cff"
            emissive="#8b5cff"
            emissiveIntensity={1.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      <ambientLight intensity={0.56} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#2ee7ff" />
      <pointLight position={[-4, -2, 4]} intensity={24} color="#ff4fd8" />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.3} mipmapBlur luminanceThreshold={0.16} />
        <Noise opacity={0.025} />
      </EffectComposer>
    </>
  );
}

export default function SkillsNebula() {
  const [selected, setSelected] = useState<SkillName>(neuralSkills[0].name);
  const activeSkill =
    neuralSkills.find((skill) => skill.name === selected) ?? neuralSkills[0];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(7,12,26,0.98),rgba(3,8,18,0.98))]">
      <div className="absolute right-4 top-4 z-20 w-[min(320px,calc(100%-2rem))] rounded-[1.4rem] border border-white/12 bg-[rgba(5,10,24,0.72)] p-5 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/55">
          Skills overview
        </p>
        <h3 className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">
          {activeSkill.name}
        </h3>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#2ee7ff,#ff4fd8)]"
            style={{ width: `${activeSkill.level}%` }}
          />
        </div>
        <p className="mt-4 text-sm leading-7 text-white/65">{activeSkill.description}</p>
        <div className="mt-4 inline-flex rounded-full border border-cyan-300/18 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100/60">
          {activeSkill.cluster}
        </div>
      </div>

      <div className="h-[620px]">
        <Canvas camera={{ position: [0, 0.3, 8], fov: 42 }} dpr={[1, 1.8]}>
          <NebulaScene selected={selected} onSelect={setSelected} />
        </Canvas>
      </div>
    </div>
  );
}
