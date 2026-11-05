import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getPractice } from "@/lib/site";

const practice = getPractice("/services/k12-education");

export const metadata: Metadata = {
  title: practice.title,
  description: practice.summary,
};

export default function K12EducationPage() {
  return <ServicePage practice={practice} />;
}
