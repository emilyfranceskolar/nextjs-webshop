import { Form } from "@/components/form";
import ShoppingCartList from "@/components/shopping-cart";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  return (
    <div className="flex justify-between px-25 py-10 gap-10 md:flex-row flex-col">
      <Form />
      <Separator orientation="vertical" className="w-full" />
      <ShoppingCartList />
    </div>
  );
}
