"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useEffectEvent, useRef } from "react";
import type { Group, Mesh } from "three";

function CoreCluster() {
  const groupRef = useRef<Group>(null);
  const knotRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    pointer.current = {
      x: (event.clientX / window.innerWidth - 0.5) * 0.8,
      y: (event.clientY / window.innerHeight - 0.5) * 0.7,
    };
  });

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (pointer.current.y * 0.45 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y +=
        (pointer.current.x * 0.55 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.position.y = Math.sin(elapsed * 0.9) * 0.14;
    }

    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.26;
      knotRef.current.rotation.y += delta * 0.42;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.2;
      shellRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles
        count={120}
        scale={[7, 7, 5]}
        size={2.2}
        speed={0.4}
        noise={0.3}
        color="#b0f7ff"
      />

      <Float speed={2.6} floatIntensity={1.8} rotationIntensity={1.1}>
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[1.55, 24]} />
          <MeshDistortMaterial
            color="#7df9ff"
            emissive="#0e8794"
            emissiveIntensity={1.2}
            roughness={0.08}
            metalness={0.55}
            distort={0.34}
            speed={1.7}
            transparent
            opacity={0.78}
          />
        </mesh>
      </Float>

      <mesh ref={knotRef} scale={0.64}>
        <torusKnotGeometry args={[2.2, 0.33, 220, 28]} />
        <meshStandardMaterial
          color="#ff8b4d"
          emissive="#ff7b38"
          emissiveIntensity={1.1}
          roughness={0.18}
          metalness={0.82}
        />
      </mesh>

      <Float speed={2} floatIntensity={2.1} rotationIntensity={1.4}>
        <mesh position={[2.05, 1.05, -0.5]} scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f7e7ce"
            emissive="#ffb580"
            emissiveIntensity={0.45}
            roughness={0.2}
            metalness={0.35}
          />
        </mesh>
      </Float>

      <Float speed={2.4} floatIntensity={1.4} rotationIntensity={1.2}>
        <mesh position={[-2.1, -1.15, -1.1]} scale={0.52}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9ceaff"
            emissive="#30b8d4"
            emissiveIntensity={0.7}
            roughness={0.28}
            metalness={0.4}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.8} floatIntensity={1.1} rotationIntensity={1.6}>
        <mesh position={[-0.5, 2.15, -1.6]} rotation={[0.8, 0.4, 0.2]}>
          <torusGeometry args={[0.78, 0.08, 20, 80]} />
          <meshStandardMaterial
            color="#7df9ff"
            emissive="#1296a8"
            emissiveIntensity={0.9}
            roughness={0.22}
            metalness={0.72}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[560px] w-full">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 44 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#050816", 6, 12]} />
        <ambientLight intensity={0.95} />
        <pointLight position={[4, 4, 6]} intensity={85} color="#7df9ff" />
        <pointLight position={[-4, -3, 5]} intensity={55} color="#ff8b4d" />
        <directionalLight position={[0, 3, 4]} intensity={1.5} color="#ffffff" />
        <CoreCluster />
      </Canvas>
    </div>
  );
}
