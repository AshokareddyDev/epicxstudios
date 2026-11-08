"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { PracticeStrip } from "@/components/PracticeStrip";
import { SpringLinks } from "@/components/SpringLinks";
import { StudioMap } from "@/components/SolutionVisuals";
import { ViewingRow } from "@/components/ViewingRow";
import type { HomeCopy, PageLink, Practice, View } from "@/lib/site";

const STRUCTURAL_SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

const TILT_SPRING = { stiffness: 100, damping: 15 };

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: STRUCTURAL_SPRING },
};

export function HomeStage({
  home,
  pages,
  practices,
  views,
}: {
  home: HomeCopy;
  pages: readonly PageLink[];
  practices: readonly Practice[];
  views: readonly View[];
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["16%", "84%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "58%"]);
  const glare = useMotionTemplate`radial-gradient(540px circle at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 58%)`;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <div className="relative">
      <section
        id="studio"
        aria-labelledby="studio-title"
        className="relative z-10 overflow-x-clip px-5 pt-28 pb-16 md:px-8 md:pt-32"
      >
        <div
          className="mx-auto w-full max-w-6xl"
          style={{ perspective: 1600 }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06, delayChildren: 0.04 },
              },
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full rounded-[32px] border border-white/15 bg-paper/75 text-ivory backdrop-blur-[16px]"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[32px]"
              style={{ background: glare }}
            />
            <div className="relative grid min-w-0 items-start gap-8 px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-11 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10">
              <div className="min-w-0">
                <motion.p
                  variants={reveal}
                  className="font-mono text-[0.68rem] tracking-[0.32em] text-ivory/60 uppercase"
                >
                  {home.eyebrow}
                </motion.p>
                <motion.h1
                  id="studio-title"
                  variants={reveal}
                  className="mt-4 max-w-xl font-display text-[clamp(2.15rem,4.4vw,3.35rem)] leading-[1.02] tracking-[-0.045em] text-ivory"
                >
                  {home.title}
                </motion.h1>
                <motion.p
                  variants={reveal}
                  className="mt-5 max-w-md text-base leading-7 text-ivory/70"
                >
                  {home.lede}
                </motion.p>
              </div>
              <motion.div variants={reveal} className="min-w-0">
                <PracticeStrip practices={practices} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="studio-flow"
        className="relative z-10 px-5 pt-16 md:px-8 md:pt-20"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div aria-hidden className="quantum-rule mb-16 md:mb-20" />
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            {home.systemEyebrow}
          </p>
          <h2
            id="studio-flow"
            className="mt-4 max-w-xl font-display text-3xl tracking-tight md:text-5xl"
          >
            {home.systemTitle}
          </h2>
          <StudioMap />
        </div>
      </section>

      <section
        aria-labelledby="studio-gallery"
        className="relative z-10 overflow-x-clip pt-16 pb-8 md:pt-20 md:pb-10"
      >
        <ViewingRow views={views} />
      </section>

      <section
        aria-labelledby="studio-sections"
        className="relative z-10 px-5 pb-24 md:px-8 md:pb-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2
            id="studio-sections"
            className="max-w-xl font-display text-3xl tracking-tight md:text-5xl"
          >
            {home.linksTitle}
          </h2>
          <div className="mt-10">
            <SpringLinks
              scale="studio"
              items={pages
                .filter((page) => page.href !== "/")
                .map((page) => ({
                  href: page.href,
                  index: page.index,
                  title: page.label,
                  summary: page.summary,
                }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
