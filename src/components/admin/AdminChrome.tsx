"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";
import { uiSpring } from "@/lib/motion";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/studio", label: "Studio" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/briefs", label: "Briefs" },
] as const;

function current(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminChrome({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-8 pb-24 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
            Admin
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight">{name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-ink/15 px-4 text-sm hover:border-amber"
          >
            View site
          </Link>
          <form action={logout}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={uiSpring}
              className="inline-flex h-11 items-center rounded-full bg-amber px-4 text-sm text-paper hover:bg-ivory hover:text-paper"
            >
              Sign out
            </motion.button>
          </form>
        </div>
      </header>
      <nav aria-label="Admin" className="mt-6 flex flex-wrap gap-2">
        {links.map((link) => {
          const active = current(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-11 items-center rounded-full px-4 font-mono text-[0.68rem] tracking-[0.16em] uppercase ${
                active
                  ? "bg-ink text-paper"
                  : "border border-ink/15 text-ink/70 hover:border-amber"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="glass mt-10 rounded-[1.75rem] p-6 md:p-8">{children}</div>
    </div>
  );
}
