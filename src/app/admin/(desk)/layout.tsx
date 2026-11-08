import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { isAdmin } from "@/lib/admin-session";
import { getSite } from "@/lib/content";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function Desk({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const site = await getSite();

  return (
    <main id="content">
      <AdminChrome name={site.studio.name}>{children}</AdminChrome>
    </main>
  );
}

export default function AdminDeskLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <main id="content" className="px-5 pt-16">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-ink/60 uppercase">
            Opening the desk
          </p>
        </main>
      }
    >
      <Desk>{children}</Desk>
    </Suspense>
  );
}
