import type { Metadata } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";
import { MotionRoot } from "@/components/MotionRoot";
import { NodeField } from "@/components/NodeField";
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
      <body className="flex min-h-full flex-col font-sans text-ink antialiased">
        <MotionRoot>
          <NodeField />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
            >
              Skip to content
            </a>
            {children}
          </div>
        </MotionRoot>
      </body>
    </html>
  );
}
