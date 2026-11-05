import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getPractice } from "@/lib/site";

const practice = getPractice("/services/training-lms");

export const metadata: Metadata = {
  title: practice.title,
  description: practice.summary,
};

export default function TrainingLmsPage() {
  return <ServicePage practice={practice} />;
}
