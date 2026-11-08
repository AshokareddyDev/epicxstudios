import { AboutEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function AboutAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">About</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        The opening, the principles, and the people on the about page.
      </p>
      <div className="mt-8">
        <AboutEditor about={site.about} />
      </div>
    </div>
  );
}
