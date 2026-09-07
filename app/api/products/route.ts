import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

//list products
export async function GET(request: NextRequest) {
  const products = await db.product.findMany();
  //
  return NextResponse.json(products);
}
export async function POST(request: NextRequest) {}
