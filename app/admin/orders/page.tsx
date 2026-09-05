import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminNavigation from "../admin-navigation";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "SEK",
});

export default async function AdminOrdersPage() {
  if (!(await isAdmin())) {
    redirect("/");
  }

  const orders = await db.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-6">
      <AdminNavigation currentPage="orders" />
      <h1 className="text-3xl font-bold my-8 text-center">All orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">No orders yet.</p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} data-cy="admin-order" className="min-w-0">
              <CardHeader className="pb-6">
                <CardTitle className="break-words">
                  Order #{order.orderNumber}
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  {order.createdAt.toLocaleDateString("en-GB")}
                </p>
              </CardHeader>

              <CardContent className="space-y-1">
                <div className="space-y-2 break-words">
                  <p>
                    <strong>Customer:</strong> {order.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                </div>

                <div className="mt-10">
                  <h2 className="font-bold mb-3 mt-4 border-b pb-2">
                    Products
                  </h2>

                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-wrap justify-between gap-2"
                      >
                        <span className="min-w-0 break-words">
                          {item.title} × {item.quantity}
                        </span>

                        <span className="shrink-0">
                          {currency.format(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex flex-wrap justify-between gap-2 border-t pt-4 font-semibold">
                    <span>Total</span>
                    <span data-cy="admin-order-total">
                      {currency.format(
                        order.items.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
