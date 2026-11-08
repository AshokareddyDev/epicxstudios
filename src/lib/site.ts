import raw from "../../content/site.json";

export type PageLink = {
  href: string;
  index: string;
  label: string;
  summary: string;
};

export type PracticeDetail = {
  index: string;
  title: string;
  body: string;
};

export type Practice = {
  href: string;
  index: string;
  nav: string;
  title: string;
  headline: string;
  summary: string;
  lede: string;
  points: string[];
  detailTitle: string;
  details: PracticeDetail[];
};

export type View = {
  src: string;
  href: string;
  kicker: string;
  title: string;
  caption: string;
  alt: string;
};

export type Emphasis = {
  index: string;
  title: string;
  body: string;
};

export type Member = {
  index: string;
  name: string;
  role: string;
  place: string;
  mark: string;
};

export type StudioCopy = {
  name: string;
  description: string;
  footer: string;
};

export type HomeCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  systemEyebrow: string;
  systemTitle: string;
  linksTitle: string;
};

export type ServicesCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
};

export type AboutCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
  principles: Emphasis[];
  teamEyebrow: string;
  teamTitle: string;
  teamLede: string;
  members: Member[];
  productsEyebrow: string;
  productsTitle: string;
};

export type ContactCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
};

export type SiteContent = {
  studio: StudioCopy;
  home: HomeCopy;
  servicesPage: ServicesCopy;
  about: AboutCopy;
  contactPage: ContactCopy;
  pages: PageLink[];
  practices: Practice[];
  views: View[];
};

export const pages: PageLink[] = raw.pages;
export const practices: Practice[] = raw.practices;
export const views: View[] = raw.views;

export function getPractice(href: string): Practice {
  const practice = practices.find((item) => item.href === href);
  if (!practice) {
    throw new Error(`Unknown practice: ${href}`);
  }
  return practice;
}

export function practiceNeighbors(practices: readonly Practice[], href: string) {
  const index = practices.findIndex((practice) => practice.href === href);
  return {
    index,
    previous: index > 0 ? practices[index - 1] : undefined,
    next:
      index >= 0 && index < practices.length - 1
        ? practices[index + 1]
        : undefined,
  };
}
