import type { ReactNode } from "react";

const tones = {
  paper: "text-ink",
  stage: "text-ivory",
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
      className={`glass rounded-[1.75rem] p-6 md:p-8 ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
