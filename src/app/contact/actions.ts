"use server";

import { practices } from "@/lib/site";

export type ContactField = "name" | "email" | "practice" | "message";

export type ContactState = {
  status: "idle" | "error" | "success";
  name?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

const practiceValues = new Set<string>([
  ...practices.map((practice) => practice.href),
  "unsure",
]);

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitBrief(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = read(formData, "name");
  const email = read(formData, "email");
  const practice = read(formData, "practice");
  const message = read(formData, "message");
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2) fieldErrors.name = "Add a name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Add a real address, so a reply has somewhere to go.";
  }
  if (!practiceValues.has(practice)) {
    fieldErrors.practice = "Choose a product, or say you are not sure.";
  }
  if (message.length < 12) {
    fieldErrors.message = "Name the syllabus, the device, or who teaches.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  return { status: "success", name };
}
