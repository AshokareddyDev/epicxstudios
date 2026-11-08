import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { loadPractice } from "@/lib/content";

const href = "/services/k12-education";

export async function generateMetadata(): Promise<Metadata> {
  const { practice } = await loadPractice(href);
  if (!practice) return {};
  return { title: practice.title, description: practice.summary };
}

export default async function K12EducationPage() {
  const { site, practice } = await loadPractice(href);
  if (!practice) notFound();
  return <ServicePage practice={practice} practices={site.practices} />;
}
