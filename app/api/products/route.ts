import { createProductSchema } from "@/data/form";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//list products
export async function GET(request: NextRequest) {
  const products = await db.product.findMany();
  //
  return NextResponse.json(products);
}

//create products
export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = createProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid product data" },
      { status: 400 },
    );
  }

  const { category, ...productData } = result.data;

  //skapa denna produkt, hitta den existerande kategori med samma slug, skapa en link mellan dem
  const newProduct = await db.product.create({
    data: {
      ...productData,
      categories: {
        create: {
          category: {
            connect: { slug: category },
          },
        },
      },
    },
    /*obs! 👇🏽 är samma som rad 18-37 med ovanför är en spread av normala fält in i Prisma data 
    data: {
      title: productData.title,
      description: productData.description,
      image: productData.image,
      price: productData.price,
      slug: productData.slug,
      articleNumber: productData.articleNumber,
    }, */
  });

  return NextResponse.json(newProduct, { status: 201 });
}
