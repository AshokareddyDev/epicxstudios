"use client";

import { useEffect, useRef } from "react";

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

export function NodeField() {
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
      context.strokeStyle = "#e2e8f0";
      context.fillStyle = "#e2e8f0";

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
    <div aria-hidden className="pointer-events-none">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      <div className="pointer-events-none fixed -top-24 -left-16 z-0 h-[460px] w-[460px] rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none fixed right-[-6%] bottom-[8%] z-0 h-[420px] w-[420px] rounded-full bg-ion/30 blur-3xl" />
    </div>
  );
}
