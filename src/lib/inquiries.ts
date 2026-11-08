import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Inquiry = {
  id: string;
  at: string;
  name: string;
  organization: string;
  email: string;
  practice: string;
  message: string;
};

const filePath = path.join(process.cwd(), "data", "inquiries.json");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseInquiry(value: unknown): Inquiry | null {
  if (!isRecord(value)) return null;
  const fields = ["id", "at", "name", "organization", "email", "practice", "message"] as const;
  const row: Record<string, string> = {};
  for (const field of fields) {
    const item = value[field];
    if (typeof item !== "string") return null;
    row[field] = item;
  }
  return {
    id: row.id,
    at: row.at,
    name: row.name,
    organization: row.organization,
    email: row.email,
    practice: row.practice,
    message: row.message,
  };
}

export async function listInquiries(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      const inquiry = parseInquiry(item);
      return inquiry ? [inquiry] : [];
    });
  } catch {
    return [];
  }
}

export async function addInquiry(input: Omit<Inquiry, "id" | "at">) {
  const current = await listInquiries();
  const next: Inquiry = {
    id: randomUUID(),
    at: new Date().toISOString(),
    ...input,
  };
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify([next, ...current], null, 2)}\n`, "utf8");
}

export async function deleteInquiry(id: string) {
  const current = await listInquiries();
  const next = current.filter((item) => item.id !== id);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}
