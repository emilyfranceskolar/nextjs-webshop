import { products } from "@/data";
import { db } from "./db";

async function main() {
  for (const { id, category, ...product } of products) {
    const categoryRecord = await db.category.upsert({
      where: {
        name: category,
      },
      update: {},
      create: {
        name: category,
        slug: category.toLowerCase(),
      },
    });

    await db.product.upsert({
      where: {
        articleNumber: product.articleNumber,
      },
      update: {
        ...product,
         // set stock to 3 for seeded products
        stock: 3,
        
        categories: {
          deleteMany: {},
          create: {
            categoryId: categoryRecord.id,
          },
        },
      },
      create: {
        ...product,
         // set stock to 3 for seeded products
        stock: 3,
        
       categories: {
          create: {
            categoryId: categoryRecord.id,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
