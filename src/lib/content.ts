import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import type {
  AboutCopy,
  ContactCopy,
  Emphasis,
  HomeCopy,
  Member,
  PageLink,
  Practice,
  PracticeDetail,
  ServicesCopy,
  SiteContent,
  StudioCopy,
  View,
} from "@/lib/site";

const filePath = path.join(process.cwd(), "content", "site.json");

export class ContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, label: string, max: number) {
  if (typeof value !== "string") {
    throw new ContentError(`${label} needs words.`);
  }
  const trimmed = value.trim();
  if (!trimmed) throw new ContentError(`${label} needs words.`);
  if (trimmed.length > max) throw new ContentError(`${label} is too long.`);
  return trimmed;
}

function list<T>(value: unknown, label: string, map: (item: unknown, index: number) => T, max = 12) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentError(`${label} needs at least one entry.`);
  }
  if (value.length > max) throw new ContentError(`${label} has too many entries.`);
  return value.map(map);
}

function optionalList<T>(
  value: unknown,
  label: string,
  map: (item: unknown, index: number) => T,
  max = 12,
) {
  if (!Array.isArray(value)) throw new ContentError(`${label} could not be read.`);
  if (value.length > max) throw new ContentError(`${label} has too many entries.`);
  return value.map(map);
}

function emphasis(value: unknown, label: string): Emphasis {
  if (!isRecord(value)) throw new ContentError(`${label} could not be read.`);
  return {
    index: text(value.index, `${label} index`, 8),
    title: text(value.title, `${label} title`, 160),
    body: text(value.body, `${label} text`, 600),
  };
}

function member(value: unknown, index: number): Member {
  if (!isRecord(value)) throw new ContentError("A team profile could not be read.");
  const name = text(value.name, "A team name", 80);
  const mark =
    typeof value.mark === "string" && value.mark.trim()
      ? text(value.mark, "A team mark", 4).toUpperCase()
      : name
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0] ?? "")
          .join("")
          .toUpperCase();
  return {
    index: text(value.index, "A team index", 8),
    name,
    role: text(value.role, "A team role", 80),
    place: text(value.place, "A team place", 80),
    mark,
  };
}

function detail(value: unknown): PracticeDetail {
  if (!isRecord(value)) throw new ContentError("A product detail could not be read.");
  return {
    index: text(value.index, "A detail index", 8),
    title: text(value.title, "A detail title", 120),
    body: text(value.body, "A detail", 600),
  };
}

function practice(value: unknown, previous: Practice | undefined): Practice {
  if (!isRecord(value)) throw new ContentError("A product could not be read.");
  const href = text(value.href, "A product route", 80);
  if (previous && previous.href !== href) {
    throw new ContentError("A product route cannot change.");
  }
  if (!href.startsWith("/services/")) {
    throw new ContentError("A product route has to stay under services.");
  }
  const pointSource = Array.isArray(value.points)
    ? value.points.filter((item) => typeof item === "string" && item.trim())
    : value.points;
  const points = list(pointSource, "Product points", (item) => text(item, "A product point", 400), 8);
  const details = list(value.details, "Product details", (item) => detail(item), 8);
  return {
    href,
    index: text(value.index, "A product index", 8),
    nav: text(value.nav, "A product navigation label", 40),
    title: text(value.title, "A product title", 80),
    headline: text(value.headline, "A product headline", 180),
    summary: text(value.summary, "A product summary", 400),
    lede: text(value.lede, "A product introduction", 900),
    points,
    detailTitle: text(value.detailTitle, "A detail heading", 120),
    details,
  };
}

function view(value: unknown, hrefs: ReadonlySet<string>): View {
  if (!isRecord(value)) throw new ContentError("A gallery frame could not be read.");
  const src = text(value.src, "A gallery file", 160);
  if (!src.startsWith("/gallery/")) {
    throw new ContentError("Gallery files stay in the gallery folder.");
  }
  const href = text(value.href, "A gallery link", 80);
  if (!hrefs.has(href)) throw new ContentError("A gallery frame has to link to a product.");
  return {
    src,
    href,
    kicker: text(value.kicker, "A gallery kicker", 40),
    title: text(value.title, "A gallery title", 80),
    caption: text(value.caption, "A gallery caption", 180),
    alt: text(value.alt, "A gallery description", 240),
  };
}

function pageLink(value: unknown, previous: PageLink | undefined): PageLink {
  if (!isRecord(value)) throw new ContentError("A page could not be read.");
  const href = text(value.href, "A page route", 80);
  if (previous && previous.href !== href) {
    throw new ContentError("A page route cannot change.");
  }
  return {
    href,
    index: text(value.index, "A page index", 8),
    label: text(value.label, "A page label", 40),
    summary: text(value.summary, "A page summary", 240),
  };
}

export function parseSite(value: unknown): SiteContent {
  if (!isRecord(value)) throw new ContentError("The site file could not be read.");
  const studioRaw = value.studio;
  const homeRaw = value.home;
  const servicesRaw = value.servicesPage;
  const aboutRaw = value.about;
  const contactRaw = value.contactPage;
  if (!isRecord(studioRaw) || !isRecord(homeRaw) || !isRecord(servicesRaw) || !isRecord(aboutRaw) || !isRecord(contactRaw)) {
    throw new ContentError("The site file is missing a section.");
  }

  const studio: StudioCopy = {
    name: text(studioRaw.name, "The studio name", 60),
    description: text(studioRaw.description, "The studio description", 400),
    footer: text(studioRaw.footer, "The footer line", 280),
  };
  const home: HomeCopy = {
    eyebrow: text(homeRaw.eyebrow, "The home eyebrow", 40),
    title: text(homeRaw.title, "The home title", 180),
    lede: text(homeRaw.lede, "The home introduction", 500),
    systemEyebrow: text(homeRaw.systemEyebrow, "The system eyebrow", 40),
    systemTitle: text(homeRaw.systemTitle, "The system title", 180),
    linksTitle: text(homeRaw.linksTitle, "The links title", 180),
  };
  const servicesPage: ServicesCopy = {
    title: text(servicesRaw.title, "The services title", 80),
    description: text(servicesRaw.description, "The services description", 400),
    eyebrow: text(servicesRaw.eyebrow, "The services eyebrow", 40),
    headline: text(servicesRaw.headline, "The services headline", 180),
    lede: text(servicesRaw.lede, "The services introduction", 600),
  };

  const practices = list(value.practices, "Products", (item) => practice(item, undefined), 8);
  const hrefs = new Set(practices.map((item) => item.href));
  if (hrefs.size !== practices.length) {
    throw new ContentError("Each product needs its own route.");
  }

  const about: AboutCopy = {
    title: text(aboutRaw.title, "The about title", 80),
    description: text(aboutRaw.description, "The about description", 400),
    eyebrow: text(aboutRaw.eyebrow, "The about eyebrow", 40),
    headline: text(aboutRaw.headline, "The about headline", 180),
    lede: text(aboutRaw.lede, "The about introduction", 700),
    principles: list(aboutRaw.principles, "Principles", (item, index) => emphasis(item, `Principle ${index + 1}`), 8),
    teamEyebrow: text(aboutRaw.teamEyebrow, "The team eyebrow", 40),
    teamTitle: text(aboutRaw.teamTitle, "The team title", 180),
    teamLede: text(aboutRaw.teamLede, "The team introduction", 500),
    members: optionalList(aboutRaw.members, "Team", (item, index) => member(item, index), 12),
    productsEyebrow: text(aboutRaw.productsEyebrow, "The products eyebrow", 40),
    productsTitle: text(aboutRaw.productsTitle, "The products title", 180),
  };
  const contactPage: ContactCopy = {
    title: text(contactRaw.title, "The contact title", 80),
    description: text(contactRaw.description, "The contact description", 400),
    eyebrow: text(contactRaw.eyebrow, "The contact eyebrow", 40),
    headline: text(contactRaw.headline, "The contact headline", 180),
    lede: text(contactRaw.lede, "The contact introduction", 400),
  };
  const pages = list(value.pages, "Pages", (item) => pageLink(item, undefined), 8);
  const views = list(value.views, "Gallery", (item) => view(item, hrefs), 12);

  return { studio, home, servicesPage, about, contactPage, pages, practices, views };
}

export function replacePractice(site: SiteContent, href: string, next: unknown): SiteContent {
  const current = site.practices.find((item) => item.href === href);
  if (!current) throw new ContentError("That product is not on the site.");
  const parsed = practice(next, current);
  return {
    ...site,
    practices: site.practices.map((item) => (item.href === href ? parsed : item)),
  };
}

export function replacePages(site: SiteContent, next: unknown): SiteContent {
  if (!Array.isArray(next) || next.length !== site.pages.length) {
    throw new ContentError("The page list has to stay the same length.");
  }
  return {
    ...site,
    pages: next.map((item, index) => pageLink(item, site.pages[index])),
  };
}

export function replaceViews(site: SiteContent, next: unknown): SiteContent {
  const hrefs = new Set(site.practices.map((item) => item.href));
  const views = list(next, "Gallery", (item) => view(item, hrefs), 12);
  return { ...site, views };
}

async function readSite(): Promise<SiteContent> {
  const raw = await readFile(filePath, "utf8");
  return parseSite(JSON.parse(raw) as unknown);
}

export async function getSite(): Promise<SiteContent> {
  "use cache";
  cacheTag("site");
  cacheLife({ stale: 30, revalidate: 60, expire: 86400 });
  return readSite();
}

export async function writeSite(site: SiteContent) {
  const checked = parseSite(site);
  await writeFile(filePath, `${JSON.stringify(checked, null, 2)}\n`, "utf8");
  updateTag("site");
}

export async function readSiteFresh() {
  return readSite();
}

export async function loadPractice(href: string) {
  const site = await getSite();
  const practice = site.practices.find((item) => item.href === href) ?? null;
  return { site, practice };
}
