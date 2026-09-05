

import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Manage your webshop from one place.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {/* Products */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Products</p>

          <h2 className="mt-2 text-2xl font-bold">Products</h2>

          <Link
            href="/admin/product"
            className="mt-4 inline-block font-medium hover:underline"
          >
            Manage products →
          </Link>
        </div>

        {/* Orders */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Orders</p>

          <h2 className="mt-2 text-2xl font-bold">Orders</h2>

          <Link
            href="/admin/orders"
            className="mt-4 inline-block font-medium hover:underline"
          >
            Manage orders →
          </Link>
        </div>

        {/* Users */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Users</p>

          <h2 className="mt-2 text-2xl font-bold">Users</h2>

          <p className="mt-4 text-sm text-gray-400">
            User management coming later
          </p>
        </div>
      </section>
    </div>
  );
}

