"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { uiSpring } from "@/lib/motion";

const MotionLink = motion.create(Link);

const variants = {
  solid: "bg-amber text-paper hover:bg-ivory hover:text-paper",
  ghost: "border border-ink/15 text-ink hover:border-amber",
} as const;

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={uiSpring}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium tracking-wide transition-colors motion-reduce:transition-none ${variants[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
