"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/data/form";
import { cn } from "@/lib/utils";
import { FormState, UseFormRegister } from "react-hook-form";
import { PopoverPhone } from "./popover-info";
import { SelectCountry } from "./select-country";
import { Field, FieldGroup, FieldLegend, FieldSet } from "./ui/field";

interface Props {
  register: UseFormRegister<Customer>;
  formState: FormState<Customer>;
}

export default function ContactFormFields({ register, formState }: Props) {
  return (
    <div>
      <FieldGroup>
        <FieldSet className="w-full">
          <Field>
            <FieldLegend className="text-4xl">Contact</FieldLegend>
            <Input
              data-cy="customer-email"
              {...register("email")}
              id="email"
              type="text"
              placeholder="Email"
              className={cn("h-10 p-4", {
                "border-red-600 border-2": formState.errors.email,
              })}
              autoComplete="email"
            />
            {formState.errors.email && (
              <p
                data-cy="customer-email-error"
                className="text-red-600 text-sm"
              >
                {formState.errors.email.message}
              </p>
            )}
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
            <Field>
              <Input
                data-cy="customer-name"
                {...register("name")}
                id="checkout-name"
                type="text"
                placeholder="First and last name"
                className={cn("h-10 p-4", {
                  "border-red-600 border-2": formState.errors.name,
                })}
                autoComplete="name"
              />
              {formState.errors.name && (
                <p
                  data-cy="customer-name-error"
                  className="text-red-600 text-sm"
                >
                  {formState.errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <Input
                data-cy="customer-address"
                {...register("address")}
                id="checkout-address"
                type="text"
                placeholder="Address"
                className={cn("h-10 p-4", {
                  "border-red-600 border-2": formState.errors.address,
                })}
                autoComplete="street-address"
              />
              {formState.errors.address && (
                <p
                  data-cy="customer-address-error"
                  className="text-red-600 text-sm"
                >
                  {formState.errors.address.message}
                </p>
              )}
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
                  data-cy="customer-city"
                  {...register("city")}
                  id="checkout-city"
                  type="text"
                  placeholder="City"
                  className={cn("h-10 p-4", {
                    "border-red-600 border-2": formState.errors.city,
                  })}
                  autoComplete="address-level2"
                />
                {formState.errors.city && (
                  <p
                    data-cy="customer-city-error"
                    className="text-red-600 text-sm"
                  >
                    {formState.errors.city.message}
                  </p>
                )}
              </Field>
              <Field>
                <Input
                  data-cy="customer-zipcode"
                  {...register("postalCode")}
                  id="checkout-zip"
                  type="text"
                  placeholder="Postal Code"
                  className={cn("h-10 p-4", {
                    "border-red-600 border-2": formState.errors.postalCode,
                  })}
                  autoComplete="postal-code"
                />
                {formState.errors.postalCode && (
                  <p
                    data-cy="customer-zipcode-error"
                    className="text-red-600 text-sm"
                  >
                    {formState.errors.postalCode.message}
                  </p>
                )}
              </Field>
            </div>
            <Field>
              <div className="relative">
                <Input
                  data-cy="customer-phone"
                  {...register("phoneNr")}
                  id="checkout-phone-nr"
                  type="text"
                  placeholder="Phone number"
                  className={cn("h-10 p-4", {
                    "border-red-600 border-2": formState.errors.phoneNr,
                  })}
                  autoComplete="tel"
                />
                <PopoverPhone />
              </div>
              {formState.errors.phoneNr && (
                <p
                  data-cy="customer-phone-error"
                  className="text-red-600 text-sm"
                >
                  {formState.errors.phoneNr.message}
                </p>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
