import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TrendingCard() {
  return (
    <Card className="relative mx-auto w-full min-w-64 pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Trending</Badge>
        </CardAction>
        <CardTitle>Product 1</CardTitle>
        <CardDescription>Product description</CardDescription>
        <CardDescription>Condition - Like new</CardDescription>
        <div className="pl-2">
          <CardDescription className="font-extrabold">Price kr</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex w-full gap-2">
        <Button className="flex-1 bg-white text-black border-0,5 border-zinc-600  hover:bg-stone-100">
          Show details
        </Button>
      </CardFooter>
    </Card>
  );
}
