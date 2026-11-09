"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { uiSpring } from "@/lib/motion";
import type { PageLink } from "@/lib/site";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeDesktop(onStoreChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function desktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function desktopServerSnapshot() {
  return false;
}

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M12 2.75 21.25 12 12 21.25 2.75 12 12 2.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M12 7.25v9.5" stroke="#00ffd5" strokeWidth="1.4" />
    </svg>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4">
      <motion.span
        className="absolute left-0 top-1/2 h-px w-4 origin-center bg-current"
        animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
        transition={uiSpring}
      />
      <motion.span
        className="absolute left-0 top-1/2 h-px w-4 origin-center bg-current"
        animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
        transition={uiSpring}
      />
    </span>
  );
}

export function Navbar({
  pages,
  name,
}: {
  pages: readonly PageLink[];
  name: string;
}) {
  const pathname = usePathname();
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    desktopSnapshot,
    desktopServerSnapshot,
  );
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  } else if (desktop && open) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-clip pt-3 sm:pt-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[calc(0.75rem+2px)] bg-paper sm:h-[calc(1rem+2px)]"
      />
      <motion.nav
        aria-label="Primary"
        className="page-column px-3 sm:px-5"
        initial={{ y: -12 }}
        animate={{ y: 0 }}
        transition={uiSpring}
      >
        <div
          className={`overflow-hidden border border-ink/10 bg-paper/80 text-ink shadow-[0_16px_50px_rgba(22,24,29,0.08)] backdrop-blur-2xl transition-[border-radius] duration-500 ease-out motion-reduce:transition-none ${
            open ? "rounded-[1.75rem]" : "rounded-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-2 py-2 md:px-3">
            <Link
              href="/"
              aria-label={`${name} home`}
              className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1.5"
            >
              <motion.span
                whileHover={{ rotate: 8 }}
                whileTap={{ scale: 0.96 }}
                transition={uiSpring}
                className="grid size-9 place-items-center rounded-full border border-ink/15 text-ink"
              >
                <Mark />
              </motion.span>
              <span className="font-display text-sm font-semibold tracking-[0.12em]">
                {name}
              </span>
            </Link>

            <ul className="hidden items-center md:flex">
              {pages.map((page) => {
                const active = isCurrent(pathname, page.href);
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-[0.82rem] tracking-wide transition-colors motion-reduce:transition-none ${
                        active ? "text-ink" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      {active ? (
                        desktop ? (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-ink/8"
                            transition={uiSpring}
                          />
                        ) : (
                          <span className="absolute inset-0 rounded-full bg-ink/8" />
                        )
                      ) : null}
                      <span className="relative z-10">{page.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <Button href="/contact">Start a project</Button>
              </div>
              <button
                ref={buttonRef}
                type="button"
                className="grid size-11 place-items-center rounded-full text-ink md:hidden"
                aria-expanded={open}
                aria-controls="studio-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                <MenuGlyph open={open} />
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id="studio-nav"
                key="studio-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={uiSpring}
                className="md:hidden"
              >
                <div className="px-3 pb-3">
                  <ul className="border-t border-ink/10 pt-2">
                    {pages.map((item, index) => {
                      const active = isCurrent(pathname, item.href);
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...uiSpring, delay: 0.04 * index }}
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center gap-4 rounded-2xl px-3 py-3"
                          >
                            <span
                              className={`w-8 font-mono text-[0.68rem] tracking-[0.18em] ${
                                active ? "text-amber" : "text-muted"
                              }`}
                            >
                              {item.index}
                            </span>
                            <span
                              className={`font-display text-lg tracking-tight ${
                                active ? "text-ink" : "text-ink/75"
                              }`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                  <div className="px-2 pt-2">
                    <Button
                      href="/contact"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Start a project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
}
