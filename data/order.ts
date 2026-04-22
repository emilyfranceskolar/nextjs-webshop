"use server";

import { Customer } from "@/data/form";
import { db } from "@/prisma/db";

export default async function createOrder(customer: Customer) {
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

  const order = await db.order.create({
    data: {
      orderNumber: orderNumber,
      name: customer.name,
      email: customer.email,
      address: customer.address,
    },
  });

  return order.orderNumber;
}
