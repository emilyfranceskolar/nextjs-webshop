import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmationPage({
  params,
}: {
  params: { orderNumber: string, amount: string, orderDate: Date, total: string, image: string, title: string, price: string };
}) {

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
              <div>
                <p className="pb-2"><strong>Order Number:</strong> #{params.orderNumber}</p>
                <p className="pb-2"><strong>Order Date:</strong> 2026-01-14</p>
                {/* <img src={params.image} alt="Product Image">Product Image</img> */}
                <p data-cy="product-title" className="pb-2"><strong>Title:</strong> {params.title}</p>
                <p className="pb-2"><strong>Amount:</strong> {params.amount}</p>
                <p data-cy="product-price" className="pb-2"><strong>Price:</strong> {params.price}</p>
                <p className="pb-2"><strong>Total:</strong> {params.total}</p>
              </div>
            </div>

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
