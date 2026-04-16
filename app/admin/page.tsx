import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { db } from "@/prisma/db";
import { Input } from "@base-ui/react";
import { FiPlusCircle } from "react-icons/fi";

export default async function AdminPage() {
  const products = await db.product.findMany({});
  return (
    <main className="grid gap-4">
      <p className="text-3xl font-bold m-10 text-center">Our products</p>
      <div className="flex justify-center">
        <Dialog>
          <form>
            <DialogTrigger asChild className="">
              <Button className="p-6 gap-6" variant="outline">Add product <FiPlusCircle /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-extrabold">Add more products?</DialogTitle>
                <DialogDescription>
                  Information about your product
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1" className="font-bold">Title</Label>
                  <Input id="name-1" className={`p-2 outline rounded-sm`} />
                </Field>
                <Field>
                  <Label htmlFor="username-1" className="font-bold">Category</Label>
                  <Input id="name-6" className={`p-2 outline rounded-sm`} />
                </Field>
                <Field>
                  <Label htmlFor="username-1" className="font-bold">Description</Label>
                  <Input id="name-3" className={`p-2 outline rounded-sm`} />
                </Field>
                <Field>
                  <Label htmlFor="username-1" className="font-bold">Image</Label>
                  <Input id="name-4" className={`p-2 outline rounded-sm`} />
                </Field>
                <Field>
                  <Label htmlFor="username-1" className="font-bold">Price</Label>
                  <Input id="name-5" className={`p-2 outline rounded-sm`} />
                </Field>
                <Field>
                  <Label htmlFor="username-1" className="font-bold">Article Number</Label>
                  <Input id="name-2" className={`p-2 outline rounded-sm`} />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="hover:bg-green-700" type="submit">Add</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <section className="grid w-full gap-6 p-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => (
        <article key={product.id} data-cy="product-id" className="flex justify-center gap-6 mb-4">
          <img
            className="object-cover rounded-lg w-24 h-auto"
            src={product.image}
            alt={product.title}
          />
          <div className="grid items-start">
            <section className="p-2">
              <p data-cy="product-title" className="font-bold text-sm">{product.title}</p>
              <p data-cy="product-price" className="text-sm">{product.price}kr</p>
            </section>

            <ButtonGroup>
              <Button variant="outline">Edit product</Button>
              <Button variant="outline" className="hover:bg-red-200">Delete product</Button>
            </ButtonGroup>
          </div>
        </article>

      ))}
      </section>
    </main >
  );
}
