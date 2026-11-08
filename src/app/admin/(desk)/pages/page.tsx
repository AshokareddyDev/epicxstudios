import { PagesEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function PagesAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Pages</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        Labels in the navigation and the summaries on the home page. The routes stay put.
      </p>
      <div className="mt-8">
        <PagesEditor pages={site.pages} />
      </div>
    </div>
  );
}
