import type { Metadata } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { MotionRoot } from "@/components/MotionRoot";
import { Navbar } from "@/components/Navbar";
import { pages, practices } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Epicxstudios",
    template: "%s · Epicxstudios",
  },
  description:
    "Epicxstudios builds a K12 curriculum platform for state and CBSE syllabi, a training LMS for higher study, and the applications and sites around them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        <MotionRoot>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="content" className="flex-1">
            {children}
          </main>
          <footer className="relative z-10 border-t border-ink/10 bg-paper px-5 py-10 md:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-display text-lg tracking-tight">
                  Epicxstudios
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-ink/65">
                  K12 curriculum platforms, training systems for higher study,
                  and the applications and sites around them.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <nav aria-label="Studio">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
                    {pages.map((page) => (
                      <li key={page.href}>
                        <Link href={page.href} className="hover:text-ink">
                          {page.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ol className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-[0.18em] text-ink/60 uppercase">
                  {practices.map((practice) => (
                    <li key={practice.href}>
                      <Link
                        href={practice.href}
                        className="inline-flex items-center gap-2 hover:text-ink"
                      >
                        <span className="text-amber">{practice.index}</span>
                        {practice.nav}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </footer>
        </MotionRoot>
      </body>
    </html>
  );
}
