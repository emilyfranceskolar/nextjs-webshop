import { Form } from "@/components/form";
import ShoppingCartList from "@/components/shopping-cart";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  const handlePayment = async () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
  };

  return (
    <div className="flex px-25 py-10 sm:flex-col md:flex-col gap-10">
      <Form />
      <Separator orientation="vertical" className="w-full" />
      <ShoppingCartList />
    </div>
  );
}
