import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { practices } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Epicxstudios builds curriculum platforms for state and CBSE classrooms, and training systems for higher study.",
};

const principles = [
  {
    index: "01",
    title: "The syllabus is the spec.",
    body: "State boards and CBSE set the path. The platform follows the chapter, the period, and the exam the class is preparing for.",
  },
  {
    index: "02",
    title: "Teachers keep the room.",
    body: "A studio for their own material, a library where they create it, and classrooms they open themselves. The course can grow after it is installed.",
  },
  {
    index: "03",
    title: "One course, several screens.",
    body: "A phone, a PC, a tablet, and an AR/VR device open the same lesson. The room chooses the screen. The chapter stays put.",
  },
  {
    index: "04",
    title: "Training past the school.",
    body: "Higher education, engineering, nursing, and medical programs use the same discipline: a cohort, a curriculum, and a record of what was practiced.",
  },
] as const;

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <Reveal>
        <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
          About
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight md:text-6xl">
          A studio for the syllabus, and the systems that carry it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
          Epicxstudios builds the K12 platform first: state and CBSE content,
          classrooms, and a place for teachers to add their own work. The same
          studio builds training systems for higher education, engineering,
          nursing, and medical programs, then the applications and websites
          those programs need.
        </p>
      </Reveal>

      <ol className="mt-14 border-b border-ink/10 md:mt-20">
        {principles.map((principle, index) => (
          <li key={principle.index} className="border-t border-ink/10">
            <Reveal delay={0.05 * index}>
              <div className="grid gap-3 py-7 md:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.1fr)] md:gap-8 md:py-9">
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-amber">
                  {principle.index}
                </span>
                <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                  {principle.title}
                </h2>
                <p className="max-w-xl text-base leading-7 text-ink/75">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
              Products
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl tracking-tight">
              Four products, one classroom at the start.
            </h2>
          </div>
          <Button href="/contact">Start a project</Button>
        </div>
        <ul className="mt-8 border-b border-ink/10">
          {practices.map((practice) => (
            <li key={practice.href} className="border-t border-ink/10">
              <Link
                href={practice.href}
                className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[3rem_1fr]"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-amber">
                  {practice.index}
                </span>
                <span className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-amber motion-reduce:transition-none md:text-2xl">
                  {practice.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}
