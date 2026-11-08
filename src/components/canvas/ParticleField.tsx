"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 72;
const LINK_DISTANCE_SQ = 5.2;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function reducedMotionServerSnapshot() {
  return false;
}

function createNetwork() {
  const positions = new Float32Array(COUNT * 3);

  for (let index = 0; index < COUNT; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 9;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 5.4;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 3.2;
  }

  const links: number[] = [];

  for (let i = 0; i < COUNT; i += 1) {
    for (let j = i + 1; j < COUNT; j += 1) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const distance = dx * dx + dy * dy + dz * dz;

      if (distance < LINK_DISTANCE_SQ) {
        links.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2],
        );
      }
    }
  }

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(links), 3),
  );

  return { pointGeometry, lineGeometry };
}

function Network({ frozen }: { frozen: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(() => createNetwork(), []);

  useEffect(() => {
    const { pointGeometry, lineGeometry } = geometries;
    return () => {
      pointGeometry.dispose();
      lineGeometry.dispose();
    };
  }, [geometries]);

  useFrame((state) => {
    const node = group.current;
    if (!node || frozen) {
      return;
    }

    node.rotation.y = state.clock.elapsedTime * 0.035 + state.pointer.x * 0.28;
    node.rotation.x = state.pointer.y * 0.12;
  });

  return (
    <group ref={group}>
      <points geometry={geometries.pointGeometry}>
        <pointsMaterial
          color="#0c5c3a"
          size={0.035}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={geometries.lineGeometry}>
        <lineBasicMaterial
          color="#7dba9a"
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export function ParticleField() {
  const frozen = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    reducedMotionServerSnapshot,
  );

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.2], fov: 48 }}
      frameloop={frozen ? "demand" : "always"}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.setClearColor("#f6f1e6", 0)}
    >
      <Network frozen={frozen} />
    </Canvas>
  );
}
