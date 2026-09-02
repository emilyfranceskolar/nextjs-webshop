"use client";

import { Customer, customerSchema } from "@/data/form";
import createOrder from "@/data/order";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ContactFormFields from "./contact-form-fields";
import { PaymentFormFields } from "./payment-form-fields";
import { Button } from "./ui/button";
import { useCartContext } from "@/app/providers/cart-provider";

export function Form() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { clearCart, productsInCart } = useCartContext();
  const [orderError, setOrderError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { register, handleSubmit, formState, setValue } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (session?.user.email) {
      setValue("email", session.user.email);
    }
  }, [session?.user.email, setValue]);

  const saveCustomer = async (customer: Customer) => {
    if (!session) {
      setOrderError("Please sign in before placing your order.");
      return;
    }

    setOrderError("");
    setIsPlacingOrder(true);

    try {
      const orderNumber = await createOrder(customer, productsInCart);
      const order = {
        orderNumber,
        customer: { ...customer, email: session.user.email },
        products: productsInCart,
      };

      localStorage.setItem("latestOrder", JSON.stringify(order));
      clearCart();
      router.push(`/confirmation/${orderNumber}`);
    } catch (error) {
      setOrderError(
        error instanceof Error ? error.message : "Could not place your order.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <form
      data-cy="customer-form"
      className="grid gap-6 lg:gap-10 w-full p-8 lg:p-15"
      onSubmit={handleSubmit(saveCustomer)}
    >
      <ContactFormFields register={register} formState={formState} />
      <PaymentFormFields register={register} />
      {!session && (
        <p className="rounded-lg border border-[#8b0836] bg-[#8b0836]/5 p-4 text-sm text-zinc-800">
          Please sign in or create an account using the account icon before
          placing your order.
        </p>
      )}
      {orderError && (
        <p className="text-sm text-red-700" role="alert">
          {orderError}
        </p>
      )}
      <Button
        data-cy="product-buy-button"
        type="submit"
        disabled={!session || isPlacingOrder}
        className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer"
      >
        {isPlacingOrder ? "Placing order..." : "Pay now"}
      </Button>
    </form>
  );
}
