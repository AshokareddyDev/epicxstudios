import { ServicesEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function ServicesAdminPage() {
  const site = await getSite();
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Services</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        The introduction on the services page. Each product has its own editor.
      </p>
      <div className="mt-8">
        <ServicesEditor servicesPage={site.servicesPage} />
      </div>
    </div>
  );
}
