import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage({
  params,
}: {
  params: { orderNumber: string }
}) {

  return (
    <main>
      <div className="max-w-xl mx-auto w-full rounded-xl p-4 m-6">
        <Card className="min-h-[60vh] flex justify-center pl-8 pr-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Payment succeeded! 🎉
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 flex flex-col justify-center gap-4">
            <p className="text-muted-foreground">
              Thank you for your purchase
            </p>

            <div className="bg-muted p-4 rounded-xl">
              <div>
                <p className="pb-2"><strong>Order Number:</strong> #{params.orderNumber}</p>
                <p className="pb-2"><strong>Amount:</strong> 3</p>
                <p className="pb-2"><strong>Order Date:</strong> 2026-01-14</p>
                <p className="pb-2"><strong>Total:</strong> 899 kr</p>
              </div>
            </div>

            <div>
              <Button className="p-4 w-full hover:bg-zinc-800 mt-auto">
                Continue shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
