import { Form } from "@/components/form";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center">
      <Form />
      <Separator orientation="vertical" className="max-w-lg" />
      <p>Order information</p>
    </div>
  );
}
