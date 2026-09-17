"use client";

import { useState } from "react";

type CustomerOrder = {
    orderNumber: string;
    createdAt: string;
    items: { quantity: number; title: string }[];
};

interface OrderGridProps {
    orders: CustomerOrder[];
}

export default function OrderGrid({ orders }: OrderGridProps) {
    const [showAll, setShowAll] = useState(false);

    const visibleOrders = showAll ? orders : orders.slice(0, 3);

    return (
        <>
            <ul className="mt-3 space-y-3">
                {visibleOrders.map((order) => (
                    <li
                        key={order.orderNumber}
                        className="rounded-lg border border-zinc-200 p-4 text-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">
                                Order #{order.orderNumber}
                            </span>

                            <span className="text-zinc-600">
                                {new Date(order.createdAt).toLocaleDateString("en-US")}
                            </span>
                        </div>

                        <p className="mt-2 text-zinc-600">
                            {order.items
                                .map((item) => `${item.quantity} × ${item.title}`)
                                .join(", ")}
                        </p>
                    </li>
                ))}
            </ul>

            {orders.length > 3 && (
                <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-sm font-medium underline underline-offset-4 hover:text-zinc-600"
                >
                    {showAll ? "Show Less" : "Show All Orders"}
                </button>
            )}
        </>
    );
}