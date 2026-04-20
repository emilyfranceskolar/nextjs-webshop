"use-client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FiLock, FiSmartphone } from "react-icons/fi";
import { PopoverPhone } from "./popover-info";
import { SelectCountry } from "./select-country";

export function PaymentForm() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  return (
    <div className="w-full max-w-lg mt-4 rounded-lg border p-8">
      <form>
        <FieldGroup>
          <FieldSet className="w-full">
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field className="flex justify-between">
                <div className="relative">
                  <Input
                    id="checkout-card-number"
                    placeholder="Card Number"
                    autoComplete="on"
                    required
                    className="pr-10"
                  />
                  <FiLock className="absolute right-3  top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Field>
                  <Input
                    id="checkout-exp-month"
                    placeholder="Expiration date (MM / YY)"
                    autoComplete="on"
                    required
                  />
                </Field>
                <Field>
                  <Input
                    id="checkout-cvv"
                    placeholder="Security Code"
                    required
                  />
                </Field>
              </div>
              <Field>
                <Input
                  id="checkout-card-name"
                  placeholder="Name on Card"
                  autoComplete="on"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-same-as-shipping"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) =>
                    setSameAsShipping(checked === true)
                  }
                />
                <FieldLabel
                  htmlFor="checkout-same-as-shipping"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          {!sameAsShipping && (
            <section>
              <FieldSet>
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
          )}
          <FieldSet className=" text-gray-600">
            <p className="text-sm">Save my information for a faster checkout</p>
            <Field>
              <div className="relative">
                <FiSmartphone className="absolute right-3  top-1/2 -translate-y-1/2" />
                <Input
                  id="mobile-phone-nr"
                  type="text"
                  placeholder="Mobile phone (optional) +46"
                  autoComplete="on"
                />
              </div>
              <p className="text-xs">
                By providing your phone number, you agree to create a Shop
                account subject to Shop's
                <a
                  href="https://www.shopify.com/se/legal/privacy/consumers"
                  target="_blank"
                  className="text-xs underline pl-1 pr-1"
                >
                  Terms
                </a>
                and
                <a
                  href="https://shop.app/terms-of-service"
                  target="_blank"
                  className="text-xs underline pl-1"
                >
                  Privacy
                </a>
                .
              </p>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
