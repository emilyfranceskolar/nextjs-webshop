"use client";

import { ProductFormValues, productSchema } from "@/data/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ProductForm from "@/app/admin/product/product-form";


interface Props {
    initialValues?: ProductFormValues;
    action: (formData: FormData) => Promise<void>;
}

export function Form({ initialValues, action }: Props) {
    const router = useRouter();
    const { register, handleSubmit, formState } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema), defaultValues: initialValues,
    });

    const onSubmit = async (data: ProductFormValues) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        })
        console.log("Save....", data);
        await action(formData);
        router.push("/admin");

    };

    return (
        <form data-cy="product-form" onSubmit={handleSubmit(onSubmit)}>
            <ProductForm register={register} formState={formState} />
        </form>
    );
}