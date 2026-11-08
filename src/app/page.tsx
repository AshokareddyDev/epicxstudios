"use client";

import { useEffect, useRef } from "react";
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
import { pages } from "@/lib/site";

const STRUCTURAL_SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

const TILT_SPRING = { stiffness: 100, damping: 15 };

const NODE_COUNT = 40;
const MAX_DPR = 2;

type FieldNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  radius: number;
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: STRUCTURAL_SPRING },
};

function createField(width: number, height: number): FieldNode[] {
  const field: FieldNode[] = [];

  for (let index = 0; index < NODE_COUNT; index += 1) {
    field.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      phase: index * 0.67,
      radius: 0.8 + (index % 5) * 0.18,
    });
  }

  return field;
}

function NodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let nodes: FieldNode[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    const fit = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        nodes = createField(nextWidth, nextHeight);
      } else if (width > 0 && height > 0) {
        const scaleX = nextWidth / width;
        const scaleY = nextHeight / height;
        for (const node of nodes) {
          node.x *= scaleX;
          node.y *= scaleY;
        }
      }

      width = nextWidth;
      height = nextHeight;
    };

    const draw = (time: number) => {
      if (width === 0 || height === 0 || nodes.length === 0) return;

      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(168, Math.max(108, width * 0.16));

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        node.vx =
          node.vx * 0.992 + Math.sin(time * 0.0004 + node.phase) * 0.018;
        node.vy =
          node.vy * 0.992 +
          Math.cos(time * 0.00033 + node.phase * 1.4) * 0.018;

        const speed = Math.hypot(node.vx, node.vy);
        const maxSpeed = 0.52;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
        node.x = Math.min(width, Math.max(0, node.x));
        node.y = Math.min(height, Math.max(0, node.y));
      }

      context.lineWidth = 1;
      context.strokeStyle = "#16181d";
      context.fillStyle = "#16181d";

      for (let i = 0; i < nodes.length; i += 1) {
        const origin = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(origin.x - other.x, origin.y - other.y);
          if (distance >= linkDistance) continue;

          context.globalAlpha = (1 - distance / linkDistance) * 0.22;
          context.beginPath();
          context.moveTo(origin.x, origin.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        context.globalAlpha = 0.12;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 3.4, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 0.55;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      if (running) frame = window.requestAnimationFrame(loop);
    };

    fit();
    const observer = new ResizeObserver(() => {
      fit();
      if (reduced) draw(0);
    });
    observer.observe(canvas);

    if (reduced) {
      draw(0);
    } else if (document.hidden) {
      running = false;
    } else {
      frame = window.requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(frame);
        return;
      }
      if (reduced || running) return;
      running = true;
      frame = window.requestAnimationFrame(loop);
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}


export default function HomePage() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["16%", "84%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "58%"]);
  const glare = useMotionTemplate`radial-gradient(540px circle at ${glareX} ${glareY}, rgba(248,243,230,0.16), transparent 58%)`;

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
      <NodeField />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-24 -left-16 z-0 h-[460px] w-[460px] rounded-full bg-amber/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed right-[-6%] bottom-[8%] z-0 h-[420px] w-[420px] rounded-full bg-ion/30 blur-3xl"
      />

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
            className="relative w-full rounded-[32px] border border-white/[0.08] bg-stage/85 text-ivory shadow-[0_30px_80px_rgba(22,24,29,0.16)] backdrop-blur-[24px]"
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
                  className="font-mono text-[0.68rem] tracking-[0.32em] text-ivory/45 uppercase"
                >
                  Core products
                </motion.p>
                <motion.h1
                  id="studio-title"
                  variants={reveal}
                  className="mt-4 max-w-xl font-display text-[clamp(2.15rem,4.4vw,3.35rem)] leading-[1.02] tracking-[-0.045em] text-ivory"
                >
                  Platforms for the syllabus, and the training that follows.
                </motion.h1>
                <motion.p
                  variants={reveal}
                  className="mt-5 max-w-md text-base leading-7 text-ivory/70"
                >
                  Epicxstudios builds a K12 platform for state and CBSE
                  curricula, a training LMS for higher study and clinical
                  programs, and the applications and sites those programs run
                  on.
                </motion.p>
              </div>
              <motion.div variants={reveal} className="min-w-0">
                <PracticeStrip />
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
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
            The system
          </p>
          <h2
            id="studio-flow"
            className="mt-4 max-w-xl font-display text-3xl tracking-tight md:text-5xl"
          >
            From the board, through the classroom, onto the screen.
          </h2>
          <StudioMap />
        </div>
      </section>

      <section
        aria-labelledby="studio-gallery"
        className="relative z-10 overflow-x-clip pt-16 pb-8 md:pt-20 md:pb-10"
      >
        <ViewingRow />
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
            Services, the studio, and a way to start.
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
