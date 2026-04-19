"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  return (
    <main className="grid grid-cols-[1fr_auto_1fr] gap-4 m-8">
      <div className="grid gap-8 w-full max-w-lg">
        <section>
          <Field>
            <FieldLegend className="text-4xl">Contact</FieldLegend>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Email"
              className="h-10 p-4"
            />
            <Field orientation="horizontal">
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
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Input id="first-name" type="text" placeholder="First Name" />
                </Field>
                <Field>
                  <Input id="last-name" type="text" placeholder="Last Name" />
                </Field>
              </div>
              <Field>
                <Input id="address" type="text" placeholder="Address" />
              </Field>
              <Field>
                <Input
                  id="address"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Input id="city" type="text" placeholder="City" />
                </Field>
                <Field>
                  <Input id="zip" type="text" placeholder="Postal Code" />
                </Field>
              </div>
              <Field>
                <Input id="address" type="text" placeholder="Phone number" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </section>
        <button className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer">
          Pay now
        </button>
      </div>
      <Separator orientation="vertical" className="self-stretch mx-auto" />
      <p>Order information</p>
    </main>
  );
}
