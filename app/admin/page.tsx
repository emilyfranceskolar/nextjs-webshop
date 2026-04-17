import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { db } from "@/prisma/db";
import { Input } from "@base-ui/react";
import { Plus } from "lucide-react";

export default async function AdminPage() {
  const products = await db.product.findMany({});
  return (
    <main className="grid">
      <p className="text-3xl font-bold m-10 text-center">Our products</p>
      <section className="grid gap-4 px-4 sm:grid-cols-2 xl:grid-cols-3">
        <Dialog>
          <div className="flex gap-6 items-center p-4 border rounded-xl w-full hover:bg-muted/50 transition">
            <div className="w-24 h-28 rounded-xl border-2 border-dashed flex items-center justify-center text-sm text-muted-foreground">
              Image
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold text-lg text-zinc-700">
                  New product
                </p>
                <p className="text-zinc-600">0 kr</p>
              </div>

              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add new product
                </Button>
              </DialogTrigger>
            </div>
          </div>

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-extrabold">
                Add more products?
              </DialogTitle>
              <DialogDescription>
                Information about your product
              </DialogDescription>
            </DialogHeader>

            <form className="grid gap-4">
              <FieldGroup>
                <Field>
                  <Label className="font-bold">Title</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>

                <Field>
                  <Label className="font-bold">Category</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>

                <Field>
                  <Label className="font-bold">Description</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>

                <Field>
                  <Label className="font-bold">Image</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>

                <Field>
                  <Label className="font-bold">Price</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>

                <Field>
                  <Label className="font-bold">Article Number</Label>
                  <Input className="p-2 outline rounded-sm" />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" data-cy="admin-add-product" className="hover:bg-green-700">
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {products.map((product) => (
          <article key={product.id} data-cy="product" className="flex flex-wrap gap-2 px-2 py-4 border rounded-xl">
            <img
              className="object-cover rounded-lg w-24 h-28"
              src={product.image}
              alt={product.title}
            />

            <div className="flex flex-col">
              <div className="pl-2 pb-2">
                <p data-cy="product-id" className="font-bold text-sm pb-2">{product.articleNumber}</p>
                <p data-cy="product-title" className="font-bold text-sm pb-2">{product.title}</p>
                <p data-cy="product-price" className="text-sm pb-2">{product.price}kr</p>
                <p data-cy="product-description" className="text-sm max-w-xs pb-2">{product.description}</p>
              </div>

              <Dialog>

                <ButtonGroup>
                  <DialogTrigger asChild>
                    <Button variant="outline" data-cy="admin-edit-product">Edit product</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button variant="outline" data-cy="admin-remove-product" className="hover:bg-red-200">Delete product
                    </Button>
                  </DialogTrigger>
                </ButtonGroup>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to delete the product?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">No</Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button type="submit" data-cy="confirm-delete-button" className="">
                        Yes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        ))}
      </section>
    </main >
  );
}
