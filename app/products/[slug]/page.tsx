import DetailPageDropdown from "@/components/ui/detail-page-dropdown";
import { db } from "@/prisma/db";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main className="p-5">
      <section className="grid md:grid-cols-2 md:gap-10">
        <div className="flex items-center justify-center">
          <img
            className="w-full h-auto mb-5"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-start md:mt-25 md:w-3/4">
            <h1 className="text-3xl font-bold mb-5">{product.title}</h1>
            <p className="mb-5">{product.description}</p>
            <p className="text-xl font-semibold">{product.price}kr</p>
            <button className="px-4 py-2 mb-10 mt-2 bg-[#ddd9cd] text-black rounded hover:bg-[#8b0836] hover:text-white  transition-all duration-300 cursor-pointer">
              Add to Cart
            </button>

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
            <p className="text-xs text-gray-500">
              Article number: {product.articleNumber}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
