import Link from "next/link";
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6 text-white">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Glajjan</h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/product"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Orders
          </Link>
        </nav>

        <div className="mt-10 border-t border-slate-700 pt-5">
          <Link
            href="/"
            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-slate-800"
          >
            ← Back to webshop
          </Link>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}