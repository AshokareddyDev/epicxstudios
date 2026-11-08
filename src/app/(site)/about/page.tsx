import type { Metadata } from "next";
import { AboutStudio } from "@/components/AboutStudio";
import { getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: site.about.title,
    description: site.about.description,
  };
}

export default async function AboutPage() {
  const site = await getSite();
  return <AboutStudio about={site.about} practices={site.practices} />;
}
