"use server";

import { revalidatePath } from "next/cache";
import { getSite } from "@/lib/content";
import { isOpenDay, isSlotTime } from "@/lib/appointment-slots";
import { addAppointment, listAppointments } from "@/lib/appointments";

export type BookingField = "name" | "email" | "practice" | "slot";

export type BookingState = {
  status: "idle" | "error" | "success";
  name?: string;
  when?: string;
  message?: string;
  fieldErrors?: Partial<Record<BookingField, string>>;
};

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function listTakenSlots() {
  const rows = await listAppointments();
  return rows
    .filter((item) => isOpenDay(item.date))
    .map((item) => ({ date: item.date, time: item.time }));
}

export async function bookAppointment(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const name = read(formData, "name");
  const email = read(formData, "email");
  const practice = read(formData, "practice");
  const organization = read(formData, "organization");
  const date = read(formData, "date");
  const time = read(formData, "time");
  const fieldErrors: Partial<Record<BookingField, string>> = {};
  const site = await getSite();
  const practiceValues = new Set<string>([
    ...site.practices.map((item) => item.href),
    "unsure",
  ]);

  if (name.length < 2) fieldErrors.name = "Add a name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Add a real address, so a reply has somewhere to go.";
  }
  if (!practiceValues.has(practice)) fieldErrors.practice = "Choose a product.";
  if (!isOpenDay(date) || !isSlotTime(time)) {
    fieldErrors.slot = "Choose an open day and a time.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }
  if (!isSlotTime(time)) {
    return { status: "error", fieldErrors: { slot: "Choose an open day and a time." } };
  }

  const saved = await addAppointment({
    date,
    time,
    name,
    email,
    organization,
    practice,
  });
  if (!saved.ok) {
    return { status: "error", message: saved.message, fieldErrors: { slot: saved.message } };
  }

  revalidatePath("/contact");
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  return { status: "success", name, when: `${date} ${time}` };
}
