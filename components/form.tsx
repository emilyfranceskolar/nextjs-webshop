"use client";

import { Customer, customerSchema } from "@/data/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContactFormFields from "./contact-form-fields";
import { PaymentFormFields } from "./payment-form-fields";

export function Form() {
  const { register, handleSubmit, formState } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const saveCustomer = (customer: Customer) => {
    console.log("Save....", customer);
  };

  return (
    <form
      className="grid gap-4 w-full max-w-lg m-8"
      onSubmit={handleSubmit(saveCustomer)}
    >
      <ContactFormFields register={register} formState={formState} />
      <PaymentFormFields register={register} />
      <button className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer">
        Pay now
      </button>
    </form>
  );
}
