"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormState, useForm, UseFormRegister } from "react-hook-form";
import {
  ProductFormValues,
  createProductSchema,
  productCategoryNames,
  isSaleCategory,
} from "@/data/form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  initialValues?: ProductFormValues;
  action: (formData: FormData) => Promise<void>;
}

interface ProductFormInputsProps {
  onSale: boolean;
  register: UseFormRegister<ProductFormValues>;
  formState: FormState<ProductFormValues>;
}

export default function ProductForm({
  initialValues,
  action,
}: ProductFormProps) {
  const router = useRouter();

  const { register, handleSubmit, formState, watch, setError } =
    useForm<ProductFormValues>({
      resolver: zodResolver(createProductSchema()),
      defaultValues: {
        salePrice: "",
        ...initialValues,
        category:
          initialValues?.category.filter((name) =>
            productCategoryNames.includes(name),
          ) ?? [],
      },
    });

  const onSale = isSaleCategory(watch("category"));

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
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
      className="w-full mr-10 ml-10 max-w-md md:max-w-lg mx-auto"
      data-cy="product-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {initialValues?.category.some(
        (name) => !productCategoryNames.includes(name),
      ) && (
          <p role="status" className="mb-4 text-sm text-amber-800">
            This product has an unsupported category. Select from the four
            categories below; saving will replace the old category selection.
          </p>
        )}

      <ProductFormInputs
        register={register}
        formState={formState}
        onSale={onSale}
      />
    </form>
  );
}

function ProductFormInputs({
  register,
  formState,
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

      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Category
        </FieldLegend>

        <div className="gap-6">
          {productCategoryNames.map((category) => (
            <label key={category} className="flex items-center gap-2">
              <input
                data-cy="product-category"
                {...register("category")}
                type="checkbox"
                value={category}
                aria-invalid={!!formState.errors.category}
              />
              {category}
            </label>
          ))}

          {formState.errors.category && (
            <p
              data-cy="product-category-error"
              className="text-red-600 text-sm"
            >
              {formState.errors.category.message}
            </p>
          )}
        </div>
      </Field>

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

      {/* stock input for admin inventory management */}
      <Field>
        <FieldLegend className="text-2xl font-bold text-zinc-800">
          Stock
        </FieldLegend>

        <Input
          data-cy="product-stock"
          {...register("stock")}
          id="stock"
          type="number"
          min="0"
          step="1"
          className={cn("h-10 p-4", {
            "border-red-600 border-2": formState.errors.stock,
          })}
          autoComplete="off"
        />

        {formState.errors.stock && (
          <p data-cy="product-stock-error" className="text-red-600 text-sm">
            {formState.errors.stock.message}
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
            disabled={formState.isSubmitting}
            variant="outline"
            className="rounded-lg bg-black text-white"
          >
            {formState.isSubmitting ? "Saving..." : "Confirm"}
          </Button>

          <Link href="/admin">
            <Button type="button" variant="outline" className="rounded-lg">
              Cancel
            </Button>
          </Link>
        </div>
      </Field>
    </div>
  );
}
