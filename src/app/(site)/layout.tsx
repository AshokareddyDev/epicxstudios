import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.studio.name,
      template: `%s · ${site.studio.name}`,
    },
    description: site.studio.description,
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const site = await getSite();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar pages={site.pages} name={site.studio.name} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <footer className="relative z-10 px-5 py-10 md:px-8">
        <div aria-hidden className="quantum-rule mx-auto mb-10 max-w-6xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-lg tracking-tight">{site.studio.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ink/65">{site.studio.footer}</p>
          </div>
          <div className="flex flex-col gap-5">
            <nav aria-label="Studio">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
                {site.pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="hover:text-ink">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ol className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
              {site.practices.map((practice) => (
                <li key={practice.href}>
                  <Link
                    href={practice.href}
                    className="inline-flex items-center gap-2 hover:text-ink"
                  >
                    <span className="text-muted">{practice.index}</span>
                    {practice.nav}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </footer>
    </div>
  );
}
