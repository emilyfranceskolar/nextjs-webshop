import { createProductSchema } from "@/data/form";
import { require_isLoggedIn_IsAdmin } from "@/lib/admin";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//hämta alla produkter
export async function GET(request: NextRequest) {
  const error = await require_isLoggedIn_IsAdmin();
  if (error) return error;

  const products = await db.product.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const productsWithCategories = products.map((product) => ({
    ...product,
    categories: product.categories.map((item) => item.category),
  }));
  //returnera enkel data för UI:n
  return NextResponse.json(productsWithCategories);
}

//skapar en produkt
export async function POST(request: NextRequest) {
  const error = await require_isLoggedIn_IsAdmin();
  if (error) return error;

  const body = await request.json();

  const result = createProductSchema().safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid product data" },
      { status: 400 },
    );
  }

  const { category, ...productData } = result.data;

  const slug =
    productData.slug ??
    productData.title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-");

  //skapa denna produkt, hitta den existerande kategori med samma slug, skapa en link mellan dem
  const newProduct = await db.product.create({
    data: {
      ...productData,
      slug,
      categories: {
        create: category.map((categoryName) => ({
          category: {
            connect: { name: categoryName },
          },
        })),
      },
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
