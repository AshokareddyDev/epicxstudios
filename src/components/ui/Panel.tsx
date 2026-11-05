import type { ReactNode } from "react";

const tones = {
  paper:
    "border-ink/10 bg-white/70 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
  stage:
    "border-white/10 bg-white/[0.04] text-ivory shadow-[inset_0_1px_0_rgba(244,240,230,0.06)]",
} as const;

export function Panel({
  children,
  className = "",
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border p-6 backdrop-blur-md md:p-8 ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
