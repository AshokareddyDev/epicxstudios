"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitBrief, type ContactState } from "./actions";
import { Panel } from "@/components/ui/Panel";
import { uiSpring } from "@/lib/motion";
import type { Practice } from "@/lib/site";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-ivory/40 bg-ivory px-3.5 py-2 text-base text-paper";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
      {message}
    </p>
  );
}

export function ContactForm({ practices }: { practices: readonly Practice[] }) {
  const [state, formAction, pending] = useActionState(submitBrief, initialState);

  if (state.status === "success") {
    return (
      <Panel className="px-6 py-5 md:px-7 md:py-6">
        <p className="font-mono text-[0.68rem] tracking-[0.28em] text-muted uppercase">
          Brief
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-tight">
          Held with the studio{state.name ? `, ${state.name}` : ""}.
        </h2>
        <p className="mt-2 max-w-md text-base leading-6 text-ink/75">
          The brief is on the studio desk.
        </p>
      </Panel>
    );
  }

  const errors = state.fieldErrors;

  return (
    <form action={formAction} className="grid gap-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors?.name ? true : undefined}
          aria-describedby={errors?.name ? "name-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="name-error" message={errors?.name} />
      </div>
      <div>
        <label htmlFor="organization" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          autoComplete="organization"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors?.email ? true : undefined}
          aria-describedby={errors?.email ? "email-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="email-error" message={errors?.email} />
      </div>
      <div>
        <label htmlFor="practice" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Product
        </label>
        <select
          id="practice"
          name="practice"
          defaultValue=""
          required
          aria-invalid={errors?.practice ? true : undefined}
          aria-describedby={errors?.practice ? "practice-error" : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {practices.map((practice) => (
            <option key={practice.href} value={practice.href}>
              {practice.index} {practice.nav}
            </option>
          ))}
          <option value="unsure">Not sure yet</option>
        </select>
        <FieldError id="practice-error" message={errors?.practice} />
      </div>
      </div>
      <div>
        <label htmlFor="message" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Brief
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          aria-invalid={errors?.message ? true : undefined}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
        <FieldError id="message-error" message={errors?.message} />
      </div>
      {state.message ? (
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
          {state.message}
        </p>
      ) : null}
      <motion.button
        type="submit"
        disabled={pending}
        whileHover={{ scale: pending ? 1 : 1.03 }}
        whileTap={{ scale: pending ? 1 : 0.98 }}
        transition={uiSpring}
        className="inline-flex h-11 items-center justify-center rounded-full bg-amber px-5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-ivory hover:text-paper disabled:opacity-60 motion-reduce:transition-none"
      >
        {pending ? "Checking" : "Send the brief"}
      </motion.button>
    </form>
  );
}
