import type { Metadata } from "next";
import { ContactForm } from "@/app/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Epicxstudios. Name the syllabus, the device, and who teaches.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <header className="lg:sticky lg:top-32">
          <Reveal>
            <p className="font-mono text-[0.72rem] tracking-[0.32em] text-amber uppercase">
              Contact
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl tracking-tight md:text-6xl">
              Tell us the syllabus, the cohort, and the device.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-ink/70">
              A short brief is enough. Which board or program, who teaches,
              and where the lesson has to run.
            </p>
          </Reveal>
        </header>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </article>
  );
}
