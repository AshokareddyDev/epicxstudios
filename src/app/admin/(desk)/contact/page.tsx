import { ContactCopyEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function ContactAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Contact</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        The words beside the form. The briefs themselves sit in their own list.
      </p>
      <div className="mt-8">
        <ContactCopyEditor contactPage={site.contactPage} />
      </div>
    </div>
  );
}
