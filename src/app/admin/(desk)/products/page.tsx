import Link from "next/link";
import { getSite } from "@/lib/content";

export default async function ProductsAdminPage() {
  const site = await getSite();

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Products</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink/75">
        Open a product to edit the page a school or an institute reads.
      </p>
      <ol className="mt-10 border-b border-ink/10">
        {site.practices.map((practice) => (
          <li key={practice.href} className="border-t border-ink/10">
            <Link
              href={`/admin/products/${practice.href.split("/").pop()}`}
              className="group grid gap-2 py-6 md:grid-cols-[4rem_minmax(0,0.7fr)_minmax(0,1fr)] md:items-baseline"
            >
              <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                {practice.index}
              </span>
              <span className="font-display text-2xl tracking-tight group-hover:text-amber">
                {practice.title}
              </span>
              <span className="text-base leading-7 text-ink/75">{practice.summary}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
