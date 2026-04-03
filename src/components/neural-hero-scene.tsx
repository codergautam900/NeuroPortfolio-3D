"use client";

import {
  Float,
  Line,
  MeshTransmissionMaterial,
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
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useEffectEvent, useMemo, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";
import type { Group, Mesh, Points as ThreePoints } from "three";
import { seededUnit } from "@/lib/utils";

function HoloFloor() {
  const planeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!planeRef.current) return;

    const uniforms = (
      planeRef.current.material as unknown as {
        uniforms: { uTime: { value: number } };
      }
    ).uniforms;

    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={planeRef} position={[0, -2.15, -4.6]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[28, 18, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: new Color("#7dd3fc") },
          uColorB: { value: new Color("#34d399") },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 1.2 + uTime * 1.1) * 0.08;
            wave += cos(pos.y * 1.3 - uTime * 0.85) * 0.05;
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
            float gridX = step(0.96, sin(vUv.x * 70.0) * 0.5 + 0.5) * 0.38;
            float gridY = step(0.96, sin(vUv.y * 48.0) * 0.5 + 0.5) * 0.28;
            float glow = smoothstep(-0.02, 0.12, vWave);
            vec3 color = mix(uColorA, uColorB, vUv.y + glow * 0.4);
            float alpha = 0.08 + gridX + gridY + glow * 0.18;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function AtmosphereDust() {
  const pointsRef = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const count = 2400;
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 3.2 + seededUnit(index + 1) * 6.2;
      const theta = seededUnit(index + 91) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(index + 173) - 1);

      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi) * 0.8;
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.028;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d9fbff"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.72}
      />
    </Points>
  );
}

function RobotSentinel() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const eyeRef = useRef<Mesh>(null);
  const armLeftRef = useRef<Group>(null);
  const armRightRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.22;
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.1) * 0.24;
      headRef.current.rotation.x = Math.sin(t * 0.8) * 0.08;
    }

    if (armLeftRef.current) {
      armLeftRef.current.rotation.z = MathUtils.damp(
        armLeftRef.current.rotation.z,
        -0.28 + Math.sin(t * 1.5) * 0.08,
        4,
        delta,
      );
    }

    if (armRightRef.current) {
      armRightRef.current.rotation.z = MathUtils.damp(
        armRightRef.current.rotation.z,
        0.28 + Math.cos(t * 1.5) * 0.08,
        4,
        delta,
      );
    }

    if (eyeRef.current) {
      eyeRef.current.scale.x = 0.84 + Math.sin(t * 3.2) * 0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.85;
    }
  });

  return (
    <Float speed={1.8} floatIntensity={0.8} rotationIntensity={0.12}>
      <group ref={groupRef} position={[0.4, -0.15, 0]}>
        <mesh position={[0, 1.9, -0.4]} ref={ringRef}>
          <torusGeometry args={[2.1, 0.04, 20, 140]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#7dd3fc"
            emissiveIntensity={1.6}
            roughness={0.12}
            metalness={0.86}
          />
        </mesh>

        <group position={[0, 0.95, 0]}>
          <RoundedBox args={[1.45, 2.1, 0.75]} radius={0.18} smoothness={8}>
            <meshPhysicalMaterial
              color="#93c5fd"
              roughness={0.18}
              metalness={0.9}
              transmission={0.22}
              thickness={0.8}
            />
          </RoundedBox>
          <mesh position={[0, 0.35, 0.41]}>
            <planeGeometry args={[0.92, 1.05]} />
            <meshBasicMaterial color="#08101f" transparent opacity={0.78} />
          </mesh>
          {[0.3, 0, -0.3].map((y, index) => (
            <mesh key={y} position={[0, y, 0.42]}>
              <planeGeometry args={[0.55 + index * 0.08, 0.07]} />
              <meshBasicMaterial
                color={index === 1 ? "#34d399" : "#7dd3fc"}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
        </group>

        <group ref={headRef} position={[0, 2.55, 0.08]}>
          <RoundedBox args={[1.2, 0.9, 0.82]} radius={0.18} smoothness={8}>
            <meshStandardMaterial
              color="#cbd5e1"
              emissive="#7dd3fc"
              emissiveIntensity={0.16}
              roughness={0.14}
              metalness={0.92}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.43]} ref={eyeRef}>
            <planeGeometry args={[0.68, 0.14]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <mesh position={[0, -0.24, 0.43]}>
            <planeGeometry args={[0.32, 0.05]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.9} />
          </mesh>
        </group>

        <group ref={armLeftRef} position={[-1.1, 1.45, 0]}>
          <RoundedBox args={[0.32, 1.45, 0.32]} radius={0.1} smoothness={6}>
            <meshStandardMaterial color="#94a3b8" roughness={0.18} metalness={0.9} />
          </RoundedBox>
          <mesh position={[0, -0.86, 0.06]}>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={1.1} />
          </mesh>
        </group>

        <group ref={armRightRef} position={[1.1, 1.45, 0]}>
          <RoundedBox args={[0.32, 1.45, 0.32]} radius={0.1} smoothness={6}>
            <meshStandardMaterial color="#94a3b8" roughness={0.18} metalness={0.9} />
          </RoundedBox>
          <mesh position={[0, -0.86, 0.06]}>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.1} />
          </mesh>
        </group>

        <group position={[-0.42, -0.85, 0]}>
          <RoundedBox args={[0.36, 1.55, 0.36]} radius={0.1} smoothness={6}>
            <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.88} />
          </RoundedBox>
        </group>
        <group position={[0.42, -0.85, 0]}>
          <RoundedBox args={[0.36, 1.55, 0.36]} radius={0.1} smoothness={6}>
            <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.88} />
          </RoundedBox>
        </group>

        <mesh position={[-0.42, -1.82, 0.08]}>
          <boxGeometry args={[0.56, 0.18, 0.9]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.9} />
        </mesh>
        <mesh position={[0.42, -1.82, 0.08]}>
          <boxGeometry args={[0.56, 0.18, 0.9]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.9} />
        </mesh>

        <mesh position={[0, 0.95, -0.42]}>
          <torusGeometry args={[1.02, 0.06, 18, 90]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.92}
            roughness={0.14}
            metalness={0.84}
          />
        </mesh>

        {[[-1.8, 2.8, -0.4], [1.9, 2.3, -0.8], [-1.4, -0.8, -1.1], [2.1, -0.5, -0.6]].map(
          (position, index) => (
            <mesh key={index} position={position as [number, number, number]} scale={0.18 + index * 0.04}>
              <sphereGeometry args={[1, 20, 20]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#7dd3fc" : "#34d399"}
                emissive={index % 2 === 0 ? "#7dd3fc" : "#34d399"}
                emissiveIntensity={1.6}
              />
            </mesh>
          ),
        )}
      </group>
    </Float>
  );
}

function GlassColumn() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <group ref={groupRef} position={[2.85, 0.15, -0.2]}>
      <RoundedBox args={[1.1, 3.4, 0.44]} radius={0.18} smoothness={8}>
        <MeshTransmissionMaterial
          samples={4}
          resolution={128}
          thickness={0.8}
          chromaticAberration={0.02}
          anisotropy={0.2}
          distortion={0.14}
          color="#7dd3fc"
          roughness={0.08}
        />
      </RoundedBox>

      {[-0.9, -0.45, 0, 0.45, 0.9].map((y, index) => (
        <mesh key={y} position={[0, y, 0.24]}>
          <planeGeometry args={[0.62, 0.08]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#7dd3fc" : "#34d399"}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  );
}

function InterfaceLabels() {
  return (
    <>
      <Text
        position={[-3.95, 2.4, -0.6]}
        fontSize={0.26}
        color="#e0f2fe"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        PREMIUM // ROBOTIC // INTERACTIVE
      </Text>
      <Text
        position={[-3.95, 1.88, -0.6]}
        fontSize={0.13}
        color="#a5f3fc"
        anchorX="left"
        anchorY="middle"
        maxWidth={3.7}
      >
        Robotic sentinel concept showing motion, systems polish, and futuristic interface depth.
      </Text>
      <Text
        position={[-3.5, -1.9, -0.3]}
        fontSize={0.11}
        color="#86efac"
        anchorX="left"
        anchorY="middle"
        maxWidth={3}
      >
        DESIGN // FULL STACK // AI FEATURES // RECRUITER IMPACT
      </Text>
    </>
  );
}

function SceneRig({ entered }: { entered: boolean }) {
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
      entered ? 6.1 : 7.2,
      2.6,
      delta,
    );
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      entered ? 0.2 : 0,
      2.4,
      delta,
    );
    state.camera.position.y = MathUtils.damp(
      state.camera.position.y,
      entered ? 0.15 : 0,
      2.2,
      delta,
    );
    state.camera.lookAt(0.35, 0.2, 0);

    if (!masterRef.current) return;

    masterRef.current.rotation.y = MathUtils.damp(
      masterRef.current.rotation.y,
      pointerRef.current.x * 0.14,
      3,
      delta,
    );
    masterRef.current.rotation.x = MathUtils.damp(
      masterRef.current.rotation.x,
      -pointerRef.current.y * 0.08,
      3,
      delta,
    );
  });

  return (
    <group ref={masterRef}>
      <RobotSentinel />
      <GlassColumn />
      <InterfaceLabels />

      <Line
        points={[
          [-0.9, 2.2, -0.1],
          [0.1, 2.05, 0.18],
          [1.1, 1.9, 0.28],
        ]}
        color="#7dd3fc"
        transparent
        opacity={0.5}
        lineWidth={1.1}
      />
      <Line
        points={[
          [-0.95, 0.48, 0.06],
          [0.12, 0.95, 0.18],
          [1.22, 0.58, 0.32],
        ]}
        color="#34d399"
        transparent
        opacity={0.44}
        lineWidth={1.05}
      />

      <Sparkles
        count={180}
        scale={[9, 6, 8]}
        size={2.2}
        speed={0.34}
        opacity={0.82}
        color="#d9fbff"
      />
      <HoloFloor />
      <AtmosphereDust />

      <ambientLight intensity={0.72} />
      <pointLight position={[5, 4, 5]} intensity={82} color="#7dd3fc" />
      <pointLight position={[-4, 1, 3]} intensity={46} color="#34d399" />
      <pointLight position={[1, -3, 4]} intensity={32} color="#f8fafc" />
      <directionalLight position={[0, 5, 4]} intensity={1.4} color="#ffffff" />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.16} intensity={1.45} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0007, 0.0009)}
        />
        <Noise opacity={0.022} premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.15} darkness={0.82} />
      </EffectComposer>
    </group>
  );
}

export default function NeuralHeroScene({ entered }: { entered: boolean }) {
  return (
    <div className="h-[720px] w-full">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 34 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#06101d"]} />
        <fog attach="fog" args={["#06101d", 9, 20]} />
        <Suspense fallback={null}>
          <SceneRig entered={entered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
