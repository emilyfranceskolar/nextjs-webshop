"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";

type ProductFormValues = {
    id?: string;
    title?: string;
    category?: string;
    description?: string;
    image?: string | number;
    price?: string | number;
    articleNumber?: string | number;
    slug?: string;
};

type ProductFormProps = {
    action: (formData: FormData) => Promise<void>;
    submitLabel: string;
    formTitle: string;
    formDescription: string;
    initialValues?: ProductFormValues;
};

type ProductFormErrors = {
    title: boolean;
    category: boolean;
    description: boolean;
    image: boolean;
    price: boolean;
    articleNumber: boolean;
};

function isValidUrl(value: string | undefined) {
    if (!value) return false;

    if (value.startsWith("/") && value.match(/\.(jpg|jpeg|png|webp)$/i)) {
        return true;
    }

    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function isValidPrice(value: string | undefined) {
    if (!value) return false;
    const parsed = Number(value);
    return !Number.isNaN(parsed) && parsed > 0;
}

export function ProductForm({
    action,
    submitLabel,
    formTitle,
    formDescription,
    initialValues,
}: ProductFormProps) {
    const [errors, setErrors] = useState<ProductFormErrors>({
        title: false,
        category: false,
        description: false,
        image: false,
        price: false,
        articleNumber: false,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title")?.toString().trim() ?? "";
        const category = formData.get("category")?.toString().trim() ?? "";
        const description = formData.get("description")?.toString().trim() ?? "";
        const image = formData.get("image")?.toString().trim() ?? "";
        const price = formData.get("price")?.toString().trim() ?? "";
        const articleNumber = formData.get("articleNumber")?.toString().trim() ?? "";

        const nextErrors: ProductFormErrors = {
            title: title.length === 0,
            category: category.length === 0,
            description: description.length === 0,
            articleNumber: articleNumber.length === 0,
            image: !isValidUrl(image),
            price: !isValidPrice(price),
        };

        setErrors(nextErrors);

        if (Object.values(nextErrors).some(Boolean)) {
            event.preventDefault();
        }
    };

    return (
        <form
            action={action}
            data-cy="product-form"
            className="w-full max-w-md"
            onSubmit={handleSubmit}
            noValidate
        >
            <FieldGroup>
                <div>
                    <FieldLegend className="text-2xl font-bold text-zinc-800">{formTitle}</FieldLegend>
                    <p className="text-sm text-zinc-500">{formDescription}</p>
                </div>

                <Field className="space-y-0.5">
                    <Label className="font-semibold text-sm text-zinc-700">Title</Label>
                    <Input
                        data-cy="product-title"
                        name="title"
                        defaultValue={initialValues?.title ?? ""}
                        required
                        className="outline rounded-sm p-2 border focus:ring-2 focus:ring-red-600"
                    />

                    {errors.title && (
                        <p data-cy="product-title-error" className={`text-sm -mt-2.5 text-red-600 ${errors.title ? "" : "hidden"}`}>
                            Required
                        </p>
                    )}
                </Field>

                <Field className="space-y-1">
                    <Label className="font-semibold text-sm text-zinc-700">Category</Label>
                    <Input
                        name="category"
                        defaultValue={initialValues?.category ?? ""}
                        className="outline rounded-sm"
                    />
                    {errors.category && (
                        <p className={`text-sm -mt-2.5 text-red-600 ${errors.title ? "" : "hidden"}`}>
                            Required
                        </p>
                    )}
                </Field>

                <Field className="space-y-1">
                    <Label className="font-semibold text-sm text-zinc-700">Description</Label>
                    <Input
                        data-cy="product-description"
                        name="description"
                        defaultValue={initialValues?.description ?? ""}
                        required
                        className="outline rounded-sm"
                    />
                    {errors.description && (
                        <p data-cy="product-description-error" className="text-sm -mt-2.5 text-red-600">
                            Required
                        </p>
                    )}
                </Field>

                <Field className="space-y-1">
                    <Label className="font-semibold text-sm text-zinc-700">Image</Label>
                    <Input
                        type="url"
                        data-cy="product-image"
                        name="image"
                        defaultValue={initialValues?.image ?? ""}
                        required
                        className="outline rounded-sm"
                    />
                    {errors.image && (
                        <p data-cy="product-image-error" className="text-sm -mt-2.5 text-red-600">
                            Required
                        </p>
                    )}
                </Field>

                <Field className="space-y-1">
                    <Label className="font-semibold text-sm text-zinc-700">Price</Label>
                    <Input
                        type="number"
                        min="1"
                        data-cy="product-price"
                        name="price"
                        defaultValue={initialValues?.price ?? ""}
                        required
                        className="outline rounded-sm"
                    />
                    {errors.price && (
                        <p data-cy="product-price-error" className="text-sm -mt-2.5 text-red-600">
                            Required
                        </p>
                    )}
                </Field>

                <Field className="space-y-1">
                    <Label className="font-semibold text-sm text-zinc-700">Article Number</Label>
                    <Input
                        data-cy="product-id"
                        name="articleNumber"
                        defaultValue={initialValues?.articleNumber ?? ""}
                        className="outline rounded-sm"
                    />
                    {errors.articleNumber && (
                        <p className="text-sm -mt-2.5 text-red-600">
                            Required
                        </p>
                    )}
                </Field>

                <input type="hidden" name="id" value={initialValues?.id ?? ""} />
                <input type="hidden" name="slug" value={initialValues?.slug ?? ""} />
            </FieldGroup>

            <Field className="pt-6 pb-6" orientation="horizontal">
                <Link href="/admin">
                    <Button type="button" variant="outline" className="rounded-full px-6">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" data-cy={submitLabel === "Add" ? "admin-add-product" : "admin-edit-product"} className="hover:bg-red-900 text-white rounded-full px-6">
                    {submitLabel}
                </Button>
            </Field>
        </form>
    );
}
