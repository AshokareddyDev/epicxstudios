"use client";

import { EmphasisRows } from "@/components/EmphasisRows";
import { SpringLinks } from "@/components/SpringLinks";
import { TiltPanel } from "@/components/TiltPanel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { practices } from "@/lib/site";

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

export function AboutStudio() {
  return (
    <article className="mx-auto w-full max-w-6xl overflow-x-clip px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <TiltPanel>
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
      </TiltPanel>

      <EmphasisRows
        className="mt-14 md:mt-20"
        label="Studio principles"
        layoutId="about-principle"
        rows={principles}
      />

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
        <div className="mt-8">
          <SpringLinks
            items={practices.map((practice) => ({
              href: practice.href,
              index: practice.index,
              title: practice.title,
              summary: practice.summary,
            }))}
          />
        </div>
      </Reveal>
    </article>
  );
}
