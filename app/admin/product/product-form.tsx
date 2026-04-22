"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormState, UseFormRegister } from "react-hook-form";
import { ProductFormValues } from "@/data/form";
import { cn } from "@/lib/utils";

interface Props {
  register: UseFormRegister<ProductFormValues>;
  formState: FormState<ProductFormValues>;
}

export default function ProductForm({ register, formState }: Props) {
  return (
    <div className="w-full space-y-4">
      <input type="hidden" {...register("id")} />
      <Field className="space-y-2 w-full">
        <FieldLegend className="text-2xl font-bold text-zinc-800">Title</FieldLegend>
        <Input
          data-cy="product-title"
          {...register("title")}
          id="title"
          type="text"
          placeholder="Title"
          className={cn("h-12 w-full p-4", {
            "border-red-600 border-2": formState.errors.title,
          })}
          autoComplete="title" />
        {formState.errors.title && (
          <p
            data-cy="product-title-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.title.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">Category</FieldLegend>
        <Input
          data-cy="product-category"
          {...register("category")}
          id="category"
          type="text"
          placeholder="Category"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.category,
          })}
          autoComplete="category" />
        {formState.errors.category && (
          <p
            data-cy="product-category-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.category.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">Description</FieldLegend>
        <Input
          data-cy="product-description"
          {...register("description")}
          id="description"
          type="text"
          placeholder="Description"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.description,
          })}
          autoComplete="description" />
        {formState.errors.description && (
          <p
            data-cy="product-description-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.description.message}
          </p>
        )}
      </Field>


      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Image
        </FieldLegend>
        <Input
          data-cy="product-image"
          {...register("image")}
          id="image"
          type="text"
          placeholder="Image URL"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.image,
          })}
          autoComplete="off" />
        {formState.errors.image && (
          <p
            data-cy="product-image-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.image.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Price
        </FieldLegend>

        <Input
          data-cy="product-price"
          {...register("price")}
          id="price"
          type="number"
          placeholder="Price"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.price,
          })}
          autoComplete="off" />
        {formState.errors.price && (
          <p
            data-cy="product-price-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.price.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Article Number
        </FieldLegend>

        <Input
          data-cy="product-articleNumber"
          {...register("articleNumber")}
          id="articleNumber"
          type="text"
          placeholder="Article Number"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.articleNumber,
          })}
          autoComplete="off" />
        {formState.errors.articleNumber && (
          <p
            data-cy="product-articleNumber-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.articleNumber.message}
          </p>
        )}
      </Field>

      <Field className="pt-6 pb-6" orientation="horizontal">
        <div className="flex gap-4">
          <Button type="submit" variant="outline" className="rounded-full bg-black text-white">
            Confirm
          </Button>
          <Link href="/admin">
            <Button type="button" variant="outline" className="rounded-full">
              Cancel
            </Button>
          </Link>
        </div>
        {/* <Button type="submit" data-cy={submitLabel === "Add" ? "admin-add-product" : "admin-edit-product"} className="hover:bg-red-900 text-white rounded-full px-6">
      {submitLabel}
    </Button> */}
      </Field>
    </div >
  );
}
