import type { PrismaClient } from "@/generated/client";
import { z } from "zod";
import { getProductPrice } from "./product-price";

const cartSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      quantity: z.number().int().positive().max(2147483647),
      price: z.number().positive(),
    }),
  )
  .min(1, "Your cart is empty.");

type OrderCustomer = {
  name: string;
  email: string;
  address: string;
  userId: string;
};

export async function placeOrder(
  db: PrismaClient,
  customer: OrderCustomer,
  cartItems: unknown,
) {
  const items = cartSchema.parse(cartItems);
  const quantities = new Map<string, number>();
  for (const item of items) {
    const quantity = (quantities.get(item.id) ?? 0) + item.quantity;
    if (quantity > 2147483647) throw new Error("Invalid product quantity.");
    quantities.set(item.id, quantity);
  }

  return db.$transaction(async (tx) => {
    const products = await tx.product.findMany({
      where: { id: { in: [...quantities.keys()] } },
    });
    if (products.length !== quantities.size) {
      throw new Error("One or more products are no longer available.");
    }
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );
    if (
      items.some(
        (item) => item.price !== getProductPrice(productsById.get(item.id)!),
      )
    ) {
      throw new Error(
        "A product price has changed. Remove it from your cart and add it again before ordering.",
      );
    }

    for (const [id, quantity] of quantities) {
      // Check and decrement in one write, including when another customer buys.
      const updated = await tx.product.updateMany({
        where: { id, stock: { gte: quantity } },
        data: { stock: { decrement: quantity } },
      });
      if (updated.count !== 1) {
        throw new Error(
          `Not enough stock for ${productsById.get(id)!.title}. Please update your cart.`,
        );
      }
    }

    // Any failure here rolls back every stock change above.
    return tx.order.create({
      data: {
        ...customer,
        orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        items: {
          create: [...quantities].map(([id, quantity]) => {
            const product = productsById.get(id)!;
            return {
              productId: id,
              title: product.title,
              price: getProductPrice(product),
              quantity,
            };
          }),
        },
      },
    });
  });
}
