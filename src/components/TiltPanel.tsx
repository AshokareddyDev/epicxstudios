"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

const TILT_SPRING = { stiffness: 100, damping: 15 };

export function TiltPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const allowTilt = mounted && reduced === false;

  useEffect(() => {
    setMounted(true);
  }, []);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  useEffect(() => {
    if (!allowTilt) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [allowTilt, pointerX, pointerY]);

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        style={
          allowTilt
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className={`glass rounded-[28px] px-6 py-8 md:px-10 md:py-12 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
