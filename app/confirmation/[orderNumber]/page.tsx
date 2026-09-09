"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

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
    return <div className="p-6 text-lg">Loading..</div>
  }

  return (
    <main>
      <div className="max-w-3xl mx-auto w-full rounded-xl p-4 m-6">
        <Card className="min-h-[60vh] flex justify-center pl-8 pr-8">
          <CardHeader>
            <CardTitle className="text-2xl pb-2">
              Payment succeeded! ✔️
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 flex flex-col justify-center gap-4">
            <div className="text-muted-foreground flex flex-col gap-2">
              <p >Thank you for your purchase! Your order is being prepared and will be on its way soon.</p>
              <p>
                <strong>Order Number:</strong> #{" "}
                <span className="font-bold text-stone-700">
                  {order.orderNumber}
                </span>
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                <span className="text-black-600">
                  {new Date().toDateString()}
                </span>
              </p>
            </div>

            <div data-cy="product" className="text-base bg-muted md:p-4 p-4 rounded-xl">
              <div className="pb-2">
                <div className="mb-4 text-xs md:text-base flex flex-col gap-0.5">
                  <p className="flex justify-between">
                    <span className="font-semibold">Name</span>
                    <span>{order.customer.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Email</span>
                    <span>{order.customer.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Address</span>
                    <span>{order.customer.address}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">City</span>
                    <span>{order.customer.city}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Phone</span>
                    <span>{order.customer.phoneNr}</span>
                  </p>
                </div>
              </div>
              <Separator />

              <div className="flex flex-col gap-2 mt-4 text-xs md:text-base">
                {order.products.map((item: any) => (
                  <div key={item.id}>
                    <p data-cy="product-title" className="pb-2"><strong>Title:</strong> {item.title}</p>
                    <p className="pb-2"><strong>Amount:</strong> {item.quantity}</p>
                    <p data-cy="product-price" className="pb-2"><strong>Price:</strong> {item.price} kr</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="text-lg pt-4 pb-2"><p><strong>Total:</strong>{" "} {order.products.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)} {" "} kr</p></div>
            </div>

            <Link href="/product">
              <Button className="p-4 w-full hover:bg-[#ddd9cd] hover:text-zinc-800 mt-auto">
                Continue shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>


    </main>
  );
}
