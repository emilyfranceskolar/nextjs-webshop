import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Mark one order as shipped
async function markAsShipped(formData: FormData) {
  "use server";
  const orderId = formData.get("orderId") as string;

  // Stop if there is no order id
  if (!orderId) {
    return;
  }

  // Update the order in the database
  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.SHIPPED,
      shippedAt: new Date(),
    },
  });

  // Refresh admin orders page
  revalidatePath("/admin/orders");
}

// Admin orders page
export default async function AdminOrdersPage() {
  // Get all orders from database
  const orders = await db.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        // Show all orders
        <div>
          {orders.map((order) => {
            // Calculate total price
            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );

            return (
              <article key={order.id} className="border rounded-xl p-6 mb-4">
                <h2 className="text-xl font-bold">
                  Order #{order.orderNumber}
                </h2>
                <p>Status: {order.status}</p>

                <p>Date: {order.createdAt.toLocaleString()}</p>
                {order.shippedAt && (
                  <p>Shipped: {order.shippedAt.toLocaleString()}</p>
                )}

                <div className="mt-4">
                  <h3 className="font-semibold">Customer</h3>

                  <p>Name: {order.name}</p>
                  <p>Email: {order.email}</p>
                  <p>Address: {order.address}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Products</h3>

                  {order.items.map((item) => (
                    <div key={item.id}>
                      <p>
                        {item.title} × {item.quantity}
                      </p>

                      <p>{item.price * item.quantity} kr</p>
                    </div>
                  ))}

                  <p className="font-bold mt-2">Total: {totalPrice} kr</p>

                  {order.status !== OrderStatus.SHIPPED && (
                    <form action={markAsShipped} className="mt-4">
                      <input type="hidden" name="orderId" value={order.id} />

                      <Button type="submit">Mark as shipped</Button>
                    </form>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>

    
  );
}
