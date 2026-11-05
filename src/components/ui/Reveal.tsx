"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealSpring } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ y: 18 }}
      animate={{ y: 0 }}
      transition={{ ...revealSpring, delay }}
    >
      {children}
    </motion.div>
  );
}
