import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoryCard() {
  return (
    <Card className="relative mx-auto w-full min-w-72 pt-0 hover:bg-stone-100">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader className="text-start">
        <CardTitle>Category</CardTitle>
      </CardHeader>
    </Card>
  );
}
