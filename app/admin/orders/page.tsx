import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

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

            <section className="grid grid-cols-3 gap-4">
                {orders.map((order) => (
                    <article
                        key={order.id}
                        className="border rounded-xl p-6 shadow-sm"
                    >
                        <h2 className="font-bold text-xl mb-4">
                            Order #{order.orderNumber}
                        </h2>

                        <div className="space-y-1">
                            <p>
                                <strong>Customer:</strong> {order.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {order.email}
                            </p>
                            <p>
                                <strong>Address:</strong> {order.address}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {order.createdAt.toLocaleDateString("sv-SE")}
                            </p>

                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Products</h3>

                            <ul className="space-y-2">
                                {order.items.map((item) => (
                                    <li className="flex justify-between" key={item.id}>
                                        <span>
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span>{item.price} kr</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}