import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <h1 className="text-3xl font-bold mb-8 text-center">
        All orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-6">
                <CardTitle>
                  Order #{order.orderNumber}
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  {order.createdAt.toLocaleDateString("sv-SE")}
                </p>
              </CardHeader>

              <CardContent className="space-y-1">
                <div className="space-y-2">
                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.email}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.address}
                  </p>
                </div>

                <div className="mt-10">
                  <h3 className="font-bold mb-3 mt-4 border-b pb-2 last:border-0">
                    Products
                  </h3>

                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between "
                      >
                        <span>
                          {item.title} ×{" "}
                          {item.quantity}
                        </span>

                        <span>
                          {item.price} kr
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}