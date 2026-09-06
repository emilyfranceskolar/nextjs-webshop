
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function AdminPage() {
  const productCount = await db.product.count();
  const orderCount = await db.order.count();
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

          <h2 className="mt-2 text-3xl font-bold">{productCount}</h2>

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

         <h2 className="mt-2 text-3xl font-bold">{orderCount}</h2>

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

