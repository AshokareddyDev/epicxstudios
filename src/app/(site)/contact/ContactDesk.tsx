"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/app/(site)/contact/ContactForm";
import { AppointmentBook } from "@/components/AppointmentBook";
import { uiSpring } from "@/lib/motion";
import type { Practice } from "@/lib/site";

const modes = [
  { id: "brief", label: "Send a brief" },
  { id: "time", label: "Book a time" },
] as const;

export function ContactDesk({ practices }: { practices: readonly Practice[] }) {
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("brief");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="How to reach the studio">
        {modes.map((item) => {
          const active = mode === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={active}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={uiSpring}
              onClick={() => setMode(item.id)}
              className={`relative h-11 rounded-full px-4 font-mono text-[0.68rem] tracking-[0.16em] uppercase ${
                active ? "text-paper" : "border border-ivory/25 text-ink"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="contact-mode"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={uiSpring}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
      {mode === "brief" ? (
        <ContactForm practices={practices} />
      ) : (
        <AppointmentBook practices={practices} />
      )}
    </div>
  );
}
