"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverPhone } from "./popover-info";
import { SelectCountry } from "./select-country";
import { Field, FieldGroup, FieldLegend, FieldSet } from "./ui/field";

export default function ContactForm() {
  return (
    <div>
      <FieldGroup>
        <FieldSet className="w-full">
          <Field>
            <FieldLegend className="text-4xl">Contact</FieldLegend>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              required
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
        </FieldSet>
        <FieldSet className="w-full">
          <FieldLegend>Delivery</FieldLegend>
          <FieldGroup>
            <SelectCountry />
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Input
                  id="checkout-first-name"
                  type="text"
                  placeholder="First Name"
                  required
                  autoComplete="on"
                />
              </Field>
              <Field>
                <Input
                  id="checkout-last-name"
                  type="text"
                  placeholder="Last Name"
                  required
                  autoComplete="on"
                />
              </Field>
            </div>
            <Field>
              <Input
                id="checkout-address"
                type="text"
                placeholder="Address"
                required
                autoComplete="on"
              />
            </Field>
            <Field>
              <Input
                id="checkout-address2"
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                autoComplete="on"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Input
                  id="checkout-city"
                  type="text"
                  placeholder="City"
                  required
                  autoComplete="on"
                />
              </Field>
              <Field>
                <Input
                  id="checkout-zip"
                  type="text"
                  placeholder="Postal Code"
                  required
                  autoComplete="on"
                />
              </Field>
            </div>
            <Field>
              <div className="relative">
                <Input
                  id="checkout-phone-nr"
                  type="text"
                  placeholder="Phone number"
                  required
                  autoComplete="on"
                />
                <PopoverPhone />
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
