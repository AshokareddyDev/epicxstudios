import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/editors";
import { adminConfigured, isAdmin } from "@/lib/admin-session";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function LoginGate() {
  if (await isAdmin()) redirect("/admin");
  return <LoginForm configured={adminConfigured()} />;
}

export default function AdminLoginPage() {
  return (
    <main id="content" className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-5 py-24">
      <p className="font-mono text-[0.72rem] tracking-[0.32em] text-muted uppercase">
        Admin
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight">Open the studio desk.</h1>
      <p className="mt-4 text-base leading-7 text-ink/75">
        The password stays on this machine. It edits the site file and the
        briefs the contact form holds.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="font-mono text-[0.68rem] tracking-[0.16em] text-ink/60 uppercase">Opening</p>}>
          <LoginGate />
        </Suspense>
      </div>
    </main>
  );
}
