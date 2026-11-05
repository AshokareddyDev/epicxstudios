"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { animate, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";

export const slideSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

const GAP = 16;
const STEP_MS = 4200;

type SlideRowOptions = {
  align?: "start" | "center";
  /** Place a clone of the last card before the first, so a centered card always has a neighbor. */
  flank?: boolean;
};

export function useSlideRow(count: number, options?: SlideRowOptions) {
  const align = options?.align ?? "start";
  const flank = options?.flank ?? false;
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const primed = useRef(false);
  const flight = useRef<{ stop: () => void } | null>(null);
  const hold = useRef({ over: false, drag: false, focus: false });
  const x = useMotionValue(0);
  const [cursor, setCursor] = useState(0);
  const [metrics, setMetrics] = useState({ stride: 0, origin: 0 });
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [instant, setInstant] = useState(false);
  const { stride, origin } = metrics;
  const lead = !reduce && flank ? 1 : 0;
  const logical = ((cursor % count) + count) % count;
  const activeSlot = cursor + lead;
  const metricsRef = useRef({ stride, origin, lead, count });
  metricsRef.current = { stride, origin, lead, count };

  const syncHold = () => {
    setHeld(hold.current.over || hold.current.drag || hold.current.focus);
  };

  const advance = useCallback(() => {
    setCursor((current) => {
      if (current < 0) return 0;
      if (current >= count) return 1;
      if (current === count - 1) return count;
      return current + 1;
    });
  }, [count]);

  const retreat = useCallback(() => {
    setCursor((current) => {
      if (current <= 0) return flank && !reduce ? -1 : count - 1;
      return current - 1;
    });
  }, [count, flank, reduce]);

  useEffect(() => {
    if (!instant) return;
    const id = window.requestAnimationFrame(() => setInstant(false));
    return () => window.cancelAnimationFrame(id);
  }, [instant]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const measure = () => {
      const cards = node.querySelectorAll<HTMLElement>("[data-scene]");
      const card = cards[0];
      if (!card) return;
      const style = window.getComputedStyle(node);
      const padX =
        Number.parseFloat(style.paddingLeft) +
        Number.parseFloat(style.paddingRight);
      const inner = node.clientWidth - padX;
      const width = card.offsetWidth;
      const gap =
        cards.length > 1
          ? cards[1].offsetLeft - card.offsetLeft - width
          : GAP;
      const nextStride = width + gap;
      const nextOrigin =
        align === "center" ? Math.max(0, (inner - width) / 2) : 0;
      setMetrics((current) =>
        Math.abs(current.stride - nextStride) < 0.5 &&
        Math.abs(current.origin - nextOrigin) < 0.5
          ? current
          : { stride: nextStride, origin: nextOrigin },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [align, reduce]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !stride) return;
    const target = origin - (cursor + lead) * stride;
    if (!primed.current) {
      primed.current = true;
      x.set(target);
      return;
    }
    if (dragging.current || Math.abs(x.get() - target) < 1) return;
    let cancelled = false;
    const controls = animate(x, target, {
      ...slideSpring,
      onComplete: () => {
        if (cancelled || dragging.current) return;
        if (cursor === count) {
          setInstant(true);
          x.set(origin - lead * stride);
          setCursor(0);
          return;
        }
        if (cursor === -1) {
          setInstant(true);
          x.set(origin - (count - 1 + lead) * stride);
          setCursor(count - 1);
        }
      },
    });
    flight.current = controls;
    return () => {
      cancelled = true;
      controls.stop();
      if (flight.current === controls) flight.current = null;
    };
  }, [count, cursor, lead, origin, reduce, stride, x]);

  useEffect(() => {
    if (reduce || held || !inView) return;
    const id = window.setInterval(advance, STEP_MS);
    return () => window.clearInterval(id);
  }, [advance, held, inView, reduce]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") advance();
    else if (event.key === "ArrowLeft") retreat();
    else if (event.key === "Home") setCursor(0);
    else if (event.key === "End") setCursor(count - 1);
    else return;
    event.preventDefault();
  };

  const releaseDrag = (velocity: number) => {
    dragging.current = false;
    hold.current.drag = false;
    syncHold();
    const step = metricsRef.current.stride;
    const start = metricsRef.current.origin;
    const pad = metricsRef.current.lead;
    const total = metricsRef.current.count;
    if (!step) return;
    const projected = x.get() + velocity * 0.18;
    const slot = Math.round((start - projected) / step);
    const next = slot - pad;
    const clamped = Math.max(pad > 0 ? -1 : 0, Math.min(total, next));
    if (clamped === cursor) {
      const { stride: stepSize, origin: start, lead: pad } = metricsRef.current;
      void animate(x, start - (cursor + pad) * stepSize, slideSpring);
      return;
    }
    setCursor(clamped);
  };

  const onDragEnd = (
    _event: globalThis.PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    releaseDrag(info.velocity.x);
  };

  return {
    reduce,
    cursor,
    logical,
    lead,
    activeSlot,
    instant,
    held,
    inView,
    rootRef,
    viewportRef,
    advance,
    retreat,
    onKeyDown,
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      hold.current.over = true;
      syncHold();
    },
    onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      hold.current.over = false;
      syncHold();
    },
    onFocus: () => {
      hold.current.focus = true;
      syncHold();
    },
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      hold.current.focus = false;
      syncHold();
    },
    track: {
      drag: reduce ? (false as const) : ("x" as const),
      dragConstraints: {
        left: origin - (count + lead) * (stride || 1),
        right: origin,
      },
      dragElastic: 0.08,
      dragMomentum: false as const,
      style: { x: reduce ? undefined : x, touchAction: "pan-y" as const },
      onDragStart: () => {
        flight.current?.stop();
        dragging.current = true;
        hold.current.drag = true;
        syncHold();
      },
      onDragEnd,
    },
  };
}
