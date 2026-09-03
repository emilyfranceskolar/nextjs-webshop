import { db } from "@/prisma/db";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({ // Fetch all orders from the database
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
        <div>
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 mb-4">
              <p>Order #{order.orderNumber}</p>

              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
