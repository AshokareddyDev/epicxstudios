"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminConfigured,
  endAdminSession,
  passwordsMatch,
  startAdminSession,
  isAdmin,
} from "@/lib/admin-session";
import {
  ContentError,
  parseSite,
  readSiteFresh,
  replacePages,
  replacePractice,
  replaceViews,
  writeSite,
} from "@/lib/content";
import { deleteInquiry } from "@/lib/inquiries";
import type { SiteContent } from "@/lib/site";

export type SaveState = {
  status: "idle" | "saved" | "error";
  message: string;
};

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function fail(error: unknown): SaveState {
  if (error instanceof ContentError) {
    return { status: "error", message: error.message };
  }
  return { status: "error", message: "The save did not land. Try it again." };
}

function payload(formData: FormData) {
  const raw = formData.get("payload");
  if (typeof raw !== "string") throw new ContentError("The form could not be read.");
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new ContentError("The form could not be read.");
  }
}

async function commit(next: SiteContent): Promise<SaveState> {
  await writeSite(next);
  return { status: "saved", message: "Saved on this machine." };
}

export async function login(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!adminConfigured() || !expected) {
    return {
      status: "error",
      message: "Set ADMIN_PASSWORD and ADMIN_SECRET, then restart the server.",
    };
  }
  if (!passwordsMatch(password, expected)) {
    return { status: "error", message: "That password does not open the studio." };
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin/login");
}

export async function saveStudio(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const next = parseSite({
      ...site,
      studio: {
        name: formData.get("name"),
        description: formData.get("description"),
        footer: formData.get("footer"),
      },
    });
    return commit(next);
  } catch (error) {
    return fail(error);
  }
}

export async function saveHome(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const withHome = parseSite({
      ...site,
      home: {
        eyebrow: formData.get("eyebrow"),
        title: formData.get("title"),
        lede: formData.get("lede"),
        systemEyebrow: formData.get("systemEyebrow"),
        systemTitle: formData.get("systemTitle"),
        linksTitle: formData.get("linksTitle"),
      },
    });
    return commit(replaceViews(withHome, payload(formData)));
  } catch (error) {
    return fail(error);
  }
}

export async function saveServicesCopy(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const next = parseSite({
      ...site,
      servicesPage: {
        title: formData.get("title"),
        description: formData.get("description"),
        eyebrow: formData.get("eyebrow"),
        headline: formData.get("headline"),
        lede: formData.get("lede"),
      },
    });
    return commit(next);
  } catch (error) {
    return fail(error);
  }
}

export async function saveContactCopy(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const next = parseSite({
      ...site,
      contactPage: {
        title: formData.get("title"),
        description: formData.get("description"),
        eyebrow: formData.get("eyebrow"),
        headline: formData.get("headline"),
        lede: formData.get("lede"),
      },
    });
    return commit(next);
  } catch (error) {
    return fail(error);
  }
}

export async function savePages(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    return commit(replacePages(site, payload(formData)));
  } catch (error) {
    return fail(error);
  }
}

export async function savePractice(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const href = String(formData.get("href") ?? "");
    return commit(replacePractice(site, href, payload(formData)));
  } catch (error) {
    return fail(error);
  }
}

export async function saveAbout(
  _previous: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await guard();
  try {
    const site = await readSiteFresh();
    const next = parseSite({ ...site, about: payload(formData) });
    return commit(next);
  } catch (error) {
    return fail(error);
  }
}

export async function removeInquiry(formData: FormData) {
  await guard();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteInquiry(id);
  revalidatePath("/admin/briefs");
  revalidatePath("/admin");
}
