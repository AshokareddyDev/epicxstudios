"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { views } from "@/lib/site";
import { uiSpring } from "@/lib/motion";

const inset =
  "scroll-pl-[max(1.25rem,calc((100%-72rem)/2+1.25rem))] pl-[max(1.25rem,calc((100%-72rem)/2+1.25rem))] pr-[max(1.25rem,calc((100%-72rem)/2+1.25rem))] md:scroll-pl-[max(2rem,calc((100%-72rem)/2+2rem))] md:pl-[max(2rem,calc((100%-72rem)/2+2rem))] md:pr-[max(2rem,calc((100%-72rem)/2+2rem))]";

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={uiSpring}
      className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/80 font-mono text-ink disabled:opacity-35"
    >
      {children}
    </motion.button>
  );
}

export function ViewingRow() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    setAtStart(node.scrollLeft <= 2);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, [sync]);

  const step = (direction: -1 | 1) => {
    const node = scroller.current;
    const card = node?.querySelector<HTMLElement>("[data-view]");
    if (!node || !card) return;
    const styles = window.getComputedStyle(node);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    node.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-5 md:px-8">
        <div className="min-w-0">
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
            Gallery
          </p>
          <h2
            id="studio-gallery"
            className="mt-4 max-w-xl font-display text-3xl tracking-tight md:text-5xl"
          >
            How a lesson is viewed.
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <StepButton label="Previous view" disabled={atStart} onClick={() => step(-1)}>
            ←
          </StepButton>
          <StepButton label="Next view" disabled={atEnd} onClick={() => step(1)}>
            →
          </StepButton>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Ways to view a lesson"
        onScroll={sync}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        className={`mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto md:gap-5 [&::-webkit-scrollbar]:hidden ${
          reduce ? "" : "scroll-smooth"
        } ${inset}`}
      >
        {views.map((view, index) => (
          <motion.div
            key={view.src}
            data-view
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={uiSpring}
            className="w-[min(78vw,57.5rem)] shrink-0 snap-start"
          >
            <Link href={view.href} className="block">
              <div className="relative aspect-video overflow-hidden rounded-[28px] bg-ink/[0.04]">
                <Image
                  src={view.src}
                  alt={view.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 920px, 78vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 max-w-md pr-2">
                <p className="font-mono text-[0.68rem] tracking-[0.22em] text-amber uppercase">
                  {view.kicker}
                </p>
                <p className="mt-2 font-display text-2xl tracking-tight">{view.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink/70">{view.caption}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
