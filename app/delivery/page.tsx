"use client";

import ContactForm from "@/components/contact-form";
import { PaymentForm } from "@/components/payment-form";
import { Separator } from "@/components/ui/separator";
import { Payment } from "@/data/form";

interface Props {
  setPayment: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function DeliveryPage(props: Props) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-end">
      <form className="grid gap-4 w-full max-w-lg m-8">
        <ContactForm />
        <PaymentForm />
        <button className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer">
          Pay now
        </button>
      </form>
      <Separator orientation="vertical" className="max-w-lg" />
      <p>Order information</p>
    </div>
  );
}
