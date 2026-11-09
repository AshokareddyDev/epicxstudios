import { EmphasisRows } from "@/components/EmphasisRows";
import { ChapterRail, PracticePager } from "@/components/PracticePager";
import { SolutionFigure } from "@/components/SolutionVisuals";
import { TiltPanel } from "@/components/TiltPanel";
import { Panel } from "@/components/ui/Panel";
import { Reveal } from "@/components/ui/Reveal";
import type { Practice } from "@/lib/site";

export function ServicePage({
  practice,
  practices,
}: {
  practice: Practice;
  practices: readonly Practice[];
}) {
  return (
    <article className="page-column relative overflow-x-clip px-5 pt-28 pb-16 md:px-8 md:pt-32">
      <div className="sticky top-24 z-20 -mx-5 mb-8 bg-paper/90 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8 lg:static lg:mx-0 lg:mb-10 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <ChapterRail practices={practices} currentHref={practice.href} />
      </div>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-32">
          <TiltPanel>
            <Reveal>
              <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
                {practice.index} — {practice.nav}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display-title mt-5 font-display">
                {practice.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 md:text-lg md:leading-8">
                {practice.lede}
              </p>
            </Reveal>
          </TiltPanel>
        </header>

        <Reveal delay={0.16}>
          <Panel>
            <ol className="divide-y divide-ink/10">
              {practice.points.map((point, index) => (
                <li
                  key={point}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 first:pt-0 last:pb-0 md:gap-8"
                >
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                    0{index + 1}
                  </span>
                  <p className="text-base leading-7 text-ink md:text-lg">{point}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-20">
        <SolutionFigure href={practice.href} />
      </div>

      <section className="mt-20 md:mt-28">
        <Reveal>
          <h2 className="section-title font-display">
            {practice.detailTitle}
          </h2>
        </Reveal>
        <EmphasisRows
          className="mt-10"
          label={practice.detailTitle}
          layoutId="service-detail"
          titleLevel="h3"
          rows={practice.details}
        />
      </section>

      <PracticePager href={practice.href} practices={practices} />
    </article>
  );
}
