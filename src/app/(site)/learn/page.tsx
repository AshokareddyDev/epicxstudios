import type { Metadata } from "next";
import { LearnStudio } from "@/components/LearnStudio";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "A K12 lesson for state and CBSE classrooms: a short read, a diagram, a check, and a record of who finished.",
};

export default function LearnPage() {
  return <LearnStudio />;
}
