export type OwnerNotice = {
  name: string;
  email: string;
  organization: string;
  product: string;
  when: string;
};

export async function notifyOwner(
  notice: OwnerNotice,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const owner = process.env.OWNER_EMAIL?.trim();
  if (!owner) {
    return { ok: false, message: "The studio inbox is not set, so this time was not held." };
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(owner)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: "https://epicxstudios.com/contact",
      Origin: "https://epicxstudios.com",
    },
    body: JSON.stringify({
      name: notice.name,
      email: notice.email,
      _replyto: notice.email,
      _subject: `Appointment held — ${notice.when}`,
      _template: "table",
      _captcha: "false",
      organization: notice.organization || "—",
      product: notice.product,
      when: `${notice.when}, Bengaluru time`,
    }),
  });

  let message = "The studio could not take this time. Try again in a moment.";
  try {
    const payload = (await response.json()) as { success?: boolean | string; message?: string };
    const delivered = payload.success === true || payload.success === "true";
    const queued = payload.message?.toLowerCase().includes("activation") ?? false;
    if (delivered || queued) return { ok: true };
  } catch {
    message = "The studio could not take this time. Try again in a moment.";
  }

  return { ok: false, message };
}
