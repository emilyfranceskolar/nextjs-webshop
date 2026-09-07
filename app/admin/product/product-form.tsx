"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormState, useForm, UseFormRegister } from "react-hook-form";
import {
  ProductFormValues,
  ProductCategoryOption,
  createProductSchema,
  isSaleCategory,
} from "@/data/form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  categoryAsText?: boolean;
  categories: ProductCategoryOption[];
  initialValues?: ProductFormValues;
  action: (formData: FormData) => Promise<void>;
}

interface ProductFormInputsProps {
  categoryAsText: boolean;
  categories: ProductCategoryOption[];
  onSale: boolean;
  register: UseFormRegister<ProductFormValues>;
  formState: FormState<ProductFormValues>;
}
export default function ProductForm({
  initialValues,
  action,
  categories,
  categoryAsText = false,
}: ProductFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState, watch, setError } =
    useForm<ProductFormValues>({
      resolver: zodResolver(createProductSchema(categories, categoryAsText)),
      defaultValues: { categoryIds: [], salePrice: "", ...initialValues },
    });
  const selectedCategoryIds = watch("categoryIds");
  const categoryName = watch("category");
  const onSale = categoryAsText
    ? categoryName?.trim().toLowerCase() === "sale"
    : categories.some(
        (category) =>
          isSaleCategory(category) && selectedCategoryIds.includes(category.id),
      );

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((id) => formData.append(key, id));
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    try {
      await action(formData);
      router.push("/admin");
    } catch {
      setError("root", {
        message: "Could not save the product. Check the details and try again.",
      });
    }
  };

  return (
    <form
      className="w-full max-w-lg mx-auto p-4"
      data-cy="product-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductFormInputs
        register={register}
        formState={formState}
        categories={categories}
        categoryAsText={categoryAsText}
        onSale={onSale}
      />
    </form>
  );
}

function ProductFormInputs({
  register,
  formState,
  categories,
  categoryAsText,
  onSale,
}: ProductFormInputsProps) {
  return (
    <div className="w-full space-y-4">
      <input type="hidden" {...register("id")} />
      <Field className="space-y-2 w-full">
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Title
        </FieldLegend>
        <Input
          data-cy="product-title"
          {...register("title")}
          id="title"
          type="text"
          className={cn("h-10 w-full p-4", {
            "border-red-600 border-2": formState.errors.title,
          })}
          autoComplete="title"
        />
        {formState.errors.title && (
          <p data-cy="product-title-error" className="text-red-600 text-sm">
            {formState.errors.title.message}
          </p>
        )}
      </Field>

      {categoryAsText ? (
        <Field>
          <FieldLegend className="text-2xl font-bold text-zinc-800">
            <label htmlFor="category">Category</label>
          </FieldLegend>
          <Input
            id="category"
            type="text"
            {...register("category")}
            data-cy="product-category"
            className="h-10 p-4"
            autoComplete="category"
          />
          {formState.errors.category && (
            <p
              data-cy="product-category-error"
              className="text-red-600 text-sm"
              role="alert"
            >
              {formState.errors.category.message}
            </p>
          )}
        </Field>
      ) : (
        <fieldset className="space-y-3">
          <legend className="text-2xl font-bold text-zinc-800">
            Categories
          </legend>
          <p className="text-sm text-muted-foreground">
            Select one or more categories.
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={category.id}
                  {...register("categoryIds")}
                  data-cy="product-category"
                  className="size-4 accent-black"
                />
                {category.name}
              </label>
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-sm">No categories available.</p>
          )}
          {formState.errors.categoryIds && (
            <p
              data-cy="product-category-error"
              className="text-red-600 text-sm"
              role="alert"
            >
              {formState.errors.categoryIds.message}
            </p>
          )}
        </fieldset>
      )}

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Description
        </FieldLegend>
        <Input
          data-cy="product-description"
          {...register("description")}
          id="description"
          type="text"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.description,
          })}
          autoComplete="description"
        />
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
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.image,
          })}
          autoComplete="off"
        />
        {formState.errors.image && (
          <p data-cy="product-image-error" className="text-red-600 text-sm">
            {formState.errors.image.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          <label htmlFor="price">
            {onSale ? "Regular price (kr)" : "Price (kr)"}
          </label>
        </FieldLegend>

        <Input
          data-cy="product-price"
          {...register("price")}
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.price,
          })}
          autoComplete="off"
        />
        {formState.errors.price && (
          <p data-cy="product-price-error" className="text-red-600 text-sm">
            {formState.errors.price.message}
          </p>
        )}
      </Field>

      {onSale && (
        <Field>
          <FieldLegend className="text-2xl font-bold text-zinc-800">
            <label htmlFor="salePrice">Sale price (kr)</label>
          </FieldLegend>
          <Input
            id="salePrice"
            type="number"
            min="0.01"
            step="0.01"
            {...register("salePrice")}
            data-cy="product-sale-price"
            aria-invalid={!!formState.errors.salePrice}
            className="h-10 p-4"
          />
          <p className="text-sm text-muted-foreground">
            The regular price will be shown crossed out beside the sale price.
          </p>
          {formState.errors.salePrice && (
            <p
              data-cy="product-sale-price-error"
              className="text-red-600 text-sm"
              role="alert"
            >
              {formState.errors.salePrice.message}
            </p>
          )}
        </Field>
      )}

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Article Number
        </FieldLegend>

        <Input
          data-cy="product-articleNumber"
          {...register("articleNumber")}
          id="articleNumber"
          type="text"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.articleNumber,
          })}
          autoComplete="off"
        />
        {formState.errors.articleNumber && (
          <p
            data-cy="product-articleNumber-error"
            className="text-red-600 text-sm"
          >
            {formState.errors.articleNumber.message}
          </p>
        )}
      </Field>

      {formState.errors.root && (
        <p role="alert" className="text-red-600 text-sm">
          {formState.errors.root.message}
        </p>
      )}
      <Field className="pt-6 pb-6" orientation="horizontal">
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={
              formState.isSubmitting ||
              (!categoryAsText && categories.length === 0)
            }
            variant="outline"
            className="rounded-full bg-black text-white"
          >
            {formState.isSubmitting ? "Saving..." : "Confirm"}
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
    </div>
  );
}
