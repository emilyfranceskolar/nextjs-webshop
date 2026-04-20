"use client";

import { PaymentForm } from "@/components/payment-form";
import { PopoverPhone } from "@/components/popover-info";
import { SelectCountry } from "@/components/select-country";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


export default function DeliveryPage() {
  const router = useRouter()

  const handlePayment = async () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000)

    router.push(`/confirmation/${orderNumber}`)
  }

  return (
    <main className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-end">
      <div className="grid gap-4 w-full max-w-lg m-8">
        {/* <div className="grid gap-8 mt-4 rounded-lg border p-8"> */}
        <section>
          <Field>
            <FieldLegend className="text-4xl">Contact</FieldLegend>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Email"
              className="h-10 p-4"
              autoComplete="on"
            />
            <Field orientation="horizontal" className="m-2">
              <Checkbox id="terms-checkbox" name="terms-checkbox" />
              <Label htmlFor="email-checkbox">
                Email me with news and offers
              </Label>
            </Field>
          </Field>
        </section>

        <section>
          <FieldSet className="w-full">
            <FieldLegend>Delivery</FieldLegend>
            <SelectCountry />
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="First Name"
                    autoComplete="on"
                  />
                </Field>
                <Field>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Last Name"
                    autoComplete="on"
                  />
                </Field>
              </div>
              <Field>
                <Input
                  id="address"
                  type="text"
                  placeholder="Address"
                  autoComplete="on"
                />
              </Field>
              <Field>
                <Input
                  id="address"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  autoComplete="on"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    autoComplete="on"
                  />
                </Field>
                <Field>
                  <Input
                    id="zip"
                    type="text"
                    placeholder="Postal Code"
                    autoComplete="on"
                  />
                </Field>
              </div>
              <Field>
                <div className="relative">
                  <Input
                    id="phone-nr"
                    type="text"
                    placeholder="Phone number"
                    autoComplete="on"
                  />
                  <PopoverPhone />
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
        </section>

        {/* </div> */}
        <PaymentForm />
        <button onClick={handlePayment} className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer">
          Pay now
        </button>
      </div >
      <Separator orientation="vertical" className="max-w-lg" />
      <p>Order information</p>
    </main >
  );
}
