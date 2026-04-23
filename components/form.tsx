"use client";

import { Customer, customerSchema } from "@/data/form";
import createOrder from "@/data/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ContactFormFields from "./contact-form-fields";
import { PaymentFormFields } from "./payment-form-fields";
import { Button } from "./ui/button";
import ShoppingCartList from "./shopping-cart";

export function Form() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const saveCustomer = async (customer: Customer) => {
    console.log("Save....", customer);
    const orderNumber = await createOrder(customer);
    router.push(`/confirmation/${orderNumber}`);
  };

  return (
    <form
      data-cy="customer-form"
      className="grid gap-6 lg:gap-10 w-full p-8 lg:p-15"
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
