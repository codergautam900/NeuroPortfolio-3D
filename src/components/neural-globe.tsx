"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function GlobeCore() {
  const groupRef = useRef<Group>(null);
  const arcs = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const angle = (index / 9) * Math.PI * 2;
        return [
          [Math.cos(angle) * 1.9, Math.sin(angle * 1.6) * 1.1, -0.6],
          [0, Math.sin(angle * 0.8) * 1.5, 0.35],
          [Math.cos(angle + 1.2) * 1.6, Math.sin(angle + 0.8) * 1.2, 0.8],
        ] as [number, number, number][];
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.14;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.65, 48, 48]} />
        <meshStandardMaterial
          color="#081220"
          emissive="#2ee7ff"
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.18, 0.02, 16, 120]} />
        <meshStandardMaterial color="#ff4fd8" emissive="#ff4fd8" emissiveIntensity={1.6} />
      </mesh>
      {arcs.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? "#2ee7ff" : "#ff4fd8"}
          lineWidth={1.1}
          transparent
          opacity={0.68}
        />
      ))}
    </group>
  );
}

export default function NeuralGlobe() {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(46,231,255,0.12),transparent_28%),linear-gradient(180deg,rgba(7,12,24,0.96),rgba(3,8,18,0.98))]">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.7]}>
        <ambientLight intensity={0.65} />
        <pointLight position={[3, 3, 3]} intensity={26} color="#2ee7ff" />
        <pointLight position={[-3, -2, 4]} intensity={20} color="#ff4fd8" />
        <GlobeCore />
      </Canvas>
    </div>
  );
}
