import { StudioEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function StudioAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Studio</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        The name in the navigation, the description search engines read, and the line in the footer.
      </p>
      <div className="mt-8">
        <StudioEditor studio={site.studio} />
      </div>
    </div>
  );
}
