"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { uiSpring } from "@/lib/motion";

type EmphasisRow = {
  index: string;
  title: string;
  body: string;
};

export function EmphasisRows({
  rows,
  label,
  layoutId,
  titleLevel = "h2",
  className = "",
}: {
  rows: readonly EmphasisRow[];
  label: string;
  layoutId: string;
  titleLevel?: "h2" | "h3";
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const Heading = titleLevel;

  return (
    <ol aria-label={label} className={`border-b border-ink/10 ${className}`}>
      {rows.map((row, index) => {
        const selected = active === index;
        const titleId = `${layoutId}-${row.index}`;

        return (
          <li key={row.index} className="border-t border-ink/10">
            <div
              className={`relative transition-colors duration-300 motion-reduce:transition-none ${
                selected ? "bg-surface" : ""
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden
                  transition={uiSpring}
                  className="pointer-events-none absolute inset-y-6 left-0 w-px bg-amber md:inset-y-8"
                />
              ) : null}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-ion"
                initial={false}
                animate={{ scaleX: selected ? 1 : 0 }}
                transition={uiSpring}
              />
              <button
                type="button"
                className="absolute inset-0 z-10"
                aria-pressed={selected}
                aria-labelledby={titleId}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              />
              <div className="pointer-events-none relative grid gap-3 px-4 py-7 md:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.1fr)] md:gap-8 md:px-6 md:py-9">
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                  {row.index}
                </span>
                <Heading
                  id={titleId}
                  className="font-display text-2xl tracking-tight md:text-3xl"
                >
                  {row.title}
                </Heading>
                <p className="max-w-xl text-base leading-7 text-ink/75">
                  {row.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
