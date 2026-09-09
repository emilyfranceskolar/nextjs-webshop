import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ articleNumber: string }> };

//hämta en specifik produkt
export async function GET(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "Förbidden" }, { status: 403 });
  }

  const { articleNumber } = await params;

  const product = await db.product.findUnique({
    where: { articleNumber },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!product)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
export async function PUT(request: NextRequest) {}
export async function DELETE(request: NextRequest) {}
