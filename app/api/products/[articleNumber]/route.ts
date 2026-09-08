import { NextRequest } from "next/server";

type Params = { params: Promise<{ articleNumber: string }> };

// //hämta en specifik produkt
// export async function GET(request: NextRequest, { params }: Params) {
//   const { articleNumber } = await params;

//   const product = await db.product.findUnique({
//     where: { articleNumber },
//     include: {
//       categories: {
//         include: {
//           category: true,
//         },
//       },
//     },
//   });

//   if (!product)
//     return NextResponse.json({ message: "Not found" }, { status: 404 });
//   return NextResponse.json(product);
// }
export async function PUT(request: NextRequest) {}
export async function DELETE(request: NextRequest) {}
