import AddToCartButton from "@/components/add-to-cart-button";
import ProductPrice from "@/components/product-price";
import DetailPageDropdown from "@/components/ui/detail-page-dropdown";
import { db } from "@/prisma/db";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main className="p-5">
      <section className="grid md:grid-cols-2 md:gap-10">
        <div className="flex items-center justify-center">
          <img
            className="w-3/4 h-auto mb-5 rounded-md"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-start md:mt-25 md:w-3/4">
            <h1 className="text-3xl font-bold mb-5" data-cy="product-title">
              {product.title}
            </h1>
            <p className="mb-5" data-cy="product-description">
              {product.description}
            </p>
            <ProductPrice
              price={product.price}
              salePrice={product.salePrice}
              className="text-xl font-semibold"
            />

            {product.stock === 0 ? (
              <p className="text-red-600 font-semibold">Out of stock</p>
            ) : product.stock <= 5 ? (
              <p className="text-orange-500 font-semibold">
                Only a few left in stock
              </p>
            ) : (
              <p className="text-green-600 font-semibold">In stock</p>
            )}
            <AddToCartButton
              id={product.id}
              title={product.title}
              articleNumber={product.articleNumber}
              imageUrl={product.image}
              price={product.price}
              salePrice={product.salePrice}
              slug={product.slug}
              category={product.categories[0]?.category.name ?? ""}
              description={product.description}
              stock={product.stock}
              disabled={product.stock === 0}
              buttonText="Add to Cart"
              variant="default"
              className="px-5 py-6 mb-10 mt-2 bg-[#ddd9cd] text-black rounded-xl hover:bg-[#526E67] hover:text-white  transition-all duration-300 cursor-pointer"
            />

            <DetailPageDropdown
              title="Shipping"
              content={
                "We aim to dispatch all orders within 24 business hours. Glajjan offers UPS and Postnord shipping services. The shipping service and cost is based on your selected location. We offer free shipping worldwide on all orders over 250€."
              }
            />
            <DetailPageDropdown
              title="Returns"
              content={
                "Glajjans has a 14-day return policy: you have 14 days from when your order is delivered to ship it back to us for a refund or exchange. The order must be returned in original condition with included original packaging."
              }
            />
            <DetailPageDropdown
              title="Care"
              content={
                "Clean your glasses with lukewarm water and a drop of mild soap, then dry them gently with a soft microfiber cloth.\nAvoid paper towels, tissues and your clothes, as they can scratch the lenses. Never use household cleaners, alcohol or hot water, since they can damage lens coatings and frames. Please note that we do not take responsibility for damage caused by wear, improper cleaning or accidents."
              }
            />
            <p className="text-xs text-gray-500" data-cy="product-id">
              Article number: {product.articleNumber}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
