"use client";

import { Form } from "@/components/form";
import ShoppingCartList from "@/components/shopping-cart";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function DeliveryPage() {
  const router = useRouter();

  const handlePayment = async () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    router.push(`/confirmation/${orderNumber}`);
  };

  return (
    <div className="flex justify-center gap-16 p-12">
      <Form />
      <Separator orientation="vertical" className="max-w-lg" />
      <ShoppingCartList />
    </div>
  );
}
