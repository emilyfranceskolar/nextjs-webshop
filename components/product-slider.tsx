import HomePageCard, {
  type HomePageCardProps,
} from "@/components/ui/home-page-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductSlider({
  products,
  label,
}: {
  products: HomePageCardProps[];
  label: string;
}) {
  if (products.length === 0) return null;

  return (
    <Carousel
      aria-label={label}
      opts={{ align: "start", slidesToScroll: "auto" }}
      className="min-w-0 w-full px-2"
    >
      <div className="mb-3 flex justify-end gap-2">
        <CarouselPrevious className="static size-10 translate-y-0" />
        <CarouselNext className="static size-10 translate-y-0" />
      </div>
      <CarouselContent className="-ml-3 py-1">
        {products.map((product, index) => (
          <CarouselItem
            key={product.id}
            aria-label={`${index + 1} of ${products.length}`}
            className="basis-[85%] pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <HomePageCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
