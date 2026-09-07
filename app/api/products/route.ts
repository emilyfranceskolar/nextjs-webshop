import { createProductSchema } from "@/data/form";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//list products
export async function GET(request: NextRequest) {
  const products = await db.product.findMany();
  //
  return NextResponse.json(products);
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = createProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid product data" },
      { status: 400 },
    );
  }

  const newProduct = await db.product.create({
    data: result.data,
  });

  return NextResponse.json(newProduct, { status: 201 });
}
