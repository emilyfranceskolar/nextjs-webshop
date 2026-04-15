import { Card, CardHeader, CardTitle } from "@/components/ui/card";
export interface CategoryCardProps {
  category: string;
  image: string;
}

export function CategoryCard({ category, image }: CategoryCardProps) {
  return (
    <Card className="relative mx-auto w-full min-w-84 pt-0 hover:bg-stone-100">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={image}
        alt={category}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader className="text-center">
        <CardTitle>{category}</CardTitle>
      </CardHeader>
    </Card>
  );
}
