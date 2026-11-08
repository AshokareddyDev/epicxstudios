import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/admin/editors";
import { getSite } from "@/lib/content";

export default async function ProductAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSite();
  const practice = site.practices.find((item) => item.href.endsWith(`/${slug}`));
  if (!practice) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">{practice.title}</h1>
      <div className="mt-8">
        <ProductEditor key={practice.href} practice={practice} />
      </div>
    </div>
  );
}
