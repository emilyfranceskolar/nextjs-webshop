import { require_isLoggedIn_IsAdmin } from "@/lib/admin";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ articleNumber: string }> };

//hämta en specifik produkt
export async function GET(request: NextRequest, { params }: Params) {
  const error = await require_isLoggedIn_IsAdmin();
  if (error) return error;

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

//uppdatera en specifik produkt
export async function PUT(request: NextRequest, { params }: Params) {
  const error = await require_isLoggedIn_IsAdmin();
  if (error) return error;

  const { articleNumber } = await params;
  const product = await db.product.findUnique({
    where: { articleNumber },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  const body = await request.json();
  const updated = await db.product.update({
    where: { articleNumber },
    data: body,
  });
  return NextResponse.json(updated);
}

//radera en specifik produkt
export async function DELETE(request: NextRequest, { params }: Params) {
  const error = await require_isLoggedIn_IsAdmin();
  if (error) return error;

  const { articleNumber } = await params;

  const product = await db.product.findUnique({
    where: { articleNumber },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  await db.product.delete({ where: { articleNumber } });

  return new NextResponse(null, { status: 204 });
}
