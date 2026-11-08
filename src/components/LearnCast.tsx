"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { uiSpring } from "@/lib/motion";

type Check = "idle" | "wrong" | "right";
type Mood = Check;

const lines: Record<string, readonly string[]> = {
  light: [
    "Open the white-light page. The period starts on the line the syllabus already named.",
    "One beam enters the prism. Three leave it. Every screen shows this same figure.",
    "Ask what the prism did. Choose the line that matches the figure.",
    "Green desks finished this period. The plain ones are still on the page.",
  ],
  cell: [
    "Read the wall, the membrane, and the nucleus before anyone draws.",
    "The nucleus sits inside. The wall is the outer line. The labels stay put on every screen.",
    "Which part holds the genetic material? Use the labels on the cell.",
    "Finished desks keep this chapter. The next section can open the same cell.",
  ],
  lens: [
    "Read the lens and the rays. It is the same page a student can open beside a notebook.",
    "The rays bend in the lens and meet at the focus. The teal dot is that point.",
    "Where do the rays meet? Follow the three lines to the dot.",
    "Who practiced stays on this chapter when the screen changes.",
  ],
};

const wrongLine: Record<string, string> = {
  light: "Look at the figure again. The prism splits the beam. It does not stop it.",
  cell: "The wall holds the cell in. The genetic material is in the nucleus.",
  lens: "They do meet. Follow the rays to the teal dot.",
};

const rightLine: Record<string, string> = {
  light: "That matches the chapter. The prism splits the beam.",
  cell: "The nucleus. That is the part the chapter marked.",
  lens: "At the focus. That is where the rays meet.",
};

const spots = [0.02, 0.62, 0.18, 0.48] as const;

const pop = { type: "spring", stiffness: 520, damping: 16, mass: 0.7 } as const;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

function spokenLine(chapterId: string, stepIndex: number, check: Check) {
  if (check === "wrong") return wrongLine[chapterId] ?? wrongLine.light;
  if (check === "right") return rightLine[chapterId] ?? rightLine.light;
  const chapter = lines[chapterId] ?? lines.light;
  return chapter[stepIndex] ?? chapter[0];
}

function Eyes({
  mood,
  alive,
  cx,
  cy,
}: {
  mood: Mood;
  alive: boolean;
  cx: number;
  cy: number;
}) {
  const blink = alive && mood === "idle";
  if (mood === "right") {
    return (
      <path
        d={`M${cx - 14} ${cy} q14 -16 28 0`}
        fill="none"
        className="stroke-stage"
        strokeWidth="5"
        strokeLinecap="round"
      />
    );
  }

  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      initial={false}
      animate={blink ? { scaleY: [1, 1, 0.12, 1] } : { scaleY: mood === "wrong" ? 0.7 : 1 }}
      transition={
        blink
          ? { duration: 3.6, repeat: Infinity, times: [0, 0.86, 0.91, 0.96] }
          : uiSpring
      }
    >
      <ellipse cx={cx} cy={cy} rx="16" ry="18" className="fill-ink stroke-stage" strokeWidth="4" />
      <ellipse cx={cx + 2} cy={cy + (mood === "wrong" ? -4 : 2)} rx="6.5" ry="7.5" className="fill-stage" />
      <circle cx={cx + 5} cy={cy - 4} r="2.4" className="fill-ivory" />
    </motion.g>
  );
}

function Teacher({ mood, alive }: { mood: Mood; alive: boolean }) {
  return (
    <svg viewBox="0 0 220 230" className="h-44 w-36 overflow-visible text-stage" aria-hidden>
      <ellipse cx="78" cy="168" rx="16" ry="10" className="fill-stage" />
      <ellipse cx="142" cy="168" rx="16" ry="10" className="fill-stage" />
      <path d="M58 150c-16 8-22 28-8 34 10 4 22-6 24-18" className="fill-ion" {...stroke} />
      <rect x="46" y="168" width="26" height="20" rx="4" className="fill-ink" {...stroke} />
      <path d="M48 174h22" className="stroke-stage" strokeWidth="2" />
      <path d="M162 148c18 6 24 26 8 34-12 6-24-4-26-18" className="fill-ion" {...stroke} />
      <ellipse cx="110" cy="162" rx="42" ry="32" className="fill-ion" {...stroke} />
      <ellipse cx="110" cy="158" rx="16" ry="14" className="fill-ink" {...stroke} />
      <circle cx="110" cy="96" r="70" className="fill-ivory" {...stroke} />
      <path
        d="M48 96c0-46 28-74 62-74s62 28 62 74c0-18-12-40-62-40S48 78 48 96Z"
        className="fill-stage"
        {...stroke}
      />
      <circle cx="168" cy="78" r="16" className="fill-stage" {...stroke} />
      <ellipse cx="72" cy="124" rx="8" ry="5" className="fill-amber/50" />
      <ellipse cx="150" cy="124" rx="8" ry="5" className="fill-amber/50" />
      <Eyes mood={mood} alive={alive} cx={82} cy={108} />
      <Eyes mood={mood} alive={alive} cx={138} cy={108} />
      <circle cx="82" cy="108" r="24" fill="none" className="stroke-stage" strokeWidth="4" />
      <circle cx="138" cy="108" r="24" fill="none" className="stroke-stage" strokeWidth="4" />
      <path d="M106 108h8" className="stroke-stage" strokeWidth="4" strokeLinecap="round" />
      {mood === "wrong" ? (
        <path d="M92 140q18-12 36 0" fill="none" className="stroke-stage" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path
          d={mood === "right" ? "M86 132q24 22 48 0" : "M92 134q18 16 36 0"}
          fill="none"
          className="stroke-stage"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function Student({ mood, alive }: { mood: Mood; alive: boolean }) {
  return (
    <svg viewBox="0 0 160 200" className="h-32 w-24 overflow-visible text-stage" aria-hidden>
      <ellipse cx="58" cy="176" rx="13" ry="8" className="fill-stage" />
      <ellipse cx="102" cy="176" rx="13" ry="8" className="fill-stage" />
      <ellipse cx="80" cy="158" rx="32" ry="26" className="fill-ion" {...stroke} />
      <rect x="108" y="146" width="22" height="16" rx="3" className="fill-ink" {...stroke} />
      <circle cx="80" cy="86" r="52" className="fill-ivory" {...stroke} />
      <path
        d="M34 86c0-36 20-56 46-56s46 20 46 56c0-14-10-32-46-32S34 72 34 86Z"
        className="fill-stage"
        {...stroke}
      />
      <ellipse cx="58" cy="108" rx="6" ry="4" className="fill-amber/50" />
      <ellipse cx="104" cy="108" rx="6" ry="4" className="fill-amber/50" />
      <Eyes mood={mood} alive={alive} cx={58} cy={90} />
      <Eyes mood={mood} alive={alive} cx={102} cy={90} />
      {mood === "wrong" ? (
        <path d="M64 124q16-10 32 0" fill="none" className="stroke-stage" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path
          d={mood === "right" ? "M60 116q20 18 40 0" : "M66 120q14 12 28 0"}
          fill="none"
          className="stroke-stage"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function pose(mood: Mood, hopping: boolean, alive: boolean) {
  if (!alive) {
    return {
      animate: { y: 0, x: 0, rotate: 0, scaleX: 1, scaleY: 1 },
      transition: uiSpring,
    };
  }
  if (hopping) {
    return {
      animate: {
        y: [0, -28, -8, 0],
        x: 0,
        rotate: [0, -6, 4, 0],
        scaleX: [1, 0.9, 1.08, 1],
        scaleY: [1, 1.12, 0.88, 1],
      },
      transition: { duration: 0.48, times: [0, 0.42, 0.75, 1] },
    };
  }
  if (mood === "wrong") {
    return {
      animate: { x: [0, -14, 14, -8, 8, 0], y: 0, rotate: [0, -8, 8, -4, 3, 0], scaleX: 1, scaleY: 1 },
      transition: { duration: 0.48 },
    };
  }
  if (mood === "right") {
    return {
      animate: { y: [0, -36, -6, 0], x: 0, rotate: [0, -4, 4, 0], scaleX: [1, 0.92, 1.08, 1], scaleY: [1, 1.14, 0.9, 1] },
      transition: { duration: 0.55, times: [0, 0.4, 0.72, 1] },
    };
  }
  return {
    animate: { y: [0, -8, 0], x: 0, rotate: 0, scaleX: [1, 0.98, 1], scaleY: [1, 1.04, 1] },
    transition: { duration: 1.35, repeat: Infinity, repeatType: "mirror" as const },
  };
}

function Mascot({
  x,
  mood,
  hopping,
  alive,
  children,
}: {
  x: number;
  mood: Mood;
  hopping: boolean;
  alive: boolean;
  children: React.ReactNode;
}) {
  const motionPose = pose(mood, hopping, alive);
  return (
    <motion.div
      className="absolute bottom-0"
      initial={false}
      animate={{ x }}
      transition={pop}
      aria-hidden
    >
      <motion.span
        className="absolute bottom-1 left-6 h-2.5 w-16 origin-center rounded-full bg-ink/15"
        initial={false}
        animate={
          alive && hopping
            ? { scaleX: [1, 0.6, 1.2, 1], opacity: [0.25, 0.1, 0.3, 0.22] }
            : { scaleX: 1, opacity: 0.22 }
        }
        transition={motionPose.transition}
      />
      <motion.div
        key={hopping ? "hop" : mood}
        className="origin-bottom"
        initial={false}
        animate={motionPose.animate}
        transition={motionPose.transition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function LearnCast({
  chapterId,
  stepIndex,
  check,
}: {
  chapterId: string;
  stepIndex: number;
  check: Check;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hopping, setHopping] = useState(false);
  const reduce = useReducedMotion();
  const alive = mounted && reduce === false;
  const span = Math.max(width - 144, 0);
  const teacherX = span * (spots[stepIndex] ?? spots[0]);
  const studentX = Math.min(Math.max(teacherX - 88, 0), Math.max(width - 96, 0));
  const line = spokenLine(chapterId, stepIndex, check);
  const tailX = Math.min(Math.max(teacherX + 70, 28), Math.max(width - 36, 28));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const measure = () => setWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!alive || check !== "idle") return;
    setHopping(true);
    const id = window.setTimeout(() => setHopping(false), 520);
    return () => window.clearTimeout(id);
  }, [teacherX, alive, check, stepIndex]);

  return (
    <div ref={trackRef} className="border-t border-ink/10 px-5 pt-5 pb-4 md:px-8">
      <div className="relative">
        <motion.div
          key={line}
          initial={alive ? { scale: 0.86, y: 12 } : false}
          animate={{ scale: 1, y: 0 }}
          transition={pop}
          className="relative z-10 max-w-xl origin-bottom-left rounded-[1.6rem] border-[3px] border-ink bg-surface px-4 py-3"
        >
          <p className="font-mono text-[0.62rem] tracking-[0.2em] text-muted uppercase">Teacher</p>
          <p className="mt-1 text-base leading-6 text-ink">{line}</p>
          <motion.span
            aria-hidden
            className="absolute -bottom-[10px] left-0 z-[-1] block size-5"
            initial={false}
            animate={{ x: tailX }}
            transition={pop}
          >
            <span className="block size-5 rotate-45 border-r-[3px] border-b-[3px] border-ink bg-surface" />
          </motion.span>
        </motion.div>
      </div>
      <div className="relative mt-3 h-56 overflow-hidden">
        <span aria-hidden className="absolute right-1 bottom-2 left-1 h-px bg-ink/15" />
        <Mascot x={studentX} mood={check} hopping={hopping} alive={alive}>
          <Student mood={check} alive={alive} />
        </Mascot>
        <Mascot x={teacherX} mood={check} hopping={hopping} alive={alive}>
          <Teacher mood={check} alive={alive} />
        </Mascot>
      </div>
    </div>
  );
}
