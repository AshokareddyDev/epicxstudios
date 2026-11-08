"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LearnCast } from "@/components/LearnCast";
import { Button } from "@/components/ui/Button";
import { revealSpring, uiSpring } from "@/lib/motion";

type Choice = {
  id: string;
  label: string;
  correct: boolean;
};

type Chapter = {
  id: string;
  index: string;
  title: string;
  subject: string;
  figure: string;
  prompt: string;
  choices: readonly Choice[];
  steps: readonly { index: string; title: string; body: string }[];
};

const chapters: readonly Chapter[] = [
  {
    id: "light",
    index: "05",
    title: "Light",
    subject: "Science",
    figure: "A prism dividing one beam into three rays.",
    prompt: "What does the prism do to the beam?",
    choices: [
      { id: "split", label: "It splits the beam.", correct: true },
      { id: "stop", label: "It stops the beam.", correct: false },
      { id: "store", label: "It stores the page.", correct: false },
    ],
    steps: [
      {
        index: "01",
        title: "Read",
        body: "The class opens the chapter on white light. The period starts on the page the syllabus already named.",
      },
      {
        index: "02",
        title: "Diagram",
        body: "A prism splits the beam. The same figure sits on the tablet, the laptop, and the phone.",
      },
      {
        index: "03",
        title: "Check",
        body: "One question asks what the prism did. The answer stays with this chapter.",
      },
      {
        index: "04",
        title: "Record",
        body: "The teacher sees who finished. The roster and the lesson stay in the same classroom.",
      },
    ],
  },
  {
    id: "cell",
    index: "08",
    title: "The plant cell",
    subject: "Science",
    figure: "A plant cell with the wall and the nucleus marked.",
    prompt: "Which part holds the genetic material?",
    choices: [
      { id: "nucleus", label: "The nucleus.", correct: true },
      { id: "wall", label: "The cell wall only.", correct: false },
      { id: "desk", label: "The desk it is drawn on.", correct: false },
    ],
    steps: [
      {
        index: "01",
        title: "Read",
        body: "The chapter names the wall, the membrane, and the nucleus. The class reads that page before the drawing.",
      },
      {
        index: "02",
        title: "Diagram",
        body: "The cell is labeled once. A laptop in the room and a tablet on the desk show the same labels.",
      },
      {
        index: "03",
        title: "Check",
        body: "The check asks for one part and what it does. It takes a minute at the end of the period.",
      },
      {
        index: "04",
        title: "Record",
        body: "Finished work stays on the class the teacher opened. The next section can reuse the same chapter.",
      },
    ],
  },
  {
    id: "lens",
    index: "10",
    title: "A convex lens",
    subject: "Science",
    figure: "Rays bending through a convex lens and meeting at the focus.",
    prompt: "Where do the rays meet after the lens?",
    choices: [
      { id: "focus", label: "At the focus.", correct: true },
      { id: "apart", label: "They spread and never meet.", correct: false },
      { id: "wall", label: "On the classroom wall only.", correct: false },
    ],
    steps: [
      {
        index: "01",
        title: "Read",
        body: "The page describes the lens and the rays. It is the same text a student can open beside a notebook.",
      },
      {
        index: "02",
        title: "Diagram",
        body: "Rays pass through the lens and meet. On a phone the figure is small. The labels are the ones from the chapter.",
      },
      {
        index: "03",
        title: "Check",
        body: "The question asks where the rays meet. A wrong answer can be tried again in the same lesson.",
      },
      {
        index: "04",
        title: "Record",
        body: "The teacher keeps who practiced. The chapter stays put when the screen changes.",
      },
    ],
  },
];

const stroke = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2.5,
};

function draw(delay: number) {
  return {
    strokeDasharray: 480,
    initial: { strokeDashoffset: 480 },
    animate: { strokeDashoffset: 0 },
    transition: { ...uiSpring, delay },
  };
}

function LightFigure() {
  return (
    <svg viewBox="0 0 360 200" className="h-52 w-full" role="img" aria-label={chapters[0].figure}>
      <motion.line x1="28" y1="100" x2="132" y2="100" className="stroke-amber" {...stroke} {...draw(0.05)} />
      <motion.polygon
        points="132,48 184,100 132,152"
        className="fill-amber/15 stroke-ink"
        {...stroke}
        {...draw(0.15)}
      />
      <motion.line x1="184" y1="100" x2="324" y2="54" className="stroke-amber" {...stroke} {...draw(0.32)} />
      <motion.line x1="184" y1="100" x2="332" y2="100" className="stroke-ion" {...stroke} {...draw(0.42)} />
      <motion.line x1="184" y1="100" x2="324" y2="146" className="stroke-ink" {...stroke} {...draw(0.52)} />
    </svg>
  );
}

function CellFigure() {
  return (
    <svg viewBox="0 0 360 220" className="h-52 w-full" role="img" aria-label={chapters[1].figure}>
      <motion.rect
        x="36"
        y="28"
        width="210"
        height="164"
        rx="72"
        className="fill-ion/10 stroke-ink"
        {...stroke}
        {...draw(0.05)}
      />
      <motion.rect
        x="58"
        y="48"
        width="166"
        height="124"
        rx="54"
        className="stroke-ion"
        {...stroke}
        {...draw(0.2)}
      />
      <motion.circle cx="146" cy="112" r="30" className="fill-amber/20 stroke-amber" {...stroke} {...draw(0.38)} />
      <motion.circle cx="146" cy="112" r="8" className="fill-ink stroke-ink" {...stroke} {...draw(0.5)} />
      <text x="262" y="78" className="fill-muted font-mono" fontSize="12">
        Wall
      </text>
      <text x="262" y="128" className="fill-ink font-mono" fontSize="12">
        Nucleus
      </text>
    </svg>
  );
}

function LensFigure() {
  return (
    <svg viewBox="0 0 360 200" className="h-52 w-full" role="img" aria-label={chapters[2].figure}>
      <line x1="168" y1="24" x2="168" y2="176" className="stroke-ink/15" strokeWidth="1.5" />
      <motion.path
        d="M168 36 C196 70 196 130 168 164 C140 130 140 70 168 36 Z"
        className="fill-ion/15 stroke-ink"
        {...stroke}
        {...draw(0.05)}
      />
      <motion.polyline points="24,68 168,68 308,100" className="stroke-amber" {...stroke} {...draw(0.28)} />
      <motion.polyline points="24,100 168,100 308,100" className="stroke-ion" {...stroke} {...draw(0.4)} />
      <motion.polyline points="24,132 168,132 308,100" className="stroke-ink" {...stroke} {...draw(0.52)} />
      <motion.circle
        cx="308"
        cy="100"
        r="5"
        className="fill-amber stroke-none"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...uiSpring, delay: 0.7 }}
      />
    </svg>
  );
}

function Figure({ chapterId }: { chapterId: string }) {
  if (chapterId === "cell") return <CellFigure />;
  if (chapterId === "lens") return <LensFigure />;
  return <LightFigure />;
}

function Marker() {
  return (
    <motion.span
      layoutId="lesson-marker"
      transition={uiSpring}
      aria-hidden
      className="pointer-events-none absolute -top-1 -right-1 z-20 grid size-6 place-items-center rounded-md bg-amber text-paper"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M3.2 1.6h9.6a.8.8 0 0 1 .8.8v12.2l-5.6-2.6-5.6 2.6V2.4a.8.8 0 0 1 .8-.8z"
        />
      </svg>
    </motion.span>
  );
}

function CheckMark() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={uiSpring}
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-full bg-ion text-ivory"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <path
          d="M3.2 8.3 6.4 11.4 12.8 4.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

const controlClass =
  "inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium tracking-wide transition-colors motion-reduce:transition-none";

export function LearnStudio() {
  const [chapterId, setChapterId] = useState(chapters[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [shakes, setShakes] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const pulse = mounted && reduce === false;

  useEffect(() => {
    setMounted(true);
  }, []);
  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const step = chapter.steps[stepIndex] ?? chapter.steps[0];
  const chosen = chapter.choices.find((choice) => choice.id === picked);
  const correct = Boolean(chosen?.correct);
  const onCheck = stepIndex === 2;
  const onRecord = stepIndex === 3;
  const note = onCheck
    ? correct
      ? "That matches the chapter."
      : picked
        ? "Not that one. Look at the figure again."
        : "Choose one answer."
    : "";

  function openChapter(id: string) {
    setChapterId(id);
    setStepIndex(0);
    setPicked(null);
    setShakes({});
  }

  function goTo(index: number) {
    setStepIndex(index);
    setPicked(null);
    setShakes({});
  }

  function choose(choice: Choice) {
    if (correct) return;
    setPicked(choice.id);
    if (!choice.correct) {
      setShakes((current) => ({
        ...current,
        [choice.id]: (current[choice.id] ?? 0) + 1,
      }));
    }
  }

  function continueLesson() {
    if (onCheck && !correct) return;
    if (onRecord) {
      goTo(0);
      return;
    }
    goTo(stepIndex + 1);
  }

  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <header className="max-w-2xl">
        <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
          K12 · State and CBSE
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
          The chapter, one moving step at a time.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink/75">
          A class opens the page it is already teaching. The figure draws, one
          check answers, and the period leaves a record on that classroom.
          This sample follows a CBSE science sequence.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.a
            href="#lesson"
            onClick={() => goTo(0)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={uiSpring}
            className={`${controlClass} bg-amber text-paper hover:bg-ivory hover:text-paper`}
          >
            Begin the lesson
          </motion.a>
          <Button href="/services/k12-education" variant="ghost">
            The K12 platform
          </Button>
        </div>
      </header>

      <section id="lesson" aria-labelledby="lesson-path" className="mt-16 scroll-mt-28 md:mt-24">
        <h2 id="lesson-path" className="font-display text-3xl tracking-tight md:text-5xl">
          Walk the example.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
          Pick a chapter. The book hops to the step you open, and the teacher
          bounces along to say what the class should notice.
        </p>

        <div className="mt-8 -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
          <div role="group" aria-label="Example chapters" className="flex w-max gap-3 md:w-auto">
            {chapters.map((item) => {
              const selected = item.id === chapter.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => openChapter(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={uiSpring}
                  className="relative grid h-24 w-40 shrink-0 place-items-center overflow-hidden rounded-[1.4rem] px-3 text-center"
                >
                  {selected ? (
                    <motion.span
                      layoutId="chapter-pill"
                      transition={uiSpring}
                      aria-hidden
                      className="absolute inset-0 rounded-[1.4rem] bg-ink"
                    />
                  ) : (
                    <span aria-hidden className="glass absolute inset-0 rounded-[1.4rem]" />
                  )}
                  <span className={`relative font-mono text-[0.62rem] tracking-[0.16em] uppercase ${selected ? "text-paper" : "text-muted"}`}>
                    {item.subject} {item.index}
                  </span>
                  <span className={`relative mt-1 font-display text-lg tracking-tight ${selected ? "text-paper" : "text-ink"}`}>
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="glass relative mt-10 overflow-hidden rounded-[2rem]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />
          </div>

          <div className="relative grid items-start gap-8 p-5 md:p-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.22em] text-ink/60 uppercase">
                {chapter.subject} {chapter.index}
              </p>
              <p className="mt-2 font-display text-2xl tracking-tight">{chapter.title}</p>
              <ol aria-label={`${chapter.title} steps`} className="relative mt-6 grid gap-4">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-7 bottom-7 left-7 z-0 -ml-px w-0.5 rounded-full bg-ink/10"
                />
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute top-7 bottom-7 left-7 z-[1] -ml-px w-0.5 origin-top rounded-full bg-ion"
                  initial={false}
                  animate={{ scaleY: stepIndex / (chapter.steps.length - 1) }}
                  transition={uiSpring}
                />
                {chapter.steps.map((item, index) => {
                  const selected = index === stepIndex;
                  const done = index < stepIndex;
                  return (
                    <li key={item.index}>
                      <motion.button
                        type="button"
                        aria-pressed={selected}
                        aria-label={`Step ${item.index}, ${item.title}`}
                        onClick={() => goTo(index)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        transition={uiSpring}
                        className="relative z-10 flex h-14 w-full items-center gap-3 text-left"
                      >
                        <span className="relative grid size-14 shrink-0 place-items-center">
                          <span
                            aria-hidden
                            className={`absolute inset-0 rounded-full border ${
                              done
                                ? "border-ion bg-ion"
                                : selected
                                  ? "border-ink bg-ink"
                                  : "border-ink/10 bg-paper"
                            }`}
                          />
                          {selected ? (
                            <motion.span
                              aria-hidden
                              className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber"
                              initial={false}
                              animate={pulse ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                              transition={
                                pulse
                                  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                                  : uiSpring
                              }
                            />
                          ) : null}
                          {selected ? <Marker /> : null}
                          <span
                            className={`relative font-display text-lg tracking-tight ${
                              done ? "text-paper" : selected ? "text-paper" : "text-ink"
                            }`}
                          >
                            {item.index}
                          </span>
                        </span>
                        <span
                          className={`font-display text-xl tracking-tight ${
                            selected ? "text-ink" : "text-ink/65"
                          }`}
                        >
                          {item.title}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="glass flex min-h-[28rem] flex-col rounded-[1.5rem] p-5 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[0.68rem] tracking-[0.2em] text-amber uppercase">
                  {step.index} / 04 · {step.title}
                </p>
                <p className="sr-only" aria-live="polite">
                  {chapter.title}, step {step.index}, {step.title}. {step.body}
                </p>
              </div>
              <div className="mt-4 flex gap-2" aria-hidden>
                {chapter.steps.map((item, index) => (
                  <span key={item.index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <motion.span
                      className={`block h-full w-full origin-left ${index === stepIndex ? "bg-amber" : "bg-ion"}`}
                      initial={false}
                      animate={{ scaleX: index <= stepIndex ? 1 : 0 }}
                      transition={uiSpring}
                    />
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${chapter.id}-${step.index}`}
                  initial={{ x: 28 }}
                  animate={{ x: 0 }}
                  exit={{ x: -28 }}
                  transition={uiSpring}
                  className="mt-6 flex flex-1 flex-col"
                >
                  <h3 className="relative inline-block font-display text-4xl tracking-tight">
                    {step.title}
                    <motion.span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-ion"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={revealSpring}
                    />
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-ink/75">{step.body}</p>

                  {stepIndex === 1 ? (
                    <div className="mt-6 rounded-[1.25rem] border border-ink/10 bg-surface px-3 py-4">
                      <Figure chapterId={chapter.id} />
                    </div>
                  ) : null}

                  {onCheck ? (
                    <div className="mt-6">
                      <div role="group" aria-labelledby="check-prompt" className="grid gap-3">
                        <p id="check-prompt" className="font-display text-2xl tracking-tight">
                          {chapter.prompt}
                        </p>
                        {chapter.choices.map((choice, index) => {
                          const isPicked = picked === choice.id;
                          const showRight = correct && choice.correct;
                          const showWrong = isPicked && !choice.correct;
                          return (
                            <motion.button
                              key={choice.id}
                              type="button"
                              aria-pressed={isPicked}
                              onClick={() => choose(choice)}
                              whileHover={correct ? undefined : { y: -2 }}
                              whileTap={correct ? undefined : { scale: 0.98 }}
                              transition={uiSpring}
                              className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left ${
                                showRight
                                  ? "border-ion bg-ion/10"
                                  : showWrong
                                    ? "border-amber bg-amber/10"
                                    : "border-ink/10 bg-surface hover:border-amber"
                              }`}
                            >
                              <motion.span
                                key={shakes[choice.id] ?? 0}
                                animate={
                                  showWrong
                                    ? { x: [0, -8, 8, -4, 0] }
                                    : { x: 0 }
                                }
                                transition={{ duration: 0.42 }}
                                className="flex w-full items-center gap-4"
                              >
                                <span className="font-mono text-[0.68rem] tracking-[0.16em] text-muted">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 text-base text-ink">{choice.label}</span>
                                {showRight ? <CheckMark /> : <span className="size-7 shrink-0" aria-hidden />}
                              </motion.span>
                            </motion.button>
                          );
                        })}
                      </div>
                      <p aria-live="polite" className="mt-4 min-h-6 font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
                        {note}
                      </p>
                    </div>
                  ) : null}

                  {onRecord ? (
                    <div className="mt-6">
                      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                        Example · Class 8A
                      </p>
                      <ul aria-hidden className="mt-4 grid max-w-xs grid-cols-4 gap-2">
                        {Array.from({ length: 16 }, (_, index) => (
                          <motion.li
                            key={index}
                            initial={{ scale: 0.86 }}
                            animate={{ scale: 1 }}
                            transition={{ ...uiSpring, delay: index * 0.035 }}
                            className={`aspect-square rounded-xl border ${
                              index < 9 ? "border-ion bg-ion" : "border-ink/10 bg-surface"
                            }`}
                          />
                        ))}
                      </ul>
                      <p className="mt-4 max-w-sm text-base leading-7 text-ink/75">
                        Desks that finished take a mark. The others are still in the chapter.
                      </p>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {stepIndex > 0 ? (
                  <motion.button
                    type="button"
                    onClick={() => goTo(stepIndex - 1)}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={uiSpring}
                    className="inline-flex h-12 items-center rounded-full px-3 text-sm font-medium text-ion"
                  >
                    Previous step
                  </motion.button>
                ) : null}
                <motion.button
                  type="button"
                  onClick={continueLesson}
                  disabled={onCheck && !correct}
                  whileHover={onCheck && !correct ? undefined : { scale: 1.03 }}
                  whileTap={onCheck && !correct ? undefined : { scale: 0.98 }}
                  transition={uiSpring}
                  className={`${controlClass} bg-amber text-paper hover:bg-ivory hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber disabled:hover:text-paper`}
                >
                  {onRecord ? "From the start" : onCheck && !correct ? "Answer to continue" : "Continue"}
                </motion.button>
              </div>
            </div>
          </div>
          <LearnCast
            chapterId={chapter.id}
            stepIndex={stepIndex}
            check={!onCheck ? "idle" : correct ? "right" : picked ? "wrong" : "idle"}
          />
        </div>
      </section>

      <section className="mt-20 max-w-2xl md:mt-28">
        <h2 className="font-display text-3xl tracking-tight md:text-5xl">
          Start from the syllabus the class already has.
        </h2>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          State boards and CBSE name the chapter. The platform follows it onto
          the screen in the room.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/services/k12-education">See the K12 platform</Button>
          <Button href="/contact" variant="ghost">
            Start a project
          </Button>
        </div>
      </section>
    </article>
  );
}
