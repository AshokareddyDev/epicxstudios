"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  bookAppointment,
  listTakenSlots,
  type BookingState,
} from "@/app/(site)/contact/appointment-actions";
import { Panel } from "@/components/ui/Panel";
import {
  SLOT_TIMES,
  WEEK_LABELS,
  isOpenDay,
  kolkataToday,
  longDate,
  monthLabel,
} from "@/lib/appointment-slots";
import { uiSpring } from "@/lib/motion";
import type { Practice } from "@/lib/site";

const initialState: BookingState = { status: "idle" };

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

function monthCells(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const start = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Array<{ iso: string; day: number } | null> = Array.from({ length: start }, () => null);
  for (let day = 1; day <= days; day += 1) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({ iso, day });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function AppointmentBook({ practices }: { practices: readonly Practice[] }) {
  const [state, formAction, pending] = useActionState(bookAppointment, initialState);
  const [today, setToday] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ year: number; month: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [taken, setTaken] = useState<Array<{ date: string; time: string }>>([]);

  useEffect(() => {
    const current = kolkataToday();
    const [year, month] = current.split("-").map(Number);
    setToday(current);
    setCursor((existing) => existing ?? { year, month: month - 1 });
    void listTakenSlots().then(setTaken);
  }, [state.status]);

  const cells = useMemo(
    () => (cursor ? monthCells(cursor.year, cursor.month) : []),
    [cursor],
  );

  if (state.status === "success") {
    return (
      <Panel className="px-6 py-5 md:px-7 md:py-6">
        <p className="font-mono text-[0.68rem] tracking-[0.28em] text-muted uppercase">
          Appointment
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-tight">
          Held{state.name ? ` for ${state.name}` : ""}.
        </h2>
        <p className="mt-2 max-w-md text-base leading-6 text-ink/75">
          {state.when
            ? `${longDate(state.when.slice(0, 10))} at ${state.when.slice(11)}, Bengaluru time.`
            : "The time is on the studio desk."}
        </p>
      </Panel>
    );
  }

  const errors = state.fieldErrors;
  const takenOnDay = new Set(
    taken.filter((item) => item.date === selected).map((item) => item.time),
  );

  return (
    <form action={formAction} className="grid gap-3 lg:grid-cols-2 lg:items-start" noValidate>
      <div className="grid content-start gap-3">
      <div>
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Day
        </p>
        <div className="glass mt-1.5 rounded-[1.25rem] p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-3">
            <motion.button
              type="button"
              aria-label="Previous month"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={uiSpring}
              onClick={() =>
                setCursor((current) => {
                  if (!current) return current;
                  const month = current.month - 1;
                  return month < 0
                    ? { year: current.year - 1, month: 11 }
                    : { year: current.year, month };
                })
              }
              className="grid size-9 place-items-center rounded-full border border-ivory/20 text-ink"
            >
              ←
            </motion.button>
            <p className="font-display text-lg tracking-tight">
              {cursor ? monthLabel(cursor.year, cursor.month) : "Calendar"}
            </p>
            <motion.button
              type="button"
              aria-label="Next month"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={uiSpring}
              onClick={() =>
                setCursor((current) => {
                  if (!current) return current;
                  const month = current.month + 1;
                  return month > 11
                    ? { year: current.year + 1, month: 0 }
                    : { year: current.year, month };
                })
              }
              className="grid size-9 place-items-center rounded-full border border-ivory/20 text-ink"
            >
              →
            </motion.button>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-0.5 text-center">
            {WEEK_LABELS.map((label) => (
              <p key={label} className="font-mono text-[0.58rem] tracking-[0.12em] text-muted uppercase">
                {label}
              </p>
            ))}
            {cells.map((cell, index) => {
              if (!cell || !today) {
                return <span key={`empty-${index}`} className="h-8" />;
              }
              const open = isOpenDay(cell.iso, today);
              const active = selected === cell.iso;
              return (
                <motion.button
                  key={cell.iso}
                  type="button"
                  disabled={!open}
                  aria-pressed={active}
                  aria-label={longDate(cell.iso)}
                  whileHover={open ? { y: -1 } : undefined}
                  whileTap={open ? { scale: 0.98 } : undefined}
                  transition={uiSpring}
                  onClick={() => {
                    setSelected(cell.iso);
                    setTime(null);
                  }}
                  className={`h-8 rounded-lg font-display text-sm ${
                    active
                      ? "bg-amber text-paper"
                      : open
                        ? "text-ink hover:border hover:border-amber"
                        : "text-ink/30"
                  } ${cell.iso === today && !active ? "border border-amber/70" : ""}`}
                >
                  {cell.day}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Time · Bengaluru
        </p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5 sm:grid-cols-5" role="group" aria-label="Available times">
          {SLOT_TIMES.map((slot) => {
            const closed = !selected || takenOnDay.has(slot);
            const active = time === slot;
            return (
              <motion.button
                key={slot}
                type="button"
                disabled={closed}
                aria-pressed={active}
                whileHover={closed ? undefined : { y: -1 }}
                whileTap={closed ? undefined : { scale: 0.98 }}
                transition={uiSpring}
                onClick={() => setTime(slot)}
                className={`h-9 rounded-full font-mono text-[0.68rem] tracking-[0.12em] ${
                  active
                    ? "bg-amber text-paper"
                    : closed
                      ? "border border-ivory/15 text-ink/30"
                      : "border border-ivory/30 text-ink hover:border-amber"
                }`}
              >
                {slot}
              </motion.button>
            );
          })}
        </div>
        <p className="mt-1.5 text-sm leading-5 text-ink/70">
          {selected
            ? `${longDate(selected)}. Weekdays only, for the next four weeks.`
            : "Pick a weekday. Weekends stay closed."}
        </p>
        <FieldError id="slot-error" message={errors?.slot} />
      </div>
      </div>

      <div className="grid content-start gap-3">
      <input type="hidden" name="date" value={selected ?? ""} />
      <input type="hidden" name="time" value={time ?? ""} />

      <div className="grid gap-3">
      <div>
        <label htmlFor="visit-name" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Name
        </label>
        <input id="visit-name" name="name" autoComplete="name" required className={fieldClass} />
        <FieldError id="visit-name-error" message={errors?.name} />
      </div>
      <div>
        <label htmlFor="visit-organization" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Organization
        </label>
        <input id="visit-organization" name="organization" autoComplete="organization" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="visit-email" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Email
        </label>
        <input id="visit-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        <FieldError id="visit-email-error" message={errors?.email} />
      </div>
      <div>
        <label htmlFor="visit-practice" className="font-mono text-[0.68rem] tracking-[0.18em] text-ink/55 uppercase">
          Product
        </label>
        <select id="visit-practice" name="practice" defaultValue="" required className={fieldClass}>
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
        <FieldError id="visit-practice-error" message={errors?.practice} />
      </div>
      </div>
      {state.message ? (
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-amber uppercase">{state.message}</p>
      ) : null}
      <motion.button
        type="submit"
        disabled={pending || !selected || !time}
        whileHover={{ scale: pending ? 1 : 1.03 }}
        whileTap={{ scale: pending ? 1 : 0.98 }}
        transition={uiSpring}
        className="inline-flex h-11 items-center justify-center rounded-full bg-amber px-5 text-sm font-medium tracking-wide text-paper hover:bg-ivory hover:text-paper disabled:opacity-60"
      >
        {pending ? "Holding" : "Book this time"}
      </motion.button>
      </div>
    </form>
  );
}
