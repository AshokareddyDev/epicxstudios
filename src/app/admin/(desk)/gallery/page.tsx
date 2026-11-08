import { GalleryEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function GalleryAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Gallery</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        Picture files live in the gallery folder. This desk edits the words and which product a frame opens.
      </p>
      <div className="mt-8">
        <GalleryEditor views={site.views} practices={site.practices} />
      </div>
    </div>
  );
}
