import { Badge } from "@/components/ui/badge";

export function BrandBadge() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge
        className="border-zinc-600 border border-solid px-6 py-3 hover:bg-white"
        variant="outline"
      >
        Brand
      </Badge>
    </div>
  );
}
