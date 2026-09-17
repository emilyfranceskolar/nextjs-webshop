import { productSchema } from "@/data/form";
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

//regler för vad en PUT får skicka
const updateProductSchema = productSchema
  //behåll och ändra enbart dessa fält
  .pick({
    title: true,
    description: true,
    image: true,
    price: true,
    stock: true,
    salePrice: true,
  })
  .partial()
  .strict();

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

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON data" }, { status: 400 });
  }

  const result = updateProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid product data" },
      { status: 400 },
    );
  }

  //rea måste vara mindre än det vanliga priset
  const final = { ...product, ...result.data };

  if (final.salePrice != null && final.salePrice >= final.price) {
    return NextResponse.json(
      { message: "Sale price must be lower than price" },
      { status: 400 },
    );
  }

  const updated = await db.product.update({
    where: { articleNumber },
    data: result.data,
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
