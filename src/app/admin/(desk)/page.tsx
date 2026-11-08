import Link from "next/link";
import { getSite } from "@/lib/content";
import { listInquiries } from "@/lib/inquiries";

const sections = [
  { href: "/admin/studio", label: "Studio", body: "The name, the description, and the footer line." },
  { href: "/admin/home", label: "Home", body: "The opening line and the titles under it." },
  { href: "/admin/services", label: "Services", body: "The services page introduction." },
  { href: "/admin/pages", label: "Pages", body: "Navigation labels and the summaries beside them." },
  { href: "/admin/products", label: "Products", body: "Each product page: the headline, the points, and the details." },
  { href: "/admin/gallery", label: "Gallery", body: "The pictures on the home page, and the words on them." },
  { href: "/admin/about", label: "About", body: "The studio text, the principles, and the team profiles." },
  { href: "/admin/contact", label: "Contact", body: "The words beside the brief form." },
  { href: "/admin/briefs", label: "Briefs", body: "What visitors sent from the contact form." },
] as const;

export default async function AdminOverviewPage() {
  const site = await getSite();
  const briefs = await listInquiries();

  return (
    <div>
      <h1 className="max-w-xl font-display text-4xl tracking-tight">The desk.</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink/75">
        {site.practices.length} products, {site.views.length} gallery frames,{" "}
        {site.about.members.length} people, and {briefs.length}{" "}
        {briefs.length === 1 ? "brief" : "briefs"}. A save writes the site file
        on this machine. Publish it when you push that file.
      </p>
      <ol className="mt-10 border-b border-ink/10">
        {sections.map((section, index) => (
          <li key={section.href} className="border-t border-ink/10">
            <Link
              href={section.href}
              className="group grid gap-2 py-6 md:grid-cols-[4rem_minmax(0,0.6fr)_minmax(0,1fr)] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-2xl tracking-tight group-hover:text-amber">
                {section.label}
              </span>
              <span className="text-base leading-7 text-ink/75">{section.body}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
