"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Practice } from "@/lib/site";

const STRUCTURAL_SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

const MotionLink = motion.create(Link);

type Tone = "paper" | "stage";

function place(practices: readonly Practice[], href: string) {
  const index = practices.findIndex((practice) => practice.href === href);
  return {
    index,
    current: practices[index],
    previous: index > 0 ? practices[index - 1] : undefined,
    next:
      index >= 0 && index < practices.length - 1
        ? practices[index + 1]
        : undefined,
  };
}

export function ChapterRail({
  practices,
  tone = "paper",
  currentHref,
  onSelect,
}: {
  practices: readonly Practice[];
  tone?: Tone;
  currentHref?: string;
  onSelect?: (index: number) => void;
}) {
  const stage = tone === "stage";
  const active = practices.findIndex((practice) => practice.href === currentHref);

  return (
    <nav aria-label="Products">
      <div className="min-w-0 overflow-x-auto">
        <ol className="flex w-max min-w-full flex-nowrap gap-2 pb-1">
        {practices.map((practice, index) => {
          const current = practice.href === currentHref;
          const className = `inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.68rem] tracking-[0.14em] whitespace-nowrap uppercase ${
            current
              ? stage
                ? "border-ivory bg-ivory text-stage"
                : "border-ink bg-ink text-paper"
              : stage
                ? "border-white/15 text-ivory/75 hover:border-ivory/40"
                : "border-ivory/15 bg-surface text-ink/70 hover:border-amber"
          }`;
          const label = (
            <>
              <span className={current ? undefined : "text-muted"}>
                {practice.index}
              </span>
              {practice.nav}
            </>
          );

          return (
            <li key={practice.href}>
              {onSelect ? (
                <motion.button
                  type="button"
                  aria-current={current ? "true" : undefined}
                  whileHover={{ y: -2 }}
                  transition={STRUCTURAL_SPRING}
                  onClick={() => onSelect(index)}
                  className={className}
                >
                  {label}
                </motion.button>
              ) : (
                <MotionLink
                  href={practice.href}
                  aria-current={current ? "page" : undefined}
                  whileHover={{ y: -2 }}
                  transition={STRUCTURAL_SPRING}
                  className={className}
                >
                  {label}
                </MotionLink>
              )}
            </li>
          );
        })}
        </ol>
      </div>
      {active >= 0 ? (
        <div
          className={`mt-3 h-px w-full ${stage ? "bg-white/10" : "bg-ink/10"}`}
        >
          <div
            className="h-px bg-amber"
            style={{ width: `${((active + 1) / practices.length) * 100}%` }}
          />
        </div>
      ) : null}
    </nav>
  );
}

function Step({
  label,
  practice,
  tone,
}: {
  label: string;
  practice: Practice;
  tone: Tone;
}) {
  const stage = tone === "stage";

  return (
    <MotionLink
      href={practice.href}
      whileHover={{ y: -3 }}
      transition={STRUCTURAL_SPRING}
      className={`group flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 ${
        stage
          ? "border-white/10 bg-white/[0.04]"
          : "border-ivory/15 bg-surface"
      }`}
    >
      <span>
        <span
          className={`font-mono text-[0.68rem] tracking-[0.18em] uppercase ${
            stage ? "text-ivory/60" : "text-ink/60"
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block font-display text-lg tracking-tight">
          <span className="mr-2 font-mono text-sm text-muted">
            {practice.index}
          </span>
          {practice.nav}
        </span>
        <span
          className={`mt-1 block max-w-md text-sm leading-6 ${
            stage ? "text-ivory/60" : "text-ink/60"
          }`}
        >
          {practice.summary}
        </span>
      </span>
      <span
        aria-hidden
        className="font-mono text-lg text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
      >
        →
      </span>
    </MotionLink>
  );
}

export function PracticePager({
  href,
  practices,
  tone = "paper",
}: {
  href: string;
  practices: readonly Practice[];
  tone?: Tone;
}) {
  const { previous, next } = place(practices, href);

  return (
    <nav aria-label="Continue" className="mt-10 border-t border-current/10 pt-6">
      <div className="grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        {previous ? (
          <Step label="Previous" practice={previous} tone={tone} />
        ) : (
          <MotionLink
            href="/#practice"
            whileHover={{ y: -3 }}
            transition={STRUCTURAL_SPRING}
            className={`flex items-center rounded-2xl border px-4 py-4 font-mono text-[0.68rem] tracking-[0.18em] uppercase ${
              tone === "stage"
                ? "border-white/10 text-ivory/70"
                : "border-ink/10 text-ink/60"
            }`}
          >
            ← Studio
          </MotionLink>
        )}
        {next ? (
          <Step label="Continue" practice={next} tone={tone} />
        ) : (
          <MotionLink
            href="/services"
            whileHover={{ y: -3 }}
            transition={STRUCTURAL_SPRING}
            className={`group flex items-center justify-between rounded-2xl border px-4 py-4 ${
              tone === "stage"
                ? "border-white/10 bg-white/[0.04]"
                : "border-ivory/15 bg-surface"
            }`}
          >
            <span>
              <span
                className={`font-mono text-[0.68rem] tracking-[0.18em] uppercase ${
                  tone === "stage" ? "text-ivory/60" : "text-ink/60"
                }`}
              >
                Continue
              </span>
              <span className="mt-1 block font-display text-lg tracking-tight">
                All products
              </span>
            </span>
            <span aria-hidden className="font-mono text-lg text-muted group-hover:text-amber">
              →
            </span>
          </MotionLink>
        )}
      </div>
    </nav>
  );
}
