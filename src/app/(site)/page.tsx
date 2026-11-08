import { HomeStage } from "@/components/HomeStage";
import { getSite } from "@/lib/content";

export default async function HomePage() {
  const site = await getSite();
  return (
    <HomeStage
      home={site.home}
      pages={site.pages}
      practices={site.practices}
      views={site.views}
    />
  );
}
