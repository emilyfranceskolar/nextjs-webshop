import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ articleNumber: string }> };

//hämta en produkt
export async function GET(request: NextRequest, { params }: Params) {
  const { articleNumber } = await params;

  const product = await db.product.findUnique({ where: { articleNumber } });

  if (!product)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
export async function POST(request: NextRequest) {}
export async function PUT(request: NextRequest) {}
export async function DELETE(request: NextRequest) {}
