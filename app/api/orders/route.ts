import { auth } from "@/lib/auth";
import { placeOrder } from "@/lib/place-order";
import { db } from "@/prisma/db";
import { customerSchema } from "@/data/form";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      orderNumber: true,
      createdAt: true,
      items: {
        select: {
          quantity: true,
          title: true,
        },
      },
    },
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { customer, cartItems } = await request.json();
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
    return NextResponse.json({ orderNumber: order.orderNumber }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not place your order.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
