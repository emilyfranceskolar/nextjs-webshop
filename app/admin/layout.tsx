import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect all /admin pages
  if (!(await isAdmin())) {
    redirect("/");
  }

  return <>{children}</>;
}
