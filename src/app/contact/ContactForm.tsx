"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitBrief, type ContactState } from "@/app/contact/actions";
import { Panel } from "@/components/ui/Panel";
import { uiSpring } from "@/lib/motion";
import { practices } from "@/lib/site";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-ink/15 bg-white/70 px-4 py-3 text-base text-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitBrief, initialState);

  if (state.status === "success") {
    return (
      <Panel>
        <p className="font-mono text-[0.68rem] tracking-[0.28em] text-amber uppercase">
          Brief
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tight">
          Held on this page{state.name ? `, ${state.name}` : ""}.
        </h2>
        <p className="mt-4 max-w-md text-base leading-7 text-ink/75">
          The form checked the brief. A mailbox is not connected on this site
          yet, so nothing was sent. Keep a copy until that is in place.
        </p>
      </Panel>
    );
  }

  const errors = state.fieldErrors;

  return (
    <form action={formAction} className="grid gap-5" noValidate>
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
      <div>
        <label htmlFor="message" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Brief
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={errors?.message ? true : undefined}
          aria-describedby={errors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
        <FieldError id="message-error" message={errors?.message} />
      </div>
      <motion.button
        type="submit"
        disabled={pending}
        whileHover={{ scale: pending ? 1 : 1.03 }}
        whileTap={{ scale: pending ? 1 : 0.98 }}
        transition={uiSpring}
        className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-amber hover:text-ink disabled:opacity-60 motion-reduce:transition-none"
      >
        {pending ? "Checking" : "Send the brief"}
      </motion.button>
    </form>
  );
}
