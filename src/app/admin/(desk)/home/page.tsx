import { HomeEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function HomeAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Home</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        The letterhead and the photograph table. One save publishes both.
      </p>
      <div className="mt-8">
        <HomeEditor home={site.home} views={site.views} practices={[...site.practices]} />
      </div>
    </div>
  );
}
