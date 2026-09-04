"use server";

import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
import { customerSchema, type Customer } from "./form";

type CartItem = {
  id: string;
  quantity: number;
};

export default async function createOrder(
  customer: Customer,
  cartItems: CartItem[],
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Please sign in before placing your order.");
  }

  const validCustomer = customerSchema.parse(customer);

  if (cartItems.length === 0) {
    throw new Error("Your cart is empty.");
  }

  if (
    cartItems.some(
      (item) =>
        !item.id || !Number.isInteger(item.quantity) || item.quantity < 1,
    )
  ) {
    throw new Error("Your cart contains an invalid item.");
  }

  const productIds = [...new Set(cartItems.map((item) => item.id))];
  const products = await db.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products are no longer available.");
  }

  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

  const order = await db.order.create({
    data: {
      orderNumber,
      name: validCustomer.name,
      email: session.user.email,
      address: validCustomer.address,
      userId: session.user.id,
      items: {
        create: cartItems.map((item) => {
          const product = productsById.get(item.id)!;

          return {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
          };
        }),
      },
    },
  });

  return order.orderNumber;
}
