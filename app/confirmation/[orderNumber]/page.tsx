"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Item } from "@/components/ui/item";

export default function ConfirmationPage({ params }: {
  params: { orderNumber: string }
}) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return <div>Product not found..</div>
  }

  return (
    <main>
      <div className="max-w-xl mx-auto w-full rounded-xl p-4 m-6">
        <Card className="min-h-[60vh] flex justify-center pl-8 pr-8">
          <CardHeader>
            <CardTitle className="text-2xl pb-2">
              Payment succeeded! 🎉
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 flex flex-col justify-center gap-4">
            <p className="text-muted-foreground">
              Thank you for your purchase
            </p>

            <div data-cy="product" className="bg-muted md:p-4 p-2 rounded-xl">
              <p className="pb-2"><strong>Order Number:</strong> # {order.orderNumber}</p>
              <p className="pb-2"><strong>Order Date:</strong> {new Date().toDateString()}</p>
            </div>
            {/* <img src={params.image} alt="Product Image">Product Image</img> */}
            <div className="flex flex-col gap-3">
              {order.products.map((item: any) => (
                <div key={item.id}>
                  <p data-cy="product-title" className="pb-2"><strong>Title:</strong> {item.title}</p>
                  <p className="pb-2"><strong>Amount:</strong> {item.quantity}</p>
                  <p data-cy="product-price" className="pb-2"><strong>Price:</strong> {item.price} kr</p>
                </div>
              ))}
            </div>
            <div className="text-lg"><p><strong>Total:</strong>{" "} {order.products.reduce((sum: number, item: any) => sum + item.price + item.quantity, 0)} {" "} kr</p></div>

            <Link href="/product">
              <Button className="p-4 w-full hover:bg-zinc-800 mt-auto">
                Continue shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
