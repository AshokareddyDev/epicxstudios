import type { Metadata } from "next";
import { ChapterRail } from "@/components/PracticePager";
import { PracticeList } from "@/components/PracticeList";
import { StudioMap } from "@/components/SolutionVisuals";
import { Reveal } from "@/components/ui/Reveal";
import { practices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four Epicxstudios products: a K12 curriculum platform, a training LMS, custom applications, and education websites.",
};

export default function ServicesPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <Reveal>
        <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
          Services
        </p>
        <h1 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-6xl">
          The platform first. Then the program around it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
          K12 content for state and CBSE syllabi is the center. Training for
          higher study, engineering, nursing, and medicine sits with it.
          Custom applications and websites carry those platforms into a
          classroom and onto a public page.
        </p>
      </Reveal>
      <StudioMap />
      <div className="mt-8">
        <ChapterRail />
      </div>
      <div className="mt-8 md:mt-10">
        <PracticeList items={practices} />
      </div>
    </article>
  );
}
