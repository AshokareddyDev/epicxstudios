import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getPractice } from "@/lib/site";

const practice = getPractice("/services/software-mobile");

export const metadata: Metadata = {
  title: practice.title,
  description: practice.summary,
};

export default function SoftwareMobilePage() {
  return <ServicePage practice={practice} />;
}
