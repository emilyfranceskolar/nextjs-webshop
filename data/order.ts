"use server";

import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
import { customerSchema, type Customer } from "./form";
import { placeOrder } from "@/lib/place-order";
import { revalidatePath } from "next/cache";

type CartItem = {
  id: string;
  quantity: number;
  price: number;
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

  const order = await placeOrder(
    db,
    {
      name: validCustomer.name,
      email: session.user.email,
      address: validCustomer.address,
      userId: session.user.id,
    },
    cartItems,
  );

  revalidatePath("/", "layout");
  return order.orderNumber;
}
