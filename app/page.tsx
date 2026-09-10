import ProductSlider from "@/components/product-slider";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home() {
  const product = await db.product.findMany({
    include: {
      categories: {
        include: { category: true },
      },
    },
  });
  const sliderProducts = product.map((product) => ({
    id: product.id.toString(),
    title: product.title,
    articleNumber: product.articleNumber,
    price: product.price,
    salePrice: product.salePrice,
    imageUrl: product.image,
    slug: product.slug,
    category: product.categories[0]?.category.name ?? "",
    description: product.description,
    stock: product.stock,
  }));
  const midpoint = Math.ceil(sliderProducts.length / 2);
  const categories = ["Bestseller", "Sunglasses", "Sale", "Reading Glasses"];

  const categoryImages: Record<string, string> = {
    Bestseller: "/assets/images/Female_HP_1.webp",
    Sunglasses: "/assets/images/Male_HP_1.webp",
    Sale: "/assets/images/Female_HP_2.webp",
    "Reading Glasses": "/assets/images/Male_HP_2.webp",
  };

  return (
    <main className="grid gap-8 place-items-center bg-[#fafaf8]">
      <section className="relative h-dvh w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/assets/videos/1a42a2272c314240b3c559b3b9dedef4.mp4"
        />
        <Link
          href="/product"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-lg bg-[#526E67] px-10 py-3 text-lg font-bold whitespace-nowrap text-white transition-all duration-300 hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black lg:bottom-50"
        >
          SHOP NOW
        </Link>
      </section>
      <section
        aria-label="Shop by collection"
        className="-mt-8 grid w-full grid-cols-1 md:grid-cols-2"
      >
        {categories.map((category) => (
          <Link
            className="group relative flex min-h-[480px] min-w-0 items-end overflow-hidden bg-stone-100 p-6 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white md:min-h-[800px]"
            href={`/product?category=${encodeURIComponent(category)}`}
            key={category}
          >
            <img
              src={categoryImages[category]}
              alt=""
              loading="lazy"
              width={1200}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="relative mb-3 inline-flex min-h-11 items-center bg-black px-5 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors group-hover:bg-[#526E67] group-focus-visible:bg-[#526E67]">
              {category}
            </span>
          </Link>
        ))}
      </section>
      <section
        aria-labelledby="all-products-heading"
        className="grid min-w-0 w-full gap-8"
      >
        <h2
          id="all-products-heading"
          className="m-4 text-center text-xl md:text-3xl"
        >
          All Products
        </h2>
        <ProductSlider
          products={sliderProducts.slice(0, midpoint)}
          label="All products, slider 1"
        />
        <section aria-label="Archive stock clearance" className="w-full">
          <img
            src="/assets/images/SITE_BANNERS_9.webp"
            alt="Archive stock clearance — selected frames from SEK 349. Sunglasses resting in sunlit water."
            width={2752}
            height={1536}
            loading="lazy"
            className="block h-auto w-full"
          />
        </section>
        <ProductSlider
          products={sliderProducts.slice(midpoint)}
          label="All products, slider 2"
        />
      </section>
      <section
        aria-label="The Glajjan perspective"
        className="relative isolate flex min-h-[32rem] w-full items-end overflow-hidden bg-[#526E67] md:min-h-[42rem]"
      >
        <img
          src="/assets/images/hero-image.jpg"
          alt="A woman wearing tortoiseshell sunglasses in the sunshine"
          loading="lazy"
          width={5472}
          height={3648}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
        />
        <figure className="max-w-lg p-6 text-white sm:p-10 md:max-w-2xl md:p-16">
          <blockquote className="text-3xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            &ldquo;Life looks better through a pair that feels like you.&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold tracking-[0.2em] uppercase">
            The Glajjan perspective
          </figcaption>
        </figure>
      </section>
      <section
        id="about-glajjan"
        aria-labelledby="about-glajjan-heading"
        className="w-full px-6 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#526E67] uppercase">
              A little about Glajjan
            </p>
            <h2
              id="about-glajjan-heading"
              className="text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl"
            >
              Based in Göteborg.
              <br />A pair for your everyday.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
              We’re Glajjan, an eyewear company based in Göteborg. We believe
              finding your next pair should feel simple, personal, and fun. From
              quiet reading moments to sunny days out, find frames that feel
              like you.
            </p>
          </div>
          <div className="grid grid-cols-2 items-start gap-3 md:gap-5">
            <img
              src="/assets/images/photo-1574258495973-f010dfbb5371.jpg"
              alt="Tortoiseshell and metal reading glasses resting on a book"
              width={5184}
              height={3456}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover object-[60%_center]"
            />
            <img
              src="/assets/images/Bilbao_Meadow_Green.jpg"
              alt="Round reading glasses in meadow green"
              width={1200}
              height={1600}
              loading="lazy"
              className="mt-10 aspect-[3/4] w-full object-cover md:mt-16"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
