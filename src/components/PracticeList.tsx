import Link from "next/link";
import type { Practice } from "@/lib/site";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PracticeList({ items }: { items: readonly Practice[] }) {
  return (
    <ul className="border-b border-ink/10">
      {items.map((practice) => (
        <li key={practice.href}>
          <Link
            href={practice.href}
            className="group grid grid-cols-[2.25rem_1fr_1.25rem] items-start gap-x-4 border-t border-ink/10 py-7 md:grid-cols-[3rem_1fr_1.5rem] md:py-9"
          >
            <span className="pt-2 font-mono text-[0.68rem] tracking-[0.18em] text-amber">
              {practice.index}
            </span>
            <span className="block">
              <span className="block font-display text-[1.7rem] leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none md:text-4xl">
                {practice.headline}
              </span>
              <span className="mt-3 block max-w-xl text-sm leading-6 text-ink/70 md:text-base">
                {practice.summary}
              </span>
            </span>
            <span className="mt-2 text-ink/50 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none">
              <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
