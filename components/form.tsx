"use client";

import { Customer, customerSchema } from "@/data/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ContactFormFields from "./contact-form-fields";
import { PaymentFormFields } from "./payment-form-fields";
import { Button } from "./ui/button";

export function Form() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const saveCustomer = (customer: Customer) => {
    console.log("Save....", customer);
    router.push("/confirmation/orderNumber");
  };

  return (
    <form
      data-cy="customer-form"
      className="grid gap-10 w-full p-15"
      onSubmit={handleSubmit(saveCustomer)}
    >
      <ContactFormFields register={register} formState={formState} />
      <PaymentFormFields register={register} />
      <Button
        data-cy="product-buy-button"
        type="submit"
        className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer"
      >
        Pay now
      </Button>
    </form>
  );
}
