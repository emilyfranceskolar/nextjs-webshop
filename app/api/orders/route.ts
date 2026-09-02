import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
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
