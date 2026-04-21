"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import {
  FiMinusCircle,
  FiPlusCircle,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

export default function ShoppingCartList() {
  const { productsInCart, removeFromCart, updateQuantity } = useCartContext();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleRemoveItem = (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setIsRemoving(null);
    }, 300);
  };

  const subtotal = productsInCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Your Shopping Cart</h1>
        <p className="text-muted-foreground">
          {productsInCart.length}{" "}
          {productsInCart.length === 1 ? "item" : "items"} in your cart •{" "}
          <span data-cy="total-price" className="text-foreground font-semibold">{subtotal} kr </span>
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 flex flex-col gap-12">
          {productsInCart.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FiShoppingBag className="text-muted-foreground/50 mb-4 size-12" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Add some items to get started
                </p>
                <Link href="/product">
                  <Button
                    className="h-9 px-4 py-2 mt-4 cursor-pointer"
                    variant="outline"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            productsInCart.map((item) => (
              <Card data-cy="cart-item"
                key={item.id}
                className={cn("gap-0 overflow-hidden py-0", {
                  "opacity-50": isRemoving === item.id,
                })}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-auto w-full sm:w-40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 data-cy="product-title" className="text-foreground text-lg font-medium">
                          {item.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Button data-cy="decrease-quantity-button"
                          variant="outline"
                          size="icon"
                          className="size-8 cursor-pointer"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1)
                            } else {
                              handleRemoveItem(item.id);
                            }
                          }
                          }
                        >
                          <FiMinusCircle />
                        </Button>
                        <span data-cy="product-quantity" className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <Button data-cy="increase-quantity-button"
                          variant="outline"
                          size="icon"
                          className="size-8 cursor-pointer"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FiPlusCircle />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-12 flex items-center justify-between">
                      <span className="w-24 text-start text-md font-medium">
                        Quantity: {item.quantity}
                      </span>
                      <div className="text-start">
                        <p data-cy="product-price" className="text-md font-medium">
                          {item.price * item.quantity} kr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="flex flex-col gap-4 w-full lg:w-96">
          <Card className="sticky top-4 gap-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal} kr</span>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center justify-between text-base font-medium">
                <span>Total</span>
                <div className="text-end">
                  <p className="text-xl font-bold">{total} kr</p>
                  <p className="text-muted-foreground text-xs">includes Moms</p>
                </div>
              </div>
              <Link href="/delivery">
                <Button
                  size="lg"
                  className="h-10 px-8 mt-4 w-full cursor-pointer text-base font-medium"
                  disabled={productsInCart.length === 0}
                >
                  <FiShoppingBag />
                  Proceed to Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
