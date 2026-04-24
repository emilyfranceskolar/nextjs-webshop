import { Form } from "@/components/form";
import ShoppingCartList from "@/components/shopping-cart";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  return (
    <div className="flex flex-col justify-between lg:px-25 lg:py-10 md:gap-10 md:flex-row">
      <ShoppingCartList />
      <Separator orientation="vertical" className="w-full" />
      <Form />
    </div>
  );
}
