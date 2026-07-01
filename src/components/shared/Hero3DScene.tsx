"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/**
 * Premium 3D ambient layer for the Hero.
 * A single rose-vinho distorted orb floating top-right, reacting to the
 * cursor. Sized & positioned to enhance — never compete with — the content.
 */

function MorphOrb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    target.current.lerp(state.pointer, 0.04);
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.18;
      mesh.current.rotation.x = target.current.y * 0.3;
      mesh.current.position.x = 1.4 + target.current.x * 0.25;
      mesh.current.position.y = 0.6 + target.current.y * 0.15;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={mesh} position={[1.4, 0.6, 0]} scale={0.95}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#f43f72"
          emissive="#5a1224"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.55}
          distort={0.4}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.45} color="#fb7fa0" />
      <pointLight position={[3, 3, 3]} intensity={9} color="#f43f72" />
      <pointLight position={[-3, -1, 2]} intensity={5} color="#f59e0b" />
      <pointLight position={[0, 2, -2]} intensity={3} color="#fb7fa0" />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-90"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <MorphOrb />
          <Sparkles
            count={45}
            scale={[7, 5, 3]}
            size={1.6}
            speed={0.35}
            color="#fb7fa0"
            opacity={0.55}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
