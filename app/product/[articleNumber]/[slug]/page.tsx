import AddToCartButton from "@/components/add-to-cart-button";
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
            <p className="text-xl font-semibold" data-cy="product-price">
              {product.price}kr
            </p>

            <AddToCartButton
              id={product.articleNumber}
              title={product.title}
              articleNumber={product.articleNumber}
              imageUrl={product.image}
              price={product.price}
              slug={product.slug}
              category={product.categories[0]?.category.name ?? ""}
              description={product.description}
              buttonText="Add to Cart"
              variant="default"
              className="px-5 py-6 mb-10 mt-2 bg-[#ddd9cd] text-black rounded-xl hover:bg-[#526E67] hover:text-white  transition-all duration-300 cursor-pointer"
            />

            <DetailPageDropdown
              title="Shipping"
              content="We aim to dispatch all orders within 24 business hours. Worn Stories offers UPS and Postnord shipping services.\nThe shipping service and cost is based on your selected location. We offer free shipping worldwide on all orders over 250€."
            />
            <DetailPageDropdown
              title="Returns"
              content="Worn Stories has a 14-day return policy: you have 14 days from
              when your order is delivered to ship it back to us for a refund or
              exchange.​ The order must be returned in original condition with
              included original packaging."
            />
            <DetailPageDropdown
              title="Care for your vintage items"
              content="You can machine wash most cotton & cotton blend products in 40 degrees celcius / 104 degrees fahrenheit. Wool products should preferably be hand washed. Machine wash at your own risk. Remember that the items we offer have been used previously and that some are more fragile (depending on age and condition). Always have that in mind before washing. Vintage leather products should hang in dry areas and should be conditioned regularly to avoid cracks. Note that we do not take responsibility for any product that got damaged when worn or washed."
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
