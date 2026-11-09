"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { uiSpring } from "@/lib/motion";

type SpringLink = {
  href: string;
  index: string;
  title: string;
  summary: string;
};

const titleClass = {
  compact:
    "block font-display text-xl tracking-tight text-ink transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none md:text-2xl",
  studio:
    "row-title block font-display text-ink transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none",
  display:
    "row-title block font-display text-ink transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none",
} as const;

const rowClass = {
  compact:
    "group grid grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-4 px-1 py-5 md:grid-cols-[3rem_minmax(0,1fr)_1.5rem] md:py-6",
  studio:
    "group grid grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-4 py-7 md:grid-cols-[3rem_minmax(0,1fr)_1.5rem] md:py-8",
  display:
    "group grid grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-4 py-7 md:grid-cols-[3rem_minmax(0,1fr)_1.5rem] md:py-9",
} as const;

const MotionLink = motion.create(Link);

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpringLinks({
  items,
  scale = "compact",
}: {
  items: readonly SpringLink[];
  scale?: keyof typeof titleClass;
}) {
  return (
    <ul className="border-b border-ink/10">
      {items.map((item) => (
        <li key={item.href} className="border-t border-ink/10">
          <MotionLink
            href={item.href}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.99 }}
            transition={uiSpring}
            className={rowClass[scale]}
          >
            <span className="pt-1 font-mono text-[0.68rem] tracking-[0.18em] text-muted">
              {item.index}
            </span>
            <span className="block min-w-0">
              <span className={titleClass[scale]}>{item.title}</span>
              <span className="mt-2 block max-w-xl text-sm leading-6 text-ink/75 md:text-base">
                {item.summary}
              </span>
            </span>
            <motion.span
              aria-hidden
              variants={{ rest: { x: 0 }, hover: { x: 2 } }}
              transition={uiSpring}
              className="mt-1 text-ink/50"
            >
              <Arrow />
            </motion.span>
          </MotionLink>
        </li>
      ))}
    </ul>
  );
}
