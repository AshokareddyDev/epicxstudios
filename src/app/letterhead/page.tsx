import type { Metadata } from "next";
import Link from "next/link";
import { DownloadLetterhead } from "@/components/DownloadLetterhead";

export const metadata: Metadata = {
  title: "Letterhead",
  robots: { index: false, follow: false },
};

function Logo() {
  return (
    <svg viewBox="-28 -30 56 62" className="h-16 w-14 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="letterhead-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#00ffd5" />
        </linearGradient>
      </defs>
      <polygon
        points="0,-22.5 20,-10 20,12.5 0,25 -20,12.5 -20,-10"
        fill="none"
        stroke="url(#letterhead-teal)"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <polygon
        points="0,-22.5 20,-10 0,2.5 -20,-10"
        fill="url(#letterhead-teal)"
        fillOpacity="0.2"
        stroke="url(#letterhead-teal)"
        strokeWidth="1.15"
      />
      <polygon
        points="-20,-10 0,2.5 0,25 -20,12.5"
        fill="url(#letterhead-teal)"
        fillOpacity="0.1"
        stroke="url(#letterhead-teal)"
        strokeWidth="1.15"
      />
      <polygon
        points="20,-10 0,2.5 0,25 20,12.5"
        fill="url(#letterhead-teal)"
        fillOpacity="0.28"
        stroke="url(#letterhead-teal)"
        strokeWidth="1.15"
      />
      <path
        d="M-12.5,-6.25 L12.5,6.25 M12.5,-6.25 L-12.5,6.25"
        stroke="url(#letterhead-teal)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M-12.5,-6.25 L12.5,6.25 M12.5,-6.25 L-12.5,6.25"
        stroke="#f8f9fa"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="0" cy="2.5" r="2.15" fill="#f8f9fa" />
      <circle cx="-12.5" cy="-6.25" r="1.7" fill="#00ffd5" />
      <circle cx="12.5" cy="-6.25" r="1.7" fill="#14b8a6" />
      <circle cx="-12.5" cy="6.25" r="1.7" fill="#14b8a6" />
      <circle cx="12.5" cy="6.25" r="1.7" fill="#00ffd5" />
    </svg>
  );
}

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
            <div className="flex items-center gap-4">
              <Logo />
              <div>
                <p className="font-display text-[1.7rem] leading-none tracking-tight sm:text-4xl">
                  Epicxstudios
                </p>
                <p className="mt-2 font-mono text-[0.62rem] tracking-[0.28em] text-[#94a3b8] uppercase">
                  Bengaluru
                </p>
              </div>
            </div>
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
