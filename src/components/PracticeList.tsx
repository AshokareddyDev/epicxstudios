"use client";

import { SpringLinks } from "@/components/SpringLinks";
import type { Practice } from "@/lib/site";

export function PracticeList({ items }: { items: readonly Practice[] }) {
  return (
    <SpringLinks
      scale="display"
      items={items.map((practice) => ({
        href: practice.href,
        index: practice.index,
        title: practice.headline,
        summary: practice.summary,
      }))}
    />
  );
}
