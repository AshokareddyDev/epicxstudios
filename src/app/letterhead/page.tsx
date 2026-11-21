import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadLetterhead } from "@/components/DownloadLetterhead";

export const metadata: Metadata = {
  title: "Letterhead",
  robots: { index: false, follow: false },
};

export default function LetterheadPage() {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body {
            background: #f8f9fa !important;
            background-image: none !important;
          }
          canvas, .letterhead-chrome { display: none !important; }
          .letterhead-sheet {
            width: 210mm !important;
            max-width: none !important;
            min-height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
      <div className="px-5 py-8 md:px-8 md:py-10">
        <div className="letterhead-chrome mx-auto mb-6 flex w-full max-w-[210mm] items-center justify-between gap-4">
          <Link href="/" className="text-sm text-ivory/80 hover:text-ivory">
            Epicxstudios
          </Link>
          <DownloadLetterhead />
        </div>
        <article className="letterhead-sheet mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col bg-[#f8f9fa] text-[#0a192f] shadow-[0_24px_80px_rgba(3,10,22,0.45)]">
          <header className="bg-[#0a192f] px-[8mm] pt-[12mm] pb-[8mm] text-[#f8f9fa] sm:px-[16mm] sm:pt-[16mm] sm:pb-[12mm]">
            <Image
              src="/logo.png"
              alt="Epicxstudios"
              width={309}
              height={444}
              className="h-40 w-auto sm:h-48"
              priority
            />
            <p className="mt-4 font-mono text-[0.62rem] tracking-[0.28em] text-[#94a3b8] uppercase">
              Bengaluru
            </p>
            <div className="mt-6 h-px bg-[#00ffd5]" />
            <p className="mt-4 max-w-md text-sm leading-6 text-[#e2e8f0]">
              K12 curriculum platforms, training systems for higher study, and the
              applications and sites around them.
            </p>
          </header>
          <div className="flex-1" aria-hidden />
          <footer className="bg-[#0a192f] px-[8mm] py-[8mm] text-[#e2e8f0] sm:px-[16mm] sm:py-[10mm]">
            <div className="mb-4 h-px bg-[#00ffd5]" />
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-[#94a3b8] uppercase">
              K–12 · Training · Applications · Web
            </p>
            <p className="mt-3 font-display text-lg tracking-tight text-[#f8f9fa]">
              Epicxstudios
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
