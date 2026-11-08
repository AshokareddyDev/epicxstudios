"use client";

import { motion } from "framer-motion";
import { EmphasisRows } from "@/components/EmphasisRows";
import { SpringLinks } from "@/components/SpringLinks";
import { TiltPanel } from "@/components/TiltPanel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { uiSpring } from "@/lib/motion";
import type { AboutCopy, Practice } from "@/lib/site";

export function AboutStudio({
  about,
  practices,
}: {
  about: AboutCopy;
  practices: readonly Practice[];
}) {
  return (
    <article className="mx-auto w-full max-w-6xl overflow-x-clip px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <TiltPanel>
        <Reveal>
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            {about.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight md:text-6xl">
            {about.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">{about.lede}</p>
        </Reveal>
      </TiltPanel>

      <EmphasisRows
        className="mt-14 md:mt-20"
        label="Studio principles"
        layoutId="about-principle"
        rows={about.principles}
      />

      <section id="team" aria-labelledby="studio-team" className="mt-16 scroll-mt-32 md:mt-24">
        <Reveal>
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            {about.teamEyebrow}
          </p>
          <h2 id="studio-team" className="mt-4 max-w-xl font-display text-3xl tracking-tight md:text-5xl">
            {about.teamTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/75 md:text-lg md:leading-8">
            {about.teamLede}
          </p>
        </Reveal>
        <ol className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {about.members.map((member, index) => (
            <li key={member.index} className="min-w-0">
              <Reveal delay={0.05 * index}>
                <motion.article
                  aria-labelledby={`about-member-${member.index}`}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  transition={uiSpring}
                  className="glass relative flex h-full min-h-40 flex-col overflow-hidden rounded-[1.4rem] p-4 md:min-h-48 md:p-5"
                >
                  <motion.span
                    aria-hidden
                    variants={{ rest: { scaleX: 0.28 }, hover: { scaleX: 1 } }}
                    transition={uiSpring}
                    className="pointer-events-none absolute inset-x-4 top-0 h-px origin-left bg-amber md:inset-x-5"
                  />
                  <p className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                    {member.index}
                  </p>
                  <h3
                    id={`about-member-${member.index}`}
                    className="mt-auto pt-8 font-display text-xl tracking-tight md:text-2xl"
                  >
                    {member.role}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/75">{member.place}</p>
                </motion.article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Reveal delay={0.2}>
        <div className="mt-16 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
              {about.productsEyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl tracking-tight">
              {about.productsTitle}
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
