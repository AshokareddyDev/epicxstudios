import type { Metadata } from "next";
import { AboutStudio } from "@/components/AboutStudio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Epicxstudios builds curriculum platforms for state and CBSE classrooms, and training systems for higher study.",
};

export default function AboutPage() {
  return <AboutStudio />;
}
