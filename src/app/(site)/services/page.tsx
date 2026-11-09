import type { Metadata } from "next";
import { ChapterRail } from "@/components/PracticePager";
import { PracticeList } from "@/components/PracticeList";
import { StudioMap } from "@/components/SolutionVisuals";
import { TiltPanel } from "@/components/TiltPanel";
import { Reveal } from "@/components/ui/Reveal";
import { getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: site.servicesPage.title,
    description: site.servicesPage.description,
  };
}

export default async function ServicesPage() {
  const site = await getSite();

  return (
    <article className="page-column overflow-x-clip px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <TiltPanel>
        <Reveal>
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            {site.servicesPage.eyebrow}
          </p>
          <h1 className="display-title mt-4 font-display">
            {site.servicesPage.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            {site.servicesPage.lede}
          </p>
        </Reveal>
      </TiltPanel>
      <StudioMap />
      <div className="mt-8">
        <ChapterRail practices={site.practices} />
      </div>
      <div className="mt-8 md:mt-10">
        <PracticeList items={site.practices} />
      </div>
    </article>
  );
}
