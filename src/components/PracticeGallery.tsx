"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SolutionScene } from "@/components/SolutionVisuals";
import type { Practice } from "@/lib/site";
import { slideSpring, useSlideRow } from "@/components/useSlideRow";

const MotionLink = motion.create(Link);

function SceneCard({
  practice,
  raised,
  instant,
}: {
  practice: Practice;
  raised: boolean;
  instant: boolean;
}) {
  const reduce = useReducedMotion();
  const featured = raised && !reduce;

  return (
    <motion.div
      data-scene
      initial={false}
      animate={
        featured
          ? { scale: 1, y: 0 }
          : { scale: reduce ? 1 : 0.92, y: 0 }
      }
      transition={instant ? { duration: 0 } : slideSpring}
      style={{ transformOrigin: "center top" }}
      className={`relative w-[min(45rem,70cqw)] shrink-0 snap-start ${featured ? "z-10" : ""}`}
    >
      <MotionLink
        href={practice.href}
        aria-current={raised ? "true" : undefined}
        aria-label={
          raised ? undefined : `${practice.index} ${practice.headline}. Open ${practice.nav}`
        }
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={slideSpring}
        className="glass block overflow-hidden rounded-[24px] text-ink"
      >
        <div className="relative aspect-video bg-paper">
          <SolutionScene href={practice.href} />
        </div>
        {raised ? (
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 md:gap-4">
            <p className="shrink-0 font-mono text-[0.68rem] tracking-[0.28em] text-muted uppercase">
              {practice.index}
            </p>
            <h3 className="min-w-0 flex-1 truncate font-display text-base tracking-tight md:text-lg">
              {practice.headline}
            </h3>
            <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[0.68rem] uppercase md:tracking-[0.18em]">
              <span className="hidden md:inline">Open {practice.nav}</span>
              <span aria-hidden>→</span>
            </span>
          </div>
        ) : null}
      </MotionLink>
    </motion.div>
  );
}

function Control({
  label,
  children,
  onClick,
}: {
  label: string;
  children: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={slideSpring}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-ivory/40 bg-ivory font-mono text-paper"
    >
      {children}
    </motion.button>
  );
}

export function PracticeGallery({ practices }: { practices: readonly Practice[] }) {
  const row = useSlideRow(practices.length, { align: "center", flank: true });
  const practice = practices[row.logical] ?? practices[0];
  const frames = row.lead
    ? [practices[practices.length - 1], ...practices, practices[0]]
    : practices;

  return (
    <div
      ref={row.rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product scenes"
      onKeyDown={row.onKeyDown}
      onPointerEnter={row.onPointerEnter}
      onPointerLeave={row.onPointerLeave}
      onFocus={row.onFocus}
      onBlur={row.onBlur}
    >
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            Gallery
          </p>
          <h2
            id="studio-gallery"
            className="mt-4 max-w-xl font-display text-3xl tracking-tight md:text-5xl"
          >
            Four products, from the classroom out.
          </h2>
        </div>
        <p className="shrink-0 font-mono text-[0.68rem] tracking-[0.22em] whitespace-nowrap text-ink/50">
          {practice.index} / 04
        </p>
      </div>

      <div className="w-full">
        <div
          ref={row.viewportRef}
          className={
            row.reduce
              ? "mt-6 snap-x snap-mandatory overflow-x-auto px-1 py-4 [container-type:inline-size]"
              : "mt-6 overflow-hidden px-1 py-4 [container-type:inline-size]"
          }
        >
          <motion.div className="flex items-start gap-4" {...row.track}>
            {frames.map((item, position) => (
              <SceneCard
                key={`${item.href}-${position}`}
                practice={item}
                raised={position === row.activeSlot}
                instant={row.instant}
              />
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <Control label="Previous scene" onClick={row.retreat}>
            ←
          </Control>
          <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
            {row.reduce ? "Scroll" : row.held || !row.inView ? "Paused" : "Moving"}
          </p>
          <Control label="Next scene" onClick={row.advance}>
            →
          </Control>
        </div>
      </div>
    </div>
  );
}
