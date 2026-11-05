"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () =>
    import("@/components/canvas/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false },
);

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <ParticleField />
    </div>
  );
}
