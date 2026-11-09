import { redirect } from "next/navigation";

export default function GalleryAdminPage() {
  redirect("/admin/home#photographs");
}
