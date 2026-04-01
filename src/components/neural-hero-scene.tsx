"use client";

import {
  Float,
  Line,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useEffectEvent, useMemo, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";
import type { Group, Mesh, Points as ThreePoints } from "three";
import { seededUnit } from "@/lib/utils";

function HoloField() {
  const planeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!planeRef.current) {
      return;
    }

    const uniforms = (
      planeRef.current.material as unknown as {
        uniforms: {
          uTime: { value: number };
        };
      }
    ).uniforms;

    if (!uniforms) {
      return;
    }

    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={planeRef} position={[0, -0.9, -5]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[30, 18, 92, 92]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={2}
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: new Color("#2ee7ff") },
          uColorB: { value: new Color("#8b5cff") },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 1.08 + uTime * 0.82) * 0.14;
            wave += cos(pos.y * 1.32 - uTime * 0.64) * 0.11;
            pos.z += wave;
            vWave = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            float gridX = abs(sin(vUv.x * 58.0)) * 0.065;
            float gridY = abs(cos(vUv.y * 42.0)) * 0.065;
            float glow = smoothstep(-0.05, 0.18, vWave);
            vec3 color = mix(uColorA, uColorB, vUv.x * 0.3 + vUv.y * 0.86 + glow * 0.2);
            float alpha = 0.1 + gridX + gridY + glow * 0.24;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function SignalDust() {
  const pointsRef = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const count = 3200;
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.4 + seededUnit(index + 1) * 5.8;
      const theta = seededUnit(index + 101) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(index + 211) - 1);

      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi) * 0.76;
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.06;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#b5fbff"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.78}
      />
    </Points>
  );
}

function OrbitSystem() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.16;
  });

  return (
    <group ref={groupRef} position={[-0.55, 0.04, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.45, 12]} />
        <MeshDistortMaterial
          color="#2ee7ff"
          emissive="#0d9fbc"
          emissiveIntensity={1.5}
          roughness={0.12}
          metalness={0.92}
          distort={0.34}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh scale={0.72}>
        <sphereGeometry args={[0.95, 36, 36]} />
        <meshStandardMaterial
          color="#07111d"
          emissive="#ff4fd8"
          emissiveIntensity={0.34}
          roughness={0.08}
          metalness={0.55}
        />
      </mesh>

      <mesh rotation={[0.24, 0.8, 0]}>
        <torusGeometry args={[2.12, 0.075, 20, 120]} />
        <meshStandardMaterial
          color="#ff4fd8"
          emissive="#ff4fd8"
          emissiveIntensity={1.4}
          roughness={0.18}
          metalness={0.86}
        />
      </mesh>

      <mesh rotation={[1.2, 0.2, 0.35]}>
        <torusGeometry args={[2.72, 0.035, 16, 140]} />
        <meshStandardMaterial
          color="#7e5bff"
          emissive="#7e5bff"
          emissiveIntensity={1.2}
          roughness={0.16}
          metalness={0.72}
        />
      </mesh>

      {[
        [2.4, 0.8, -0.25],
        [-2.2, -1.05, 0.18],
        [0.6, 2.25, -0.4],
        [-0.25, -2.35, -0.15],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          scale={0.16 + index * 0.028}
        >
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#2ee7ff" : "#ff4fd8"}
            emissive={index % 2 === 0 ? "#2ee7ff" : "#ff4fd8"}
            emissiveIntensity={1.7}
            roughness={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function TechMonolith() {
  const groupRef = useRef<Group>(null);
  const barsRef = useRef<Array<Mesh | null>>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.42) * 0.06;
    }

    barsRef.current.forEach((bar, index) => {
      if (!bar) {
        return;
      }

      const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 1.8 + index * 0.55) * 0.28;
      bar.scale.y = MathUtils.damp(bar.scale.y, Math.max(0.48, pulse), 4.5, delta);
    });
  });

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.64}>
      <group ref={groupRef} position={[2.45, 0.15, 0.55]} rotation={[0.08, -0.42, -0.04]}>
        <RoundedBox args={[2.45, 3.34, 0.22]} radius={0.18} smoothness={8}>
          <meshPhysicalMaterial
            color="#07101e"
            emissive="#2ee7ff"
            emissiveIntensity={0.1}
            roughness={0.12}
            metalness={0.44}
            transmission={0.18}
            transparent
            opacity={0.95}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[2.05, 2.9]} />
          <meshBasicMaterial color="#04101a" transparent opacity={0.64} />
        </mesh>

        {[-0.12, 0, 0.12].map((depth, index) => (
          <mesh key={depth} position={[0, 0, 0.1 + depth]}>
            <planeGeometry args={[1.72 - index * 0.18, 2.32 - index * 0.14]} />
            <meshBasicMaterial
              color={index === 0 ? "#0b1d34" : index === 1 ? "#11233d" : "#081729"}
              transparent
              opacity={0.58 - index * 0.08}
            />
          </mesh>
        ))}

        <mesh position={[0, 0, 0.16]} rotation={[0.45, 0.72, 0.2]}>
          <icosahedronGeometry args={[0.42, 4]} />
          <meshStandardMaterial
            color="#2ee7ff"
            emissive="#2ee7ff"
            emissiveIntensity={1.7}
            roughness={0.12}
            metalness={0.86}
            wireframe
          />
        </mesh>

        <mesh position={[0, 0, 0.14]} rotation={[0.6, 0.1, 0.25]}>
          <torusGeometry args={[0.7, 0.026, 16, 96]} />
          <meshStandardMaterial
            color="#ff4fd8"
            emissive="#ff4fd8"
            emissiveIntensity={1.28}
            roughness={0.14}
            metalness={0.82}
          />
        </mesh>

        <mesh position={[0, 0, 0.13]} rotation={[1.25, 0.22, -0.4]}>
          <torusGeometry args={[0.94, 0.02, 16, 128]} />
          <meshStandardMaterial
            color="#7e5bff"
            emissive="#7e5bff"
            emissiveIntensity={1.15}
            roughness={0.14}
            metalness={0.78}
          />
        </mesh>

        {Array.from({ length: 7 }, (_, index) => {
          const x = -0.72 + index * 0.24;
          const baseHeight = 0.45 + (index % 3) * 0.28;
          return (
            <mesh
              key={index}
              ref={(node) => {
                barsRef.current[index] = node;
              }}
              position={[x, -0.82, 0.14]}
              scale={[1, 1, 1]}
            >
              <boxGeometry args={[0.11, baseHeight, 0.06]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#2ee7ff" : "#ff4fd8"}
                emissive={index % 2 === 0 ? "#2ee7ff" : "#ff4fd8"}
                emissiveIntensity={1.4}
                roughness={0.1}
                metalness={0.84}
              />
            </mesh>
          );
        })}

        {[
          [-0.68, 0.84, 0.15],
          [0.62, 0.84, 0.15],
          [-0.84, 0.2, 0.15],
          [0.82, -0.18, 0.15],
          [0.58, -0.98, 0.15],
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]}>
            <sphereGeometry args={[0.06 + index * 0.008, 18, 18]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#2ee7ff" : "#8b5cff"}
              emissive={index % 2 === 0 ? "#2ee7ff" : "#8b5cff"}
              emissiveIntensity={1.8}
            />
          </mesh>
        ))}

        <Line
          points={[
            [-0.84, 0.84, 0.16],
            [0.84, 0.84, 0.16],
            [0.84, -1.16, 0.16],
            [-0.84, -1.16, 0.16],
            [-0.84, 0.84, 0.16],
          ]}
          color="#9ef6ff"
          transparent
          opacity={0.74}
          lineWidth={1.15}
        />

        <Text
          position={[0, 1.34, 0.17]}
          fontSize={0.15}
          color="#dff9ff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          INFERENCE CORE
        </Text>

        <Text
          position={[0, -1.48, 0.17]}
          fontSize={0.11}
          color="#8de8ff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          TELEMETRY // LLM // ML // REALTIME
        </Text>
      </group>
    </Float>
  );
}

function InterfaceLabels() {
  return (
    <>
      <Text
        position={[-3.6, 2.28, -0.8]}
        fontSize={0.26}
        color="#dff9ff"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        SYSTEMS // AI // EXECUTION
      </Text>
      <Text
        position={[-3.6, 1.78, -0.8]}
        fontSize={0.13}
        color="#7cc8d8"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.5}
      >
        Product-grade interfaces, realtime layers, and intelligence-driven workflows.
      </Text>
      <Text
        position={[-3.15, -1.88, -0.35]}
        fontSize={0.12}
        color="#92e6ff"
        anchorX="left"
        anchorY="middle"
        maxWidth={2.8}
      >
        MERN // NEXT.JS // SOCKET.IO // LLM ORCHESTRATION
      </Text>
    </>
  );
}

function SceneRig({
  entered,
}: {
  entered: boolean;
}) {
  const masterRef = useRef<Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const handleMove = useEffectEvent((event: PointerEvent) => {
    pointerRef.current = {
      x: (event.clientX / window.innerWidth - 0.5) * 1.2,
      y: (event.clientY / window.innerHeight - 0.5) * 0.8,
    };
  });

  useEffect(() => {
    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  useFrame((state, delta) => {
    state.camera.position.z = MathUtils.damp(
      state.camera.position.z,
      entered ? 5.2 : 6.5,
      2.8,
      delta,
    );
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      entered ? 0.45 : 0.05,
      2.4,
      delta,
    );
    state.camera.position.y = MathUtils.damp(
      state.camera.position.y,
      entered ? 0.05 : 0,
      2.2,
      delta,
    );
    state.camera.lookAt(0.35, 0, 0);

    if (!masterRef.current) {
      return;
    }

    masterRef.current.rotation.y = MathUtils.damp(
      masterRef.current.rotation.y,
      pointerRef.current.x * 0.16,
      3.2,
      delta,
    );
    masterRef.current.rotation.x = MathUtils.damp(
      masterRef.current.rotation.x,
      -pointerRef.current.y * 0.12,
      3.2,
      delta,
    );
    masterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={masterRef}>
      <OrbitSystem />
      <TechMonolith />
      <InterfaceLabels />

      <Line
        points={[
          [0.82, 0.5, 0.1],
          [1.42, 0.38, 0.24],
          [2.02, 0.26, 0.38],
        ]}
        color="#2ee7ff"
        transparent
        opacity={0.42}
        lineWidth={1.15}
      />
      <Line
        points={[
          [0.18, -0.64, -0.08],
          [1.08, -0.82, 0.08],
          [2.02, -0.88, 0.2],
        ]}
        color="#ff4fd8"
        transparent
        opacity={0.36}
        lineWidth={1.05}
      />

      <Sparkles
        count={120}
        scale={[8, 5, 7]}
        size={2.4}
        speed={0.32}
        opacity={0.75}
        color="#74f7ff"
      />
      <HoloField />
      <SignalDust />

      <ambientLight intensity={0.64} />
      <pointLight position={[5, 3, 5]} intensity={78} color="#2ee7ff" />
      <pointLight position={[-4, -2, 4]} intensity={48} color="#ff4fd8" />
      <pointLight position={[3, -3, 3]} intensity={34} color="#7e5bff" />
      <directionalLight position={[0, 5, 3]} intensity={1.4} color="#ffffff" />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.16} intensity={1.35} mipmapBlur />
        <DepthOfField focusDistance={0.012} focalLength={0.022} bokehScale={1.8} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0007, 0.001)}
        />
        <Noise opacity={0.026} premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.14} darkness={0.8} />
      </EffectComposer>
    </group>
  );
}

export default function NeuralHeroScene({
  entered,
}: {
  entered: boolean;
}) {
  return (
    <div className="h-[720px] w-full">
      <Canvas camera={{ position: [0.05, 0, 6.5], fov: 38 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#02030b"]} />
        <fog attach="fog" args={["#02030b", 8, 18]} />
        <Suspense fallback={null}>
          <SceneRig entered={entered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
