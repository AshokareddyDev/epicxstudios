import { removeInquiry } from "@/app/admin/actions";
import { getSite } from "@/lib/content";
import { listInquiries } from "@/lib/inquiries";

export default async function BriefsAdminPage() {
  const [site, briefs] = await Promise.all([getSite(), listInquiries()]);
  const labels = new Map(site.practices.map((practice) => [practice.href, practice.title]));

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Briefs</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        Held on this machine from the contact form. A mailbox is still not connected, so nothing is sent on.
      </p>
      {briefs.length === 0 ? (
        <p className="mt-10 border-t border-ink/10 pt-6 text-base text-ink/75">
          No briefs yet.
        </p>
      ) : (
        <ol className="mt-10 border-b border-ink/10">
          {briefs.map((brief) => (
            <li key={brief.id} className="border-t border-ink/10 py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl tracking-tight">{brief.name}</h2>
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {brief.at.slice(0, 16).replace("T", " ")}
                </p>
              </div>
              <p className="mt-2 text-base text-ink/75">
                {brief.email}
                {brief.organization ? ` · ${brief.organization}` : ""}
                {" · "}
                {labels.get(brief.practice) ?? "Not sure yet"}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/75">{brief.message}</p>
              <form action={removeInquiry} className="mt-4">
                <input type="hidden" name="id" value={brief.id} />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-full border border-ink/15 px-4 text-sm hover:border-amber"
                >
                  Remove this brief
                </button>
              </form>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
