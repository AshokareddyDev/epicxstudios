"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { practices, type Practice } from "@/lib/site";
import { slideSpring, useSlideRow } from "@/components/useSlideRow";

const GLASS = {
  "/services/k12-education": {
    title: "K12 curriculum platform",
    metric: "State and CBSE",
    gradient:
      "bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-amber/[0.07]",
  },
  "/services/training-lms": {
    title: "Training LMS",
    metric: "Higher study",
    gradient:
      "bg-gradient-to-br from-ion/[0.12] via-white/[0.04] to-white/[0.02]",
  },
  "/services/software-mobile": {
    title: "Custom applications",
    metric: "Training software",
    gradient:
      "bg-gradient-to-br from-white/[0.10] via-white/[0.03] to-white/[0.015]",
  },
  "/services/web-dev": {
    title: "Education websites",
    metric: "Schools and institutes",
    gradient:
      "bg-gradient-to-br from-white/[0.08] via-amber/[0.05] to-white/[0.02]",
  },
} as const satisfies Record<
  Practice["href"],
  { title: string; metric: string; gradient: string }
>;

function StageControl({
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
      className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] font-mono text-ivory"
    >
      {children}
    </motion.button>
  );
}

function PillarCard({
  practice,
  raised,
}: {
  practice: Practice;
  raised: boolean;
}) {
  const glass = GLASS[practice.href];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={slideSpring}
      className={`relative h-full overflow-hidden rounded-[24px] border border-white/[0.08] shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-[24px] ${glass.gradient}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />
      <Link
        href={practice.href}
        aria-current={raised ? "true" : undefined}
        className="block p-6 md:p-7"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[0.68rem] tracking-[0.22em] text-amber">
            {practice.index}
          </span>
          <span className="text-right font-mono text-[0.68rem] tracking-[0.16em] text-ivory/55 uppercase">
            {glass.metric}
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl leading-snug tracking-tight text-ivory">
          {glass.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-ivory/70">{practice.summary}</p>
      </Link>
    </motion.article>
  );
}

export function PracticeStrip() {
  const row = useSlideRow(practices.length);
  const practice = practices[row.logical] ?? practices[0];
  const frames = row.reduce ? practices : [...practices, practices[0]];

  return (
    <div
      id="practice"
      ref={row.rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Core products"
      className="scroll-mt-32"
      onKeyDown={row.onKeyDown}
      onPointerEnter={row.onPointerEnter}
      onPointerLeave={row.onPointerLeave}
      onFocus={row.onFocus}
      onBlur={row.onBlur}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.68rem] tracking-[0.22em] whitespace-nowrap text-ivory/55">
          {practice.index} / 04
        </p>
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ivory/45 uppercase">
          {row.reduce ? "Scroll" : row.held || !row.inView ? "Paused" : "Moving"}
        </p>
      </div>

      <div
        ref={row.viewportRef}
        className={
          row.reduce
            ? "mt-4 snap-x snap-mandatory overflow-x-auto px-1 pt-5 pb-8 [container-type:inline-size]"
            : "mt-4 overflow-hidden px-1 pt-5 pb-8 [container-type:inline-size]"
        }
      >
        <motion.div className="flex gap-4" {...row.track}>
          {frames.map((item, position) => {
            const raised = !row.reduce && position === row.cursor;
            return (
              <motion.div
                key={`${item.href}-${position}`}
                data-scene
                animate={{ y: raised ? -12 : 0 }}
                transition={slideSpring}
                className="w-[calc(100cqw-4.75rem)] shrink-0 snap-start"
              >
                <PillarCard practice={item} raised={raised} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <StageControl label="Previous product" onClick={row.retreat}>
          ←
        </StageControl>
        <StageControl label="Next product" onClick={row.advance}>
          →
        </StageControl>
      </div>
    </div>
  );
}
