"use server";

import { revalidatePath } from "next/cache";
import { getSite } from "@/lib/content";
import { addInquiry } from "@/lib/inquiries";

export type ContactField = "name" | "email" | "practice" | "message";

export type ContactState = {
  status: "idle" | "error" | "success";
  name?: string;
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

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
  const organization = read(formData, "organization");
  const fieldErrors: Partial<Record<ContactField, string>> = {};
  const site = await getSite();
  const practiceValues = new Set<string>([
    ...site.practices.map((item) => item.href),
    "unsure",
  ]);

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

  try {
    await addInquiry({ name, organization, email, practice, message });
  } catch {
    return {
      status: "error",
      message: "The brief could not be held. Try it again.",
    };
  }

  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
  return { status: "success", name };
}
