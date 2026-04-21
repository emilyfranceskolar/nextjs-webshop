"use client";

import { Form } from "@/components/form";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function DeliveryPage() {
  const router = useRouter();

  const handlePayment = async () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    router.push(`/confirmation/${orderNumber}`);
  };

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center">
      <Form />
      <Separator orientation="vertical" className="max-w-lg" />
      <p>Order information</p>
    </div>
  );
}
