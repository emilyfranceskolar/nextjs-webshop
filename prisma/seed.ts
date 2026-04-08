import { products } from '@/data';
import { db } from './db';

async function main() {
  for (const { id, ...product } of products) {
    await db.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: {},
      create: product,
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
