import type { Metadata } from "next";
import { ContactForm } from "@/app/(site)/contact/ContactForm";
import { TiltPanel } from "@/components/TiltPanel";
import { Reveal } from "@/components/ui/Reveal";
import { getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: site.contactPage.title,
    description: site.contactPage.description,
  };
}

export default async function ContactPage() {
  const site = await getSite();

  return (
    <article className="page-column overflow-x-clip px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <header className="lg:sticky lg:top-32">
          <TiltPanel>
            <Reveal>
              <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
                {site.contactPage.eyebrow}
              </p>
              <h1 className="display-title mt-4 font-display">
                {site.contactPage.headline}
              </h1>
              <p className="mt-5 max-w-md text-lg leading-8 text-ink/70">
                {site.contactPage.lede}
              </p>
            </Reveal>
          </TiltPanel>
        </header>
        <Reveal delay={0.08}>
          <ContactForm practices={site.practices} />
        </Reveal>
      </div>
    </article>
  );
}
