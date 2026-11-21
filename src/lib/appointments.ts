import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isOpenDay, isSlotTime, type SlotTime } from "@/lib/appointment-slots";

export type Appointment = {
  id: string;
  at: string;
  date: string;
  time: SlotTime;
  name: string;
  organization: string;
  email: string;
  practice: string;
};

const filePath = path.join(process.cwd(), "data", "appointments.json");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseAppointment(value: unknown): Appointment | null {
  if (!isRecord(value)) return null;
  const fields = ["id", "at", "date", "time", "name", "organization", "email", "practice"] as const;
  const row: Record<string, string> = {};
  for (const field of fields) {
    const item = value[field];
    if (typeof item !== "string") return null;
    row[field] = item;
  }
  if (!isSlotTime(row.time)) return null;
  return {
    id: row.id,
    at: row.at,
    date: row.date,
    time: row.time,
    name: row.name,
    organization: row.organization,
    email: row.email,
    practice: row.practice,
  };
}

export async function listAppointments(): Promise<Appointment[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      const appointment = parseAppointment(item);
      return appointment ? [appointment] : [];
    });
  } catch {
    return [];
  }
}

export async function addAppointment(
  input: Omit<Appointment, "id" | "at">,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!isOpenDay(input.date) || !isSlotTime(input.time)) {
    return { ok: false, message: "Choose an open weekday and a listed time." };
  }
  const current = await listAppointments();
  const taken = current.some((item) => item.date === input.date && item.time === input.time);
  if (taken) {
    return { ok: false, message: "That time was just taken. Choose another." };
  }
  const next: Appointment = {
    id: randomUUID(),
    at: new Date().toISOString(),
    ...input,
  };
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify([next, ...current], null, 2)}\n`, "utf8");
  return { ok: true };
}

export async function deleteAppointment(id: string) {
  const current = await listAppointments();
  const next = current.filter((item) => item.id !== id);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}
