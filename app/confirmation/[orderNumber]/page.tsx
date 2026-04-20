import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage({
  params,
}: {
  params: { orderNumber: string }
}) {

  return (
    <div className="max-w-xl mx-auto mt-16 mb-16 rounded-xl shadow-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Payment succeeded!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your purchase
          </p>

          <div className="bg-muted p-4 rounded-xl">
            <p><strong>Ordernummer:</strong> #{params.orderNumber}</p>
            <p><strong>Total:</strong> 899 kr</p>
          </div>

          <Button className="w-full hover:bg-zinc-800">
            Continue shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
